import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Empresa } from '../../../shared-models/empresa';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {

  formularioDeEmpresa: FormGroup;

  spinner = false;

  isLogged = false;

  sucesso = false;

  erro = false;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.criarFormularioDeEmpresa();
    this.route.params.subscribe(
      dados => this.formularioDeEmpresa.patchValue(dados)
    );
  }

  criarFormularioDeEmpresa() {
    this.formularioDeEmpresa = this.fb.group({
      razaoSocial: ['', Validators.compose([ Validators.required ])],
      cnpj: ['', Validators.compose([ Validators.required ])],
      administrador: ['', Validators.compose([ Validators.required ])],
    });
  }

  enviarDados() {

    if ( this.formularioDeEmpresa.valid ) {

      const empresa: Empresa = this.createEmpresa();

      this.spinner = true;

      this.requisicao(empresa);
    }

  }

  private requisicao(empresa: Empresa) {
    this.empresaService.create(empresa).subscribe(response => {
      this.spinner = false;
      this.sucesso = true;
      this.resetForm();
    }, error => {
      this.spinner = false;
      this.erro = true;
      this.resetForm();
    });
  }

  resetForm() {
    this.formularioDeEmpresa.reset();
  }


  private createEmpresa() {
    const empresa: Empresa = new Empresa();
    empresa.razaoSocial = this.formularioDeEmpresa.get('razaoSocial').value;
    empresa.cnpj = this.formularioDeEmpresa.get('cnpj').value;
    empresa.administrador = this.formularioDeEmpresa.get('administrador').value;
    return empresa;
  }


}
