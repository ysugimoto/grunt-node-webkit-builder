module.exports = function(grunt) {

    'use strict';

    var path  = require('path');
    var nw    = path.resolve(__dirname, '../node_modules/nodewebkit/nodewebkit/node-webkit.app');
    var exec  = require('child_process').exec;

    grunt.registerTask('nodewebkit', 'Build and deploy node-webkit app', function() {
        var config  = grunt.config('nodewebkit'),
            dest    = config.dest  || process.cwd(),
            src     = config.src   || [],
            appName = config.name || 'node-webkit.app',
            appPath = dest.replace(/\/$/, '') + '/' + appName.replace(/\.app$/, '') + '.app',
            files   = [],
            done    = this.async();

        exec('cp -R ' + nw + ' ' + appPath, function(err, stdout, stderr) {
            if ( err ) {
                grunt.log.errorlns('node-webkit build error: copying application failed');
                return;
            } else if ( stderr ) {
                grunt.log.fatal(stderr);
                return;
            }

            grunt.file.mkdir(appPath + '/Contents/Resources/app.nw');
            exec('cp -R ' + src.join(' ') + ' ' + appPath + '/Contents/Resources/app.nw/', function(err, stdout, stderr) {
                if ( err || stderr ) {
                    grunt.log.fatal('node-webkit build error: copying content files failed.');
                } else {
                    grunt.log.oklns('node-webkit build successfully.');
                }
                done();
            });
        });
    });
};
