//Create variables here
var dog,happyDog,database,foodS,foodStock
var feed,addFood
var fedTime,lastFed
var foodObj
var position
function preload()
{
  //load images here
  dogimg1 = loadImage("images/dogimg.png")
  happyDog = loadImage("images/dogimg1.png")
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  console.log(database)
  
  foodObj = new Food
  dog = createSprite(250,250,10,10)
  dog.addImage(dogimg1);
  dog.scale= 0.2;

  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  fill(50);
  feed = createButton("Feed The Dog")
  feed.position(500,15)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(400,15)
  addFood.mousePressed(addFoods)
}


function draw() {  
   background(46,139,87)

  foodObj.display();

   fedTime = database.ref('FeedTime')
   fedTime.on("value",function(data){
     lastFed = data.val();
   });


   fill(255,255,254);
  textSize(15);
  
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

  drawSprites();
 

}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


