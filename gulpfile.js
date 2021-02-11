const {src, dest, watch, series, parallel} = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
const pkg = require('./package.json');
const conf = pkg['gulp-config'];
const sizes = conf.sizes;
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const server = browserSync.create();
const isProd = process.env.NODE_ENV === "production";


function icon(done){//画像圧縮のみ　
   
        src('./src/images/**')
        
        .pipe($.imagemin())
        .pipe(dest('./dist/images/'));

    done();
}

function styles() {
    return src('./src/styles/**')
    .pipe($.if(!isProd, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.postcss([
            autoprefixer(['last 3 versions', 'ie >= 8', 'Android >= 4', 'iOS >= 8'])
        ]))
        .pipe($.if(!isProd, $.sourcemaps.write('.')))
        .pipe(dest('./dist/css'));
}

function scripts() {
    return src('./src/scripts/**')
        .pipe($.if(!isProd, $.sourcemaps.init()))
        .pipe($.babel())
        .pipe($.if(!isProd, $.sourcemaps.write('.')))
        .pipe(dest('./dist/js'));
}

function lint() {
    return src('./src/js/*.js')
        .pipe($.eslint({ fix: true }))
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError())
        .pipe(dest('./src/js'))
}

function startAppServer(){
    server.init({
        server: {
            baseDir: './dist'
        }
    });
    watch('./src/**/*.scss', styles);
    watch('./src/**/*.scss').on('change', server.reload);
}

const serve = series(parallel(styles, series(lint, scripts)), startAppServer);

exports.icon = icon;
exports.styles = styles;
exports.scripts = scripts;
exports.lint = lint;
exports.serve = serve;