import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EuiWebToolsService {
    config = { loaderUrl: 'https://europa.eu/webtools/load.js' };
    isReady: boolean;

    constructor() {
    }

    loadWebToolWidget(config: object) {
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.setAttribute('type', 'application/json');
            script.innerHTML = JSON.stringify(config);
            script.onerror = (error) => {
                document.body.removeChild(script);
                reject(error);
            };
            document.body.appendChild(script);
            resolve();
        });
    }

    renderWebToolWidget(ref: string | HTMLElement, config: object): void {
        window['$wt'].render(ref, config);
    }

    loadLoadJs() {
        let vm = this;
        return new Promise<void>((resolve, reject) => {
            // check that same script is not loaded in the BODY
            const script = document.createElement('script');
            script.setAttribute('src', this.config.loaderUrl);
            script.setAttribute('defer', '');
            // script.setAttribute('async', '');
            script.setAttribute('type', 'text/javascript');
            window.addEventListener('wtReady', function () {
                // Start using $wt API.
                vm.isReady = true;
                resolve();
            });
            script.onerror = (error) => {
                document.body.removeChild(script);
                reject(error);
            };
            document.body.appendChild(script);

        });
    }
}