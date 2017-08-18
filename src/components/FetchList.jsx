import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import fp from 'lodash/fp'

class FetchList extends React.Component {
  constructor(props) {
    super(props);
    this.forceRender = true;
    this.cache = {};
    this.state = {
      itemList: undefined,
      page: 0
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
      .then((function (resp) {
        _.concat(this.currentUserCache);
        this.setState({itemList: resp})
      }).bind(this));
  }

  changePage (n) {
    if (n != this.state.page)
      this.setState({page : n});
  }

  componentWillReceiveProps () {
    this.setState({page: 0});
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.page == this.state.page)
      return (true);
    if (!this.currentUserCache[
        (nextState.page - 1)
          * _.get(this.props.requestAttributes, 'per_page', 30)])
      this.fetchRequest(nextState.page);
    return (false);
  }

  render () {
    if (this.state.page === 0) {
      const key = this.props.cacheKey(this.props.userInfo);

      if (!_.has(this.props.cache, key))
        _.set(this.cache, key, []);
      this.currentUserCache = _.get(this.cache, key);
      this.setState({page: 1});
      return (false);
    }
    const { itemList } = this.state;
    const { pageCount, userInfo, requestAttributes } = this.props;
    const n_pages = pageCount(userInfo) / _.get(requestAttributes, 'per_page', 30);
    console.log("render");

    return (
      <div ref={e=> this.madiv = e}>
        <ul>
          {itemList.map((x) => <li key={x.name}>{x.name}</li>)}
        </ul>
        {n_pages > 1 && <ul className="list">
          <li key="Previous">Previous</li>
          {_.range(1, 1 + n_pages)
            .map((n) => <li onClick={() => this.changePage(n)} key={n}>{n}</li>)}
          <li key="Next">Next</li>
        </ul>}
      </div>
    );
  }
}

export default FetchList;

FetchList.propTypes = {
  userInfo: PropTypes.object.isRequired,
  request: PropTypes.func.isRequired,
  requestAttributes: PropTypes.object.isRequired,
  cacheKey: PropTypes.func.isRequired,
  pageCount: PropTypes.func.isRequired
}
