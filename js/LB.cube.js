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

    var currentDeg = 0;
    var degStep = 90;

    var degToType = {
        0: 'beat',
        90: 'effect',
        180: 'chorus',
        270: 'melody'
    };

    // 해상도에 맞춰 큐브의 크기를 셋팅한다.
    var hCubeMin = 580;
    $cube.height(Math.max(hWindow * 0.8, hCubeMin));

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

    // 사운드 박스
    // --------
    function SoundBox(options) {
        var template = _.template([
            '<div class="sound-box <%=type%>">',
                '<img src="images/<%=id%>.png">',
            '</div>'
        ].join(''));

        var $el = $(template(options));
        var $parent = 

        $el.appendTo($area[options.type]);
    }

    function createSoundBoxes(soundList) {
        soundList.forEach(function (obj) {
            new SoundBox(obj);
        });
    }

    return {
        start: function (soundList) {
            rotateTo(currentDeg);

            createSoundBoxes(soundList);
        },

        next: next,

        prev: prev
    };

}());