import { Component, OnInit, Output } from '@angular/core';
import { CalcHistory, Result } from '../models/calculator.model';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css'],
})
export class CalculationComponent implements OnInit {
  result!: number;
  calcHistory = new CalcHistory();


  constructor() {}

  ngOnInit(): void {}

  calculate(event: any) {
    
    switch (event['operator']) {
      case '+': {
        this.result = Number.parseInt(event.operand1) + Number.parseInt(event.operand2);
        break;
      }
      case '/': {
        this.result = +event.operand1 / ++event.operand2;
        break;
      }
      case '*': {
        this.result = +event.operand1 * +event.operand2;
        break;
      }
      case '-': {
        this.result = +event.operand1 - +event.operand2;
        break;
      }
    }
    this.resultBuilder(event,this.result);
  }

  resultBuilder(event: any , result: number){
    let indiResult= new Result();
    indiResult.operand1= event.operand1;
    indiResult.operand2= event.operand2;
    indiResult.operator= event.operator;
    // indiResult = event;
    indiResult.result= this.result;
    this.calcHistory.history.push(indiResult);
    console.log(this.calcHistory);
  }

  

}
