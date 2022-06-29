const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const rollup = require('gulp-rollup');
const rollupStream = require('@rollup/stream');
const commonjs = require('@rollup/plugin-commonjs');
const source = require('vinyl-source-stream');

const distDir = "./dist";
const appFileName = "app.js";
const appFilePath = path.join(distDir, appFileName);


function prepare_for_espruino(cb) {
    // cb();
    if (!fs.existsSync(appFilePath)) {
        cb("main app file does not exit " + appFilePath);
        return;
    }

    let appContent = fs.readFileSync(appFilePath).toString();
    appContent = appContent.replace('Object.defineProperty(exports, "__esModule", { value: true });', "");
    fs.writeFileSync(appFilePath, appContent);
    cb();
}

function compile_ts() {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js
        // .pipe(rollup({
        //     // any option supported by Rollup can be set here.
        //     input: './src/app.js',
        //     output: {
        //         dir: 'dist',
        //         format: 'cjs'
        //     },
        //     plugins: [commonjs()]
        // }))
        .pipe(gulp.dest(distDir));
}

function content_to_dist() {
    return gulp
        .src("src/**/*.js", { base: 'src' })
        //         .pipe(gulp.dest(distDir));
        // }

        // function bablify() {
        //     return gulp.src('dist/**/*.js')
        .pipe(plumber())
        .pipe(rollup({
            // any option supported by Rollup can be set here.
            input: './src/app.js',
            output: {
                dir: 'output',
                format: 'cjs'
            },
            plugins: [commonjs]
        }))
        .pipe(babel({
            "plugins": [
                // "async-to-promises",
                // [
                //     "@babel/plugin-proposal-record-and-tuple",
                //     {
                //         "importPolyfill": true,
                //         "syntaxType": "hash"
                //     }
                // ],
                "@babel/plugin-transform-template-literals",
                "@babel/plugin-transform-spread",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-class-static-block",
                "@babel/plugin-proposal-numeric-separator",
                "@babel/plugin-proposal-nullish-coalescing-operator",
                "@babel/plugin-transform-destructuring",
                "@babel/plugin-transform-modules-commonjs",
                "@babel/plugin-transform-typeof-symbol",

                // "@babel/plugin-transform-regenerator",
                "@babel/plugin-proposal-async-generator-functions",
                "@babel/plugin-transform-exponentiation-operator"
            ]
        }))
        // .pipe(gulp.dest('./dist2'));
        .pipe(gulp.dest(distDir));
}


function compile_to_dist() {
    return rollupStream({
        input: './dist/app.js',
        output: {
            dir: 'dist',
            format: 'esm'
        },
        plugins: [commonjs()]
    })
        .pipe(source('app.js'))
        .pipe(gulp.dest(distDir));
}

function bablify() {
    return gulp.src('./dist/app.js')
    .pipe(babel({
        "plugins": [
            // "async-to-promises",
            // [
            //     "@babel/plugin-proposal-record-and-tuple",
            //     {
            //         "importPolyfill": true,
            //         "syntaxType": "hash"
            //     }
            // ],
            "@babel/plugin-transform-template-literals",
            "@babel/plugin-transform-spread",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-proposal-class-static-block",
            "@babel/plugin-proposal-numeric-separator",
            "@babel/plugin-proposal-nullish-coalescing-operator",
            "@babel/plugin-transform-destructuring",
            "@babel/plugin-transform-modules-commonjs",
            "@babel/plugin-transform-typeof-symbol",

            // "@babel/plugin-transform-regenerator",
            // "@babel/plugin-proposal-async-generator-functions",
            "@babel/plugin-transform-exponentiation-operator"
        ]
    }))
    .pipe(gulp.dest(distDir));

}

gulp.task("compile-ts", gulp.series(compile_ts));

gulp.task("content-to-dist", content_to_dist);

gulp.task("prepare-for-espruino", gulp.series('compile-ts', 'content-to-dist', prepare_for_espruino));

gulp.task("build", gulp.series("prepare-for-espruino"));

gulp.task('myTest', gulp.series(compile_ts, compile_to_dist, bablify, prepare_for_espruino));