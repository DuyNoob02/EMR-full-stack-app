'use client';
import { useRouter } from 'next/navigation';
import { message } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, LoginFormData } from "../../features/auth/schemas/login.schema";
import { loginApi } from "../../features/auth/api/auth.api";
import { useAuthStore } from "../../features/auth/store/auth.store";

export default function LoginPage() {
    const router = useRouter();
    const loginStore = useAuthStore();
    const [messageApi, contextHolder] = message.useMessage();


    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            loginStore.login(data);
            messageApi.success('Đăng nhập thành công!', 2);
            router.push('/medical-records/patient-manager');
        },
        onError: (error: any) => {
            messageApi.error(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        },
    });





    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {contextHolder}
            {/* LEFT: LOGIN FORM */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10 md:py-0">
                <div className="bg-white/90  backdrop-blur-md shadow-lg rounded-xl  w-full max-w-md">
                    <h2 className="text-3xl text-white font-bold text-center bg-primary-background p-3 rounded">DH - EMR</h2>

                    <form className="mt-6 px-8 pb-8" onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit((data) => { loginMutation.mutate(data) })(e);
                    }}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Mã nhân viên
                            </label>
                            <input
                                {...form.register('employeeCode')}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                type="text"
                                placeholder="Mã nhân viên"
                            />
                            {form.formState.errors.employeeCode && <p className="text-red-500 text-xs italic mt-2">{form.formState.errors.employeeCode.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Mật khẩu
                            </label>
                            <input
                                {...form.register('password')}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                type="password"
                                placeholder="Mật khẩu"
                            />
                            {form.formState.errors.password && <p className="text-red-500 text-xs italic mt-2">{form.formState.errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-center">
                            <button type='submit' disabled={loginMutation.isPending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                                {loginMutation.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* RIGHT: ILLUSTRATION */}
            <div className="relative w-full md:w-1/2 flex items-center justify-center overflow-hidden">
                <img
                    src="/background.png"
                    alt="Illustration"
                    className="w-auto h-auto object-contain opacity-90 p-4 md:p-10"
                />
            </div>

        </div>
    );
}
