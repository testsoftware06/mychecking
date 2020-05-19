import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../shared-models/usuario';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
  preserveWhitespaces: true
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];

  filter = '';

  itemsPerPage: number = 10;

  p: number = 1;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuarioService.getAll().subscribe(
      dados => this.usuarios = dados
    );
  }

  editar(usuario: Usuario) {
    this.router.navigate(['/usuarios/usuario', usuario]);
  }

  excluir(usuario: Usuario) {
    const confirmado = confirm('Tem certeza que deseja excluir?');
    if (confirmado) {
      this.usuarioService.excluir(usuario.login).subscribe(
        () => this.usuarios = this.usuarios.filter(element => element != usuario),
        (error) => { console.log(error); }
      );
    }
  }

}
