module.exports = function(grunt) {

    'use strict';

    var nw    = __dirname + '/node_modules/nodwebkit/nodewebkit/node-webkit.app';
    var exec  = require('child_process').exec;

    grunt.registerTask('nodewebkit', 'Build and deploy node-webkit app', function() {
        var config  = grunt.config('nodewebkit'),
            dest    = config.dest  || process.cwd(),
            src     = config.src   || [],
            appName = config.name || 'node-webkit.app',
            appPath = dest.replace(/\/$/, '') + '/' + appName,
            files   = [],
            done    = this.async();

        exec('cp -R ' + nw + ' ' + appPath, function(err, stdout, stderr) {
            if ( err ) {
                grunt.log.errorlns('node-webkit build error.');
                return;
            } else if ( stderr ) {
                grunt.log.fatal(stderr);
                return;
            }

            grunt.file.mkdir(appPath + '/Contents/Resources/app.nw');
            exec('cp -R ' + src.join(' ') + ' ' + appPath + '/Contents/Resources/app.nw/', function(err, stdout, stderr) {
                if ( err || stderr ) {
                    grunt.log.fatal('node-webkit build error.');
                } else {
                    grunt.log.oklns('node-webkit build successfully.');
                }
                done();
            });
        });
    });
};
