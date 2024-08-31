import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {CommonModule, JsonPipe} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {response} from "express";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HttpClientModule, JsonPipe, RouterOutlet, CommonModule, FormsModule],
})
export class AppComponent implements OnInit {
  codigoPostal: string = '';
  colonias: any[] = [];
  municipio:string = '';
  entidad: string = '';
  //data: any;
  title: string = 'Angular Cli';

  constructor(private http: HttpClient) { }
  buscarColonia(){
    if(this.codigoPostal){
      this.http.get<any[]>(`http://127.0.0.1:3000/data?cp=${this.codigoPostal}`).subscribe(
        response => {
          this.colonias = response;
          if(response.length > 0){
            this.municipio = response[0].nombremunicipio;
            this.entidad = response[0].nombreentidad;
          }else {
            this.municipio = '';
            this.entidad = '';
          }
        },
        error => { console.log('Error al obtener los datos',error); }
      )
    }
  }

  ngOnInit(): void {
  }
}

