const reset_buttons = [
    "#reset-btn",
    "#tryagain-btn"
]

reset_buttons.forEach((btn) => {
    document.querySelector(btn).onclick = () => {
        if (animation_done("tile") && animation_done("decktile")) {
            map_loop(() => {
                map[y][x] = 0
            })

            objects = filter_object(objects, (object) => {
                return !object[0].includes("tile")
            })

            score = 0
            end = false
            tilesprops.deck = [0,0,0]
            Object.keys(bonuses.uses).forEach((bonus) => {
                bonuses.uses[bonus] = 0
            })

            update_score()
            generate_tiles()

            document.querySelector("#end").style.display = "none"
            document.querySelector("#reset-btn").classList.remove("inactive")
        }
    }
})

Object.keys(bonuses.total).forEach((bonus) => {
    document.querySelector(`#${bonus}-btn`).addEventListener("click", () => {
        if (bonuses.total[bonus] > bonuses.uses[bonus]) {
            bonuses.uses[bonus] += 1
            tilesprops.deck = [0,0,0]
            
            objects = filter_object(objects, (object) => {
                return !(object[0].includes("tile") && !object[0].includes("placed"))
            })

            generate_tiles()
        }
        update_bonuses()
    })
})