/*
*
*	1.	Scripts
*	2.	Includes
*	3.	Styles
*	4.	Images
*	5.	HTML
*	6.	Watch
*	7.	Server
*	8.	Globals
*
*/

const gulp = require('gulp')
const browserSync = require('browser-sync')
const compiler = require('google-closure-compiler').gulp()
const composer = require('gulp-uglify/composer')
const concat = require('gulp-concat')
const data = require('gulp-data')
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const imageResize = require('gulp-image-resize')
const jsValidate = require('gulp-jsvalidate')
const optimizejs = require('gulp-optimize-js')
const prettier = require('gulp-prettier-plugin')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const render = require('gulp-nunjucks-render')
const sass = require('gulp-sass')
const uglifyjs = require('uglify-es')
const vinylPaths = require('vinyl-paths')
const xo = require('gulp-xo')

const paths = {
	styles: {
		src: 'dev/scss/*.scss',
		dist: 'dist/css'
	},
	scripts: {
		src: 'dev/js/*.js',
		includes: 'dev/js/includes/*.js',
		bundle: 'dev/*.js',
		build: 'dev',
		dist: 'dist/js'
	},
	images: {
		src: 'dev/images/*',
		dist: 'dist/images'
	},
	move: {
		src: 'dev/asis/**/*',
		dist: 'dist'
	},
	html: {
		src: 'dev/nunjucks/*',
		templates: 'dev/nunjucks/templates',
		data: './dev/nunjucks/data.json',
		dist: 'dist'
	}
}

/* 1. Scripts */

const uglify = composer(uglifyjs, console)

gulp.task('javascript', () => {
	return gulp.src(paths.scripts.src, {base: './'})
		.pipe(compiler({
			warning_level: 'VERBOSE',
			jscomp_off: 'globalThis',
			jscomp_off: 'checkTypes',
			language_out: 'ECMASCRIPT5_STRICT',
			js_output_file: './main.js',
			externs: 'dev/ignore/externs.js'
		}))
		.pipe(gulp.dest(paths.scripts.build))
})

gulp.task('includes', () => {
	return gulp.src(paths.scripts.includes, {base: './'})
		.pipe(compiler({
			warning_level: 'VERBOSE',
			jscomp_off: 'globalThis',
			jscomp_off: 'checkTypes',
			externs: 'dev/ignore/externs.js',
			language_out: 'ECMASCRIPT5_STRICT',
			js_output_file: './includes.js'
		}))
		.pipe(gulp.dest(paths.scripts.build))
})

gulp.task('bundle', gulp.series(gulp.parallel('includes', 'javascript'), () => {
	return gulp.src(paths.scripts.bundle)
		.pipe(vinylPaths(del))
		.pipe(plumber())
		.pipe(concat('bundled.min.js'))
		.pipe(optimizejs())
		.pipe(jsValidate())
		.pipe(gulp.dest(paths.scripts.dist))
}))

/* 3. Styles */

gulp.task('sass', () => {
	return gulp.src(paths.styles.src)
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename('main.css'))
		.pipe(gulp.dest(paths.styles.dist))
})

/* 4. Images */

gulp.task('images', () => {
	return gulp.src(paths.images.src)
		.pipe(plumber())
		.pipe(imageResize({
			width: 256,
			height: 256,
			crop: false,
			upscale: false
		}))
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dist))
})

gulp.task('move', () => {
	return gulp.src(paths.move.src)
		.pipe(plumber())
		.pipe(gulp.dest(paths.move.dist))
})

/* 5. HTML */

gulp.task('html', () => {
	return gulp.src(paths.html.src + '.nunjucks')
		.pipe(plumber())
		.pipe(data(() => {
			return require(paths.html.data)
		}))
		.pipe(render({path: [paths.html.templates]}))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(paths.html.dist))
})

/* 6. Watch */

gulp.task('watch', () => {
})

/* 7. Server */

gulp.task('connect', () => {
  browserSync({server: {baseDir: 'dist'}})
	gulp.watch(paths.scripts.build + '**/*')
		.on('change', gulp.parallel('bundle'))
})

/* 8. Global */

gulp.task('clean', () => {
	return del(['dist'])
})

gulp.task('default', gulp.series('html', 'bundle', 'sass', 'images', 'move'))

gulp.task('serve', gulp.series('default', 'connect'))

gulp.task('deploy', gulp.series('clean', 'default'))
