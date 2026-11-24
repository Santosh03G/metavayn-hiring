import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  inject,
  signal,
  ElementRef,
  PLATFORM_ID,
  NgZone,
  viewChild
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SmoothScrollService } from '../../../../core/services/smooth-scroll.service';
import { gsap } from 'gsap';

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  template: `
    <section class="min-h-screen relative flex items-center justify-center overflow-hidden pt-24 pb-16 bg-midnight text-white">
      <!-- 2D Canvas Interactive Talent Network -->
      <canvas #networkCanvas class="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true"></canvas>

      <!-- Ambient Glow Orbs -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-royal/20 blur-[130px] rounded-full pointer-events-none"></div>
      <div class="absolute top-1/2 -right-32 w-96 h-96 bg-cyan/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <!-- Eyebrow Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/80 border border-cyan/30 text-xs sm:text-sm text-cyan font-medium mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <span class="w-2 h-2 rounded-full bg-cyan animate-pulse"></span>
          <span>Specialized Engineering Recruitment for US Industries</span>
        </div>

        <!-- Headline with Word-by-Word Reveal -->
        <h1 class="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
          <span class="word inline-block mr-2 text-white">Build </span>
          <span class="word inline-block mr-2 text-white">What's </span>
          <span class="word inline-block mr-3 text-gradient">Next. </span>
          <span class="word inline-block mr-2 text-white">Advance </span>
          <span class="word inline-block mr-2 text-white">Your </span>
          <span class="word inline-block mr-2 text-white">Engineering </span>
          <span class="word inline-block text-cyan">Career.</span>
        </h1>

        <!-- Subtext -->
        <p class="text-base sm:text-lg md:text-xl text-ice/85 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Connecting Engineering Talent with America's Leading Industrial Teams. Direct technical placement for HVAC, mechanical, electrical, and structural engineers in India.
        </p>

        <!-- Hero Dual Action CTAs (Strict Amber Isolation) -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          <app-button variant="primary" href="/jobs" class="w-full sm:w-auto">
            Search Jobs
          </app-button>
          <app-button variant="amber-cta" href="/candidates" class="w-full sm:w-auto">
            Submit Your Resume
          </app-button>
        </div>

        <!-- Compact Job Search Bar -->
        <form (ngSubmit)="onSearch()" class="glass w-full max-w-3xl p-3 sm:p-3.5 rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-3">
          <div class="relative w-full flex-1">
            <span class="absolute inset-y-0 left-3 flex items-center text-slate pointer-events-none">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </span>
            <input
              type="text"
              name="searchQuery"
              [ngModel]="searchQuery()"
              (ngModelChange)="searchQuery.set($event)"
              placeholder="Job title, skill, or discipline (e.g. HVAC)..."
              class="w-full pl-10 pr-4 py-2.5 bg-navy/60 rounded-xl text-sm text-white placeholder-slate focus:outline-none focus:ring-2 focus:ring-cyan border border-white/5"
            />
          </div>

          <div class="relative w-full md:w-56">
            <span class="absolute inset-y-0 left-3 flex items-center text-slate pointer-events-none">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </span>
            <input
              type="text"
              name="locationQuery"
              [ngModel]="locationQuery()"
              (ngModelChange)="locationQuery.set($event)"
              placeholder="Location or Remote"
              class="w-full pl-10 pr-4 py-2.5 bg-navy/60 rounded-xl text-sm text-white placeholder-slate focus:outline-none focus:ring-2 focus:ring-cyan border border-white/5"
            />
          </div>

          <button
            type="submit"
            class="w-full md:w-auto px-6 py-2.5 rounded-xl bg-electric hover:bg-royal text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-electric/25 cursor-pointer whitespace-nowrap"
          >
            <span>Search</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </form>

        <!-- Scroll Indicator -->
        <button
          type="button"
          (click)="scrollToTrustStrip()"
          class="scroll-indicator mt-16 text-ice/60 hover:text-cyan transition-colors flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan rounded-lg p-1"
          aria-label="Scroll to content"
        >
          <span class="text-xs uppercase tracking-widest font-mono">Explore</span>
          <div class="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center p-1">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce"></span>
          </div>
        </button>
      </div>
    </section>
  `
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private router = inject(Router);
  private smoothScroll = inject(SmoothScrollService);

  readonly searchQuery = signal('');
  readonly locationQuery = signal('');

  private canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('networkCanvas');
  private animationFrameId: number | null = null;
  private nodes: ParticleNode[] = [];
  private mouse = { x: -1000, y: -1000 };
  private boundVisibilityHandler = this.onVisibilityChange.bind(this);
  private boundMouseMoveHandler = this.onMouseMove.bind(this);
  private boundResizeHandler: (() => void) | null = null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.animateHeadline();
    this.initCanvas();
  }

  private animateHeadline(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const words = document.querySelectorAll('app-home-hero .word');
    if (words.length > 0) {
      gsap.from(words, {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out'
      });
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.createNodes(canvas.width, canvas.height);
      if (prefersReducedMotion) {
        this.renderFrame(ctx, canvas, true);
      }
    };

    this.boundResizeHandler = resize;
    resize();
    window.addEventListener('resize', this.boundResizeHandler);
    window.addEventListener('mousemove', this.boundMouseMoveHandler, { passive: true });
    document.addEventListener('visibilitychange', this.boundVisibilityHandler);

    if (prefersReducedMotion) {
      this.renderFrame(ctx, canvas, true);
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.renderFrame(ctx, canvas, false);
        this.animationFrameId = requestAnimationFrame(loop);
      };
      this.animationFrameId = requestAnimationFrame(loop);
    });
  }

  private createNodes(width: number, height: number): void {
    const count = Math.min(55, Math.floor((width * height) / 25000));
    this.nodes = [];
    for (let i = 0; i < count; i++) {
      this.nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 1,
        color: Math.random() > 0.4 ? '#22D3EE' : '#3B82F6'
      });
    }
  }

  private renderFrame(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, staticMode: boolean): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      if (!staticMode) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Subtle repulsion from cursor
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          node.x -= (dx / dist) * 0.8;
          node.y -= (dy / dist) * 0.8;
        }
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.globalAlpha = 0.7;
      ctx.fill();

      // Connecting lines
      for (let j = i + 1; j < this.nodes.length; j++) {
        const other = this.nodes[j];
        const dist = Math.hypot(node.x - other.x, node.y - other.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = '#22D3EE';
          ctx.globalAlpha = (1 - dist / 120) * 0.22;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  private onMouseMove(e: MouseEvent): void {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  private onVisibilityChange(): void {
    if (document.hidden && this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    } else if (!document.hidden && !this.animationFrameId) {
      const canvas = this.canvasRef()?.nativeElement;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.ngZone.runOutsideAngular(() => {
          const loop = () => {
            this.renderFrame(ctx, canvas, false);
            this.animationFrameId = requestAnimationFrame(loop);
          };
          this.animationFrameId = requestAnimationFrame(loop);
        });
      }
    }
  }

  onSearch(): void {
    const q = this.searchQuery().trim();
    const location = this.locationQuery().trim();
    this.router.navigate(['/jobs'], {
      queryParams: {
        ...(q ? { q } : {}),
        ...(location ? { location } : {})
      }
    });
  }

  scrollToTrustStrip(): void {
    this.smoothScroll.scrollTo('#trust-strip');
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      if (this.boundResizeHandler) {
        window.removeEventListener('resize', this.boundResizeHandler);
      }
      window.removeEventListener('mousemove', this.boundMouseMoveHandler);
      document.removeEventListener('visibilitychange', this.boundVisibilityHandler);
    }
  }
}
