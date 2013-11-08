module.exports = function (grunt) {
    grunt.initConfig({
        // 패키지 파일
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './'
                }
            }

        },

        watch: {
            less: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            statics: {
                files: ['js/*', '*.html'],
                tasks: [],
                options: {
                    livereload: true
                }
            }
        },

        less: {
            css: {
                files: [{
                    src: ['less/*.less'],
                    dest: 'css/_main.css'
                }]
            }
        }
    });

    // npm에서 다운로드 받은 태스크를 로드한다.
    [
        'grunt-contrib-watch',
        'grunt-contrib-less',
        'grunt-contrib-connect'
    ].forEach(function (taskName) {
        grunt.loadNpmTasks(taskName);
    });

    // 직접적으로 사용할 태스크 목록
    //-----------------------
    grunt.registerTask('default', '브라우저 환경에서 라이브리로드가 적용된 개발 환경을 만든다.', [
        'less', 'connect', 'watch'
    ]);
};