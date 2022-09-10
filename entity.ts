import { IRectangle } from "./interfaces";

class Entity implements IRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    mass: number;
    vx: number;
    vy: number;
    ax: number;
    ay: number;
    ready: boolean;
    hasCollisionBeenChecked = false;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        mass: number,
        vx: number,
        vy: number,
        ax: number,
        ay: number
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.mass = mass;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
        this.ready = true;
    }
    update(delta: number) {
        if (this.ready) {
            this.vx += this.ax * delta;
            this.vy += this.ay * delta;
            this.x += this.vx * delta;
            this.y += this.vy * delta;
        }
    }
}

export { Entity };
