import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserinfoComponent } from '../edit-userinfo/edit-userinfo.component';

import { FetchApiDataService } from '../fetch-api-data.service';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  movies: any[] = [];
  favoriteMovies: any[] = [];
  user: any;

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
    this.getFavoriteMovies();
  }

  openEditUserViewDialog(): void {
    this.dialog.open(EditUserinfoComponent, {
      width: '280px;',
      data: {
        user: this.user
      }
    }).afterClosed().subscribe(() => window.location.reload());
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response
    })
  }

  getMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      console.log(resp.Favorite_Movies);
      console.log(this.movies);
      this.favoriteMovies = this.movies.filter(movie => resp.Favorite_Movies.includes(movie._id));
      console.log(this.favoriteMovies)
    })
  }

  openSynopsisViewDialog(movie: any): void {
    console.log(movie);
    this.dialog.open(SynopsisViewComponent, {
      width: '800px',
      data: movie
    })
  }
}