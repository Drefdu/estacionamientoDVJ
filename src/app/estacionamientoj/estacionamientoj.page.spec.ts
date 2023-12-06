import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstacionamientojPage } from './estacionamientoj.page';

describe('EstacionamientojPage', () => {
  let component: EstacionamientojPage;
  let fixture: ComponentFixture<EstacionamientojPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EstacionamientojPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
