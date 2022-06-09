import { Camera, PanTo } from './camera.js'
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
        this.world = null
        this.player = null
    }
    createCamera () {
        this.camera = new Camera({ ticker: app.ticker })
    }
    createWorld () {
        this.world = new World(this)
    }
    createPlayer () {
        this.player = new Player(this)
        this.player.draw()
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
        //remove all elements
        this.elements = []
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
        button.lineStyle(2, 0x000000)
        button.drawRect(x, y, width, height)
        button.endFill()
        button.interactive = true
        button.buttonMode = true
        button.on("pointerdown", callback)
        let textObject = new PIXI.Text(text, {
            fontFamily: "Lotion",
            fontSize: 30,
            fill: 0x000000
        })
        //center text in the button
        textObject.x = x + width / 2 - textObject.width / 2
        textObject.y = y + height / 2 - textObject.height / 2
        //add border to button
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
        this.createButton("Set username", buttonX, buttonY + buttonHeight + 30, buttonWidth, buttonHeight, () => { this.promptName() })
    }
    game () { // game state
        console.log("game state active")
        if (this.playerName == null) return this.changeState("main")
        if (this.state.name != "game") return
        this.clearElements()
        this.createCamera()
        this.createWorld()
        this.world.createBackground()
        this.createPlayer()
        this.world.pan(this.player.x, this.player.y)
    }
}

class World {
    constructor (game) {
        //set width and height to browser window size
        this.game = game
        this.width = "1000px"
        this.height = "1000px"
        this.elements = game.elements
        this.camera = game.camera
    }
    createBackground () {
        //load background image and infinitely tile it
        //background url /assets/background.jpg
        let texture = PIXI.Texture.from("/assets/background.jpg")
        let background = new PIXI.TilingSprite(texture, 10000, 10000)
        //background.width = 1000
        //background.height = 1000
        //make the background tile infinitely
        background.tileScale.x = 1
        background.tileScale.y = 1
        background.tilePosition.x = 0
        background.tilePosition.y = 0
        app.stage.addChild(background)
        this.elements.push(background)
        console.log(`Drawing background W: ${background.width} H: ${background.height}`)
    }
    pan (x, y) {
        console.log(`Panning camera to X: ${x} Y: ${y}`)
        let pan = new PanTo(app.stage, x - app.renderer.width / 2, y - app.renderer.height / 2, 5000);
        this.camera.effect(pan)
    }
}

class Player {
    constructor (game) {
        this.game = game
        this.mass = 100
        this.radius = this.calculateRadius()
        this.speed = this.calculateSpeed()
        //randomly choose x and y coordinates within the world from 0 to world width and height
        this.x = random(0, +game.world.width.replace("px", ""))
        this.y = random(0, +game.world.height.replace("px", ""))
        //randomly picked color
        this.color = Math.random() * 0xffffff
        this.draw()
    }
    draw () {
        //draw circle at x and y 
        console.log(`Drawing player X: ${this.x} Y: ${this.y} Radius: ${this.radius}`)
        this.circle = new PIXI.Graphics()
        let circle = this.circle
        circle.beginFill(this.color)
        circle.drawCircle(this.x, this.y, this.radius)
        //give z index higher than background
        circle.zIndex = 1
        circle.endFill()
        app.stage.addChild(circle)
        this.game.elements.push(circle)
    }
    calculateRadius () {
        return this.mass / 3
    }
    calculateSpeed () {
        return Math.sqrt(Math.pow(this.radius + 2, 2))
    }
    moveX (velocity) {
        this.x += velocity * this.speed
    }
    moveY (velocity) {
        this.y += velocity * this.speed
    }
    add (mass) {
        this.mass += mass
        this.radius = this.calculateRadius()
        this.speed = this.calculateSpeed()
    }
}
window.onresize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight)
}
window.game = new Game()
window.game.changeState("main")
window.game.runState()
window.game.playerName = "Koneko"