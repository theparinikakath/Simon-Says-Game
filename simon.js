let gameSeq=[];
let userSeq=[];
let started=false;
let level=0;
let btns=['yellow','red','green','purple']
let h2=document.querySelector('h2');

document.addEventListener('keypress',function(){
    if(started==0){
        console.log("game is started");
        started=true;
        levelUp();
    }
});
function btnflash(btn)
{
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);    //removed after 1 sec
}
function levelUp()
{
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randidx=Math.floor(Math.random()*3);
    let randcol=btns[randidx];
    let randbtn=document.querySelector(`.${randcol}`);
    gameSeq.push(randcol);
    console.log(gameSeq);
    btnflash(randbtn);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

function checkans(idx){
    //console.log("curr level: ",level);
    //idx=level-1;
    if(userSeq[idx]==gameSeq[idx]){
        // console.log('same value');
        if(userSeq.length==gameSeq.length)
            setTimeout(levelUp,1000);//if the same color is generated again we will be able to see the difference with this.        
    }
    else{
        h2.innerHTML=`Game over! Your score was <b>${level}</b><br><br> Press any key to start again!`;
        document.querySelector('body').style.backgroundColor='red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor='white';

        },150);
        reset();
    }   
}

function btnpress(){
    //console.log(this);
    let btn=this;
    btnflash(btn);

    usercolor=btn.getAttribute('id');
    userSeq.push(usercolor);

    checkans(userSeq.length-1);
}
let allbtns=document.querySelectorAll('.btn');
for(btn of allbtns){
    btn.addEventListener('click',btnpress);
}