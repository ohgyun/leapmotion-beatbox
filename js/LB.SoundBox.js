LB.SoundBox = (function () {

    // 사운드 박스
    // --------
    function SoundBox(options, cube) {
        var template = _.template([
            '<div class="sound-box <%=type%> selected">',
                '<img src="images/<%=id%>.png">',
            '</div>'
        ].join(''));

        this.id = options.id;
        this.$el = $(template(options));
        this.$img = this.$el.find('img');

        this.$el.appendTo(cube.getArea(options.type));
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
        },

        stop: function () {
            this.$img.attr('src', this.getStopSrc());
        },

        getPlaySrc: function () {
            return 'images/' + this.id + '.gif?' + (+new Date());
        },

        getStopSrc: function () {
            return 'images/' + this.id + '.png';
        }
    });

    SoundBox.map = {};

    SoundBox.createSoundBoxes = function (soundList, cube) {
        soundList.forEach(function (obj) {
            SoundBox.map[obj.id] = new SoundBox(obj, cube);
        });
    };

    return SoundBox;

}());