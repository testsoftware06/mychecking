import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() mensagem: string;
  @Input() tipo: string;

  display = 'display';

  constructor() {
    setTimeout(() => {
      this.display = 'none';
    }, 3000);
  }
  ngOnInit(): void {
  }

 gOnInit() {
  }

}
