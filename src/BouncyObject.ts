export class BouncyObject {
  img: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  width: number;
  height: number;
  ready: boolean;

  constructor(img_path: string, width: number, height: number, mass: number) {
    this.img = new Image(width, height);
    this.img.src = img_path;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.mass = mass;
    this.width = width;
    this.height = height;
    this.ready = false;
    this.img.onload = () => {
      this.ready = true;
    };
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

  onCollision(otherObject: BouncyObject) {
    this.displaceCollision(otherObject);
    this.elasticCollision(otherObject);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Shifts us out of a collision if we end up inside of another object.
   * @param other Other BouncyObject that we are currently colldiing with.
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

  elasticCollision(other: BouncyObject) {
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
    // TODO: Look at this later
    other.vx = v2FinalVelocityX;
    other.vy = v2FinalVelocityY;
  }

  // /**
  //  *  Shifts back into bounds if outside of bounds.
  //  */
  // bounds_collisions() {
  //   if (this.getBottomSide() > getBottomSide(this.bounds)) {
  //     this.vy *= -1;
  //     this.y = getBottomSide(this.bounds) - this.height;
  //   }
  //   if (this.getRightSide() > getRightSide(this.bounds)) {
  //     this.vx *= -1;
  //     this.x = getRightSide(this.bounds) - this.width;
  //   }
  //   if (this.x < 0) {
  //     this.vx *= -1;
  //     this.x = 0;
  //   }
  //   if (this.y < 0) {
  //     this.vy *= -1;
  //     this.y = 0;
  //   }
  // }

  update(delta: number) {
    if (this.ready) {
      this.x += this.vx * delta;
      this.y += this.vy * delta;
    }
  }
}
