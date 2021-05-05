// loading images
const create_image = (id,source) => {
    const image = document.createElement("IMG")
    image.src = source
    image.id = id
    document.querySelector("#images").appendChild(image)
}

const put_images = () => {
    document.querySelector("#images").innerHTML = ""

    for (object in objects) {
        if (objects[object]["source"] !== undefined) {
            const { source } = objects[object]
            create_image(object,source)
        }
    }
}
put_images()

// object rendering
const render_image = (x,y,width,height,id,opacity = 1) => {
    const img = document.querySelector(`#${id}`)
    if (img.complete) {
        context.globalAlpha = opacity
        context.drawImage(img,x,y,width,height)
    }
}

const render_rectangle = (x,y,width,height,color,opacity = 1) => {
    context.globalAlpha = opacity
    context.fillStyle = color
    context.fillRect(x,y,width,height)
}

// object manipulation
const filter_object = (id,filter) => {
    return Object.fromEntries(Object.entries(id).filter(filter))
}

const delete_object = (id) => {
    objects = filter_object(objects, (object) => object[0] != id)
}

const new_object = (object) => {
    if (typeof object === 'object' && object !== null) {
        for (key of Object.keys(object)) {
            objects[key] = object[key]
            if (object[key].source !== undefined) {
                put_images()
            }
        }
    }
}