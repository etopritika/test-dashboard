import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, registerSchema } from "./schema";
import useAuthStore from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm: React.FC<{ onSwitchToLogin: () => void }> = ({
  onSwitchToLogin,
}) => {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { register: registerUser, login } = useAuthStore();

  const onSubmit = (data: RegisterFormSchema) => {
    const { email, password, name } = data;
    const result = registerUser(name, email, password);

    if (result.success) {
      setFormError(null);
      login(email, password);
      router.push("/dashboard");
      reset();
    } else {
      setFormError(result.message);
    }
  };

  return (
    <div className="max-w-lg w-full p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register("name")}
            className={`w-full border p-2 rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`w-full border p-2 rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          {formError && (
            <p className="text-red-500 text-sm mt-1">{formError}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`w-full border p-2 rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-8 right-3 text-gray-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className={`w-full border p-2 rounded ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>

      {/* Switch to Login */}
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-500 hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
