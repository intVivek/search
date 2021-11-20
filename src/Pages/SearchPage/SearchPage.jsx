import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Search } from '../../icon/search.svg';
import useFetch from "../../Hooks/useFetch";
import SearchItem from "../../components/SearchItem";
import './searchPage.scss';

const Loader = () => {
	return (
		<span className="loader" />
	);
}

export default function SearchPage() {
	const observer = useRef(),
		navigate = useNavigate(),
		{ search } = useParams(),
		[loaded, setLoaded] = useState(false),
		[pageNum, setPageNum] = useState(1),
		{ isLoading, APIdata, hasMore } = useFetch({ search: decodeURIComponent(search || ''), pageNum }, 'https://search-queries.herokuapp.com/keyword'),


		onSearch = (event) => {
			if (event.target.value) setPageNum(1);
			navigate(`/search/${encodeURIComponent(event.target.value)}`);
		},
		lastElementRef = useCallback((node) => {
				if (isLoading) return;
				if (observer.current) observer.current.disconnect();
				observer.current = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting && hasMore) {
						setPageNum((prev) => prev + 1);
					}
				});
				if (node) observer.current.observe(node);
			}, [isLoading, hasMore]);

	console.log(pageNum);
	useEffect(() => {
		setTimeout(() => setLoaded(true), 500);
	}, []);

	return (
		<div className={`searchPage ${loaded ? 'loaded' : ''} ${search ? 'searched' : ''}`}>
			<div className="searchModal">
				<div className="search">
					<input className="field" value={search || ''} placeholder="Type Something Here..." onChange={onSearch} />
					<Search className="icon" />
				</div>
				<div className="results">
				{
					search && 
					APIdata?.map((val, index) => <SearchItem key={index} data={val} />)
				}
				{
					hasMore && search &&
					<div className="loadMore" ref={lastElementRef}>
						<Loader />
					</div>
				}
				</div>
			</div>
			{!loaded && <Loader />}
		</div>
	);
}
