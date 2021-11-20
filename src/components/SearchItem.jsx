import React from "react";
import { ReactComponent as Star } from '../icon/star.svg';
import './SearchItem.scss';

export default function SearchItem(props) {
	const {data} = props,
		flagURL = `url(https://flagcdn.com/${data.country}.svg)`;

	return (
		<div className="searchItem">
			<div className="left">
				<span className="flag" style={{ backgroundImage: flagURL }} />
				<p className="label">{data.keyword}</p>
			</div>
			<div className="right">
				{
					data.exact === true &&
					<div className='exactMatch'>
						<Star className='icon' />
						<p className='label' >Exact Match</p>
					</div>
				}
			</div>
		</div>
	);
}
