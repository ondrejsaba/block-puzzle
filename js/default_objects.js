let objects = {
    "background": {
        x: 0,
        y: 0,
        width: canvas.width,
        height: 550,
        background: "#303036"
    },
    "deck": {
        x: 0,
        y: 400,
        width: canvas.width,
        height: 150,
        background: "#EFEFEF",
        mousedown: () => {
            objects.deck.y -= 20
        },
        mouseup: () => {
            objects.deck.y += 20
        }
    },
    "logo": {
        x: 50,
        y: 20,
        width: 300,
        height: 120,
        source: "assets/logoblue.png",
        mousedown: () => {
            console.log("click")
        }
    }
}