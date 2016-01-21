/*
 * grunt-filenames-to-json
 * https://github.com/shukriadams/grunt-filenames-to-json
 *
 * Copyright (c) 2015 Shukri Adams
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
 
	var pluginName = 'grunt-filenames-to-json',
		globsync = require('glob-whatev'),
		path = require('path'),
		fs = require('fs'),
		jf = require('jsonfile');

	grunt.registerTask('filenamesToJson', '', function() {
	    
	    // verify settings
	    if (!grunt.config('filenamesToJson')){
	    	grunt.log.error(pluginName + ' could not find expected config item "filenamesToJson".');
	    }
    	if (!grunt.config('filenamesToJson').files){
			grunt.log.error(pluginName + ' config does not contained expected property "files".');
    	}
    	if (!grunt.config('filenamesToJson').destination){
			grunt.log.error(pluginName + ' config does not contained expected property "destination".');
    	}

	    var output = [],
	    	config = this.options({
	      		files : grunt.config('filenamesToJson').files,
	      		destination :  grunt.config('filenamesToJson').destination,
	      		options : grunt.config('filenamesToJson').options || { }
	    	});

		if (config.options.fullPath === undefined)
			config.options.fullPath = false;
		if (config.options.extensions === undefined)
			config.options.extensions = false;

		// search for files
		globsync.glob(config.files).forEach(function(filepath) {
			var file = filepath;
			if (!config.options.fullPath)
				file = path.basename(file);
			
			if (!config.options.extensions)
				file = file.substring(0, file.length - path.extname(file).length);

	  		output.push(file);
		});
		
		// create destination write folder if it doesn't exist
		var dir = path.dirname(config.destination);	
		if (!fs.existsSync(dir)){
    		fs.mkdirSync(dir);
		}

		if (config.options.synchronous) {
    		jf.writeFileSync(config.destination, output);
    	} 
    	else 
    	{
    		var done = this.async()
			// write json
			jf.writeFile(config.destination, output, function(err) {
				if (err){
		  			grunt.fail.warn(err);
				}
				done();
			});
    	}
		
	});
};
