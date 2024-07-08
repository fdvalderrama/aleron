// app/app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAuto } from './interfaces/auto';
import { AutoService } from './services/auto.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { HomeComponentimplements } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';



@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HttpClientModule, FormsModule, NgFor, 
        NgIf, HomeComponentimplements, ProductosComponent, RouterModule, ContactoComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    listaAutos: IAuto[] = [];
    isResultLoaded = false;
    nombreAuto: string = "";
    marcaAuto: string = "";
    modeloAuto: string = "";
    anioAuto: number = new Date().getFullYear();
    precioAuto: number = 0;
    imagenAuto: string = "";
    descripcionAuto: string = "";
    categoriaAuto: string = "";
    IDAutoActual: number = 0;

    constructor(private _autoService: AutoService) {
        this.obtenerAutos();
    }

    obtenerAutos() {
        this._autoService.getList().subscribe({
            next: (data) => {
                this.listaAutos = data;
                this.isResultLoaded = true;
            },
            error: (e) => {
                console.log(e);
            }
        });
    }

    agregarAuto() {
        const request: IAuto = {
            id: 0,
            marca: this.marcaAuto,
            modelo: this.modeloAuto,
            anio: this.anioAuto,
            precio: this.precioAuto,
            imagen: this.imagenAuto,
            descripcion: this.descripcionAuto,
            categoria: this.categoriaAuto
        };

        this._autoService.add(request).subscribe({
            next: (data) => {
                this.resetForm();
                this.obtenerAutos();
            },
            error: (e) => {
                console.log(e);
            }
        });
    }

    obtenerAuto(data: IAuto) {
        this.marcaAuto = data.marca;
        this.modeloAuto = data.modelo;
        this.anioAuto = data.anio;
        this.precioAuto = data.precio;
        this.IDAutoActual = data.id;
    }

    modificarAuto() {
        const request: IAuto = {
            id: this.IDAutoActual,
            marca: this.marcaAuto,
            modelo: this.modeloAuto,
            anio: this.anioAuto,
            precio: this.precioAuto,
            imagen: this.imagenAuto,
            descripcion: this.descripcionAuto,
            categoria: this.categoriaAuto
        };

        this._autoService.update(request).subscribe({
            next: () => {
                this.resetForm();
                this.obtenerAutos();
            },
            error: (e) => {
                console.log(e);
            }
        });
    }

    guardar() {
        if (this.IDAutoActual === 0) {
            this.agregarAuto();
        } else {
            this.modificarAuto();
        }
    }

    eliminarAuto(auto: IAuto) {
        this._autoService.delete(auto.id).subscribe({
            next: () => {
                this.obtenerAutos();
            },
            error: (e) => {
                console.log(e);
            }
        });
    }

    resetForm() {
        this.marcaAuto = "";
        this.modeloAuto = "";
        this.anioAuto = new Date().getFullYear();
        this.precioAuto = 0;
        this.IDAutoActual = 0;
    }

    email = 'correo@aleron.com';
}
