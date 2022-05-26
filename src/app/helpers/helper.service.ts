import { Injectable } from "@angular/core";
import { PopoverController, ToastController } from "@ionic/angular";
import { ConfirmComponent } from "../components/ConfirmComponent/confirm.component";

@Injectable({
  providedIn: 'root'
})
export class HelperService {
    loader: any;

    constructor(
        private toastr: ToastController,
        private popoverController: PopoverController
    ) {

    }

    async popover (event: any, title: string, buttons: any) {
        return await this.popoverController.create({
            component: ConfirmComponent,
            event: event,
            componentProps: {
                title: title,
                buttons: buttons
            },
            cssClass: 'custom-popover'
        });
    }

    async toast (color: string, message: string, duration: number = 2000, position: any = 'top') {
        const toast = await this.toastr.create({
            message: message,
            duration: duration,
            color: color,
            mode: 'ios',
            position: position,
            buttons: [
                {
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });

        toast.present();
    }
}