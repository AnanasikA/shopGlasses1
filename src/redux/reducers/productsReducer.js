import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from "../actions/productActions";

const initialState = {
    list: [],
    loading: false,
    error: null
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state, 
                loading: true
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state, 
                loading: false, 
                list: action.payload 
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state, 
                loading: false, 
                error: action.error
            };
        default:
            return state;
    }
};

export default productsReducer;