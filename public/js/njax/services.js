angular.module('njax.services', []).
    value('version', '0.1')
    .factory('NCommDriver', function() {
        var _error = function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.error(data);
        }

        var NCommDriver = {
            ajax:{
                _init:function(){

                },
                query:function(uri, data, callback){
                    //TODO: Make data into a query string
                    $http.get(uri).
                        success(callback).//function(data, status, headers, config) {.
                        error(_error);
                },
                create:function(uri, data, callback){
                    $http.post(uri, data).
                        success(callback).//function(data, status, headers, config) {.
                        error(_error);
                },
                update:function(uri, data, callback){
                    $http.put(uri, data).
                        success(callback).//function(data, status, headers, config) {.
                        error(_error);
                },
                remove:function(uri, callback){
                    $http.delete(uri, data).
                        success(callback).//function(data, status, headers, config) {.
                        error(_error);
                },
                on:function(event, callback){

                },
                trigger:function(event, data, callback){

                }
            },
            socket:{
                _init:function(){
                    NCommDriver._socket = io.connect('http://localhost');
                    NCommDriver._socket.on('event.response', function(response){
                        if(!response.callback){
                            return console.error("Unidentifed response");
                        }
                        if(!NCommDriver._callbacks[response.callback]){
                            return console.error('No callback found for "' + response.callback + '"');
                        }
                        return NCommDriver._callbacks[response.callback](null, response.data);
                    });
                    return true;
                },
                _send_package:function(uri, method, data, callback){
                    if(!NCommDriver._callbacks){
                        NCommDriver._callbacks = {};
                    }
                    var callback_id = new Date().getTime() + '@' +method + ':' + uri;
                    NCommDriver._callbacks[callback_id] = callback;
                    var packet = {
                        uri:uri,
                        method:method,
                        data:data,
                        callback: callback_id
                        //TODO: Add session or account id
                    }
                    NCommDriver._socket.emit(uri, packet);
                },
                query:function(uri, data, callback){
                    this._send_package(uri, 'query', data, callback);

                },
                create:function(uri, data, callback){
                    this._send_package(uri, 'create', data, callback);
                },
                update:function(uri, data, callback){
                    this._send_package(uri, 'update', data, callback);
                },
                remove:function(uri, callback){
                    this._send_package(uri, 'remove', callback);
                },
                on:function(event, callback){
                    NCommDriver._socket.on(event, callback);
                },
                trigger:function(event, data, callback){
                    NCommDriver._socket.emit(event, data);
                    if(callback){
                        return callback(null, true);//Not sure this is neccisarry
                    }
                }

            },
            local:{
                query:function(uri, data, callback){

                },
                create:function(uri, data, callback){

                },
                update:function(uri, data, callback){

                },
                delete:function(uri, callback){

                },
                on:function(event, callback){

                },
                trigger:function(event, data, callback){

                }
            }
        };

        //First Socket
       if(NCommDriver.socket._init()){
           return NCommDriver.socket;
       }
        //Then Ajax
        console.log("Intting Ajax")
        if(NCommDriver.ajax._init()){
            return NCommDriver.ajax;
        }
        //Then Localstorage



    });