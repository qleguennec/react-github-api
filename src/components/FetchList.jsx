import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import fp from 'lodash/fp'

class FetchList extends React.Component {
  fetchRequest (props, page) {
    const { userData, request, requestAttributes } =
      fp.set('requestAttributes.page', page, props);
    const requestWithAttributes =
      _.reduce(
        fp.entries(requestAttributes)
        , (acc, [a, b]) => acc + a + "=" + b + "&"
        , request(userData) + "?");
    const per_page = _.get(props.requestAttributes, 'per_page', 30)

    fetch(requestWithAttributes)
      .then(fp.invoke('json'))
      .then((function (resp) {
        this.currentUserCache = [...this.currentUserCache, ...resp];
        this.setState((state) =>
          ({itemList:
          this.currentUserCache.slice((page - 1) * per_page
            , page * per_page)
            , page}))
      }).bind(this));
  }

  changePage (n) {
    if (n !== this.state.page)
      this.fetchRequest(this.props, n);
  }

  initCache (props) {
    const key = props.cacheKey(props.userData);

    if (!_.has(props.cache, key))
      _.set(this.cache, key, []);
    this.currentUserCache = _.get(this.cache, key);
    this.fetchRequest(props, 1);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.userData.login !== this.props.userData.login)
      this.initCache(nextProps);
  }

  componentWillMount () {
    this.initCache(this.props);
  }

  render () {
    const { itemList } = this.state;
    const { pageCount, userData, requestAttributes } = this.props;
    const n_pages = pageCount(userData) / _.get(requestAttributes, 'per_page', 30);

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

const mapState = (state) => ({userData: state.user.userCache[state.users.currentUser]});
const mapDispatch = (dispatch) => ;

FetchList.propTypes = {
  userData: PropTypes.object,
  request: PropTypes.func.isRequired,
  requestAttributes: PropTypes.object.isRequired,
  cacheKey: PropTypes.func.isRequired,
  pageCount: PropTypes.func.isRequired
}

export default connect(mapState, mapDispatch)(FetchList);
