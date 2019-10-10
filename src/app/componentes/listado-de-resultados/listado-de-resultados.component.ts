
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { DbServiceService } from '../../servicios/db-service.service';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
  
  isLoading: boolean = false;
  @Input()
  listado: Array<any>;
  listadoPpt: Array<any>;
  listadoOp: Array<any>;
  listadoNs: Array<any>;
  listadoTateti: Array<any>;
  
  constructor(private dbService: DbServiceService) {
  }
  
  ngOnInit() {
    this.isLoading = true;
    this.dbService.GetResults("anagrama")
    .then(result => {
      this.isLoading = false;
      console.log(result);
      this.listado = result;
    })

    this.dbService.GetResults("agilidad")
    .then(result => {
      this.isLoading = false;
      console.log(result);
      this.listadoOp = result;
    })

    this.dbService.GetResults("adivina")
    .then(result => {
      this.isLoading = false;
      console.log(result);
      this.listadoNs = result;
    })

    this.dbService.GetResults("piedra, papel o tijera")
    .then(result => {
      this.isLoading = false;
      console.log(result);
      this.listadoPpt = result;
    })

    this.dbService.GetResults("tateti")
    .then(result => {
      this.isLoading = false;
      console.log(result);
      this.listadoTateti = result;
    })
    
  }
  
  ver() {
    console.info(this.listado);
  }
  
}
