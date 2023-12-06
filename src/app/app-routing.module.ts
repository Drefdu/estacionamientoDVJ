import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guard.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [GuardGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'starting',
    pathMatch: 'full'
  },
  {
    path: 'starting',
    loadChildren: () => import('./starting/starting.module').then( m => m.StartingPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'estacionamientos',
    canActivate: [GuardGuard],
    loadChildren: () => import('./estacionamientos/estacionamientos.module').then( m => m.EstacionamientosPageModule)
  },
  {
    path: 'about',
    canActivate: [GuardGuard],
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'estacionamientoj',
    canActivate: [GuardGuard],
    loadChildren: () => import('./estacionamientoj/estacionamientoj.module').then( m => m.EstacionamientojPageModule)
  },
  {
    path: 'estacionamiento-i',
    canActivate: [GuardGuard],
    loadChildren: () => import('./estacionamiento-i/estacionamiento-i.module').then( m => m.EstacionamientoIPageModule)
  },
  {
    path: 'perfil',
    canActivate: [GuardGuard],
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
