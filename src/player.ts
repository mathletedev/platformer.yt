import Entity from "./entity";
import {
  Vector,
  __friction__,
  __gravity,
  __jump__,
  __size__,
  __speed__,
} from "./lib";

export default class Player extends Entity {
  private vel: Vector = { x: 0, y: 0 };
  private grounded = false;

  public constructor() {
    super({ x: 0, y: 0 }, { x: __size__, y: __size__ }, "blue");
  }

  public move(left: boolean, right: boolean) {
    if (left) this.vel.x -= __speed__;
    if (right) this.vel.x += __speed__;
  }

  public jump() {
    if (this.grounded) this.vel.y += __jump__;
  }

  public tick(tiles: Entity[]) {
    this.pos.x += this.vel.x;

    for (const tile of tiles) {
      if (this.checkCollision(tile)) {
        this.pos.x -=
          this.vel.x > 0
            ? this.bounds.right - tile.bounds.left
            : this.bounds.left - tile.bounds.right;
        this.vel.x = 0;
      }
    }

    this.pos.y -= this.vel.y;

    this.grounded = false;

    for (const tile of tiles) {
      if (this.checkCollision(tile)) {
        this.pos.y -=
          this.vel.y > 0
            ? this.bounds.top - tile.bounds.bottom
            : this.bounds.bottom - tile.bounds.top;
        this.vel.y = 0;
        this.grounded = this.pos.y < tile.getPosition.y;
      }
    }

    this.vel.x *= __friction__;
    this.vel.y -= __gravity;
  }
}
