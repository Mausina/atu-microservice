import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Trail } from '../models/trail.model';

@Injectable({ providedIn: 'root' })
export class TrailService {
  // express backend on ec2
  private apiUrl = 'http://localhost:3000/api/trails';

  // hardcoded irish trails for the demo (in real app this would be another API)
  private mockTrails: Trail[] = [
    {
      id: 1,
      name: 'Croagh Patrick',
      location: 'Mayo, Ireland',
      lat: 53.7596,
      lon: -9.6593,
      difficulty: 'Hard',
      distance: 7,
      duration: '3-4 hours',
      elevation: 764,
      description: 'Iconic pilgrimage mountain with panoramic views over Clew Bay.'
    },
    {
      id: 2,
      name: 'Diamond Hill',
      location: 'Connemara, Galway',
      lat: 53.5500,
      lon: -9.9667,
      difficulty: 'Moderate',
      distance: 7.5,
      duration: '2.5-3 hours',
      elevation: 442,
      description: 'Loop walk in Connemara National Park with stunning coastal views.'
    },
    {
      id: 3,
      name: 'Bray to Greystones Cliff Walk',
      location: 'Wicklow',
      lat: 53.1995,
      lon: -6.1083,
      difficulty: 'Easy',
      distance: 7,
      duration: '2 hours',
      elevation: 100,
      description: 'Coastal cliff walk between two seaside towns.'
    },
    {
      id: 4,
      name: 'Carrauntoohil',
      location: 'Kerry',
      lat: 51.9988,
      lon: -9.7421,
      difficulty: 'Hard',
      distance: 12,
      duration: '5-7 hours',
      elevation: 1038,
      description: 'Highest mountain in Ireland via the Devils Ladder route.'
    },
    {
      id: 5,
      name: 'Glendalough Spinc',
      location: 'Wicklow',
      lat: 53.0125,
      lon: -6.3267,
      difficulty: 'Moderate',
      distance: 9,
      duration: '3-4 hours',
      elevation: 380,
      description: 'Boardwalk and forest trail over the Upper Lake.'
    },
    {
      id: 6,
      name: 'Slieve League',
      location: 'Donegal',
      lat: 54.6500,
      lon: -8.6833,
      difficulty: 'Hard',
      distance: 5,
      duration: '3 hours',
      elevation: 601,
      description: 'Some of the highest sea cliffs in Europe.'
    },
    {
      id: 7,
      name: 'Howth Cliff Path',
      location: 'Dublin',
      lat: 53.3879,
      lon: -6.0606,
      difficulty: 'Easy',
      distance: 6,
      duration: '2 hours',
      elevation: 150,
      description: 'Coastal loop with views of Dublin Bay and Ireland\'s Eye.'
    },
    {
      id: 8,
      name: 'Mount Errigal',
      location: 'Donegal',
      lat: 55.0333,
      lon: -8.1167,
      difficulty: 'Moderate',
      distance: 5,
      duration: '2-3 hours',
      elevation: 751,
      description: 'Quartzite cone-shaped mountain.'
    }
  ];

  constructor(private http: HttpClient) {}

  getAllTrails(): Observable<Trail[]> {
    // returning mock data for now since trails are fixed
    return of(this.mockTrails);
  }

  getTrailById(id: number): Observable<Trail | undefined> {
    return of(this.mockTrails.find(t => t.id === id));
  }

  getSavedTrails(): Observable<Trail[]> {
    return this.http.get<Trail[]>(this.apiUrl);
  }

  saveTrail(trail: Trail): Observable<Trail> {
    // strip the local id before saving
    const { id, ...payload } = trail;
    return this.http.post<Trail>(this.apiUrl, payload);
  }

  deleteTrail(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
