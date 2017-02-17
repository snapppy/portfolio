var ctx, width, height, keystate;

//key codes

var KEY_UP=38, KEY_DOWN = 40;

window.onload = function() {
    canvas = document.getElementById("canvas");
    width = 800;
    height = 600;
    ctx = canvas.getContext("2d")
    canvas.width = width;
    canvas.height = height;
    keystate = {};

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;
    }

    document.addEventListener("keydown", function(evt) {
        keystate[evt.keyCode] = true;
    });

    document.addEventListener("keyup", function(evt) {
        delete keystate[evt.keyCode];
    });

    setInterval(update, 35);
}

function update() {
    draw();
    if (keystate[KEY_UP]) {
        player1.yLocation-=10;
    } else if (keystate[KEY_DOWN]) {
        player1.yLocation+=10;
    }

    ball.move();
    computerPlayer.move();
    handleCollisions();
}

function draw() {

    //draw field
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, width, height);


    //draw player 1
    ctx.fillStyle = "white";
    ctx.fillRect(player1.xLocation, player1.yLocation, 40, 200);

    //draw computerPlayer
    ctx.fillStyle = "white";
    ctx.fillRect(computerPlayer.xLocation, computerPlayer.yLocation, 40, 200);

    //draw the ball
    ctx.beginPath();
    ctx.arc(ball.xLocation, ball.yLocation, 15, 0, 2* Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

}


//an object literal for player1 paddle
var player1 = {
    xLocation: 720,
    yLocation: 200
}

//an object literal for the comp player
var computerPlayer = {
    xLocation: 40,
    yLocation: 200,

    move: function() {
        //track ball location and follow
        if (ball.yLocation > this.yLocation) {
            this.yLocation +=5;
        } else if (ball.yLocation < this.yLocation) {
            this.yLocation -= 5;
        }
    }
}

//an object literal for the ball
var ball = {
    xLocation: 400,
    yLocation: 200,
    dx: 15,
    dy: Math.floor((Math.random() * 5) + 1),
    move: function() {
        this.yLocation += this.dy;
        this.xLocation += this.dx;
    }
}

//handleCollisions
function handleCollisions() {
    //For ball and player1. Get the difference, check to see if it is within a certain parameter.
    /*If the up or down arrow on the keyboard is being pressed, put a sping on the ball in the opposite direction*/
    if (Math.abs(ball.xLocation - player1.xLocation) <= 15 &&
        Math.abs(ball.yLocation - (player1.yLocation + 100)) <= 100){
        ball.dx *= -1;
        if (keystate[KEY_UP]) {
            ball.dy *= Math.floor((Math.random() * 5) + 1);
        } else if (keystate[KEY_DOWN]) {
            ball.dy *= -Math.floor((Math.random() * 5) + 1);
        }
    }

    //handle compPlayer collisions
    if (Math.abs(ball.xLocation - computerPlayer.xLocation) <= 15 &&
        Math.abs(ball.yLocation - (computerPlayer.yLocation + 100)) <= 100){
        ball.dx *= -1;
        if (keystate[KEY_UP]) {
            ball.dy *= Math.floor((Math.random() * 5) - 2);
        } else if (keystate[KEY_DOWN]) {
            ball.dy *= -Math.floor((Math.random() * 5) - 2);
        }
    }

    //handle border collisions
    if (ball.yLocation > 580 || ball.yLocation < 20) {
        if(Math.abs(ball.dy) > 10) {
            if (ball.dy < 0) {
                ball.dy == -10;
            }
            ball.dy *= 0.9;
            console.log("Speed greater than 10! Lower: " + ball.dy);
        }
        ball.dy *= -Math.floor((Math.random() * 2) + 1);
    }

}



