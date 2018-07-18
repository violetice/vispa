var gulp = require('gulp');
var del = require('gulp-clean');
var js = require('gulp-uglify');
var css = require('gulp-uglifycss');
var json = require('gulp-json-minify');
var html = require('vispa-htmlmin');
var gut = require('gulp-util');

var dist = './dist';

// 清理
gulp.task('del', function () {
    return gulp.src(dist + '/*').pipe(del());
});

var task = {
    // 混淆压缩js
    js: function () {
        return gulp.src('./src/**/*.js').pipe(js()).pipe(gulp.dest(dist));
    },

    // 压缩css
    css:function(){
        return gulp.src([
            './src/**/*.css',
            '!./src/**/*.min.css'
        ]).pipe(css()).pipe(gulp.dest(dist));
    },

    // 压缩json
    json:function(){
        return gulp.src('./src/**/*.json').pipe(json()).pipe(gulp.dest(dist));
    },

    // 压缩html
    html:function(){
        // css和js中没有写模板语法的
        return gulp.src([
            './src/**/*.html',
            '!./src/*/layout.html'
        ]).pipe(html()).pipe(gulp.dest(dist));
    },

    // 压缩layout
    layout:function(){
        return gulp.src('./src/*/layout.html').pipe(html({
            css:false
        })).pipe(gulp.dest(dist));
    },

    // 复制文件
    cp:function(){
        return gulp.src([
            './src/**/*.*',
            '!./src/**/*.{js,css,json,html,scss}'
        ]).pipe(gulp.dest(dist));
    },
};

gulp.task('js',task.js);

// 执行gulp
gulp.task('default', ['del'], function () {
    for (let i in task) {
        task[i].call();
    }
});