import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentCalculatorService {

  Inital: string = '';
  Annual: string = '';
  Return: string = '';
  Duration: string = '';

  constructor() { }

  private userdata = new Subject<any>();
  userdata$ = this.userdata.asObservable();

  data = {
    initial: this.Inital,
    annualInvestment: this.Annual,
    Estimated: this.Return,
    duration: this.Duration
  }

  calculateInvestmentResults(initialInvestment: number, annualInvestment: number, expectedReturn: number, duration: number) {
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest = investmentValue - annualInvestment * year - initialInvestment;
      this.userdata.next({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
  }

  getdata(data: any) {
    this.calculateInvestmentResults(data.initial, data.annualInvestment, data.Estimated, data.duration);
  }

}
