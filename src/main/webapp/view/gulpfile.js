//引入插件
var gulp        = require('gulp');
var concat      = require('gulp-concat');     //合并工具
var gutil       = require('gulp-util');
var rename      = require('gulp-rename');     //重命名
var uglify      = require('gulp-uglify');     //压缩js
var minifyCSS   = require('gulp-minify-css'); //压缩css
var del         = require('del');             //删除
//var jshint      = require("gulp-jshint");     //检查js代码
var jade        = require('gulp-jade');        //jade
var prettify    = require('gulp-html-prettify');

var jadeFiles =[
    {src:'master/html/index.jade',dest:'app/html'},
    {src:'master/html/test.jade',dest:'app/html'}];
//定义源文件路径变量


//定义目标文件路径变量



//默认任务
//gulp.task('default',['concat-js','mini-js']);
//gulp.task('default',['concat-mini-js']);
//gulp.task('default',['mini-css']);
/*gulp.task('default',['clean'],function(){
    gulp.start('concat-js','mini-js','mini-css');
});*/

//gulp.task('default',['jsLint']);

gulp.task('default',['jade']);

//---------------------------------------------

//压缩js任务
gulp.task('mini-js',function(){
    return gulp.src('app/js/all.js')         // 要压缩的js文件
        .pipe(uglify())                      // 使用uglify进行压缩
        .pipe(rename({suffix: '.min'}))      // 重命名all.min.js
        .pipe(gulp.dest('app/js/min'));      // 输出路径
});

//合并js任务
gulp.task('concat-js',function(){
    return gulp.src('master/js/**/*.js')      // 要合并的js文件
        .pipe(concat('all.js'))               // 合并的js重命名为 "all.js"
        .pipe(gulp.dest('app/js'));           // 输出
});

//合并并压缩js任务
gulp.task('concat-mini-js',function(){
    return gulp.src('master/js/**/*.js')      // 要合并的js文件
        .pipe(concat('all2.js'))              // 合并的js重命名为 "all.js"
        .pipe(gulp.dest('app/js'))            // 输出
        .pipe(uglify())                       // 使用uglify进行压缩
        .pipe(rename({suffix: '.min'}))       // 重命名all.min.js
        .pipe(gulp.dest('app/js/min'));       // 输出路径
});

//js检查
//gulp.task('jsLint',function(){
//    return gulp.src('master/js/**/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter());              // 输出检查结果
//});

//---------------------------------------------

// 压缩css
gulp.task('mini-css',function(){
    return gulp.src('app/css/test.css')         // 要压缩的css文件
        .pipe(minifyCSS())                      // 进行压缩
        .pipe(rename({suffix: '.min'}))         // 重命名test.min.js
        .pipe(gulp.dest('app/css/min'));        // 输出路径
});

// 执行压缩前，先删除文件夹里的内容
gulp.task('clean', function() {
    return del(['app/js/min', 'app/css/min']);
});


//------jade---------------------------------------
gulp.task('jade', function(){
    jadeFiles.forEach(function(jf){
        if(!jf.src || !jf.dest) return;
        gulp.src(jf.src)
            .pipe(jade({petty: true}))
            .on("error", handleError)
            .pipe(prettify({            // 格式化
                indent_char: ' ',
                indent_size: 3,
                unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
            }))
            .pipe(gulp.dest(jf.dest));
    });
});



function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}
