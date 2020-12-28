module.exports = function(grunt){
  grunt.initConfig({
    concat: {
      dist_js: {
        options: {
          separator: ';\n',
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
                src.replace(/\/\/# sourceMappingURL=([A-z0-9\-\.\_]+)/g, '').trim();
          }
        },
        src: [
          './dist/fusio-bundle.min.js',
          './dist/fusio-templates.js'
        ],
        dest: './dist/fusio.min.js'
      },
      dist_css: {
        options: {
          separator: '\n',
          process: function(src, filepath) {
            return '/* Source: ' + filepath + ' */\n' +
                src.replace(/\/\/# sourceMappingURL=([A-z0-9\-\.\_]+)/g, '').trim();
          }
        },
        src: [
          './css/bootstrap.min.css',
          './css/bootstrap-theme.min.css',
          './css/ionicons.min.css',
          './css/default.css'
        ],
        dest: './dist/fusio.min.css'
      }
    },
    terser: {
      options: {
        ecma: 2016,
        mangle: false
      },
      dist: {
        files: {
          './dist/fusio-bundle.min.js': [
            './dist/fusio-bundle.js'
          ]
        }
      }
    },
    browserify: {
      dist: {
        files: {
          './dist/fusio-bundle.js': [
            './app/app.js'
          ]
        }
      }
    },
    ngtemplates: {
      fusioApp: {
        src: ['app/*/*.html', 'app/*/*/*.html'],
        dest: 'dist/fusio-templates.js',
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
  grunt.loadNpmTasks('grunt-terser');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify', 'ngtemplates', 'terser', 'concat']);

};
