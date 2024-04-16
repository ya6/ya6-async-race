import { trigger, transition, style, animate } from '@angular/animations';

export const moveCarAnimation = trigger('moveCar', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }), // начальное положение машинки
    animate('500ms', style({ transform: 'translateX(0%)' })) // конечное положение машинки
  ]),
  transition(':leave', [
    animate('500ms', style({ transform: 'translateX(100%)' })) // анимация при удалении машинки
  ])
]);
