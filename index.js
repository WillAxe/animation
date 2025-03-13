const canvas = document.querySelector("#drawingBoard")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
});

let ballColor = 0
let squareColor = 50
let textColor = 25

//Create the balls that we later call on
function createBall(xPos, yPos) {
    return {
        r: Math.random() * 100,
        x: xPos,
        y: yPos,
        vx: Math.random() * 10 - 5,
        vy: Math.random() * 10 - 5,
        color: "hsl(" + ballColor + ",100%,50%)",
    }
}

//Cretes the squares
function createSquare(xPos, yPos) {
    return {
        w: Math.random() * 150,
        x: xPos,
        y: yPos,
        vx: Math.random() * 10 - 5,
        vy: Math.random() * 10 - 5,
        color: "hsl(" + squareColor + ",100%,50%)",
    }
}

function createText(key){
  return{
    text: key,
    w: Math.random()* 60,
    h: Math.random()* 120,
    vx: Math.random()* 10 - 5, 
    vy: Math.random()* 10 - 5,
  color: "hsl(" + textColor + ",100%, 20%)"
}
}

//Update the balls so that they shrink
function updateBall(ball) {
    ball.x += ball.vx
    ball.y += ball.vy
    ball.r -= 0.1
}

function updateSquare(square) {
    square.x += square.vx
    square.y += square.vy
    square.w -= 0.1
}

function updateText(text){
  text.w -= 0.1
  text.h -= 0.2
  text.x += text.vx
  text.y += text.vy
}


function drawBall(ball) {
    ctx.fillStyle = ball.color
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
    ctx.fill()
}

function drawSquare(square) {
    ctx.fillStyle = square.color; // Fix order of fillStyle and fillRect
    ctx.fillRect(square.x, square.y, square.w, square.w)
}

function drawText(text){
  ctx.fillStyle = text.color
  ctx.font = "40px Arial"
  ctx.fillText(text.text, 400, 500)
} 



// create the line and drawing it between the balls
function drawLineCircle(x1, y1, x2, y2, color, lw) {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = lw
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}

//create the line and drawing it between squares
function drawLineSquare(x1, y1, x2, y2, color, lw){
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = lw
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

// Draw lines between the balls
function drawLinesCircles() {
    for (let b1 = 0; b1 < balls.length; b1++) {
        for (let b2 = b1 + 1; b2 < balls.length; b2++) {
            const dx = balls[b1].x - balls[b2].x;
            const dy = balls[b1].y - balls[b2].y;
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 100) {
                drawLineCircle(balls[b1].x, balls[b1].y, balls[b2].x, balls[b2].y, balls[b1].color, 2)
            }
        }
    }
}

// Draw lines bewteen the squares
function drawLinesSquares(){
  for(let s1 = 0; s1 < squares.length; s1++){
    for(let s2 = s1 + 1; s2 < squares.length; s2++){
      const dx = squares[s1].x - squares[s2].x
      const dy = squares[s1].y - squares[s2].y
      const distance = Math.sqrt(dx*dx + dy*dy)
      if(distance < 200){
        drawLineSquare(squares[s1].x, squares[s1].y, squares[s2].x, squares[s2].y, squares[s1].color, 2)
      }

    }
  }
}

console.log(drawLinesSquares)

let balls = []
let squares = []
let texts = []

window.addEventListener("mousemove", handleMove)
window.addEventListener("click", handleClick)
window.addEventListener("keydown", onKeyDown)

function onKeyDown(event){
  texts.push(createText(event.key))
 
}

function handleMove(event) {
  balls.push(createBall(event.x, event.y))
}

function handleClick(event) {
  squares.push(createSquare(event.x, event.y))
}

function animate() {
  ctx.fillStyle = "rgba(255,255,255,0.8)"; // Removes the color behind the squares and balls
  ballColor++
  squareColor++
  textColor++
  ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < balls.length; i++) {
        updateBall(balls[i]);
    }
    balls = balls.filter(function (ball) { return ball.r > 0 })
    for (let i = 0; i < balls.length; i++) {
        drawBall(balls[i])
    }

    for (let i = 0; i < squares.length; i++) {
        updateSquare(squares[i])
    }
    squares = squares.filter(function (square) { return square.w > 0 })
    for (let i = 0; i < squares.length; i++) {
        drawSquare(squares[i])
    }

    for(let i = 0; i < texts.length; i++){
      updateText(texts[i])
    }
    texts = texts.filter(function (text){return text.w > 0, text.h > 0})
    for(let i = 0; i < texts.length; i ++){
      drawText(texts[i])
    }

     drawLinesSquares() 
     drawLinesCircles() // Draw connecting lines between balls

  requestAnimationFrame(animate)
}

animate()


