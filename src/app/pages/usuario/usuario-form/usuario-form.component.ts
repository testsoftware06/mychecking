import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../shared-models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  formHTML: FormGroup;

  spinner = false;

  isLogged = false;

  sucesso = false;

  erro = false;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.criarForm();
    this.route.params.subscribe(
      dados => this.formHTML.patchValue(dados)
    );
  }

  criarForm() {
    this.formHTML = this.formBuilder.group({
      codigo: [''],
      nome: ['', Validators.compose([ Validators.required ])],
      login: ['', Validators.compose([ Validators.required ])],
      password: ['', Validators.compose([ Validators.required ])],
    });
  }

  resetForm() {
    this.formHTML.reset();
  }


  private createUser() {
    const user: Usuario = new Usuario();
    user.nome = this.formHTML.get('nome').value;
    user.login = this.formHTML.get('login').value;
    user.password = this.formHTML.get('password').value;
    return user;
  }

  enviarDados() {

    if ( this.formHTML.valid ) {
      const user: Usuario = this.createUser();
      this.spinner = true;
      this.requisicao(user);
    }

  }

  private requisicao(user: Usuario) {
    this.usuarioService.update(user).subscribe(response => {
      this.spinner = false;
      this.sucesso = true;
      this.resetForm();
    }, error => {
      this.spinner = false;
      this.erro = true;
      this.resetForm();
    });
  }

}
