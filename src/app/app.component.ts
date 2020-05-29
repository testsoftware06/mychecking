import { Component, OnInit, Output, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "./shared-services/auth.service";
import { Usuario } from "./shared-models/usuario";
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  formLogin: FormGroup;
  formUsuarioNovo: FormGroup;

  spinner = false;
  isLogged = true;
  login = '';
  erro = '';
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

    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }

   // this.criarFormularioLogin();
   // this.criarFormularioUsuarioNovo();
  }

  criarFormularioLogin() {
    this.formLogin = this.fb.group({
      login: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  private createUserLogin() {
    const userLogin: Usuario = new Usuario();
    userLogin.login = this.formLogin.get('login').value;
    userLogin.password = this.formLogin.get('password').value;
    return userLogin;
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
        password: ['', Validators.compose([Validators.required])]
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

        this.erro = '';

        this.requisicaoUsuarioNovo(userNovo);
      }
      return;
    }

    private requisicaoUsuarioNovo(userNovo: Usuario) {
      this.auth.create(userNovo).subscribe(
          response => {
            this.spinner = false;
            this.sucessoUsuarioNovo = true;
            this.resetFormUsuarioNovo();
            setTimeout(() => {
              this.modalUsuarioNovo.nativeElement.click();
            }, 3000);
          },
          error => {
            this.spinner = false;
            this.erroUsuarioNovo = true;
            this.resetFormUsuarioNovo();
            setTimeout(() => {
              this.modalUsuarioNovo.nativeElement.click();
            }, 3000);
          }
        );
    }

    navegarPainel() {
      this.router.navigate(['/painel']);
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
        error => {
          this.login = '';
          this.statusEsqueceuSenhaErro = true;
          setTimeout(() => {
            this.modal.nativeElement.click();
          }, 3000);
        }
      );
    }
*/
  }
