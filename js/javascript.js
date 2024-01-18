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

class Fruit{

    constructor(id){
        console.log("New fruit!");
        this.node = document.createElement("div");
        this.fruitId = Math.floor(Math.random()*6)+1;
        this.node.id = id;
        this.node.classList.add("fruit");
        this.node.classList.add("fruit_"+this.fruitId);
        document.querySelector("#game").append(this.node);
        
        this.node.style.left = 450+"px";
        this.node.style.bottom = -150+"px";
   

        //une vitesse constante
        this.speedY = -25;
        
        //un rnd de 0 à 5 moins un rnd de 0 à 5 donne [-5,5]
        this.speedX = Math.random()*10 - Math.random()*10;
        this.velocityY = 0.5; //acceleration ou gravité

        this.node.addEventListener("mousemove", () => {


            if(this.node.classList.contains("fruit_"+this.fruitId))
            {
                console.log("Slash!!")
                this.node.classList.remove("fruit_"+this.fruitId);
                this.node.classList.add("fruit_"+this.fruitId+"-cut");
                
                //modifie l'affichage du score
                score.textContent = ++currentScore;
            }
            


        })
    }

    tick()
    {
        let alive = true;
        //la vitesse sera augmente à chaque call avec la gravité
        this.speedY += this.velocityY;
        //offsetTop donne la position par rapport au parent
        let posY = this.node.offsetTop;
        let posX = this.node.offsetLeft;

        //incremente la position avec la vitesse
        posY += this.speedY;
        posX += this.speedX;

        //bouge notre objet vers le bas
        this.node.style.top = posY+"px";
        this.node.style.left = posX+"px";
   

        if(posY == 200)
        {
            alive = false;
        }

        if(posY > 500){

            alive = false;
            this.node.remove();
            
            //modifie l'affichage des vies si nécéssaire
            if(this.node.classList.contains("fruit_"+this.fruitId))
                life.textContent = --currentLife;      
        }

        return alive;
    }


}


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
