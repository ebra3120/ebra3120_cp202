const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    PROTEIN:   Symbol("protein"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    WINGS:  Symbol("Wings")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sProtein = ""; 
        this.sToppings = ""; 
        this.sDrinks = ""; 
        this.sWings = ""; 
        this.sItem = "Shwarma";
    }
    
    handleInput(sInput){
        var size = {"small": 3.00, "large": 5.00};
        var protein = {"fallafel": 1.20,"chicken": 2.50, "beef": 4.25, "lamb": 4.00};
        var toppings = {"turnips":0.25, "pickles":0.25, "onions":0.25, "tomatoes":0.25, "hummus":0.50,}; 
        var drinks = {"coke":2.00, "sprite":2.00, "fanta":2.00, "creamesoda":2.00, "water":1.50,} ;
        let aReturn = []; 

        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Mozy's Shawarma.");
                aReturn.push("What size would you like?" );
                aReturn.push("We offer small and large" );
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.PROTEIN;
                this.sSize = sInput;               
                aReturn.push("What protein would you like?");
                aReturn.push("We have fallafel, chicken, beef, lamb");
                break;
            case OrderState.PROTEIN:
                 this.stateCur = OrderState.TOPPINGS;
                 this.sProtein = sInput; 
                 aReturn.push("What toppings would you like?");
                 aReturn.push("We have turnips, pickles, onions, tomatoes, hummus");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS;
                this.sToppings = sInput;
                aReturn.push("What drinks would you like with that?");
                aReturn.push("We have coke, sprite, fanta, creamesoda, water");
                break;
            case OrderState.DRINKS:
                this.stateCur = OrderState.WINGS;
                this.sDrinks = sInput;
                aReturn.push("Would you like Hot Wings?");
                break; 
                    
            case OrderState.WINGS:
                    this.isDone(true);
                if(sInput.toLowerCase != "no"){
                    this.sWings = sInput;
                }


                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sProtein} ${this.sItem} with ${this.sToppings} and your drink is ${this.sDrinks} and a portion of wings?`);
                if(this.sWings){
                    aReturn.push(this.sWings);
                }


                var total1;
                total1=size[this.sSize]+protein[this.sProtein]+drinks[this.sDrinks];
                

                var toppingPrice=0;
                for(var i = 0; i < toppings.length; i++) {
                    if(this.sToppings == toppings[i]){
                    toppingPrice += toppings[i];
                    }
                }
            
                

                var total; 
                var wings;
                wings = 4.50;
                total = total1 + toppingPrice + wings;


                aReturn.push("Your Subtotal for your order is ",total);


                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}