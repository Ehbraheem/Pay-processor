/**
 * Created by prof.BOLA on 13/03/2017.
 */

"use strict";

var gulp = require("gulp");

    // gulp flow control
var gulpIf = require("gulp-if"),
    sync = require("gulp-sync")(gulp);

    // build tools
var del = require("del"),
    debug = require("gulp-debug"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    replace = require("gulp-replace");

    // distribution minification
var useref = require("gulp-useref"),
    uglify = require("gulp-uglify"),
    cssMin = require("gulp-clean-css"),
    htmlMin = require("gulp-htmlmin");

    // runtime tools
var browserSync = require("browser-sync").create();

 // source code path
var srcPath = "client/src";

// vendor/processed code path
var buildPath = "client/build";

// vendor specific location for use in development
var vendorBuildPath = buildPath + "/vendor";

// distribution folder
var distPath = "dist";

// location of vendor packages
var bowerPath = "bower_components";

var cfg = {
    // sourcecode globs and build path
    root_html : { src: srcPath + "/index.html", bld: buildPath },
    css : { src: srcPath + "/stylesheets/**/*.css", bld: buildPath + "/stylesheets" },
    js :        { src: srcPath + "/javascripts/**/*.js" },
    html :      { src: [srcPath + "/**/*.html", "!" + srcPath + "/*.html" ]},

    // vendor css src globs
    bootstrap_sass :   {src: bowerPath + "/bootstrap-sass/assets/stylesheets/" },

    // vendor fonts src globs
    bootstrap_fonts :  {src: bowerPath + "/bootstrap-sass/assets/fonts/**/*" },

    // vendor js src globs
    jquery :           {src: bowerPath + "/jquery2/jquery.js" },
    bootstrap_js :     {src: bowerPath + "/bootstrap-sass/assets/javascripts/bootstrap.js" },
    angular :          {src: bowerPath + "/angular/angular.js" },
    angular_ui_router :{src: bowerPath + "/angular-ui-router/release/angular-ui-router.js" },

    // vendor build locations
    vendor_js :    { bld: vendorBuildPath + "/javascripts" },
    vendor_css :   { bld: vendorBuildPath + "/stylesheets" },
    vendor_fonts : { bld: vendorBuildPath + "/stylesheets/fonts" },

    // TODO: Fix the API
    paymentUrl : { dev: "http://localhost:3000",
                   prd: "http://localhost:3000" },


};

// files within hese paths will be saved as a root-level resources in this priority order
var devResourcePath = [
    cfg.vendor_js.bld,
    cfg.vendor_css.bld,
    buildPath + "/javascripts",
    buildPath + "/stylesheets",
    srcPath,
    srcPath + "/javascripts",
    srcPath + "/styleheets"
];

// TODO: DRY-out tasks

// Remove all files below the build tree
gulp.task("clean:build", function () {
    return del(buildPath);
});

// remove all files below the dist area
gulp.task("clean:dist", function () {
    return del(distPath);
});

// remove all files below both the build and dist area
gulp.task("clean", ["clean:build", "clean:dist"]);

// place vendor css files in build area
gulp.task("vendor_css", function () {
    return gulp.src([
        // cfg.bootstrap_css.src,
        ])
        .pipe(gulp.dest(cfg.vendor_css.bld));
});

// place vendor js files in build area
gulp.task("vendor_js", function () {
    return gulp.src([
        cfg.jquery.src,
        cfg.bootstrap_js.src,
        cfg.angular.src,
        cfg.angular_ui_router.src
        ])
        .pipe(gulp.dest(cfg.vendor_js.bld));
});

// place all vendor font files in build area
gulp.task("vendor_fonts", function () {
    return gulp.src([
        cfg.bootstrap_fonts.src,
        ])
        .pipe(gulp.dest(cfg.vendor_fonts.bld));
});

//TODO: Fix error
// compile sass files
gulp.task("css", function () {
    return gulp.src(cfg.css.src).pipe(debug())
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: [cfg.bootstrap_sass.src]}))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest(cfg.css.bld)).pipe(debug());
});

// prepare the development area
gulp.task("build", sync.sync(["clean:build", ["vendor_css", "vendor_js", "vendor_fonts", "css"]]));