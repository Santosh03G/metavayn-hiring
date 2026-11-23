import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-midnight text-white p-12">
      <h1 class="text-4xl font-bold font-heading mb-4">Contact Us</h1>
      <p class="text-slate-300">Get in touch with our team for partnerships, inquiries, or support.</p>
    </div>
  `
})
export class ContactComponent {}
