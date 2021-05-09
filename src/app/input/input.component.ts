import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  
  @Output() operands= new EventEmitter<any> ();
  @Input() result: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  calculate(calc: NgForm){
    const inputFields = {
      operand1: calc.form.value["operand1"],
      operand2: calc.form.value["operand2"],
      operator: calc.form.value["operator"],
    }
    this.operands.emit(inputFields);
    
  }

}
