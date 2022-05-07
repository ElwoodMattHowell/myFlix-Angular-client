import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MatDialog } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent implements OnInit {
  favoriteMovies: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SynopsisViewComponent>,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,) { }

  ngOnInit(): void {
    this.getFavorites()
  }

  openGenreViewDialog(data: any): void {
    this.dialog.open(GenreViewComponent, {
      width: '320px',
      data: {
        name: data.Genre.Name,
        description: data.Genre.Description
      }
    });
  }

  openDirectorViewDialog(data: any): void {
    this.dialog.open(DirectorViewComponent, {
      width: '320px',
      data: {
        name: data.Director.Name,
        bio: data.Director.Bio,
        birthyear: data.Director.Birth
      }
    });
  }

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favoriteMovies = response.Favorite_Movies;
      console.log(this.favoriteMovies);
    })
  }

  isFavorite(data: any): boolean {
    return this.favoriteMovies.includes(data);
  }

  addToFavorites(movie: string, title: string): void {
    this.fetchApiData.addToFavorites(movie).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open(
        `${title} has been added to your favorites!`, 'OK', { duration: 2000 }
      );
    })
    window.location.reload();
  }

  removeFromFavorites(movie: string, title: string): void {
    this.fetchApiData.removeFromFavorites(movie).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open(
        `${title} has been removed from your favorites`, 'OK', { duration: 2000 }
      );
    })
    window.location.reload();
  }

  favoritesList(movie: string, title: string): void {
    this.isFavorite(movie) ? this.removeFromFavorites(movie, title) : this.addToFavorites(movie, title)
  }
} 
