import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  @Output() filterChange = new EventEmitter<{ search: string, difficulty: string }>();

  searchTerm = '';
  selectedDifficulty = 'All';
  difficulties = ['All', 'Easy', 'Moderate', 'Hard'];

  selectDifficulty(d: string) {
    this.selectedDifficulty = d;
    this.emitChange();
  }

  emitChange() {
    this.filterChange.emit({
      search: this.searchTerm,
      difficulty: this.selectedDifficulty
    });
  }
}
