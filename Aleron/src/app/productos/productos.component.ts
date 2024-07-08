import { Component, OnInit } from '@angular/core';
import { IAuto } from '../interfaces/auto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutoService } from '../services/auto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  autos: IAuto[] = [];
  filteredAutos: IAuto[] = [];
  searchText: string = '';
  selectedCategory: string = '';

  constructor(private autoService: AutoService) { }

  ngOnInit(): void {
    this.getAutos();
  }

  getAutos(): void {
    this.autoService.getList().subscribe({
      next: (data) => {
        this.autos = data;
        this.filteredAutos = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  filterAutos(): void {
    this.filteredAutos = this.autos.filter(auto =>
      auto.modelo.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedCategory === '' || auto.categoria === this.selectedCategory)
    );
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filterAutos();
  }
}