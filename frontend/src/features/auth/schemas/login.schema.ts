import { z } from 'zod';

export const loginSchema = z.object({
    employeeCode: z.string().min(1, 'Vui lòng nhập mã nhân viên'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});
export type LoginFormData = z.infer<typeof loginSchema>;