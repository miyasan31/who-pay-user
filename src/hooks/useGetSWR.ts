import { getFetcherWithToken } from "src/functions/fetcher";
import useSWR from "swr";

export const useGetSWR = <T>(url: string, options?: any) => {
	const { data, error } = useSWR<T>(url, options);

	return {
		data: data,
		isError: error,
		isLoading: !error && !data,
	};
};

export const useGetSWRWithToken = <T>(url: string, token: string) => {
	const { data, error } = useSWR<T>([url, token], getFetcherWithToken);

	return {
		data: data,
		isError: error,
		isLoading: !error && !data,
	};
};
