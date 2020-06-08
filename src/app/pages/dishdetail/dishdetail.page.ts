import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { CommentPage } from '../comment/comment.page'
import { DishService } from '../../services/dish.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dish: Dish;
  errMess:string;
  avgstars: string;
  numcomments: number;
  newComment : Comment;
  favorite: boolean;

  constructor(private route : ActivatedRoute, private router : Router,
    private actionCtrl : ActionSheetController,
    private modalCtrl: ModalController,
    private dishservice: DishService,
    private favoriteservice : FavoriteService,
    @Inject('BaseURL') private BaseURL) { 
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.dish = this.router.getCurrentNavigation().extras.state.dish;
        this.favorite = favoriteservice.isFavorite(parseInt(this.dish.id,10));
        this.numcomments = this.dish.comments.length;
        let total = 0;
        this.dish.comments.forEach(comment => total += comment.rating );
        this.avgstars = (total/this.numcomments).toFixed(2);
      }
    });
    
  }

  ngOnInit() {
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(parseInt(this.dish.id,10));
    
  }
  removeFromFavorites() {
    console.log('Removing Favorites', this.dish.id);
    this.favorite = this.favoriteservice.removeFavorite(parseInt(this.dish.id,10));
    
  }
  async handleButtonClick() {
    const actionSheet = await this.actionCtrl.create({
      
      buttons: [
        { text: 'Add To Favorites', icon : 'heart', 
        handler : () =>{
          console.log('add to favourites');
          this.addToFavorites();
        } },
        { text: 'Add a Comment', icon : 'chatbubble-ellipses',
        handler : async () => {
          const modal = await this.modalCtrl.create({
            component: CommentPage,
          });
          modal.onDidDismiss()
          .then((data) => {
              this.newComment = data['data']; 
              console.log('Dish-detail '); // Here's your selected user!
              console.log(data);
              if(this.newComment){
                this.dish.comments.push(this.newComment);
                this.dishservice.putDish(this.dish)
                .subscribe(dish => {
                this.dish = dish;
                    },
                errmess => { this.dish = null; this.errMess = <any>errmess; });
              }
          });
          await modal.present();

        }
        },
        { text: 'Cancel', role: 'cancel' }
      ]
    });

    await actionSheet.present();
  }


}
