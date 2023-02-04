// finding elements on html

//egg.classList.add('img');
//let egg=document.querySelector('#egg');
let bascket=document.querySelector('#basket');
// create random position of if images
let backgroundAudio=document.createElement('audio');
let eggBrakeSound=document.createElement('audio');
backgroundAudio.setAttribute('src','audio/backgroundAudio.mp3');
eggBrakeSound.setAttribute('src','Audio/eggBrake.mp3');
//backgroundAudio.autoplay=true;
//backgroundAudio.load();
backgroundAudio.play();

let basketXPos=Math.ceil(Math.random()*window.innerWidth);

let basketYPos=window.innerHeight-bascket.offsetHeight;
let basketImgWidth=bascket.width;
let windowWidth=window.innerWidth;


let basketHeight=bascket.offsetHeight;
let score=0;
let scoreBoard=document.querySelector('div.score');
scoreBoard.innerHTML=`<p align="center" >${score}</p>`;

bascket.style.left=basketXPos+'px';
bascket.style.top=basketYPos+'px';
let currentPos=Number(bascket.style.left.slice(0,-2));
///
function createEgg(){
    let egg=document.createElement('img');
    egg.setAttribute('src','images/egg.png');
    egg.style.left=(Math.ceil(Math.random()*window.innerWidth)-egg.style.width)+'px';
    document.body.append(egg);
    return egg;
}
function checkHunted(_egg){
    if(Math.abs(Number(_egg.style.left.slice(0,-2))-Number(bascket.style.left.slice(0,-2)))<=100){
       return true;
    }
    return false;
}

function eggMovement(_egg){
    let eggYPos=0;
    let eggHeight=_egg.offsetHeight;
    let windowHeight=window.innerHeight;
   
let timer=setInterval(function(){
    _egg.style.top=eggYPos+'px';
    eggYPos+=5;
    if(eggYPos>=windowHeight-eggHeight){
        if(checkHunted(_egg)){
            huntEgg(_egg);
            
            clearInterval(timer);
            eggMovement(createEgg());
        }  
        else{
        _egg.setAttribute('src','images/brokenEgg.png');
        eggBrakeSound.play();
        
        clearInterval(timer);
        alert("you lose the game");
        }
    }
},50);

}

//move basket image
function moveLeft(){
    
    if(currentPos-20>0){
        currentPos-=20;
        bascket.style.left=currentPos+'px';
    }
}
function moveRight(){
    
    if(currentPos+40<windowWidth-basketImgWidth){
        currentPos+=20;
        bascket.style.left=currentPos+'px';
    }

}

document.addEventListener('keydown',function(ev){
    if(ev.key=='ArrowRight'){
        moveRight();
    }
    else if(ev.key=='ArrowLeft'){
       moveLeft();
    }
});
//hundle score


function huntEgg(_egg){
    score++;
    scoreBoard.innerHTML=`<h1>${score}</h1>`;
    _egg.remove();

}
eggMovement(createEgg());

