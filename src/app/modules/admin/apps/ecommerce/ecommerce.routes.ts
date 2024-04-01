import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { InventoryComponent } from 'app/modules/admin/apps/ecommerce/inventory/inventory.component';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { InventoryListComponent } from 'app/modules/admin/apps/ecommerce/inventory/list/inventory.component';
import { UnitsComponent } from './inventory/units/units.component';
import { UnitCategoriesComponent } from './inventory/unit-categories/unit-categories.component';
import { GroupsComponent } from './inventory/Products/groups/groups.component';
import { PriceListComponent } from './inventory/Products/price-list/price-list.component';
import { CategoriesComponent } from './inventory/Products/categories/categories.component';
import { ProductsComponent } from './inventory/Products/products/products.component';

export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'product',
    },
    {
        path     : 'product',
        component: InventoryComponent,
        children : [
            {
                path     : '',
                component: InventoryListComponent,
           
            },
        ],
    },
    {
        path     : 'units',
        component: UnitsComponent,
        children : [
            {
                path     : '',
                component: UnitsComponent,
             },
        ],
    }, {
        path     : 'Categories',
        component: UnitCategoriesComponent,
        children : [
            {
                path     : '',
                component: UnitCategoriesComponent,
             },
        ],
    },{
        path     : 'Products',
        component: GroupsComponent,
        children : [
            {
                path     : 'Groups',
                component: GroupsComponent,
             },
        ],
    },{
        path     : 'Products',
        component: PriceListComponent,
        children : [
            {
                path     : 'PriceList',
                component: PriceListComponent,
             },
        ],
    },{
        path     : 'Products',
        component: CategoriesComponent,
        children : [
            {
                path     : 'categories',
                component: CategoriesComponent,
             },
        ],
    },{
        path     : 'Products',
        component: ProductsComponent,
        children : [
            {
                path     : 'product',
                component: ProductsComponent,
             },
        ],
    }
] as Routes;
