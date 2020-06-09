import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Promotion } from '../../shared/promotion';
import { Leader } from '../../shared/leader';
import { DishService } from '../../services/dish.service';
import { PromotionService } from '../../services/promotion.service';
import { LeaderService } from '../../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dish: Dish;
  dishErrMess : string;
  promotion :Promotion;
  promoErrMess :string;
  leader : Leader;
  leaderErrMess : string;

  constructor(private dishservice: DishService,
    private promotionservice :PromotionService,
    private leaderservice : LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe((dish) => this.dish = dish, errmes => this.dishErrMess = <any>errmes);
    this.promotionservice.getFeaturedPromotion().subscribe((promotion)=> this.promotion = promotion, errmes => this.promoErrMess = <any>errmes);
    this.leaderservice.getFeaturedLeader().subscribe((leader)=> this.leader = leader, errmes => this.leaderErrMess = <any>errmes);
    console.log(this.promoErrMess);
  }
}
