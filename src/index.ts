import { Engine } from './engine';
import { BouncyObject } from './BouncyObject';
import { IRectangle } from './interfaces';

const CALEB_NUM = 4;
const CALEB_WIDTH = 100;
const CANVAS_WIDTH = window.innerWidth - 10;
const CANVAS_HEIGHT = window.innerHeight - 10;
const CALEB_HEIGHT = 100;
const CALEB_MIN_SPEED = 10;
const CALEB_MAX_SPEED = 100;
const CALEB_SPLIT_NUM = 2;
const CALEB_STARTING_MASS = 100;
const CALEB_IMG_PATH = 'https://kevinmccall.github.io/caleb.webp';
const CALEB_THONK_IMG_PATH = 'https://kevinmccall.github.io/5head.webp';

const CANVAS_BOUNDS = {
  x: 0,
  y: 0,
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
};

const ENGINE = new Engine();
let caleb = new BouncyObject(
  CALEB_IMG_PATH,
  CALEB_WIDTH,
  CALEB_HEIGHT,
  CALEB_STARTING_MASS,
  CANVAS_BOUNDS
);
caleb.x = 100;
caleb.y = 100;
caleb.vx = 100;

let caleb2 = new BouncyObject(
  CALEB_IMG_PATH,
  CALEB_WIDTH,
  CALEB_HEIGHT,
  CALEB_STARTING_MASS,
  CANVAS_BOUNDS
);
caleb2.x = 400;
caleb2.y = 100;
caleb2.vx = -100;
ENGINE.registerEntity(caleb);
ENGINE.registerEntity(caleb2);

ENGINE.update();
