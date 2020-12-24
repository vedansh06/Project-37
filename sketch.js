var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud_image, cloudGroup;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacleGroup;
var gameOver, restart, gameover_img, restart_img;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
trex_running = loadAnimation("trex10.png","trex11.png");
trex_collided = loadImage("trex_collided0.png");
  
groundImage = loadImage("ground0.png")
cloud_image = loadImage("cloud0.png");
obstacle1 = loadImage("obstacle10.png");
obstacle2 = loadImage("obstacle20.png");
obstacle3 = loadImage("obstacle30.png")
obstacle4 = loadImage("obstacle40.png");
obstacle5 = loadImage("obstacle50.png");
obstacle6 = loadImage("obstacle60.png");
gameover_img = loadImage("gameOver0.png");
restart_img = loadImage("restart0.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.setCollider("rectangle", 0, 0, 100, 100);
  //trex.debug = true;  
  trex.scale = 0.5;
  
  ground = createSprite(200,180,10,5);
  //ground.addImage("ground",groundImage);
  ground.width = displayWidth*500000;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  gameOver = createSprite(300,80);
  gameOver.addImage(gameover_img);      
  gameOver.visible = false;
  gameOver.scale = 0.5;
  restart = createSprite(300,120);
  restart.addImage(restart_img);
  restart.visible = false;
  restart.scale = 0.4;
}

function draw() {
  background(255);
  console.log(trex.y);
  if(gameState == PLAY){
    if(keyDown("space") && trex.y >= 159) {
    trex.velocityY = -13; 
  }
   trex.velocityY = trex.velocityY + 0.8
   score = score + Math.round(getFrameRate()/30);
   trex.x = camera.x - 180;
    spawnClouds();
   spawnObstacles();
    if(trex.isTouching(obstacleGroup)){
    gameState = END;
    }
  } else if(gameState == END){
  ground.velocityX = 0;
  cloudGroup.setLifetimeEach(-1);
  cloudGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  obstacleGroup.setVelocityXEach(0);
  trex.velocityY = 0;
  restart.visible = true;
  gameOver.visible = true;
  trex.changeAnimation("collided",trex_collided);
  if(mousePressedOver(restart)){
  reset();
  }
  }
  
  textSize(17);
  text("Score: " + score, 450,50);
  trex.collide(invisibleGround);

  drawSprites();
}
function spawnClouds(){
if(frameCount %80 == 0){
var cloud;
cloud = createSprite(610,random(70,120));
cloud.addImage(cloud_image);
cloud.velocityX = -4;
cloud.lifetime = 150;
cloud.scale = 0.5;
cloudGroup.add(cloud);
cloud.depth = trex.depth;
trex.depth = trex.depth + 1;
}
}
function spawnObstacles(){
if(frameCount %100 == 0){
var obstacle;
obstacle = createSprite(610,169);
obstacle.velocityX = -6;  
var number = Math.round(random(1,6));
//console.log(random(1,6));
switch(number){
  case 1:obstacle.addImage(obstacle1);
  break;
  case 2: obstacle.addImage(obstacle2);
  break;
  case 3: obstacle.addImage(obstacle3);
  break;
  case 4: obstacle.addImage(obstacle4);
  break;
  case 5: obstacle.addImage(obstacle5);
  break;
  case 6: obstacle.addImage(obstacle6);
  break;
}
obstacle.lifetime = 150;
obstacle.scale = 0.5;
obstacleGroup.add(obstacle);
}
}
function reset(){
gameState = PLAY;
score = 0; 
gameOver.visible = false;
restart.visible = false;
obstacleGroup.destroyEach();
cloudGroup.destroyEach();
trex.changeAnimation("running",trex_running);
ground.velocityX = -6;
}