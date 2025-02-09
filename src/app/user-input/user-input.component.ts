import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentCalculatorService } from '../investment-calculator.service';


@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  Inital: number = 0;
  Annual: number = 0;
  Return: number = 0;
  Duration: number = 0; 
  
  constructor(private investmentservice :InvestmentCalculatorService ) { }

  onSubmit() {
    console.log('Form submitted!');

    const userdata = {
      initial: this.Inital,
      annualInvestment: this.Annual,
      Estimated: this.Return,
      duration: this.Duration
    }

    this.investmentservice.getdata(userdata);
  }

}
