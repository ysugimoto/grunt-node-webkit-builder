module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        nodewebkit: {
            src: ['package.json', 'index.html', 'sampleFiles'],
            name: 'sample'
        }
    });

    grunt.loadTasks('tasks');
    grunt.registerTask('default', ['nodewebkit']);
};
