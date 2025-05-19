import { SignUpForm } from '@/components/auth/signup-form';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        <SignUpForm />
      </div>
    </div>
  );
}
