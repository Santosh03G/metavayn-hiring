import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-midnight text-white p-12">
      <h1 class="text-4xl font-bold font-heading mb-4">Job Categories</h1>
      <p class="text-slate-300">Discover roles categorized by domain, stack, and seniority.</p>
    </div>
  `
})
export class CategoriesComponent {}
