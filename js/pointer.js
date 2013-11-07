$(function () {
    var $pointer = $('#pointer');
    var $glow = $pointer.find('.glow');
    var wHalf = $pointer.width() / 2;
    var hHalf = $pointer.height() / 2;
    var el = $pointer[0];


    $(document)
        .on('mousemove', function (e) {
            var x = e.clientX - wHalf;
            var y = e.clientY - hHalf;
            var transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';

            el.style.webkitTransform = transform;
        })
        .on('click', function () {
            $glow.toggleClass('hide');
        });
});
