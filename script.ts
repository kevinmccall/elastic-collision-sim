import { Engine } from "./engine";
import { BouncyObject } from "./BouncyObject";
import { IRectangle } from "./interfaces";

const CALEB_NUM = 4;
const CALEB_WIDTH = 100;
const CANVAS_WIDTH = 
const CANVAS_HEIGHT = 
const CALEB_HEIGHT = 100;
const CALEB_MIN_SPEED = 10;
const CALEB_MAX_SPEED = 100;
const CALEB_SPLIT_NUM = 2;
const CALEB_STARTING_MASS = 100;
const CALEB_IMG_PATH = "https://erakijeff.github.io/caleb.webp";
const CALEB_THONK_IMG_PATH = "https://erakijeff.github.io/5head.webp";


const CANVAS_BOUNDS = {
    x: 0,
    y: 0,
    width: 
}
const ENGINE = new Engine();
let caleb = new BouncyObject(CALEB_IMG_PATH, 100, 100, 200, 200, 100, 100, 100, )

ENGINE.update();
