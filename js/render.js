const render_canvas = () => {
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

    window.requestAnimationFrame(render_canvas)
}

window.requestAnimationFrame(render_canvas)