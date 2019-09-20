import React from 'react';
import Components from 'stockflux-components';
import * as PropTypes from 'prop-types';
import { Utils } from 'stockflux-core';

// Add unique classes onto buttons to allow events listeners to be attached within child window
const SearchResult = ({ code, name }) => (
  <div className="searchResult">
    <div className="name">{Utils.truncate(name)}</div>
    <div className="subtitle">{code}</div>
    <div className="containerActions">
      <button type="button" className="buttonAction newsView">
        <Components.Shortcuts.News />
      </button>
      <button type="button" className="buttonAction watchlistAdd">
        <Components.Shortcuts.Watchlist />
      </button>
      <button type="button" className="buttonAction chartView">
        <Components.Shortcuts.Chart />
      </button>
    </div>
  </div>
);

SearchResult.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default SearchResult;
