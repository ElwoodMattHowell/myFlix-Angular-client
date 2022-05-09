/** ProfileViewComponent displays username, and email as well as list of favorite movies.  Allows the user to edit user information or delete user profile */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserinfoComponent } from '../edit-userinfo/edit-userinfo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
    this.getFavoriteMovies();
  }

  /** Opens EditUserinfoComponent*/
  openEditUserViewDialog(): void {
    this.dialog.open(EditUserinfoComponent, {
      width: '280px;',
      data: {
        user: this.user
      }
    }).afterClosed().subscribe(() => window.location.reload());
  }

  /** retrieves user profile */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response
    })
  }

  /** retrieves full list of movies in database */
  getMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /** retrieves list of favorite movie id's */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteMovies = this.movies.filter(movie => resp.Favorite_Movies.includes(movie._id));
    })
  }

  /** opens synopsis dialog for selected movie */
  openSynopsisViewDialog(movie: any): void {
    console.log(movie);
    this.dialog.open(SynopsisViewComponent, {
      width: '800px',
      data: movie
    })
  }

  /** deletes user from database */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      this.snackBar.open(`${this.user.username} has been removed!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['']);
  }
}