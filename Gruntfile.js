module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        seperator: ';'
      },
      dist: {
        src: './public/client/*.js',
        dest: './public/dist/built.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      target: {
        files: {
          'public/dist/min.js': './public/dist/built.js',
          'public/dist/backbone.min.js': './public/lib/backbone.js',
          'public/dist/jquery.min.js': './public/lib/backbone.js',
          'public/dist/handlebars.min.js': './public/lib/handlebars.js',
          'public/dist/underscore.min.js': './public/lib/underscore.js'
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        './public/client/*.js'
      ]
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      },
      // gitAdd: {
      //   command: 'git add .'
      // },
      // gitCommit: {
      //   command: 'git commit -m "commiting for live server"'
      // },
      // multiple: {
      //   command: ['git add .', 'git commit -m "commit for live server"', 'git push live master']
      //   .join('&&')
      // }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  // grunt.registerTask('server-dev', function (target) {
  //   grunt.task.run([ 'nodemon', 'watch' ]);
  // });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'eslint', 'concat', 'uglify', 'nodemon'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['prod']);
    } else {
      grunt.task.run([ 'dev' ]);
    }
  });

  grunt.registerTask('default', [
    // add your deploy tasks here
    'mochaTest', 'eslint', 'concat', 'uglify', 'watch'
  ]);

  grunt.registerTask('dev', [
    // dev tasks
    'mochaTest', 'eslint', 'concat', 'uglify', 'nodemon', 'watch'
  ]);

  grunt.registerTask('prod', [
    'eslint', 'concat', 'uglify', 'shell:prodServer', 'nodemon'
  ]);
};
