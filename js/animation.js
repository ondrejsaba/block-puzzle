const animate = (animation,object) => {
    animations[animation].stack.push(object)
}

const animation_done = (animation) => {
    const stack_length = animations[animation].stack.length
    return stack_length == 0
}

Object.keys(animations).forEach((type) => {
    const animation = animations[type]
    const frames = animation.duration*animation.fps
    setInterval(async () => {
        if (animation.stack.length > 0) {
            Object.keys(animation.from).forEach((property) => {
                const change = Math.abs(animation.from[property]-animation.to[property])/frames
                for (object of animation.stack) {
                    // in case the object doesn't have a property predefined
                    if (!Object.keys(objects[object]).includes(property)) {
                        objects[object][property] = animation.from[property]
                    }

                    if (animation.from[property] >= animation.to[property]) {
                        if (objects[object][property] > animation.to[property]+change) {
                            objects[object][property] -= change
                        } else {
                            animation.stack = animation.stack.filter((o) => o != object)
                            animation.after(object)
                        }
                    } else {
                        if (objects[object][property] < animation.to[property]-change) {
                            objects[object][property] += change
                        } else {
                            animation.stack = animation.stack.filter((o) => o != object)
                            animation.after(object)
                        }
                    }
                }
            })
        }
    }, (animation.duration/frames))
})