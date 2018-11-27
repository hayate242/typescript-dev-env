
// gulpプラグインの読み込み
const gulp = require('gulp');
// Sassをコンパイルするプラグインの読み込み
const sass     = require('gulp-sass');
const plumber  = require('gulp-plumber');
const concat   = require('gulp-concat');
const uglify   = require('gulp-uglify');
const typescript = require('gulp-typescript');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');

// style.scssをタスクを作成する
gulp.task('scss', function () {
    // style.scssファイルを取得 ※return必須
    return gulp.src('assets/scss/*.scss')
        .pipe(plumber())
        // Sassのコンパイルを実行
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        // cssフォルダー以下に保存
        .pipe(gulp.dest('assets/css'));
});

// jsファイル用

// concat
gulp.task('ts.concat', function () {
    return gulp.src('assets/ts/*.ts')
    .pipe(plumber())
    .pipe(concat('bundle.ts'))
    .pipe(gulp.dest('assets/ts/bundle/'));
});

gulp.task('tsify', () => {
    return browserify()
        .add('./assets/ts/main.ts')
        .plugin('tsify', {
            target: 'ES5',
            removeComments: true
        })
        .bundle()
        .pipe(plumber())
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./assets/js'));
});
// compile typescript
gulp.task('ts.compile', function () {
    //出力オプション
    var options =  {
        out: 'bundle.js'
    };
    return gulp.src('assets/ts/bundle/bundle.ts')
    .pipe(plumber())
    .pipe(typescript(options))
    .pipe(gulp.dest('assets/js/'));
});

// コードを見にくくuglify
gulp.task('js.uglify', function() {
    return gulp.src('assets/js/bundle.js')
      .pipe(plumber())
      .pipe(uglify('bundle.min.js'))
      .pipe(gulp.dest('assets/js/'));
});
gulp.task('js', gulp.series('tsify'))
// gulp.task('js', gulp.series('ts.concat', 'ts.compile', 'js.uglify'))



gulp.task('watch', function () {
    gulp.watch('assets/scss/*.scss', gulp.task('scss'));
    gulp.watch('assets/ts/*.ts', gulp.task('js'));
});

gulp.task('default', gulp.series( gulp.parallel('scss', 'js')));

// var gulp = require('gulp');
//  var typescript = require('gulp-typescript');


//  gulp.task('ts', function() {

//      //出力オプション
//      var options =  {
//         target: 'ES5',
//          out: 'main.js'
//      };

//      gulp.src([
//             './assets/ts/*.ts',
//             '!./node_modules/**'//node_modules配下は除外する
//           ])
//          .pipe(typescript(options))
//          .pipe(gulp.dest('./assets/js'));
//  });