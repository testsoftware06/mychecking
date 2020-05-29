import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared-services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') == null) {
      this.sair();
    }
  }


  sair() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
