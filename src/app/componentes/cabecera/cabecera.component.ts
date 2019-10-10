import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  usuarioLogueado: any;
  nombre:any;

  constructor(public  authService:  AuthService) {

    if (this.authService.isLoggedIn)
    this.usuarioLogueado = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

}
