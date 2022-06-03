import { Component, OnInit, ViewChild} from '@angular/core';
import { IonContent, ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import { HelperService } from 'src/app/helpers/helper.service';
import { Passenger } from '../passenger';
import { PassengerService } from '../passenger.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreatePassengerComponent implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;

    id: number;
    editing: boolean = false;
    loading: boolean = false;

    passenger: Passenger = new Passenger;

    constructor(
        private passenger_service: PassengerService,
        private helper_service: HelperService,
        private modalController: ModalController,
        private navParams: NavParams
    ) {
        this.id = this.navParams.get('id')
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        if (this.id) {
            this.editing = true;
            this.get();
        }
    }

    get() {
        this.passenger= new Passenger(this.passenger_service.find(this.id));

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
            this.passenger = new Passenger(this.passenger);
            this.passenger.birth_date = moment(this.passenger.birth_date).format('DD/MM/YYYY')
            let response = this.passenger_service.create(this.passenger);

            if (response) {
                this.helper_service.toast('success', 'Aeronave cadastrada com sucesso');
            }

            this.modalController.dismiss();
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
                this.modalController.dismiss();
            }

        } catch (error) {
            console.error(error);
            this.helper_service.toast('danger', 'Ocorreu um erro ao atualizar a aeronave')
        }
    }

    async dismiss() {
        await this.modalController.dismiss(this.passenger);
    }

    debug(){
        console.log(this)
    }
}
