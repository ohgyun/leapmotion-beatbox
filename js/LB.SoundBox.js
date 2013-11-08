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
        },

        stop: function () {
            this.$img.attr('src', this.getStopSrc());
            this.$el.appendTo(this.$area);

            wave(this.id).mute();
        },

        getPlaySrc: function () {
            return 'images/' + this.id + '.gif?' + (+new Date());
        },

        getStopSrc: function () {
            return 'images/' + this.id + '.png';
        }
    });

    SoundBox.map = {};

    SoundBox.createSoundBoxes = function (soundList, cube, playstand) {
        soundList.forEach(function (obj) {
            SoundBox.map[obj.id] = new SoundBox(obj, cube, playstand);
        });
    };

    return SoundBox;

}());