import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish[];
  errMess:string;

  constructor(private dishService: DishService,
    private router : Router,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

  dishSelected(dish :Dish){
    let navigationExtras : NavigationExtras = {
      state : {
        dish : dish
      }
    }
    this.router.navigate(['menu/dishdetail'],navigationExtras);
  }

}
