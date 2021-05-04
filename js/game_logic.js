const map_size = 8
let map = []

for (i=0;i<map_size;i++) {
    map.push([])
    for (j=0;j<map_size;j++) {
        map[i].push(0)
    }
}

const tiles = {
    1: {
        map: [
            [1,0,0],
            [1,1,1]
        ],
        background: "#FF6201"
    },
    2: {
        map: [
            [1,1],
            [1,0]
        ],
        background: "#D33F49"
    },
    3: {
        map: [
            [1,1],
            [1,1]
        ],
        background: "#2667FF"
    },
    4: {
        map: [
            [1],
            [1]
        ],
        background: "#28AFB0"
    },
    5: {
        map: [
            [0,1],
            [1,1]
        ],
        background: "#F9C80E"
    },
    6: {
        map: [
            [1,1,1]
        ],
        background: "#A2D729"
    },
    7: {
        map: [
            [1],
            [1],
            [1]
        ],
        background: "#A01A7D"
    },
    8: {
        map: [
            [1]
        ],
        background: "#04724D"
    }
}

let tilesprops = {
    deck: [0,0,0],
    total: 0,
    focused: "",
    can_place: false
}

const generate_tiles = () => {
    while (tilesprops.deck.indexOf(0) != -1) {
        let index = tilesprops.deck.indexOf(0)
        tilesprops.deck[index] = Math.floor(Math.random() * 8) + 1

        tilesprops.total += 1
        let name = {
            tile: `tile${tilesprops.total}`,
            shadow: `tile${tilesprops.total}-shadow`
        }

        objects[name.shadow] = {
            x: 125*index,
            y: 425,
            width: tiles[tilesprops.deck[index]].map[0].length*50,
            height: tiles[tilesprops.deck[index]].map.length*50,
            source: `assets/tiles/${tilesprops.deck[index]}-shadow.png`,
            hide: true
        }

        objects[name.tile] = {
            x: 125*index,
            y: 425,
            default_x: 125*index,
            default_y: 425,
            width: tiles[tilesprops.deck[index]].map[0].length*50,
            height: tiles[tilesprops.deck[index]].map.length*50,
            source: `assets/tiles/${tilesprops.deck[index]}.png`,

            mousedown: () => {
                tilesprops.focused = hover.name
            }
        }

        put_images()
    }
}
generate_tiles()

let place_location = {x: 0, y: 0}
canvas.addEventListener('mousemove', () => {
    if (objects[tilesprops.focused] !== undefined) {
        [objects[tilesprops.focused].x, objects[tilesprops.focused].y] = [cursor.x, cursor.y]

        if (cursor.y < 450-objects[tilesprops.focused].height && cursor.x < 450-objects[tilesprops.focused].width) {
            place_location = {
                x: Math.floor(cursor.x/50),
                y: Math.floor(cursor.y/50)
            }

            tilesprops.can_place = true

            Object.assign(objects[`${tilesprops.focused}-shadow`], {
                x: place_location.x*50,
                y: place_location.y*50,
                hide: false
            })
        } else {
            tilesprops.can_place = false
            objects[`${tilesprops.focused}-shadow`].hide = true
        }
    }
})

canvas.addEventListener('mouseup', () => {
    if (tilesprops.focused !== "") {
        if (tilesprops.can_place == true) {
            Object.assign(objects[tilesprops.focused], {
                x: place_location.x*50,
                y: place_location.y*50,
            })
            delete objects[tilesprops.focused].mousedown
        } else {
            Object.assign(objects[tilesprops.focused], {
                x: objects[tilesprops.focused].default_x,
                y: objects[tilesprops.focused].default_y
            })
        }
        objects[`${tilesprops.focused}-shadow`].hide = true
        tilesprops.focused = ""
    }
})