/**
 * Model User
 */
export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	token: string;
	createdAt: Date;
	updatedAt: Date;
};

/**
 * Model Shop
 */
export type Shop = {
	id: string;
	shopName: string;
	email: string;
	phone: string;
	token: string;
	createdAt: Date;
	updatedAt: Date;
	address: string;
};

/**
 * Model Credit
 */
export type Credit = {
	id: string;
	userId: string;
	creditNumber: number;
	securityKey: number;
	createdAt: Date;
	updatedAt: Date;
};

/**
 * Model Voice
 */
export type Voice = {
	id: string;
	userId: string;
	createdAt: Date;
};

/**
 * Model Payment
 */
// export type Payment = {
// 	id: string;
// 	userId: string;
// 	shopId: string;
// 	voiceId: string;
// 	createdAt: Date;
// 	updatedAt: Date;
// };
export type Payment = {
	id: number;
	userId: string;
	shopId: string;
	amount: number;
	createdAt: Date;
	updatedAt: Date;
	Shop: {
		id: string;
		shopName: string;
	};
};

/**
 * Model VerifyAuth
 */
export type VerifyAuth = {
	user: { id: string };
	phone: string;
	access_token: string;
	expires_in: number;
	refresh_token: string;
	token_type: string;
	user: null;
};
