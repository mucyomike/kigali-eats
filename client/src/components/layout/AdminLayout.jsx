import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>AdminLayout</h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
