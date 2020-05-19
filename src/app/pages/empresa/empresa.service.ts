import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Empresa } from '../../shared-models/empresa';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class EmpresaService {

  private endPoint = 'desafio/empresa/manter';

  private endPointList = 'desafio/empresa/listar';

  private endPointRemover = 'desafio/empresa/remover';

  constructor(private http: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    )
  };

  public create(empresa: Empresa) {
    return this.http
      .post<Empresa>(`${environment.baseUrl}${this.endPoint}`, JSON.stringify(empresa), this.httpOptions)
      .pipe(
        //retry(2),
        catchError(this.handleError)
      );
  }

  public getAll() {
    return this.http.post<Empresa[]>(`${environment.baseUrl}${this.endPointList}`, JSON.stringify('') , this.httpOptions);
  }

  public excluir(_cnpj: string) {
    let cnpj = {cnpj: _cnpj};
    return this.http.post(`${environment.baseUrl}${this.endPointRemover}`, JSON.stringify(cnpj) , this.httpOptions);
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
