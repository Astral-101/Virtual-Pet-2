var milkBottleImage;


class Food{
    constructor(){
        this.foodStockRef = database.ref('foodStock')
        this.image = loadImage("Images/Milk.png")
 

    }

    display(){
        var x = 10, y = 10;
        image(this.image, 120, 220, 70, 70);

        if (this.foodStock != 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 === 0) {
                    x = 10;
                    y = y + 50;
                    
                }
                x = x + 10;
                image(this.image,x,y,50,50);
            }



        }
    }

    getFoodStock(data){
        foodS = data.val();

    
    
    }
}
