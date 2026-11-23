import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-midnight text-white p-12">
      <h1 class="text-4xl font-bold font-heading mb-4">For Employers</h1>
      <p class="text-slate-300">Hire top engineering talent with zero friction and guaranteed velocity.</p>
    </div>
  `
})
export class EmployersComponent {}
