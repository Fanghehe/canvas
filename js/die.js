/**
 * Created by fang on 13-12-30.
 */
//飞机和障碍物
function crashTest(player,star){
    var dX = player.x-star.x,
        dY= player.y-star.y;
    var distance = Math.sqrt(dX*dX+dY*dY);
    return (distance<player.halfWidth+star.radius);
}
//子弹和障碍物
function bulletTest(bullet,star){
    var dX = bullet.x-star.x,
        dY = bullet.y-bullet.vY-bullet.len-star.y;
    var distance = Math.sqrt(dX*dX+dY*dY);
    return (distance<star.radius+10);
}
//道具和飞机
function eatTest(player,item){
   var radius = Math.sqrt((item.width*item.width),(item.height*item.height))/2;
    var dX = item.x+item.width/2 - player.x,
        dY = item.y+item.height/2-player.y;
    var distance = Math.sqrt(dX*dX+dY*dY);
        console.log(distance);
    return (distance<radius+player.halfWidth);
}