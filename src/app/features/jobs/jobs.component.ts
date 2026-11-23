import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-midnight text-white p-12">
      <h1 class="text-4xl font-bold font-heading mb-4">Explore Jobs</h1>
      <p class="text-slate-300">Browse open positions tailored for top technical talent.</p>
    </div>
  `
})
export class JobsComponent {}
