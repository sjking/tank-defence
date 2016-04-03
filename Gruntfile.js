module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.config('browserify', {
    main: {
      src: 'src/app.js',
      dest: 'tmp/compiled.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.config('concat', {
    scripts: {
      src: [
        'bower_components/modernizr/modernizr.js',
        'tmp/compiled.js'
      ],
      dest: 'server/build/bundle.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean', {
    clean: ["tmp"]
  });

  grunt.registerTask('bundle', ['browserify', 'concat:scripts', 'clean']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
    bundle: {
      files: ['src/*.js'],
      tasks: ['bundle'],
      options: {
        spawn: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    scripts: {
      files: {
        'server/dist/bundle.js': 'server/build/bundle.js'
      }
    }
  });

  grunt.registerTask('dist', ['bundle', 'uglify']);
};