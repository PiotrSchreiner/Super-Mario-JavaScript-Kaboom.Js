// initiate Kaboom.js
kaboom({
  global: true,
  fullscreen: true,
  scale: 1.5,
  debug: true,
  clearColor: [0, 0, 0, 0], //dont forget the background ;)
  background: "mario.jpg",
});

// consts & lets
const MOVE_SPEED = 120;
const JUMP_FORCE = 490;
const BIG_JUMP_FORCE = 600;
const ENEMY_SPEED = 20;
const FALL_DEATH = 400;
let isJumping = true;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
//music
const music = new Audio("Sounds/background1.mp3");
music.loop = true;
music.volume = 0.2;

document.addEventListener("mousedown", function () {
  music.play();
});
// Load soundsts
const jumpSound = new Audio("Sounds/jump.mp3");
jumpSound.volume = 0.2;
const coinSound = new Audio("Sounds/coin.mp3");
coinSound.volume = 0.6;
const mushroomSound = new Audio("Sounds/mushroom.mp3");
mushroomSound.volume = 0.9;
const punchSound = new Audio("Sounds/punch.mp3");
punchSound.volume = 0.4;
const pipeSound = new Audio("Sounds/pipe.mp3");

// load sprites/game elements
loadSprite("coin", "sprites/coin.png");
loadSprite("evil-shroom", "sprites/evil-shroom.png");
loadSprite("brick", "sprites/brick.png");
loadSprite("block", "sprites/block.png");
loadSprite("mario", "sprites/mario1.png");
loadSprite("mushroom", "sprites/mushroom.png");
loadSprite("bowser", "sprites/bowser.png");
loadSprite("surprise", "sprites/surprise.png");
loadSprite("unboxed", "sprites/unboxed.png");
loadSprite("pipe-top-left", "sprites/pipe-top-left.png");
loadSprite("pipe-top-right", "sprites/pipe-top-right.png");
loadSprite("pipe-bottom-left", "sprites/pipe-bottom-left.png");
loadSprite("pipe-bottom-right", "sprites/pipe-bottom-right.png");
loadSprite("blue-block", "sprites/blue-block.png");
loadSprite("blue-brick", "sprites/blue-brick.png");
loadSprite("blue-steel", "sprites/blue-steel.png");
loadSprite("blue-evil-shroom", "sprites/blue-evil-shroom.png");
loadSprite("blue-surprise", "sprites/blue-surprise.png");
loadSprite("bomb", "sprites/bomb.png");

//build game levels and layers
scene("game", ({ level, score }) => {
  layers(["bg", "obj", "ui"], "obj");
  const maps = [
    [
      "                                                                                                  *                                                   =",
      "                                                                                   b              $                                                   =",
      "========        ==                                                                                $                                                   =",
      "=           *                                                                                     = $                                                 =",
      "=            $                                                                                $  === $                                                =",
      "=               $                                                                            $  ===== $                                               =",
      "=          ===    $                                                                b         $ ======= $                                              =",
      "=                  $                     $$$$$                                               $========= $   $$$                                       =",
      "=                                        =====                                               $              ===                                       =",
      "=                                $$$$                                                        $               ===                                      =",
      "=                   $            ====                                                  b     $                === $$$                                 =",
      "=$     %   =*=%=  ==== $  $                       $   $   $   $   $                                        $ $$$  ===       =$$=                      =",
      "£$                            $  $                $   $   $   $   $   $                        b ===        $$$  ===      ==$$==                     =",
      "£$                                      $         $   $   $   $   $   $    $      $ $ $ $   ===                 $ ===    ===$$===                   -+=",
      "£$                           ^ ^  ^ ^   ^ ^       $   $       $   $                                    b        =   $   =====$$=====          ^^  ^^()=",
      "=======================================================      =================================================================================      ===",
    ],
    [
      "£                                 xxx    xxx    xxx                                                                                                      £",
      "£                                 $$$           $$$             *                            *                                                           £",
      "£                                 xxx           xxx    x x x                                                                                             £",
      "£                                                           $$$$$$$$$$                   $$$$$$$$                                                        £",
      "£                                                           xxxxxxxxxx                   xxxxxxxx                                                        £",
      "£                                                          x    *     x                 x        x                                                 b     £",
      "£                                                         x            x               x          x                                            b         £",
      "£                                                        x     xx      x             x            x                                       b              £",
      "£                                                       x                x           x              x                                  b                 £",
      "£                                                   o  x      xxxx       x         x      xxxxx          x                             b                 £",
      "£                                                     x                    x       x                  x                      b                           £",
      "£                              xxxxx     xxxxx      x        xxxxxx              x     xxxxxxxxxxx    x                b                                 £",
      "£        @@@@@@              x x                  xx                         x   x                      x                                                £",
      "£                          x x x                            xxxxxxxx         x x                        x                                                                          /       £",
      "£               z  z       x x x x  x                                                                                                             -+     £",
      "£                    x x x x x  x                                                   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                     ()     £",
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    ],
    [
      "£                                                                                                                                                        £",
      "£!!!!  $$            $$         $$$$$$        $$             $$          $$                                    !    $$  $$    $$$            $$          £",
      "£    !  $$          $$         $$    $$       $$             $$    !      $$        !                              $$   $$    $$$$           $$          £",
      "£        $$        $$    !    $$      $$   !  $$             $$            $$                                     $$     $$    $$ $$      !   $$          £",
      "£         $$      $$         $$        $$     $$         !!  $$             $4                      !        !   $$     $$    $$  $$         $$          £",
      "£    !!    $$    $$         $$    !     $$    $$   !         $$        !     $$       !                         $$      $$    $$   $$        $$          £",
      "£    *      $$  $$      !!  $$          $$    $$             $$               $$              $$               $$       $$    $$    $$   !   $$          £",
      "£            $$$$           $$          $$    $$             $$            !!  $$            $$$$       !     $$        $$    $$     $$      $$          £",
      "£   !!!!      $$            $$          $$    $$             $$                 $$          $$  $$          $$   !      $$    $$      $$     $$          £",
      "£             $$        !!  $$          $$    $$   !!        $$                  $$    !   $$    $$        $$           $$    $$       $$    $$          £",
      "£             $$             $$        $$      $$            $$     !     !!      $$      $$      $$      $$      !     $$    $$     !  $$   $$          £",
      "£  !!!!!!     $$              $$      $$        $$          $$                     $$    $$        $$    $$             $$    $$         $$  $$          £",
      "£             $$     !!         $$    $$     !   $$       $$              *  !      $$  $$     !    $$  $$              $$    $$          $$ $$          £",
      "£             $$                $$  $$            $$      $$                         $$$$            $$$$       !       $$    $$           $$$$          £",
      "£             $$          !       $$$$       !!    $$$$$$$$        !!                 $$              $$                $$    $$            $$$   -+     £",
      "£                                                                                                                                                 ()     £",
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    ],
  ];
  //level element shorts
  const levelCfg = {
    width: 20,
    height: 23,
    "=": [sprite("block"), solid()],
    $: [sprite("coin"), "coin"],
    "%": [sprite("surprise"), solid(), "coin-suprise"],
    "*": [sprite("surprise"), solid(), "mushroom-suprise"],
    "}": [sprite("unboxed"), solid()],
    "(": [sprite("pipe-bottom-left"), solid(), scale(0.8)],
    ")": [sprite("pipe-bottom-right"), solid(), scale(0.8)],
    "-": [sprite("pipe-top-left"), solid(), scale(0.8), "pipe"],
    "+": [sprite("pipe-top-right"), solid(), scale(0.8), "pipe"],
    "^": [sprite("evil-shroom"), solid(), "dangerous", scale(1)],
    "#": [sprite("mushroom"), solid(), "mushroom", scale(0.5), body()],
    "!": [sprite("blue-block"), solid(), scale(0.5)],
    "£": [sprite("blue-brick"), solid(), scale(0.5)],
    z: [sprite("blue-evil-shroom"), solid(), "dangerous"],
    "@": [
      sprite("blue-surprise"),
      "blue-surprise",
      solid(),
      scale(0.5),
      "coin-surprise",
    ],
    x: [sprite("blue-steel"), solid(), scale(0.5)],
    "/": [sprite("bowser"), solid(), scale(0.8), "dangerous"],
    b: [sprite("bomb"), solid(), scale(0.2), "dangerous"],
  };

  const gameLevel = addLevel(maps[level], levelCfg);
  //score and level labels
  const scoreLabel = add([
    text(score, 30),
    pos(-100, 8),
    layer("ui"),
    {
      value: score,
    },
  ]);

  add([text("Level " + parseInt(level + 1), 30), pos(60, 6)]);

  // Event listener for space key
  keyPress("up", () => {
    if (!isJumping) {
      // Make Mario jump
      isJumping = true;

      // Play jump sound
      jumpSound.play();
    }
  });

  //Player small/big function
  function big() {
    let timer = 0;
    let isBig = false;
    return {
      update() {
        if (isBig) {
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
          timer -= dt();
          if (timer <= 0) {
            this.smallify();
          }
        }
      },
      isBig() {
        return isBig;
      },
      smallify() {
        CURRENT_JUMP_FORCE = JUMP_FORCE;
        this.scale = vec2(0.2);
        timer = 0;
        isBig = false;
      },
      biggify(time) {
        this.scale = vec2(0.3);
        timer = time;
        isBig = true;
      },
    };
  }
  //add player
  const player = add([
    sprite("mario"),
    solid(),
    pos(30, 0),
    body(),
    big(),
    origin("bot"),
    scale(0.2),
  ]);
  //move the mushroom
  action("mushroom", (m) => {
    m.move(20, 0);
  });

  //spawn objects
  player.on("headbump", (obj) => {
    if (obj.is("coin-suprise")) {
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("}", obj.gridPos.sub(0, 0));
    }
    if (obj.is("mushroom-suprise")) {
      gameLevel.spawn("#", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("}", obj.gridPos.sub(0, 0));
    }
    if (obj.is("blue-surprise")) {
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("}", obj.gridPos.sub(0, 0));
    }
  });
  //player interaction
  player.collides("mushroom", (m) => {
    mushroomSound.play();
    destroy(m);
    player.biggify(20);
  });

  player.collides("coin", (c) => {
    coinSound.play();
    destroy(c);
    scoreLabel.value++;
    scoreLabel.text = scoreLabel.value;
  });

  //Deaths
  action("dangerous", (d) => {
    d.move(-ENEMY_SPEED, 0), body();
  });

  player.collides("dangerous", (d) => {
    if (isJumping) {
      destroy(d);
      punchSound.play();
    } else go("lose", { score: scoreLabel.value });
  });

  player.action(() => {
    camPos(player.pos); //camera follows the player
    if (player.pos.y >= FALL_DEATH) {
      go("lose", { score: scoreLabel.value });
    }
  });

  //Level transiotion
  player.collides("pipe", () => {
    pipeSound.play();
    keyPress("down", () => {
      go("game", {
        level: (level + 1) % maps.length,
        score: scoreLabel.value,
      });
    });
  });

  //move player
  keyDown("left", () => {
    player.move(-MOVE_SPEED, 0);
  });

  keyDown("right", () => {
    player.move(MOVE_SPEED, 0);
  });

  player.action(() => {
    if (player.grounded()) {
      isJumping = false;
    }
  });

  keyPress("up", () => {
    if (player.grounded()) {
      isJumping = true;
      player.jump(CURRENT_JUMP_FORCE);
    }
  });
});

scene("lose", ({ score }) => {
  add([text(score, 32), origin("center"), pos(width() / 2, height() / 2)]);
});
//start the game
start("game", { level: 0, score: 0 });
