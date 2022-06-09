class Player {
    constructor(game) {
        this.game = game;
        this.mass = 100;
        this.radius = this.calculateRadius();
        this.speed = this.calculateSpeed();
        //randomly choose x and y coordinates within the world from 0 to world width and height
        this.x = Math.floor(Math.random() * app.renderer.width); // this.game.width
        this.y = Math.floor(Math.random() * app.renderer.height); // this.game.height
        //randomly picked color
        this.color = Math.random() * 0xffffff;
        this.circle = new PIXI.Graphics();
        this.circle.zIndex = 1;
        this.game.world.worldContainer.addChild(this.circle);
    }

    draw() {
        this.circle.clear()
        this.circle.beginFill(this.color);
        this.circle.drawCircle(this.x, this.y, this.radius);
        this.circle.endFill();
    }

    calculateRadius() {
        return this.mass / 3;
    }
    calculateSpeed() {
        //return Math.sqrt(Math.pow(this.radius + 2, 2));
        return 2;
    }
    moveBy(xOffset, yOffset) {
        this.x += xOffset * this.speed;
        this.y += yOffset * this.speed;
        this.draw();
        // this.circle.x = this.x;
        // this.circle.y = this.y;
        //console.log(`Moving player to ${this.circle.x} / ${this.circle.y}`);
    }

    add(mass) {
        this.mass += mass;
        this.radius = this.calculateRadius();
        this.speed = this.calculateSpeed();
    }
}