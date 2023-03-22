import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'screen/home', pathMatch: 'full' },
    { path: 'index.jsp', redirectTo: 'screen/home' },
    { path: 'screen/home', loadChildren: () => import('./features/home/home.module').then(m => m.Module) },
    { path: 'screen/module1', loadChildren: () => import('./features/module1/module1.module').then(m => m.Module) },
    { path: 'screen/module2', loadChildren: () => import('./features/module2/module2.module').then(m => m.Module) },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
})
export class AppRoutingModule {}
