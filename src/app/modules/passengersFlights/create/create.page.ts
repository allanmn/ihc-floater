import { Component, OnInit, ViewChild} from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helper.service';
import { PassengerFlightService } from '../passengerFlight.service';
import { PassengerService } from '../../passengers/passenger.service';
import { FlightService } from '../../flights/flight.service';
import { PassengerFlight } from '../passengerFlight';
import { Passenger } from '../../passengers/passenger';
import { Flight } from '../../flights/flight';

import { CreatePassengerComponent } from '../../passengers/create/create.component';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;

    id: number;
    editing: boolean = false;
    loading: boolean = false;

    passenger: Passenger = null
    flights: Flight[] = []

    passenger_flight: PassengerFlight = new PassengerFlight;

    constructor(
        private passenger_flight_service: PassengerFlightService,
        private flight_service: FlightService,
        private passenger_service: PassengerService,
        private modalController: ModalController,
        private helper_service: HelperService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.id = this.id = this.route.snapshot.paramMap.get("id") ? parseInt(this.route.snapshot.paramMap.get("id")) : null;
        Promise.all([
            this.getFlights()
        ])
        if (this.id) {
            this.editing = true;
            this.get();
        }
    }

    get() {
        this.passenger_flight= new PassengerFlight(this.passenger_flight_service.find(this.id));

        if (!this.passenger_flight.id) {
            this.helper_service.toast('danger', 'Ocorreu um erro ao recuperar dados da aeronave')
        }
    }
    async getFlights(){
        this.flights = this.flight_service.get(['destiny','airplane'])
    }

    async createPassenger() {
        const modal = await this.modalController.create({
            component: CreatePassengerComponent,
            id: null
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();

        if(data){
            this.passenger = data
        }
    }

    save() {
        if (this.id > 0) {
            this.update();
        } else {
            this.store();
        }
    }

    store() {
        try {
            this.passenger_flight.passenger_id = this.passenger_service.create(this.passenger).id

            this.passenger_flight.flight_id = Number(this.passenger_flight.flight_id)

            if(!this.passenger_flight.flight_id){
                this.helper_service.toast('danger', 'Insira um voô valido');
                this.passenger_flight_service.delete(this.passenger_flight.flight_id)
                return
            }

            if(!this.passenger_flight.payed_value){
                this.helper_service.toast('danger', 'Insira o valor pago');
                this.passenger_flight_service.delete(this.passenger_flight.flight_id)
                return
            }

            if(!this.passenger_flight.seatNumber){
                this.helper_service.toast('danger', 'Insira o numero do assento');
                this.passenger_flight_service.delete(this.passenger_flight.flight_id)
                return
            }

            if(this.passenger_flight.seatNumber <= 0){
                this.helper_service.toast('danger', 'Insira o numero do assento válido');
                this.passenger_flight_service.delete(this.passenger_flight.flight_id)
                return
            }

            if(!this.passenger_flight.seatType){
                this.helper_service.toast('danger', 'Insira o tipo do assento');
                this.passenger_flight_service.delete(this.passenger_flight.flight_id)
                return
            }

            if(!this.passenger_flight.payment_method){
                this.helper_service.toast('danger', 'Insira o metodo de pagamento');
                this.passenger_flight_service.delete(this.passenger_flight.flight_id)
                return
            }

            let flight = this.flights.find(flight => this.passenger_flight.flight_id === flight.id)
            if(this.passenger_flight.seatType === "especial"){
                if(this.passenger_flight.seatNumber > flight.airplane.qtdAssentosEspeciais){
                    this.helper_service.toast('danger', 'Número do assento excede as capacidades da aeronave, selecioe um assento válido');
                    this.passenger_flight_service.delete(this.passenger_flight.flight_id)
                    return
                }
            }

            if(this.passenger_flight.seatNumber > flight.airplane.qtdAssentos){
                this.helper_service.toast('danger', 'Número do assento excede as capacidades da aeronave, selecione um assento válido');
                this.passenger_flight_service.delete(this.passenger_flight.flight_id)
                return
            }

            if(this.passenger_flight.payed_value< flight.valorPassagem){
                this.helper_service.toast('danger', 'Valor pago menor que o da passagem para este voô');
                this.passenger_flight_service.delete(this.passenger_flight.flight_id)
                return
            }

            let passengers_flights = this.passenger_flight_service.get([],{})
            let isOccupied = passengers_flights ? passengers_flights.find((ticket) => ticket.flight_id===this.passenger_flight.flight_id && ticket.seatNumber===this.passenger_flight.seatNumber && ticket.seatType===this.passenger_flight.seatType) : null
            if(isOccupied){
                this.helper_service.toast('danger', 'Assento já ocupado');
                this.passenger_flight_service.delete(this.passenger_flight.flight_id)
                return
            }

            let response = this.passenger_flight_service.create(this.passenger_flight);
            this.router.navigateByUrl('/dashboard');
            if (response) {
                this.helper_service.toast('success', 'Passageiro cadastrado com sucesso');
            }

        } catch (error) {
            this.helper_service.toast('danger', 'Ocorreu um erro ao salvar as informações da aeronave.');
            console.error(error)
        }
    }

    update() {
        try {
            let response = this.passenger_flight_service.update(this.passenger_flight);

            if (response) {
                this.helper_service.toast('success', 'Aeronave atualizada com sucesso');
            }

        } catch (error) {
            console.error(error);
            this.helper_service.toast('danger', 'Ocorreu um erro ao atualizar a aeronave')
        }
    }

    async remove(event) {
        const confirm = await this.helper_service.popover(event, 'Tem certeza?', [
            {
                text: 'Cancelar',
                color: 'danger',
                value: false
            },
            {
                text: 'Confirmar',
                color: 'success',
                value: true
            }
        ]);

        await confirm.present();

        confirm.onDidDismiss().then(data => {
            if (data.data){
                this.passenger = null
                this.passenger_flight.passenger_id = null
            }
        });
    }

    numberOnlyValidation(event: any) {
        const pattern = /[0-9.,]/;
        let inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
        }
      }

    debug(){
        console.log(this)
    }
}
