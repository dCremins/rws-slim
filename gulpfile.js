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
const closureCompiler = require('google-closure-compiler').gulp()
const composer = require('gulp-uglify/composer')
const concat = require('gulp-concat')
const data = require('gulp-data')
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const imageResize = require('gulp-image-resize')
const jsValidate = require('gulp-jsvalidate')
const minify = require('gulp-uglify-es').default
const prettier = require('gulp-prettier-plugin')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const render = require('gulp-nunjucks-render')
const sass = require('gulp-sass')
const uglifyjs = require('uglify-es')
const xo = require('gulp-xo')

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
		.pipe(prettier({
			arrowParens: 'always',
			bracketSpacing: false,
			semi: false,
			singleQuote: true,
			useTabs: true
		},
    {filter: true})
    )
		.pipe(xo({
			fix: true
		}))
		.pipe(xo.format())
		.pipe(jsValidate())
		.pipe(gulp.dest(paths.scripts.build))
})

gulp.task('includes', () => {
	return gulp.src(paths.includes.src)
		.pipe(plumber())
		.pipe(concat('includes.min.js'))
		.pipe(prettier({
			arrowParens: 'always',
			bracketSpacing: false,
			semi: false,
			singleQuote: true,
			useTabs: true
		},
    {filter: true})
    )
		.pipe(xo({
			fix: true
		}))
		.pipe(xo.format())
		.pipe(jsValidate())
		.pipe(gulp.dest(paths.includes.dist))
})

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
	const jsWatch = gulp.watch(paths.scripts.src, gulp.parallel('javascript'))
	const includesWatch = gulp.watch(paths.includes.src, gulp.parallel('includes'))
	const sassWatch = gulp.watch(paths.styles.src, gulp.parallel('sass'))
	const htmlWatch = gulp.watch(paths.html.src + '**/*', gulp.parallel('html'))

	htmlWatch.on('change', path => {
		console.log('File ' + path + ' was changed. Running HTML Task...')
	})
	sassWatch.on('change', path => {
		console.log('File ' + path + ' was changed. Running Sass Task...')
	})
	includesWatch.on('change', path => {
		console.log('File ' + path + ' was changed. Running Includes Task...')
	})
	jsWatch.on('change', path => {
		console.log('File ' + path + ' was changed. Running Javascript Task...')
	})
})

/* 7. Server */

gulp.task('connect', () => {
  browserSync(
		{
			server: {
				baseDir: 'build'
			}
		}
	)
})

/* 8. Global */

gulp.task('clean', () => {
	return del(['dist/**/*'])
})

gulp.task('default', gulp.series('html', 'includes', 'sass', 'images', 'move'))

gulp.task('serve', gulp.series('default', 'watch', 'connect'))

gulp.task('deploy', gulp.series('clean', 'default'))
