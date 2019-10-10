import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
  }
  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
          this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
          this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'Ppt':
          this.router.navigate(['/Juegos/Ppt']);
        break;
      case 'Anagrama':
          this.router.navigate(['/Juegos/Anagrama']);
        break;
        case 'Tateti':
          this.router.navigate(['/Juegos/Tateti']);
        break;
        case 'Simon-dice':
          this.router.navigate(['/Juegos/Simon']);
        break;
    }
  }
}
