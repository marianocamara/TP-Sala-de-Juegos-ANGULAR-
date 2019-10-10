import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { DbServiceService } from '../../servicios/db-service.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;

  isLoading: boolean = false;
  listado: any;

  constructor(private dbService: DbServiceService) {
    
  }
  
  ngOnInit() {
    this.isLoading = true;
    this.dbService.GetUsers()
      .then(result => {
        this.isLoading = false;
        console.log(result);
        this.listado = result;
      })
  }
  Traer() {
    this.isLoading = true;
    this.dbService.GetUsers()
      .then(result => {
        this.isLoading = false;
        console.log(result);
        this.listado = result;
      })
  }
}
