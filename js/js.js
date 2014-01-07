/**
* Created by fang on 13-12-28.
*/
var  canvas = getId('gameCanvas'),
     context = canvas.getContext('2d');
var canvasHeight = canvas.getAttribute('height'),
    canvasWidth = canvas.getAttribute('width');
//游戏UI
var  ui= getId('gameUI'),
    uiIntro = getId('gameIntro'),
    uiStats = getId('gameStats'),
    uiComplete = getId('gameComplete'),
    uiPlay = getId('gamePlay'),
    uiReset = getClass('gameReset'),
    uiScore = getClass('gameScore');
var soundBackground = getId('backgroundSounds'),
    soundThrust = getId('thrustSounds'),
    soundDeath = getId('deathSounds');
//重置和启动游戏
function keyListener(e){
    if(e.type =='keydown'){
        var keycode = e.keyCode;
        if(!PLAYGAME){
            PLAYGAME = true;

           // console.log(soundBackground.currentTime);
           // soundBackground.currentTime = 0;
            soundBackground.play();
            animate();
            timer();
        }
        //方向键操作
        if(keycode == ARROWRIGHT){
            player.moveRight = true;

        }else if(keycode == ARROWLEFT){
            player.moveLeft = true;

        }else if(keycode ==ARROWUP){
            player.moveTop = true;
            if(soundThrust.paused){
                soundThrust.currentTime = 0;
               // console.log(soundThrust.currentTime);
                soundThrust.play();
            }
        }
        if(keycode == BULLET){
            //console.log('shoot');
            if(!player.shoot){
                player.shoot = true;
            }

        }
    }else if(e.type =='keyup'){
        var keycode = e.keyCode;
        if(keycode == ARROWRIGHT){
            player.moveRight = false;
        }else if(keycode == ARROWLEFT){
            player.moveLeft = false;
        }else if(keycode == ARROWUP){
            player.moveTop = false;
            soundThrust.pause();
        }
        if(keycode == BULLET){
            player.shoot = false;
        }
    }
}
//设置计分
function timer(){
    if(PLAYGAME){
        SCORETIMEOUT = setTimeout(function(){
            ++SCORE;
            for(var i=0;i<uiScore.length;i++){
                uiScore[i].innerHTML=(SCORE);
            }

            timer();
        },1000);
    }
}
//游戏开始
function startGame(){
    for(var i=0;i<uiScore.length;i++){
        uiScore[i].innerHTML = '0';
    }
    show(uiStats);
    PLAYGAME = false;
    addEvent(window,'keydown',keyListener);
    addEvent(window,'keyup',keyListener);
    //开始动画循环
    animate();
    shoot();
}
//游戏初始化
function init(){
    //游戏开关
    PLAYGAME = null;
    STARS = [];
    NUMSTARS = 10;
    ARROWUP = 38;
    ARROWRIGHT = 39;
    ARROWLEFT = 37;
    SCORE = 0;
    BULLET = 32
    SCORETIMEOUT = null;
    BULLETS =[];
    ITEMSCOLOR = ['#f39c11','#3598db','#9a59b5'];
    ITEMS =[];
    hide(uiStats);
    hide(uiComplete);
    uiPlay.onclick = function(e){
        e.preventDefault();
        hide(uiIntro);
        startGame();
    }
    for(var i=0;i<uiReset.length;i++){
        uiReset[i].onclick = function(e){
            for(var j=0;j<STARS.length;j++){
                STARS[j].reset();
            }
            player.reset();
            item.reset();
            delEvent(window,'keyup',keyListener);
            delEvent(window,'keydown',keyListener);
            e.preventDefault();
            hide(uiComplete);
            BULLETS.splice(0,BULLETS.length);
            soundBackground.pause();
            soundBackground.src = soundBackground.src;
//            console.log(soundBackground.src);
//            soundBackground.currentTime = 0;
           // console.log(soundBackground.currentTime);
            soundThrust.pause();
            player.moveLeft = false;
            player.moveRight = false;
            player.moveTop = false;
            player.shoot = false;
            clearTimeout(shoot,100);
            clearTimeout(SCORETIMEOUT);
            SCORE=0;
            startGame();
        }
    }

}
init();
//初始化小行星
function Star(x,y,radius,vY){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vY = vY;
    if(typeof this.reset !='function'){
        Star.prototype.reset = function(){
            this.radius = 10+Math.random()*20;
            this.x = Math.floor(Math.random()*canvasWidth);
            this.y = -Math.floor(Math.random()*canvasHeight)-this.radius*2;
            this.vY = 5+Math.random()*5;
            this.life = Math.floor(this.radius);
        }
    }
    this.life = Math.floor(radius/5);
}

//初始化玩家
function Player(x,y){
    this.x = x;
    this.y = y;
    this.width = 24;
    this.height = 24;
    this.halfWidth = this.width/2;
    this.halfHeight = this.height/2;
    this.vX = 0;
    this.vY = 0;
    this.moveRight = false;
    this.moveLeft = false;
    this.moveTop = false;
    this.flameLength = 20;
    this.shoot = false;
    this.weapon = {
        color:'#f39c11',
        level:1,
        len:20,
        width:5
    }
    if(typeof  this.reset !='function'){
        Player.prototype.reset = function(){
            this.x = x;
            this.y = y;
        }
    }
}
//初始化子弹
function Bullet(x,y,attrs){
    this.x = x;
    this.y = y;
    this.vY = 20;
    this.len = attrs.len;
    this.width = attrs.width;
    this.color = attrs.color;
    this.level = attrs.level;
}
//初始化道具
Item.prototype = {
    width:50,
    height:50
}
function Item(){
    this.x = Math.random()*canvasWidth;
    this.y = -Math.random()*canvasHeight-this.height;
    this.vY = Math.random()*10;
    this.vX = (Math.random()*1-0.5)*20;
    this.color = ITEMSCOLOR[Math.ceil(Math.random()*2)];
    if(typeof  this.reset !='function'){
        Item.prototype.reset = function(){
            this.x =Math.random()*canvasHeight;
            this.y = -Math.random()*canvasHeight;
            this.vY = Math.random()*10;
            this.vX = (Math.random()*1-0.5)*20;
            this.color = ITEMSCOLOR[Math.floor(Math.random()*3)];
        }
    }
}
for(var i =0; i<NUMSTARS;i++){
    var radius = 10 + (Math.random()*20);
    var x =   Math.floor(Math.random()*canvasWidth),
        y  = -Math.floor(Math.random()*canvasHeight)-radius*2;
    var vY = 5+Math.random()*5;
    STARS.push(new Star(x,y,radius,vY) );
}
var player = new Player(canvasWidth/2,canvasHeight-100);
var item = new Item();
function shoot(){
  //  console.log(BULLETS.length,player.shoot);
    if(player.shoot){
        BULLETS.push(new Bullet(player.x,player.y,player.weapon));
    }
    setTimeout(shoot,100);
}

