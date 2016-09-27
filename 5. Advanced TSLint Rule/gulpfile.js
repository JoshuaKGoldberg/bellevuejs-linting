const gulp = require("gulp");
const gulpTslint = require("gulp-tslint");
const runSequence = require("run-sequence");
const tslint = require("tslint");
const typescript = require("gulp-typescript");

gulp.task("default", callback => {
    runSequence("build", "lint", callback);
});

gulp.task("build", () => {
    const tsProject = typescript.createProject("tsconfig.json");
    const tsResult = tsProject.src()
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest("."));
});

gulp.task("lint", () => {
    const tsProject = typescript.createProject("tsconfig.json");
    const program = tslint.createProgram("tsconfig.json")

    return tsProject.src()
        .pipe(gulpTslint({
            configuration: "tslint.json",
            formatter: "prose",
            program: program
        }))
        .pipe(gulpTslint.report({
            emitError: false
        }));
});

gulp.task("watch", () => {
    return gulp.watch(
        "**/*.ts",
        ["default"]);
});