const canvas = document.getElementById("screen") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let drawnObjects = Array<BouncyObject>();

// interface IUpdatable {
//     update(delta: number): void;
// }

interface IRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface IPoint {
    x: number;
    y: number;
}

function getRightSide(rect: IRectangle) {
    return rect.x + rect.width;
}

function getBottomSide(rect: IRectangle) {
    return rect.y + rect.height;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CALEB_NUM = 4;
const CALEB_WIDTH = 100;
const CALEB_HEIGHT = 100;
const CALEB_MIN_SPEED = 10;
const CALEB_MAX_SPEED = 100;
const CALEB_SPLIT_NUM = 2;
const CALEB_STARTING_MASS = 100;

function resizeCanvas() {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
}

resizeCanvas();

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function isPointInRect(point: IPoint, rect: IRectangle) {
    return rect.x < point.x && point.x < getRightSide(rect) && rect.y < point.y && point.y < getBottomSide(rect);
}

function AABB(rect1: IRectangle, rect2: IRectangle) {
    return (
        rect1.x < getBottomSide(rect2) &&
        getRightSide(rect1) > rect2.x &&
        rect1.y < getBottomSide(rect2) &&
        getBottomSide(rect1) > rect1.y
    );
}

class BouncyObject {
    img: HTMLImageElement;
    x: number;
    y: number;
    dx: number;
    dy: number;
    mass: number;
    width: number;
    height: number;
    ready: boolean;

    constructor(imagePath: string, width = CALEB_WIDTH, height = CALEB_HEIGHT, mass: number = CALEB_STARTING_MASS) {
        this.ready = false;
        this.img = new Image(width, height);
        this.img.src = imagePath;
        this.img.onload = () => {
            this.ready = true;
        };
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.mass = mass;
        this.width = width;
        this.height = height;
    }

    getBottomSide() {
        return this.y + this.height;
    }
    getRightSide() {
        return this.x + this.width;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    checkCollisions(delta: number) {
        this.canvas_collisions();
        drawnObjects
            .filter((otherObject) => this != otherObject)
            .forEach((otherObject) => {
                if (AABB(this, otherObject)) {
                    // this object's new velocity after elastic collision
                    let v1FinalVelocityX =
                        (2 * otherObject.mass * otherObject.dx + this.mass * this.dx - otherObject.mass * this.dx) /
                        (this.mass + otherObject.mass);
                    let v1FinalVelocityY =
                        (2 * otherObject.mass * otherObject.dy + this.mass * this.dy - otherObject.mass * this.dy) /
                        (this.mass + otherObject.mass);
                    let v2FinalVelocityX =
                        (2 * this.mass * this.dx + otherObject.mass * otherObject.dx - this.mass * otherObject.dx) /
                        (this.mass + otherObject.mass);
                    let v2FinalVelocityY =
                        (2 * this.mass * this.dy + otherObject.mass * otherObject.dy - this.mass * otherObject.dy) /
                        (this.mass + otherObject.mass);
                    this.dx = v1FinalVelocityX;
                    this.dy = v1FinalVelocityY;
                    otherObject.dx = v2FinalVelocityX;
                    otherObject.dy = v2FinalVelocityY;
                }
            });
    }

    canvas_collisions() {
        if (this.getBottomSide() > canvas.height) {
            this.dy *= -1;
            this.y = canvas.height - this.height;
        }
        if (this.getRightSide() > canvas.width) {
            this.dx *= -1;
            this.x = canvas.width - this.width;
        }
        if (this.x < 0) {
            this.dx *= -1;
            this.x = 0;
        }
        if (this.y < 0) {
            this.dy *= -1;
            this.y = 0;
        }
    }
    update(delta: number) {
        if (!this.ready) {
            return;
        }
        this.x += this.dx * delta;
        this.y += this.dy * delta;
        this.checkCollisions(delta);
        this.draw();
    }
}

// function init() {
//     for (let i = 0; i < CALEB_NUM; i++) {
//         const randX = getRandomInt(canvas.width);
//         const randY = getRandomInt(canvas.height);
//         const caleb = new BouncyObject("https://erakijeff.github.io/caleb.webp", CALEB_WIDTH, CALEB_HEIGHT);
//         caleb.x = randX;
//         caleb.y = randY;
//         caleb.dx = Math.random() * CALEB_MAX_SPEED + CALEB_MIN_SPEED;
//         caleb.dy = Math.random() * CALEB_MAX_SPEED + CALEB_MIN_SPEED;

//         if (getRandomInt(2) == 0) {
//             caleb.dx *= -1;
//         }
//         if (getRandomInt(2) == 0) {
//             caleb.dy *= -1;
//         }
//         drawnObjects.push(caleb);
//     }
// }

function testInit() {
    const CALEB1 = new BouncyObject("https://erakijeff.github.io/caleb.webp", CALEB_WIDTH, CALEB_HEIGHT);
    const WALLOFFSET = 250;
    const SPEED_MULTIPLYER = 4;
    CALEB1.x = WALLOFFSET;
    CALEB1.y = 400;
    CALEB1.dx = CALEB_MIN_SPEED * SPEED_MULTIPLYER;
    const CALEB2 = new BouncyObject("https://erakijeff.github.io/caleb.webp", CALEB_WIDTH, CALEB_HEIGHT);
    CALEB2.x = canvas.width - WALLOFFSET - CALEB2.width;
    CALEB2.y = 400;
    CALEB2.dx = -CALEB_MIN_SPEED * SPEED_MULTIPLYER;
    drawnObjects.push(CALEB1);
    drawnObjects.push(CALEB2);
}

let old = new Date().getTime();

function update() {
    let current = new Date().getTime();
    let delta = (current - old) / 1000;
    old = current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawnObjects.forEach((obj: BouncyObject) => {
        obj.update(delta);
    });
    requestAnimationFrame(update);
}

// init();
testInit();
update();
