/** Navbar component with navigation to 'Movies' and 'Profile', and 'Logout' functionality */
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  /** returns true if size of screen is less than handset breakpoint, false if it is more */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toProfile(): void {
    this.router.navigate(['profile']);
  }

  toMovies(): void {
    this.router.navigate(['movies']);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
