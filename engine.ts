import { Entity } from "./entity";

class Engine {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    updatedObjects: Array<Entity>;
    old: number;

    constructor() {
        this.canvas = document.getElementById("screen") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.updatedObjects = Array<Entity>();
        this.old = new Date().getTime();
    }

    registerEntity(entity: Entity) {
        this.updatedObjects.push(entity);
    }

    update() {
        let current = new Date().getTime();
        let delta = (current - this.old) / 1000;
        this.old = current;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updatedObjects.forEach((obj: Entity) => {
            obj.update(delta);
        });
        this.updatedObjects.forEach((obj: Entity) => {
            obj.hasCollisionBeenChecked = false;
        });

        requestAnimationFrame(this.update);
    }
}
