export {};
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

//BASE OND ARTICLE https://mariusschulz.com/blog/the-omit-helper-type-in-typescript

type User = {
	id: number;
	name: string;
	email?: string;
	password: string;
};

type UserWithoutPassword = Omit<User, "password">;

// This is equivalent to:
type KUser_01 = keyof User;
type UserWithoutPassword_01 = Pick<User, Exclude<KUser_01, "password">>;
// This is equivalent to:
type UserWithoutPassword_02 = Pick<User, Exclude<"id" | "name" | "email" | "password", "password">>;

// This is equivalent to:
type UserWithoutPassword_03 = Pick<
	User,
	| ("id" extends "password" ? never : "id")
	| ("name" extends "password" ? never : "name")
	| ("email" extends "password" ? never : "email")
	| ("password" extends "password" ? never : "password")
>;

// This is equivalent to:
type UserWithoutPassword_04 = Pick<User, "id" | "name" | "email" | never>;

// This is equivalent to:
type UserWithoutPassword_05 = Pick<User, "id" | "name" | "email">;

// This is equivalent to:
type UserWithoutPassword_06 = {
	[P in "id" | "name" | "email"]: User[P];
};

// This is equivalent to:
type UserWithoutPassword_07 = {
	id: User["id"];
	name: User["name"];
	email: User["email"];
};

// This is equivalent to:
type Tid_08 = User["id"]; //string
type Tname_08 = User["name"]; //string
type Temail_08 = User["email"]; //string | undefined
type UserWithoutPassword_08 = {
	id: number;
	name: string;
	email: string | undefined;
};
//THIS IS THE FINAL Omit<User, "password">
