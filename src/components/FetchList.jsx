import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from "lodash";
import fp from "lodash/fp";

class FetchList extends React.Component {
  render () {
    return (<div>{this.props.arrayToList.login}</div>);
  }
}

const mapState = (state) =>
      ({arrayToList: _.get(state.users.userCache, state.users.currentUser)});

FetchList.propTypes = {
  arrayToList: PropTypes.object
};

export default connect(mapState)(FetchList);
