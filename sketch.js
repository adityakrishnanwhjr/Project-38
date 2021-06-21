var tigerImage, tiger;
var roadImage, road;
var cashImage, cash, diamondImage, diamond, jwellImage, jwell;
var obstacle1Img, obstacle1, obstacle2Img, obstacle2, obstacle3Img, obstacle3, obstaclesGroup;
var propsGroup;
var gameOverImage, gameOver;
var score=0;
var PLAY=1;
var END=0;
var gameState="PLAY";

function preload(){
tigerImage=loadImage("Tiger.gif");
  roadImage=loadImage("Road2.png");
  cashImage=loadImage("cash.png");
  diamondImage=loadImage("diamonds.png");
  jwellImage=loadImage("jwell.png");
  obstacle1Img=loadImage("obstacle1.png");
  obstacle2Img=loadImage("obstacle2.png");
  obstacle3Img=loadImage("obstacle3.png");
  gameOverImage=loadImage("gameOver.png");
  
}

function setup() {
  createCanvas(displayWidth-50,displayHeight-150);
  
  road=createSprite(displayWidth/2,displayHeight/2,displayWidth-50,displayHeight-150);
  road.addImage("road",roadImage);
  road.velocityX=-1;
  
 tiger=createSprite(100,displayHeight/2);
  tiger.addImage("tiger",tigerImage);
  tiger.scale=0.2;
  
  obstaclesGroup= new Group();
  propsGroup=new Group();
}

function draw() {
 background(0);
 camera.position.x=tiger.x;
 camera.position.y=displayHeight/2;

  if(gameState==="PLAY"){
  if(road.x<200){
    road.x=300;
  }
  if(propsGroup.isTouching(tiger)){
    propsGroup.destroyEach();
    score=score+10;
  }
  if(obstaclesGroup.isTouching(tiger)){
    obstaclesGroup.destroyEach();
    gameState="END";
  }
    if(gameState==="END"){
      road.velocityX=0;
      tiger.destroy();
      gameOver=createSprite(100,displayHeight/2);
      gameOver.addImage(gameOverImage);
    }
    tiger.setCollider("rectangle",0,0,tiger.width,tiger.height);
  controls();
  spawnProps();
  spawnObstacles();
  }   
  drawSprites();
  fill("white");
  textSize(24);
  text("Score: "+score,450,100);
}

function spawnProps(){
  var props=Math.round(random(1,3));
  if(frameCount%300===0){
    if(props===1){
      cash=createSprite(600,Math.round(random(100,displayHeight-200)));
      cash.addImage("cash",cashImage);
      cash.velocityX=-(3+score/10);
      cash.scale=0.1;
      propsGroup.add(cash);
    }else if(props===2){
      diamond=createSprite(600,Math.round(random(100,displayHeight-200)));
      diamond.addImage("diamond",diamondImage);
      diamond.velocityX=-(3+score/10);
      diamond.scale=0.03;
      propsGroup.add(diamond);
    }else{
      jwell=createSprite(600,Math.round(random(100,displayHeight-200)));
      jwell.addImage("jwell",jwellImage);
      jwell.velocityX=-(3+score/10);
      jwell.scale=0.1;
      propsGroup.add(jwell);
    }
  }
}

function spawnObstacles(){
  var obstacles=Math.round(random(1,3));
  if(frameCount%500===0){
    if(obstacles===1){
      obstacle1=createSprite(600,Math.round(random(100,displayHeight-200)));
      obstacle1.addImage("obstacle1",obstacle1Img);
      obstacle1.velocityX=-(3+score/15);
      obstacle1.scale=0.1;
      obstaclesGroup.add(obstacle1);
    }else if(obstacles===2){
      obstacle2=createSprite(600,Math.round(random(100,displayHeight-200)));
      obstacle2.addImage("obstacle2",obstacle2Img);
      obstacle2.velocityX=-(3+score/15);
      obstacle2.scale=0.1;
      obstaclesGroup.add(obstacle2);
    }else{
      obstacle3=createSprite(600,Math.round(random(100,displayHeight-200)));
      obstacle3.addImage("obstacle3",obstacle3Img);
      obstacle3.velocityX=-(3+score/15);
      obstacle3.scale=0.1;
      obstaclesGroup.add(obstacle3);
    }
  }
}

function controls(){
  if(keyDown(UP_ARROW)){
    tiger.y=tiger.y-3;
  }
  if(keyDown(DOWN_ARROW)){
    tiger.y=tiger.y+3;
  }
}