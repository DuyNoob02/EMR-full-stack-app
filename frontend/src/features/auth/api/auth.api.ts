
import { LoginFormData } from "../schemas/login.schema";

export async function loginApi(data: LoginFormData) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập delay mạng

    if(data.employeeCode !== '123'){
        throw new Error('Mã nhân viên không tồn tại');
    }

    return {
        accessToken: 'fake-jwt-token',
        user: {
            id: 1,
            employeeCode: data.employeeCode,
            name: 'Nguyễn Văn A',
            role: 'BSCKI',
        },  
    };
}