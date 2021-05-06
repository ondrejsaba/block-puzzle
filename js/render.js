const render_objects = (objects) => {
    for (object in objects) {
        const { x, y, width, height, background, opacity, scale } = objects[object]
        if (objects[object].hide != true) {
            if (objects[object].hasOwnProperty("source")) {
                render_image(x, y, width, height, object, opacity, scale)
            } else {
                render_rectangle(x, y, width, height, background, opacity, scale)
            }
        }
    }
}

const render_canvas = () => {
    const priority_divide = {
        usual: filter_object(objects, (object) => objects[object[0]].top != true),
        top: filter_object(objects, (object) => objects[object[0]].top == true)
    }
    for (type of Object.keys(priority_divide)) {
        render_objects(priority_divide[type])
    }
    window.requestAnimationFrame(render_canvas)
}

window.requestAnimationFrame(render_canvas)