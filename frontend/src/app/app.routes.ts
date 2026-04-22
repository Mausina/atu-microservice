import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TrailDetailComponent } from './pages/trail-detail/trail-detail.component';
import { SavedTrailsComponent } from './pages/saved-trails/saved-trails.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trail/:id', component: TrailDetailComponent },
  { path: 'saved', component: SavedTrailsComponent },
  { path: '**', redirectTo: '' }
];
