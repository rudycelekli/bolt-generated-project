import { Player } from './Player.js';
import { Enemy } from './Enemy.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.player = new Player(canvas);
    this.enemies = [];
    this.gameOver = false;
    this.score = 0;
    
    this.createEnemies();
    this.setupControls();
  }

  createEnemies() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        this.enemies.push(new Enemy(
          col * 60 + 50,
          row * 50 + 30
        ));
      }
    }
  }

  setupControls() {
    document.addEventListener('keydown', (e) => {
      if (this.gameOver) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          this.player.move('left');
          break;
        case 'ArrowRight':
          this.player.move('right');
          break;
        case ' ':
          this.player.shoot();
          break;
      }
    });
  }

  checkCollisions() {
    this.player.bullets.forEach((bullet, bulletIndex) => {
      this.enemies.forEach((enemy, enemyIndex) => {
        if (bullet.x < enemy.x + enemy.width &&
            bullet.x > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y > enemy.y) {
          this.player.bullets.splice(bulletIndex, 1);
          this.enemies.splice(enemyIndex, 1);
          this.score += 100;
        }
      });
    });

    this.enemies.forEach(enemy => {
      if (enemy.y + enemy.height >= this.player.y) {
        this.gameOver = true;
      }
    });
  }

  update() {
    if (this.gameOver) return;

    this.player.update();
    
    let shouldMoveDown = false;
    this.enemies.forEach(enemy => {
      enemy.move();
      if (enemy.x <= 0 || enemy.x + enemy.width >= this.canvas.width) {
        shouldMoveDown = true;
      }
    });

    if (shouldMoveDown) {
      this.enemies.forEach(enemy => enemy.moveDown());
    }

    this.checkCollisions();
  }

  draw() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.player.draw(this.ctx);
    this.enemies.forEach(enemy => enemy.draw(this.ctx));

    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 30);

    if (this.gameOver) {
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '40px Arial';
      this.ctx.fillText('GAME OVER', 
        this.canvas.width / 2 - 100,
        this.canvas.height / 2);
    }
  }
}
