const gulp = require('gulp')
const {exec} = require('child_process')
/**
 * Build ESM by running npm task.
 * This is a temporary solution until ngc is supported --watch mode.
 * @see: https://github.com/angular/angular/issues/12867
 */
gulp.task('build:esm', (callback) => {
  exec('npm run ngcompile', function (error, stdout, stderr) {
    console.log(stdout, stderr)
    callback(error)
  })
})

/**
 * Implements ESM build watch mode.
 * This is a temporary solution until ngc is supported --watch mode.
 * @see: https://github.com/angular/angular/issues/12867
 */
gulp.task('build:esm:watch', ['build:esm'], () => {
  gulp.watch('src/**/*', ['build:esm'])
})
