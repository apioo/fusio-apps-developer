'use strict'

var angular = require('angular')

angular.module('fusioApp.account.invoice', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/account/invoice', {
      templateUrl: 'app/account/invoice/invoice.html',
      controller: 'AccountInvoiceCtrl'
    })
  }])

  .controller('AccountInvoiceCtrl', ['$scope', '$http', '$auth', '$uibModal', '$location', '$window', '$routeParams', 'fusio', function ($scope, $http, $auth, $uibModal, $location, $window, $routeParams, fusio) {
    $scope.invoices = []
    $scope.loading = false

    if (!$auth.isAuthenticated()) {
      $location.path('/login')
      return
    }

    $scope.load = function () {
      $http.get(fusio.baseUrl + 'consumer/plan/invoice').then(function (response) {
        $scope.invoices = response.data.entry
      })
    }

    $scope.pay = function(invoice) {
      var modalInstance = $uibModal.open({
        backdrop: 'static',
        templateUrl: 'app/account/invoice/pay.html',
        controller: 'AccountInvoicePayCtrl',
        resolve: {
          invoice: function () {
            return invoice;
          }
        }
      });

      modalInstance.result.then(function (result) {
        $scope.payInvoice(result.provider, result.invoice.id);
      }, function () {
      });
    };

    $scope.payInvoice = function (provider, invoiceId) {
      if ($scope.loading) {
        return
      }

      $scope.loading = true

      var returnUrl = $location.absUrl()
      returnUrl = returnUrl.substr(0, returnUrl.indexOf('/account') + 8)
      returnUrl = returnUrl + '/plan/{transaction_id}'

      var data = {
        invoiceId: invoiceId,
        returnUrl: returnUrl
      }

      $http.post(fusio.baseUrl + 'consumer/transaction/prepare/' + provider, data).then(function (response) {
        var approvalUrl = response.data.approvalUrl
        if (approvalUrl) {
          $window.location.href = approvalUrl
        }

        $scope.response = response.data
        $scope.loading = false
      }, function (response) {
        $scope.response = response.data
        $scope.loading = false
      })
    }

    $scope.closeResponse = function () {
      $scope.response = null
    }

    $scope.load()
  }])

  .controller('AccountInvoicePayCtrl', ['$scope', '$uibModalInstance', 'invoice', function ($scope, $uibModalInstance, invoice) {

    $scope.providers = [
      {key: 'stripe', name: 'Stripe'},
      {key: 'paypal', name: 'PayPal'},
    ];
    $scope.provider = 'stripe';
    $scope.invoice = invoice;

    $scope.pay = function() {
      $uibModalInstance.close({
        provider: $scope.provider,
        invoice: invoice
      })
    };

    $scope.close = function() {
      $uibModalInstance.dismiss('cancel')
    };

  }])
