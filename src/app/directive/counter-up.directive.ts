import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCounterUp]'
})
export class CounterUpDirective implements OnInit {
  @Input('appCounterUp') endValue: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.startCounter();
  }

  private startCounter() {
    let startValue = 0;
    const duration = 2000; // Duration of the animation in milliseconds
    const stepTime = Math.abs(Math.floor(duration / this.endValue));
    const element = this.el.nativeElement;

    const counter = setInterval(() => {
      startValue += 1;
      element.innerText = startValue;
      if (startValue >= this.endValue) {
        clearInterval(counter);
      }
    }, stepTime);
  }
}