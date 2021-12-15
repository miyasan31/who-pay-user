import { atom } from "recoil";

export const user = atom({
	key: "user",
	default: {
		id: "",
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		token: "",
		isSignin: false,
	},
});

export const date = atom({
	key: "date",
	default: {
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
	},
});
