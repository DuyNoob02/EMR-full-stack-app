'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { message } from "antd";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();


    const [error, setError] = useState({
        username: '',
        password: ''
    });
    const handleLogin = (e) => {
        try {
            e.preventDefault();

            const newError = {
                username: username ? '' : 'Vui lòng nhập mã nhân viên',
                password: password ? '' : 'Vui lòng nhập mật khẩu'
            };
            setError(newError);
            if (newError.username || newError.password) {
                return;
            }
            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công!',
                duration: 2,
            });
            setTimeout(() => {
                router.push('medical-records/patient-manager');
            }, 2000);
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: 'Đăng nhập thất bại. Vui lòng thử lại.',
                duration: 4,
            });
        }
    };




    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {contextHolder}
            {/* LEFT: LOGIN FORM */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10 md:py-0">
                <div className="bg-white/90  backdrop-blur-md shadow-lg rounded-xl  w-full max-w-md">
                    <h2 className="text-3xl text-white font-bold text-center bg-primary-background p-3 rounded">DH - EMR</h2>

                    <form className="mt-6 px-8 pb-8">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Mã nhân viên
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="username"
                                type="text"
                                value={username}
                                placeholder="Mã nhân viên"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {error.username && <p className="text-red-500 text-xs italic mt-2">{error.username}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Mật khẩu
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mật khẩu"
                            />
                            {error.password && <p className="text-red-500 text-xs italic mt-2">{error.password}</p>}
                        </div>

                        <div className="flex items-center justify-center">
                            <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                                Đăng nhập
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
