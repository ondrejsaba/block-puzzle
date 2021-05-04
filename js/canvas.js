const canvas = document.querySelector("#render_canvas")
const context = canvas.getContext("2d")

let canvas_size = {
    width: 400,
    height: 550
}
canvas.width = canvas_size.width
canvas.height = canvas_size.height