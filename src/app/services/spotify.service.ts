import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Arriba');
  }

  getQuery(query: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBk34UWFzM2RupRw_-B-zf5eWrMK5Mw9qX2HArv9YxA-NY71dmiIqXAOT_movUkr8_y1aklStwOiuGU2NQ'
    });

    const url = `https://api.spotify.com/v1/${query}`;

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases')
      .pipe(map((data: any) => {
        return data.albums.items;
      }));
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&market=US&limit=15`)
      .pipe(map((data: any) => {
        return data.artists.items;
      }));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map((data: any) => {
        return data.tracks;
      }));
  }
}
