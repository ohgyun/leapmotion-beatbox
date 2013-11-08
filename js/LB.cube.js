LB.cube = (function () {

    var $window = $(window);
    var wWindow = $window.width();
    var hWindow = $window.height();

    var $cubeWrap = $('#cube-wrap');
    var $cube = $cubeWrap.find('.cube');

    var $area = {
        'beat': $cube.find('.beat'),
        'chorus': $cube.find('.chorus'),
        'melody': $cube.find('.melody'),
        'effect': $cube.find('.effect')
    };

    var soundBoxes = [];

    var currentDeg = 0;
    var degStep = 90;

    var degToType = {
        0: 'beat',
        90: 'effect',
        180: 'chorus',
        270: 'melody'
    };

    function next() {
        currentDeg += degStep;
        rotateTo(currentDeg);
        return degToType[String(Math.abs(currentDeg % 360))];
    }

    function prev() {
        currentDeg -= degStep;
        rotateTo(currentDeg);
        return degToType[String(Math.abs(currentDeg % 360))];
    }

    function rotateTo(deg) {
        $cube[0].style.webkitTransform = 'rotateY(' + deg + 'deg)';
    }



    return {
        start: function () {
            rotateTo(currentDeg);
        },

        next: next,

        prev: prev,

        getSoundBoxes: function () {
            return soundBoxes;
        },

        getArea: function (type) {
            return $area[type];
        }
    };

}());