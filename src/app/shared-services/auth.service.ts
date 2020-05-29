import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Usuario } from '../shared-models/usuario';
import { environment } from '../../environments/environment';
import { throwError, Observable, pipe, BehaviorSubject } from 'rxjs';
import { Version } from '../shared-models/versao';
import { catchError } from 'rxjs/operators';
import { Login } from '../shared-models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endPoint = 'desafio/usuario/login';

  private endPointVersion = 'desafio/api/version';

  private endPointEsqueceupassword = 'desafio/usuario/esqueceupassword';

  private endPointCadastrar = 'desafio/usuario/cadastrar';

  /* IMPLEMENTAÇÃO GUARDA DE ROTAS */
  private loggedIn = false;

  get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public auth(login: Login) {
    return this.http.post<Usuario>( `${environment.baseUrl}${this.endPoint}`, login, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }

  login(formValues: Login) {
    return this.auth(formValues)
      .then( () => this.loggedIn = true )
      .catch( () => this.loggedIn = false );
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  esquecipassword(_login: any) {
    let login = { login: _login };
    return this.http.post(
      `${environment.baseUrl}${this.endPointEsqueceupassword}`,
      JSON.stringify(login),
      this.httpOptions
    );
  }

  public create(user: Usuario) {
    return this.http
      .post<Usuario>(
        `${environment.baseUrl}${this.endPointCadastrar}`,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  public getVersion() {
    return this.http
      .post<Version>(
        `${environment.baseUrl}${this.endPointVersion}`,
        JSON.stringify(''),
        this.httpOptions
      )
      .pipe(
        catchError(this.handleError)
      );
  }
}
