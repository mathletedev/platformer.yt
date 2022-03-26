import Entity from "./entity";
import { Vector, __follow__, __size__ } from "./lib";
import Player from "./player";

export default class Game {
  private canvas = document.querySelector("canvas") as HTMLCanvasElement;
  private ctx = this.canvas.getContext("2d")!;
  private cam: Vector = {
    x: -window.innerWidth / 2,
    y: -window.innerHeight / 2,
  };
  private player = new Player();
  private keys = {
    left: false,
    right: false,
    jump: false,
  };
  private tiles: Entity[] = [];

  public constructor() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });

    document.addEventListener("keydown", (ev) => this.handleKey(ev, true));
    document.addEventListener("keyup", (ev) => this.handleKey(ev, false));
  }

  public tick() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.move(this.keys.left, this.keys.right);
    if (this.keys.jump) this.player.jump();

    this.player.tick(this.tiles);
    this.player.draw(this.ctx, this.cam);

    for (const tile of this.tiles) tile.draw(this.ctx, this.cam);

    this.cam.x = Math.round(
      this.cam.x -
        (this.cam.x + this.canvas.width / 2 - this.player.getPosition.x) *
          __follow__.x
    );
    this.cam.y = Math.round(
      this.cam.y -
        (this.cam.y + this.canvas.height / 2 - this.player.getPosition.y) *
          __follow__.y
    );
  }

  public loadMap(map: number[][]) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === 1)
          this.tiles.push(
            new Entity(
              {
                x: (j - (map[i].length - 1) / 2) * __size__,
                y: (i - (map.length - 1) / 2) * __size__,
              },
              { x: __size__, y: __size__ },
              "white"
            )
          );
      }
    }
  }

  private handleKey(ev: KeyboardEvent, down: boolean) {
    switch (ev.key) {
      default:
        return;
      case "ArrowLeft":
      case "a":
        this.keys.left = down;
        break;
      case "ArrowRight":
      case "d":
        this.keys.right = down;
        break;
      case "ArrowUp":
      case "w":
      case " ":
        this.keys.jump = down;
        break;
    }
  }
}
