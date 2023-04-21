import { IRectangle } from './interfaces';
import { getBottomSide, getRightSide } from './utils';

abstract class Entity implements IRectangle {
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
  bounds: IRectangle;

  constructor(width: number, height: number, mass: number, bounds: IRectangle) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.mass = mass;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.ready = true;
    this.bounds = bounds;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract onCollision(other: Entity): void;

  update(delta: number) {
    if (this.ready) {
      this.vx += this.ax * delta;
      this.vy += this.ay * delta;
      this.x += this.vx * delta;
      this.y += this.vy * delta;
      this.bounds_collisions();
    }
  }

  lateUpdate(delta: number) {
    if (!this.ready) {
      this.ready = true;
    }
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

  /**
   *  Shifts back into bounds if outside of bounds.
   */
  bounds_collisions() {
    if (this.getBottomSide() > getBottomSide(this.bounds)) {
      this.vy *= -1;
      this.y = getBottomSide(this.bounds) - this.height;
    }
    if (this.getRightSide() > getRightSide(this.bounds)) {
      this.vx *= -1;
      this.x = getRightSide(this.bounds) - this.width;
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

  /**
   * Shifts us out of a collision if we end up inside of another object.
   * @param other Other Entity that we are currently colldiing with.
   */
  displaceCollision(other: Entity) {
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

  elasticCollision(other: Entity) {
    // derived using the elastic collision equations m1v1 + m2v2 = m1v1_hat + m2v2_hat and v1 + v1_hat = v2 + v2_hat
    // this object's new velocity after elastic collision
    let v1FinalVelocityX =
      (2 * other.mass * other.vx + this.mass * this.vx - other.mass * this.vx) /
      (this.mass + other.mass);
    let v1FinalVelocityY =
      (2 * other.mass * other.vy + this.mass * this.vy - other.mass * this.vy) /
      (this.mass + other.mass);
    // other object's new velocity after elastic collision
    let v2FinalVelocityX =
      (2 * this.mass * this.vx + other.mass * other.vx - this.mass * other.vx) /
      (this.mass + other.mass);
    let v2FinalVelocityY =
      (2 * this.mass * this.vy + other.mass * other.vy - this.mass * other.vy) /
      (this.mass + other.mass);
    this.vx = v1FinalVelocityX;
    this.vy = v1FinalVelocityY;
    other.vx = v2FinalVelocityX;
    other.vy = v2FinalVelocityY;
  }
}

export { Entity };
