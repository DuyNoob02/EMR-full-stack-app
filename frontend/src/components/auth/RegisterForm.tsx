// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Button } from '../../components/ui/button';
// import { useAuth } from '../../hooks/useAuth';
// import { useRouter } from 'next/navigation';

// interface RegisterFormProps {
//   onToggleView: () => void;
// }

// interface RegisterFormData {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// export function RegisterForm({ onToggleView }: RegisterFormProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   // const { register: registerUser } = useAuth();
//   const router = useRouter();
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch
//   } = useForm<RegisterFormData>();

//   const password = watch('password');

//   const onSubmit = async (data: RegisterFormData) => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       await registerUser(data.name, data.email, data.password);
//       router.push('/dashboard');
//     } catch (err: any) {
//       setError(err.message || 'Registration failed');
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
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//           Name
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="name"
//           type="text"
//           placeholder="Name"
//           {...register('name', {
//             required: 'Name is required',
//             minLength: {
//               value: 2,
//               message: 'Name must be at least 2 characters'
//             }
//           })}
//         />
//         {errors.name && (
//           <p className="text-red-500 text-xs italic mt-1">{errors.name.message}</p>
//         )}
//       </div>
      
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
      
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//           Password
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="password"
//           type="password"
//           placeholder="Password"
//           {...register('password', {
//             required: 'Password is required',
//             minLength: {
//               value: 8,
//               message: 'Password must be at least 8 characters'
//             }
//           })}
//         />
//         {errors.password && (
//           <p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>
//         )}
//       </div>
      
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
//           Confirm Password
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="confirmPassword"
//           type="password"
//           placeholder="Confirm Password"
//           {...register('confirmPassword', {
//             required: 'Please confirm your password',
//             validate: value => value === password || 'Passwords do not match'
//           })}
//         />
//         {errors.confirmPassword && (
//           <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword.message}</p>
//         )}
//       </div>
      
//       {/* <div className="flex items-center justify-between">
//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full"
//         >
//           {isLoading ? 'Creating Account...' : 'Sign Up'}
//         </Button>
//       </div> */}
      
//       <div className="mt-4 text-center">
//         <span className="text-sm text-gray-600">
//           Already have an account?{' '}
//           <button
//             type="button"
//             className="text-primary-600 hover:text-primary-800 font-medium"
//             onClick={onToggleView}
//           >
//             Sign In
//           </button>
//         </span>
//       </div>
//     </form>
//   );
// }