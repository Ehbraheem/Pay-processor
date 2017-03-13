/**
 * Created by prof.BOLA on 13/03/2017.
 */

"use strict";

var gulp = require("gulp"),

    // gulp flow control
    gulpIf = require("gulp-if"),
    sync = require("gulp-sync")(gulp),

    // build tools
    del = require("del"),
    debug = require("debug"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    replace = require("gulp-replace"),

    // distribution minification
    useref = require("gulp-useref"),
    uglify = require("gulp-uglify"),
    cssMin = require("gulp-clean-css"),
    htmlMin = require("gulp-htmlmin"),

    // runtime tools
    browserSync = require("browser-sync").create();

 // source code path
var srcPath = "developemnt/src";

// vendor/processed code path
var buildPath = "development/build";

// vendor specific location for use in development
var vendorBuildPath = buildPath + "/vendor";

// distribution folder
var distPath = "dist";

// location of vendor packages
var bowerPath = "bower_components";

var config = {
    // sourcecode globs and build path
    root_html : { src: srcPath + "/index.html", bld: buildPath },
    css :       { src: srcPath + "/stylesheets/**/*.css", bld: buildPath + "/stylesheets" },
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


}

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