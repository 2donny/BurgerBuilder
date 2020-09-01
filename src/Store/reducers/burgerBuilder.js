import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
}

const INGREDIENTS_PRICE = {
    Meat: 1.5,
    Cheese: 0.6,
    Salad: 0.4,
    Bacon: 1.5
}

const burgerBuilderReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADDINGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1 // ingredientType => "Meat"
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientType],
                building: true
            }
        case actionTypes.REMOVEINGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1 // ingredientType => "Meat"
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientType],
                building: true
            }
        case actionTypes.INIT_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...action.ingredientData.ingredient
                },
                totalPrice: action.ingredientData.totalPrice        
            }
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default burgerBuilderReducer;