** grunt-filenames-to-json

Grunt plugin that generates a json file contains list of files in a given path. Json is an array of file name strings.

* Getting started
- install in npm
	npm install grunt-filenames-to-json
- add to Gruntfile
    grunt.loadNpmTasks('grunt-filenames-to-json');

* Configure

	grunt.initConfig({

        filenamesToJson : {
        	options : {
        		// true if full path should be included, default is false
        		fullPath : false,
        		// true if file extension should be included, default is false 
        		extensions : false
        	}
        	// any valid glob
            files : '**/js',

            // path to write json to
            destination : 'some/path/output.json'
        }

    });

