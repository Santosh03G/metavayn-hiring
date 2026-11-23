import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-midnight text-white p-12">
      <h1 class="text-4xl font-bold font-heading mb-4">For Candidates</h1>
      <p class="text-slate-300">Empower your career with AI-augmented matching and verified credentials.</p>
    </div>
  `
})
export class CandidatesComponent {}
