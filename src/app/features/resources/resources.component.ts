import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-midnight text-white p-12">
      <h1 class="text-4xl font-bold font-heading mb-4">Resources & Guides</h1>
      <p class="text-slate-300">Insights, salary benchmarks, and hiring market intelligence.</p>
    </div>
  `
})
export class ResourcesComponent {}
