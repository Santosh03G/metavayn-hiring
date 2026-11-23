import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-midnight text-white p-12">
      <h1 class="text-4xl font-bold font-heading mb-4">About Metavayn</h1>
      <p class="text-slate-300">The next-generation hiring platform connecting visionary companies with elite engineers.</p>
    </div>
  `
})
export class AboutComponent {}
