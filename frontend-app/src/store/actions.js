import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from './types/actionTypes';

// Действие для запроса данных
export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    try {
      const data = await fetchDataFromApi();
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: FETCH_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};
