import { Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as ace from "ace-builds";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']

  
})
export class EditorComponent implements AfterViewInit {



  ngAfterViewInit(): void {
    var editor = ace.edit('consola');
    editor.setReadOnly(true);
    
  
  }

}
