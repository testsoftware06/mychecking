import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared-services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared-models/usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from 'src/app/shared-models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  formLogin: FormGroup;
  formUsuarioNovo: FormGroup;

  spinner = false;
  isLogged = true;
  login = '';
  erro = false;
  statusEsqueceuSenhaSucesso: boolean = false;
  statusEsqueceuSenhaErro: boolean = false;

  erroUsuarioNovo: boolean = false;
  sucessoUsuarioNovo: boolean = false;

  display: string = '';

  @Output() tipo = '';

  @Output() mensagem = '';

  @ViewChild('modal', { static: true }) modal;

  @ViewChild('modalUsuarioNovo', { static: true }) modalUsuarioNovo;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarFormularioLogin();
  }

  criarFormularioLogin() {
    this.formLogin = this.fb.group({
      login: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  private createUserLogin() {
    const userLogin: Login = new Login();
    userLogin.login = this.formLogin.get('login').value;
    userLogin.password = this.formLogin.get('password').value;
    return userLogin;
  }

  enviarDados() {
    this.spinner = false;
    this.erro = false;

    if ( this.formLogin.valid ) {
      let userLogin: Login = this.createUserLogin();

      this.spinner = true;
      this.auth.login(userLogin)
        .then( () => {

        })
        .catch( () => {
          console.log('CATCH');
          this.spinner = false;
          this.erro = true;
        })
        .finally( () => {
          console.log('FINALLY');
          this.spinner = false;
          this.erro = true;
        });

    }
  }


  resetFormLogin() {
    this.formLogin.reset();
  }

  resetFormUsuarioNovo() {
    this.formUsuarioNovo.reset();
  }

  criarFormularioUsuarioNovo() {
    this.formUsuarioNovo = this.fb.group({
      login: ['', Validators.compose([Validators.required])],
      nome: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  private createUsuarioNovo() {
    const userNovo: Usuario = new Usuario();
    userNovo.login = this.formUsuarioNovo.get('login').value;
    userNovo.nome = this.formUsuarioNovo.get('nome').value;
    userNovo.password = this.formUsuarioNovo.get('password').value;
    return userNovo;
  }

  enviarDadosCadastro() {
    if (this.formUsuarioNovo.valid) {
      const userNovo: Usuario = this.createUsuarioNovo();

      this.spinner = true;

      this.erro = false;

      this.requisicaoUsuarioNovo(userNovo);
    }
    return;
  }

  private requisicaoUsuarioNovo(userNovo: Usuario) {
    this.auth.create(userNovo).subscribe(
      (response) => {
        this.spinner = false;
        this.sucessoUsuarioNovo = true;
        this.resetFormUsuarioNovo();
        setTimeout(() => {
          this.modalUsuarioNovo.nativeElement.click();
        }, 3000);
      },
      (error) => {
        this.spinner = false;
        this.erroUsuarioNovo = true;
        this.resetFormUsuarioNovo();
        setTimeout(() => {
          this.modalUsuarioNovo.nativeElement.click();
        }, 3000);
      }
    );
  }


  /*
  esqueciSenha() {
    this.auth.esqueciSenha(this.login).subscribe(
      () => {
        this.login = '';
        this.statusEsqueceuSenhaSucesso = true;
        setTimeout(() => {
          this.modal.nativeElement.click();
        }, 3000);
      },
      (error) => {
        this.login = '';
        this.statusEsqueceuSenhaErro = true;
        setTimeout(() => {
          this.modal.nativeElement.click();
        }, 3000);
      }
    );
  }*/
}
