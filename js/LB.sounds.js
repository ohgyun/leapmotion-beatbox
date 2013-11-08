/**
 * 사운드 객체
 */
LB.sounds = (function () {

    var soundList = [
        { id: 'beatC', type: 'beat', src: 'sounds/beats/beat2_kashi_a' },
        { id: 'beatD', type: 'beat', src: 'sounds/beats/beat3_paomeu_a' },
        { id: 'beatE', type: 'beat', src: 'sounds/beats/beat4_ptttpeu_a' },

        { id: 'chorusB', type: 'chorus', src: 'sounds/coeurs/coeur1_oaaah_b' },
        { id: 'chorusC', type: 'chorus', src: 'sounds/coeurs/coeur2_cougou_a' },
        { id: 'chorusE', type: 'chorus', src: 'sounds/coeurs/coeur3_porticoeur_a' },
        
        { id: 'effectB', type: 'effect', src: 'sounds/effects/effet1_poulll_b' },
        { id: 'effectG', type: 'effect', src: 'sounds/effects/effet5_tumttt_a' },
        { id: 'effectH', type: 'effect', src: 'sounds/voix/voix2_uare_a' },

        { id: 'melodyA', type: 'melody', src: 'sounds/melodies/melo1_nananana_a' },
        { id: 'melodyF', type: 'melody', src: 'sounds/melodies/melo3_siffle_b' },
        { id: 'melodyI', type: 'melody', src: 'sounds/melodies/melo5_tvutvutvu_a' }
    ];

    var len = soundList.length;
    var loaded = 0;

    function loadSound(obj) {
        var deferred = Q.defer();

        var sound = wave.create(obj.id, {
            src: obj.src,
            muted: true
        });

        sound.on('load', function () {
            deferred.resolve(obj.id);
        });

        return deferred.promise;
    }

    function loadAllSounds() {
        var promises = [];

        soundList.forEach(function (obj) {
            var p = loadSound(obj);
            p.then(function (id) {
                var percent = parseInt(++loaded / len * 100, 10);
                console.log('사운드 로딩 중: %s, %d% 진행', id, percent);
            });
            promises.push(p);
        });

        return Q.all(promises);
    }

    // 모든 비트의 싱크를 맞추기 위해
    // 로드하면 모든 음원을 동시에 재생한다.
    // mute 되어 있기 때문에 소리가 나진 않는다.
    function playAllSounds() {
        soundList.forEach(function (obj) {
            wave(obj.id).play();
        });
    }

    return {
        start: function () {
            // 모두 로드되면 자동 재생한다.
            return loadAllSounds().then(function () {
                console.log('모든 사운드 로딩 완료!');

                // 모든 비트는 무한 재생시키되,
                // 싱크를 맞추기 위해 첫 번째 비트에 맞춘다.
                var baseBeat = wave(soundList[0].id);
                baseBeat.on('end', playAllSounds);

                playAllSounds();
            });
        },

        getList: function () {
            return soundList;
        }
    };

}());