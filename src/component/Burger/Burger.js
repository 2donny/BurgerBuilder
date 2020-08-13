import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

function Burger( {ingredient} ) {
    let transformedIngredient = Object.keys(ingredient).map(ig => {
            return [...Array(ingredient[ig])].map((_, i) => {
                return <BurgerIngredient key={ig + i} type={ig}/>
            })
        }).reduce((acc, el) => {
            return acc.concat(el);
        }, []);
    
    if(transformedIngredient.length === 0) {
        transformedIngredient = <p>햄버거를 추가해주세요.</p>;
    }
    
    console.log(transformedIngredient);
    console.log('hi');
    return (
        <div className="Burger">
            <BurgerIngredient type="BreadTop"/>
            {transformedIngredient}
            <BurgerIngredient type="BreadBottom"/>
        </div>
    )
}

export default Burger;
