import { Entity } from './entity';
import { AABB } from './utils';

export class Engine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  updatedObjects: Array<Entity>;
  old: number;

  constructor() {
    this.canvas = document.getElementById('screen') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.updatedObjects = Array<Entity>();
    this.old = new Date().getTime();
    this.canvas.width = window.innerWidth - 10;
    this.canvas.height = window.innerHeight - 10;
  }

  registerEntity(entity: Entity) {
    this.updatedObjects.push(entity);
  }

  update() {
    let current = new Date().getTime();
    let delta = (current - this.old) / 1000;
    this.old = current;
    console.log(this.updatedObjects);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updatedObjects.forEach((obj: Entity) => {
      obj.update(delta);
      //check collisions
      this.updatedObjects.forEach((entity) => {
        this.updatedObjects
          .filter((otherEntity) => otherEntity != entity)
          .forEach((otherEntity) => {
            if (AABB(entity, otherEntity)) {
              entity.onCollision(otherEntity);
            }
          });
      });
      obj.lateUpdate(delta);
      obj.draw(this.ctx);
    });
    this.updatedObjects.forEach((obj: Entity) => {
      obj.hasCollisionBeenChecked = false;
    });

    requestAnimationFrame(this.update.bind(this));
  }
}
