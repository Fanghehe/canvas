/**
 * Created by fang on 13-12-30.
 */
function animate(){
    //清除
    context.clearRect(0,0,canvasWidth,canvasHeight);
    //绘制玩家
    player.vX = 0;
    player.vY = 0;
    if(player.moveRight){
        player.vX = 10;
    }
    if(player.moveLeft){
        player.vX = -10;
    }
    if(player.moveTop){
        player.vY = -10;
    }else{
        player.vY = 10;
    }
    player.x += player.vX;
    player.y += player.vY;
    //绘制小行星
    var  starsLength = STARS.length;
    for(var i=0; i<starsLength; i++){
        var star =  STARS[i];
        if(star.y-star.radius>canvasHeight){
            star.reset();
        }
        //和玩家碰撞游戏结束
        if(crashTest(player,star)){
            soundThrust.pause();
            soundDeath.currentTime = 0;
            soundDeath.play();
            //游戏结束
            PLAYGAME = false;
            clearTimeout(SCORETIMEOUT);
            hide(uiStats);
            show(uiComplete);
            soundBackground.pause();
            soundBackground.currentTime = 0;
            delEvent(window,'keyup',keyListener);
            delEvent(window,'keydown',keyListener);
        }
        context.fillStyle = 'rgb(255,255,255)';
        //和子弹撞击
        for(var j=0; j<BULLETS.length; j++){
            if(bulletTest(BULLETS[j],star)){
                context.fillStyle = '#f3f547';
                BULLETS.splice(j,1);
                if(!star.life--){
                    star.reset();
                }
            }
        }
        star.y +=star.vY;

        context.beginPath();
        context.arc(star.x,star.y,star.radius,0,Math.PI*2,true);
        context.closePath();
        context.fill();
    }
    //绘制子弹

    //console.log(BULLETS.length);
    if(!!BULLETS.length){
        var bulletsLength = BULLETS.length;
//        console.log(bulletsLength);
        context.beginPath();
        for(var i=0; i<bulletsLength;i++){
            var bullet = BULLETS[i];
            bullet.y -=bullet.vY;
            context.strokeStyle = bullet.color;
            context.lineWidth = bullet.width;
            var level = bullet.level;

            context.moveTo(bullet.x,bullet.y);
            context.lineTo(bullet.x,bullet.y-bullet.len);
        }
        context.stroke();
        //检测是否出界
        for(var i=0;i<BULLETS.length;i++){
            var  bullet = BULLETS[i];
            if(bullet.y+bullet.len<0){
                BULLETS.splice(i,1);
            }
        }
    }

    //边界检测
    if(player.y - player.halfHeight<20){
        player.y = 20+player.halfHeight;
    }else if(player.y + player.halfHeight>canvasHeight-20){
        player.y = canvasHeight-20-player.halfHeight;
    }
    if(player.x-player.halfWidth<20){
        player.x = player.halfWidth+20;
    }else if(player.x+player.halfWidth>canvasWidth-20){
        player.x = canvasWidth-20-player.halfWidth;
    }
    //画玩家
    context.fillStyle = player.weapon.color;
    context.beginPath();
    context.moveTo(player.x,player.y-player.halfHeight);
    context.lineTo(player.x-player.halfWidth,player.y+player.halfHeight);
    context.lineTo(player.x+player.halfWidth,player.y+player.halfHeight);
    context.closePath();
    context.fill();

    //助推器效果
    if(player.moveTop){
        context.save();
        context.translate(player.x,player.y+player.halfHeight);
        if(player.flameLength ==20){
            player.flameLength = 15;
        }else{
            player.flameLength = 20;
        }
        context.fillStyle='orange';
        context.beginPath();
        context.moveTo(-5,0);
        context.lineTo(0,player.flameLength);
        context.lineTo(5,0);
        context.closePath();
        context.fill();
        context.restore();
    }
    //道具掉落
    //边界检测
    item.y +=item.vY;
    item.x +=item.vX;
    if((item.x<0)||(item.x+item.width>canvasWidth)){
        item.vX = -item.vX;
    }
    if(item.y>canvasHeight){
        item.reset();
    }
    //碰撞检测
//    console.log(eatTest(player,item));
    if(eatTest(player,item)){

        if(player.weapon.color == item.color){
            player.weapon.level ++;
            if(player.weapon.level > 3){
                player.weapon.level = 3;
            }
        }else{
            player.weapon.level = 1;
            player.weapon.color = item.color;
        }
        item.reset();

    }
    context.fillStyle = item.color;
    context.fillRect(item.x,item.y,item.width,item.height);
    context.fillStyle = '#FFF';
    context.font = 'bold 20px arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('G',(item.x+item.width/2),(item.y+item.height/2));

    if(PLAYGAME){
        //帧数1000/33=30帧
        setTimeout(animate,33);
    }
    //背景音乐重复播放
    if(soundBackground.currentTime>soundBackground.duration-5){
        soundBackground.src = soundBackground.src;
        soundBackground.currentTime = 0;
        soundBackground.play();
    }
}
