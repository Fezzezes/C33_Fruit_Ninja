class Fruit{

    constructor(id){

        console.log("New fruit!");
        //fruit id aléatoire (détermine le style css)
        this.fruitId = Math.floor(Math.random()*6)+1;

        //crée le div avec id et classes
        this.node = document.createElement("div");
        this.node.id = id;
        this.node.classList.add("fruit");
        this.node.classList.add("fruit_"+this.fruitId);
        //child de #game
        document.querySelector("#game").append(this.node);

        
        //position de départ
        this.node.style.left = 450+"px";
        this.node.style.bottom = -150+"px";
   
        //une vitesse constante
        this.speedY = -25;
        
        //un rnd de 0 à 5 moins un rnd de 0 à 5 donne [-5,5]
        this.speedX = Math.random()*10 - Math.random()*10;
        this.velocityY = 0.5; //acceleration ou gravité

        //on mouse over
        this.node.addEventListener("mouseover", () => {

            //si le fruit n'est pas déjà coupé
            if(this.node.classList.contains("fruit_"+this.fruitId))
            {
                console.log("Slash!!")
                //identifie le fruit comme étant coupé
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
   
        //le fruit est offscreen
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