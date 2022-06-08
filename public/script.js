const app = new PIXI.Application()
document.querySelector("div.canvas").appendChild(app.view);
// set app width and height to be the same as the window
//agar.io clone
class Game {
    constructor () {
        app.renderer.view.style.width = "100%"
        app.renderer.view.style.height = "100%"
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth, window.innerHeight)
        app.renderer.backgroundColor = 0xffffff
        this.state = {}
        this.elements = []
        this.playerName = null
    }
    createWorld () {
        this.world = new World()
    }
    changeState (inputstate) {
        this.state.name = inputstate
        this.state.run = () => {
            switch (this.state.name) {
                case "main":
                    this.main()
                    break;
                case "game":
                    this.game()
                    break;
                default:
                    console.log("No state active.")
                    alert("No state active.")
                    break;
            }
        }
    }
    runState () {
        this.state.run()
    }
    clearElements () {
        this.elements.forEach(element => {
            //check is element obj
            if (element.button) {
                app.stage.removeChild(element.button)
                app.stage.removeChild(element.text)
            } else app.stage.removeChild(element)
        })
    }
    promptName () {
        let name = prompt("Username?", "An unnamed blobber")
        //check is name empty
        if (+name == false) {
            alert("Please enter a username to play.")
        } else {
            this.playerName = name
        }
    }
    createButton (text, x, y, width, height, callback) {
        let button = new PIXI.Graphics()
        button.beginFill(0xffffff)
        button.drawRect(x, y, width, height)
        button.endFill()
        button.interactive = true
        button.buttonMode = true
        button.on("pointerdown", callback)
        let textObject = new PIXI.Text(text, {
            fontFamily: "Lotion",
            fontSize: 30,
            fill: 0x000000,
            align: "center"
        })
        //center text in the button
        textObject.x = x + width / 2 - textObject.width / 2
        textObject.y = y + height / 2 - textObject.height / 2
        //add border to button
        button.lineStyle(2, 0x000000)
        button.drawRect(x, y, width, height)
        app.stage.addChild(button)
        app.stage.addChild(textObject)
        let buttonObj = {
            button: button,
            text: textObject
        }
        this.elements.push(buttonObj)
    }
    main () { // main menu state
        console.log("main state active")
        this.clearElements()
        //draw UI
        //draw text in the middle of the screen
        let text = new PIXI.Text("Blobber game", {
            fontFamily: "Lotion",
            fontSize: app.renderer.width / 30 + "px",
            fill: "black",
            align: "center"
        })
        text.x = app.renderer.width / 2 - text.width / 2
        //offset the text by half the height of the text
        text.y = app.renderer.height / 15
        app.stage.addChild(text)
        this.elements.push(text)
        //create a button
        let buttonX = app.renderer.width / 2 - app.renderer.width / 10
        let buttonY = app.renderer.height / 2 - app.renderer.height / 10
        let buttonWidth = app.renderer.width / 5
        let buttonHeight = app.renderer.height / 10
        this.createButton("Play", buttonX, buttonY, buttonWidth, buttonHeight, () => {
            this.changeState("game")
            this.runState()
        })
    }
    game () { // game state
        console.log("game state active")
        if (this.playerName == null) this.promptName()
        this.clearElements()
    }
}

class World {
    constructor () {
        //set width and height to browser window size
        this.width = 1000
        this.height = 1000
    }
}

class Player {
    constructor () {
        this.mass = 100
        this.radius = this.calculateRadius()
        this.speed = this.calculateSpeed()
        //randomly choose x and y coordinates within the world
        this.x = Math.random() * 1000
        this.y = Math.random() * 1000
        //randomly picked color
        this.color = Math.random() * 0xffffff
    }
    draw (x, y) {
        //draw circle at x and y 
        this.circle = new PIXI.Graphics()
        let circle = this.circle
        circle.beginFill(this.color)
        circle.drawCircle(x, y, this.radius)
        circle.endFill()
        app.stage.addChild(circle)
    }
    calculateRadius () {
        return Math.sqrt(this.mass / Math.PI)
    }
    calculateSpeed () {
        return Math.sqrt(Math.pow(this.radius + 2))
    }
    moveX (velocity) {
        this.x += velocity * this.speed
    }
    moveY (velocity) {
        this.y += velocity * this.speed
    }
}

const game = new Game()
game.changeState("main")
game.runState()