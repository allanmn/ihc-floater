export class Flight {
    id: number = null;
    dataPartida: string = null
    valorPassagem: number = null

    constructor($data){
        this.id = $data['id']
        this.dataPartida = $data['dataPartida']
        this.valorPassagem = $data['valorPassagem']
    }
}