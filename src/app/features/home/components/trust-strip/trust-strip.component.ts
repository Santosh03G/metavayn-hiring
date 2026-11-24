import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../../../shared/components/counter/counter.component';
import { TRUST_METRICS } from '../../../../data/trust-metrics.data';

@Component({
  selector: 'app-home-trust-strip',
  standalone: true,
  imports: [CommonModule, CounterComponent],
  template: `
    <section id="trust-strip" class="relative bg-navy/60 backdrop-blur-md border-y border-white/10 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          @for (metric of metrics; track metric.label) {
            <div class="flex flex-col items-center text-center">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-2">
                <app-counter
                  [targetValue]="metric.value"
                  [suffix]="metric.suffix || ''"
                  [prefix]="metric.prefix || ''"
                ></app-counter>
              </div>
              <h3 class="text-sm font-semibold text-cyan uppercase tracking-wider mb-1 font-sans">
                {{ metric.label }}
              </h3>
              <p class="text-xs text-slate max-w-[200px]">
                {{ metric.description }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class TrustStripComponent {
  readonly metrics = TRUST_METRICS;
}
