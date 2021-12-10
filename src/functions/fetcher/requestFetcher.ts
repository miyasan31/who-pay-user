import { API_URL } from "src/constants/api_url";
import fetch from "unfetch";

type Method = "POST" | "PUT" | "DELETE";

export const authRequestFetcher = async (
	url: string,
	body: unknown,
	method: Method
): Promise<any> => {
	console.info(" ");
	console.info("authRequestFetcher | ---------------------------");
	console.info(`request method     | ${method}`);
	console.info(`endpoint           | ${API_URL}${url}`);
	console.info("request body       |", body);
	console.info(" ");

	const result = await fetch(`${API_URL}${url}`, {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})
		.then(async (res) => {
			const response = await res.json();
			return {
				status: res.status,
				response: response,
			};
		})
		.catch((err) => {
			throw new Error("Error: " + err);
		});

	return result;
};

export const requestFetcher = async (
	url: string,
	body: unknown,
	method: Method
	// token: string
): Promise<number> => {
	console.info(" ");
	console.info("requestFetcher | ---------------------------");
	console.info(`request method | ${method}`);
	console.info(`endpoint       | ${API_URL}${url}`);
	console.info("request body   |", body);
	// console.info(`Bearer token   | ${token}`);
	console.info(" ");

	const result = await fetch(`${API_URL}${url}`, {
		method: method,
		headers: {
			// Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})
		.then((res) => {
			return res.status;
		})
		.catch((err) => {
			throw new Error("Error: " + err);
		});

	return result;
};
