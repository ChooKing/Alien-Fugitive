const GAME_WIDTH = 1600;
const GAME_HEIGHT = 900;
export const Globals = {
    GAME_WIDTH: GAME_WIDTH,
    GAME_HEIGHT: GAME_HEIGHT,
    SKY_SIZE: 500,
    UFO_WIDTH: 160,
    UFO_HEIGHT: 54,
    UFO_COUNT: 0,
    UFOs_PER_SUPPLY: 10, //Number of UFOs generated before a resupply
    UFO_DESTROY_TIME: 300,
    EXPLOSION_SIZE: 120,
    EXPLOSION_DESTROY_TIME: 450,
    PELLET_SIZE: 7,
    POINTS_PER_UFO: 10,
    stats:{
        score: 0,
        level: 1,
        ammo: 50,
        lives: 5
    },
    UFOs: [],
    Pellets: [],
    Explosions: [],
    Supplies: [],
    Spores: [],
    sounds:{
        explode: new Audio("./sounds/small_explosion.wav"),
        spore: new Audio("./sounds/spore.wav"),
        supply: new Audio("./sounds/supply.wav"),
        die: new Audio("./sounds/die.wav"),
        shoot: new Audio("./sounds/shoot.wav")
    },
    xRatio: getXRatio(),
    mouseX: null
}
export function getXRatio(){
    return document.querySelector("main").getBoundingClientRect().width / GAME_WIDTH;
}