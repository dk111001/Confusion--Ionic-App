import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NetworkErrorPage } from './network-error.page';

describe('NetworkErrorPage', () => {
  let component: NetworkErrorPage;
  let fixture: ComponentFixture<NetworkErrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkErrorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
