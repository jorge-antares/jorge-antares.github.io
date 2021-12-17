var s;
var ds = 20;
var biteLoc = [];
var alive = true;

function setup() {
  createCanvas(500, 500);
  background(255);
  s = new Snake();
  createBite(ds,s);
}

function draw() {
  background(255);
  frameRate(8);
  alive = s.die(ds);
  
  if (alive) {
    colorBite(ds);
    s.eat(biteLoc,ds);
    s.move(ds);
    s.show(ds);
  } else {
    let w = s.location[0].length - 1;
    background(0);
    fill(255, 0, 0);
    textSize(30);
    text('Game over',width/3,height/3);
    fill(255);
    textSize(20);
    text('Your score is '+ w +'!',width*0.35,height*0.6);
    noLoop();
  }
  fill(0);
  rect(0,0,width,ds);
  rect(0,height,width,-ds);
  rect(0,0,ds,height);
  rect(width,0,-ds,height);
}

function keyPressed() {
  if ((keyCode === LEFT_ARROW) && (s.heading != 1)) {
    s.dir(-1,0);
  } else if ((keyCode === RIGHT_ARROW) && (s.heading != -1)) {
    s.dir(1,0);
  } else if ((keyCode === UP_ARROW) && (s.heading != 2)) {
    s.dir(0,-1);
  } else if ((keyCode === DOWN_ARROW) && (s.heading != -2)) {
    s.dir(0,1);
  }
}


function colorBite(ds) {
  fill(36,155,144);
  rect(biteLoc[0],biteLoc[1],ds,ds);
}


function createBite(ds,snake) {
  biteLoc[0] = ds * floor(random(1,width/ds-1));
  biteLoc[1] = ds * floor(random(1,height/ds-1));

  for (let i = 0; i < snake.location[0].length; i++) {
    if ((biteLoc[0] == snake.location[0][i]) &&
        (biteLoc[0] == snake.location[0][i])) {
      biteLoc[0] = ds * floor(random(1,width/ds-1));
      biteLoc[1] = ds * floor(random(1,height/ds-1));
      i = 0;
    }
  }
}
