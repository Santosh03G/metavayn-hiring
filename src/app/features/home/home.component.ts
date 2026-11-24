import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { TrustStripComponent } from './components/trust-strip/trust-strip.component';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FeaturedRolesComponent } from './components/featured-roles/featured-roles.component';
import { DualCtaComponent } from './components/dual-cta/dual-cta.component';
import { FinalBannerComponent } from './components/final-banner/final-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    TrustStripComponent,
    DisciplinesComponent,
    WhyChooseUsComponent,
    HowItWorksComponent,
    FeaturedRolesComponent,
    DualCtaComponent,
    FinalBannerComponent
  ],
  template: `
    <app-home-hero></app-home-hero>
    <app-home-trust-strip></app-home-trust-strip>
    <app-home-disciplines></app-home-disciplines>
    <app-home-why-choose-us></app-home-why-choose-us>
    <app-home-how-it-works></app-home-how-it-works>
    <app-home-featured-roles></app-home-featured-roles>
    <app-home-dual-cta></app-home-dual-cta>
    <app-home-final-banner></app-home-final-banner>
  `
})
export class HomeComponent {}
