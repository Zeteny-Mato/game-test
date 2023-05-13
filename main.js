var player = { x: 900, y: 100, size: 40, xSpeed: 5, ySpeed: 0, iFrames: 0, health: 5 };

let bullet = [];

let cooldown = 0;

let score = 0

let bulletCooldown = 0;

let zombies = [];

let playerImage = "./images/player-right.png"

function gun() {
    if (mouse.left && bulletCooldown === 0) {
        bullet.push(
            { x: player.x, y: player.y, size: 10, xSpeed: 7 * (mouse.x - player.x) / distance(player, mouse), ySpeed: 7 * (mouse.y - player.y) / distance(player, mouse) }
        )
        bulletCooldown = 25;
    }
    if (bulletCooldown > 0) {
        bulletCooldown--;
    }
}

function update() {
    gun();
    clearScreen()
    if (zombies.length < 10) {
        zombies.push({ x: random(600), y: random(600), health: 5, iFrames: 0 })
    }
    for (i = 0; i < zombies.length; i++) {
        if (zombies[i].iFrames > 0) { zombies[i].iFrames-- }
        for (j = 0; j < bullet.length; j++) {
            if (distance(zombies[i].x, zombies[i].y, bullet[j].x, bullet[j].y) < 50 && zombies[i].iFrames == 0) {
                zombies[i].iFrames = 20
                zombies[i].health--
            }
        }
        if (distance(zombies[i].x, zombies[i].y, player.x, player.y) < 40 && player.iFrames == 0) {
            player.iFrames = 90
            player.health--
        }
        if (zombies[i].x < player.x) { zombies[i].x++ } else { zombies[i].x-- }
        if (zombies[i].y < player.y) { zombies[i].y++ } else { zombies[i].y-- }
        picture(zombies[i].x - 50, zombies[i].y - 50, "./images/zombie.png")
        rectangle(zombies[i].x - 25, zombies[i].y - 50, zombies[i].health * 10, 5, "green")

    }
    for (i = 0; i < zombies.length; i++) {
        if (zombies[i].health == 0) {
            score++
            zombies.splice(i, 1, { x: random(600), y: random(600), health: 5, iFrames: 0 })
        }
    }
    picture(player.x - 50, player.y - 50, playerImage)
    rectangle(player.x - 25, player.y - 50, player.health * 10, 5, "green")
    player.xSpeed = 0
    player.ySpeed = 0
    if (keyboard.w) {
        player.ySpeed -= 5;
    }
    if (keyboard.s) {
        player.ySpeed += 5;
    }
    if (keyboard.a) {
        player.xSpeed -= 5;
        playerImage = "./images/player-left.png"
    }
    if (keyboard.d) {
        player.xSpeed += 5;
        playerImage = "./images/player-right.png"
    }
    if (keyboard.space && cooldown === 0 && distance(mouse.x, mouse.y, player.x, player.y) < 300) {
        player.x = mouse.x
        player.y = mouse.y
        cooldown = 150
    }
    if (cooldown > 0) {
        cooldown--;
    }
    if (player.x + player.size / 2 >= innerWidth) {
        player.x = innerWidth - player.size / 2
        player.xSpeed = -1
    } if (player.x - player.size / 2 <= 0) {
        player.x = player.size / 2
        player.xSpeed = 1
    } if (player.y + player.size / 2 >= innerHeight) {
        player.y = innerHeight - player.size / 2
        player.ySpeed = -1
    } if (player.y - player.size / 2 <= 0) {
        player.y = player.size / 2
        player.ySpeed = 1
    }

    for (var i = 0; i < bullet.length; i++) {
        rectangle(bullet[i].x, bullet[i].y, bullet[i].size, bullet[i].size, "red")
        bullet[i].x += bullet[i].xSpeed;
        bullet[i].y += bullet[i].ySpeed;
    }

    if (player.iFrames > 0) {
        player.iFrames--
    }

    if (player.health == 0) {
        alert("GAME OVER!")
        stopUpdate()
    }

    player.x += player.xSpeed;
    player.y += player.ySpeed;

    text(10, 50, 14, `dash cooldown: ${Math.round(cooldown / 30)}s`, "blue")
    text(10, 20, 14, `score: ${score}`)
}