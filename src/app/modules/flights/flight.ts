import { Airplane } from "../airplanes/airplane";
import { Destiny } from "../destiny/destiny";

export class Flight {
    id: number = null;
    dataPartida: Date = null;
    valorPassagem: number = null;
    destiny_id: number = null;
    airplane_id: number = null;

    airplane: Airplane = new Airplane;
    destiny: Destiny = new Destiny;

    constructor(data?){
        this.id = data?.id;
        this.dataPartida = data?.dataPartida;
        this.valorPassagem = data?.valorPassagem;
    }
}