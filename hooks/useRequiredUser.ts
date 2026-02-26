import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

export const useRequiredUser = async () => {
	const user = await currentUser();
	if (!user) {
		redirect('/'); // Redirect to the sign-in page if the user is not authenticated
	}

	return user;
};
