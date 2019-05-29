import React from 'react';
import {connect} from 'react-redux';

import api from '../api';
const {
  getRemoteData,
  getData,
  getRemoteCharts,
} = api;

const mapStateToProps = state => ({
    currentConfig: state.currentConfig,
    data: state.data,
    loadingStatus: state.loadingStatus,
})

const mapDispatchToProps = dispatch => ({
  getData: () => {
    getData()
      .then(data => onSuccess(data, dispatch, 'getData'))
      .catch(error => onError(error, dispatch))
  },
  getChartsData: () => {
    getData(`/sources/stat/chart/sources`)
      .then(data => onSuccess(data, dispatch, 'getChartsData'))
      .catch(error => onError(error, dispatch))
  },
})

function onSuccess(data, dispatch, type) {
  dispatch({
    type: type,
    data,
  })

  dispatch({
    type: 'loading',
    loadingStatus: 'success',
  })
}

function onError(error, dispatch) {
  dispatch({
    type: 'loading',
    loadingStatus: 'error',
  })
}



export default component => connect(mapStateToProps, mapDispatchToProps)(component);
