// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Button } from '../../components/ui/button';
// import { useAuth } from '../..//hooks/useAuth';
// import { useRouter } from 'next/navigation';

// interface LoginFormProps {
//   onToggleView: () => void;
// }

// interface LoginFormData {
//   email: string;
//   password: string;
// }

// export function LoginForm({ onToggleView }: LoginFormProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { login } = useAuth();
//   const router = useRouter();
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<LoginFormData>();

//   const onSubmit = async (data: LoginFormData) => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       await login(data.email, data.password);
//       router.push('/dashboard');
//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//           Email
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="email"
//           type="email"
//           placeholder="Email"
//           {...register('email', {
//             required: 'Email is required',
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: 'Invalid email address'
//             }
//           })}
//         />
//         {errors.email && (
//           <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>
//         )}
//       </div>
      
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//           Password
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="password"
//           type="password"
//           placeholder="Password"
//           {...register('password', {
//             required: 'Password is required'
//           })}
//         />
//         {errors.password && (
//           <p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>
//         )}
//       </div>
      
//       <div className="flex items-center justify-between">
//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full"
//         >
//           {isLoading ? 'Signing In...' : 'Sign In'}
//         </Button>
//       </div>
      
//       <div className="mt-4 text-center">
//         <span className="text-sm text-gray-600">
//           Don't have an account?{' '}
//           <button
//             type="button"
//             className="text-primary-600 hover:text-primary-800 font-medium"
//             onClick={onToggleView}
//           >
//             Sign Up
//           </button>
//         </span>
//       </div>
//     </form>
//   );
// }