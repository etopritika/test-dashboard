import AuthWrapper from "@/components/Auth-Wrapper";
import Table from "@/components/Table";
import { fetchTableData } from "@/lib/api";

async function Data() {
  const { tableData, error } = await fetchTableData();

  if (error) {
    return (
      <AuthWrapper>
        <section className="py-4">
          <h1 className="sr-only">Data Page</h1>
          <div className="flex justify-center items-center h-screen">
            <span className="text-red-500 text-lg">{error}</span>
          </div>
        </section>
      </AuthWrapper>
    );
  }
  return (
    <AuthWrapper>
      <section className="py-4">
        <h1 className="sr-only">Data Page</h1>
        <Table tableData={tableData!} />
      </section>
    </AuthWrapper>
  );
}

export default Data;
