const reset_buttons = [
    "#reset-btn",
    "#tryagain-btn"
]

reset_buttons.forEach((btn) => {
    document.querySelector(btn).onclick = () => {
        map = []
        for (i=0;i<map_size;i++) {
            map.push([])
            for (j=0;j<map_size;j++) {
                map[i].push(0)
            }
        }

        objects = filter_object(objects, (object) => {
            return !object[0].includes("tile")
        })

        score = 0
        end = false
        tilesprops.deck = [0,0,0]

        update_score()
        generate_tiles()

        document.querySelector("#end").style.display = "none"
        document.querySelector("#reset-btn").classList.remove("inactive")
    }
})