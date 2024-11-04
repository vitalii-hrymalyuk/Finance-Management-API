
interface IUser {
	id?: string
	username: string
	email: string
	password: string
}

type UserWithoutPassword = Omit<IUser, 'password'>;
type UserResponse = { user: UserWithoutPassword; token: string };
export { IUser, UserResponse }