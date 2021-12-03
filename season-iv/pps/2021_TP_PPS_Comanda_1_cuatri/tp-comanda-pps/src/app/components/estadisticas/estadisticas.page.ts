import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import * as Chart from 'chart.js'
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { R3TargetBinder } from '@angular/compiler';
import { Router } from '@angular/router';



@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {


  myChart : Chart;
  ctx;

  listaEncuestas;
  encuestas;

  //¿Cuál es su edad?
  treceAVeite = 0;
  veinteATreinta = 0;
  treintaACuarenta = 0;
  masDeCuarenta = 0;

  //¿Qué le hizo sentir más a gusto?
  musica = 0;
  cuadros = 0;
  television = 0;

  //Nos recomendaría para... 
  recomendadosAmigos = 0;
  recomendadosFamilia = 0;
  recomendadosTrabajo = 0;

  //¿Qué le pareció nuestro protocolo de limpieza?
  limpiezaUno = 0;
  limpiezaDos = 0;
  limpiezaTres = 0;
  limpiezaCuatro = 0;
  limpiezaCinco = 0;
  limpiezaSeis = 0;
  limpiezaSiete= 0;
  limpiezaOcho = 0;
  limpiezaNueve = 0;
  limpiezaDiez = 0;


  index = 0;
  

 
  constructor(private auth: AuthService,private router: Router) {
    
  }


  async ngOnInit() {

    (await this.auth.traerEncuestas()).subscribe((e: any) => {
      const dat: any = {};
     
      
      e.forEach((f) => {
        
        dat.llamativo = f.llamativo;
        dat.rangoEdad = f.rangoEdad;
        dat.puntajeProtocolo = f.puntajeProtocolo;
        dat.recomendados = f.recomendados;


        if(dat.llamativo == "musica"){
          this.musica++;

        }
        if(dat.llamativo == "television"){
          this.television++;

        }
        if(dat.llamativo == "cuadros"){
          this.cuadros++;

        }
        
        if(dat.rangoEdad == "40+"){
          this.masDeCuarenta++;
        }
        if(dat.rangoEdad == "20 a 30"){
          this.veinteATreinta++;
        }
        if(dat.rangoEdad == "30 a 40"){
          this.treintaACuarenta++;
        }
        if(dat.rangoEdad == "13 a 20"){
          this.treceAVeite++;
        }


        switch (dat.puntajeProtocolo) {
          case 1:
            this.limpiezaUno++;
            break;
          case 2:
            this.limpiezaDos++;
            break;
          case 3:
            this.limpiezaTres++;
            break;
          case 4:
            this.limpiezaCuatro++;
            break;
          case 5:
            this.limpiezaCinco++;
            break;
          case 6:
            this.limpiezaSeis++;
            break;
          case 7:
            this.limpiezaSiete++;
            break;
          case 8:
            this.limpiezaOcho++;
            break;
          case 9:
            this.limpiezaNueve++;
            break;
          case 10:
            this.limpiezaDiez++;
            break;

          default:
            break;
        }

       
        dat.recomendados.forEach((element) => {
          if(element == "famlia")
          {
            this.recomendadosFamilia++;

          }
          if(element == "amigos")
          {
            this.recomendadosAmigos++;

          }
          if(element == "trabajo")
          {
            this.recomendadosTrabajo++;

          }
        });

      });

      this.generarCanvas();
      this.generarCanvas2();
      this.generarCanvas3();
      this.generarCanvas4();
    });
    
     
    
   
  }


  generarCanvas(){
    this.ctx = document.getElementById('myChart');
    this.ctx = this.ctx as HTMLCanvasElement;
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: ['Musica', 'Cuadros', 'Television'],
          datasets: [{          
              label: 'VOTOS',
              data: [this.musica,this.cuadros,this.television ],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',//rojo
                  //'rgba(54, 162, 235, 0.2)', azul
                  'rgba(255, 206, 86, 0.2)',//amarillo
                  //'rgba(75, 192, 192, 0.2)',verde
                  //'rgba(153, 102, 255, 0.2)',violeta
                  'rgba(255, 159, 64, 0.2)'//naranja
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  //'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  //'rgba(75, 192, 192, 1)',
                  //'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{           
                ticks:{
                  fontSize: 20,
                  beginAtZero: true,
                  
                }
              }],
              xAxes: [{           
                ticks:{
                  fontSize: 20,
                  
                  
                }
              }]
          }
      }
  });
  }
 
  generarCanvas2(){
    this.ctx = document.getElementById('myChart2');
    this.ctx = this.ctx as HTMLCanvasElement;
    
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: ['13 a 20', '20 a 30', '30 a 40','40+'],
          datasets: [{
              label: 'VOTOS',
              
              data: [this.treceAVeite,this.veinteATreinta,this.treintaACuarenta,this.masDeCuarenta ],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',//rojo
                  //'rgba(54, 162, 235, 0.2)', azul
                  'rgba(255, 206, 86, 0.2)',//amarillo
                  //'rgba(75, 192, 192, 0.2)',verde
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'//naranja
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  //'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  //'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                ticks:{
                  fontSize: 20,
                  beginAtZero: true
                }
              }],
              xAxes: [{           
                ticks:{
                  fontSize: 15,
                  
                  
                }
              }]
          }
      }
  });
  }

  generarCanvas3(){
    this.ctx = document.getElementById('myChart3');
    this.ctx = this.ctx as HTMLCanvasElement;
    
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: ['Familia', 'Trabajo', 'Amigos'],
          datasets: [{
              label: 'VOTOS',
              
              data: [this.recomendadosFamilia,this.recomendadosTrabajo,this.recomendadosAmigos],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',//rojo
                  //'rgba(54, 162, 235, 0.2)', azul
                  'rgba(255, 206, 86, 0.2)',//amarillo
                  //'rgba(75, 192, 192, 0.2)',verde
                  //'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'//naranja
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  //'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  //'rgba(75, 192, 192, 1)',
                  //'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                ticks:{
                  fontSize: 20,
                  beginAtZero: true
                }
              }],
              xAxes: [{           
                ticks:{
                  fontSize: 20,
                  
                  
                  
                }
              }]
          }
      }
  });
  }


  generarCanvas4(){
    this.ctx = document.getElementById('myChart4');
    this.ctx = this.ctx as HTMLCanvasElement;
    
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: ['1', '2', '3','4','5','6','7','8','9','10'],
          datasets: [{
              label: 'VOTOS',
              
              data: [
                this.limpiezaUno,
                this.limpiezaDos,
                this.limpiezaTres,
                this.limpiezaCuatro,
                this.limpiezaCinco,
                this.limpiezaSeis,
                this.limpiezaSiete,
                this.limpiezaOcho,
                this.limpiezaNueve,
                this.limpiezaDiez,
               ],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',//rojo
                  'rgba(54, 162, 235, 0.2)', //azul
                  'rgba(255, 206, 86, 0.2)',//amarillo
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',//verde
                  'rgba(153, 102, 255, 0.2)',//violeta
                  'rgba(255, 159, 64, 0.2)',//naranja
                  'rgba(255, 64, 160, 0.2)',//rosa
                  'rgba(64, 179, 255, 0.2)',//celeste
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 64, 160, 1)',//rosa
                  'rgba(64, 179, 255, 1)',//celeste
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                ticks:{
                  fontSize: 20,
                  beginAtZero: true
                }
              }],
              xAxes: [{           
                ticks:{
                  fontSize: 15,
                  
                  
                }
              }]
          }
      }
  });
  }


  async traerData(){
    
    await this.listaEncuestas.subscribe((doc) => {
      if (doc.length != 0) {

        doc.forEach((encuesta) => {

         
          if(encuesta.llamativo == "musica"){
            this.musica++;

          }
          if(encuesta.llamativo == "television"){
            this.musica++;

          }
          if(encuesta.llamativo == "cuadros"){
            this.musica++;

          }
          
          if(encuesta.rangoEdad == "40+"){
            this.masDeCuarenta++;
          }
          if(encuesta.rangoEdad == "20 a 30"){
            this.veinteATreinta++;
          }
          if(encuesta.rangoEdad == "30 a 40"){
            this.treintaACuarenta++;
          }
          if(encuesta.rangoEdad == "13 a 20"){
            this.treceAVeite++;
          }


          switch (encuesta.puntajeProtocolo) {
            case 1:
              this.limpiezaUno++;
              break;
            case 2:
              this.limpiezaDos++;
              break;
            case 3:
              this.limpiezaTres++;
              break;
            case 4:
              this.limpiezaCuatro++;
              break;
            case 5:
              this.limpiezaCinco++;
              break;
            case 6:
              this.limpiezaSeis++;
              break;
            case 7:
              this.limpiezaSiete++;
              break;
            case 8:
              this.limpiezaOcho++;
              break;
            case 9:
              this.limpiezaNueve++;
              break;
            case 10:
              this.limpiezaDiez++;
              break;

            default:
              break;
          }

          encuesta.recomendados.array.forEach(element => {
            if(element == "famlia")
            {
              this.recomendadosFamilia++;

            }
            if(element == "amigos")
            {
              this.recomendadosAmigos++;

            }
            if(element == "trabajo")
            {
              this.recomendadosTrabajo++;

            }
          });



        });

      }//fin si
    });
  }


  volver(){
    if(AuthService.dataUsrEspera.mesa != ''){
      this.router.navigate(["/mesa"]);

    }
    else{
      this.router.navigate(["/home"]);

    }
  }

}
