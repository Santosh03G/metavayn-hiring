import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  NgZone,
  ElementRef,
  viewChild
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { SmoothScrollService } from './core/services/smooth-scroll.service';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { PageIntroComponent } from './core/layout/page-intro/page-intro.component';
import { RouteWipeComponent } from './core/layout/route-wipe/route-wipe.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    PageIntroComponent,
    RouteWipeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private smoothScroll = inject(SmoothScrollService);
  private router = inject(Router, { optional: true });
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private sub = new Subscription();

  private mainContentRef = viewChild<ElementRef<HTMLElement>>('mainContent');

  ngOnInit(): void {
    this.smoothScroll.init();

    if (isPlatformBrowser(this.platformId) && this.router) {
      this.sub.add(
        this.router.events
          .pipe(filter(e => e instanceof NavigationEnd))
          .subscribe(() => {
            this.animatePageIn();
          })
      );
    }
  }

  private animatePageIn(): void {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mainEl = this.mainContentRef()?.nativeElement || (typeof document !== 'undefined' ? document.getElementById('main-content') : null);
    if (!mainEl) return;

    this.ngZone.runOutsideAngular(() => {
      if (prefersReducedMotion) {
        gsap.fromTo(mainEl, { opacity: 0.7 }, { opacity: 1, duration: 0.15, ease: 'power1.out' });
      } else {
        gsap.fromTo(
          mainEl,
          { opacity: 0.35, y: 12, scale: 0.995 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: 'power3.out',
            clearProps: 'transform'
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.smoothScroll.destroy();
  }
}
