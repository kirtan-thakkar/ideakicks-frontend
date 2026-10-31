import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { GlobalCTA } from "../components/common/GlobalCTA";
import { Home } from "../pages/Home";
import { Explore } from "../pages/Explore";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { Campaign } from "../pages/Campaign";
import { CampaignUpdates } from "../pages/CampaignUpdates";
import { BackCampaign } from "../pages/BackCampaign";
import { StartProject } from "../pages/StartProject";
import { AboutUs } from "../pages/AboutUs";
import { BackerLanding } from "../pages/BackerLanding";
import { VendorLanding } from "../pages/VendorLanding";
import { HowItWorks } from "../pages/HowItWorks";
import { Pricing } from "../pages/Pricing";
import { SuccessStories } from "../pages/SuccessStories";
import { Contact } from "../pages/Contact";
import { ForgotPassword } from "../pages/ForgotPassword";
import { Onboarding } from "../pages/Onboarding";
import { Legal } from "../pages/Legal";

import { ProjectWizard } from "../pages/ProjectWizard";
import { CreatorStudio } from "../pages/CreatorStudio";

import { Toaster } from "sonner";
import { ScrollToTop } from "../components/common/ScrollToTop";

const NO_FOOTER = ["/login", "/signup", "/forgot-password", "/onboarding", "/start/application"];
const NO_HEADER = ["/creator-studio"];
const NO_CTA = ["/login", "/signup", "/forgot-password", "/onboarding", "/start/application", "/creator-studio", "/dashboard", "/campaign"];

function AppLayout() {
  const { pathname } = useLocation();
  const hideFooter = NO_FOOTER.includes(pathname) || pathname.endsWith("/back") || NO_HEADER.some(path => pathname.startsWith(path));
  const hideHeader = NO_HEADER.some(path => pathname.startsWith(path));
  const hideCTA = NO_CTA.some(path => pathname.startsWith(path));
  
  return (
    <>
      <ScrollToTop />
      <Toaster position="bottom-right" richColors />
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/creator-studio/:id" element={<CreatorStudio />} />
        <Route path="/campaign/:id" element={<Campaign />} />
        <Route path="/campaign/:id/updates" element={<CampaignUpdates />} />
        <Route path="/campaign/:id/back" element={<BackCampaign />} />
        <Route path="/start" element={<StartProject />} />
        <Route path="/start/application" element={<ProjectWizard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/creators" element={<Navigate to="/start" replace />} />
        <Route path="/backers" element={<BackerLanding />} />
        <Route path="/vendors" element={<VendorLanding />} />
        <Route path="/partners" element={<VendorLanding />} />
        <Route path="/mentors" element={<Navigate to="/contact" replace />} />
        <Route path="/investors" element={<Navigate to="/contact" replace />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/blog" element={<Navigate to="/explore" replace />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!hideCTA && <GlobalCTA />}
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
