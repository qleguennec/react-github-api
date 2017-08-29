import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { dataPerPage } from "../util/config.js";

import "./List.css";

class List extends React.Component {
  render() {
    const { changePage, data, onItemClick, n_pages } = this.props;
    return (
      <div>
        <ul>
          {data.map((r, key) =>
            <li key={key} onClick={() => onItemClick(key)}>
              {r.name}
            </li>
          )}
        </ul>
        <ul className="list">
          <li key="Previous">Previous</li>
          {_.range(1, 1 + n_pages).map(n =>
            <li onClick={() => changePage(n)} key={n}>
              {n}
            </li>
          )}
          <li key="Next">Next</li>
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  changePage: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  n_pages: PropTypes.number.isRequired
};

export default List;
