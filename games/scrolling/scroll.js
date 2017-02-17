//speed up as game goes on?

var ctx, width, height, keystate;

//key codes
var KEY_UP=38, KEY_DOWN = 40, SPACE = 32;

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

    if (player.isAlive()) {
        draw();
        obstacle.move();
        handleInput();
        player.update();
        handleCollisions();
    }

    //start doing stuff with the second obstacle
    if (player.isAlive() && player.score > 50) {
        obstacle2.move();
    }

    if (player.isAlive() && player.score > 100) {
        obstacle3.move();
    }
}

function draw() {

    //draw background
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, width, height);

    //draw the ground
    ctx.fillStyle = "black";
    ctx.fillRect(0, 400, 600, 50);

    //draw the obstacle
    ctx.fillStyle = "black";
    ctx.fillRect(obstacle.x, obstacle.y, 20, obstacle.height);

    //draw the player
    ctx.fillStyle = "black";
    ctx.fillRect(player.x, player.y, 20, 35);

    //draw the score
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("SCORE: " + player.score, 50, canvas.height-400);

    //start drawing the second obstacle if the player is leveling up
    if (player.score > 50) {
        ctx.fillStyle = "black";
        ctx.fillRect(obstacle2.x, obstacle2.y, 20, obstacle2.height);
    }

    //start drawing the second obstacle if the player is leveling up
    if (player.score > 100) {
        ctx.fillStyle = "black";
        ctx.fillRect(obstacle3.x, obstacle3.y, 20, obstacle3.height);
    }

}

var obstacle = {
    x: 580,
    y: 365,
    height: 35,
    move: function() {
        if (this.x < -20) {
            this.reset();
        } else {
            if (player.score > 50) {
                this.x -= 7;
            } else if (player.score > 100) {
                this.x -= 9;
            } else {
                this.x -= 5;
            }
        }
    },
    reset: function() {
        //a little bit random timing
        if ((Math.floor(Math.random() * 50) + 1) === 5) {
            this.x = 580;
        }
        //vary the height of the obstacle
        this.height = (Math.floor(Math.random() * 50) + 35)
        //one in three times just be normal, else be random
        if ((Math.floor(Math.random() * 3) + 1) == 3) {
            this.y = 365;
        } else {
            this.y = 365 - (Math.floor(Math.random() * 30) + 5);
        }

    }
}

var obstacle2 = {
    x: 580,
    y: 365,
    height: 35,
    move: function() {
        if (this.x < -20) {
            this.reset();
        } else {
            if (player.score > 50) {
                this.x -= 7;
            } else if (player.score > 100) {
                this.x -= 9;
            } else {
                this.x -= 5;
            }
        }
    },
    reset: function() {
        //a little bit random timing
        if ((Math.floor(Math.random() * 50) + 1) === 5) {
            this.x = 580;
        }
        //vary the height of the obstacle
        this.height = (Math.floor(Math.random() * 50) + 35)
        //one in three times just be normal, else be random
        if ((Math.floor(Math.random() * 3) + 1) == 3) {
            this.y = 365;
        } else {
            this.y = 365 - (Math.floor(Math.random() * 30) + 5);
        }

    }
}

var obstacle3 = {
    x: 580,
    y: 365,
    height: 35,
    move: function() {
        if (this.x < -20) {
            this.reset();
        } else {
            if (player.score > 50) {
                this.x -= 7;
            } else if (player.score > 100) {
                this.x -= 9;
            } else {
                this.x -= 5;
            }
        }
    },
    reset: function() {
        //a little bit random timing
        if ((Math.floor(Math.random() * 50) + 1) === 5) {
            this.x = 580;
        }
        //vary the height of the obstacle
        this.height = (Math.floor(Math.random() * 50) + 35)
        //one in three times just be normal, else be random
        if ((Math.floor(Math.random() * 3) + 1) == 3) {
            this.y = 365;
        } else {
            this.y = 365 - (Math.floor(Math.random() * 30) + 5);
        }

    }
}

var player = {
    x: 200,
    y: 365,
    dy: 0,
    animationFrame: 0,
    jumpFall: -15,
    gravity: 1,
    alive: true,
    score: 0,

    setAlive: function(alive) {
        this.alive = alive;
    },

    isAlive: function() {
        return this.alive;
    },

    update: function() {
        this.animationFrame++;
        this.dy += this.gravity;
        this.y += this.dy;

        //keep it on the ground
        if (this.y > 365) {
            this.y = 365;
            this.dy = 0;
        }

        //add score
        if (this.animationFrame % 10 == 0) {
            this.score++;
        }
    },

    jump: function() {
        this.dy += this.jumpFall;
        console.log("jump");
        console.log(this.dy);
    }
}

function handleInput() {
    if (keystate[SPACE]) {
        //if the player is on the ground. No double jumping!
        if (player.y === 365) {
            player.jump();
            console.log("space!");
        }
    }
}

function handleCollisions() {
    //player vs object
    //35 is the height of the player, b/c player is drawn from top left.
    if (Math.abs(player.x - obstacle.x) < 10 &&
       Math.abs(player.y - obstacle.y) < 35) {
        player.setAlive(false);
        //game over message
        ctx.font = "30px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("GAME OVER", 200, canvas.height-350);
        //highscore
        ctx.font = "22px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("HIGHSCORE: " + player.score, 200, canvas.height-320);
    }

    //player vs object2
    //35 is the height of the player, b/c player is drawn from top left.
    if (player.score > 50) {
        if (Math.abs(player.x - obstacle2.x) < 10 &&
            Math.abs(player.y - obstacle2.y) < 35) {
            player.setAlive(false);
            //game over message
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText("GAME OVER", 200, canvas.height-350);
            //highscore
            ctx.font = "22px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText("HIGHSCORE: " + player.score, 200, canvas.height-320);
        }
    }

    if (player.score > 100) {
        if (Math.abs(player.x - obstacle3.x) < 10 &&
            Math.abs(player.y - obstacle3.y) < 35) {
            player.setAlive(false);
            //game over message
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText("GAME OVER", 200, canvas.height-350);
            //highscore
            ctx.font = "22px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText("HIGHSCORE: " + player.score, 200, canvas.height-320);
        }
    }
}
