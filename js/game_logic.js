let score = 0
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
            [1,1,1],
            [1,0,0]
        ],
        count: 4,
        background: "#FF6201"
    },
    2: {
        map: [
            [1,1],
            [1,0]
        ],
        count: 3,
        background: "#D33F49"
    },
    3: {
        map: [
            [1,1],
            [1,1]
        ],
        count: 4,
        background: "#2667FF"
    },
    4: {
        map: [
            [1],
            [1]
        ],
        count: 2,
        background: "#28AFB0"
    },
    5: {
        map: [
            [0,1],
            [1,1]
        ],
        count: 3,
        background: "#F9C80E"
    },
    6: {
        map: [
            [1,1,1]
        ],
        count: 3,
        background: "#A2D729"
    },
    7: {
        map: [
            [1],
            [1],
            [1]
        ],
        count: 3,
        background: "#A01A7D"
    },
    8: {
        map: [
            [1]
        ],
        count: 1,
        background: "#04724D"
    },
    9: {
        map: [
            [1,1],
            [1,0],
            [1,0]
        ],
        count: 4,
        background: "#52489C"
    },
    10: {
        map: [
            [0,1,1],
            [1,1,0]
        ],
        count: 4,
        background: "#FFE66D"
    }
}

let tilesprops = {
    deck: [0,0,0],
    total: 0,
    type: 0,
    focused: "",
    can_place: false
}

let place_location = {x: 0, y: 0}

const update_score = () => {
    document.querySelector("#score").innerHTML = score
}

// regeneration of the tile deck
const generate_tile_type = () => {
    let index = tilesprops.deck.indexOf(0)
    let type = Math.floor(Math.random() * Object.keys(tiles).length) + 1
    if (tilesprops.deck.includes(type)) {
        generate_tile_type()
    } else {
        tilesprops.deck[index] = type
    }
}

const generate_tiles = () => {
    while (tilesprops.deck.indexOf(0) != -1) {
        let index = tilesprops.deck.indexOf(0)
        generate_tile_type()

        tilesprops.total += 1
        let name = {
            tile: `tile${tilesprops.total}`,
            shadow: `tile${tilesprops.total}-shadow`
        }

        objects[name.shadow] = {
            x: (125*index)+30,
            y: 425,
            width: tiles[tilesprops.deck[index]].map[0].length*50,
            height: tiles[tilesprops.deck[index]].map.length*50,
            source: `assets/tiles/${tilesprops.deck[index]}-shadow.png`,
            hide: true
        }

        objects[name.tile] = {
            x: (125*index)+30,
            y: 425,
            default_x: (125*index)+30,
            default_y: 425,
            width: tiles[tilesprops.deck[index]].map[0].length*30,
            height: tiles[tilesprops.deck[index]].map.length*30,
            source: `assets/tiles/${tilesprops.deck[index]}.png`,

            mousedown: () => {
                tilesprops.focused = hover.name
                tilesprops.type = tilesprops.deck[index]
                document.querySelector("#main").style.cursor = "none"

                Object.assign(objects[name.tile], {
                    width: tiles[tilesprops.deck[index]].map[0].length*50,
                    height: tiles[tilesprops.deck[index]].map.length*50,
                    top: true
                })
            },
        }

        put_images()
    }
}
generate_tiles()

const map_loop = (main, before = () => {}, after = () => {}) => {
    for (y = 0; y < map_size; y++) {
        before()
        for (x = 0; x < map_size; x++) {
            main()
        }
        after()
    }
}

// checking for full rows or columns
let count = {
    row: 0,
    column: 0
}

const check_full = () => {
    map_loop(() => {
        for (x = 0; x < map_size; x++) {
            if (map[y][x] != 0) {
                count.row += 1
            }
            if (map[x][y] != 0) {
                count.column += 1
            }
        }
    }, () => {
        count = {
            row: 0,
            column: 0
        }
    }, () => {
        switch (map_size) {
            case count.row:
                score += 10
                for (x = 0; x < map_size; x++) {
                    map[y][x] = 0
                    if (objects[`placed-tile${x}x${y}`] !== undefined) {
                        delete_object(`placed-tile${x}x${y}`)
                    }
                }
            case count.column:
                score += 10
                for (x = 0; x < map_size; x++) {
                    map[x][y] = 0
                    if (objects[`placed-tile${y}x${x}`] !== undefined) {
                        delete_object(`placed-tile${y}x${x}`)
                    }
                } 
            default:
                break;
        }
    })
}

// checking whether there are any other moves possible
const check_moves = () => {
    let possible_moves = 0
    for (tile of tilesprops.deck) {
        const tilemap = tiles[tile].map
        map_loop(() => {
            if (x <= map_size-tilemap[0].length && y <= map_size-tilemap.length) {
                let pass = 0
                for (tx = 0; tx < tilemap[0].length; tx++) {
                    for (ty = 0; ty < tilemap.length; ty++) {
                        if (tilemap[ty][tx] != 0 && map[y+ty][x+tx] == 0) {
                            pass += 1
                        }
                    }
                }

                if (pass == tiles[tile].count) {
                    possible_moves += 1
                }
            }
        })
    }
    return possible_moves
}

canvas.addEventListener('mousemove', () => {
    if (objects[tilesprops.focused] !== undefined) {
        Object.assign(objects[tilesprops.focused], {
            x: cursor.x,
            y: cursor.y,
        })

        if (cursor.y < 450-objects[tilesprops.focused].height && cursor.x < 450-objects[tilesprops.focused].width) {
            place_location = {
                x: Math.floor(cursor.x/50),
                y: Math.floor(cursor.y/50)
            }

            let tilemap = tiles[tilesprops.type].map
            let pass = 0
            for (x = 0; x < tilemap[0].length; x++) {
                for (y = 0; y < tilemap.length; y++) {
                    if (tilemap[y][x] != 0 && map[y+place_location.y][x+place_location.x] == 0) {
                        pass += 1
                    }
                }
            }
            
            if (pass == tiles[tilesprops.type].count) {
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

        } else {
            tilesprops.can_place = false
            objects[`${tilesprops.focused}-shadow`].hide = true
        }
    }
})

canvas.addEventListener('mouseup', () => {
    if (tilesprops.focused !== "") {
        document.querySelector("#main").style.cursor = "default"
        if (tilesprops.can_place == true) {
            const objects_to_delete = [
                tilesprops.focused,
                tilesprops.focused + "-shadow"
            ]
            for (object of objects_to_delete) {
                delete_object(object)
            }
            score += tiles[tilesprops.type].count
            let tilemap = tiles[tilesprops.type].map
            for (x = 0; x < tilemap[0].length; x++) {
                for (y = 0; y < tilemap.length; y++) {
                    if (tilemap[y][x] != 0) {
                        map[place_location.y+y][place_location.x+x] = tilesprops.type

                        objects[`placed-tile${place_location.x+x}x${place_location.y+y}`] = {
                            x: (place_location.x+x)*50,
                            y: (place_location.y+y)*50,
                            width: 50,
                            height: 50,
                            background: tiles[tilesprops.type].background
                        }
                    }
                }
            }

            tilesprops.can_place = false
            tilesprops.deck[tilesprops.deck.indexOf(tilesprops.type)] = 0

            const run_functions = [
                check_full,
                update_score,
                generate_tiles,
            ]
            
            for (func of run_functions) {
                func()
            }

            if (check_moves() == 0) {
                document.querySelector("#end").style.display = "block"
            }
        } else {
            Object.assign(objects[tilesprops.focused], {
                x: objects[tilesprops.focused].default_x,
                y: objects[tilesprops.focused].default_y,
                width: tiles[tilesprops.type].map[0].length*30,
                height: tiles[tilesprops.type].map.length*30,
                top: false
            })
        }
        tilesprops.focused = ""
    }
})