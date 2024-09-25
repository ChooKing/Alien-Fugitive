export const Globals = {
    GAME_WIDTH: 1600,
    GAME_HEIGHT: 900,
    SKY_SIZE: 500,
    UFO_WIDTH: 160,
    UFO_HEIGHT: 54,
    UFO_COUNT: 0,
    UFOs_PER_SUPPLY: 2, //Number of UFOs generated before a resupply
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
    Spores: []
}
export const StartingGlobals = structuredClone(Globals);