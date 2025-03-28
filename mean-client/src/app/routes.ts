import { Routes } from "@angular/router";
import { ProductListComponent } from '../modules/product/product-list/product-list.component';
import { ProductDetailComponent } from '../modules/product/product-detail/product-detail.component';


const routeConfig: Routes = [
    {
        path: '',
        component: ProductListComponent,
        title: 'Product List Page'
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
    }
];

export default routeConfig;