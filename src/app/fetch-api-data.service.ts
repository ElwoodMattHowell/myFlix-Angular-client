import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://matt-howell-myflix.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  /**
   * Inject the HttpClient module to the constructor params
  This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
 * call API endpoint to register a new user
 * @function userRegistration
 * @param userDetails 
 * @returns a new user object in JSON format
 */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  /**
 * calls API endpoint for user login
 * @function userLogin
 * @param userDetails 
 * @returns a users' data in JSON format
 */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

  /**calls API to get list of all movie objects
   * @function getMovies
   * @returns list of all movies
   */

  public getMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(catchError(this.handleError));
  }

  // public getOneMovie(movieTitle: string): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   return this.http.get(apiUrl + `movies/${movieTitle}`, {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${token}`
  //     })
  //   }).pipe(catchError(this.handleError));
  // }

  // public getDirector(director: string): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   return this.http.get(apiUrl + `directors/${director}`, {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + token
  //     })
  //   }).pipe(catchError(this.handleError));
  // }

  // public getGenre(genre: string): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   return this.http.get(apiUrl + `genres/${genre}`, {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${token}`
  //     })
  //   }).pipe(catchError(this.handleError));
  // }

  /**
 * calls API endpoint for user object
 * @function getUser
 * @returns a users' data in JSON format
 */

  public getUser(): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${user}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  /**
 * calls API endpoint to get the favorite movie list of a user
 * @function getFavorites
 * @returns a list of the users' favorite movies in JSON format
 */
  public getFavorites(): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${user}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  /**
 * calls API endpooint to add a movie to a users' favorite movie list
 * @function addToFavorites
 * @param movieId
 * @returns the updated users' favorite list in JSON format
 */
  public addToFavorites(movieId: string): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${user}/movies/${movieId}`, null, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  /**
 * calls API endpooint to remove a movie from a users' favorite movie list
 * @function removeFromFavorites
 * @param movieId
 * @returns the updated users' favorite list in JSON format
 */

  public removeFromFavorites(movieId: string): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${user}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  /**
  * calls API endpooint to update users profile
  * @function updateUserProfile
  * @param newUserInfo
  * @returns updated user info in JSON format
  */

  public updateUserProfile(newUserInfo: object): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${user}/update`, newUserInfo, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  /**
* calls API endpooint to update user's password
* @function updatePassword
* @param newPassword
* @returns updated hashed password
*/
  public updatePassword(newPassword: object): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${user}/updatePassword`, newPassword, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(catchError(this.handleError));
  }

  /**calls API endpoint to delete user profile
   * @function deleteUser
   */
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
