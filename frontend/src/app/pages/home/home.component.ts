import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailCardComponent } from '../../components/trail-card/trail-card.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { Trail } from '../../models/trail.model';
import { TrailService } from '../../services/trail.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TrailCardComponent, FilterBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trails: Trail[] = [];
  filteredTrails: Trail[] = [];

  constructor(private trailService: TrailService) {}

  ngOnInit() {
    this.trailService.getAllTrails().subscribe(trails => {
      this.trails = trails;
      this.filteredTrails = trails;
    });
  }

  applyFilter(filter: { search: string, difficulty: string }) {
    this.filteredTrails = this.trails.filter(t => {
      const matchesSearch = !filter.search ||
        t.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        t.location.toLowerCase().includes(filter.search.toLowerCase());
      const matchesDifficulty = filter.difficulty === 'All' || t.difficulty === filter.difficulty;
      return matchesSearch && matchesDifficulty;
    });
  }
}
