export abstract class Juego {
  public nombre = 'Sin Nombre';
  public jugador: string;
  public gano = false;
  public id;
  public partidas;

  constructor(nombre?: string, gano?: boolean,jugador?:string, partidas?:string) {
    if (nombre)
      this.nombre = nombre;
if(partidas)
this.partidas=partidas;
    if (gano)
      this.gano = gano;
    if(jugador)
      this.jugador=jugador;
    else
      this.jugador= "desconocido";
  }


  

  public abstract verificar():boolean; 
  
  public retornarAyuda() {
    
    return "NO hay Ayuda definida";
  }
}
