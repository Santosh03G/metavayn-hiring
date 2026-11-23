import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'jobs',
    loadComponent: () => import('./features/jobs/jobs.component').then(m => m.JobsComponent),
  },
  {
    path: 'jobs/:id',
    loadComponent: () => import('./features/jobs/job-detail/job-detail.component').then(m => m.JobDetailComponent),
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent),
  },
  {
    path: 'candidates',
    loadComponent: () => import('./features/candidates/candidates.component').then(m => m.CandidatesComponent),
  },
  {
    path: 'employers',
    loadComponent: () => import('./features/employers/employers.component').then(m => m.EmployersComponent),
  },
  {
    path: 'resources',
    loadComponent: () => import('./features/resources/resources.component').then(m => m.ResourcesComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
  }
];
