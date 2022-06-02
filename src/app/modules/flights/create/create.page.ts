import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { HelperService } from 'src/app/helpers/helper.service';
import { Airplane } from '../../airplanes/airplane';
import { AirPlaneService } from '../../airplanes/airplane.service';
import { Destiny } from '../../destiny/destiny';
import { DestinyService } from '../../destiny/destiny.service';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;

    id: number;
    editing: boolean = false;
    loading: boolean = true;
    loading_destinations: boolean = true;
    loading_airplanes: boolean = true;

    flight: Flight = new Flight;

    destinations: Array<Destiny> = [];
    airplanes: Array<Airplane> = [];
    destiny_id: string = null;
    airplane_id: string = null;

    constructor(
        private airplane_service: AirPlaneService,
        private destiny_service: DestinyService,
        private flight_service: FlightService,
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
        this.getAirplanes();
        this.getDestinations();
    }

    getAirplanes() {
        let data = this.airplane_service.get();

        if (data) {
            for (let airplane of data) {
                this.airplanes.push(new Airplane(airplane));
            }
        }

        this.loading_airplanes = false;
    }

    getDestinations() {
        let data = this.destiny_service.get();

        if (data) {
            for (let destiny of data) {
                this.destinations.push(new Destiny(destiny));
            }
        }

        this.loading_destinations = false;
    }

    get() {
        this.flight = this.flight_service.find(this.id);

        this.airplane_id = this.flight.airplane_id.toString();
        this.destiny_id = this.flight.destiny_id.toString();

        if (!this.flight.id) {
            this.helper_service.toast('danger', 'Ocorreu um erro ao recuperar dados da aeronave')
        }
    }

    save() {
        if (!this.flight.valorPassagem) this.helper_service.toast('warning', 'Informe um valor da passagem.')
        if (!this.flight.dataPartida) this.helper_service.toast('warning', 'Informe uma data de partida.')
        if (!this.airplane_id) this.helper_service.toast('warning', 'Selecione uma aeronave.')
        if (!this.destiny_id) this.helper_service.toast('warning', 'Selecione um destino.')

        this.flight.airplane_id = parseInt(this.airplane_id);
        this.flight.destiny_id = parseInt(this.destiny_id);

        if (this.id > 0) {
            this.update();
        } else {
            this.store();
        }
    }

    store() {
        try {
            let response = this.flight_service.create(this.flight);

            if (response) {
                this.helper_service.toast('success', 'Aeronave cadastrada com sucesso');
            }

            this.router.navigateByUrl('/flights');
        } catch (error) {
            this.helper_service.toast('danger', 'Ocorreu um erro ao salvar as informações da aeronave.');
            console.log(error)
        }
    }

    update() {
        try {

            let response = this.flight_service.update(this.flight);

            if (response) {
                this.helper_service.toast('success', 'Aeronave atualizada com sucesso');
                this.router.navigateByUrl('/flights');
            }

        } catch (error) {
            console.log(error);
            this.helper_service.toast('danger', 'Ocorreu um erro ao atualizar a aeronave')
        }
    }
}
