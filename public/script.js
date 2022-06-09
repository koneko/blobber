const app = new PIXI.Application();
document.querySelector("div.canvas").appendChild(app.view);

window.onresize = () => {
    console.log(`OnResize - Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
    app.renderer.resize(window.innerWidth, window.innerHeight);
};
window.game = new Game();
window.game.changeState("main");
window.game.runState();
window.game.playerName = "Koneko";
