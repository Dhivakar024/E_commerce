import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';
import {
  Briefcase,
  MapPin,
  Clock,
  Upload,
  CheckCircle2,
  Send,
  Loader2,
  FileText,
  User,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { PrivacyConsent } from '../components/common/PrivacyConsent';

const OPEN_POSITIONS = [
  {
    id: 'pos-1',
    title: 'Senior Full-Stack Engineer',
    department: 'Technology & Platform',
    location: 'Mumbai (BKC HQ) • Hybrid',
    type: 'Full-Time',
    experience: '4–7 Years',
    description:
      'Architect resilient microservices, high-speed catalogue indexing, and real-time checkout pipelines powering the LAX360 marketplace.',
  },
  {
    id: 'pos-2',
    title: 'Luxury Fashion Curator & Merchandiser',
    department: 'Haute Couture & Lifestyle',
    location: 'Mumbai (BKC HQ)',
    type: 'Full-Time',
    experience: '3–6 Years',
    description:
      'Source, curate, and establish partnerships with premium artisanal brands across India and Europe, upholding our aesthetic benchmarks.',
  },
  {
    id: 'pos-3',
    title: 'Supply Chain & VIP Logistics Manager',
    department: 'Operations & Fulfillment',
    location: 'Bengaluru / Mumbai',
    type: 'Full-Time',
    experience: '5–8 Years',
    description:
      'Lead secure cold-chain pharmaceutical delivery, white-glove luxury logistics, and hyper-reliable dispatch networks.',
  },
  {
    id: 'pos-4',
    title: 'Customer Experience & Client Concierge Lead',
    department: 'Customer Relations',
    location: 'Mumbai (BKC HQ)',
    type: 'Full-Time',
    experience: '2–5 Years',
    description:
      'Deliver personalized support, dispute resolution, and high-touch VIP concierge assistance for our distinguished clientele.',
  },
];

export const Careers = () => {
  const { showToast } = useShop();
  const { isDark } = useTheme();

  const [selectedRole, setSelectedRole] = useState(OPEN_POSITIONS[0].title);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    qualification: 'Bachelor\'s Degree',
    experienceYears: '3–5 Years',
    portfolioUrl: '',
    coverNote: '',
    resumeFileName: '',
  });

  const [hasReadPrivacy, setHasReadPrivacy] = useState(false);
  const [acknowledgedPrivacy, setAcknowledgedPrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resumeFileName: file.name }));
    }
  };

  const handleSelectJob = (jobTitle) => {
    setSelectedRole(jobTitle);
    const formEl = document.getElementById('application-form-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrivacyError('');

    if (!hasReadPrivacy || !acknowledgedPrivacy) {
      setPrivacyError('Please read and acknowledge the Privacy Notice before submitting your application.');
      return;
    }

    if (!formData.resumeFileName) {
      showToast('Please attach your resume file before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      showToast('Application submitted successfully. Our talent team will review your profile.', 'success');
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setHasReadPrivacy(false);
    setAcknowledgedPrivacy(false);
    setPrivacyError('');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      qualification: 'Bachelor\'s Degree',
      experienceYears: '3–5 Years',
      portfolioUrl: '',
      coverNote: '',
      resumeFileName: '',
    });
  };

  return (
    <main
      className={`w-full min-h-screen pt-24 sm:pt-28 pb-16 transition-colors duration-250 ${
        isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className={`flex items-center gap-2 text-xs tracking-wider ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
          }`}
        >
          <Link to="/" className="hover:text-[#C9A45C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-[#C9A45C] font-semibold">Careers</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            JOIN LAX360 PVT LTD
          </span>
          <h1
            className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}
          >
            Shape the Future of Luxury Commerce
          </h1>
          <p
            className={`text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}
          >
            We are building an enduring ecosystem of technology, design, and multi-category excellence. Explore open roles across engineering, curation, operations, and leadership.
          </p>
        </div>

        {/* Values / Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            className={`p-6 border shadow-xl space-y-2.5 ${
              isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
            }`}
          >
            <div className="w-9 h-9 border border-[#C9A45C]/30 bg-[#C9A45C]/10 text-[#C9A45C] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-base font-medium">Bespoke Excellence</h3>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'}`}>
              Work with the highest standards in luxury design, software craftsmanship, and curated catalog quality.
            </p>
          </div>

          <div
            className={`p-6 border shadow-xl space-y-2.5 ${
              isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
            }`}
          >
            <div className="w-9 h-9 border border-[#C9A45C]/30 bg-[#C9A45C]/10 text-[#C9A45C] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-base font-medium">Trust & Compliance</h3>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'}`}>
              Strict commitment to Indian DPDP regulations, ethical governance, and transparent career progression.
            </p>
          </div>

          <div
            className={`p-6 border shadow-xl space-y-2.5 ${
              isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
            }`}
          >
            <div className="w-9 h-9 border border-[#C9A45C]/30 bg-[#C9A45C]/10 text-[#C9A45C] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-base font-medium">Global Growth</h3>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'}`}>
              Competitive compensation, healthcare coverage, stock participation, and executive mentorship.
            </p>
          </div>
        </div>

        {/* Current Openings */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4 dark:border-white/10 border-black/10">
            <div>
              <span className="text-xs uppercase tracking-ultra text-[#C9A45C] font-semibold">
                OPPORTUNITIES
              </span>
              <h2
                className={`font-serif text-2xl sm:text-3xl font-normal ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}
              >
                Available Positions
              </h2>
            </div>
            <span className="text-xs text-[#C9A45C] font-mono font-medium">
              {OPEN_POSITIONS.length} Open Roles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OPEN_POSITIONS.map((pos) => (
              <div
                key={pos.id}
                className={`p-6 border shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 ${
                  selectedRole === pos.title
                    ? isDark
                      ? 'bg-[#1B2630] border-[#C9A45C] ring-1 ring-[#C9A45C]'
                      : 'bg-white border-[#C9A45C] ring-1 ring-[#C9A45C]'
                    : isDark
                    ? 'bg-[#1B2630] border-white/10 hover:border-white/20'
                    : 'bg-white border-black/10 hover:border-black/20'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C9A45C] bg-[#C9A45C]/10 px-2 py-0.5">
                      {pos.department}
                    </span>
                    <span className="text-[11px] font-mono text-[#717D86] dark:text-[#A9B0B5]">
                      {pos.experience}
                    </span>
                  </div>

                  <h3
                    className={`font-serif text-lg font-medium ${
                      isDark ? 'text-white' : 'text-[#101820]'
                    }`}
                  >
                    {pos.title}
                  </h3>

                  <p
                    className={`text-xs font-light leading-relaxed ${
                      isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
                    }`}
                  >
                    {pos.description}
                  </p>

                  <div
                    className={`flex items-center gap-4 text-[11px] pt-1 ${
                      isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C9A45C]" />
                      <span>{pos.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C9A45C]" />
                      <span>{pos.type}</span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectJob(pos.title)}
                  className="btn-shine w-full py-2.5 px-4 bg-[#C9A45C]/15 hover:bg-[#C9A45C] text-[#101820] dark:text-white dark:hover:text-[#101820] border border-[#C9A45C]/40 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Apply for this Role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form Section */}
        <div
          id="application-form-section"
          className={`max-w-3xl mx-auto p-8 sm:p-12 border shadow-2xl transition-colors ${
            isDark ? 'bg-[#1B2630] border-white/10' : 'bg-white border-black/10'
          }`}
        >
          <div className="mb-8 border-b pb-4 dark:border-white/10 border-black/10">
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-1 font-semibold">
              TALENT PORTAL
            </span>
            <h3
              className={`font-serif text-2xl sm:text-3xl font-normal ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}
            >
              Candidate Application Form
            </h3>
            <p
              className={`text-xs font-light mt-1 ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
              }`}
            >
              Applying for: <strong className="text-[#C9A45C]">{selectedRole}</strong>
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4
                className={`font-serif text-2xl ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}
              >
                Application Submitted Successfully
              </h4>
              <p
                className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${
                  isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
                }`}
              >
                Thank you for applying to LAX360 PVT LTD. Your credentials and resume have been securely registered with our People & Talent department. Our team will review your application and reach out within 5 business days.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="btn-shine px-7 py-3 bg-[#C9A45C] text-[#101820] text-xs uppercase tracking-wider font-semibold cursor-pointer shadow-md"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Role Selection */}
              <div className="space-y-1.5">
                <label
                  className={`block uppercase tracking-widest font-semibold text-[11px] ${
                    isDark ? 'text-white' : 'text-[#101820]'
                  }`}
                >
                  Position Applied For <span className="text-rose-400">*</span>
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className={`w-full border px-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/15 text-white'
                      : 'bg-[#F8F6F0] border-black/15 text-[#101820]'
                  }`}
                  required
                >
                  {OPEN_POSITIONS.map((pos) => (
                    <option key={pos.id} value={pos.title} className={isDark ? 'bg-[#1B2630] text-white' : 'bg-white text-[#101820]'}>
                      {pos.title} — ({pos.department})
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    className={`block uppercase tracking-widest font-semibold text-[11px] ${
                      isDark ? 'text-white' : 'text-[#101820]'
                    }`}
                  >
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikramaditya Rao"
                      className={`w-full border pl-9 pr-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                        isDark
                          ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/40'
                          : 'bg-[#F8F6F0] border-black/15 text-[#101820] placeholder:text-[#4A5560]/40'
                      }`}
                      required
                    />
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    className={`block uppercase tracking-widest font-semibold text-[11px] ${
                      isDark ? 'text-white' : 'text-[#101820]'
                    }`}
                  >
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@domain.com"
                      className={`w-full border pl-9 pr-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                        isDark
                          ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/40'
                          : 'bg-[#F8F6F0] border-black/15 text-[#101820] placeholder:text-[#4A5560]/40'
                      }`}
                      required
                    />
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                  </div>
                </div>
              </div>

              {/* Phone & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    className={`block uppercase tracking-widest font-semibold text-[11px] ${
                      isDark ? 'text-white' : 'text-[#101820]'
                    }`}
                  >
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full border pl-9 pr-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                        isDark
                          ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/40'
                          : 'bg-[#F8F6F0] border-black/15 text-[#101820] placeholder:text-[#4A5560]/40'
                      }`}
                      required
                    />
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    className={`block uppercase tracking-widest font-semibold text-[11px] ${
                      isDark ? 'text-white' : 'text-[#101820]'
                    }`}
                  >
                    Current City / Location <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Mumbai / Bengaluru"
                      className={`w-full border pl-9 pr-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                        isDark
                          ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/40'
                          : 'bg-[#F8F6F0] border-black/15 text-[#101820] placeholder:text-[#4A5560]/40'
                      }`}
                      required
                    />
                    <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                  </div>
                </div>
              </div>

              {/* Qualification & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    className={`block uppercase tracking-widest font-semibold text-[11px] ${
                      isDark ? 'text-white' : 'text-[#101820]'
                    }`}
                  >
                    Highest Qualification <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className={`w-full border pl-9 pr-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                        isDark
                          ? 'bg-white/5 border-white/15 text-white'
                          : 'bg-[#F8F6F0] border-black/15 text-[#101820]'
                      }`}
                      required
                    >
                      <option value="Bachelor's Degree">Bachelor's Degree (B.Tech / B.E / B.Des / B.A / B.Com)</option>
                      <option value="Master's Degree">Master's Degree (M.Tech / MBA / M.Des / M.S)</option>
                      <option value="NIFT / Fashion Institute">NIFT / London College of Fashion / Design Diploma</option>
                      <option value="Doctorate / PhD">Doctorate / PhD</option>
                      <option value="Other Certification">Professional Certification / Other</option>
                    </select>
                    <GraduationCap className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    className={`block uppercase tracking-widest font-semibold text-[11px] ${
                      isDark ? 'text-white' : 'text-[#101820]'
                    }`}
                  >
                    Relevant Experience <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className={`w-full border px-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/15 text-white'
                        : 'bg-[#F8F6F0] border-black/15 text-[#101820]'
                    }`}
                    required
                  >
                    <option value="0–2 Years">0–2 Years (Entry / Early Career)</option>
                    <option value="3–5 Years">3–5 Years (Mid-Level)</option>
                    <option value="6–9 Years">6–9 Years (Senior)</option>
                    <option value="10+ Years">10+ Years (Lead / Director)</option>
                  </select>
                </div>
              </div>

              {/* Resume File Upload */}
              <div className="space-y-1.5">
                <label
                  className={`block uppercase tracking-widest font-semibold text-[11px] ${
                    isDark ? 'text-white' : 'text-[#101820]'
                  }`}
                >
                  Upload Resume / CV (PDF, DOCX) <span className="text-rose-400">*</span>
                </label>
                <div
                  className={`p-4 border border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer relative ${
                    formData.resumeFileName
                      ? 'border-emerald-500/60 bg-emerald-950/10'
                      : isDark
                      ? 'border-white/20 bg-white/5 hover:border-[#C9A45C]/50'
                      : 'border-black/20 bg-[#F8F6F0] hover:border-[#C9A45C]/50'
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    required={!formData.resumeFileName}
                  />
                  <Upload
                    className={`w-6 h-6 mb-1.5 ${
                      formData.resumeFileName ? 'text-emerald-500' : 'text-[#C9A45C]'
                    }`}
                  />
                  {formData.resumeFileName ? (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{formData.resumeFileName} (Attached)</span>
                    </span>
                  ) : (
                    <>
                      <span className="text-xs font-medium">Click or drag & drop to upload your resume</span>
                      <span
                        className={`text-[10px] ${
                          isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
                        }`}
                      >
                        PDF or Word documents up to 10MB
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Portfolio / Cover Note */}
              <div className="space-y-1.5">
                <label
                  className={`block uppercase tracking-widest font-semibold text-[11px] ${
                    isDark ? 'text-white' : 'text-[#101820]'
                  }`}
                >
                  Statement of Interest / Portfolio Link
                </label>
                <textarea
                  rows={4}
                  value={formData.coverNote}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                  placeholder="Share details regarding your notable achievements, portfolio link, or why you'd like to join LAX360..."
                  className={`w-full border px-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/40'
                      : 'bg-[#F8F6F0] border-black/15 text-[#101820] placeholder:text-[#4A5560]/40'
                  }`}
                />
              </div>

              {/* DPDP Privacy Notice Acknowledgement */}
              <PrivacyConsent
                id="careers-privacy-consent"
                acknowledged={acknowledgedPrivacy}
                onChange={(checked) => {
                  setAcknowledgedPrivacy(checked);
                  if (privacyError) setPrivacyError('');
                }}
                hasRead={hasReadPrivacy}
                onReadChange={setHasReadPrivacy}
                error={privacyError}
                className="pt-3 pb-1"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !hasReadPrivacy || !acknowledgedPrivacy}
                className={`btn-shine w-full py-4 font-semibold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting || !hasReadPrivacy || !acknowledgedPrivacy
                    ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-500 cursor-not-allowed opacity-60'
                    : 'bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-16">
        <NewsletterSection />
      </div>
    </main>
  );
};
