var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backgroundImg, invisibleGround;
var avatar, avatarImg;
var ground, groundImg;

var obstaclesGroup, obstacle1, obstacle2;

var gameOver, restart, gameOverImg, restartImg;
var score=0;

function preload(){
  
  backgroundImg = loadImage("background.jpg");

  avatarImg = loadImage("girl.png");
  groundImg- loadImage("ground.jpg")
  
  obstacle1 = loadImage("obstacle.png");
  obstacle2 = loadImage("obstacle2.png");
  
  gameOverImg = loadImage("gameover.jpg");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 400);

  avatar = createSprite(300,500,20,50);
  avatar.addImage("running", avatarImg);
  
  //ground= createSprite(width/2,height,width,2);
  
  invisibleGround = createSprite(300,350,50,125);  
  invisibleGround.visible= false;

  gameOver = createSprite(300, 200);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300, 300);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  obstaclesGroup = new Group();

  score= 0;

}

function draw() {
  background(backgroundImg);
   
  if (gameState===PLAY){

    score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6 + 3*score/100);
    
    if( keyDown("SPACE") && avatar.y  >= 120) {
      avatar.velocityY = -10;
    }
    
    gameOver.visible = false;
    restart.visible = false;

    avatar.velocityY = avatar.velocityY + 0.8
  
    //if (ground.x < 0){
      //ground.x = ground.width/2;
    
  
    avatar.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(avatar)){
        gameState = END;
    }
  }

  else if (gameState === END) {

    background("black");
    textSize(20);
    fill("white")
    text("Game Over");
    
    ground.velocityX = 0;
    avatar.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    
    if( mousePressedOver(restart)) {      
      reset();
    }
  }
  
  drawSprites();

}

    

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
              
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = avatar.depth;
    avatar.depth +=1;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  score = 0;
  drawSprites();
}