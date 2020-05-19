import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Usuario } from "../shared-models/usuario";
import { environment } from "../../environments/environment";
import { throwError } from "rxjs";
import { Version } from '../shared-models/versao';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: "root"
})
export class AuthService {

  private endPoint = "desafio/usuario/login";

  private endPointVersion = "desafio/api/version";

  private endPointEsqueceuSenha = "desafio/usuario/esqueceusenha";

  private endPointCadastrar = 'desafio/usuario/cadastrar';

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public logar(usuario: Usuario) {
    return this.http
      .post<Usuario>(
        `${environment.baseUrl}${this.endPoint}`,
        JSON.stringify(usuario),
        this.httpOptions
      )
      .pipe(
        //retry(2),
        catchError(this.handleError)
      );
  }

  esqueciSenha(_login: any) {
    let login = { login: _login };
    return this.http
      .post(
        `${environment.baseUrl}${this.endPointEsqueceuSenha}`,
        JSON.stringify(login),
        this.httpOptions
      );
  }

  public create(user: Usuario) {
    return this.http
      .post<Usuario>(`${environment.baseUrl}${this.endPointCadastrar}`, JSON.stringify(user), this.httpOptions)
      .pipe(
        //retry(2),
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
        //retry(2),
        catchError(this.handleError)
      );
  }
}
