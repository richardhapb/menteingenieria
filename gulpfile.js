
const { src, dest, watch, parallel } = require('gulp');

// CSS and error handle
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Images
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css (callback) {
  src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest('public_html/build/css'));

  callback();
}

function compressImg (callback) {
  const settings = {
    optimizationLevel: 3
  };

  src('src/img/**/*.{jpg,png}')
    .pipe(cache(imagemin(settings)))
    .pipe(dest('public_html/build/img'));

  callback();
}

function imageWebp (callback) {
  const settings = {
    quality: 50
  };

  src('src/img/**/*.{jpg,png}')
    .pipe(webp(settings))
    .pipe(dest('public_html/build/img'));

  callback();
}

function imageAvif (callback) {
  const settings = {
    quality: 50
  };

  src('src/img/**/*.{jpg,png}')
    .pipe(avif(settings))
    .pipe(dest('public_html/build/img'));

  callback();
}

function javascript (callback) {
  src('src/js/**/*.js')
    .pipe(dest('public_html/build/js'));

  callback();
}

function dev (callback) {
  watch('src/scss/**/*.scss', css);
  watch('src/js/**/*.js', javascript);

  callback();
}

exports.dev = parallel(compressImg, imageAvif, imageWebp, javascript, dev);
