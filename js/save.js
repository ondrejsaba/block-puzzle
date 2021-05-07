const set_save = () => {
    Object.assign(save, {
        load: true,
        score: score,
        deck: [...tilesprops.deck],
        map: map,
        bonuses: bonuses
    })
    localStorage.setItem("save", JSON.stringify(save))
}

const load_save = () => {
    if (save.load) {
        save = {...JSON.parse(localStorage.getItem("save"))}
        save.loaded = false
        score = save.score
        map = save.map
        bonuses = save.bonuses
        update_score()

        map_loop(() => {
            if (map[y][x] != 0) {
                objects[`placed-tile${x}x${y}`] = {
                    x: x*50,
                    y: y*50,
                    width: 50,
                    height: 50,
                    background: tiles[map[y][x]].background,
                    opacity: 1
                }
            }
        })
    }
}

if (localStorage.getItem("save")) {
    load_save()
}

// deck tiles can only be generated after we know
// whether a save exists
generate_tiles()

setInterval(() => {
    animation_done("tile") && !end && tilesprops.total > 3 && set_save()
}, 5000)