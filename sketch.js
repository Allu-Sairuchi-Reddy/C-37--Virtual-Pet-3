var dog,sitdog,jumpdog, database, foodS, foodStock,foodimg,food;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
function preload()

{
sitdog=loadImage("sit.png");
jumpdog=loadImage("drink.png");
foodimg=loadImage("virtual pet images/Food Stock.png");
garden=loadImage("virtual pet images/Garden.png");
washroom=loadImage("virtual pet images/Wash Room.png");
bedroom=loadImage("virtual pet images/Bed Room.png");
}

function setup() {
  createCanvas(700, 700);

  database=firebase.database();

  foodStock=database.ref('Food');
   foodStock.on("value",readStock);

   readState=database.ref('gameState');
   readState.on("value",function(data){
   gameState=data.val();
   });
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

dog=createSprite(350,450);
dog.addImage(jumpdog);
dog.scale=0.3;

food=createSprite(200,520);
food.addImage(foodimg);
food.scale=0.1;

feed=createButton("Feed");
feed.position(450,150);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(370,150);
addFood.mousePressed(addFoods);

foodObj=new Food();

} 
function draw(){
background(46, 139, 87);
textSize(30);
fill("white");
text("Food Packs: "+foodS,20,40);
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
   currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }
  
   if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
    food.remove();
  }else{
   feed.show();
   addFood.show();
  }


function writeStock(x){
if(x<=0){
  x=0}else{
x=x-1}
database.ref('/').update({
  Food:x})}

  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.addImage(sitdog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
