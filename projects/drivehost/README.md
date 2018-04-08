# Environment setup
In order to run this project locally, you will have to setup your local eveironment following these steps.
Make sure you have nodejs installed and type these commands in your terminal at the project root folder: (if you have gulp installed locally, you can ignore it)
```sh
$ npm install gulp --save-dev 
```
gulp packages you would need are:

* gulp-less
* gulp-rename
* gulp-minify-css
* gulp-watch
* gulp-minify
* gulp-inject-partials

install them by running these commands one after another:

```sh
$ npm install gulp-less --save-dev
$ npm install gulp-rename --save-dev
$ npm install gulp-minify-css --save-dev
$ npm install gulp-watch --save-dev
$ npm install gulp-minify --save-dev
$ npm install gulp-inject-partials --save-dev
```
now run:
```sh
$ gulp
```
and you are good to go.
gulp should start compiling necessary files.
open up the '/src/index.html' file in your browser to see the result.