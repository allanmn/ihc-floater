import { Component, OnInit, ViewChild} from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { HelperService } from 'src/app/helpers/helper.service';
import { PassengerFlightService } from '../passengerFlight.service';
import { PassengerFlight } from '../passengerFlight';

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

    passenger: PassengerFlight = new PassengerFlight;

    constructor(
        private passenger_service: PassengerFlightService,
        private helper_service: HelperService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.id = this.id = this.route.snapshot.paramMap.get("id") ? parseInt(this.route.snapshot.paramMap.get("id")) : null;
        if (this.id) {
            this.editing = true;
            this.get();
        }
    }

    get() {
        this.passenger= new PassengerFlight(this.passenger_service.find(this.id));

        if (!this.passenger.id) {
            this.helper_service.toast('danger', 'Ocorreu um erro ao recuperar dados da aeronave')
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
            if(!this.passenger.name){
                this.helper_service.toast('danger','Por favor preencha o nome')
                return
            }
            if(!this.passenger.birth_date){
                this.helper_service.toast('danger','Por favor preencha a data de nascimento')
                return
            }
            this.passenger = new PassengerFlight(this.passenger);
            this.passenger.birth_date = moment(this.passenger.birth_date).format('DD/MM/YYYY')
            let response = this.passenger_service.create(this.passenger);

            if (response) {
                this.helper_service.toast('success', 'Aeronave cadastrada com sucesso');
            }

        } catch (error) {
            this.helper_service.toast('danger', 'Ocorreu um erro ao salvar as informações da aeronave.');
            console.error(error)
        }
    }

    update() {
        try {
            this.passenger.birth_date = moment(this.passenger.birth_date).format('DD/MM/YYYY')
            let response = this.passenger_service.update(this.passenger);

            if (response) {
                this.helper_service.toast('success', 'Aeronave atualizada com sucesso');
            }

        } catch (error) {
            console.error(error);
            this.helper_service.toast('danger', 'Ocorreu um erro ao atualizar a aeronave')
        }
    }

    debug(){
        console.log(this)
    }
}
