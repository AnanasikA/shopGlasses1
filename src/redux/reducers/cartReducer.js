import { ADD_TO_CARD } from '../actions/cartActions';

const initialState = {
    cart: []
};

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CARD:
            return {
                cart: [...state.card, action.payload]
            };
        default:
            return state;
    }
};

export default cartReducer;