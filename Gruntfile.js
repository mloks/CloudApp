var _ = require('underscore');

module.exports = function (grunt) {

  var init = {
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          '<%= browserify.main.dest %>': ['<%= browserify.main.dest %>']
        }
      }
    },
    browserify: {
      specs: {
        src: ['app/client/spec/specs.js'],
        dest: 'app/public/scripts/specs.js',
        options: {
          debug: grunt.option('configuration') != 'Release'
        }
      },
      main: {
        src: ['app/client/src/main.js'],
        dest: '../crm/ui/scripts/main.js',
        options: {
          debug: grunt.option('configuration') != 'Release'
        }
      }
    },

    watch: [
      {
        files: ['app/**/*.js'],
        tasks: ['browserify']
      },
      {
        files: ['app/**/*.jade'],
        tasks: ['jade']
      },
      {
        files: ['app/**/*.styl'],
        tasks: ['stylus']
      },
      {
        files: ['app/public/images/**'],
        tasks: ['copy']
      }
    ],
    jade: {
      compile: {
        options: {
          pretty: grunt.option('configuration') != 'Release'
        },
        files: [
          { "../crm/ui/index.php": ["app/views/index.jade"] },
          { expand: true, cwd: 'app/views/tpl', src: [ '**/*.jade' ], dest: '../crm/ui/tpl', ext: '.html'}
        ]
      }
    },
    stylus: {
      compile: {
        files: { '../crm/ui/stylesheets/style.css': 'app/public/stylesheets/style.styl' }
      }
    },
    copy: {
      images: {
        files: [
          {
            expand: true,
            src: ['images/**'],
            cwd: 'app/public',
            dest: '../crm/ui/'
          }
        ]
      },
      php: {
        files: [
          {
            expand: true,
            src: ['php/**'],
            cwd: 'app/public',
            dest: '../crm/ui/scripts'
          }
        ]
      },
      api: {
        files: [
          {
            expand: true,
            src: ['api/**'],
            cwd: 'app/',
            dest: '../crm/'
          }
        ]
      },
      bootstrapcss: {
        files: [
          {
            expand: true,
            src: ['bootstrap.min.css'],
            cwd: 'app/client/components/bootstrap/dist/css',
            dest: '../crm/ui/stylesheets'
          }
        ]
      },
      boilerplatecss: {
        files: [
          {
            expand: true,
            src: ['**'],
            cwd: 'app/client/components/html5-boilerplate/css',
            dest: '../crm/ui/stylesheets'
          }
        ]
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: false,
        singleRun: true
      },
      watch: {
        configFile: 'karma.conf.js',
        autoWatch: true,
        singleRun: false
      }
    }

  };

  grunt.initConfig(init);

  var uiSteps = ['browserify', 'jade', 'stylus', 'copy'];
  if (grunt.option('configuration') == 'Release')
    uiSteps.push('uglify');

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('buildui', uiSteps);
  grunt.registerTask('build', ['buildui']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('testem', ['exec:testem']);
  grunt.registerTask('watchui', ['buildui', 'watch']);
  grunt.registerTask('watchtest', ['karma:watch']);

};
