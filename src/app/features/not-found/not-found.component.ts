import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-midnight text-white flex flex-col items-center justify-center p-12 text-center">
      <h1 class="text-7xl font-bold font-heading text-cyan mb-4">404</h1>
      <h2 class="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p class="text-slate-300 max-w-md mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <a routerLink="/" class="px-6 py-3 rounded-lg bg-royal text-white font-medium hover:bg-royal/80 transition-colors">
        Return Home
      </a>
    </div>
  `
})
export class NotFoundComponent {}
