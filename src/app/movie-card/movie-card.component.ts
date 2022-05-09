/** MovieCardComponent calls FetchApiDataComponent and gets list of all movie objects and favorite movie id's.  Displays all movies in template and allows you to add any movie to your list of favorites.  Opens up SynopsisViewComponent on click. */
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }
  /** makes API call to retrieve full list of movies in database */
  getMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /** opens synopsis dialog with information on selected movie */
  openSynopsisViewDialog(movie: any): void {
    console.log(movie);
    this.dialog.open(SynopsisViewComponent, {
      width: '800px',
      data: movie
    })
  }

  /** returns list of favorite movie id's */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favoriteMovies = response.Favorite_Movies;
      console.log(this.favoriteMovies);
    })
  }

  /** returns true or false depending on whether or not selected movie is on favorites list */
  isFavorite(movie: string): boolean {
    return this.favoriteMovies.includes(movie);
  }

  /** makes API call to add selected movie to favorites list */
  addToFavorites(movie: string, title: string): void {
    this.fetchApiData.addToFavorites(movie).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open(
        `${title} has been added to your favorites!`, 'OK', { duration: 2000 }
      );
      this.ngOnInit();
    })
    return this.getFavorites();
  }

  /** makes API call to remove selected movie from favorites list */
  removeFromFavorites(movie: string, title: string): void {
    this.fetchApiData.removeFromFavorites(movie).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open(
        `${title} has been removed from your favorites`, 'OK', { duration: 2000 }
      );
      this.ngOnInit();
    })
    return this.getFavorites();
  }

  /** takes movie id and title and adds or removes it from favorites list depending on if it is already on the favorites list or not */
  favoritesList(movie: string, title: string): void {
    console.log(this.isFavorite(movie))
    this.isFavorite(movie) ? this.removeFromFavorites(movie, title) : this.addToFavorites(movie, title)
  }
}
