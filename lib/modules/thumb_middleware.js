var fs = require('fs');
var path = require('path');
var gm = require('gm');
var async = require('async');
var mkdirp = require('mkdirp');
module.exports = function(app){
    return function(req, res, next){
        console.log("Running Tumb Middleware")
        if(!req.files.original_img){
            return next();
        }
        var thumb_path  =  path.join(app.njax.config.cache_dir, 'thumbs', req.files.original_img.path);
        async.series([
            function(cb){
                mkdirp(path.dirname(thumb_path), function (err) {
                    if(err) return callback(err);
                    return cb();
                });
            },
            function(cb){
                gm(req.files.original_img.path)
                    .resize(353, 257)/*
                 .autoOrient()*/
                    .write(thumb_path, function (err) {
                        if(err) return next(err);
                        return cb();
                    });
            },
            function(cb){
                req.photo.thumb_img_s3.setFile(thumb_path, function(err){
                    if(err) return next(err);
                    return cb();
                });
            },
            function(cb){
                return next();
            }
        ]);
    }
}