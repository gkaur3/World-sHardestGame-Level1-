/*
    Kent State University
    CS 44105/54105 Web Programming I
    Fall 2017
    Assignment 3
    The World’s Hardest Game 2 Remake
    worldshardestgame.html
    Author 1: Abdulkareem Alali, aalali1@kent.edu
    Author 2: Gaganpreet Kaur, gkaur3@kent.edu
*/


//var coinCollection= new Audio("soundeffects/CoinCollect.wav");

var music= new Audio("soundeffects/World'sHardestGame2ThemeSong.mp3");
			music.volume= .40;
			music.load();

var pTag=document.querySelector("p");
var muteSpan,uTag, uTag2, node, node2;
var pauseSpan;
var pause=false;
var mute=false;
var globalX;
var globalY;
var radiusXofEllipse=7;
var deathCount=0;
var newDeathCount=0;
const DARKBLUE = 'rgb(0,0,139)';
const RED="red";
const YELLOW="yellow";
const BACKGROUND_IMAGE = "images/world-hardest-game-2-bg-level-1.png";
const SCREENS = {

    screen3 : {
        gameCenterWall : {
            top : 100,
            bottom : 355
            }
    }
}
var currentScreen = 0;
const BALLS = {
    pair1 : {
        ball1 : ["p1b1", 400, 150, 11, 5, DARKBLUE],
		ball2 : ["p1b2", 443, 150, 11, 5, DARKBLUE]},
	pair2:{	
		ball1 : ["p2b1", 485, 300, 11, 5, DARKBLUE],
		ball2 : ["p2b2", 528, 300, 11, 5, DARKBLUE]},
	pair3:{
		ball1 : ["p1b1", 572, 150, 11, 5, DARKBLUE],
		ball2 : ["p1b2", 615, 150, 11, 5, DARKBLUE]}
    };

const rectangle={
	rect:["player",245,215,18,18,RED]
};

const coin={
		coin1:["coin1", 420, 268, 7,10, 1, YELLOW],
		coin2:["coin2", 505, 183, 7,10, 1, YELLOW],
		coin3:["coin3", 592, 268, 7,10, 1, YELLOW]
		};

		
		
var XdistRectandBall;
var YdistRectandBall;
var distRectandBall;

var XdistRectandCoin;
var YdistRectandCoin;
var distRectandCoin;

 
var obs;

var progressbarWidth = 0;

const beginButtonX = 395;
const beginButtonY = 380;
const beginButtonWidth = 123;
const beginButtonHeight = 29;

var beginButtonForeground = "white";

var newStyle = document.createElement('style');
newStyle.appendChild(document.createTextNode('@font-face {font-family: mono45-headline;src: url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");'));
document.head.appendChild(newStyle);

window.addEventListener("load", function(){
    //DOM Loaded
	
     startGame();
		
	 window.addEventListener('keydown', moveSelection);
	 game.canvas.addEventListener('click', switchToScreen2);
	 
	window.addEventListener("keydown", function(event){
		if(event.ctrlKey && event.keyCode == 77)
		{
			event.preventDefault();
			mute=!mute;
		}
		
		if(mute){
			node2.nodeValue="UNM";
			music.pause();
		}
		else if(!mute){
			node2.nodeValue="M";
			gameMusic();
		}
	});  
	 game.canvas.addEventListener('mousemove', updateBeginForeground);
	 
	 window.addEventListener("keydown", function(event){
		if(event.ctrlKey && event.keyCode == 80)
		{
			event.preventDefault();
			pause=!pause;
		}
		
		if(pause){
			node.nodeValue="UNP";
		}
		else{
			node.nodeValue="P";
		}
		
	});
	
	
	
});

function isOnBeginButton(x, y)
{
	return x > beginButtonX && x < beginButtonX + beginButtonWidth && y >= beginButtonY && y < beginButtonY + beginButtonHeight;
}

function switchToScreen2(evt)
{
	if (currentScreen == 1 && progressbarWidth >= 600 && isOnBeginButton(evt.offsetX, evt.offsetY))
	{	
		music.play();
		currentScreen = 2;
		window.setTimeout(switchToScreen3, 2000);
	}
}

function updateBeginForeground(evt)
{
	beginButtonForeground = isOnBeginButton(evt.offsetX, evt.offsetY) ? "lightgray" : "white";
}

function switchToScreen3()
{
	if (currentScreen == 2)
	{	
		currentScreen = 3;
		drawTopSpans();
	}
}

 function leftArrowPressed(evt) {				
			evt.preventDefault();
			console.log(globalX);
			console.log(globalY);
			if(((globalX>=221 && globalX<=781) && (globalY>=147 && globalY<=287)) || ((globalX>385 && globalX<=613) && (globalY>=102 && globalY<=331)))
			{
				globalX = parseInt(globalX) - 4;
			}
           }

           function rightArrowPressed(evt) {
					
					evt.preventDefault();
					if( ((globalX>=217 && globalX<781) && (globalY>=147 && globalY<=287)) ||  ((globalX>=383 && globalX<=610) && (globalY>=103 && globalY<=331)) )
					{
						
						globalX = parseInt(globalX) + 4;
					}
           }

            function upArrowPressed(evt) {
				
					evt.preventDefault();
					if( ((globalX>=217 && globalX<=781) && (globalY>147 && globalY<=287)) ||  ((globalX>=383 && globalX<=613) && (globalY>=104 && globalY<=331)) )
					{	
						globalY = parseInt(globalY) - 4;
					}
            }

            function downArrowPressed(evt) {
					evt.preventDefault();
					if( ((globalX>=217 && globalX<=781) && (globalY>=147 && globalY<287)) ||  ((globalX>=383 && globalX<=613) && (globalY>=103 && globalY<=330)) )
					{
						globalY = parseInt(globalY) + 4;
					}
            } 

            function moveSelection(evt) {
				if(!pause){
					switch (evt.keyCode) {
						case 37:
							leftArrowPressed(evt);
							break;
						case 39:
							rightArrowPressed(evt);
							break;
						case 38:
							upArrowPressed(evt);
							break;
						case 40:
							downArrowPressed(evt);
						break;
                    }
				}
             }
		
				
	function startGame(){
		currentScreen = 1;	
    //Begin
    game.init();
    obs = new obstacles(game);    
}

//Engine
var game = {
    canvas: null,
    context : null,
    init : function() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(update, 20);        
    },
    drawBackground: function(){
        if (this.context != undefined){
            var img = new Image;
            img.src = BACKGROUND_IMAGE;
            this.context.drawImage(img, 0, 0);
        }
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    getContext: function(){
        return this.context;
    }
}





function obstacles(game){
    //create the array of balls that will be animated
    this.game = game;
    this.balls = [ ball.construct(BALLS.pair1.ball1),
                   ball.construct(BALLS.pair1.ball2),
				   
				   ball.construct(BALLS.pair2.ball1),
                   ball.construct(BALLS.pair2.ball2),
				   
				   ball.construct(BALLS.pair3.ball1),
                   ball.construct(BALLS.pair3.ball2)
                ];
		
	 this.animate = function(){
        //loop through the balls array
        //draw the balls
        this.game.drawBackground();
        for (var i = 0; i < this.balls.length; i++){
            this.balls[i].animate(this.game.getContext());
        }
    };
	 
		
	this.rectP=player.construct(rectangle.rect);
	
	 this.playerGame=function(){
		// this.game.drawBackground();
		 this.rectP.animate(this.game.getContext());
	 };
	 
	this.coins= [coinsInGame.construct(coin.coin1),
				 coinsInGame.construct(coin.coin2),
				 coinsInGame.construct(coin.coin3)
				];
				
	this.coinRotate=function(){
		//this.game.drawBackground();
		for(var i=0;i <this.coins.length;i++)
		{
			if (!this.coins[i].isCollected) {
				this.coins[i].animate(this.game.getContext());
			}
		}
	}; 
}



function player(name,xcor,ycor,length,breadth,color)
{
	this.name = name;
	globalX = xcor;
	globalY = ycor;
	this.length = length;
	this.breadth = breadth;
	this.color=color;
	this.animate = function (ctx)
	{
		
		
		ctx.fillStyle=this.color;
		ctx.beginPath();
		ctx.rect(globalX,globalY,this.length,this.breadth);
		//console.log(globalX);
		//console.log(globalY);
		ctx.strokeRect(globalX,globalY,this.length,this.breadth);
		ctx.fill();
		//var wall = SCREENS.screen3.gameCenterWall;		
	}
	

}

function coinsInGame(name, xcor, ycor, radiusX, radiusY, speed, color)
{
	this.name=name;
	this.xcor=xcor;
	this.ycor=ycor;
	this.radiusX=radiusX;
	this.radiusY=radiusY;
	this.speed=speed;
	this.color=color;
	this.isCollected = false;
	this.animate = function(ctx){
		
		ctx.fillStyle=this.color;
		ctx.beginPath();
		
		ctx.ellipse(this.xcor, this.ycor, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
		
		ctx.strokeStyle="black";
		ctx.lineWidth=5;
		ctx.stroke();
		ctx.fill();
		
	if(!pause){
		if (this.radiusX >= 7) {
    		this.speed = -0.35;
		}
		else if (this.radiusX <= 1) {
   			 this.speed = 0.35;
		}

		this.radiusX +=this.speed;
	}	
	}
}

function ball(name, x, y, radius, speed, color){
    this.name = name,
    this.x = x,
    this.y = y,
    this.radius = radius,
    this.speed = speed,
    this.color = color,
    this.animate = function(ctx){
        //Draw ball
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.strokeStyle="black";
		ctx.lineWidth=5;
		ctx.stroke();
        ctx.fill();

        //Animate
		
		if(!pause){
        var wall = SCREENS.screen3.gameCenterWall;   
			
		
			if(name=="p2b2"||name=="p2b1")
			{
				if((this.y - this.radius - this.speed  < wall.top) || (this.y + this.radius - this.speed > wall.bottom))
				{

					this.speed = -this.speed;
				}
				
			}
			else{
				if ((this.y - this.radius + this.speed < wall.top) || (this.y + this.radius + this.speed > wall.bottom )){
				this.speed = -this.speed; 
			}
			}
			
			if(name=="p2b2"||name=="p2b1")
			{
				this.y -= this.speed;
			}
			else{
				this.y += this.speed;
			}
		
		}
		
    }
}

 function drawFirstScreen(){
	
	    var para = document.getElementsByTagName("p");
    	para[0].style.visibility = 'hidden';

    	var grd=game.context.createLinearGradient(game.canvas.width*3/5,0,game.canvas.width*2/5, game.canvas.height);
		grd.addColorStop(0,"black");
		grd.addColorStop(0.5,"#444444");
		grd.addColorStop(1,"black");
		game.context.fillStyle=grd;
		game.context.fillRect(0,0,game.canvas.width,game.canvas.height);

    	game.context.font="25px Arial";
		game.context.fillStyle="white";
		game.context.fillText("THE WORLD's", 65,100);  
		
		var gradient = game.context.createLinearGradient(0, 0, game.canvas.width/3, game.canvas.height/2);
		gradient.addColorStop("0", "#0080ff");
		gradient.addColorStop("1.0", "#3399FF");

		game.context.fillStyle="#0080ff";
		game.context.strokeStyle="black";
		game.context.lineWidth=8;
		game.context.shadowColor = "black";
		game.context.shadowOffsetX = 0; 
		game.context.shadowOffsetY = 0; 
		game.context.shadowBlur = 7;
		game.context.font="160px mono45-headline, monospace";
		game.context.textBaseline = 'alphabetic';
		game.context.fillText("HARDEST GAME", 62,219);
		game.context.strokeText("HARDEST GAME", 62,219);
		
		game.context.strokeStyle="white";
		game.context.lineWidth=2;
		game.context.strokeText("HARDEST GAME", 62,219);

		game.context.font="25px Arial";
		game.context.fillStyle="white";
		game.context.fillText("VERSION 2.0", 743,240);

		if (progressbarWidth < 600) {
			progressbarWidth += 35;
			game.context.fillStyle = "white";
			game.context.fillRect(145, 410, progressbarWidth, 17);

			game.context.font="14px Arial";
			game.context.fillStyle="white";
			game.context.fillText("This is world's hardest game. It is harder than any game you have ever played, or ever will play.", 148,454);
		}
		else {
			game.context.fillStyle = beginButtonForeground;
			game.context.font="bold 40px Arial";
			game.context.fillText("BEGIN",395,410);
		}
	
} 


function drawSecondScreen(){
		var para = document.getElementsByTagName("p");
    	para[0].style.visibility = 'hidden';

    	var grd=game.context.createLinearGradient(0,game.canvas.height,0,0);
		grd.addColorStop(0,"#b3b3ff");
		grd.addColorStop(1,"#e6e6ff");
		game.context.fillStyle=grd;
		game.context.fillRect(0,0,game.canvas.width,game.canvas.height);
		
		game.context.shadowOffsetX=0;
		game.context.shadowOffsetY=0;
		game.context.shadowBlur=0;
    	game.context.font="bold 32px Arial";
		game.context.fillStyle="black";
		game.context.fillText("YOU DON'T STAND A CHANCE", 250,250);  		
		
}

function deathcounts(newDeath){	

	deathCount=parseInt(pTag.childNodes[5].childNodes[1].innerHTML);
	newDeathCount = deathCount+newDeath;
	return newDeathCount;
	
}



 function drawTopSpans(){
	
	uTag=document.createElement("u");
	pauseSpan = document.createElement("span");
	node = document.createTextNode("P");
	
	pauseSpan.addEventListener("click" , function(){
		pause=!pause;
		if(pause){
			node.nodeValue="UNP";
		}
		else{
			node.nodeValue="P";
		}
	});
	
	var nodes = document.createTextNode("AUSE");
	var text1=pauseSpan.appendChild(uTag);
	text1.appendChild(node);
	pauseSpan.appendChild(nodes);
	var element1 = document.querySelector("p");
	element1.insertBefore(pauseSpan, element1.childNodes[2]); 
	
	
	uTag2=document.createElement("u");
	muteSpan = document.createElement("span");
	node2 = document.createTextNode("M");
	muteSpan.addEventListener("click" , function(){
		mute=!mute;
		if(mute){
			music.pause();
			node2.nodeValue="UNM";
		}
		else{
			gameMusic();
			node2.nodeValue="M";
		}
		
	});
	var nodes2=document.createTextNode("UTE");
	var text2=muteSpan.appendChild(uTag2);
	text2.appendChild(node2);
	muteSpan.appendChild(nodes2);
	element1.insertBefore(muteSpan, element1.childNodes[3]);
	
	element1.childNodes[5].childNodes[1].innerHTML=newDeathCount;

	
}  

function collisionBallandRect(sqX, sqY, edgeLength, centerX, centerY, radius){
	var sqCenterX = sqX  + edgeLength / 2 ,
        sqCenterY = sqY  + edgeLength / 2,
        distance = Math.sqrt(((sqCenterX - centerX) * (sqCenterX - centerX)) + ((sqCenterY - centerY) * (sqCenterY - centerY)));
	
	return distance < (edgeLength  + radius);
}

function isAnyBallCollided() {
	var i;

	for (i = 0; i < 6; i++) {
		if(collisionBallandRect(globalX, globalY, 18, obs.balls[i].x,obs.balls[i].y, obs.balls[i].radius)) {
			return i;
		}
	}

	return -1;
}

function collisionCoinAndSquare(sqX, sqY, sqEdgeLength, coinCenterX, coinCenterY, coinRadiusX, coinRadiusY) {
	var sqX1 = sqX,
		sqX2 = sqX + sqEdgeLength,
		sqY1 = sqY,
		sqY2 = sqY + sqEdgeLength,
		coinX1 = coinCenterX - coinRadiusX,
		coinX2 = coinCenterX + coinRadiusX,
		coinY1 = coinCenterY - coinRadiusY,
		coinY2 = coinCenterY + coinRadiusY;

    return (((sqX1 > coinX1 && sqX1 < coinX2) || (coinX1 > sqX1 && coinX1 < sqX2)) &&
    	((sqY1 > coinY1 && sqY1 < coinY2) || (coinY1 > sqY1 && coinY1 < sqY2)));
		
		 
}

function isAnyCoinCollided() {
	var i;

	for (i = 0; i <3; i++) {
		
		if(collisionCoinAndSquare(globalX, globalY, 18, obs.coins[i].xcor,obs.coins[i].ycor, obs.coins[i].radiusX, obs.coins[i].radiusY)) {	
			
			return i;
		}
	}
	
	return-1;
}

function resetCollectedCoins() {
	for (var i = 0; i < 3; i++) {
		obs.coins[i].isCollected = false;
	}
}

function pauseGameMusic(){
	var music= new Audio("soundeffects/World'sHardestGame2ThemeSong.mp3");
			music.load();
			music.pause();		
}


function gameMusic(){
		
			music.play();
			setInterval(gameMusic,120000);
			
}
function winAlert(){
		
		alert("You Made It!");
		for (var i = 0; i < obs.coins.length; i++) {
			obs.coins[i].isCollected= false;
		}
		pause=false;
}

function areAllCoinsCollected() {
	for (var i = 0; i < obs.coins.length; i++) {
		if (!obs.coins[i].isCollected) {
			return false;
		}
	}
	
	return globalX>=723;
}

	
function update() {
    game.clear();
    if (currentScreen == 1) {
		drawFirstScreen();
    }
	
    else if (currentScreen == 2) {
    	drawSecondScreen();
		
    }
	
    else {
		
		
		var result= areAllCoinsCollected() ,
		
    	para = document.getElementsByTagName("p"),
    	collectedCoin = -1;
    	para[0].style.visibility = '';
		
		if(result){
			globalX=245;
			globalY=215;
			pTag.childNodes[5].childNodes[1].innerHTML=0;;
			pause=true;
		}
			
		game.context.shadowOffsetX = 0;
		game.context.shadowOffsetY = 0; 
		game.context.shadowBlur = 0;
		
    	obs.animate();
		obs.playerGame();
		obs.coinRotate();
	
		if (isAnyBallCollided() >= 0) {
			  deathcounts(1);
			 pTag.childNodes[5].childNodes[1].innerHTML=newDeathCount;
			if(!mute){
				var punch= new Audio("soundeffects/RealisticPunch.mp3");
				punch.volume= .50;
				punch.load();
				punch.play();
			}
			globalX=245;
			globalY=215;
			resetCollectedCoins();
		}    

		collectedCoin = isAnyCoinCollided();
		
		if (collectedCoin >= 0 && !obs.coins[collectedCoin].isCollected) {
			
			if(!mute){
				var audio = new Audio('soundeffects/CoinCollect.wav');
			
				audio.play();
			}
			obs.coins[collectedCoin].isCollected = true;
		}
		
		if(result){
			setTimeout(winAlert,10);	
		}
		
		
		
		
    }
		
	
}
