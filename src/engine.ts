import { BouncyObject } from './BouncyObject';
import { AABB, Point, isPointInRect } from './utils';

export class Engine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  updatedObjects: Array<BouncyObject>;
  old: number;
  loaded: boolean;

  constructor() {
    this.canvas = document.getElementById('screen') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.updatedObjects = Array<BouncyObject>();
    this.old = new Date().getTime();
    this.canvas.width = window.innerWidth - 10;
    this.canvas.height = window.innerHeight - 10;
    this.canvas.addEventListener('mousedown', this.handleMouseClick);
    this.loaded = false;
  }

  handleMouseClick(event: MouseEvent) {
    if (!this.loaded) {
      return;
    }
    this.updatedObjects.forEach((obj) => {
      let toRemove = [];
      let toAdd = [];
      let point: Point = { x: event.x, y: event.y };
      if (isPointInRect(point, obj)) {
        toRemove.push(obj);
      }
    });
  }

  registerEntity(entity: BouncyObject) {
    this.updatedObjects.push(entity);
  }

  update() {
    if (!this.loaded) {
      return;
    }
    let current = new Date().getTime();
    let delta = (current - this.old) / 1000;
    this.old = current;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updatedObjects.forEach((obj: BouncyObject) => {
      obj.update(delta);
    });

    for (let i = 0; i < this.updatedObjects.length; i++) {
      for (let j = 0; j < i; j++) {
        if (AABB(this.updatedObjects[i], this.updatedObjects[j])) {
          this.updatedObjects[i].onCollision(this.updatedObjects[j]);
        }
      }
    }

    this.updatedObjects.forEach((obj: BouncyObject) => {
      this.bounds_collisions(obj);
      obj.draw(this.ctx);
    });
    requestAnimationFrame(this.update.bind(this));
  }

  /**
   *  Shifts back into bounds if outside of bounds.
   */
  bounds_collisions(obj: BouncyObject) {
    if (obj.getBottomSide() > this.canvas.height) {
      obj.vy *= -1;
      obj.y = this.canvas.height - obj.height;
    }
    if (obj.getRightSide() > this.canvas.width) {
      obj.vx *= -1;
      obj.x = this.canvas.width - obj.width;
    }
    if (obj.x < 0) {
      obj.vx *= -1;
      obj.x = 0;
    }
    if (obj.y < 0) {
      obj.vy *= -1;
      obj.y = 0;
    }
  }
}
