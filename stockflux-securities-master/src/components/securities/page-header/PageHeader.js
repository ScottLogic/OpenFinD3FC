import React from 'react';
import AddSecurityButton from '../../buttons/add-security/AddSecurity';
import PropTypes from 'prop-types';
import './PageHeader.css';

const PageHeader = ({ numberOfSecurities }) => {
  return (
    <div className="page-header">
      <h1 className="title">Securities</h1>
      {numberOfSecurities > 0 && <AddSecurityButton />}
    </div>
  );
};

PageHeader.propTypes = {
  numberOfSecurities: PropTypes.number.isRequired
};

export default PageHeader;
