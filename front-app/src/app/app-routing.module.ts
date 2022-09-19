import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './shared/guards/check-login.guard';
import { CheckSessionGuard } from './shared/guards/check-session.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  { 
    path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [ CheckSessionGuard ]
  },
  { 
    path: 'notFound', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [ CheckSessionGuard ]
  },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
    canActivate: [ CheckLoginGuard ]
  }, { 
    path: 'facturas', 
    loadChildren: () => import('./pages/facturas/facturas.module').then(m => m.FacturasModule),
    canActivate: [ CheckSessionGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
