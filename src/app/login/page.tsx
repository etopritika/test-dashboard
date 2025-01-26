import AuthForm from "@/components/Auth-Form";

export default function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <h1 className="sr-only">Authorization Page</h1>
      <AuthForm />
    </section>
  );
}
