import React from 'react';
import { EarnedCertificate } from '../types/academy';
import { COURSES } from '../data/courses';
import { Award, CheckCircle, ShieldCheck, Share2, Printer, X } from 'lucide-react';

interface CertificateEvidenceProps {
  certificate: EarnedCertificate;
  onClose: () => void;
}

export const CertificateEvidence: React.FC<CertificateEvidenceProps> = ({
  certificate,
  onClose,
}) => {
  const course = COURSES.find(c => c.id === certificate.courseId);

  const handlePrint = () => {
    window.print();
  };

  const shareText = `I have successfully completed the professional course "${certificate.title}" at NDN Analytics Academy under Academic Director MSc Desmond Nkefua! (Verification Hash: ${certificate.verificationId})`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-100 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Certificate Box */}
        <div className="border-4 border-double border-cyan-500/40 rounded-2xl p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 space-y-6 text-center shadow-inner">
          <div className="flex justify-center">
            <img src="/ndn_3d_logo.png" alt="NDN Analytics 3D emblem" className="w-16 h-16 object-contain" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">NDN ANALYTICS INC. ACADEMY</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Certificate of Completion</h1>
            <p className="text-xs text-slate-400">Verifiable Professional Credit Evidence</p>
          </div>

          <div className="space-y-2 py-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider">This is to certify that</p>
            <h2 className="text-2xl font-bold text-cyan-300 font-display">{certificate.recipientName}</h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              has successfully completed all rigorous coursework, practical lab evaluations, and capstone project requirements for
            </p>
            <h3 className="text-lg font-bold text-white max-w-xl mx-auto pt-1">{certificate.title}</h3>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-slate-800 py-4 text-xs">
            <div>
              <span className="text-slate-500 block">CPD Credits</span>
              <span className="font-bold text-amber-400">{certificate.cpdCredits} Credits</span>
            </div>
            <div>
              <span className="text-slate-500 block">Issue Date</span>
              <span className="font-bold text-white">{certificate.issueDate}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Verification Hash</span>
              <span className="font-mono text-cyan-400 text-[10px]">{certificate.verificationId}</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="flex justify-between items-end pt-4 text-xs">
            <div className="text-left space-y-1">
              <span className="font-bold text-white block">MSc Desmond Nkefua</span>
              <span className="text-slate-400 block text-[10px]">Academic Director & Founder, NDN Analytics</span>
            </div>
            <div className="text-right space-y-1">
              <span className="font-mono text-emerald-400 block font-bold text-[10px]">VERIFIED AUTHENTIC</span>
              <span className="text-slate-500 block text-[10px]">NDN Verification System</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://ndnanalytics.com")}&summary=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-md"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};
