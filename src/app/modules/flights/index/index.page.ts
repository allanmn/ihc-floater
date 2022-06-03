import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperService } from 'src/app/helpers/helper.service';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
    @ViewChild('search', { static: false }) search: any;

    loading: boolean = true;
    flights: Array<Flight> = [];

    showFilter: boolean = false;
    filters: any = {
        model: null
    }

    constructor(
        private flight_service: FlightService,
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
            this.flights = [];
            let data = this.flight_service.get(['destiny']);

            if (data) {
                console.log(data)
                for (let flight of data) {
                    this.flights.push(flight);
                }

                if (this.filters.name) {
                    this.flights.filter(a => a.destiny.name.match(this.filters.name))
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
            let response = this.flight_service.delete(id);

            if (response) {
                this.get();
            }
        } catch (error) {
            console.error(error);
            this.helper_service.toast('danger', 'Ocorreu um erro ao remover avião')
        }
    }
}
