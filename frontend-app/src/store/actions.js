import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CLEAR_DATA,
  SELECT_ROW,
  EXPORT_TO_CSV,
} from './types/actionTypes';
import { fetchDataFromApi } from '../services/api';
import { exportTableToCsv } from '../services/csvExport';

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

      // Автоматически выбираем строку с максимальным значением производительности
      if (data.length > 0) {
        const maxPerformanceIndex = data.reduce(
          (maxIndex, current, index, array) =>
            current.performance > array[maxIndex].performance
              ? index
              : maxIndex,
          0
        );
        dispatch(selectRow(maxPerformanceIndex));
      }
    } catch (error) {
      dispatch({
        type: FETCH_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};

// Действие для очистки данных
export const clearData = () => {
  return {
    type: CLEAR_DATA,
  };
};

// Действие для выбора строки
export const selectRow = (index) => {
  return {
    type: SELECT_ROW,
    payload: index,
  };
};

// Действие для экспорта в CSV
export const exportToCsv = () => {
  return (dispatch, getState) => {
    const { data } = getState();

    if (data && data.length > 0) {
      exportTableToCsv(data, 'processors-data.csv');
    }

    dispatch({
      type: EXPORT_TO_CSV,
    });
  };
};
