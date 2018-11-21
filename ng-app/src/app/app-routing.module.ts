import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { GuardService } from './services/guard.service'

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'app',
    canLoad: [GuardService],
    loadChildren: './modules/core/core.module#CoreModule'
  },
  {
    path: 'auth/login',
    loadChildren: './modules/auth/login/login.module#LoginModule'
  },
  {
    path: 'auth/signup',
    loadChildren: './modules/auth/signup/signup.module#SignupModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
