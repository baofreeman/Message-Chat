import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/Sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

const ConversationLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const converdations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialItems={converdations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationLayout;
