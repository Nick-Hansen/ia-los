var gridWrapper = (function() {
    'user strict';
    
    //private variables
    var xyz = 1;

    //private functions
    
    //public accessor
    var gridWrapper = {};

    //public functions
    gridWrapper.init = function (options) {
        //clear state and set variables
        attacker_image.src = './images/attacker.png';
	    defender_image.src = './images/defender.png';
	    blocker_image.src = './images/blocker.png';
    };

    gridWrapper.drawLinesOfSight = function() {
        //insert code
    };
    
    //return public accessor
    return gridWrapper;
})();