'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('bgdraw.services', ['njax.services']).
    value('version', '0.1')
    .factory('Socket', function() {

        var socket = io.connect('http://' + document.location.host );

        return socket;
    });