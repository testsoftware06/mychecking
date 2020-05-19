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

  constructor(private marcacaoService: MarcacaoService) {
    moment.locale('pt-br');
  }

  ngOnInit() {

  }


  getTag() {

    const marcacao = new Marcacao();

    marcacao.from = moment(this.from).format('DD/MM/YYYY 00:00:00');
    marcacao.to = moment(this.to).format('DD/MM/YYYY 23:59:59');

    console.log(marcacao);

    this.achou = false;

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
