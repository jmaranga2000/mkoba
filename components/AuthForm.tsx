'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import SignUp from '@/app/(auth)/sign-up/page';
import SignIn from '@/app/(auth)/sign-in/page';
import { useRouter } from 'next/navigation';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser();
      setUser(loggedInUser);
    };
    fetchUser();
  }, []);

  const formschema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: "",
      password: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formschema>) => {
    setIsLoading(true);

    try {
      if (type === 'sign-up') {
        const newUser = await SignUp(data);
        setUser(newUser);
      } else if (type === 'sign-in') {
        const response = await SignIn({ email: data.email, password: data.password });
        if (response) {
          router.push('/');
          setUser(response.user);
          console.log('Sign-in successful:', response.user);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Mkoba logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Mkoba</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user ? 'Link your account to get started.' : 'Please enter your details'}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className='flex gap-4'>
                    <CustomInput control={form.control} name="firstName" label="First name" placeholder="Enter your first name" />
                    <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />
                  </div>
                  <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your specific address" />
                  <CustomInput control={form.control} name="city" label="City" placeholder="Example: Nairobi" />
                  <div className='flex gap-4'>
                    <CustomInput control={form.control} name="state" label="State" placeholder="Example: NBO" />
                    <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="Example: 80200" />
                  </div>
                  <div className='flex gap-4'>
                    <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY,MM,DD" />
                    <CustomInput control={form.control} name="ssn" label="SSN" placeholder="Example: 1234" />
                  </div>
                </>
              )}
              <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
              <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />
              <div className='flex flex-col gap-4'>
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                    </>
                  ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </Form>
          <footer className='flex justify-center gap-1'>
            <p className='text-14 font normal text-gray-600'>
              {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
