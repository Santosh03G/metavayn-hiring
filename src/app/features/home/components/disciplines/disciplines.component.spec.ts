import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DisciplinesComponent } from './disciplines.component';
import { provideRouter } from '@angular/router';

describe('DisciplinesComponent', () => {
  let fixture: ComponentFixture<DisciplinesComponent>;
  let component: DisciplinesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisciplinesComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render 5 engineering discipline tilt cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.discipline-card');
    expect(cards.length).toBe(5);
  });

  it('should render section heading with Industry Expertise badge', () => {
    const heading = fixture.nativeElement.querySelector('app-section-heading');
    expect(heading).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Engineering Disciplines We Staff');
  });
});
