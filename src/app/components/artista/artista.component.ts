import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent {
  artista: any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {
    this.route.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotify.getArtista(id)
      .subscribe((artista: any) => {
        this.artista = artista;
        this.loading = false;
      });
  }

  getTopTracks(id: string) {
    this.spotify.getTopTracks(id)
      .subscribe((topTracks: any) => {
        this.topTracks = topTracks;
      });
  }
}
