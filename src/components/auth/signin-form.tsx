'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import supabase from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, KeyRound, Lock, Mail, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import Loading from '../loading';
import { motion} from 'framer-motion';
import { useTheme } from 'next-themes';
import { getCurrentProfile } from '@/core/auth/server';
import { useLanguage } from '@/lib/i18n/language-context';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long'),
});

type FormValues = z.infer<typeof formSchema>;

export function SignInForm(): JSX.Element {
  const router = useRouter();
  const { t } = useLanguage();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }
      
      const profile = await getCurrentProfile();

      toast.success(t.auth.signin.successMessage);

      if (profile?.role === 'user') {
        router.push('/user');
      } else if (profile?.role === 'admin') {
        router.push('/admin');
      } else {
        return <Loading />;
      }
    } catch (error: unknown) {
      console.log('SignIn error', error)
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during sign in. Please try again.';
      toast.error(errorMessage);
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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
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
    <div className="relative min-h-screen flex items-center justify-center py-10">
      
      {/* Efecto de halo alrededor del formulario */}
      <div className="absolute pointer-events-none">
        <div className="w-[110%] h-[110%] -mt-[5%] -ml-[5%]">
          <div 
            className={`absolute inset-0 rounded-[30%] opacity-30 blur-3xl bg-gradient-to-r ${focusedField ? 'from-[#8b5cf6] to-[#2B6CB0]' : 'from-[#63B3ED] to-[#8b5cf6]'}`}
            style={{
              transform: 'scale(0.85)',
              filter: 'blur(120px)',
              animation: 'pulse 8s ease-in-out infinite alternate'
            }}
          />
        </div>
      </div>
      
      {/* Partículas adicionales para el formulario de inicio de sesión */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 pointer-events-none"
            style={{ zIndex: -1 }}
            animate={{ 
              rotate: [0, 360], 
            }}
            transition={{ 
              duration: 25, 
              ease: "linear", 
              repeat: Infinity,
            }}
          >
            <motion.div 
              animate={{
                opacity: [0.2, 0.3, 0.2],
                y: [0, -15, 0],
                x: [0, 15, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 0.5 
              }}
              className="absolute h-1 w-1 rounded-full bg-[#2B6CB0]"
              style={{ top: '60%', left: '30%' }}
            />
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/3 right-1/4 pointer-events-none"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          >
            <Star className="h-4 w-4 text-[#8b5cf6]/50" />
          </motion.div>
        </>
      )}

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-full max-w-md relative z-10 space-y-6 rounded-lg bg-background/70 backdrop-blur-md p-8 shadow-xl border border-[#8b5cf6]/20 transition-all duration-500"
        whileHover={{ boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)" }}
      >
        <Form {...form}>
          <motion.div variants={formItemVariant} className="flex items-center justify-center mb-6">
            <Link
              href="/"
              className="flex items-center space-x-2 transition-colors hover:opacity-90 "
            >
              <Image
                alt="Logo"
                src="/assets/images/logo/logo.png"
                width={160}
                height={160}
              />
            </Link>
          </motion.div>
          <motion.div variants={formItemVariant} className="flex items-center justify-center mb-6">
            <h2 className="text-3xl font-bold pb-3 text-center">{t.auth.signin.title}</h2>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90 flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-[#8b5cf6]" />
                      {t.auth.signin.email}
                    </FormLabel>
                    <FormControl>
                      <motion.div
                        animate={{
                          boxShadow: focusedField === 'email' 
                            ? ['0 0 0 0px rgba(139, 92, 246, 0)', '0 0 0 3px rgba(139, 92, 246, 0.1)', '0 0 0 5px rgba(139, 92, 246, 0.05)']
                            : 'none'
                        }}
                        transition={{ duration: 1.5, repeat: focusedField === 'email' ? Infinity : 0 }}
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
                          className={`border-[#2B6CB0] focus-visible:ring-[#8b5cf6]/30 focus-visible:border-[#2B6CB0] transition-all duration-500 ${focusedField === 'email' ? 'bg-white/5' : ''}`}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                        />
                        {focusedField === 'email' && (
                          <motion.div 
                            className="absolute inset-0 -z-10 rounded-md blur-sm bg-gradient-to-r from-[#8b5cf6]/10 to-[#2B6CB0]/10"
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
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-foreground/90 flex items-center">
                        <Lock className="mr-2 h-4 w-4 text-[#2B6CB0]" />
                        {t.auth.signin.password}
                      </FormLabel>
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <Link
                          href="#"
                          className="text-sm text-muted-foreground hover:text-[#ec4899] transition-colors duration-300"
                        >
                          {t.auth.signin.forgotPassword}
                        </Link>
                      </motion.div>
                    </div>
                    <FormControl>
                      <motion.div
                        animate={{
                          boxShadow: focusedField === 'password' 
                            ? ['0 0 0 0px rgba(236, 72, 153, 0)', '0 0 0 3px rgba(236, 72, 153, 0.1)', '0 0 0 5px rgba(236, 72, 153, 0.05)']
                            : 'none'
                        }}
                        transition={{ duration: 1.5, repeat: focusedField === 'password' ? Infinity : 0 }}
                        className="relative"
                      >
                        <Input 
                          {...field} 
                          type="password" 
                          disabled={isLoading} 
                          className={`border-[#ec4899]/20 focus-visible:ring-[#ec4899]/30 focus-visible:border-[#ec4899]/50 transition-all duration-500 ${focusedField === 'password' ? 'bg-white/5' : ''}`}
                          onFocus={() => handleFocus('password')}
                          onBlur={handleBlur}
                        />
                        {focusedField === 'password' && (
                          <motion.div 
                            className="absolute inset-0 -z-10 rounded-md blur-sm bg-gradient-to-r from-[#ec4899]/10 to-[#2B6CB0]/10"
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
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-[#2B6CB0] to-[#63B3ED] hover:from-[#63B3ED] hover:to-[#2B6CB0] transition-all duration-500 border-0 text-white overflow-hidden relative" 
                type="submit" 
                disabled={isLoading}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.75
                  }}
                />

                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t.auth.signin.signingIn}
                  </>
                ) : (
                  <motion.span 
                    className="flex items-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 20, 0, -20, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <KeyRound className="mr-2 h-5 w-5" />
                    </motion.div>
                    {t.auth.signin.signInButton}
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
            <span className="w-full border-t border-[#2B6CB0]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <motion.span 
              className="bg-background px-3 py-1 text-muted-foreground rounded-full"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {t.auth.signin.orContinueWith}
            </motion.span>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.div 
            whileHover={{ scale: 1.03, y: -2 }} 
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              variant="outline" 
              className="group w-full border-[#2B6CB0] hover:border-[#2B6CB0] hover:bg-[#8b5cf6]/5 transition-all duration-300" 
              disabled={isLoading}
            >
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                className="mr-2"
              >
                <Icons.google className="h-4 w-4 text-[#2B6CB0] group-hover:text-[#2B6CB0]/80 transition-colors duration-300" />
              </motion.div>
              {t.auth.signin.google}
            </Button>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.03, y: -2 }} 
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              variant="outline" 
              className="group w-full border-[#2B6CB0]/20 hover:border-[#2B6CB0]/40 hover:bg-[#2B6CB0]/5 transition-all duration-300" 
              disabled={isLoading}
            >
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: 1 }}
                className="mr-2"
              >
                <Icons.apple className="h-4 w-4 group-hover:text-[#2B6CB0] transition-colors duration-300" />
              </motion.div>
              {t.auth.signin.apple}
            </Button>
          </motion.div>
        </motion.div>

        <motion.p 
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {t.auth.signin.dontHaveAccount}{' '}
          <motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-block"
          >
            <Link
              href="/auth/signup"
              className="font-medium text-[#63B3ED] hover:text-[#2B6CB0] transition-colors duration-300 hover:underline"
            >
              {t.auth.signin.signUpLink}
            </Link>
          </motion.span>
        </motion.p>
        
      </motion.div>

      {/* Estrellas pequeñas alrededor del formulario */}
      {mounted && (
        <>
          <motion.div
            className="absolute bottom-10 right-12 text-[#2B6CB0]/20 pointer-events-none"
            animate={{ 
              y: [0, -5, 0, 5, 0],
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Star className="h-4 w-4" />
          </motion.div>
          <motion.div
            className="absolute top-20 left-12 text-[#2B6CB0]/20 pointer-events-none"
            animate={{ 
              y: [0, 5, 0, -5, 0],
              opacity: [0.2, 0.5, 0.2] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1 
            }}
          >
            <Star className="h-3 w-3" />
          </motion.div>
        </>
      )}
    </div>
  );
}

export default SignInForm;
