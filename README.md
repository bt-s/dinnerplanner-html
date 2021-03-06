# NOTES Lab 3

Note 1 (by Bas Straathof and Yao, Ming):
Just as for Lab 2, look at index.html and make sure to run:
$ npm install
$ gulp

Note 2 (by Bas Straathof and Yao, Ming):
Development was done in Google Chrome and Firefox; we are not 100% sure whether the app works in Safari.

Note 3 (by Bas Straathof and Yao, Ming):
We have created a separate file for storing the API key. Please add your key to js/model/dinnerModel.js (at line 3).

Note 4 (by Bas Straathof and Yao, Ming):
In case you were to encounter issues running gulp, try to install gulp globally as follows:
\$ npm install -g gulp@4.0.0

# NOTES Lab 2

Note 1 (by Bas Straathof and Yao, Ming):
Please look at index.html, since this is the production template. There is also a file called index-dev.html, which is used for development. The difference is that index.html imports minified JS and CSS files, whereas index-dev.html finds the 'local' unoptimized files instead.

Note 2 (by Bas Straathof and Yao, Ming):
Since node.js dependencies have been added after lab 1, and gulpfile.js contains new tasks, one should run:
$ npm install
$ gulp

Note 3 (by Bas Straathof and Yao, Ming):
The relevant code can be found here: https://github.com/bt-s/dinnerplanner-html/releases/tag/lab2

# NOTES Lab 1

Note 1 (by Bas Straathof and Yao, Ming):
We chose to create a node.js application (see https://nodejs.org/en/).
The node_modules folder is not shared on GitHub.
To run the code locally, please install node.js on your machine and run `$ npm install` to download all dependencies.

Note 2 (by Bas Straathof and Yao, Ming):
The styling for this web application is written using Sass (see https://sass-lang.com/).
To transpile the SCSS code to CSS run `$ gulp` in the root directory of the project; for this to work, node.js and the project's dependencies have to be installed (see Note 1).

# Interaction Programing - Lab assignment - HTML

This project contains the startup code for HTML version of the Interaction Programing course lab assignment. For more details on how to complete the assignment follow the instructions on the [course website](https://www.kth.se/social/course/DH2642).

## What's in the project

- [index.html](https://github.com/kth-csc-iprog/dinnerplanner-html/blob/master/index.html) - the only HTML page you will have in this project (though while testing you can create more to make it easier). You will need to implement the skeleton of the layout there and then through code (JavaScript) create the rest
- [js/model/dinnerModel.js](https://github.com/kth-csc-iprog/dinnerplanner-html/blob/master/js/model/dinnerModel.js) - is JavaScript file that contains the model code. The file contains the model (dish, ingredient and general dinner model) as well as methods and comments that you need to fully implement to support the dinner functionalities (guests, selected dishes, etc.)
- [js/view/](https://github.com/kth-csc-iprog/dinnerplanner-html/tree/master/js/view) - here you can find a JavaScript code of an example view. The view sets up some initial components and their values.
- [js/app.js](https://github.com/kth-csc-iprog/dinnerplanner-html/blob/master/js/app.js) - this is the overall code of the application. It is responsible for initial setup of the app (when the page loads for the first time).
- [images/](https://github.com/kth-csc-iprog/dinnerplanner-html/tree/master/images) - folder contains some pictures you can use for your dishes
