// src/modules/payment/payment.component.ts
import { Component } from '@angular/core';
import { PaymentService } from './payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  template: `
    <div>
      <h2>Online Payment</h2>
      <p>Pay amount：{{amount | currency}}</p>
      <label>
        Paymentmethod：
        <select [(ngModel)]="paymentMethod">
          <option value="paypal">PayPal</option>
          <option value="stripe">Stripe</option>
          <option value="alipay">支付宝</option>
        </select>
      </label>
      <br>
      <button (click)="pay()">Pay right now</button>
    </div>
  `,
  styles: [`
    /* 可根据需求添加样式 */
  `]
})
export class PaymentComponent {
  amount: number = 0; // 此处可根据订单总价动态赋值
  paymentMethod: string = 'paypal';
  constructor(private paymentService: PaymentService, private router: Router) {}
  pay(): void {
    this.paymentService.processPayment(this.amount, this.paymentMethod).subscribe(success => {
      if (success) {
        console.log('Payment succeed');
        // 支付成功后，可跳转至订单页面或显示成功提示
        this.router.navigate(['/orders']);
      } else {
        console.error('Payment failed');
      }
    });
  }
}
