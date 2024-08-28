import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from "./shared/components/header/header.component";
import { UserComponent } from './user/user.component';
import { MessageComponent } from "./shared/components/message/message.component";
import { AppService } from './app.service';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    FooterComponent, 
    FooterComponent, 
    HeaderComponent, 
    UserComponent, 
    MessageComponent,
    BreadcrumbsComponent
  ],
    
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';

  constructor(
    private appService:AppService,
  ) {}

  ngOnInit() {
    this.appService.restoreStateFromLocalStorage();    
  }
}
