var jet = document.getElementById("jet");
var board = document.getElementById("board");


window.addEventListener("keydown", (e) => {
    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if(e.key == "ArrowLeft" && left > 0){
        jet.style.left = left - 10 + "px";
    }
    // 460 = Board width minus Jet width
    else if (e.key == "ArrowRight" && left <= 460) {
        
        jet.style.left = left + 10 + "px";
    }

    if(e.key == "ArrowUp" || e.keyCode == 32){
        var bullet = document.createElement("div");
        bullet.classList.add("bullets");
        board.appendChild(bullet);

        var movebullet = setInterval(() => {
            var rocks = document.getElementsByClassName("rocks");
            for (var i = 0; i < rocks.length; i++){
                var rock = rocks[i];

                var rockbound = rock.getBoundingClientRect();
                var bulletbound = bullet.getBoundingClientRect();

                // Condition to check whether the rock/alien and the bullet are at the same position
                // If so, then we have to destroy that rock

                if(bulletbound.left >= rockbound.left &&
                   bulletbound.right <= rockbound.right && 
                   bulletbound.top <= rockbound.top &&
                   bulletbound.bottom <= rockbound.bottom) {
                       rock.parentElement.removeChild(rock); // Removes that particular rock
                        //Score Board
                       document.getElementById("points").innerHTML = 
                       parseInt(document.getElementById("points").innerHTML) + 1;
                   }
            }

            var bulletbottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));

            // Stops the bullet from moving outside the gamebox
            if(bulletbottom >= 500) {
                clearInterval(movebullet);
            }

            bullet.style.left = left + "px"; // Bullet should always be at the top of the jet
            bullet.style.bottom = bulletbottom + 3 + "px";

        }, 50);
    }
});

var generaterocks = setInterval(() => {
    
    var rock = document.createElement("div");
    rock.classList.add("rocks");
    // Get the left of the rock to place it in random position
    var rockleft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));
    // Generate value between 0 & 460 where 460 = board width minus rock width
    rock.style.left = Math.floor(Math.random() * 450) + "px";
    board.appendChild(rock);

}, 1500);

var moverocks = setInterval(() => {
    var rocks = document.getElementsByClassName("rocks");

    if(rocks!=undefined) {
        for(var i = 0; i < rocks.length; i++){
            var rock = rocks[i]; // Getting each rock
            //Now must increase the top of each rock so that the rocks can move downwards..
            var rocktop = parseInt(window.getComputedStyle(rock).getPropertyValue("top"));

            //475 = boardheight minus rockheight + 25
            if(rocktop >= 475) {
                alert("Game Over");
                clearInterval(moverocks);
                window.location.reload();
            }

            rock.style.top = rocktop + 25 + "px";
        }
    }
}, 450);