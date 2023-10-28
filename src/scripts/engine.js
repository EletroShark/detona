const state = {
  view: {
  squares:document.querySelectorAll(".square"),
enemy:document.querySelector(".enemy"),
timeLeft:document.querySelector("#time-left"),
score:document.querySelector("#score"),
live:document.querySelector("#live")

},
 

  values:{
  
   gameVelocity:600,
hitPosition:0,
result:0,
curretTime:60,
lives:3,
},
actions:{
  timerId : setInterval(randomSquare,600),
    countDonwTimerId: setInterval(countDonw,1000),
}
}


function countDonw(){
  state.values.curretTime--;
  state.view.timeLeft.textContent =state.values.curretTime;
  if(state.values.curretTime <=0){
    clearInterval(state.actions.countDonwTimerId);
    clearInterval(state.actions.timerId);
alert("Game Over! o seu resultado foi "+ state.values.result);
  }

  }



function randomSquare(){
  state.view.squares.forEach((square)=>{

    square.classList.remove("enemy");
  })

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition =randomSquare.id;



}


function playSound(audioName){
  let audio = new Audio(`./src/audio/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function resetGame(state) {
  state.values.curretTime = 60;
  state.values.result = 0;
  state.values.lives = 3;
}


function addListenerHitBox(){
state.view.squares.forEach((square)=>{
  square.addEventListener("mousedown",()=>{
if(square.id === state.values.hitPosition){
state.values.result++;
state.view.score.textContent = state.values.result;
state.values.hitPosition=null;
playSound("hit");
}else {
  
  state.values.lives--;
  state.view.live.textContent = state.values.lives
  
  if(state.values.lives <= 0){
    alert("Game Over, você errou muito tente de novo");
    resetGame(state);
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;
    state.view.live.textContent = state.values.lives;
}

}


  });

})


}


function initialize(){


  addListenerHitBox();
}


initialize();