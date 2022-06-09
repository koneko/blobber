
// set app width and height to be the same as the window
//agar.io clone
class Game {
    constructor() {
        app.renderer.resize(window.innerWidth - 10, window.innerHeight - 10);
        app.renderer.backgroundColor = 0xffffff;
        app.stage.sortableChildren = true;
        console.log(`Constructing game - Width: ${app.renderer.width}, Height: ${app.renderer.height}`);
        this.UIContainer = new PIXI.Container();
        this.mousePositionX = 0;
        this.mousePositionY = 0;
        this.state = {};
        this.playerName = null;
        this.world = null;
        this.player = null;
        this.UIContainer.zIndex = 2;
        app.stage.addChild(this.UIContainer);
        app.renderer.view.addEventListener("mousemove", (e) => {
            this.mousePositionX = e.offsetX;
            this.mousePositionY = e.offsetY;
        });
    }
    createWorld() {
        this.world = new World(this);
    }
    createPlayer() {
        this.player = new Player(this);
    }
    changeState(inputstate) {
        this.state.name = inputstate;
        this.state.run = () => {
            switch (this.state.name) {
                case "main":
                    this.main();
                    break;
                case "game":
                    this.game();
                    break;
                default:
                    console.log("No state active.");
                    alert("No state active.");
                    break;
            }
        };
    }
    runState() {
        this.state.run();
    }
    clearUI() {
        this.UIContainer.removeChildren();
    }
    promptName() {
        let name = prompt("Username?", "An unnamed blobber");
        //check is name empty
        if (+name == false) {
            alert("Please enter a username to play.");
        } else {
            this.playerName = name;
        }
    }
    createButton(text, x, y, width, height, callback) {
        let button = new PIXI.Graphics();
        button.beginFill(0xffffff);
        button.drawRect(x, y, width, height);
        button.lineStyle(2, 0x000000);
        button.drawRect(x, y, width, height);
        button.endFill();
        button.interactive = true;
        button.buttonMode = true;
        button.on("pointerdown", callback);
        let textObject = new PIXI.Text(text, {
            fontFamily: "Lotion",
            fontSize: 30,
            fill: 0x000000,
        });
        //center text in the button
        textObject.x = x + width / 2 - textObject.width / 2;
        textObject.y = y + height / 2 - textObject.height / 2;
        //add border to button
        this.UIContainer.addChild(button);
        this.UIContainer.addChild(textObject);
    }
    main() {
        // main menu state
        console.log("main state active");
        this.clearUI();
        //draw UI
        //draw text in the middle of the screen
        let text = new PIXI.Text("Blobber game", {
            fontFamily: "Lotion",
            fontSize: app.renderer.width / 30 + "px",
            fill: "black",
            align: "center",
        });
        text.x = app.renderer.width / 2 - text.width / 2;
        //offset the text by half the height of the text
        text.y = app.renderer.height / 15;
        this.UIContainer.addChild(text);
        //create a button
        let buttonX = app.renderer.width / 2 - app.renderer.width / 10;
        let buttonY = app.renderer.height / 2 - app.renderer.height / 10;
        let buttonWidth = app.renderer.width / 5;
        let buttonHeight = app.renderer.height / 10;
        this.createButton("Play", buttonX, buttonY, buttonWidth, buttonHeight, () => {
            this.changeState("game");
            this.runState();
        });
        this.createButton("Set username", buttonX, buttonY + buttonHeight + 30, buttonWidth, buttonHeight, () => {
            this.promptName();
        });
    }
    game() {
        // game state
        console.log("game state active");
        if (this.playerName == null) return this.changeState("main");
        if (this.state.name != "game") return;
        this.clearUI();
        this.createWorld();
        this.createPlayer();
        //this.world.pan(this.player.x, this.player.y);
    }
}