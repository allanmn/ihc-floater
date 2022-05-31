export class Destiny {

    id: number = null
    name: string = null
    tax: number = null

    constructor(data?: any){
        this.id = data?.id;
        this.name = data?.name;
        this.tax = data?.tax;
    }
}