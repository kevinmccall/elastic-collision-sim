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
        rect1.x < getRightSide(rect2) &&
        getRightSide(rect1) > rect2.x &&
        rect1.y < getBottomSide(rect2) &&
        getBottomSide(rect1) > rect2.y
    );
}

class BouncyObject {
    img: HTMLImageElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    mass: number;
    width: number;
    height: number;
    ready: boolean;
    hasCollisionBeenChecked = false;

    constructor(imagePath: string, width = CALEB_WIDTH, height = CALEB_HEIGHT, mass: number = CALEB_STARTING_MASS) {
        this.ready = false;
        this.img = new Image(width, height);
        this.img.src = imagePath;
        this.img.onload = () => {
            this.ready = true;
        };
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
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

    getMidX() {
        return this.getRightSide() / 2;
    }

    getMidY() {
        return this.getBottomSide() / 2;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    checkCollisions(delta: number) {
        this.canvas_collisions();
        drawnObjects
            .filter((otherObject) => this != otherObject)
            .forEach((otherObject) => {
                if (!(this.hasCollisionBeenChecked && otherObject.hasCollisionBeenChecked) && AABB(this, otherObject)) {
                    this.hasCollisionBeenChecked = true;
                    otherObject.hasCollisionBeenChecked = true;
                    this.displaceCollision(otherObject);
                    this.elasticCollision(otherObject);
                }
            });
    }

    elasticCollision(other: BouncyObject) {
        // derived using the elastic collision equations m1v1 + m2v2 = m1v1_hat + m2v2_hat and v1 + v1_hat = v2 + v2_hat
        // this object's new velocity after elastic collision
        let v1FinalVelocityX =
            (2 * other.mass * other.vx + this.mass * this.vx - other.mass * this.vx) / (this.mass + other.mass);
        let v1FinalVelocityY =
            (2 * other.mass * other.vy + this.mass * this.vy - other.mass * this.vy) / (this.mass + other.mass);
        // other object's new velocity after elastic collision
        let v2FinalVelocityX =
            (2 * this.mass * this.vx + other.mass * other.vx - this.mass * other.vx) / (this.mass + other.mass);
        let v2FinalVelocityY =
            (2 * this.mass * this.vy + other.mass * other.vy - this.mass * other.vy) / (this.mass + other.mass);
        this.vx = v1FinalVelocityX;
        this.vy = v1FinalVelocityY;
        other.vx = v2FinalVelocityX;
        other.vy = v2FinalVelocityY;
    }

    /**
     * Shifts us out of a collision if we end up inside of another object.
     * @param other Other bouncy object that we are currently colldiing with.
     */
    displaceCollision(other: BouncyObject) {
        let xdiff = other.getMidX() - this.getMidX();
        let ydiff = other.getMidY() - this.getMidY();
        // TODO: probably need to normalize the value incase of wonkyness
        if (Math.abs(xdiff) > Math.abs(ydiff)) {
            // object is colliding more from the left/right
            if (xdiff > 0) {
                // other object is colliding with our right side
                this.x = other.x - this.width;
            } else {
                // other object is colliding with our left side
                this.x = other.getRightSide();
            }
        } else {
            // object is colliding more from the top / bottom
            if (ydiff > 0) {
                // other object is colliding with our bottom side
                this.y = other.y - this.height;
            } else {
                // other object is colliding with our top side
                this.y = other.getBottomSide();
            }
        }
    }

    canvas_collisions() {
        if (this.getBottomSide() > canvas.height) {
            this.vy *= -1;
            this.y = canvas.height - this.height;
        }
        if (this.getRightSide() > canvas.width) {
            this.vx *= -1;
            this.x = canvas.width - this.width;
        }
        if (this.x < 0) {
            this.vx *= -1;
            this.x = 0;
        }
        if (this.y < 0) {
            this.vy *= -1;
            this.y = 0;
        }
    }
    update(delta: number) {
        if (!this.ready) {
            return;
        }
        this.x += this.vx * delta;
        this.y += this.vy * delta;
        this.checkCollisions(delta);
        this.draw();
    }
}

function init() {
    for (let i = 0; i < CALEB_NUM; i++) {
        const randX = getRandomInt(canvas.width);
        const randY = getRandomInt(canvas.height);

        createRandomCaleb(randX, randY, CALEB_WIDTH, CALEB_HEIGHT, CALEB_STARTING_MASS);
    }
    registerClicks();
}

function createRandomCaleb(x: number, y: number, width: number, height: number, weight: number) {
    const caleb = new BouncyObject("https://erakijeff.github.io/caleb.webp", width, height, weight);
    caleb.x = x;
    caleb.y = y;
    caleb.vx = Math.random() * CALEB_MAX_SPEED + CALEB_MIN_SPEED;
    caleb.vy = Math.random() * CALEB_MAX_SPEED + CALEB_MIN_SPEED;

    if (getRandomInt(2) == 0) {
        caleb.vx *= -1;
    }
    if (getRandomInt(2) == 0) {
        caleb.vy *= -1;
    }
    if (getRandomInt(2) == 0) {
        caleb.img.src = "https://erakijeff.github.io/5head.webp";
    }
    drawnObjects.push(caleb);
}

function registerClicks() {
    document.addEventListener("mousedown", (event) => {
        for (let i = 0; i < drawnObjects.length; i++) {
            let point = {
                x: event.x,
                y: event.y,
            };
            let caleb = drawnObjects[i];
            if (isPointInRect(point, caleb)) {
                let newWidth = caleb.width / 2;
                let newHeight = caleb.height / 2;
                let newMass = caleb.mass / 2;
                caleb.width = newWidth;
                caleb.height = newHeight;
                caleb.mass = newMass;
                createRandomCaleb(caleb.x, caleb.y, newWidth, newHeight, newMass);
            }
        }
    });
}

function testInit() {
    const CALEB1 = new BouncyObject("https://erakijeff.github.io/5head.webp", CALEB_WIDTH, CALEB_HEIGHT);
    const WALLOFFSET = 250;
    const SPEED_MULTIPLYER = 4;
    CALEB1.x = WALLOFFSET;
    CALEB1.y = 400;
    CALEB1.vx = CALEB_MIN_SPEED * SPEED_MULTIPLYER;
    const CALEB2 = new BouncyObject("https://erakijeff.github.io/caleb.webp", CALEB_WIDTH, CALEB_HEIGHT);
    CALEB2.x = canvas.width - WALLOFFSET - CALEB2.width;
    CALEB2.y = 400;
    CALEB2.vx = -CALEB_MIN_SPEED * SPEED_MULTIPLYER;
    CALEB2.mass = 10;
    drawnObjects.push(CALEB1);
    drawnObjects.push(CALEB2);
}

function testInit2() {
    const CALEB1 = new BouncyObject("https://erakijeff.github.io/5head.webp", CALEB_WIDTH, CALEB_HEIGHT);
    const WALLOFFSET = 250;
    CALEB1.x = WALLOFFSET;
    CALEB1.y = 200;
    const CALEB2 = new BouncyObject("https://erakijeff.github.io/caleb.webp", CALEB_WIDTH, CALEB_HEIGHT);
    CALEB2.x = CALEB1.x + 10;
    CALEB2.y = CALEB1.y + 51;

    drawnObjects.push(CALEB1);
    drawnObjects.push(CALEB2);
    // add mouse testing
    //document.addEventListener("mousemove", (ev) => {
    //     CALEB2.x = ev.x;
    //     CALEB2.y = ev.y;
    // });
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
    drawnObjects.forEach((obj: BouncyObject) => {
        obj.hasCollisionBeenChecked = false;
    });

    requestAnimationFrame(update);
}

// function testAABB() {
//     {
//         let rectangle1: IRectangle = {
//             x: 0,
//             y: 0,
//             width: 5,
//             height: 5,
//         };
//         let rectangle2: IRectangle = {
//             x: 10,
//             y: 10,
//             width: 5,
//             height: 5,
//         };
//         if (AABB(rectangle1, rectangle2) == true) {
//             console.log("failed test 1");
//         }
//     }
//     {
//         let rectangle1: IRectangle = {
//             x: 0,
//             y: 0,
//             width: 5,
//             height: 5,
//         };
//         let rectangle2: IRectangle = {
//             x: 10,
//             y: 10,
//             width: 5,
//             height: 5,
//         };
//         if (AABB(rectangle2, rectangle1) == true) {
//             console.log("failed test 2");
//         }
//     }
//     {
//         let rectangle1: IRectangle = {
//             x: 0,
//             y: 10,
//             width: 5,
//             height: 5,
//         };
//         let rectangle2: IRectangle = {
//             x: 10,
//             y: 0,
//             width: 5,
//             height: 5,
//         };
//         if (AABB(rectangle1, rectangle2) == true) {
//             console.log("failed test 3");
//         }
//     }
//     {
//         let rectangle1: IRectangle = {
//             x: 0,
//             y: 10,
//             width: 5,
//             height: 5,
//         };
//         let rectangle2: IRectangle = {
//             x: 10,
//             y: 0,
//             width: 5,
//             height: 5,
//         };
//         if (AABB(rectangle2, rectangle1) == true) {
//             console.log("failed test 4");
//         }
//     }
// }

init();
// testAABB();
// testInit();
update();
