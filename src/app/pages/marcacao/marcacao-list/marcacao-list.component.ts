import { Component, OnInit } from '@angular/core';
import { Marcacao } from '../../../shared-models/marcacao';
import { MarcacaoService } from '../marcacao.service';
import * as moment from 'moment';

@Component({
  selector: 'app-marcacao-list',
  templateUrl: './marcacao-list.component.html',
  styleUrls: ['./marcacao-list.component.css'],
  preserveWhitespaces: true
})
export class MarcacaoListComponent implements OnInit {

  marcacoes: Marcacao[];

  tag: Marcacao;

  achou = false;

  from: Date;
  to: Date;

  filter = '';

  itemsPerPage: number = 10;

  p: number = 1;

  constructor(private marcacaoService: MarcacaoService) { }

  ngOnInit() {

  }

  swap32(val) {
    return ((val & 0xFF) << 24)
           | ((val & 0xFF00) << 8)
           | ((val >> 8) & 0xFF00)
           | ((val >> 24) & 0xFF);
  }


  getTag() {

    const marcacao = new Marcacao();

    marcacao.from = moment(this.from).format('DD/MM/YYYY HH:mm:ss.SSS');
    marcacao.to = moment(this.to).format('DD/MM/YYYY HH:mm:ss.SSS');

    console.log(marcacao);

    this.marcacaoService.getAll(marcacao).subscribe(
      (dados) => {
          if( dados.length > 0 ) {
            this.marcacoes = dados;
            this.achou = true;
          }
      }
    );
  }
}
