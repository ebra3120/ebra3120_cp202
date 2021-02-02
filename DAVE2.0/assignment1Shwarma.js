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
    
    "var size = {[Small]: 3.00, [Large]: 5.00};"
    "var protein = {fallafel: 1.20,chicken: 2.50, beef: 4.25, lamb: 4.00};"
    "var TOPPINGS = {turnips:0.25, pickles:0.25, onions:0.25, tomatoes:0.25, hummus:0.50,};"
    "var DRINKS"

    handleInput(sInput){
        let aReturn = []; 

        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                "var size = {[Small]: 3.00, [Large]: 5.00};"
                aReturn.push("Welcome to Mozy's Shawarma.");
                aReturn.push("What size would you like?" );
                aReturn.push("We offer small and large" );
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.PROTEIN;
                this.sSize = sInput;
                "var protein = {fallafel: 1.20,chicken: 2.50, beef: 4.25, lamb: 4.00};"
                aReturn.push("What protein would you like?");
                aReturn.push("We have fallafel, chicken, beef, lamb");
                break;
            case OrderState.PROTEIN:
                 this.stateCur = OrderState.TOPPINGS;
                 this.sSize = sInput;
                 "var toppings = {turnips:0.25, pickles:0.25, onions:0.25, tomatoes:0.25, hummus:0.50,};"
                 aReturn.push("What toppings would you like?");
                 aReturn.push("We have turnips, pickles, onions, tomatoes, humus");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS;
                this.sToppings = sInput;
                aReturn.push("What drinks would you like with that?");
                aReturn.push("We have coke, sprite, fanta, creame soda, water");
                break;
            case OrderState.DRINKS:
                this.stateCur = OrderState.WINGS;
                this.sDrinks = sInput;
                "var drinks = {pop:2.00};"
                aReturn.push("Would you like Hot Wings?");
                break; 
                    
            case OrderState.WINGS:
                    this.isDone(true);
                    "var wings = {hotwings:4.00};"
                if(sInput.toLowerCase != "no"){
                    this.sWings = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings} and your drink is ${this.sDrinks} and a portion of wings?`);
                if(this.sWings){
                    aReturn.push(this.sWings);
                }
                aReturn.push("Your Subtotal for your order is $ ");

                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}