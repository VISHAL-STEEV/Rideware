import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { AcademyComponent } from 'app/modules/admin/apps/ecommerce/employees/academy/academy.component';
import { AcademyService } from 'app/modules/admin/apps/ecommerce/employees/academy/academy.service';
import { AcademyDetailsComponent } from 'app/modules/admin/apps/ecommerce/employees/academy/details/details.component';
import { AcademyListComponent } from 'app/modules/admin/apps/ecommerce/employees/academy/list/list.component';
import { catchError, throwError } from 'rxjs';
import { EmployeesComponent } from '../employees.component';

export default [
    {
        path     : '',
        pathMatch: 'full',
        component: AcademyListComponent,
    },
    {
        path     : 'Detailed',
        component: AcademyDetailsComponent,
    },   {
        path     : 'Add',
        component: EmployeesComponent,
    }
] as Routes;
