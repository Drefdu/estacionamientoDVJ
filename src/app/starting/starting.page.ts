import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

register();


@Component({
  selector: 'app-starting',
  templateUrl: './starting.page.html',
  styleUrls: ['./starting.page.scss'],
})
export class StartingPage implements OnInit {
  

  constructor() { }

  ngOnInit() {
    
  }

  nextSlide(){
    const swiperEl: any = document.querySelector('swiper-container');
    swiperEl.swiper.slideNext();
  }
  
}
