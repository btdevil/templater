module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: 'source/*.js',
                tasks: ['jshint:files', 'uglify'],
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: 'jshint:grunt'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'

            },
            grunt: 'Gruntfile.js',
            files: 'source/*.js'
        },
        uglify: {
            min: {
                files: {
                    'templater.min.js': 'source/*.js'
                },
                options: {
                    sourceMap: true
                }
            },
            dev: {
                files: {
                    'templater.js': 'source/*.js'
                },
                options: { sourceMap: true, beautify: true, mangle: false }
            }
        },
        jasmine: {
            src: ['templater.min.js'],
            options: {
                '--web-security': false,
                '--local-to-remote-url-access': true,
                '--ignore-ssl-errors': true,
                vendor: 'tests/libs/**/*.js',
                helpers: ['tests/jquery/jquery-1.7.1.min.js', 'tests/jquery/parseHTML.js', 'tests/helpers/**/*.js', 'tests/fixtures/**/*.js'],
                specs: 'tests/spec/**/*.js',
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'uglify', 'watch']);
};