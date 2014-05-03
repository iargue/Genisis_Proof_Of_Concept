module.exports = (grunt) ->
	# Project configuration.
	grunt.initConfig
		# pkg: grunt.file.readJSON('package.json')
		concurrent:
			target1: ['watch','devserver']
			# target2: ['devserver']
			options: 
                logConcurrentOutput: true

		watch:
			options:
				livereload: true
			css:
				files: ['develop/css/*.styl']
				tasks: ['stylus']
				options:
					event: ['all']
			js:
				files: ['develop/coffee/*.coffee']
				tasks: ['coffee']
				options:
					event: ['all']
			html:
				files: ['develop/partials/*.jade']
				tasks: ['jade']
				options:
					event: ['all']

		devserver:
  			server: {}	

		stylus:
			compile:
				files: 
					'build/style/main.css': ['develop/css/login.styl']
		#coffee:
			#compile:
				#files:
					#'build/js/.js': 'develop/coffee/game.coffee'
		jade:
			compile:
				options:
					pretty: true
				files:
					'build/index.html': ['develop/partials/main.jade']
					'build/bin/shop.html': ['develop/partials/shop.jade']
					'build/bin/game.html': ['develop/partials/game.jade']
					'build/bin/forum.html': ['develop/partials/forum.jade']
					'build/bin/support.html': ['develop/partials/support.jade']


	
	# Load plugins that provide tasks.
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-stylus'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-jade'
	grunt.loadNpmTasks 'grunt-devserver'
	grunt.loadNpmTasks 'grunt-concurrent'

	# Default task.
	grunt.registerTask 'default', ['concurrent:target1']