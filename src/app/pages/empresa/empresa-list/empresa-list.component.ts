import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../empresa.service';
import { Empresa } from '../../../shared-models/empresa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css'],
  preserveWhitespaces: true
})
export class EmpresaListComponent implements OnInit {

  empresas: Empresa[];

  filter = '';

  itemsPerPage: number = 10;

  p: number = 1;

  constructor(
    private empresaService: EmpresaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.empresaService.getAll().subscribe(
      dados => this.empresas = dados
    );
  }

  edit(empresa: Empresa) {
    this.router.navigate(['/empresas/empresa', empresa]);
  }

  excluir(empresa: Empresa) {
    const confirmado = confirm('Tem certeza que deseja excluir?');
    if (confirmado) {
      this.empresaService.excluir(empresa.cnpj).subscribe(
        () => this.empresas = this.empresas.filter(element => element != empresa),
        (error) => { alert('Falha ao excluir, usuário vinculado'); }
      );
    }
  }

}
