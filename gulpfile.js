"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  // it adds browser prefixes
  autoprefixer = require("autoprefixer"),
  // it reorders css options in wished order
  csscomb = require("gulp-csscomb"),
  // css minifier
  nano = require("gulp-cssnano"),
  // it helps rename files/
  // for example, adding suffix .min to files
  rename = require("gulp-rename"),
  // image minifier
  imagemin = require("gulp-imagemin"),
  // js minifier
  uglify = require("gulp-uglify"),
  // it replaces one string in the file to another.
  replace = require("gulp-replace"),
  // it hepls to execute tasks in the right order
  runSequence = require("run-sequence"),
  // simple template engine
  pagebuilder = require("gulp-pagebuilder"),
  // livereload
  browserSync = require("browser-sync"),
  reload = browserSync.reload,
  // it organize media querries at the end of the style file
  combineMq = require("gulp-combine-mq"),
  // it removes files
  del = require("del"),
  // it turns relative path to file into filename
  flatten = require("gulp-flatten"),
  // custom realization standart watch.
  // gulp doesn't notice files created after launching gulp.
  // this plugin resolves this issue.
  watch = require("gulp-watch"),
  // streaming helper for gulp-watch.
  batch = require("gulp-batch");

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
      // double asterisk means any amounts any symbols.
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
    // if in the project there are several basic style files
    // the variable 'path.src.style.self' is equal to folder,
    // which contains the files. in other case the one is equal to path to the basic style file.
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


gulp.task("watch", function() {
  watch(path.src.style.folder, batch(function(events, done) {
      gulp.start("style", done);
  }));
  watch(path.src.html.folder, batch(function(events, done) {
      gulp.start("html", done);
  }));
  watch(path.src.fonts, batch(function(events, done) {
      gulp.start("fonts", done);
  }));
  watch(path.src.img, batch(function(events, done) {
      gulp.start("img", done);
  }));
  watch(path.src.script.folder, batch(function(events, done) {
      gulp.start("js", done);
  }));
})

gulp.task("build", function () {
    runSequence(
        "clean",
        [
            "build:style",
            "build:js",
            "build:html",
            "build:img",
            // fonts:build task doesn't diffs from fonts, therefore it doesn't exist.
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
