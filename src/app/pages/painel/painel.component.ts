import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../empresa/empresa.service';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  countEmpresas: number;

  countUsuarios: number;

  constructor(
    private empresaService: EmpresaService,
    private usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    this.empresaService.getAll().subscribe(
      dados => this.countEmpresas = dados.length
    );

    this.usuarioService.getAll().subscribe(
      dados => this.countUsuarios = dados.length
    );
  }

}
