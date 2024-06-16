export const PRODUCT_FETCH_SUCCESSFULLY = 'PRODUCT_FETCH_SUCCESSFULLY';
export const PRODUCT_FETCH_FAILED = 'PRODUCT_FETCH_FAILED';
export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';
export const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => {
  return dispatch => {
    const isAuthenticated = true;
    if (isAuthenticated) {
      dispatch({type: LOGIN_SUCCESS, payload: {email}});
      return true;
    } else {
      return false;
    }
  };
};

export const logout = () => {
  return {type: LOGOUT};
};

export const setCurrentProduct = product => ({
  type: SET_CURRENT_PRODUCT,
  payload: product,
});

export const addToCart = product => ({
  type: ADD_TO_CART,
  payload: product,
});

export const increaseCount = productId => ({
  type: INCREASE_COUNT,
  payload: productId,
});

export const decreaseCount = productId => ({
  type: DECREASE_COUNT,
  payload: productId,
});

export const fetchProducts = () => dispatch => {
  fetch(`${process.env.API_URL}/products`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.message) {
        dispatch({
          type: PRODUCT_FETCH_FAILED,
          payload: responseJson,
        });
      } else {
        dispatch({
          type: PRODUCT_FETCH_SUCCESSFULLY,
          payload: responseJson,
        });
      }
    });
};
