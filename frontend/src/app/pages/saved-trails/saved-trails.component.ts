import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trail } from '../../models/trail.model';
import { TrailService } from '../../services/trail.service';

@Component({
  selector: 'app-saved-trails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-trails.component.html',
  styleUrls: ['./saved-trails.component.css']
})
export class SavedTrailsComponent implements OnInit {
  trails: Trail[] = [];
  loading = true;
  error = false;

  constructor(private trailService: TrailService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.trailService.getSavedTrails().subscribe({
      next: t => {
        this.trails = t;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  remove(id: string) {
    this.trailService.deleteTrail(id).subscribe(() => {
      this.trails = this.trails.filter(x => x._id !== id);
    });
  }
}
