/**
 * 포인터를 표시한다.
 */
LB.pointer = (function () {
    var $pointer = $('#pointer');
    var pointer = $pointer[0];
    var $glow = $pointer.find('.glow');

    return {
        move: function (x, y) {
            var transform = 'translate3d(' +
                    x + 'px,' +
                    y + 'px,' + '0px)';
            pointer.style.webkitTransform = transform;
        },

        show: function () {
            $glow.removeClass('hide');
        },

        hide: function () {
            $glow.addClass('hide');
        }
    };
}());