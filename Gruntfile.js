const sass = require('node-sass');

module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'assets/css/main.css': 'assets/sass/main.scss',
                    'assets/css/noscript.css': 'assets/sass/noscript.scss'
                }
            }
        },
        concat: {
            dist: {
                src: ['assets/js/main.js', 'assets/js/launch.js'],
                dest: 'assets/js/MainCombined.js',
            },
        },
        cssmin: {
            combine: {
                files: {
                    'assets/css/main.min.css': ['assets/css/main.css']
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'assets/js/MainCombined.min.js': ['assets/js/MainCombined.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['concat', 'uglify'],
            },
            styles: {
                files: ['assets/scss/*.scss'],
                tasks: ['sass', 'cssmin'],
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'assets/scss/*.scss',
                        'assets/js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: "http://localhost:8080/AdvancedFrontendTechniques/GruntHUE/index.html"
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9', 'Opera 12.1']
            },
            dist: {
                src: 'assets/css/main.css',
                dest: 'assets/css/main-prefixed.css'
            }
        },
        jshint: {
            all: 'assets/js/MainCombined.js',
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    // Default task(s).
    grunt.registerTask('default', ['sass', 'concat', 'cssmin', 'uglify', 'autoprefixer', 'jshint']);
    grunt.registerTask('serve', ['default', 'browserSync', 'watch']);
};