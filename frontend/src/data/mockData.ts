export type Channel = "email" | "instagram";
export type Priority = "High" | "Medium";
export type ConversationStatus = "Draft Ready" | "Needs Review";

export type ThreadMessage = {
  author: string;
  role: "customer" | "team" | "draft";
  body: string;
  time: string;
};

export type Conversation = {
  id: string;
  channel: Channel;
  customer: string;
  contact: string;
  lastMessage: string;
  intent: string;
  priority: Priority;
  status: ConversationStatus;
  time: string;
  summary: string;
  suggestedReply: string;
  thread: ThreadMessage[];
};

export const conversations: Conversation[] = [
  {
    id: "instagram-customer123",
    channel: "instagram",
    customer: "@customer123",
    contact: "Instagram DM",
    lastMessage: "Do you still have the walnut studio desk in stock?",
    intent: "Product availability",
    priority: "High",
    status: "Draft Ready",
    time: "12 min ago",
    summary:
      "Customer is asking about walnut desk availability and wants a quick answer before placing an order.",
    suggestedReply:
      "Yes, the walnut studio desk is currently in stock. I can reserve one for you today and share the checkout link whenever you are ready.",
    thread: [
      {
        author: "@customer123",
        role: "customer",
        body: "Hi, do you still have the walnut studio desk in stock?",
        time: "9:32 AM",
      },
      {
        author: "@customer123",
        role: "customer",
        body: "I want to order today if it can ship this week.",
        time: "9:34 AM",
      },
      {
        author: "Relay draft",
        role: "draft",
        body: "Yes, the walnut studio desk is currently in stock. I can reserve one for you today and share the checkout link whenever you are ready.",
        time: "9:35 AM",
      },
    ],
  },
  {
    id: "email-client-gmail",
    channel: "email",
    customer: "client@gmail.com",
    contact: "client@gmail.com",
    lastMessage: "Can you send the updated onboarding timeline?",
    intent: "Project update",
    priority: "Medium",
    status: "Needs Review",
    time: "28 min ago",
    summary:
      "Client needs the latest onboarding timeline and expects the revised dates by the end of the day.",
    suggestedReply:
      "Thanks for checking in. The updated onboarding timeline is ready, and I will send the revised dates and next steps before the end of today.",
    thread: [
      {
        author: "client@gmail.com",
        role: "customer",
        body: "Can you send the updated onboarding timeline?",
        time: "9:06 AM",
      },
      {
        author: "client@gmail.com",
        role: "customer",
        body: "We need to confirm the launch checklist with the team today.",
        time: "9:08 AM",
      },
      {
        author: "Relay draft",
        role: "draft",
        body: "Thanks for checking in. The updated onboarding timeline is ready, and I will send the revised dates and next steps before the end of today.",
        time: "9:10 AM",
      },
    ],
  },
];
