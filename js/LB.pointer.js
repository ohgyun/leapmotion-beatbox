/**
 * 포인터를 표시한다.
 */
LB.pointer = (function() {
    var leap = LB.leap;

    var $pointer = $('#pointer');
    var pointer = $pointer[0];
    var $glow = $pointer.find('.glow');

    leap.on('finger:on', function () {
        $glow.removeClass('hide');
    });

    leap.on('finger:off', function () {
        $glow.addClass('hide');
    });

    leap.on('finger:move', function (pos) {
        var transform = 'translate3d(' +
                pos[0] + 'px,' +
                pos[1] + 'px,' + '0px)';
        pointer.style.webkitTransform = transform;
    });
}());