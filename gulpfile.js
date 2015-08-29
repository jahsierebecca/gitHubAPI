'use strict';
//working code
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	nodemon = require('gulp-nodemon');

gulp.task('start', function () {
	nodemon({
    	script: 'app.js', 
    	ext: 'js html', 
    	env: { 'NODE_ENV': 'development' }
 	})
})

gulp.task('concatScripts', function(){
	return gulp.src([
		'./bower_components/jquery/dist/jquery.min.js',
		// './bower_components/typeahead.js/dist/typeahead.bundle.min.js',
		'./public/javascripts/underscore.js', 
		'./public/javascripts/backbone.js',
		'./public/javascripts/init_app.js',
		'./public/javascripts/template.js',
		'./public/javascripts/github.js'		
		])
		.pipe(maps.init())
		.pipe(concat('main.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('minifyScripts', ['concatScripts'],function(){
	return gulp.src('./public/javascripts/main.js')
		// .pipe(maps.init())
		.pipe(uglify())
		// .pipe(maps.init())
		.pipe(rename('main.min.js'))
		// .pipe(maps.write('./'))
		.pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('compileSass', function(){
	return gulp.src('./public/stylesheets/app.sass')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watchFiles', function(){
	gulp.watch('./public/stylesheets/**/*.scss', ['compileSass']);
	gulp.watch('./public/javascripts/*.js', ['minifyScripts']);
});

gulp.task('serve', ['watchFiles', 'start']);

// gulp.task('build', ['minifyScripts', 'compileSass']);


gulp.task('build', ['compileSass', 'concatScripts']);


gulp.task('default', ['build']);
