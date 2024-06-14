import {PRODUCT_FETCH_SUCCESSFULLY, PRODUCT_FETCH_FAILED} from './actions';

const initialState = {
  products: [],
  cartData: [],
  orderData: [],
  err: '',
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_FETCH_SUCCESSFULLY: {
      return {...state, products: action.payload};
    }
    case PRODUCT_FETCH_FAILED: {
      return {...state, err: action.payload.message};
    }
    default: {
      return state;
    }
  }
}

export default rootReducer;
