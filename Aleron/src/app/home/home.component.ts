import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAuto } from '../interfaces/auto';
import { AutoService } from '../services/auto.service';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule]
})
export class HomeComponentimplements implements OnInit {
  autos: IAuto[] = [];

  constructor(private autoService: AutoService) {}

  ngOnInit(): void {
    this.autoService.getList().subscribe({
      next: (data) => {
        this.autos = data.slice(0, 3); // Tomar los primeros 3 registros
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  }
