import { Component, OnDestroy } from '@angular/core';
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

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
    userInfos: UserState;
    // Observe state changes
    userState: Observable<UserState>;
    // an array to keep all subscriptions and easily unsubscribe
    subs: Subscription[] = [];

    isLoggedIn = false;

    constructor(
        private store: Store<any>,
    ) {
        this.userState = this.store.select(getUserState);
        this.subs.push(this.userState.subscribe((user: UserState) => {
            this.userInfos = { ...user };
        }));
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
}
