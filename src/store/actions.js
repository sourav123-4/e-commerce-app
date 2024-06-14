export const PRODUCT_FETCH_SUCCESSFULLY = 'PRODUCT_FETCH_SUCCESSFULLY';
export const PRODUCT_FETCH_FAILED = 'PRODUCT_FETCH_FAILED';

export const fetchProducts = () => dispatch => {
  fetch(`${process.env.API_URL}/products`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log('responsejson====>', responseJson);
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
