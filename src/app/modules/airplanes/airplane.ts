export class Airplane {

    id: number = null
    modelo: string = null
    qtdAssentos: number = null
    qtdAssentosEspeciais: number = null

    constructor(data?: any){
        this.id = data?.id;
        this.modelo = data?.modelo;
        this.qtdAssentos = data?.qtdAssentos;
        this.qtdAssentosEspeciais = data?.qtdAssentosEspeciais;
    }
}