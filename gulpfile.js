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
    bootstrap_sass :   {src: bowerPath + "/bootstrap/scss/" },

    //TODO: Remove for bootstrap v4 migration
    // // vendor fonts src globs
    bootstrap_fonts :  {src: bowerPath + "/bootstrap-sass/assets/fonts/**/*" },

    // vendor js src globs
    jquery :           {src: bowerPath + "/jquery2/jquery.js" },
    bootstrap_js :     {src: bowerPath + "/bootstrap/dist/js/bootstrap.js" },
    bootstrap_tether_css : {src: bowerPath + "/tether/dist/css/*.css"},
    bootstrap_tether_js : {src: bowerPath + "/tether/dist/js/tether.js"},
    angular :          {src: bowerPath + "/angular/angular.js" },
    angular_ui_router :{src: bowerPath + "/angular-ui-router/release/angular-ui-router.js" },

    // vendor build locations
    vendor_js :    { bld: vendorBuildPath + "/javascripts" },
    vendor_css :   { bld: vendorBuildPath + "/stylesheets" },

    vendor_fonts : { bld: vendorBuildPath + "/stylesheets/fonts" },

    // TODO: Fix the API
    providerUrl : { dev: "http://localhost:3000",
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
gulp.task("clean:build", () => {
    return del(buildPath);
});

// remove all files below the dist area
gulp.task("clean:dist", () => {
    return del(distPath);
});

// remove all files below both the build and dist area
gulp.task("clean", ["clean:build", "clean:dist"]);

// place vendor css files in build area
gulp.task("vendor_css", () => {
    return gulp.src([
        // cfg.bootstrap_css.src,
        ])
        .pipe(gulp.dest(cfg.vendor_css.bld));
});

// place vendor js files in build area
gulp.task("vendor_js", () => {
    return gulp.src([
        cfg.jquery.src,
        cfg.bootstrap_tether_js.src,
        cfg.bootstrap_js.src,
        cfg.angular.src,
        cfg.angular_ui_router.src,
        ])
        .pipe(gulp.dest(cfg.vendor_js.bld));
});

// place all vendor font files in build area
gulp.task("vendor_fonts", () => {
    return gulp.src([
        cfg.bootstrap_fonts.src,
        ])
        .pipe(gulp.dest(cfg.vendor_fonts.bld));
});

//TODO: Fix error
// compile sass files
gulp.task("css", () => {
    return gulp.src([cfg.css.src, cfg.bootstrap_tether_css.src]).pipe(debug())
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: [cfg.bootstrap_sass.src]}))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest(cfg.css.bld)).pipe(debug());
});

// prepare the development area
gulp.task("build", sync.sync(["clean:build", ["vendor_css", "vendor_js", "vendor_fonts", "css"]]));


// helper method to launch server and to watch for changes
function browserSyncInit(baseDir, watchFiles) {
    browserSync.instance = browserSync.init(watchFiles, {
        server : { baseDir: baseDir},
        port : 8080,
        ui : {port : 8090}
    });
};

// run the browser against the development/build area and watch files being edited
gulp.task("browserSync", ["build"], () => {
    browserSyncInit(devResourcePath, [
        cfg.root_html.src,
        cfg.css.bld + "/**/*.css",
        cfg.js.src,
        cfg.html.src,
     ]);
});

// prepare the development environment, launch server and watch for file changes
gulp.task("run", ["build", "browserSync"], () => {
    // extensions to watch() within even if we need to pre-process source code
    gulp.watch(cfg.css.src, ["css"]);
});


// build assets referenced from root-level HTML file and create refs in HTML file
gulp.task("dist:assets", ["build"], () => {
    return gulp.src(cfg.root_html.src).pipe(debug())
        .pipe(useref({ searchPath: devResourcePath }))
        .pipe(gulpIf(["/**/*.js"], replace(cfg.providerUrl.dev, cfg.providerUrl.prd))) // replace URL from file
        .pipe(gulpIf(["**/*.js"], uglify())) // minify js
        .pipe(gulpIf(["**/*.css"], cssMin())) // minify css
        .pipe(gulp.dest(distPath)).pipe(debug());
});

// build/copy over font resources into dist tree
gulp.task("dist:fonts", () => {
    return gulp.src(cfg.vendor_fonts.bld + "/**/*", {base: cfg.vendor_css.bld})
        .pipe(gulp.dest(distPath));
});

// build/ copy over HTML resources into dist tree
//TODO: Fix buggy code
// gulp.task("dist:html", () => {
//     return gulp.src(cfg.html.src).pipe(debug())
//         .pipe(htmlMin({collapseWhitespace: true })) // minify HTML
//         .pipe(gulp.dest(distPath)).pipe(debug());
// });

gulp.task("dist:html", () => {
    return gulp.src(cfg.html.src, { base: srcPath + "/javascripts"}).pipe(debug())
        .pipe(htmlMin({ collapseWhitespace: true })) // minify HTML
        .pipe(gulp.dest(distPath)).pipe(debug());
});

// build all dist artifacts ready for deployment
gulp.task("dist", sync.sync(["clean:dist", "build", "dist:assets", "dist:fonts", "dist:html"]));

// execute the dist web-app in a web server
gulp.task("dist:run", ["dist"], () => {
    browserSyncInit(distPath);
});


