import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs';
import { StoreUser } from './user.actions';
import { AlertService } from '../shared/components/message/alert/alert.service';
import { Alert } from '../shared/components/message/alert/alert';
import { AlertType } from '../shared/components/message/alert/alert-type.enum';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = '/api/user';

  constructor(
    private httpClient:HttpClient,
    private store:Store,
    private alertService:AlertService
  ) { }

  public signUp = (user) => {
    return this.httpClient.post(this.url, {user}).pipe(
      tap(userData => {
        console.log('userData: ' + userData)
        this.store.dispatch(StoreUser({user: userData}))
      }),
      catchError(error => {
        console.log('error', error)
        this.processErrorMessage(error);
        throw error;
      })    
    )
  }

  public signIn = (user) => {
    return this.httpClient.put(this.url, {user}).pipe(
      tap(userData => {
        console.log('userData: ' + userData)
        this.store.dispatch(StoreUser({user: userData}))
      }),
      catchError(error => {
        console.log('error', error)
        this.processErrorMessage(error);
        throw error;
      })    
    )
  }

  public signOut = () => {
    this.httpClient.put('api/user/signout', {}).pipe(
      tap(userData => {
        console.log('userData: ' + userData)
        this.store.dispatch(StoreUser({user: userData}))
      }),
      catchError(error => {
        console.log('error', error)
        this.processErrorMessage(error);
        throw error;
      })    
    ).subscribe()
  }

  private processErrorMessage = (error) => {
    // const error = { error: errorText, status: 201 };
    let message = error.error;
    let status = error.status;
    let errorMessage = `${message}`;

    let alert = new Alert(errorMessage, AlertType.DANGER);
    this.alertService.sendAlert(alert);
  };

}


