import type { User } from './user';

export interface Profile {
	isAvailable: boolean;
	user: User;
	err: string | null;
	isAuth: boolean;
}
