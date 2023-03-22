import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    getUserState,
    UserState,
} from '@eui/core';
import { Observable, Subscription } from 'rxjs';

import {
    EclMenuItemSelectEvent,
    EclSiteHeaderLoginEvent,
    EclSiteHeaderSearchEvent,
} from '@eui/ecl';
import { EuiWebToolsService } from '@shared/services/eui-web-tools.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    userInfos: UserState;
    // Observe state changes
    userState: Observable<UserState>;
    // an array to keep all subscriptions and easily unsubscribe
    subs: Subscription[] = [];

    isLoggedIn = false;

    constructor(
        private euiWebToolsService: EuiWebToolsService,
        private store: Store<any>,
    ) {
        this.userState = this.store.select(getUserState);
        this.subs.push(this.userState.subscribe((user: UserState) => {
            this.userInfos = { ...user };
        }));
    }

    ngAfterViewInit(): void {
        console.log(this.euiWebToolsService.isReady, 'this.euiWebToolsService.isReady');
        if (!this.euiWebToolsService.isReady) {
            const renderMap = this.renderMap.bind(this);
            const renderTranslate = this.renderTranslate.bind(this);
            const renderCc2 = this.renderCc2.bind(this);
            // const updateAjax = this.updateAjax.bind(this);
            // const watchMutations = this.watchMutations.bind(this);
            window.addEventListener('wtReady', function () {
                // Start using $wt API.
                // console.log(window['$wt'].exists('id_deneme'), '$wt exist');
                renderMap();
                renderTranslate();
                renderCc2();
                // updateAjax();
                // watchMutations();
            }, false);
        } else {
            this.renderMap();
            this.renderTranslate();
            this.renderCc2();
            // this.updateAjax();
            // this.watchMutations();
        }
        // window['$wt'];
    }

    ngOnInit(): void {

    }

    ngOnDestroy() {
        this.subs.forEach((s: Subscription) => s.unsubscribe());
    }

    onLogin(evt: EclSiteHeaderLoginEvent) {
        this.isLoggedIn = true;
        console.log(evt);
    }

    onLogout(evt: MouseEvent) {
        this.isLoggedIn = false;
        evt.preventDefault();
        console.log('logout');
    }

    onSearch(evt: EclSiteHeaderSearchEvent) {
        console.log(evt);
    }

    onMenuItemSelected(evt: EclMenuItemSelectEvent) {
        console.log('menu item selected', evt);
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

    private renderTranslate(): void {
        this.euiWebToolsService.renderWebToolWidget('translate_button', {
            service: 'etrans',
            languages: {
                // 'source': 'fr',
                exclude: [],
            },
            dynamic: true,
            strict: true,
            // 'lang': 'fr',
            renderAs: {
                icon: true,
                button: true,
                link: true,
            },
        });
    }

    private renderCc2() {
        return this.euiWebToolsService.loadWebToolWidget({
            utility: 'cck',
            url: 'https://my.ec.europa.eu/cookie-policy_{lang}',
        }).then(() => {
            console.log(window['$wt'].cookie, 'coookiee instance');
            console.log(window['$wt'].cookie.get('cck1'), 'coookiee');
            console.log(window['$wt'], 'coookiee');
            window.addEventListener('cck_banner_displayed', (evt) => {
                console.log(evt, 'cck_banner_displayed');
            });
            window.addEventListener('cck_all_accepted', (evt) => {
                console.log(evt, 'cck_all_accepted');
            });
            window.addEventListener('cck_technical_accepted', (evt) => {
                console.log(evt, 'cck_technical_accepted');
            });
            window.addEventListener('cck_banner_hidden', (evt) => {
                console.log(evt, 'cck_banner_hidden');
            });
        });
    }
}
