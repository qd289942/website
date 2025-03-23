// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () => import('../modules/product/product.module').then(m => m.ProductModule)
  },
  /*{
    path: 'cart',
    loadChildren: () => import('../modules/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'user',
    loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('../modules/order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('../modules/payment/payment.module').then(m => m.PaymentModule)
  },*/
  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
