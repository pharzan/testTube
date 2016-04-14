(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket;
var firstconnect = true;

function connect() {
    if(firstconnect) {
        socket = io.connect('http://dev.testtube:8000');

        socket.on('serverMessage', function(data){ message(data); });
        socket.on('connect', function(){ console.log("Connected to Server"); });

        firstconnect = false;
    }
    else {
        socket.socket.reconnect();
    }
}

connect();



},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBzb2NrZXQ7XG52YXIgZmlyc3Rjb25uZWN0ID0gdHJ1ZTtcblxuZnVuY3Rpb24gY29ubmVjdCgpIHtcbiAgICBpZihmaXJzdGNvbm5lY3QpIHtcbiAgICAgICAgc29ja2V0ID0gaW8uY29ubmVjdCgnaHR0cDovL2Rldi50ZXN0dHViZTo4MDAwJyk7XG5cbiAgICAgICAgc29ja2V0Lm9uKCdzZXJ2ZXJNZXNzYWdlJywgZnVuY3Rpb24oZGF0YSl7IG1lc3NhZ2UoZGF0YSk7IH0pO1xuICAgICAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpeyBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBTZXJ2ZXJcIik7IH0pO1xuXG4gICAgICAgIGZpcnN0Y29ubmVjdCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc29ja2V0LnNvY2tldC5yZWNvbm5lY3QoKTtcbiAgICB9XG59XG5cbmNvbm5lY3QoKTtcblxuXG4iXX0=
