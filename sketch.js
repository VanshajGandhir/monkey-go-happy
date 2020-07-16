var cave ;
var PLAY ;
var END ;
var gameState;  
var monkey ;
var invisibleground;
var vansh;
var survivaltime;
var CloudsGroup ;
var BananaGroup ;
var ObstaclesGroup;
var restart;
var restartImg,monkeyWalkingImg,monkeyStopImg,bananaImg,caveImg,stoneImg,cloudImg;

function preload(){
  monkeyWalkingImg=loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png","sprite_9.png");
  monkeyStopImg=loadAnimation("monkeystop.png");
  bananaImg = loadImage("banana.png");
  caveImg = loadImage("cave.png");
  stoneImg = loadImage("stone.png");
  cloudImg = loadImage("cloud.png");
  restartImg = loadImage("restart.png");
} 

function setup() {
  createCanvas(400, 400);
   cave = createSprite(200,200,20,20);
  cave.addImage("cav",caveImg);
  monkey = createSprite(60,360,20,20);
  monkey.addAnimation("mon",monkeyWalkingImg);
  monkey.scale = 0.1;
  monkey.depth =  5;
  monkey.addAnimation("stop",monkeyStopImg);
  restart = createSprite(200,200,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.1;
  restart.depth = cave.depth +3;
  stroke("black");
  textSize(20);
  fill("white");
  
 
  
 survivaltime = 0;
 CloudsGroup = createGroup();
 BananaGroup = createGroup();
 ObstaclesGroup = createGroup();
 PLAY =1;
 END =0;
 gameState  = PLAY;
  
  
invisibleground = createSprite(200,385,400,20);
invisibleground.visible = false ;

 

  }

function draw() {
  background(220);
 monkey.collide(invisibleground);
   monkey.velocityY = monkey.velocityY + 1.5;
  
 if (gameState===PLAY) {
    
    if (keyWentDown("space" )&&monkey.y>=324){
      monkey.velocityY = -20;}
   // survivaltime += Math.round(getFrameRate()/60);
   if(frameCount%30===0)
     survivaltime++;
    switch (survivaltime){
    case 1000: monkey.scale = 0.11;
           break;
    case 2000: monkey.scale = 0.13;
          break;
    case 3000: monkey.scale = 0.15;
          break;
    case 4000: monkey.scale = 0.17;
          break;
    default: break;      
    }
   restart.visible = false;
    spawnClouds();
    spawnObstacles();
    spawnBanana();
    if (BananaGroup.isTouching(monkey)){ 
      BananaGroup.destroyEach();}
    if (ObstaclesGroup.isTouching(monkey))
      gameState = END;
  }
  
  else if (gameState ===END) {
  
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
  monkey.velocityY = 0;
  monkey.changeAnimation("stop");
  ObstaclesGroup.setVelocityXEach(0);
  CloudsGroup.setVelocityXEach(0);
  monkey.scale = 0.1;
    restart.visible = true;
  if(mousePressedOver(restart)){
    gameState = PLAY;
    survivaltime = 0;
    ObstaclesGroup.destroyEach();
    CloudsGroup.destroyEach();
    BananaGroup.destroyEach();
    monkey.changeAnimation("mon");
    
  }
  }

  drawSprites();  
  text("Survival Time:"+survivaltime,100,50);
  if(gameState===END)
    text("click the below button to reset",110,150);
}  
function spawnClouds() {
    if (World.frameCount % 100 === 0) {
      var cloud = createSprite(400,320,40,10);
      cloud.y = random(180,240);
      cloud.addImage(cloudImg);
      cloud.scale = 0.1;
      cloud.velocityX = -2;
      cloud.lifetime = cloud.x/2;
      CloudsGroup.add(cloud);
      cloud.depth =cave.depth + 100;
      vansh = cloud.depth;
   }
  }

function spawnObstacles(){
  if (World.frameCount%300 === 0){
    var obstacles = createSprite(400,350,20,20);
    obstacles.addImage(stoneImg);
    obstacles.velocityX  =  -4;
    obstacles.scale = 0.1;
    obstacles.lifetime = obstacles.x/4;
    obstacles.depth = 100;
    ObstaclesGroup.add(obstacles);
  }
}
function spawnBanana(){
  if (World.frameCount%200 === 0){
    var banana = createSprite(400,random(280,300),20,20);
    banana.addImage("bananaI",bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = banana.x/4;
    banana.depth = 100;
    BananaGroup.add(banana);
  }
}
