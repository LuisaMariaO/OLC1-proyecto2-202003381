import { Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as ace from "ace-builds";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']

  
})
export class EditorComponent implements AfterViewInit {

  constructor(private service:UserService) { }


  ngAfterViewInit(): void {
    var consola = ace.edit('consola');
    consola.setReadOnly(true);
    
  
  }

  run(){
    var editor = ace.edit('editor');
    var json={
      data:editor.getValue()
    }
    //Insertar lo que reciba el editor de texto
    this.service.setdata(json).subscribe(
      (res:any)=>{
        console.log(res)
        
        
      }, 
      (err)=>{
        console.log(err);
      }
    )
  }

}
