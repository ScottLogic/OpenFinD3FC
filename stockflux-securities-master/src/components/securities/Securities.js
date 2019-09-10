import React, { useReducer, useEffect, useCallback } from 'react';
import PageHeader from './page-header/PageHeader';
import * as service from '../../services/SecuritiesService';
import Table from './table/Table';
import { securitiesReducer, initialState } from '../../reducers/securities';
import * as action from '../../actions/securities';
import HorizontalRule from '../horizontal-rule/HorizontalRule';
import NoSecurities from './no-securities/NoSecurities';
import Components from 'stockflux-components';
import { FetchState } from '../../enums';
import './Securities.css';

const Securities = ({ location }) => {
  const [state, dispatch] = useReducer(securitiesReducer, initialState);

  const fetchSecurities = useCallback(async () => {
    dispatch({ type: 'FETCHING' });
    try {
      let securities = await service.getSecurities();

      dispatch(action.success(translateSecuritiesDTO(securities)));
    } catch (err) {
      dispatch(action.error(err));
    }
  }, []);

  // Remove this once BE gets updated to use `disabled`
  const translateSecuritiesDTO = securities => {
    return securities.map(security => ({
      disabled: !security.enabled,
      exchange: security.exchange,
      name: security.name,
      securityId: security.securityId,
      symbol: security.symbol,
      updated: security.updated,
      visible: security.visible
    }));
  };

  useEffect(() => {
    fetchSecurities();
  }, [fetchSecurities]);

  return (
    <>
      <PageHeader
        numberOfSecurities={(state.securities && state.securities.length) || 0}
      />
      <HorizontalRule />
      {state.fetchStatus === FetchState.FETCHING ? (
        <div className="spinner-container">
          <Components.Spinner />
        </div>
      ) : state.securities &&
        state.securities.length === 0 &&
        !state.hasErrors ? (
        <NoSecurities />
      ) : (
        <>
          <Table
            location={location}
            dispatch={dispatch}
            state={state}
            fetchSecurities={fetchSecurities}
          />
          <HorizontalRule />
        </>
      )}
    </>
  );
};

Securities.prototypes = {};

export default Securities;
