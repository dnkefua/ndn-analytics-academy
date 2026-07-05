import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download, MessageSquare, Calendar, ArrowRight, Sparkles, Code, Award, CheckCircle, ExternalLink } from 'lucide-react';
import { createLead, addEngagement } from '../../lib/leads';
import { PRODUCTS } from '../products/productData';
import SEO from '../seo/SEO';
import './TikTokLanding.css';

export default function TikTokLanding() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Top products to showcase for credibility
  const featuredProducts = PRODUCTS.filter(p => 
    ['ndn-017', 'ndn-001', 'ndn-005', 'ndn-012'].includes(p.id)
  );

  const handleDownloadRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSubmitting(true);

    try {
      // Save lead to Firestore
      const lead = await createLead({
        email,
        name,
        source: 'content_upgrade',
        tags: ['lead_magnet', 'ai_app_roadmap', 'tiktok'],
        productInterests: ['ndn-017'],
      });

      if (lead?.id) {
        await addEngagement(lead.id, 'content_download', {
          roadmapName: 'AI App Builder Roadmap',
        });
      }

      setSubmitted(true);
      // Programmatically trigger download of the roadmap
      const link = document.createElement('a');
      link.href = '/downloads/NDN-AI-App-Builder-Roadmap.html';
      link.download = 'NDN-AI-App-Builder-Roadmap.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to create lead:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="AI App Builder Hub"
        description="Start learning how to build and deploy production-ready AI applications. Download the free roadmap, watch tutorials, and join our global developer community."
        keywords="learn AI development, AI app builder roadmap, build AI applications, Vertex AI tutorial, developer community"
        canonicalPath="/tiktok"
      />

      <div className="tiktok-page bg-slate-950 text-slate-100 min-h-screen">
        {/* Ambient background glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-3xl mx-auto px-4 py-24 relative z-10 flex flex-col space-y-12">
          
          {/* Header profile */}
          <div className="text-center flex flex-col items-center">
            <div className="relative mb-4 group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/ndn_3d_logo.png" 
                alt="NDN Analytics Logo" 
                className="relative w-24 h-24 rounded-full object-cover border-2 border-cyan-400 shadow-xl"
              />
            </div>
            <h1 className="text-3xl font-black font-display tracking-tight text-white mb-2">
              NDN Analytics Academy
            </h1>
            <p className="text-slate-400 text-sm max-w-md font-sans">
              Learn practical AI engineering, Google Cloud architecture, and smart contract development through hands-on builds.
            </p>
          </div>

          {/* ── Main CTA: Start Learning ── */}
          <div className="glass-card p-6 border border-cyan-500/30 bg-cyan-950/20 rounded-2xl relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-left">
                <div className="p-3 bg-cyan-500/20 text-cyan-300 rounded-xl border border-cyan-500/30">
                  <Code className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Start Learning AI App Building</h3>
                  <p className="text-xs text-slate-400">Step-by-step interactive courses, sandboxes, and evaluations.</p>
                </div>
              </div>
              <Link 
                to="/academy" 
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-105"
              >
                <span>Enter Academy</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ── Lead Magnet: Free AI App Roadmap ── */}
          <div className="glass-card p-6 border border-slate-800 bg-slate-900/30 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-500/20">
                <Download className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white font-display">Free AI App Builder Roadmap</h2>
            </div>
            <p className="text-slate-400 text-xs mb-6">
              Get the complete architectural guide to go from writing basic prompt APIs to deploying serverless, auto-scaling microservices on Google Cloud Vertex AI.
            </p>

            {submitted ? (
              <div className="flex items-center gap-3 p-4 bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 rounded-xl">
                <CheckCircle className="w-6 h-6 shrink-0" />
                <div className="text-left text-xs">
                  <strong className="block text-white">Roadmap Downloaded Successfully!</strong>
                  If the download didn't trigger, <a href="/downloads/NDN-AI-App-Builder-Roadmap.html" download className="underline hover:text-white">click here to download manually</a>.
                </div>
              </div>
            ) : (
              <form onSubmit={handleDownloadRoadmap} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full py-3 bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting ? 'Preparing your download...' : 'Send Me the Free Roadmap'}
                </button>
              </form>
            )}
          </div>

          {/* ── Audience & Monetization Links ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* WhatsApp/Telegram */}
            <a 
              href="https://chat.whatsapp.com/G5y1uN8tM5m...placeholder" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-800 hover:border-emerald-500/40 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-lg">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-white">Join the Community</span>
                  <span className="text-[10px] text-slate-400">Connect with 1,200+ AI builders</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </a>

            {/* YouTube tutorials */}
            <a 
              href="https://www.youtube.com/@NDNANALYTICS" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-800 hover:border-red-500/40 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 text-red-300 rounded-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-white">Watch Tutorials</span>
                  <span className="text-[10px] text-slate-400">Deep dives & visual explanations</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-red-400 transition-colors" />
            </a>

            {/* Mentorship booking */}
            <Link 
              to="/contact?utm_source=tiktok&utm_medium=mentorship" 
              className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-800 hover:border-indigo-500/40 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 text-indigo-300 rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-white">Book 1:1 Mentorship</span>
                  <span className="text-[10px] text-slate-400">Get architecture & code review</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Free Certifications */}
            <Link 
              to="/academy" 
              className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-800 hover:border-cyan-500/40 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 text-cyan-300 rounded-lg">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-white">Earn Certificates</span>
                  <span className="text-[10px] text-slate-400">Tamper-proof on-chain credits</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>

          {/* ── Business Credibility: Product Demos ── */}
          <div className="text-left flex flex-col space-y-4">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Credibility Demos: NDN Flagship Products
            </h2>
            <p className="text-[11px] text-slate-400">
              We don't just teach. We build production-ready enterprise technology. Here are a few reference applications in our portfolio:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredProducts.map(product => (
                <div key={product.id} className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white font-display">{product.name}</span>
                      <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-800/30">
                        {product.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>
                  <Link 
                    to={`/products/${product.id}`} 
                    className="text-[10px] text-cyan-400 hover:text-white font-mono flex items-center gap-1 transition-colors"
                  >
                    View details &times; demo &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
