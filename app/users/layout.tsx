import getUsers from "../actions/getUsers";
import Sidebar from "../components/Sidebar/Sidebar";
import UserList from "./components/UserList";

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={user} />
        {children}
      </div>
    </Sidebar>
  );
};

export default UsersLayout;
