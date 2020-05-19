import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../../shared-models/usuario';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private endPointList = 'desafio/usuario/listar';

  private endPointManter = 'desafio/usuario/manter';

  private endPointRemover = 'desafio/usuario/remover';

    // Headers
    httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      )
    }

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.post<Usuario[]>(`${environment.baseUrl}${this.endPointList}`, JSON.stringify(''), this.httpOptions);
  }

  public update(user: Usuario) {
    return this.http
      .post<Usuario>(`${environment.baseUrl}${this.endPointManter}`, JSON.stringify(user), this.httpOptions)
      .pipe(
        //retry(2),
        catchError(this.handleError)
      );
  }

  public excluir(_login: string) {
    let login = {login: _login}
    console.log('LOGIN ' + login);
    return this.http.post(`${environment.baseUrl}${this.endPointRemover}`, JSON.stringify(login) , this.httpOptions);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


}
