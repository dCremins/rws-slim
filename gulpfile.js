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
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const render = require('gulp-nunjucks-render')
const sass = require('gulp-sass')
const uglifyjs = require('uglify-es')

const paths = {
	styles: {
		src: 'dev/scss/*.scss',
		dist: 'dist/css'
	},
	scripts: {
		src: 'dev/js/*.js',
		build: 'dev',
		dist: 'dist/js'
	},
	includes: {
		src: 'dev/js/includes/*.js',
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
	return gulp.src(paths.scripts.src)
		.pipe(plumber())
		.pipe(concat('bundled.js'))
		.pipe(gulp.dest(paths.scripts.build))
		.pipe(uglify())
		.pipe(optimizejs())
		.pipe(rename('bundled.min.js'))
		.pipe(gulp.dest(paths.scripts.dist))
})

const jsWatch = gulp.watch(paths.scripts.src, gulp.parallel('javascript'))
jsWatch.on('all', path => {
	console.log('File ' + path + ' was changed. Running Javascript Task...')
})

/* 2. Includes */

gulp.task('includes', () => {
	return gulp.src(paths.includes.src)
		.pipe(plumber())
		.pipe(concat('includes.js'))
		.pipe(gulp.dest(paths.includes.build))
		.pipe(uglify())
		.pipe(optimizejs())
		.pipe(rename('includes.min.js'))
		.pipe(gulp.dest(paths.includes.dist))
})

const includesWatch = gulp.watch(paths.includes.src, gulp.parallel('includes'))
includesWatch.on('all', path => {
	console.log('File ' + path + ' was changed. Running Includes Task...')
})

/* 3. Styles */

gulp.task('sass', () => {
	return gulp.src(paths.styles.src)
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename('main.css'))
		.pipe(gulp.dest(paths.styles.dist))
})

const sassWatch = gulp.watch(paths.styles.src, gulp.parallel('sass'))
sassWatch.on('all', path => {
	console.log('File ' + path + ' was changed. Running Sass Task...')
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

const htmlWatch = gulp.watch(paths.html.src + '**/*', gulp.parallel('html'))
htmlWatch.on('all', path => {
	console.log('File ' + path + ' was changed. Running HTML Task...')
})

/* 6. Server */

gulp.task('connect', () => {
  browserSync(
		{
			server: {
				baseDir: 'build'
			}
		}
	)
})

/* 7. Global */

gulp.task('clean', () => {
	return del(['build/**/*'])
})

gulp.task('default', gulp.series('html', 'javascript', 'includes', 'sass', 'images', 'move', done => {
	done()
}))
gulp.task('serve', gulp.series('default', 'connect'))
gulp.task('deploy', gulp.series('clean', 'default', done => {
	done()
}))
