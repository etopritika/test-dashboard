import AuthWrapper from "@/components/Auth-Wrapper";
import Logout from "@/components/Logout";

function Dashboard() {
  return (
    <AuthWrapper>
      <section>
        <h1>Приватна сторінка: Dashboard</h1>
        <Logout />
      </section>
    </AuthWrapper>
  );
}

export default Dashboard;
