
class World {
    constructor (game) {
        //set width and height to browser window size
        this.game = game;
        this.width = 11000;
        this.height = 11000;
        this.worldContainer = new PIXI.Container();
        this.worldContainer.zIndex = 1000;
        app.stage.addChild(this.worldContainer);

        this.items = [];

        for (let i = 0; i < 50; i += 1) {
            let item = new PIXI.Graphics();
            item.color = Math.random() * 0xffffff;
            item.x = Math.floor(Math.random() * app.renderer.width);
            item.y = Math.floor(Math.random() * app.renderer.height);
            this.worldContainer.addChild(item);
            this.items.push(item);
        }

        //load background image and infinitely tile it
        //background url /assets/background.jpg
        let texture = PIXI.Texture.from("/assets/background.jpg");
        this.background = new PIXI.TilingSprite(texture, app.renderer.width, app.renderer.height);
        this.background.tileScale.x = 1;
        this.background.tileScale.y = 1;
        this.background.tilePosition.x = 0;
        this.background.tilePosition.y = 0;
        this.background.zIndex = 0;
        app.stage.addChild(this.background);
        console.log(`Drawing background W: ${this.background.width} H: ${this.background.height}`);

        this.totalDeltaTime = 0;
        app.ticker.add((delta) => this.onTick(delta));
    }

    onTick (delta) {
        this.totalDeltaTime += 1
        //if ((this.totalDeltaTime % 10) != 0) return;
        if (this.game.state.name !== "game") return;

        this.game.player.moveTo(this.game.mousePositionX, this.game.mousePositionY)
        this.items.forEach(item => {
            item.clear()
            item.beginFill(item.color);
            item.drawCircle(item.x, item.y, 10);
            item.endFill();
        });
    }

    pan (x, y) {
        //console.log(`Panning camera to X: ${x} Y: ${y}`);
        this.worldContainer.x = x;
        this.worldContainer.y = y;
    }
}