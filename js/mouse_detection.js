let cursor = {
    x: 0,
    y: 0
}

let hover = {
    id: 0,
    name: ""
}

let listeners = {
    mousemove: (e) => {
        cursor = {
            x: Math.round((canvas.width-window.innerWidth)/2+(e.clientX)),
            y: Math.round((canvas.height-window.innerHeight-document.querySelector("#main-infobar").offsetHeight)/2+(e.clientY))
        }
    
        let objects_hover = []
        const visible_objects = filter_object(objects, (object) => objects[object[0]].hide != true)

        for (object in visible_objects) {
            const { x, y, width, height } = objects[object]
    
            if (x < cursor.x && cursor.x < x+width && y < cursor.y && cursor.y < y+height) {
                objects_hover.push(Object.keys(objects).indexOf(object))
                hover = {
                    id: Math.max(...objects_hover),
                    name: Object.keys(objects)[Math.max(...objects_hover)]
                }
            }
        }
    }
}

const actions = [
    "mousedown",
    "mouseup"
]

actions.forEach((action) => {
    listeners[action] = (e) => {
        if (objects[hover.name].hasOwnProperty(action)) {
            objects[hover.name][action]()
        }
    }
})

Object.keys(listeners).forEach((listener) => {
    canvas.addEventListener(listener, (e) => {
        listeners[listener](e)
    })
})