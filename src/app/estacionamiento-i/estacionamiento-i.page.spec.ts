import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstacionamientoIPage } from './estacionamiento-i.page';

describe('EstacionamientoIPage', () => {
  let component: EstacionamientoIPage;
  let fixture: ComponentFixture<EstacionamientoIPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EstacionamientoIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
