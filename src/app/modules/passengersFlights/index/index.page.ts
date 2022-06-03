import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { ConfirmComponent } from 'src/app/components/ConfirmComponent/confirm.component';
import { HelperService } from 'src/app/helpers/helper.service';
import { CreatePage } from '../create/create.page';
import { PassengerFlight } from '../passengerFlight';
import { PassengerFlightService } from '../passengerFlight.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
    @ViewChild('search', { static: false }) search: any;

    loading: boolean = true;
    passengers: PassengerFlight[] = [];

    showFilter: boolean = false;
    filters: any = {
        model: null
    }

    constructor(
        private passenger_service: PassengerFlightService,
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
            console.error(error)
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
            console.error(error);
            this.helper_service.toast('danger', 'Ocorreu um erro ao remover passageiro')
        }
    }
}
