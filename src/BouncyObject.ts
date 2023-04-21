import { Entity } from './entity';
import { IRectangle } from './interfaces';

export class BouncyObject extends Entity {
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

  constructor(
    img_path: string,
    width: number,
    height: number,
    mass: number,
    bounds: IRectangle
  ) {
    super(width, height, mass, bounds);
    this.img = new Image(width, height);
    this.img.src = img_path;
    this.ready = false;
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
    this.bounds = bounds;
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

  onCollision(otherObject: Entity) {
    if (
      !(this.hasCollisionBeenChecked && otherObject.hasCollisionBeenChecked)
    ) {
      this.hasCollisionBeenChecked = true;
      otherObject.hasCollisionBeenChecked = true;
      this.displaceCollision(otherObject);
      this.elasticCollision(otherObject);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Used to change parameters frame by frame
   * DO NOT DRAW / UPDATE PHYSICS IN HERE
   * @param delta Time passed since last frame
   */
  update(delta: number) {
    if (!this.ready) {
      return;
    }
    super.update(delta);
  }
}
