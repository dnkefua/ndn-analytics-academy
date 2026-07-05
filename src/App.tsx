import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout & Assistive Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AriaFAB from './components/aria/AriaFAB';

// Marketing Pages & Sections
import HeroGlass from './components/hero/HeroGlass';
import ProductsSection from './components/products/ProductsSection';
import ProductDetail from './components/products/ProductDetail';
import SolutionsSection from './components/solutions/SolutionsSection';
import TechSection from './components/tech/TechSection';
import AboutSection from './components/about/AboutSection';
import ContactSection from './components/contact/ContactSection';
import BlogSection from './components/blog/BlogSection';
import BlogPost from './components/blog/BlogPost';
import AIToolsSection from './components/aitools/AIToolsSection';
import AIProductsLanding from './components/landing/AIProductsLanding';
import BlockchainSolutionsLanding from './components/landing/BlockchainSolutionsLanding';
import GoogleCloudAILanding from './components/landing/GoogleCloudAILanding';
import SmartContractLanding from './components/landing/SmartContractLanding';
import AIAutomationLanding from './components/landing/AIAutomationLanding';
import LocalServiceLanding from './components/landing/LocalServiceLanding';
import { LOCAL_SERVICE_SLUGS } from './lib/localServiceRoutes';
import CaseStudiesSection from './components/casestudies/CaseStudiesSection';
import CaseStudyDetail from './components/casestudies/CaseStudyDetail';
import WhitePaper from './components/whitepaper/WhitePaper';
import CheckoutSuccess from './components/checkout/CheckoutSuccess';
import CheckoutCancelled from './components/checkout/CheckoutCancelled';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsOfService from './components/legal/TermsOfService';
import EditorialPolicy from './components/publisher/EditorialPolicy';
import CorrectionsPolicy from './components/publisher/CorrectionsPolicy';
import AuthorProfile from './components/publisher/AuthorProfile';
import ProcessPage from './components/process/ProcessPage';
import FineTuningTeaser from './components/products/FineTuningTeaser';
import AdminDashboard from './components/admin/AdminDashboard';
import NotFound from './components/errors/NotFound';

// Academy Platform & Custom Social Media Landing Page
import AcademyApp from './components/AcademyApp';
import TikTokLanding from './components/landing/TikTokLanding';

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main-content" style={{ position: 'relative', zIndex: 10 }}>
        <Routes>
          {/* Main Website Marketing Pages */}
          <Route path="/" element={<HeroGlass />} />
          <Route path="/products" element={<ProductsSection />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/solutions" element={<SolutionsSection />} />
          <Route path="/tech" element={<TechSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/pricing" element={<Navigate to="/contact" replace />} />
          <Route path="/ai-tools" element={<AIToolsSection />} />
          <Route path="/ai-products" element={<AIProductsLanding />} />
          <Route path="/blockchain-solutions" element={<BlockchainSolutionsLanding />} />
          <Route path="/google-cloud-ai-consulting" element={<GoogleCloudAILanding />} />
          <Route path="/smart-contract-development" element={<SmartContractLanding />} />
          <Route path="/ai-automation" element={<AIAutomationLanding />} />
          
          {/* Geo-Targeted Service Landing Pages */}
          {LOCAL_SERVICE_SLUGS.map((slug) => (
            <Route key={slug} path={`/${slug}`} element={<LocalServiceLanding />} />
          ))}
          
          {/* Portfolios, Case Studies, & Workflows */}
          <Route path="/case-studies" element={<CaseStudiesSection />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancelled" element={<CheckoutCancelled />} />
          
          {/* Editorial & Legal Disclaimers */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/editorial-policy" element={<EditorialPolicy />} />
          <Route path="/corrections-policy" element={<CorrectionsPolicy />} />
          <Route path="/authors/:slug" element={<AuthorProfile />} />
          
          {/* Deep Dives & Processes */}
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/whitepaper" element={<WhitePaper />} />
          <Route path="/fine-tuning" element={<FineTuningTeaser />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Dedicated Landing Funnel for Social Traffic */}
          <Route path="/tiktok" element={<TikTokLanding />} />

          {/* Interactive Academy Learning platform */}
          <Route path="/academy/*" element={<AcademyApp />} />

          {/* Catch-all Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <AriaFAB />
    </>
  );
}
