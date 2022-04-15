import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://matt-howell-myflix.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) { }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

  public getMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  public getOneMovie(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${movieTitle}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  public getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${director}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  public getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/${genre}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  public getFavorites(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  public addToFavorites(username: string, movieId: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  public removeFromFavorites(username: string, movieId: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  public updateUserProfile(newUserInfo: object): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${user}/update`, newUserInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  public updatePassword(newPassword: object): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${user}/updatePassword`, newPassword, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(`Error Status code ${error.status},` + `Error body is: ${error.error}`);
    }
    return throwError(() => 'Something bad happened; please try again later.');
  }

}
