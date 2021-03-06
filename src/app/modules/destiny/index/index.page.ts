import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { ConfirmComponent } from 'src/app/components/ConfirmComponent/confirm.component';
import { HelperService } from 'src/app/helpers/helper.service';
import { Destiny } from '../destiny';
import { DestinyService } from '../destiny.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
    @ViewChild('search', { static: false }) search: any;

    loading: boolean = true;
    destinations: Array<Destiny> = [];

    showFilter: boolean = false;
    filters: any = {
        model: null
    }

    constructor(
        private airplane_service: DestinyService,
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

    get() {
        try {
            this.destinations = [];
            let data = this.airplane_service.get();

            if (data) {
                for (let airplane of data) {
                    this.destinations.push(airplane);
                }

                if (this.filters.name) {
                    this.destinations.filter(d => d.name.match(this.filters.name))
                }
            } else {

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
            let response = this.airplane_service.delete(id);

            if (response) {
                this.get();
            }
        } catch (error) {
            console.error(error);
            this.helper_service.toast('danger', 'Ocorreu um erro ao remover avi??o')
        }
    }
}
