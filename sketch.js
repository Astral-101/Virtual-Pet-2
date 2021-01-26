var dog,sadDog,happyDog;
var foodStock;
var foodObj;
var foodS, database;

var gameState = "play"


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  database = firebase.database();
  foodStock = database.ref('foodStock');
  foodStock.on("value", readStock);

  foodObj = new Food();

  feedDog = createButton("Feed Dog");
  feedDog.position(450, 30);
  feedDog.mousePressed(feedDog);

  addStock = createButton("Add Food");
  addStock.position(575, 30);
  addStock.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);

  if (gameState === "play"){
    foodObj.display();
    dog.display();

  }

  if (foodS != 0){
    textSize(20);
    stroke("blue")
    fill("red");
    text("Food Left: "+ foodS, 5, 50);

  }

  else{
    textSize(20);
    stroke("blue")
    fill("red");
    text("No Food Left! Add Stock")
  }






  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
}


//function to update food stock and last fed time
function writeStock(x){

  if (x <= 0) {
    x = 0
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    food: x
  });

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}


//function to add food in stock

function feedDog(){
  foodS = foodS - 1;
  dog.addImage(happyDog);
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    food : foodS
  })
}
