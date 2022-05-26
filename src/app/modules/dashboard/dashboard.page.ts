import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    dashboard: any = {
        total_flights: 0,
        total_planes: 0,
        total_tickets: 0
    }

    constructor() { }

    ngOnInit() {
    }

}
