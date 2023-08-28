import { BouncyObject } from './BouncyObject';
import { AABB } from './utils';

export class Engine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  updatedObjects: Array<BouncyObject>;
  old: number;

  constructor() {
    this.canvas = document.getElementById('screen') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.updatedObjects = Array<BouncyObject>();
    this.old = new Date().getTime();
    this.canvas.width = window.innerWidth - 10;
    this.canvas.height = window.innerHeight - 10;
  }

  registerEntity(entity: BouncyObject) {
    this.updatedObjects.push(entity);
  }

  update() {
    let current = new Date().getTime();
    let delta = (current - this.old) / 1000;
    this.old = current;
    console.log(this.updatedObjects);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updatedObjects.forEach((obj: BouncyObject) => {
      obj.update(delta);
      // TODO: check collisions
      obj.draw(this.ctx);
    });

    requestAnimationFrame(this.update.bind(this));
  }
}
