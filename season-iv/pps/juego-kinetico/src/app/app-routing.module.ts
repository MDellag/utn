import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { GameComponent } from './components/game/game.component'
import { LoginComponent } from './components/login/login.component'
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
        path: 'game',
        component: GameComponent,
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
