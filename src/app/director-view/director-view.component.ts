/** The DirectorViewComponent renders a mat dialog containing information about the director of the movie selected */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  /** The data that was passed to the Director dialog in the MovieCardComponent is injected in to the constructor using the MAT_DIALOG_DATA  *injection token.  The data becomes a property of the class and is available to be used in the template. 
  */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DirectorViewComponent>,
    public snackBar: MatSnackBar) { }
  
    /** Positions the dialog in the upper right hand corner */
  ngOnInit() {
    this.dialogRef.updatePosition({ top: '30px', right: '30px' });
  }

}
