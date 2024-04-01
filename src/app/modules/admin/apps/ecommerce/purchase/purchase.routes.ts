import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { InventoryComponent } from 'app/modules/admin/apps/ecommerce/inventory/inventory.component';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { InventoryListComponent } from 'app/modules/admin/apps/ecommerce/inventory/list/inventory.component';
import { RequisitionHistoryComponent } from './requisition-history/requisition-history.component';
import { NewPrchaseReqComponent } from './new-prchase-req/new-prchase-req.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NewOrderComponent } from './new-order/new-order.component';



export default [

    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'purchase',
    },
    {
        path     : 'RequisitionHistory',
        component: RequisitionHistoryComponent,
        // children : [
        //     {
        //         path     : 'RequisitionHistory',
        //         component: RequisitionHistoryComponent,
           
        //     },
        // ],
    },{
        path     : 'NewPurchaseRequisition',
        component: NewPrchaseReqComponent,
    },{
        path     : 'OrderHistory',
        component: OrderHistoryComponent,
      
    },{
        path     : 'NewOrder',
        component: NewOrderComponent,
      },

] as Routes;
