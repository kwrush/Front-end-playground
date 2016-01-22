(function() {
    var app = angular.module('store', []);

    app.controller('StoreController', function() {
        this.products = gems;
    });

    var gems = [
        {
            name: 'Dodecahedron',
            price: 2,
            canPurchase: true,
            soldOut: false,
            date: new Date(),
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, soluta omnis. Incidunt deleniti quaerat adipisci assumenda dolorum tempora labore voluptatem id odit similique corporis alias eaque, dolores culpa eius aliquid.'
        },
        {
            name: 'Pentagonal Gem',
            price: 5.95,
            canPurchase: false,
            soldOut: false,
            date: new Date(),
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, soluta omnis. Incidunt deleniti quaerat adipisci assumenda dolorum tempora labore voluptatem id odit similique corporis alias eaque, dolores culpa eius aliquid.'
        },
        {
            name: 'Blabla Gem',
            price: 15.95,
            canPurchase: true,
            soldOut: false,
            date: new Date(),
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, soluta omnis. Incidunt deleniti quaerat adipisci assumenda dolorum tempora labore voluptatem id odit similique corporis alias eaque, dolores culpa eius aliquid.'
        },
        {
            name: 'Another Gem',
            price: 3.95,
            canPurchase: true,
            soldOut: true,
            date: new Date(),
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, soluta omnis. Incidunt deleniti quaerat adipisci assumenda dolorum tempora labore voluptatem id odit similique corporis alias eaque, dolores culpa eius aliquid.'
        },
    ];
})();
