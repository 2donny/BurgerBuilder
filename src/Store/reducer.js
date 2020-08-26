import * as actionTypes from '../Store/action';

const initialState = {
    ingredients: {
        Meat: 0,
        Salad: 0,
        Bacon: 0,
        Cheese: 0
    },
    totalPrice: 4
}

const INGREDIENTS_PRICE = {
    Meat: 1.5,
    Cheese: 0.6,
    Salad: 0.4,
    Bacon: 1.5
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADDINGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1 // ingredientType => "Meat"
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientType]
            }
        case actionTypes.REMOVEINGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1 // ingredientType => "Meat"
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientType]
            }
        case actionTypes.BURGER_INFO:
            const updatedIngredients = {
                ...action.burger.ingre
            }
            const updatedTotalPrice = action.burger.price;
            return {
                ...state,
                ingredients: updatedIngredients,
                totalPrice: +updatedTotalPrice
            }
        default:
            return state;
    }
}

export default reducer;