
export interface User {
	address: string;
}

export interface APIUser {

	load(): Promise<string>;

	user(): Promise<User>;

	address(): Promise<string>;

	addressNoJump(): string;

}