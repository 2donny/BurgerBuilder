import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

function Burger( {ingredient} ) {
    console.log(ingredient)
    let transformedIngredient = Object.keys(ingredient).map(ig => {
            return [...Array(ingredient[ig])].map((_, i) => {
                return <BurgerIngredient key={ig + i} type={ig}/>
            })
        }).reduce((acc, el) => {
            return acc.concat(el);
        }, []);
    if(transformedIngredient.length === 0) {
        transformedIngredient = <p>Please start adding ingredients!</p>;
    }
    
    return (
        <div className="Burger">
            <BurgerIngredient type="BreadTop"/>
            {transformedIngredient}
            <BurgerIngredient type="BreadBottom"/>
        </div>
    )
}

export default Burger;
