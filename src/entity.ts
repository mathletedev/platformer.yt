import { Vector } from "./lib";

export default class Entity {
  protected pos: Vector;
  protected size: Vector;
  protected color: string;

  public constructor(pos: Vector, size: Vector, color: string) {
    this.pos = pos;
    this.size = size;
    this.color = color;
  }

  public draw(ctx: CanvasRenderingContext2D, cam: Vector) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.pos.x - this.size.x / 2 - cam.x,
      this.pos.y - this.size.y / 2 - cam.y,
      this.size.x,
      this.size.y
    );
  }

  public get getPosition() {
    return this.pos;
  }

  public get bounds() {
    return {
      left: this.pos.x - this.size.x / 2,
      right: this.pos.x + this.size.x / 2,
      top: this.pos.y - this.size.y / 2,
      bottom: this.pos.y + this.size.y / 2,
    };
  }

  public checkCollision(other: Entity) {
    return (
      this.bounds.left < other.bounds.right &&
      this.bounds.right > other.bounds.left &&
      this.bounds.top < other.bounds.bottom &&
      this.bounds.bottom > other.bounds.top
    );
  }
}
