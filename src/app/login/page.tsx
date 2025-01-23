import AuthForm from "@/components/Auth-Form";
import AuthWrapper from "@/components/Auth-Wrapper";

export default function Login() {
  return (
    <AuthWrapper redirectIfAuthenticated={true}>
      <section className="h-full flex items-center justify-center">
        <h1 className="sr-only">Authorization Page</h1>
        <AuthForm />
      </section>
    </AuthWrapper>
  );
}
