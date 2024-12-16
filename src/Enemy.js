export class Enemy {
  constructor(x, y) {
    this.width = 40;
    this.height = 30;
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.direction = 1;
  }

  draw(ctx) {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speed * this.direction;
  }

  moveDown() {
    this.y += 30;
    this.direction *= -1;
  }
}
