import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.css']
})
export class JoystickComponent implements OnInit {

  constructor() { }

  x = 50;
  y = 50;
  isJoystickActive = false;
  originalX = 50;
  originalY = 50;

  ngOnInit(): void {}

  startJoystick(event: MouseEvent): void {
    this.isJoystickActive = true;
  }

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent): void {
    if (!this.isJoystickActive) {
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const joystickRect = (event.target as Element).getBoundingClientRect();
    const joystickX = joystickRect.left + joystickRect.width / 2;
    const joystickY = joystickRect.top + joystickRect.height / 2;
    const dx = x - joystickX;
    const dy = y - joystickY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = joystickRect.width / 2;

    if (distance > maxDistance) {
      this.x = 50 + (dx / distance) * 50;
      this.y = 50 + (dy / distance) * 50;
    } else {
      this.x = 50 + dx;
      this.y = 50 + dy;
    }
  }

  @HostListener('document:mouseup')
  handleMouseUp(): void {
    this.isJoystickActive = false;
    this.x = this.originalX;
    this.y = this.originalY;
  }
}
