/*
 * grunt-filenames-to-json
 * https://github.com/shukriadams/grunt-filenames-to-json
 *
 * Copyright (c) 2015 Shukri Adams
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
 
	var globsync = require('glob-whatev'),
		path = require('path'),
		fs = require('fs'),
		jf = require('jsonfile');

	grunt.registerTask('filenamesToJson', '', function() {
	    var output = [],
	    	options = this.options({
	      		files : grunt.config('filenamesToJson').files,
	      		target :  grunt.config('filenamesToJson').target
	    	});

		globsync.glob(options.files).forEach(function(filepath) {
	  		output.push(path.basename(filepath, path.extname(filepath)));
		});
		
		var dir = path.dirname(options.target);	
		if (!fs.existsSync(dir)){
    		fs.mkdirSync(dir);
		}

		jf.writeFile(options.target, output, function(err) {
			if (err){
		  		grunt.fail.warn(err);
			}
		});
		
	});
};
