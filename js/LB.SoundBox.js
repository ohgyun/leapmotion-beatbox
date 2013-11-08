LB.SoundBox = (function () {

    // 사운드 박스
    // --------
    function SoundBox(options, cube, playstand) {
        var template = _.template([
            '<div class="sound-box <%=type%>">',
                '<img src="images/<%=id%>.png">',
            '</div>'
        ].join(''));

        this.id = options.id;
        this.$el = $(template(options));
        this.$img = this.$el.find('img');

        this.$area = cube.getArea(options.type);
        this.$playstand = playstand.getStand();

        this.$el.appendTo(this.$area);

        this.playing = false;
        this.cube = cube;
        this.type = options.type;
    }
    _.extend(SoundBox.prototype, {
        select: function () {
            this.$el.addClass('selected');
        },

        unselect: function () {
            this.$el.removeClass('selected');
        },

        play: function () {
            this.$img.attr('src', this.getPlaySrc());
            this.$el.appendTo(this.$playstand);

            wave(this.id).unmute();
            this.playing = true;
            this.unselect();
        },

        stop: function () {
            this.$img.attr('src', this.getStopSrc());
            this.$el.appendTo(this.$area);

            wave(this.id).mute();
            this.playing = false;
        },

        getPlaySrc: function () {
            return 'images/' + this.id + '.gif?' + (+new Date());
        },

        getStopSrc: function () {
            return 'images/' + this.id + '.png';
        },

        isPlaying: function () {
            return this.playing;
        },

        // 현재 대기 목록에 보여져 있는가?
        isOnArea: function () {
            if (this.isPlaying()) { return false; }
            return this.type === this.cube.getActivatedType();
        },

        hitTest: function (x, y) {
            var posEl = this.$el.offset();
            var xEl = posEl.left;
            var yEl = posEl.top;
            var w = 150;
            var h = 150;

            if (x >= xEl && x <= xEl+w) {
                if (y >= yEl && y <= yEl+h) {
                    return true;
                }
            }
            return false;
        }
    });

    SoundBox.map = {};

    SoundBox.createSoundBoxes = function (soundList, cube, playstand) {
        soundList.forEach(function (obj) {
            SoundBox.map[obj.id] = new SoundBox(obj, cube, playstand);
        });
    };

    SoundBox.clear = function () {
        _.each(SoundBox.map, function (soundBox) {
            if (soundBox.isPlaying()) {
                soundBox.stop();
            }
        });
    };

    SoundBox.playPreset = function (preset) {
        SoundBox.clear();
        _.each(SoundBox.map, function (soundBox) {
            if (preset.indexOf(soundBox.id) > -1) {
                soundBox.play();
            }
        });
    };

    SoundBox.selectByPosition = function (x, y) {
        var onArea = _.filter(SoundBox.map, function (soundBox) {
            return soundBox.isOnArea();
        });

        _.each(onArea, function (soundBox) {
            if (soundBox.hitTest(x, y)) {
                soundBox.select();
            }
        });
    };

    return SoundBox;

}());