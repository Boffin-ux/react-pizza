const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
};
const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);
const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PIZZA_CART':
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload]
            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems),
                }
            };
            const items = Object.values(newItems).map((obj) => obj.items);
            const allPizzas = [].concat.apply([], items);
            const totalPrice = getTotalPrice(allPizzas);

            return {
                ...state,
                items: newItems,
                totalCount: allPizzas.length,
                totalPrice
            };
        case 'CLEAR_CART':
            return {
                items: {},
                totalPrice: 0,
                totalCount: 0
            };
        case 'PLUS_CART_ITEM': {
            const newItemsPlus = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ];
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newItemsPlus,
                    totalPrice: getTotalPrice(newItemsPlus)
                },
            };
            const items = Object.values(newItems).map((obj) => obj.items);
            const allPizzas = [].concat.apply([], items);
            const totalPrice = getTotalPrice(allPizzas);
            return {
                ...state,
                items: newItems,
                totalPrice,
                totalCount: allPizzas.length,
            };
        }
        case 'MINUS_CART_ITEM': {
            const oldItems = state.items[action.payload].items;
            const newItemsMinus = oldItems.length > 1
                ? oldItems.slice(1)
                : oldItems;
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newItemsMinus,
                    totalPrice: getTotalPrice(newItemsMinus)
                },
            };

            const items = Object.values(newItems).map((obj) => obj.items);
            const allPizzas = [].concat.apply([], items);
            const totalPrice = getTotalPrice(allPizzas);

            return {
                ...state,
                items: newItems,
                totalPrice,
                totalCount: allPizzas.length,
            };
        }
        case 'REMOVE_CART_ITEM':
            const newItemsCart = {
                ...state.items,
            };
            const currentTotalPrice = newItemsCart[action.payload].totalPrice;
            const currentTotalCount = newItemsCart[action.payload].items.length;
            delete newItemsCart[action.payload];
            return {
                ...state,
                items: newItemsCart,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            };
        default:
            return state;
    }
};

export default cart;