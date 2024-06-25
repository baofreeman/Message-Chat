import Sidebar from "../components/Sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

const ConversationLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={[]} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationLayout;
