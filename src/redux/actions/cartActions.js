export const ADD_TO_CARD = 'ADD_TO_CARD';

export const addToCard = ( product ) => ({
    type: ADD_TO_CARD,
    payload: product
});