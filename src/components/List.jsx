import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import "./List.css";

class List extends React.Component {
	render() {
		const {changePage, data, onItemClick, n_pages, page} = this.props;
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
					<li
						key="Previous"
						onClick={() => {
							if (page > 1) changePage(page - 1);
						}}
					>
						Previous
					</li>
					{_.range(1, 1 + n_pages).map(n =>
						<li
							className={n === page ? "currentPage" : "list"}
							onClick={() => changePage(n)}
							key={n}
						>
							{n}
						</li>
					)}
					<li
						key="Next"
						onClick={() => {
							if (page < n_pages) changePage(page + 1);
						}}
					>
						Next
					</li>
				</ul>
			</div>
		);
	}
}

List.propTypes = {
	changePage: PropTypes.func.isRequired,
	onItemClick: PropTypes.func.isRequired,
	page: PropTypes.number,
	data: PropTypes.array.isRequired,
	n_pages: PropTypes.number.isRequired
};

export default List;
