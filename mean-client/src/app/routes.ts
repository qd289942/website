import { Routes } from "@angular/router";
import { ProductListComponent } from '../modules/product/product-list/product-list.component';
import { ProductDetailComponent } from '../modules/product/product-detail/product-detail.component';
import { LoginComponent } from '../modules/user/login/login.component';


const routeConfig: Routes = [
    {
        path: '',
        redirectTo: 'login', 
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductListComponent,
        title: 'Product List Page'
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent,
        title: 'Product Detail Page'
    },
    { 
        path: 'login',
        component: LoginComponent,
        title: 'Login Page'
    },
];

export default routeConfig;