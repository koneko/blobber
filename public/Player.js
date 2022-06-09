class Player {
    constructor (game) {
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
        this.game.world.pan(this.x - Math.round(app.renderer.width / 2), this.y - Math.round(app.renderer.height / 2))
    }

    draw () {
        this.circle.clear()
        this.circle.beginFill(this.color);
        this.circle.drawCircle(this.x, this.y, this.radius);
        this.circle.endFill();
    }

    calculateRadius () {
        return this.mass / 3;
    }
    calculateSpeed () {
        //return Math.sqrt(Math.pow(this.radius + 2, 2));
        return 10;
    }
    moveTo (targetX, targetY) {
        const xOffset = (targetX - this.x);
        const yOffset = (targetY - this.y);
        const total = Math.abs(xOffset) + Math.abs(yOffset);

        if (total !== 0) this.x += Math.round(this.speed * xOffset / total);
        if (total !== 0) this.y += Math.round(this.speed * yOffset / total);
        this.draw();
        // this.circle.x = this.x;
        // this.circle.y = this.y;
        //console.log(`Moving player to ${this.x} / ${this.y}`);
        this.game.world.pan(this.x / 2 - Math.round(app.renderer.width / 2), this.y / 2 - Math.round(app.renderer.height / 2))
    }

    add (mass) {
        this.mass += mass;
        this.radius = this.calculateRadius();
        this.speed = this.calculateSpeed();
    }
}