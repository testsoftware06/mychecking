import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared-services/auth.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent implements OnInit {

  version = '';

  constructor(private service: AuthService) { }

  ngOnInit() {
    this.getVersion();
  }

  getVersion() {
    //this.service.getVersion().subscribe(dados => this.version = dados['version']);
  }

}
