import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { BarChartComponent } from './components/bar-chart/bar-chart.component'
import { LoginComponent } from './components/login/login.component'
import { MenuComponent } from './components/menu/menu.component'
import { MenuTwoComponent } from './components/menutwo/menu.component'
import { MyphotosComponent } from './components/myphotos/myphotos.component'
import { PieChartComponent } from './components/pie-chart/pie-chart.component'
import { SplashComponent } from './components/splash/splash.component'

const routes: Routes = [
    {
        path: '',
        component: SplashComponent,
        // loadChildren: () =>
        //     import('./home/home.module').then((m) => m.HomePageModule),
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomePageModule),
    },
    {
        path: 'menu',
        component: MenuComponent,
    },
    {
        path: 'menutwo',
        component: MenuTwoComponent,
    },

    {
        path: 'piechart',
        component: PieChartComponent,
    },
    {
        path: 'barchart',
        component: BarChartComponent,
    },
    {
        path: 'myphotos',
        component: MyphotosComponent,
    },
    {
        path: '**',
        component: SplashComponent,
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
