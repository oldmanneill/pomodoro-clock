var c=document.getElementById("myCanvas");
var style = c.style;
style.marginLeft="auto";
style.marginRight="auto";
var parentStyle=c.parentElement.style;
parentStyle.textAlign="center";
parentStyle.width = "100%";
var ctx=c.getContext("2d");
function drawCircle(){
  ctx.beginPath();
  ctx.strokeStyle="black";
  ctx.arc(c.width/2,165,100,0,2*Math.PI);
  ctx.lineWidth = 15;
  ctx.stroke();
  return;
}
drawCircle ();
ctx.font = "35px Orbitron";
ctx.textAlign = "center";
var session = 1500;
var breakTime = 300;
var pauseFlag = 0;
var time;//turns into a string with colon
var masterTime = 1500; //start time of either breakTime or session
var switchIt = 0;
var reStartFlag = 0;
var color = "red";
$('#minusBreak').on('click',function breakMinus(){
  if (breakTime/60 != 1){
    breakTime= breakTime-60;
	  $('.breakAdding').html('break: '+breakTime/60);
  }
})
$('#plusBreak').on('click',function breakAdd(){
  breakTime= breakTime+60;
	$('.breakAdding').html('break: '+breakTime/60);
})
$('#minusSession').on('click',function sessionMinus(){
  if (session/60 != 1){
    session = session-60;
	  $('.sessionAdding').html('session: '+session/60);
  }
})
$('#plusSession').on('click',function sessionAdd(){
  session = session+60;
	$('.sessionAdding').html('session: '+session/60);
})

function countDown(i) {
  var int = setInterval(function () {
    hours = Math.floor(i/3600);
    minutes = Math.floor((i-(hours*3600))/60);
    seconds = i-(minutes*60)-(hours*3600);
    switch (seconds){
      case 0: seconds = "00";
        break;
      case 1: seconds = "01";
        break;
      case 2: seconds = "02";
        break;
      case 3: seconds = "03";
        break;
      case 4: seconds = "04";
        break;
      case 5: seconds = "05";
        break;
      case 6: seconds = "06";
        break;
      case 7: seconds = "07";
        break;
      case 8: seconds = "08";
        break;
      case 9: seconds = "09";
        break;
    }
    if(minutes===0 && hours ===0){
      time = ":"+seconds;
    }
    else if (hours !=0 && minutes ==0){
      time = hours+":00:"+seconds;
    }
    else if (hours===0){
      time=minutes+":"+seconds;
    }
    else time=hours+":"+minutes+":"+seconds;
    ctx.fillStyle = "white";
    ctx.fillRect(40,130,165,50);
    ctx.fillStyle = "red"
    ctx.fillText(time,c.width/2,170);
    ctx.beginPath();
    function animateCircle(){
      ctx.strokeStyle=color;
      ctx.arc(c.width/2,165,100,3*Math.PI/2+.0001,3*Math.PI/2-(i/masterTime*(2*Math.PI-.001)));
      ctx.lineWidth = 15;
      ctx.stroke();
    }
    animateCircle();
    i--;
    if (reStartFlag){
      reStartFlag = 0;
      clearInterval(int);
          drawCircle();
    color="red";
      masterTime=session;
      countDown(masterTime);
    }
    if (pauseFlag){
      masterTime = i;
      clearInterval(int);
    }
    if (i==-1){
      clearInterval(int);
      if (!switchIt){
        color="black";
        switchIt = 1;
        $('.workOrBreak').css("color","black");
        $('.workOrBreak').html("Breaktime!");
        masterTime=breakTime;
        countDown(masterTime);
      }
      else{
        color="red";
        switchIt = 0;
        $('.workOrBreak').css("color","red");
        $('.workOrBreak').html("It's time for work!");
        masterTime=session;
        countDown(masterTime);
      }
    }
  }, 1000);
}
function start(){
  if (pauseFlag) {
    drawCircle();
    color="red";
    pauseFlag = 0;
    masterTime=session;
    countDown(masterTime);
  }
  else {
    drawCircle();
    color="red";
    reStartFlag = 1;
  }
}
function pause(){
  if (!pauseFlag){
    pauseFlag = 1;
  }
  else {
    pauseFlag = 0;
    countDown(masterTime);
    console.log(masterTime);
  }
}
countDown(masterTime);