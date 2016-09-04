module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';\n',
        process: function(src, filepath) {
          return '// Source: ' + filepath + '\n' +
            src.replace(/\/\/# sourceMappingURL=([A-z0-9\-\.\_]+)/g, '').trim();
        }
      },
      dist: {
        src: [
          './bower_components/angular/angular.min.js',
          './bower_components/angular-route/angular-route.min.js',
          './bower_components/angular-sanitize/angular-sanitize.min.js',
          './bower_components/angular-no-captcha/build/angular-no-captcha.min.js',
          './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
          './bower_components/satellizer/satellizer.min.js',
          './bower_components/angular-gravatar/build/angular-gravatar.min.js',
          './dist/fusio-app.min.js',
          './dist/fusio-templates.min.js'
        ],
        dest: './dist/fusio.min.js'
      }
    },
    uglify: {
      options: {
        banner: '/*\n fusio\n Copyright (C) 2015-2016 Christoph Kappestein\n License: AGPLv3\n*/\n',
        mangle: false
      },
      dist: {
        files: {
          './dist/fusio-app.min.js': [
            './app/app.js',
            './app/account/app/developer/developer.js',
            './app/account/app/grant/grant.js',
            './app/account/profile/profile.js',
            './app/account/security/security.js',
            './app/api/api.js',
            './app/auth/auth.js',
            './app/documentation/documentation.js',
            './app/login/login.js',
            './app/logout/logout.js',
            './app/overview/overview.js',
            './app/signup/signup.js'
          ]
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        rebase: ''
      },
      dist: {
        files: {
          './dist/fusio.min.css': [
            './bower_components/bootstrap/dist/css/bootstrap.css',
            './bower_components/bootstrap/dist/css/bootstrap-theme.css',
            './bower_components/Ionicons/css/ionicons.min.css',
            './css/default.css'
          ]
        }
      }
    },
    ngtemplates: {
      fusioApp: {
        src: 'app/**/*.html',
        dest: 'dist/fusio-templates.min.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('default', ['uglify', 'ngtemplates', 'concat', 'cssmin']);

};
