import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { CONFIG_TOKEN, EuiAppConfig } from '@eui/core';
import { EuiWebToolsService } from '@shared/services/eui-web-tools.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
    // an array to keep all subscriptions and easily unsubscribe
    subs: Subscription[] = [];

    constructor(@Inject(CONFIG_TOKEN) private config: EuiAppConfig,
        private euiWebToolsService: EuiWebToolsService) {
        console.log(config);
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subs.forEach((s: Subscription) => s.unsubscribe());
    }

    ngAfterViewInit(): void {
        console.log(this.euiWebToolsService.isReady, 'this.euiWebToolsService.isReady');
        if (!this.euiWebToolsService.isReady) {
            const renderMap = this.renderMap.bind(this);
            // const updateAjax = this.updateAjax.bind(this);
            // const watchMutations = this.watchMutations.bind(this);
            window.addEventListener('wtReady', function () {
                // Start using $wt API.
                // console.log(window['$wt'].exists('id_deneme'), '$wt exist');
                renderMap();
                // updateAjax();
                // watchMutations();
            }, false);
        } else {
            this.renderMap();
            // this.updateAjax();
            // this.watchMutations();
        }
        // window['$wt'];
    }

    private renderMap() {
        this.euiWebToolsService.renderWebToolWidget('map_participants', {
            service: 'map',
            version: '3.0',
            map: {
                center: [52, 10],
                zoom: 4,
                background: ['positron']
            },
            layers: {
                countries: [{
                    data: ['EU28'],
                    options: {
                        events: {
                            click: 'https://europa.eu/european-union/about-eu/countries/member-countries/{lowercase:CNTR_NAME}_{lang}'
                        },
                        label: true,
                        style: {
                            color: '#4d3d3d',
                            weight: 1,
                            opacity: 1,
                            fillColor: '#f93',
                            fillOpacity: 0.5
                        }
                    },
                }]
            }
        });
    }
}
