const WIDTH = 1280;
const HEIGHT = 720;
const SCALE = WIDTH/3000;
const SCALE_ENLARGE = SCALE + 0.1;
const DEPTH = {
    BACKGROUND: 0,
    COLLISION: 1,
    ITEM: 2,
    SPRITE: 3,
    HEALTHBAR: 4,
    OVERLAY: 5,
    OVERLAYTEXT: 6,
}
const FONT = 'Lato';
const WORDWRAPWIDTH = 260;
const GOODQUESTFILL = "#7CFC00";
const BADQUESTFILL = "#FF2D00";
const ANIMATION_FRAME_RATE = 5;

const MAXREPUTATION = 106;
const MINREPUTATION = -MAXREPUTATION;
const QUESTX = WIDTH - 300;
const QUESTY = HEIGHT - 600

const BASEPLAYERHEALTH = 500;
const PLAYERDAMAGE = 100;
const BASEHUMANDAMAGE = 50;
const BASEDOGDAMAGE = 20;
const BASEATTACKSPEED = 1.0
const BASEVELOCITY = 250;

var HUMANDAMAGE, DOGDAMAGE, MUSIC;
var VELOCITY = BASEVELOCITY;
var ENEMYATTACKSPEED = BASEATTACKSPEED;
var ENEMYATTACKFRAMERATE = (ANIMATION_FRAME_RATE + 10) * ENEMYATTACKSPEED;
