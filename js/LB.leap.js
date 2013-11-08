/**
 * 립모션 컨트롤을 받아 처리한다.
 *
 * 아래 이벤트를 받을 수 있다.
 * - finger:on
 * - finger:off
 * - finger:move (pos)
 * - screenTap
 * - swipe:leftToRight
 * - swipe:rightToLeft
 */
LB.leap = (function () {

    var $window = $(window);
    var wWindow = $window.width();
    var hWindow = $window.height();

    var leap = {};
    _.extend(leap, Backbone.Events);

    var controller = new Leap.Controller({
        frameEventName: 'animationFrame',
        enableGestures: true
    });

    controller.on('connect', function() {
        console.log('립모션 웹소켓 서버 연결 성공');
    });

    controller.on('frame', function(frame) {
        catchFingerPos(frame);
        catchSwipeGesture(frame);
        catchScreenTapGesture(frame);
    });

    // 립모션 컨트롤러에 따라 포인터를 움직인다.
    var _fingersOn = false;
    function catchFingerPos(frame) {
        // 손이 올라가 있지 않거나,
        // 손가락을 펼치고 있지 않다면 중지한다.
        if (frame.hands.length === 0 ||
                frame.hands[0].fingers.length === 0) {
            if (_fingersOn) {
                leap.trigger('finger:off');
                console.log('립모션 손가락 내림');
                _fingersOn = false;
            }
            return;
        }

        // 손은 한 개만 처리한다.
        var hand = frame.hands[0];

        // 손의 위치를 파악한다.
        var handPos = leapToScene(frame, hand.palmPosition);

        if (! _fingersOn) {
            leap.trigger('finger:on');
            console.log('립모셥 손가락 올림');
            _fingersOn = true;
        }

        // 손가락도 마지막 인식된 것만 사용한다.
        var finger = hand.fingers[hand.fingers.length - 1];
        var fingerPos = leapToScene(frame, finger.tipPosition);

        leap.trigger('finger:move', fingerPos);
    }

    // 스와이프 제스처를 찾는다.
    function catchSwipeGesture(frame) {
        var gesture = frame.gestures[0];

        if (!gesture || gesture.type !== 'swipe') { return; }

        var startPos = leapToScene(frame, gesture.startPosition);
        var pos = leapToScene(frame, gesture.position);

        if (startPos[0] - pos[0] <= 0) {
            triggerGestureEvent('swipe:leftToRight');
        } else {
            triggerGestureEvent('swipe:rightToLeft');
        }
    }

    // 스크린 탭 제서츠럴 찾는다.
    function catchScreenTapGesture(frame) {
        var gesture = frame.gestures[0];

        if (!gesture || gesture.type !== 'screenTap') { return; }

        triggerGestureEvent('screenTab');
    }

    // 제스처 이벤트를 발생한다.
    // 단위시간 당 중복해서 발생하는 이벤트는 무시한다.
    var _geFired = {};
    function triggerGestureEvent(name) {
        // 이미 발생했다면, 무시한다. 
        if (_geFired[name]) {
            return;
        }

        _geFired[name] = true;
        console.log('립모셥 스와이프 제스처: ' + name);
        leap.trigger(name);

        // 500ms 뒤에 제거한다.
        // 즉, 중복 발생한 제스처 이벤트는 무시한다.
        // animationFrame과 setTimeout에 의한 타이머 오차는 무시한다.
        setTimeout(function () {
            _geFired[name] = false;
        }, 500);
    }

    // 립모션의 leapSpace로 프레임의 값을 좌표계로 옮긴다.
    // http://js.leapmotion.com/tutorials/leapSpace
    function leapToScene(frame, leapPos) {
        var iBox = frame.interactionBox;

        var left = iBox.center[0] - iBox.size[0] / 2;
        var top = iBox.center[1] + iBox.size[1] / 2;

        var x = leapPos[0] - left;
        var y = leapPos[1] - top;

        x /= iBox.size[0];
        y /= iBox.size[1];

        x *= wWindow;
        y *= hWindow;

        return [x, -y];
    }

    controller.connect();

    return leap;
}());