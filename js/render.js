const render_objects = (objects) => {
    for (object in objects) {
        const { x, y, width, height } = objects[object]
        if (objects[object]["hide"] === undefined || objects[object]["hide"] == false) {
            if (objects[object]["source"] !== undefined) {
                render_image(x,y,width,height,object)
            } else {
                const { background } = objects[object]
                render_rectangle(x,y,width,height,background)
            }
        }
    }
}

const render_canvas = () => {
    const priority_divide = {
        usual: Object.fromEntries(Object.entries(objects).filter((object) => objects[object[0]].top != true)),
        top: Object.fromEntries(Object.entries(objects).filter((object) => objects[object[0]].top == true))
    }
    for (type of Object.keys(priority_divide)) {
        render_objects(priority_divide[type])
    }
    window.requestAnimationFrame(render_canvas)
}

window.requestAnimationFrame(render_canvas)