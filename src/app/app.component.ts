import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SmoothScrollService } from './core/services/smooth-scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private smoothScroll = inject(SmoothScrollService);

  ngOnInit(): void {
    this.smoothScroll.init();
  }

  ngOnDestroy(): void {
    this.smoothScroll.destroy();
  }
}
