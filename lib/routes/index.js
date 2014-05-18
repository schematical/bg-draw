var fs = require('fs');
var path = require('path');

var async = require('async');
module.exports = function(app){

    app.all('/', function(req, res, next){

        res.render('index');
    });
    app.all('/display', function(req, res, next){
        res.render('display');

    });



    /**
     * Model Routes
     */
    //require('./model/index')(app);
}