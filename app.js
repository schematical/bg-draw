var async = require('async');
var _ = require('underscore');

var njax = require('njax');
var njaxBootstrap = require('njax-bootstrap');
//var models = require('./lib/model');
var config = require('./config');

var app = njax(config);
//models(app);
//njaxBootstrap(app);
app.locals.partials._navbar = '_navbar';
app.locals.partials._meta = '_meta';

app.locals.partials._meta_footer = '_meta_footer';
app.locals.partials._modal = '_modal';



/*
Super Custom Routes
 */


var routes = require(__dirname + '/lib/routes');
routes(app);

app.start(function(err, _app, server){
    app.users = {};
    var socket_io = require('socket.io');
    var io = socket_io.listen(server);
    io.sockets.on('connection', function (socket) {
        socket.on('drawClick', function(req) {
            socket.broadcast.emit('draw', req)
        })
        socket.on('join', function(data) {
            if(!app.users[data.name]){
                app.users[data.name] = data;
            }
            console.log("Joined: " + data.name);

            socket.broadcast.emit('joined', {
                users:_.clone(app.users)
            })
        });
    });
});