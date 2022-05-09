/** GenreViewComponent opens a dialog that displays information about the genre of the selected movie */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {

  /** The data that was passed into the GenreViewComponent from the MovieCardComponent is injected into the constructor using MAT_DIALOG_DATA.  The data is then a property of GenreViewComponent and available to be displayed in the template.
  */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GenreViewComponent>,
    public snackBar: MatSnackBar) { }

  /** Positions the dialog in the upper left hand corner of the screen */
  ngOnInit(): void {
    this.dialogRef.updatePosition({ top: '30px', left: '30px' });
  }

}