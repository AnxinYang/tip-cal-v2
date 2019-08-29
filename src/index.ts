import cc, { ccd3 } from 'ccts';

if ('serviceWorker' in navigator) {
    console.log('Service worker supported!');
    try {
        navigator.serviceWorker.register('./service.js');
        console.log('Service worker registered.')
    } catch (e) {
        console.log('Service worker failed to register. - WTH!?')
    }
} else {
    console.log('Service worker not supported! - Dude, buy a new phone.')
}

cc.set('subtotal', 0);

const tipSelections = [10, 15, 20];

let root = cc.select('#root');

let subtotalContainer = root.text('')
    .append('div')
    .attr('id', 'subtotal-container')
    .classed('input-container', true)
    .classed('section', true);

subtotalContainer
    .append('label')
    .text('Subtotal:')
    .parent()
    .append('input')
    //.attr('readonly', true)
    .attr('type', 'number')
    .on('keydown', function () {
        let subtotal = cc.get('subtotal');
        let key: string = ccd3.event.key;
        if (!isNaN(+key)) {
            subtotal = +(key) + subtotal * 10;

        }
        if (key.toLowerCase() === 'backspace') {
            subtotal = +((subtotal / 10).toFixed(0));
        }
        cc.set('subtotal', subtotal);
    })
    .bind('subtotal', function (subtotal: number) {
        this.property('value', (subtotal / 100).toFixed(2));
    });

let tipSelection = root.append('div')
    .attr('id', 'tip-selection')
    .classed('section', true)
    .append('label')
    .text('Tip: ')
    .parent()
    .append('section')
    .selectAll('span')
    .data(tipSelections)
    .enter()
    .append('div')
    .append('strong')
    .text((d: number) => d + '%')
    .parent()
    .append('span')
    .bind('subtotal', function (subtotal: number) {
        this.text(function (d: number) {
            return (subtotal * d / 10000).toFixed(2);
        })
    })
    .parent()
    .append('strong')
    .text('Total')
    .parent()
    .append('span')
    .bind('subtotal', function (subtotal: number) {
        this.text(function (d: number) {
            return ((subtotal + subtotal * d / 100) / 100).toFixed(2);
        })

    })
    .parent()
    .append('strong')
    .text('Floor tip')
    .parent()
    .append('span')
    .bind('subtotal', function (subtotal: number) {
        this.text(function (d: number) {
            let total = Math.floor(subtotal + subtotal * d / 100).toFixed(2);

            return ((+(total) - subtotal) / 100).toFixed(2);
        })

    })
    .parent()
    .append('strong')
    .text('Floor total')
    .parent()
    .append('span')
    .bind('subtotal', function (subtotal: number) {
        this.text(function (d: number) {
            return Math.floor((subtotal + subtotal * d / 100) / 100).toFixed(2);
        })

    })
    .parent()
    .append('strong')
    .text('Ceil tip')
    .parent()
    .append('span')
    .bind('subtotal', function (subtotal: number) {
        this.text(function (d: number) {
            let total = Math.ceil(subtotal + subtotal * d / 100).toFixed(2);

            return ((+(total) - subtotal) / 100).toFixed(2);
        })

    })
    .parent()
    .append('strong')
    .text('Ceil total')
    .parent()
    .append('span')
    .bind('subtotal', function (subtotal: number) {
        this.text(function (d: number) {
            return Math.ceil((subtotal + subtotal * d / 100) / 100).toFixed(2);
        })

    });

