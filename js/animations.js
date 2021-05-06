let animations = {
    tile: {
        stack: [],
        duration: 0.2,
        fps: 60,

        from: {
            opacity: 1
        },
        to: {
            opacity: 0
        },

        after: (object) => {
            let {x, y} = objects[object]
            x /= 50
            y /= 50
            map[y][x] = 0
            delete_object(object)
        }
    },

    decktile: {
        stack: [],
        duration: 0.25,
        fps: 60,

        from: {
            opacity: 0,
            scale: 0
        },
        to: {
            opacity: 1,
            scale: 1
        },

        after: () => {}
    }
}