

/**
 * Item object 
 * @export
 * @class Item
 */
export class ScannedItem {
    id: string;
    name:string;
    details:string;
    quantity:number;
    constructor(){
        this.id = "";
        this.name = "";
        this.details = "";
        this.quantity = 1;
    }
}
