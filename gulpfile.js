"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  csscomb = require("gulp-csscomb"),
  nano = require("gulp-cssnano"),
  rename = require("gulp-rename"),
  imagemin = require("gulp-imagemin"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  replace = require("gulp-replace"),
  runSequence = require("run-sequence"),
  pagebuilder = require("gulp-pagebuilder"),
  browserSync = require("browser-sync"),
  combineMq = require("gulp-combine-mq"),
  reload = browserSync.reload,
  del = require("del"),
  flatten = require("gulp-flatten");

var path = {
  build: {
    css: "dist/css",
    html: "dist",
    fonts: "dist/fonts",
    js: "dist/js",
    img: "dist/img"
  },

  src: {
    self: "source",
    style: {
      temp: "source/sass/*.scss",
      folder: "source/sass/**/**.*",
      self: "source/sass/"
    },

    html: {
      folder: "source/**/*.html",
      self: "source/*.html"
    },
    fonts: "source/fonts/**/*.*",
    img: "source/img/**/*.*",
    script: {
      bower: "bower_components/**/",
      folder: "source/js/**/**.js",
      self: "source/js/*.js"
    }
  }
};

gulp.task("build:style", function () {
  return gulp.src([
        path.src.style.self + "case.scss",
        path.src.style.self + "blog.scss"
    ])
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(postcss([autoprefixer({browsers: ["last 4 versions"]})]))
    .pipe(csscomb())
    .pipe(combineMq())
    .pipe(gulp.dest(path.build.css))
    .pipe(nano())
    .pipe(rename({ suffix: ".min"}))
    .pipe(gulp.dest(path.build.css))
});

gulp.task("style", function () {
  return gulp.src([
        path.src.style.self + "case.scss",
        path.src.style.self + "blog.scss"
    ])
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(postcss([autoprefixer({browsers: ["last 4 versions"]})]))
    .pipe(csscomb())
    .pipe(combineMq())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({
      stream: true
    }))
});

gulp.task("html", function () {
  return gulp.src(path.src.html.self)
    .pipe(pagebuilder(path.src.self))
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({
      stream: true
    }))
});

gulp.task("build:html", function () {
  return gulp.src(path.src.html.self)
    .pipe(pagebuilder(path.src.self))
    .pipe(replace(/.css\"/g, ".min.css\""))
    .pipe(replace(/.js\"/g, ".min.js\""))
    .pipe(gulp.dest(path.build.html))
});

gulp.task("fonts", function () {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload({
      stream: true
    }))
});

gulp.task("img", function () {
  return gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({
      stream: true
    }))
});

gulp.task("build:img", function () {
  return gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 3,
      svgoPlugins: [{cleanupIDs: false}],
      multipass: true
    }))
    .pipe(gulp.dest(path.build.img))
});

gulp.task("build:js", function () {
  return gulp.src([
/*      path.src.script.bower + "jquery.min.js",
      path.src.script.bower + "slick.min.js",
      path.src.script.bower + "mustache.min.js",*/
      path.src.script.self
    ])
    .pipe(pagebuilder(path.src.self))
    .pipe(flatten())
    .pipe(gulp.dest(path.build.js))
    .pipe(rename({ suffix: ".min"}))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
});

gulp.task("js", function () {
  return gulp.src([
/*      path.src.script.bower + "jquery.min.js",
      path.src.script.bower + "slick.min.js",
      path.src.script.bower + "mustache.min.js",*/
      path.src.script.self
    ])
    .pipe(pagebuilder(path.src.self))
    .pipe(flatten())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({
      stream: true
    }))
});

gulp.task("clean", function () {
  return del([path.build.html])
});

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "./dist/"
    },
    logLevel: "info",
    open: false,
    ghostMode: false,
    notify: false,
    injectChanges: true,
    codeSync: true,
    reloadDelay: 500
  });
});

gulp.task("watch", function () {
  gulp.watch(path.src.style.folder, ["style"]);
  gulp.watch(path.src.html.folder, ["html"]);
  gulp.watch(path.src.fonts, ["fonts"]);
  gulp.watch(path.src.img, ["img"]);
  gulp.watch(path.src.script.folder, ["js"]);
});

gulp.task("build", function () {
    runSequence(
        "clean",
        [
            "build:style",
            "build:js",
            "build:html",
            "build:img",
            "fonts"
        ]
    );
});

gulp.task("default", function() {
  runSequence(
    "clean",
    [
      "style",
      "html",
      "fonts",
      "img",
      "js",
      "server",
      "watch"
    ]
  );
});
