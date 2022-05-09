/** SynopsisViewComponent displays a still image from selcted movie, a brief synopsis of the movie and allows the user to open dialogs containing information on the genre and director of the selected movie */
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SynopsisViewComponent>,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,) { }

  ngOnInit(): void {
  }

  /** opens a dialog with information on the genre of the selected movie */
  openGenreViewDialog(data: any): void {
    this.dialog.open(GenreViewComponent, {
      width: '320px',
      data: {
        name: data.Genre.Name,
        description: data.Genre.Description
      }
    });
  }

  /** opens a dialog with information on the director of the selected movie */
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


} 
