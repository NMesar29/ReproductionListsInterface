import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ReproductionLists } from './pages/reproduction-lists/reproduction-lists';
import { CreateList } from './pages/create-list/create-list';
import { FindList } from './pages/find-list/find-list';
import { DeleteList } from './pages/delete-list/delete-list';
import { LoginPage } from './components/login-page/login-page';

export const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', component: LoginPage},
    {path: 'home', component: Home},
    {path: 'reproduction-lists', component: ReproductionLists},
    {path: 'create-list', component: CreateList},
    {path: 'find-list', component: FindList},
    {path: 'delete-list', component: DeleteList}
    
];
