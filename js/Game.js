class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.toGetCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(80, 80, 80));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("Blue");
          ellipse(x, y, 80, 80);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       textAlign(CENTER);
        textSize(15);
        text(allPlayers[plr].name, cars[index-1].x, cars[index-1].y+70)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3700){
      gameState = 2;
      player.rank = player.rank + 1;
      Player.updateCae(player.rank);
      // cae = player.rank;
      console.log(player.rank);
      player.update();
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }

  displayRank(){
    Player.getPlayerInfo();
    console.log("displayRank");
    for(var plr in allPlayers){
      if(allPlayers[plr].rank === 1){
        fill("Green");
        textSize(36);
        text("1st Position : " + allPlayers[plr].name, 50, 100);
        console.log("first");
      }
      else if(allPlayers[plr].rank === 2){
        fill("Red");
        textSize(36);
        text("2nd Position : " + allPlayers[plr].name, 50, 150);
        console.log("second");
      }
      else if(allPlayers[plr].rank === 3){
        fill("Blue");
        textSize(36);
        text("3rd Position : " + allPlayers[plr].name, 50, 200);
        console.log("third");
      }

      else if(allPlayers[plr].rank === 4){
        fill("Yellow");
        textSize(36);
        text("4th Position : " + allPlayers[plr].name, 50, 250);
        console.log("fourth");
      }
    }
  }
}
