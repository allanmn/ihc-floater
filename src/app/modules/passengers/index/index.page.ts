import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { ConfirmComponent } from 'src/app/components/ConfirmComponent/confirm.component';
import { HelperService } from 'src/app/helpers/helper.service';
import { CreatePassengerComponent } from '../create/create.component';
import { Passenger } from '../passenger';
import { PassengerService } from '../passenger.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
    @ViewChild('search', { static: false }) search: any;

    loading: boolean = true;
    passengers: Passenger[] = [];

    showFilter: boolean = false;
    filters: any = {
        model: null
    }

    constructor(
        private passenger_service: PassengerService,
        private modalController: ModalController,
        private helper_service: HelperService,
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.get();
    }

    toggleSearch() {
        this.showFilter = !this.showFilter;
        if (this.showFilter) {
            setTimeout(() => {
                this.search.setFocus();
            }, 100)
        }
    }

    async create() {
        const modal = await this.modalController.create({
            component: CreatePassengerComponent,
            id: null
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();

        if(data){
            this.get()
        }
    }
    async update(index: number) {
        const modal = await this.modalController.create({
            component: CreatePassengerComponent,
            componentProps: {
                id: this.passengers[index].id
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
    
        if(data){
            this.get()
        }
    }

    get(ionRefresher: any = null) {
        try {
            this.passengers = [];
            let data = this.passenger_service.get();

            if (data) {
                for (let passenger of data) {
                    this.passengers.push(passenger);
                }

                if (this.filters.name) {

                    this.passengers.filter(a => a.name.match(this.filters.name))
                }

            } else {

            }
            if (ionRefresher) {
                ionRefresher.target.complete();
            }

            this.loading = false;
        } catch (error) {
            this.helper_service.toast('danger', 'Ocorreu um erro ao recuperar os dados das aeronaves.');
            console.log(error)
        }
    }

    async remove(event, id) {
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
            if (data.data) this.delete(id);
        });
    }

    async delete(id: number) {
        try {
            let response = this.passenger_service.delete(id);

            if (response) {
                this.get();
            }
        } catch (error) {
            console.log(error);
            this.helper_service.toast('danger', 'Ocorreu um erro ao remover passageiro')
        }
    }
}
