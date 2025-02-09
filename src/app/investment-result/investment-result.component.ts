import { Component, Pipe } from '@angular/core';
import { InvestmentCalculatorService } from '../investment-calculator.service';
import { pipe, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investment-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment-result.component.html',
  styleUrl: './investment-result.component.css'
})
export class InvestmentResultComponent {

  investmentData: any[] = [];

  private subscription!: Subscription;

  constructor(private investmentservice: InvestmentCalculatorService) { }

  ngAfterViewInit() {
    // Subscribe to the observable and update the component's state
    this.subscription = this.investmentservice.userdata$.subscribe((data) => {
      this.investmentData.push(data);  // Add the incoming data to the array
    });
  }


  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
