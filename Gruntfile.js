var config = {
	devserver: {
		server: {}
	}
}
module.exports = function(grunt) {
	grunt.initConfig(config)
	grunt.loadNpmTasks('grunt-devserver')
}