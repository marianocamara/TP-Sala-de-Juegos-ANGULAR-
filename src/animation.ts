import { query, trigger, transition, style, animateChild, group, animate } from '@angular/animations';

export const slideInAnimation =
trigger('routeAnimations', [
    transition('FilterPage <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ],{optional: true}),
        query(':enter', [
            style({ left: '-100%'})
        ]),
        query(':leave', animateChild(),{optional: true}),
        group([
            query(':leave', [
                animate('300ms ease-out', style({ left: '100%'}))
            ],{optional: true}),
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%'}))
            ])
        ]),
        query(':enter', animateChild()),
    ]),
    transition('* <=> FilterPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ],{optional: true}),
        query(':enter', [
            style({ left: '-100%'})
        ]),
        query(':leave', animateChild(),{optional: true}),
        group([
            query(':leave', [
                animate('200ms ease-out', style({ left: '100%'}))
            ],{optional: true}),
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%'}))
            ])
        ]),
        query(':enter', animateChild()),
    ]),
    transition('Fade <=> *', [
        // Set a default  style for enter and leave
        query(':enter, :leave', [
            style({
                position: 'absolute',
                left: 0,
                width: '100%',
                opacity: 0,
                transform: 'scale(0) translateY(100%)',
            }),
        ],{optional: true}),
        // Animate the new page in
        query(':enter', [
            animate('1999ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
        ])
    ])    
    
]);