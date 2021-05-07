# pixel-fire-animation
Pixel fire animation (DOOM fire) with js in blue scale.

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="/style.css"> -->
    <style>
        * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main-container {
  display: flex;
  height: 100vh;
  justify-content: center;
}

.main-content {
  align-self: center;
  height: fit-content;
  width: fit-content;
}

table {
  border-collapse: collapse;
  border: 1px solid black;
}

table td {
  width: 40px;
  height: 40px;
  border: 1px solid black;
  text-align: center;
  font-family: monospace;
  font-size: 1em;
  position: relative;
}

.pixel-index {
  font-size: 0.5em;
  display: inline-block;
  position: absolute;
  top: 1px;
  right: 1px;
  color: #999;
}

td.pixel {
  width: 10px;
  height: 10px;
  border: 0px;
}

    </style>
    <title>Pixel Fire</title>
</head>
<body>
    <div class="main-container">
        <div id="main-content" class="main-content">
            <!-- <script src="/script.js"></script> -->
            <script>
                
const firePixels = []
const fireHeight = 40
const fireWidth = 40    
const fireColors = [
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
            </script>
        </div>
    </div>
</body>
</html>
