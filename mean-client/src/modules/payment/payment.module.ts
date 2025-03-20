// src/modules/payment/payment.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { RouterModule, Routes } from '@angular/router';
import { PaymentService } from './payment.service';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: PaymentComponent }
];

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  providers: [PaymentService]
})
export class PaymentModule { }
