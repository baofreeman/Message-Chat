import getConversations from "../actions/getConversations";
import Sidebar from "../components/Sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

const ConversationLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const converdations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={converdations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationLayout;
