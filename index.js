var gamePattern = []
var userPattern = []

$(".btn").click(function(event){
    var userChosen = event.target.id
    playSound(userChosen)
    animatePress(userChosen)
    userPattern.push(userChosen)
    check_answer(userPattern.length-1)
    console.log(userPattern)
})


var level=0
var started = false

$(document).keypress(function(){
    if (!started){
        $("h1").text('Level '+level)
        next_sequence(level)
        started=true
        
    }
})

function check_answer(currentLevel){

    if (userPattern[currentLevel]==gamePattern[currentLevel]){
        console.log('Success')
    }
    else{
        playSound('wrong')
        console.log('Wrong')
        $('body').addClass("game-over")
        setTimeout(function(){
            $('body').removeClass("game-over")
            }, 200)

        $("h1").text('Game Over')
        startOver()

    }
    if (currentLevel+1==level){
        userPattern = []
        setTimeout(function(){
            next_sequence()
        }, 1000)
    }
}

function animatePress(key){
    console.log("#" + key)
    $("#" + key).addClass("pressed")
    setTimeout(function(){
        $("#" + key).removeClass("pressed")
        }, 200)
}

function playSound(key){
    var audio= new Audio("sounds/"+key+".mp3")
    audio.play()
}

function startOver(){
    gamePattern = []
    userPattern = []
    level = 0
    started = false
    $('h1').text('Game Over. Press Any Key to Restart')

}

function next_sequence(){
    var randomNumber=Math.floor(Math.random()*4)
    var colors=['green','red','yellow','blue']
    var chosen= colors[randomNumber]
    gamePattern.push(chosen)
    playSound(chosen)
    $('#'+ chosen).fadeOut(100).fadeIn(100)
    console.log(gamePattern)

    level++
    $("h1").text('Level '+level)
}