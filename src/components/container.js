import React from 'react';
import {connect} from 'react-redux';

import api from '../api';
const {
  getRemoteData,
} = api;

const mapStateToProps = state => ({
    currentConfig: state.currentConfig,
    data: state.data,
    loadingStatus: state.loadingStatus,
})

const mapDispatchToProps = dispatch => ({
  getData: () => {
    getRemoteData()
      .then(data => onSuccess(data, dispatch))
      .catch(error => onError(error, dispatch))
  },
})

function onSuccess(data, dispatch) {
  dispatch({
    type: 'getData',
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
