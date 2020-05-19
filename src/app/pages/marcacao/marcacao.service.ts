import { Injectable } from '@angular/core';
import { Marcacao } from '../../shared-models/marcacao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcacaoService {

  constructor(private http: HttpClient) { }

  private endPointLoadTag = 'desafio/tag/load';

 // Headers
 httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

  public getAll(marcacao: Marcacao) {
    return this.http.post<Marcacao[]>(`${environment.baseUrl}${this.endPointLoadTag}`, marcacao , this.httpOptions);
  }

}
