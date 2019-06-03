window.onload = function () {
    canv = document.getElementById("gameCanvas");
    ctx = canv.getContext("2d");

    document.addEventListener("keydown", keyPush);

    mapping.forEach(function(element){
        document.getElementById(element.name).addEventListener('click',function(){
            keyPush(element);
        });
    });

    setInterval(game, 100);
}

var mapping = [{
        name: 'up',
        keyCode: 38
    },
    {
        name: 'left',
        keyCode: 37
    },
    {
        name: 'right',
        keyCode: 39
    },
    {
        name: 'down',
        keyCode: 40
    }
]

/* 플레이어 포지션 */
var playerX = 10;
var playerY = 10;

/* 타겟 포지션 */
var targetX = 10;
var targetY = 10;

/* 키를 누른 방향
 * directionX - 왼쪽(-1) 오른쪽(1)
 * directionY - 위쪽(-1) 아래쪽(1) */
var directionX = 0;
var directionY = 0;

var size = 20;

var trail = [];
var tail = 5; //첫 시작 길이
var start = true;

function game() {
    // 플레이어 포지션에 매초 방향을 더해 위치를 변경.
    playerX += directionX;
    playerY += directionY;

    /* 벽을 벗어날 때 위치 재조정*/
    if (playerX < 0) {
        playerX = size - 1;
    }
    if (playerX > size - 1) {
        playerX = 0;
    }
    if (playerY < 0) {
        playerY = size - 1;
    }
    if (playerY > size - 1) {
        playerY = 0;
    }

    /* 캔버스(게임판) 위치와 크기 */
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    /* 플레이어(뱀) */
    ctx.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        // i=0 일때 꼬리, length-1일때 머리
        ctx.fillRect(trail[i].x * size, trail[i].y * size, size - 2, size - 2);

        /* 플레이어 머리가 trail 어딘가에 닿는다면 패배 */
        if (trail[i].x == playerX && trail[i].y == playerY) {
            tail = 5;
            if (!start) {
                alert("you Die");
            }
        } else {
            start = false;
        }
    }

    /* 플레이어의 현재위치를 밀어넣고 */
    trail.push({
        x: playerX,
        y: playerY
    });
    /* 움직일때마다 변경되기 전 삭제 */
    while (trail.length > tail) {
        trail.shift();
    }

    /* 타겟과 플레이어 위치가 일치하면 */
    if (targetX == playerX && targetY == playerY) {
        tail++;
        targetX = Math.floor(Math.random() * size);
        targetY = Math.floor(Math.random() * size);
    }

    /* 타겟 */
    ctx.fillStyle = "red";
    ctx.fillRect(targetX * size, targetY * size, size - 2, size - 2);
}

/* 방향키 누름 */
function keyPush(evt) {
    var key = evt.keyCode;

    if (key == 37 && directionX != 1) {
        // ← left, 오른쪽 진행시 무시
        directionX = -1;
        directionY = 0;
    }
    if (key == 38 && directionY != 1) {
        // ↑ up, 아래 진행시 무시
        directionX = 0;
        directionY = -1;
    }
    if (key == 39 && directionX != -1) {
        // → right, 왼쪽 진행시 무시
        directionX = 1;
        directionY = 0;
    }
    if (key == 40 && directionY != -1) {
        // ↓ down, 위쪽 진행시 무시
        directionX = 0;
        directionY = 1;
    }
}