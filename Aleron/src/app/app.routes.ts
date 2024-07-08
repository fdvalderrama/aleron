import { Routes } from '@angular/router';
import { HomeComponentimplements } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';

export const routes: Routes = [
    { path: '', component: HomeComponentimplements },
  { path: 'productos', component: ProductosComponent },
  {path: 'contacto', component: ContactoComponent}
];
