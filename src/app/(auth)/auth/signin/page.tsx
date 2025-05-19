import { SignInForm } from '@/components/auth/signin-form';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        <SignInForm />
      </div>
    </div>
  );
}
