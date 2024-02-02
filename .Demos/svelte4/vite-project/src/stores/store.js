import { readable, writable } from 'svelte/store';

export const elapsed = writable(0);

export const count = writable(0);

export const scene = writable({
    items: [
        {
            type: 'layer',
            name: 'layer0',
            'stroke-width': 2,
            'stroke': 'red',
            'fill': 'none',
            items: [
                {
                    type: 'line',
                    x1: 0,
                    y1: 0,
                    x2: 50,
                    y2: 50,
                },
            ]
        },
        {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 50,
            y2: 0,
        },
        {
            type: 'rect',
            x: 0,
            y: 0,
            width: 50,
            height: 50,
        },
        {
            type: 'circle',
            cx: 0,
            cy: 0,
            r: 50,
        }
    ]
})

/*
count.subscribe((value) => {
    console.log(value);
}); // logs '0'

count.set(1); // logs '1'

count.update((n) => n + 1); // logs '2'
*/