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
const render_image = (x,y,width,height,id) => {
    const img = document.querySelector(`#${id}`)
    if (img.complete) {
        context.drawImage(img,x,y,width,height)
    }
}

const render_rectangle = (x,y,width,height,color) => {
    context.fillStyle = color
    context.fillRect(x,y,width,height)
}

// object manipulation
const delete_object = (id) => {
    objects = Object.fromEntries(Object.entries(objects).filter((object) => object[0] != id))
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