import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { timer } from 'rxjs';
import { AlertService } from './alert/alert.service';
import { Alert } from './alert/alert'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class MessageComponent implements OnInit {
  public alert: Alert = null;
  private disableAlert = timer(15000);

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getAlert();
  }

  private getAlert() {
    this.alertService.alertSubject.subscribe(alert => {
      this.alert = alert;
      this.initAlertDismissTimer();
    })
  }

  private initAlertDismissTimer = () => {
    this.disableAlert.subscribe(() => {
      this.clearAlert();      
    });

    // this.countDown(30);
  };

  public clearAlert = () => {
    this.alert = null;
  };
}
