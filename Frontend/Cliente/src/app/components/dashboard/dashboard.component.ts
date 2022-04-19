import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service:UserService) { }

  ngOnInit(): void {
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

}
