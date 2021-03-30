
const firePixels = []
const fireHeight = 40
const fireWidth = 40    
const fireColors = [
    // { "r": 7, "g": 7, "b": 7 },
    // { "r": 31, "g": 7, "b": 7 },
    // { "r": 47, "g": 15, "b": 7 },
    // { "r": 71, "g": 15, "b": 7 },
    // { "r": 87, "g": 23, "b": 7 },
    // { "r": 103, "g": 31, "b": 7 },
    // { "r": 119, "g": 31, "b": 7 },
    // { "r": 143, "g": 39, "b": 7 },
    // { "r": 159, "g": 47, "b": 7 },
    // { "r": 175, "g": 63, "b": 7 },
    // { "r": 191, "g": 71, "b": 7 },
    // { "r": 199, "g": 71, "b": 7 },
    // { "r": 223, "g": 79, "b": 7 },
    // { "r": 223, "g": 87, "b": 7 },
    // { "r": 223, "g": 87, "b": 7 },
    // { "r": 215, "g": 95, "b": 7 },
    // { "r": 215, "g": 95, "b": 7 },
    // { "r": 215, "g": 103, "b": 15 },
    // { "r": 207, "g": 111, "b": 15 },
    // { "r": 207, "g": 119, "b": 15 },
    // { "r": 207, "g": 127, "b": 15 },
    // { "r": 207, "g": 135, "b": 23 },
    // { "r": 199, "g": 135, "b": 23 },
    // { "r": 199, "g": 143, "b": 23 },
    // { "r": 199, "g": 151, "b": 31 },
    // { "r": 191, "g": 159, "b": 31 },
    // { "r": 191, "g": 159, "b": 31 },
    // { "r": 191, "g": 167, "b": 39 },
    // { "r": 191, "g": 167, "b": 39 },
    // { "r": 191, "g": 175, "b": 47 },
    // { "r": 183, "g": 175, "b": 47 },
    // { "r": 183, "g": 183, "b": 47 },
    // { "r": 183, "g": 183, "b": 55 },
    // { "r": 207, "g": 207, "b": 111 },
    // { "r": 223, "g": 223, "b": 159 },
    // { "r": 239, "g": 239, "b": 199 },
    // { "r": 255, "g": 255, "b": 255 }

    { "r": 7, "g": 7, "b": 7 },
    { "r": 7, "g": 7, "b": 31 },
    { "r": 7, "g": 15, "b": 47 },
    { "r": 7, "g": 15, "b": 71 },
    { "r": 7, "g": 23, "b": 87 },
    { "r": 7, "g": 31, "b": 103 },
    { "r": 7, "g": 31, "b": 119 },
    { "r": 7, "g": 39, "b": 143 },
    { "r": 7, "g": 47, "b": 159 },
    { "r": 7, "g": 63, "b": 175 },
    { "r": 7, "g": 71, "b": 191 },
    { "r": 7, "g": 71, "b": 199 },
    { "r": 7, "g": 79, "b": 223 },
    { "r": 7, "g": 87, "b": 223 },
    { "r": 7, "g": 87, "b": 223 },
    { "r": 7, "g": 95, "b": 215 },
    { "r": 7, "g": 95, "b": 215 },
    { "r": 15, "g": 103, "b": 215 },
    { "r": 15, "g": 111, "b": 207 },
    { "r": 15, "g": 119, "b": 207 },
    { "r": 15, "g": 127, "b": 207 },//15
    { "r": 23, "g": 135, "b": 207 },
    { "r": 23, "g": 135, "b": 199 },
    { "r": 23, "g": 143, "b": 199 },//23
    { "r": 31, "g": 151, "b": 199 },
    { "r": 31, "g": 159, "b": 191 },
    { "r": 31, "g": 159, "b": 191 },//31
    { "r": 39, "g": 167, "b": 191 },
    { "r": 39, "g": 167, "b": 191 },//39
    { "r": 39, "g": 175, "b": 191 },
    { "r": 47, "g": 175, "b": 183 },
    { "r": 47, "g": 183, "b": 183 },//47
    { "r": 55, "g": 183, "b": 183 },
    { "r": 111, "g": 207, "b": 207 },
    { "r": 159, "g": 223, "b": 223 },
    { "r": 199, "g": 239, "b": 239 },
    { "r": 255, "g": 255, "b": 255 }
];

const debug = false


function startFire() {
    createPixelsStructure()
    createFireColorGradient()
    render()

    setInterval(calculateFirePixelsPropagation, 50)
}

function createPixelsStructure() {
    const numberOfPixels = fireHeight * fireWidth

    for (let i = 0; i < numberOfPixels; i++) {
        firePixels[i] = 0;
    }

    console.log(firePixels);
}

function createFireColorGradient () {
    for (let column = 0; column < fireWidth; column++) {
        const overFlowPixelIndex = fireWidth * fireHeight;
        const pixelIndex = ( overFlowPixelIndex - fireWidth ) + column
        
        firePixels[pixelIndex] = 36
    }
}

function calculateFirePixelsPropagation() {
 
    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) {
            const pixelIndex = column + ( fireWidth * row )
            updateFireIntensityInPixel(pixelIndex)
        }
    }
    render()
}

function updateFireIntensityInPixel(currentPixelIndex) {
    const belowPixelIndex = currentPixelIndex + fireWidth
    const windIncrement= 2.8

    if (belowPixelIndex >= fireWidth * fireHeight) {
        return
    }

    const decay = Math.floor(Math.random() * windIncrement)
    const belowPixelFireIntensity = firePixels[ belowPixelIndex ]
    const newFireIntensity =
        (belowPixelFireIntensity - decay >= 0) ? belowPixelFireIntensity - decay : 0


    firePixels[currentPixelIndex - decay] = newFireIntensity
}

function render() {
    const content = document.getElementById('main-content')
    let render = "<table cellpadding=0 cellspacing=0>"
    
    for (let row = 0; row < fireHeight; row++) {        
        render += "<tr>"
        for (let column = 0; column < fireWidth; column++) {
            const pixelIndex = column + ( fireWidth * row )
            const fireIntensity = firePixels[pixelIndex]

            if (debug === true) {
                
                render += "<td>"
                render += `<div class = "pixel-index">${ pixelIndex }</div>`
                render += fireIntensity
                render += "</td>"
                
            } else {
                const color = fireColors[ fireIntensity ]
                const colorString = `${ color.r },${ color.g },${ color.b }`
                render += `<td class = "pixel" style = "background-color: rgb(${colorString});">`
                render += '</td>'
            }
        }
        render += "</tr>"
    }

    render += "</table>"

    content.innerHTML = render
}

startFire()