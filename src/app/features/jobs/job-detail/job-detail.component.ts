import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-midnight text-white p-12">
      <h1 class="text-4xl font-bold font-heading mb-4">Job Details</h1>
      <p class="text-slate-300">Detailed job specification and application requirements.</p>
    </div>
  `
})
export class JobDetailComponent {}
