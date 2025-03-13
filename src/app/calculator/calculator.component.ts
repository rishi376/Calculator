import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  result: string = "";
  firstOperand: number = 0;
  operator: string = "";
  secOperand: number = 0;
  historyEnabled = false;
  history?: string[] =  [];

  operand(num: string) {
    // if(this.operator == "") {
    //   this.firstOperand = this.firstOperand*10 + Number(num);  
    //   this.result += num;  
    // }
    // else {
    //   this.secOperand = this.secOperand*10 + Number(num);
    //   this.result += num; 
    // }
    this.result += num;
  }

  calculate(input: string): void {
    switch(input) {
      case '+/-':
        this.changeSign();
        break;
      case 'c':
        this.result = this.result.slice(0, -1);
        break;
      case 'ac':
        this.result = "";
        this.firstOperand = 0;
        this.secOperand = 0;
        this.operator = "";
        break;
      case '=':
        this.addHistory();
        break;
      default: 
        this.operate(input);
        break;
    }
  }
  
  operate(input: string) {
    // if(this.operator != "") {
    //   switch(this.operator) {
    //     case '+':
    //       this.firstOperand += this.secOperand;
    //       break;
    //     case '-':
    //       this.firstOperand -= this.secOperand;
    //       break;
    //     case '*':
    //       this.firstOperand *= this.secOperand;
    //       break;
    //     case '÷':
    //       this.firstOperand /= this.secOperand;
    //       break;
    //     case '%':
    //       this.firstOperand %= this.secOperand;
    //       break;
    //   }
    //   this.result = this.firstOperand.toString() + input;
    //   this.secOperand = 0;
    //   this.operator = input;
    // }
    // else {
    //   this.operator = input;
    //   this.result += input;
    // }
    this.result += input;
  }

  changeSign(): void {
    let lastElement = this.result.at(-1);
    if(Number(lastElement)) {
      let i;
      for(i = this.result.length - 1; i >= 0; i--) {
        if(this.result[i] == '+' || this.result[i] == '/' || this.result[i] == '*' || this.result[i] == '-') {
          break;
        }
      }
      lastElement = this.result.slice(i+1);
      this.result = this.result.slice(0, i+1);
      if(lastElement.at(-1) == ')') {
        lastElement = lastElement.substring(1, -2);
      }
      this.result += '(' + '-' + lastElement + ')'; 
    }
    else if(lastElement == ')') {
      let i;
      for(i = this.result.length - 1; i >= 0; i--) {
        if(this.result[i] == '(') {
          break;
        }
      }
      lastElement = this.result.slice(i);
      this.result = this.result.slice(0, i);
      const match = lastElement.match(/^\(([-+]?\d+(\.\d+)?)\)$/);
      if (match) {
        const numberString = match[1];
        this.result += (-Number(numberString)).toString();
      }
    }
  }

  addHistory(): void {
    //todo: Using direct eval with a bundler is not recommended and may cause problems
    this.history?.push(this.result);
    this.result = eval(this.result).toString();

  }

  setResult(equation: string): void {
    this.result = equation;
  }
}


