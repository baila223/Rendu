const canvas = document.querySelector('#canvas')
const scoreSpan = document.querySelector('.score')
const button = document.querySelector('.replay')
let score = 0

const context = canvas.getContext('2d')

const background = new Image()
background.src = 'bg.png'

const foodImg = new Image()
foodImg.src  = 'food.png'

const eatAudio = new Audio()
eatAudio.src = 'eat.mp3'

const deadAudio = new Audio()
deadAudio.src = 'dead.mp3'

const unit = 30

let food = {
    x:Math.floor(Math.random() *19+1)*unit,
    y:Math.floor(Math.random() *19+1)*unit
}

const snake = []
snake[0] = {
    x:10*unit,
    y:10*unit
}

//deplacement avec le clavier
let d
document.addEventListener('keydown', (e)=>{
    if(e.keyCode == 37 && d !="R"){
        d = "L"
    }
    else if(e.keyCode == 38 && d !="D"){
        d = "U"
    }
    else if(e.keyCode == 39 && d !="L"){
        d = "R"
    }
    else if(e.keyCode == 40 && d !="U"){
        d = "D"
    }
})
function collisionBody(head,snake){
    for (let index = 0; index < snake.length; index++) {
        if(head.x == snake[index].x && head.y ==snake[index].y){
            return true
        }
        
    }
    return false
}
function draw(){
    context.drawImage(background,0,0)
    for (let index = 0; index < snake.length; index++) {
        if(index === 0){
            context.fillStyle = "yellow"
        }
        else{
            context.fillStyle = "green"
        }
        context.fillRect(snake[index].x,snake[index].y,unit,unit)
        context.strokeStyle = 'purple'
        context.strokeRect(snake[index].x,snake[index].y,unit,unit)
        
    }

    context.drawImage(foodImg,food.x,food.y)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    

    //mager la pomme
    if(snakeX == food.x && snakeY == food.y){
        food = {
            x:Math.floor(Math.random() *19+1)*unit,
            y:Math.floor(Math.random() *19+1)*unit
        }
        score +=1
        eatAudio.play()
    }
    else{
        snake.pop()
    }


    if(d=="L") snakeX -=unit
    if(d=="U") snakeY -=unit
    if(d=="R") snakeX +=unit
    if(d=="D") snakeY +=unit

    let newHead = {
        x:snakeX,
        y:snakeY
    }
    //les collisions
    if(snakeX<=-unit || snakeX>=canvas.width || snakeY<=-unit || snakeY>=canvas.height ||collisionBody(newHead,snake)){
        clearInterval(play)
        deadAudio.play()
    }
    snake.unshift(newHead)
    scoreSpan.textContent = score

}
const clickButton = () =>{
    window.location.reload() 
}

let play = setInterval(draw,100)