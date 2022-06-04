export class Passenger {

    id: number = null
    name: string = null
    birth_date: string = null

    constructor(data?: any){
        this.id = data?.id;
        this.name = data?.name;
        this.birth_date = data?.birth_date
    }
}