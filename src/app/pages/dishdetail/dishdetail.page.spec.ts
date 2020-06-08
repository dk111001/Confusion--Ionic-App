import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DishdetailPage } from './dishdetail.page';

describe('DishdetailPage', () => {
  let component: DishdetailPage;
  let fixture: ComponentFixture<DishdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DishdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
