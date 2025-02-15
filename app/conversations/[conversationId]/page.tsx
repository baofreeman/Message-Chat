import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessage";
import EmptyState from "@/app/components/EmptyState/EmptyState";
import Header from "./components/Header";
import Content from "./components/Content";
import Form from "./components/Form";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const { conversationId } = params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId, 1);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-[400px] h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Content initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
