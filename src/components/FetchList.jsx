import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import fp from 'lodash/fp'

class FetchList extends React.Component {
  constructor(props) {
    super(props);
    this.forceRender = true;
    this.state = {
      page: this.props.requestAttributes.page,
      cache: []
    };
  }

  fetchRequest (page) {
    const { userInfo, request, requestAttributes } =
      fp.set('requestAttributes.page', page, this.props);
    const requestWithAttributes =
      _.reduce(
        fp.entries(requestAttributes)
        , (acc, [a, b]) => acc + a + "=" + b + "&"
        , request(userInfo) + "?");

    fetch(requestWithAttributes)
      .then(fp.invoke('json'))
      .then((result) => this.setState(
        function (prevState, props) {
          prevState.cache[page] = result;
          return {cache: prevState.cache};
    }));
  }

  componentWillMount () {
    this.fetchRequest(this.state.page);
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.cache[nextState.page] === undefined) {
      this.fetchRequest(nextState.page);
      this.forceRender = true;
      return (false);
    }
    if (this.forceRender) {
      this.forceRender = false;
      return (true);
    }
    return (nextState.page !== this.state.page);
  }

  render () {
    const { cache, page } = this.state;
    const { userInfo, requestAttributes } = this.props;

    if (cache.length === 0)
      return false;

    return (
      <div ref={e=> this.madiv = e}>
        <ul>
          {cache[page].map((x) => <li key={x.name}>{x.name}</li>)}
        </ul>
        <ul className="list">
          <li key="Previous">Previous</li>
          {_.range(1, 1 + userInfo.public_repos / _.get(requestAttributes, 'per_page', 30))
            .map((n) => <li onClick={() => this.setState({page: n})}key={n}>{n}</li>)}
          <li key="Next">Next</li>
        </ul>
      </div>
    )}
}

export default FetchList;

FetchList.propTypes = {
  userInfo: PropTypes.object.isRequired,
  request: PropTypes.func.isRequired,
  requestAttributes: PropTypes.object.isRequired
}
