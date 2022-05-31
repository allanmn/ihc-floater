import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { HelperService } from 'src/app/helpers/helper.service';
import { Destiny } from '../destiny';
import { DestinyService } from '../destiny.service';

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

    destiny: Destiny = new Destiny;

    constructor(
        private destiny_service: DestinyService,
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
        this.destiny = new Destiny(this.destiny_service.find(this.id));

        if (!this.destiny.id) {
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
            this.destiny = new Destiny(this.destiny);

            let response = this.destiny_service.create(this.destiny);

            if (response) {
                this.helper_service.toast('success', 'Aeronave cadastrada com sucesso');
                this.router.navigateByUrl('/destinations');
            }

        } catch (error) {
            this.helper_service.toast('danger', 'Ocorreu um erro ao salvar as informações da aeronave.');
            console.log(error)
        }
    }

    update() {
        try {

            let response = this.destiny_service.update(this.destiny);

            if (response) {
                this.helper_service.toast('success', 'Aeronave atualizada com sucesso');
                this.router.navigateByUrl('/airplanes');
            }

        } catch (error) {
            console.log(error);
            this.helper_service.toast('danger', 'Ocorreu um erro ao atualizar a aeronave')
        }
    }
}
