class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage("virtual pet images/Food Stock.png");
    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
       }
       getFedTime(lastFed){
        this.lastFed=lastFed;
      }
   
       deductFood(){
         if(this.foodStock>0){
          this.foodStock=this.foodStock-1;
         }
        }
    
        getFoodStock(){
          return this.foodStock;
        }
        display(){
            var x=80,y=120;
            
            imageMode(CENTER);
            
            if(this.foodStock!=0){
              for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                  x=30;
                  y=y+60;
                }
                image(this.image,x,y,70,70);
                x=x+80;
              }
            }
          }
          bedroom(){
            background(bedroom,550,500);  
        }
          
        garden(){
            background(garden,550,500);  
        } 
    
        washroom(){
            background(washroom,550,500); 
        }
}