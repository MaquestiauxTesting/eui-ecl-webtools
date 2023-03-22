import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { EclAllModule } from '@eui/ecl';

@NgModule({
    imports: [
        RouterModule,
        EclAllModule,
        TranslateModule,
    ],
    declarations: [
    ],
    exports: [
        RouterModule,
        EclAllModule,
        TranslateModule,
    ],
})
export class SharedModule {}
