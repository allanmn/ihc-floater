export class PassengerFlight {

    passenger_id: number = null
    flight_id: number = null
    solicitations: string = null
    payment_method: string = null
    payed_value: number = null

    constructor(data?: any){
        this.passenger_id = data?.passenger_id;
        this.flight_id = data?.flight_id
        this.solicitations = data?.solicitations;
        this.payment_method = data?.payment_method
        this.payed_value = data?.payed_value
    }
}