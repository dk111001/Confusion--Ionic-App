import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
// import { DISHES } from '../shared/dishes';  from server

import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { HttpHeaders } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService,
    private dishservice: DishService,
    private localNotifications: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
  }


  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
    console.log('favorites', this.favorites);
    this.localNotifications.schedule({
      id: id,
      text: 'Dish ' + id + ' added as a favorite successfully'
    });
    return true;
  }

  removeFavorite(id: number): boolean {
    if (this.isFavorite(id)){
      let index = this.favorites.indexOf(id);
      this.favorites.splice(index,1);
    }
    console.log('favorites', this.favorites);
    return false;
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
    .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el===dish.id))));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  
  }
  isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }
}
