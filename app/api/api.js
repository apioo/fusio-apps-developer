'use strict';

angular.module('fusioApp.api', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/api', {
    templateUrl: 'app/api/api.html',
    controller: 'ApiCtrl'
  });
  $routeProvider.when('/api/:path*', {
    templateUrl: 'app/api/api.html',
    controller: 'ApiCtrl'
  });
}])

.controller('ApiCtrl', ['$scope', '$auth', '$location', '$http', '$compile', '$sce', '$routeParams', 'fusio', 'routings', 'schema', function($scope, $auth, $location, $http, $compile, $sce, $routeParams, fusio, routings, schema) {

  $scope.routings = [];
  $scope.api = null;
  $scope.methods = {};

  $scope.loadRoutings = function() {
    routings.getRoutings().then(function(result) {
      $scope.routings = result;

      // load default
      if (!$routeParams.path && result[0].path) {
        $scope.loadDetails(result[0].path);
      }
    });
  };

  $scope.loadDetails = function(path) {
    $http.get(fusio.baseUrl + 'doc/*/' + path).then(function(response) {
      $scope.api = response.data;
      if ($scope.api.methods) {
        var methods = {};
        for (var methodName in $scope.api.methods) {
          if ($scope.api.methods.hasOwnProperty(methodName)) {
            var schema = $scope.getSchema(methodName, $scope.api.methods[methodName]);
            if (!schema) {
              schema = '<br><div class="alert alert-info">This API method provides no schema informations.</div>';
            }

            methods[methodName] = schema;
          }
        }

        $scope.methods = methods;
      }
    });
  };

  $scope.getSchema = function(methodName, method) {
    var apiSchema = schema.create($scope.api);
    return apiSchema.getHtml(methodName, method);
  };

  $scope.loadRoutings();

  if ($routeParams.path) {
    $scope.loadDetails($routeParams.path);
  }

}])

.service('routings', ['$http', '$q', 'fusio', function definition($http, $q, fusio) {
  var routings = null;
  var excludePaths = ['/consumer/', '/backend/'];

  this.getRoutings = function() {
    if (routings === null) {
      return $q(function(resolve, reject) {
        $http.get(fusio.baseUrl + 'doc').then(function(response) {
          var data = response.data.routings;
          routings = [];

          if (angular.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
              var found = false;

              // exclude / route since we cant load it
              if (data[i].path === '/') {
                found = true;
              }

              for (var j = 0; j < excludePaths.length; j++) {
                if (data[i].path.indexOf(excludePaths[j]) === 0) {
                  found = true;
                  break;
                }
              }

              if (!found) {
                routings.push(data[i]);
              }
            }
          }

          resolve(routings);
        }, function() {
          reject();
        });
      });
    } else {
      return $q(function(resolve, reject) {
        resolve(routings);
      });
    }
  };

}])

.service('schema', function() {

  /**
   * Creates a schema generator from an schema definition which transforms an
   * json schema to an html representation
   */
  this.create = function(definition) {
    return new SchemaGenerator(definition);
  };

  function SchemaGenerator(definition) {
    this.definition = definition;
    this.schema = definition.schema;

    this.getHtml = function(methodName, method) {
      var html = '<div class="fusio-endpoint-method">';
      var isEmpty = true;

      // request
      var request = this.getRequest(method);
      if (request) {
        isEmpty = false;
        html += '<h3>' + methodName + ' Request</h3>';
        html += '<div class="fusio-endpoint-schema fusio-endpoint-schema-request">' + request + '</div>';
      }

      // responses
      var statusCodes = this.getAvailableResponseCodes(method);
      for (var i = 0; i < statusCodes.length; i++) {
        var response = this.getResponse(method, statusCodes[i]);
        if (response) {
          isEmpty = false;
          html += '<h3>' + methodName + ' Response - ' + statusCodes[i] + '</h3>';
          html += '<div class="fusio-endpoint-schema fusio-endpoint-schema-response">' + response + '</div>';
        }
      }

      html += '</div>';

      return !isEmpty ? html : null;
    };

    this.getJsonSampleRequest = function(method) {
      return this.getRequest(method, 'json');
    };

    this.getRequest = function(method, format) {
      if (method && method.request) {
        var data = this.getPointer(method.request);
        if (data) {
          return this.transformSchema(data, format);
        }
      }
      return null;
    };

    this.getResponse = function(method, statusCode, format) {
      if (method && method.responses && method.responses[statusCode]) {
        var data = this.getPointer(method.responses[statusCode]);
        if (data) {
          return this.transformSchema(data, format);
        }
      }
      return null;
    };

    this.getAvailableResponseCodes = function(method) {
      var codes = [];
      if (method && method.responses) {
        for (var statusCode in method.responses) {
          if (method.responses.hasOwnProperty(statusCode)) {
            codes.push(statusCode);
          }
        }
      }
      return codes;
    };

    this.getPointer = function(path) {
      if (!path) {
        return null;
      }

      if (path.substring(0, 2) == '#/') {
        path = path.substring(2);
      }

      var parts = path.split('/');
      var el = this.schema;

      for (var i = 0; i < parts.length; i++) {
        if (el[parts[i]]) {
          el = el[parts[i]];
        } else {
          break;
        }
      }

      return el;
    };

    this.resolveRef = function(schema) {
      if (schema.$ref) {
        schema = this.resolveRef(this.getPointer(schema.$ref));
      }
      return schema;
    };

    this.transformSchema = function(schema, format) {
      if (format == 'json') {
        return this.buildJsonObject(this.resolveRef(schema));
      } else {
        return this.buildHtmlObject(this.resolveRef(schema));
      }
    };

    this.buildHtmlObject = function(schema) {
      var html = '';
      if (schema.properties) {
        var references = [];
        var title = 'Object';

        if (schema.title) {
          title = schema.title;
        }

        html += '<h4>' + title + '</h4>';

        if (schema.description) {
          html += '<p>' + schema.description + '</p>';
        }

        html += '<table class="table">';
        html += '<colgroup>';
        html += '    <col width="20%">';
        html += '    <col width="20%">';
        html += '    <col width="40%">';
        html += '    <col width="20%">';
        html += '</colgroup>';
        html += '<thead>';
        html += '<tr>';
        html += '    <th>Property</th>';
        html += '    <th>Type</th>';
        html += '    <th>Description</th>';
        html += '    <th>Constraints</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        for (var propertyName in schema.properties) {
          if (schema.properties.hasOwnProperty(propertyName)) {
            var property = schema.properties[propertyName];
            var object;

            if (property.$ref) {
              property = this.resolveRef(property);
            }

            var type = property.type ? property.type : 'string';

            if (type === 'object') {
              object = this.resolveRef(property);
              if (object.title) {
                type = object.title;
              }
              references.push(object);
            } else if (type === 'array') {
              if (property.items) {
                object = this.resolveRef(property.items);
                if (object.type === 'object') {
                  if (object.title) {
                    type = 'array&lt;' + object.title + '&gt;';
                  } else {
                    type = 'array&lt;object&gt;';
                  }
                  references.push(object);
                } else if (object.type) {
                  type = 'array&lt;' + object.type + '&gt;';
                }
              }
            }

            var required = false;
            if (angular.isArray(schema.required)) {
              for (var j = 0; j < schema.required.length; j++) {
                if (schema.required[j] === propertyName) {
                  required = true;
                  break;
                }
              }
            }

            html += '<tr>';

            if (required) {
              html += '<td><span class="fusio-property fusio-property-required" title="required">' + propertyName + '</span></td>';
            } else {
              html += '<td><span class="fusio-property">' + propertyName + '</span></td>';
            }

            html += '<td>' + type + '</td>';
            html += '<td>' + (property.description ? property.description : '') + '</td>';
            html += '<td>' + this.buildConstraints(property) + '</td>';
            html += '</tr>';
          }
        }
        html += '</tbody>';
        html += '</table>';

        for (var i = 0; i < references.length; i++) {
          html += this.buildHtmlObject(references[i]);
        }
      }

      return html;

    };

    this.buildConstraints = function(property) {
      var html = '<dl>';

      if (property.pattern) {
        html += '<dt>Pattern:</dt><dd>' + property.pattern + '</dd>';
      }

      if (property.enum && angular.isArray(property.enum)) {
        html += '<dt>Enumeration:</dt><dd>' + property.enum.join(', ') + '</dd>';
      }

      if (property.minLength) {
        html += '<dt>Min-Length:</dt><dd>' + property.minLength + '</dd>';
      }

      if (property.maxLength) {
        html += '<dt>Max-Length:</dt><dd>' + property.maxLength + '</dd>';
      }

      if (property.minimum) {
        html += '<dt>Minimum:</dt><dd>' + property.minimum + '</dd>';
      }

      if (property.maximum) {
        html += '<dt>Maximum:</dt><dd>' + property.maximum + '</dd>';
      }

      html += '</dl>';

      return html;
    };

    this.buildJsonObject = function(schema) {
      var data = {};

      if (schema.properties) {
        for (var propertyName in schema.properties) {
          if (schema.properties.hasOwnProperty(propertyName)) {
            var property = schema.properties[propertyName];
            var object;

            if (property.$ref) {
              property = this.resolveRef(property);
            }

            var type = property.type ? property.type : 'string';

            if (type === 'object') {
              object = this.resolveRef(property);
              data[propertyName] = this.buildJsonObject(object);
            } else if (type === 'array') {
              var result = [];
              if (property.items) {
                object = this.resolveRef(property.items);
                if (object.type === 'object') {
                  result.push(this.buildJsonObject(object));
                } else {
                  result.push('');
                }
              }
              data[propertyName] = result;
            } else if (type === 'integer') {
              data[propertyName] = 0;
            } else if (type === 'number') {
              data[propertyName] = 0.0;
            } else if (type === 'null') {
              data[propertyName] = null;
            } else if (type === 'boolean') {
              data[propertyName] = false;
            } else {
              data[propertyName] = '';
            }
          }
        }
      }

      return data;
    };

  }

});

