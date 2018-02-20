/*
*
*	1.	Scripts
*	2.	Includes
*	3.	Styles
*	4.	Images
*	5.	HTML
*	6.	Server
*	7.	Globals
*
*/

const gulp = require('gulp')
const browserSync = require('browser-sync')
const composer = require('gulp-uglify/composer')
const concat = require('gulp-concat')
const data = require('gulp-data')
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const imageResize = require('gulp-image-resize')
const optimizejs = require('gulp-optimize-js')
const pump = require('pump')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const render = require('gulp-nunjucks-render')
const sass = require('gulp-sass')
const uglifyjs = require('uglify-es')

var paths = {
	styles: {
		src: 'scss/*.scss',
		dest: 'dist'
	},
	scripts: {
		src: 'js/*.js',
		dest: 'dist'
	},
	includes: {
		src: 'js/includes/*.js',
		dest: 'dist'
	},
	images: {
		src: 'images/*',
		dest: 'dist/images'
	},
	html: {
		src: 'nunjucks/*',
		templates: 'nunjucks/templates',
		data: './nunjucks/data.json',
		dest: 'dist'
	}
}



/* 1. Scripts */

const uglify = composer(uglifyjs, console)

gulp.task('javascript', () => {
	return gulp.src(paths.scripts.src)
	.pipe(plumber())
	.pipe(concat('bundled.js'))
	.pipe(uglify())
  .pipe(optimizejs())
	.pipe(rename('bundled.min.js'))
	.pipe(gulp.dest(paths.scripts.dest))
})

const js_watch = gulp.watch(paths.scripts.src, gulp.parallel('javascript'))
js_watch.on('all', (path) => {
	console.log('File ' + path + ' was changed. Running Javascript Task...')
})


/* 2. Includes */

gulp.task('includes', () => {
	return gulp.src(paths.includes.src)
	.pipe(plumber())
	.pipe(concat('includes.js'))
	.pipe(uglify())
  .pipe(optimizejs())
	.pipe(rename('includes.min.js'))
	.pipe(gulp.dest(paths.includes.dest))
})

const includes_watch = gulp.watch(paths.includes.src, gulp.parallel('includes'))
includes_watch.on('all', (path) => {
	console.log('File ' + path + ' was changed. Running Includes Task...')
})

/* 3. Styles */

gulp.task('sass', () => {
	return gulp.src(paths.styles.src)
	.pipe(plumber())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(rename('main.css'))
	.pipe(gulp.dest(paths.styles.dest))
})

const sass_watch = gulp.watch(paths.styles.src, gulp.parallel('sass'))
sass_watch.on('all', (path) => {
	console.log('File ' + path + ' was changed. Running Sass Task...')
})


/* 4. Images */

gulp.task('images', () => {
	return gulp.src(paths.images.src)
	.pipe(plumber())
	.pipe(imageResize({
    width : 256,
    height : 256,
    crop : false,
    upscale : false
  }))
	.pipe(imagemin())
  .pipe(gulp.dest(paths.images.dest))
})

/* 5. HTML */
/*
gulp.task('html', () => {
	return pump([
			gulp.src(paths.html.src),
    	htmlmin({collapseWhitespace: true}),
			gulp.dest(paths.html.dest)
		],
		cb
	)
})
*/
gulp.task('html', (cb) => {
  return gulp.src(paths.html.src+'.nunjucks')
	.pipe(plumber())
	.pipe(data(() => { return require(paths.html.data) }))
	.pipe(render({ path: [paths.html.templates] }))
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest(paths.html.dest))
})

const html_watch = gulp.watch(paths.html.src, gulp.parallel('html'))
html_watch.on('all', (path) => {
	console.log('File ' + path + ' was changed. Running HTML Task...')
})

/* 6. Server */

gulp.task('connect', () => {
  browserSync({
    server: {
			baseDir: 'dist'
		}
  })
})

/* 7. Global */

gulp.task('clean', () => {
  return del(['dist/**/*'])
})

gulp.task('default', gulp.series('html', 'javascript', 'includes', 'sass', 'images', 'connect'))
