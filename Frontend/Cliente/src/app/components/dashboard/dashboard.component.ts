import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as ace from "ace-builds";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service:UserService) { }

  ngOnInit(): void {
    var consola = ace.edit('consola');
    consola.setReadOnly(true);
  }

  getData(){
    this.service.getdata().subscribe(
      (res:any)=>{
        console.log(res);
        alert(res.incremental)
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  setData(){
    var json={
      incremental:20
    }
    //Insertar lo que reciba el editor de texto
    this.service.setdata(json).subscribe(
      (res:any)=>{
        alert("Todo nice :3")
        
      }, 
      (err)=>{
        console.log(err);
      }
    )
  }

  file:any;
fileChanged(e:any) {
  var editor = ace.edit('editor');
    this.file = e.target.files[0];
    let fileReader = new FileReader();
    
    fileReader.onload = (e) => {
    editor.setValue(""+fileReader.result);
    
    }
   
    fileReader.readAsText(this.file);

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
      this.getConsola();
      
    }, 
    (err)=>{
      console.log(err);
    }
  )
}

getConsola(){
  
  var consola = ace.edit('consola');
  
  this.service.getConsola().subscribe(
    (res:any)=>{
      console.log(res)
      consola.setValue(res.consola)
      consola.clearSelection();
    },
    (err)=>{
      console.log(err);
    }
  )
}



}
