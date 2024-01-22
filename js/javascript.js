// Petite note : le noeud "game-over" est existant dans le HTML, mais en display "none". Lorsque la partie se termine
// vous pouvez l'afficher et cacher le noeud "game"
let score;
let life;
let game;
let gameOver;

let currentScore = 0;
let currentLife = 3;

let fruits = [];


window.addEventListener("load",()=>{

    score = document.querySelector("#score");
    life = document.querySelector("#life");
    game = document.querySelector("#game");
    gameOver = document.querySelector("#game-over");
    
    tickGeneral();
    tickFruit();

    gameOver.addEventListener("click", () => {
        currentScore = 0;
        score.textContent = currentScore;
        currentLife = 3;
        life.textContent = currentLife;

        gameOver.style.display = "none";
        game.style.display = "block";
        tickFruit();
        tickGeneral()
    })
})

let minTime = 0;
let maxTime = 1000;
const tickGeneral = () =>{

    for(let i = 0; i < fruits.length; i++){

        let alive = fruits[i].tick();

        //si le sprite est mort, remove de la liste
        if(!alive){
            //à l'index 'i', retire 1
            fruits.splice(i, 1);
            //recule le loop d'un index
            i--;
        }
    }

    if(currentLife != 0)
        window.requestAnimationFrame(tickGeneral);
    else
    {
        gameOver.style.display = "block";
        game.style.display = "none";
        for(let i = 0; i < fruits.length; i++){
            fruits[i].node.remove();
            fruits.splice(i, 1);
            i--;
        }

     
    }
}

const tickFruit = () =>{

    let rnd = Math.floor(Math.random()*maxTime+minTime);

    if(currentLife != 0)
        setTimeout( () => {

            fruits.push(new Fruit("fruit-"+fruits.length));
            tickFruit();
        },rnd);
}
