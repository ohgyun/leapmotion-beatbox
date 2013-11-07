return;

var sounds = [
  'sounds/beats/beat1_boom_a',
  'sounds/beats/beat1_boom_b',
  'sounds/beats/beat2_kashi_a',
  'sounds/beats/beat3_paomeu_a',
  'sounds/beats/beat4_ptttpeu_a',
  'sounds/beats/beat4_ptttpeu_b',
  'sounds/beats/beat5_slupttt_a',
  'sounds/bonus/aspire',
  'sounds/bonus/little-miss',
  'sounds/bonus/satisfy',
  'sounds/bonus/spinin',
  'sounds/coeurs/coeur1_oaaah_a',
  'sounds/coeurs/coeur1_oaaah_b',
  'sounds/coeurs/coeur2_cougou_a',
  'sounds/coeurs/coeur2_cougou_b',
  'sounds/coeurs/coeur3_porticoeur_a',
  'sounds/coeurs/coeur3_porticoeur_b',
  'sounds/effects/effet1_poulll_a',
  'sounds/effects/effet1_poulll_b',
  'sounds/effects/effet2_tucati_a',
  'sounds/effects/effet3_tuilopta_a',
  'sounds/effects/effet3_tuilopta_b',
  'sounds/effects/effet4_tululou_a',
  'sounds/effects/effet5_tumttt_a',
  'sounds/effects/effet5_tumttt_b',
  'sounds/melodies/melo1_nananana_a',
  'sounds/melodies/melo1_nananana_b',
  'sounds/melodies/melo2_pelulu_a',
  'sounds/melodies/melo2_pelulu_b',
  'sounds/melodies/melo3_siffle_a',
  'sounds/melodies/melo3_siffle_b',
  'sounds/melodies/melo4_tatouti_a',
  'sounds/melodies/melo4_tatouti_b',
  'sounds/melodies/melo5_tvutvutvu_a',
  'sounds/melodies/melo5_tvutvutvu_b',
  'sounds/voix/voix1_isit_a',
  'sounds/voix/voix1_isit_b',
  'sounds/voix/voix2_uare_a',
  'sounds/voix/voix2_uare_b'
];

var len = sounds.length;
var loaded = 0;

function loadSound(url) {
  var deferred = Q.defer();

  var name = /\/([0-9a-zA-Z_-]+)$/.exec(url)[1];

  var obj = wave.create(name, {
    src: url
  });

  obj.on('load', function () {
    deferred.resolve(name);
  });

  return deferred.promise;
}

function loadAllSounds() {
  var promises = [];

  sounds.forEach(function (url) {
    var p = loadSound(url);
    p.then(function (name) {
      var percent = parseInt(++loaded / len * 100, 10);
      console.log('name: %s, progress: %d%', name, percent);
    });
    promises.push(p);
  });

  return Q.all(promises);
}


loadAllSounds().then(function () {
  console.log('All sound loaded');
});
