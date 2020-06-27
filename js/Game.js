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

    car1 = createSprite(500,200);
    car1.scale = 0.5;
    car1.addImage("car1",car1img);
    car2 = createSprite(700,200);
    car2.addImage("car2",car2img);
    car2.scale = 0.5;
    cars = [car1, car2];
    box1 = createSprite(375, 500, 200, 20);
    box2 = createSprite(575, 500, 200, 20);
    box3 = createSprite(375, 0, 200, 20);
    box4 = createSprite(575, 0, 200, 20);
    box5 = createSprite(375, -500, 200, 20);
    box6 = createSprite(575, -500, 200, 20);
    box7 = createSprite(375, -1000, 200, 20);
    box8 = createSprite(575, -1000, 200, 20);
    box9 = createSprite(375, -1500, 200, 20);
    box10 = createSprite(575, -1500, 200, 20);
    box11 = createSprite(375, -2000, 200, 20);
    box12 = createSprite(575, -2000, 200, 20);
    box13 = createSprite(375, -2500, 200, 20);
    box14 = createSprite(575, -2500, 200, 20);
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(trackimg, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
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
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        // if(player1===box1) {
        //   gameState = 2;
        // }
        // if(player2 ===box2) {
        //   gameState = 2;
        // }
        // if(player1===box3) {
        //   gameState = 2;
        // }
        // if(player2 ===box4) {
        //   gameState = 2;
        // }
        // if(player1===box5) {
        //   gameState = 2;
        // }
        // if(player2 ===box6) {
        //   gameState = 2;
        // }
        // if(player1===box7) {
        //   gameState = 2;
        // }
        // if(player2 ===box8) {
        //   gameState = 2;
        // }
        // if(player1===box9) {
        //   gameState = 2;
        // }
        // if(player2 ===box10) {
        //   gameState = 2;
        // }
        // if(player1===box11) {
        //   gameState = 2;
        // }
        // if(player2 ===box12) {
        //   gameState = 2;
        // }
        // if(player1===box13) {
        //   gameState = 2;
        // }
        // if(player2 ===box14) {
        //   gameState = 2;
        // }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}