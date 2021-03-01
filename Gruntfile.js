module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'sftp-deploy': {
      build: {
        auth: {
          host: '217.79.180.173',
          port: 22,
          authKey: 'key1'
        },
        src: './build',
        dest: '../www/wwwroot/money_helper',
        serverSep: '/',
        localSep: '/',
        concurrency: 4,
        progress: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-sftp-deploy');

  // Default task(s).
  grunt.registerTask('default', ['sftp-deploy']);
};
