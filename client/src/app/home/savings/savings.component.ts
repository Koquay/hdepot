import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.scss'
})
export class SavingsComponent {
  public savings:any;

  constructor(
    private store: Store<{ homeReducers:any; }>,
  ){}

  ngOnInit() {
    this.subscribeToReduxStores();    
  }

  private subscribeToReduxStores = () => {
    const homeReducers$ = this.store.select((state) => {
      return state.homeReducers;
    });

    homeReducers$.subscribe((homeReducers:any) => {
      // console.log('savings.homeReducers', homeReducers)
      this.savings = homeReducers.savings;
      console.log('savings', this.savings)
    });
  }
}
