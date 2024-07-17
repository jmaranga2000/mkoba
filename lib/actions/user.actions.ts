'use server';

import { createAdminClient, createSessionClient } from '../appwrite';
import { ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { parseStringify } from '../utils';

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: SignInProps): Promise<any> => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (error) {
    console.error('Error', error);
    return null;
  }
};

export const signUp = async (userData: SignUpParams): Promise<any> => {
  const { firstName, lastName, email, password } = userData;
  try {
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error('Error', error);
    return null;
  }
};

export async function getLoggedInUser(): Promise<any> {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async (): Promise<boolean> => {
  try {
    const { account } = await createSessionClient();
    cookies().delete('appwrite-session');
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error('Error', error);
    return false;
  }
};
