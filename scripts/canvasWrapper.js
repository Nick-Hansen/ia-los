var CanvasWrapper = function() {
    'user strict';
    
    //private variables
    var canvas = {};
    var context = {};

    //private functions
    function boardClick(event) {
        if (!canvas.getContext) { return; }
        var rect = canvas.getBoundingClientRect();
        var clientX = event.clientX;
        var clientY = event.clientY;
        var xCoordinate = clientX - rect.left;
        var yCoordinate = clientY - rect.top;
        var event = new CustomEvent('boardClick', { detail: { xCoord: xCoordinate, yCoord: yCoordinate } });
        document.dispatchEvent(event)
    }

    //public accessor
    var CanvasWrapper = {};

    //public functions
    CanvasWrapper.init = function (options) {
        //clear state and set variables
        canvas = document.getElementById('canvas');
        context = canvas.getContext("2d");
        canvas.addEventListener('click', boardClick, false);

        var map_image = new Image();
        var map_image_name = undefined;
        var attacker_image = new Image();
        attacker_image.src = './images/attacker.png';
        var defender_image = new Image();
        defender_image.src = './images/defender.png';
        var blocker_image = new Image();
        blocker_image.src = './images/blocker.png';
    };

    CanvasWrapper.doSomething = function() {
        //insert code
    };
    
    //return public APIs
    return CanvasWrapper;
};