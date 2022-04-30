import { Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as ace from "ace-builds";
import {MatDialog} from '@angular/material/dialog'
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']

  
})
export class EditorComponent {

  constructor(public dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
  
  
  

