export type SuccessResponse<T> = {
	statusCode: number;
	message: string;
	data: T;
};

// May differ
export type ErrorResponse = {
	statusCode: number;
	error: string;
	message: string;
};
