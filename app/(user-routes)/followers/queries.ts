import { assertUserAuthenticated } from "@/lib/auth";
import makeFetch from "@/lib/helper";
import type { ErrorResponse, SuccessResponse } from "@/types/api";
import type { UserProps } from "@/types/user";

type FollowResponse = SuccessResponse<UserProps[]> | ErrorResponse | undefined;

export const getFollowers = async (): Promise<FollowResponse> => {
	const user = await assertUserAuthenticated();
	const fetchFollowers = makeFetch<SuccessResponse<UserProps[]>>(
		"auth",
		"/auth/followers",
		user?.accessToken.value,
	);

	try {
		const response = await fetchFollowers();
		if ("data" in response) {
			return response as SuccessResponse<UserProps[]>;
		}
		return response as ErrorResponse;
	} catch (err) {
		console.log(err);
		return undefined;
	}
};

export const getFollowees = async (): Promise<FollowResponse> => {
	const user = await assertUserAuthenticated();
	const fetchFollowees = makeFetch<
		SuccessResponse<UserProps[]> | ErrorResponse
	>("auth", "/auth/followees", user?.accessToken.value);

	try {
		const response = await fetchFollowees();
		if ("data" in response) {
			return response as SuccessResponse<UserProps[]>;
		}
		return response as ErrorResponse;
	} catch (err) {
		console.log(err);
		return undefined;
	}
};
