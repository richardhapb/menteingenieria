
import gulp from 'gulp';
import plumber from 'gulp-plumber';

// Images
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import avif from 'gulp-avif';

const { src, dest, watch, parallel } = gulp;

// CSS and error handle
import sass from 'sass';

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

const _dev = parallel(compressImg, imageAvif, imageWebp, javascript, dev);
export { _dev as dev };
