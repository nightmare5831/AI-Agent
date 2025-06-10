'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, Sparkles, Star, Flame } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Request from '@/lib/request';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Background } from '@/components/ui/background';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long'),
  role: z.enum(['user', 'admin']),
  isTeacher: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function SignUpForm(): JSX.Element {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      role: 'user',
      isTeacher: false,
    },
  });

  useEffect(() => {
    const role = searchParams.get('role');
    if (role) {
      form.setValue('isTeacher', role.toLowerCase() === 'admin');
    }
  }, [searchParams, form]);

  async function onSubmit(values: FormValues): Promise<void> {
    try {
      setIsLoading(true);
      values.role = values.isTeacher ? 'admin' : 'user';
      delete values.isTeacher;
      await Request.Post('/api/auth/signup', {
        ...values,
      })

      toast.success('Account created successfully! Please signIn');
      router.push('/auth/signin');
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          'Failed to create account. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Variantes para animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center py-10">
      {/* Usar el componente Background para el fondo */}
      <Background className="opacity-50" />

      {/* Efecto de halo alrededor del formulario */}
      <div className="pointer-events-none absolute">
        <div className="-ml-[5%] -mt-[5%] h-[110%] w-[110%]">
          <div
            className={`absolute inset-0 rounded-[30%] bg-gradient-to-r opacity-30 blur-3xl ${focusedField ? 'from-[#63B3ED] to-[#2B6CB0]' : 'from-[#2B6CB0] to-[#63B3ED]'}`}
            style={{
              transform: 'scale(0.85)',
              filter: 'blur(120px)',
              animation: 'pulse 8s ease-in-out infinite alternate',
            }}
          />
        </div>
      </div>

      {/* Partículas flotantes adicionales específicas del formulario */}
      {mounted && (
        <>
          <motion.div
            className="pointer-events-none absolute"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 25,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            <motion.div className="absolute left-[-50px] top-[-120px] h-[12px] w-[12px] text-[#2B6CB0]">
              <Star className="h-full w-full" />
            </motion.div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute"
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            <motion.div className="absolute bottom-[-100px] right-[-30px] h-[14px] w-[14px] text-[#63B3ED]">
              <Flame className="h-full w-full" />
            </motion.div>
          </motion.div>
        </>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative z-10 w-full max-w-md space-y-6 rounded-lg border border-[#63B3ED]/20 bg-background/70 p-8 shadow-xl backdrop-blur-md transition-all duration-500"
        whileHover={{ boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.25)' }}
      >
        <Form {...form}>
          <motion.div
            variants={formItemVariant}
            className="mb-6 flex items-center justify-center"
          >
            <Link
              href="/"
              className="flex items-center space-x-2 transition-colors hover:opacity-90"
            >
              <Image
                alt="Logo"
                src="/assets/images/logo/logo.png"
                width={160}
                height={160}
              />
            </Link>
          </motion.div>
          <motion.div
            variants={formItemVariant}
            className="mb-6 flex items-center justify-center"
          >
            <h2 className="text-center text-2xl font-bold">
              Create Your Account
            </h2>
          </motion.div>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={formItemVariant}>
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <motion.div
                        animate={{
                          boxShadow:
                            focusedField === 'full_name'
                              ? [
                                  '0 0 0 0px rgba(211, 47, 47, 0)',
                                  '0 0 0 3px rgba(211, 47, 47, 0.1)',
                                  '0 0 0 5px rgba(211, 47, 47, 0.05)',
                                ]
                              : 'none',
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: focusedField === 'full_name' ? Infinity : 0,
                        }}
                        className="relative"
                      >
                        <Input
                          {...field}
                          placeholder="John Doe"
                          disabled={isLoading}
                          className={`border-[#63B3ED]/20 transition-all duration-500 focus-visible:border-[#2B6CB0]/50 focus-visible:ring-[#2B6CB0]/30 ${focusedField === 'full_name' ? 'bg-white/5' : ''}`}
                          onFocus={() => handleFocus('full_name')}
                          onBlur={handleBlur}
                        />
                        {focusedField === 'full_name' && (
                          <motion.div
                            className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-[#2B6CB0]/10 to-[#63B3ED]/10 blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={formItemVariant}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90">Email</FormLabel>
                    <FormControl>
                      <motion.div
                        animate={{
                          boxShadow:
                            focusedField === 'email'
                              ? [
                                  '0 0 0 0px rgba(147, 51, 234, 0)',
                                  '0 0 0 3px rgba(147, 51, 234, 0.1)',
                                  '0 0 0 5px rgba(147, 51, 234, 0.05)',
                                ]
                              : 'none',
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: focusedField === 'email' ? Infinity : 0,
                        }}
                        className="relative"
                      >
                        <Input
                          {...field}
                          placeholder="name@example.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isLoading}
                          className={`border-[#63B3ED]/20 transition-all duration-500 focus-visible:border-[#63B3ED]/50 focus-visible:ring-[#63B3ED]/30 ${focusedField === 'email' ? 'bg-white/5' : ''}`}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                        />
                        {focusedField === 'email' && (
                          <motion.div
                            className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-[#63B3ED]/10 to-[#8b5cf6]/10 blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={formItemVariant}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90">
                      Password
                    </FormLabel>
                    <FormControl>
                      <motion.div
                        animate={{
                          boxShadow:
                            focusedField === 'password'
                              ? [
                                  '0 0 0 0px rgba(139, 92, 246, 0)',
                                  '0 0 0 3px rgba(139, 92, 246, 0.1)',
                                  '0 0 0 5px rgba(139, 92, 246, 0.05)',
                                ]
                              : 'none',
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: focusedField === 'password' ? Infinity : 0,
                        }}
                        className="relative"
                      >
                        <Input
                          {...field}
                          type="password"
                          disabled={isLoading}
                          className={`border-[#63B3ED]/20 transition-all duration-500 focus-visible:border-[#8b5cf6]/50 focus-visible:ring-[#8b5cf6]/30 ${focusedField === 'password' ? 'bg-white/5' : ''}`}
                          onFocus={() => handleFocus('password')}
                          onBlur={handleBlur}
                        />
                        {focusedField === 'password' && (
                          <motion.div
                            className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-[#8b5cf6]/10 to-[#ec4899]/10 blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={formItemVariant}>
              <Button
                className="relative h-12 w-full overflow-hidden border-0 bg-gradient-to-r from-[#2B6CB0] to-[#63B3ED] text-base font-medium text-white transition-all duration-500 hover:from-[#63B3ED] hover:to-[#2B6CB0]"
                type="submit"
                disabled={isLoading}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 0.75,
                  }}
                />

                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <motion.span
                    className="flex items-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 20, 0, -20, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                    </motion.div>
                    Create account
                  </motion.span>
                )}
              </Button>
            </motion.div>
          </motion.form>
        </Form>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#63B3ED]/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Button
              variant="outline"
              className="w-full border-[#63B3ED]/20 transition-all duration-300 hover:border-[#63B3ED]/40 hover:bg-[#63B3ED]/5"
              disabled={isLoading}
            >
              <Icons.google className="mr-2 h-4 w-4 text-[#2B6CB0]" />
              Google
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Button
              variant="outline"
              className="group w-full border-[#2B6CB0]/20 transition-all duration-300 hover:border-[#2B6CB0]/40 hover:bg-[#2B6CB0]/5"
              disabled={isLoading}
            >
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                  delay: 1,
                }}
                className="mr-2"
              >
                <Icons.apple className="h-4 w-4 transition-colors duration-300 group-hover:text-[#2B6CB0]" />
              </motion.div>
              Apple
            </Button>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Already have an account?{' '}
          <Link
            href="/auth/signin"
            className="font-medium text-[#63B3ED] transition-colors duration-300 hover:text-[#2B6CB0] hover:underline"
          >
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default SignUpForm;
