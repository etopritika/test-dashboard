"use client";
import React from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, loginSchema } from "./schema";
import { useRouter } from "next/navigation";

const LoginForm: React.FC<{ onSwitchToRegister: () => void }> = ({
  onSwitchToRegister,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuthStore();

  const onSubmit = (data: LoginFormSchema) => {
    const { email, password } = data;
    const result = login(email, password);

    if (result.success) {
      alert("Login successful!");
      router.push("/dashboard");
      reset();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="max-w-lg w-full p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password")}
            className={`w-full border p-2 rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-blue-500 hover:underline"
        >
          Don&#39;t have an account? Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
