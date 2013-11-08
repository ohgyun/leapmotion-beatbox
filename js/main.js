LB.sounds.start();

LB.cube.start();

LB.SoundBox.createSoundBoxes(LB.sounds.getList(), LB.cube, LB.playstand);

LB.leap.start();

LB.leap.on('finger:on', function() {
    LB.pointer.show();
});

LB.leap.on('finger:off', function() {
    LB.pointer.hide();
});

LB.leap.on('finger:move', function(pos) {
    LB.pointer.move(pos[0], pos[1]);
});

LB.leap.on('finger:preset', function (type) {
    var preset;

    if (type === 'four') {
        preset = ['beatC', 'beatE', 'chorusB', 'melodyI', 'effectB'];    
    } else if (type === 'five') {
        preset = ['beatC', 'beatD', 'chorusE', 'melodyF', 'effectH'];
    } else {
        return;
    }

    // 프리셋 재생
    LB.SoundBox.playPreset(preset);
});

LB.leap.on('circle', function (pos) {
    LB.SoundBox.selectByPosition(pos[0], pos[1]);
});

LB.leap.on('swipe:leftToRight', function () {
    LB.cube.next();
});

LB.leap.on('swipe:rightToLeft', function () {
    LB.cube.prev();
});


