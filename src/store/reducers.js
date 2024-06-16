import {
  PRODUCT_FETCH_SUCCESSFULLY,
  PRODUCT_FETCH_FAILED,
  ADD_TO_CART,
  INCREASE_COUNT,
  DECREASE_COUNT,
  SET_CURRENT_PRODUCT,
  LOGIN_SUCCESS,
  LOGOUT,
} from './actions';

const initialState = {
  products: [],
  cartData: [],
  orderData: [],
  err: '',
  items: [],
  totalPrice: 0,
  totalCount: 0,
  currentProduct: null,
  isLoggedIn: false,
  email: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        email: action.payload.email,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        email: null,
      };
    case PRODUCT_FETCH_SUCCESSFULLY: {
      return {...state, products: action.payload};
    }
    case PRODUCT_FETCH_FAILED: {
      return {...state, err: action.payload.message};
    }
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload,
      };
    case ADD_TO_CART:
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({...action.payload, count: 1});
      }
      return {
        ...state,
        totalPrice: state.totalPrice + action.payload.price,
        totalCount: state.totalCount + 1,
      };
    case INCREASE_COUNT:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload) {
            if (item.count < item.stock) {
              return {...item, count: item.count + 1};
            }
          }
          return item;
        }),
        totalPrice:
          state.totalPrice +
          state.items.find(item => item.id === action.payload).price,
        totalCount: state.totalCount + 1,
      };
    case DECREASE_COUNT:
      return {
        ...state,
        items: state.items
          .map(item => {
            if (item.id === action.payload) {
              if (item.count > 0) {
                return {...item, count: item.count - 1};
              }
            }
            return item;
          })
          .filter(item => item.count > 0),
        totalPrice:
          state.totalPrice -
          state.items.find(item => item.id === action.payload).price,
        totalCount: state.totalCount - 1,
      };

    default: {
      return state;
    }
  }
}

export default rootReducer;
