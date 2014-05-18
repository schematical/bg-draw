'use strict';

/* Controllers */

angular.module('bgdraw.controllers', [])
    .controller('WelcomeCtl', ['$scope', '$cookies','Socket', function($scope, $cookies, socket) {
        if($cookies.name){
            document.location = '#draw';
            return;
        }
        $scope.colors = ['#ff0000', '#00ff00', '#0000ff', '#fff', '#aaa'];
        $scope.enter = function(){

            $cookies.name = $scope.name;
            $cookies.color = $scope.colors[Math.floor(Math.random()  * $scope.colors.length)]
            socket.emit('guess', {
                name: $cookies.name,
                guess: $scope.guess
            });
            document.location = '#draw';
        }

    }])
    .controller('HomeCtl', ['$scope', '$cookies', 'Socket', function($scope, $cookies, socket) {
        if(!$cookies.name){
            return document.location = '#draw';
        }
        $scope.send_guess = function(){
            socket.emit('guess', {
                name: $cookies.name,
                guess: $scope.guess
            });
        }
    }])
    .controller('SuggestCtl', ['$scope', '$cookies', 'Socket', function($scope, $cookies, socket) {
        if(!$cookies.name){
            return document.location = '#welcome';
        }
        $scope.suggest = function(){
            socket.emit('suggestion', {
                name: $cookies.name,
                suggestion: $scope.suggestion
            })
        }

    }])
    .controller('DrawCtl', ['$scope', '$cookies', 'Socket', function($scope, $cookies, socket) {
        if(!$cookies.name){
            return document.location = '#welcome';
        }
        $scope.users = {};
        document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
        // Draw Function
        $scope.draw = function(data) {
            $scope.ctx.strokeStyle = data.color;
            if (data.type == "dragstart") {
                $scope.ctx.beginPath()
                $scope.ctx.moveTo(data.x,data.y)
            } else if (data.type == "drag") {
                $scope.ctx.lineTo(data.x,data.y)
                $scope.ctx.stroke()
            } else {
                $scope.ctx.stroke()
                $scope.ctx.closePath()
            }

        }
        $scope.clear = function(data) {
            $scope.ctx.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
        }
        $scope.joined = function(data) {
            if(!$scope.users[data.name]){
                $scope.users[data.name] = data;
            }
        }

        // Draw from other sockets
        socket.on('draw', $scope.draw);
        socket.on('clear', $scope.draw)

        // Bind click and drag events to drawing and sockets.
        var jCanvasParent = $('#canvas_parent');
        jCanvasParent.height($(window).height());
        $scope.canvas = $('<canvas width="' + jCanvasParent.width() + '" height="' + jCanvasParent.height() + '"  style="margin: 0 auto; width:100%; height:100%;"></canvas>');
        jCanvasParent.append($scope.canvas);
        $scope.ctx = $('canvas')[0].getContext("2d");

        $scope.canvas.on('drag dragstart dragend', function(e) {
                e.preventDefault();
                var offset = $(this).offset()
                var data = {
                    x: (e.clientX - offset.left),
                    y: (e.clientY - offset.top),
                    type: e.handleObj.type
                }
                data.color = $cookies.color;
                $scope.draw(data) // Draw yourself.
                socket.emit('drawClick', data) // Broadcast draw.
            })
    }]);