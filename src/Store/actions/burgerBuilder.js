import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// burgerBuilder actionCreator
export const addIngredient = (ingreName) => {
    return {
        type: actionTypes.ADDINGREDIENT,
        ingredientType: ingreName
    }
}

export const removeIngredient = (ingreName) => {
    return {
        type: actionTypes.REMOVEINGREDIENT,
        ingredientType: ingreName
    }
}

export const initIngre = (IngreData) => { //IngreData => res.data (ingredient, totalPrice를 가짐)
    return {
        type: actionTypes.INIT_INGREDIENT,
        ingredientData: IngreData
    }
}

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('data.json')
            .then(res => {
                dispatch(initIngre(res.data))
            })
            .catch(err => {
                dispatch(fetchIngredientFailed());
            })
    }
}

export const fetchOrder = () => {
    return dispatch => {
        axios.get()
    }
}