
class World {
    constructor(game) {
        //set width and height to browser window size
        this.game = game;
        this.width = 11000;
        this.height = 11000;
        this.worldContainer = new PIXI.Container();
        this.worldContainer.zIndex = 1000;
        app.stage.addChild(this.worldContainer);

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

    onTick(delta) {
        this.totalDeltaTime += 1
        //if ((this.totalDeltaTime % 10) != 0) return;
        if (this.game.state.name !== "game") return;

        var xOffset = 0;
        var yOffset = 0

        if (this.game.player.x > this.game.mousePositionX) xOffset = -1
        else if (this.game.player.x < this.game.mousePositionX) xOffset = 1

        if (this.game.player.y > this.game.mousePositionY) yOffset = -1
        else if (this.game.player.y < this.game.mousePositionY) yOffset = 1

        //console.log(`Moving player towards ${this.game.mousePositionX} / ${this.game.mousePositionY}`);
        this.game.player.moveBy(xOffset, yOffset)
    }

    pan(x, y) {
        console.log(`Panning camera to X: ${x} Y: ${y}`);
        this.worldContainer.x = x;
        this.worldContainer.y = y;
    }
}