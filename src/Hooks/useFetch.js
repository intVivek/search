import { useState, useEffect } from "react";

const useFetch = (data, url) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [APIdata, setAPIdata] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setAPIdata([]);
	}, [data.search]);

	useEffect(() => {
		setIsLoading(true);
		setError(false);
		data.search &&
		fetch(url, {
			method: "post",
			body: JSON.stringify(data),
			headers: { "Content-type": "application/json" }
		}).then(function (response) {
			return response.json(data);
		}).then(function (response) {
			console.log(response.data);
			setAPIdata((oldData) => ([...oldData, ...response.data]));
			response.data.length ? setHasMore(true) : setHasMore(false);
			setIsLoading(false);
		}).catch((error) => {
			console.error(error);
			setError(true)
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.search, data.pageNum]);

	return { isLoading, error, APIdata, hasMore };
}

export default useFetch;