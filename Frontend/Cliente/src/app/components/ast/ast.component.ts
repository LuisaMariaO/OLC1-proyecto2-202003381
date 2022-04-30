import { Component, OnInit } from '@angular/core';


import { graphviz }  from 'd3-graphviz';
import { wasmFolder } from "@hpcc-js/wasm";



@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css']
})
export class ASTComponent  {
//shtmlString = '<h1>Hello gowtham</h1>';

  

  public svg:any;
  constructor() { }

  ngOnInit(): void {
    wasmFolder('/assets/@hpcc-js/wasm/dist/');
    graphviz('div').renderDot('digraph {a -> b}');
  }
  }


