import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSecondComponent } from './navbar-second.component';

describe('NavbarSecondComponent', () => {
  let component: NavbarSecondComponent;
  let fixture: ComponentFixture<NavbarSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSecondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
