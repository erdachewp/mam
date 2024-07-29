import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../_services';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  private subscription! : Subscription; 
  public message: any;
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert().subscribe(
      message => {
        switch( message && message.type){
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
        }
        this.message = message;
      }
    );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
