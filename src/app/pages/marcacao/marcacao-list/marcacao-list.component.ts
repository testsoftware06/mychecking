import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

import { MarcacaoService } from '../marcacao.service';
import { Marcacao } from '../../../shared-models/marcacao';
import { FileService } from '../file.service';


@Component({
  selector: 'app-marcacao-list',
  templateUrl: './marcacao-list.component.html',
  styleUrls: ['./marcacao-list.component.css'],
  preserveWhitespaces: true
})
export class MarcacaoListComponent implements OnInit {

  marcacoes: Marcacao[];

  fileExcel = [];

  tag: Marcacao;

  achou = false;

  from: Date;
  to: Date;

  filter = '';

  itemsPerPage: number = 10;

  p: number = 1;

  constructor(
    private marcacaoService: MarcacaoService,
    private fileService: FileService
    ) {
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
          if ( dados.length > 0 ) {
            this.marcacoes = dados;
            this.achou = true;
          }
      }
    );
  }

  exportAsXLSX():void {
    const json = this.marcacoes.map( ( item ) => {
      return {
        tag:  parseInt('0x'+item.valor.match(/../g).reverse().join('')),
        datahora: moment(item.datahora).format('DD/MM/YYYY HH:mm:ss'),
        registro: item.codigo
      }
    });
    this.fileService.exportAsExcelFile(json, 'registros');
 }


}
