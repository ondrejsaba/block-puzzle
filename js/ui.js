let reset_dialogue = false

const reset_buttons = [
    "#tryagain-btn",
    "#reset-confirm-btn"
]

// buttons that reset the game upon clicking
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
            localStorage.removeItem("save")

            update_score()
            generate_tiles()

            document.querySelector("#dialog").style.display = "none"
            document.querySelector("#end-box").style.display = "none"
            for (classname of ["inactive","close"]) {
                document.querySelector("#reset-btn").classList.remove(classname)
            }

            reset_dialogue = false
        }
    }
})

// reset dialogue
for (btn of ["#reset-btn","#reset-cancel-btn"]) {
    document.querySelector(btn).onclick = () => {
        if (!end) {
            document.querySelector("#end-box").style.display = "none"
            for (id of ["#dialog","#reset-box"]) {
                document.querySelector(id).style.display = reset_dialogue ? "none" : "block"
            }
            document.querySelector("#reset-btn").classList.toggle("close")
            reset_dialogue = !reset_dialogue
        }
    }
}

Object.keys(bonuses.total).forEach((bonus) => {
    document.querySelector(`#${bonus}-btn`).addEventListener("click", () => {
        if (bonuses.total[bonus] > bonuses.uses[bonus] && !end) {
            bonuses.uses[bonus] += 1
            tilesprops.deck = [0,0,0]
            
            objects = filter_object(objects, (object) => {
                return !(object[0].includes("tile") && !object[0].includes("placed"))
            })

            generate_tiles()
        }
        update_bonuses()
        set_save()
    })
})