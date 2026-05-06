import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ConversationDetailPage } from "./pages/ConversationDetailPage";
import { DashboardHomePage } from "./pages/DashboardHomePage";
import { InboxPage } from "./pages/InboxPage";
import { IntegrationsPage } from "./pages/IntegrationsPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="inbox/:id" element={<ConversationDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
