// assets/dummyStyles.js

// assets/dummyStyles.js

export const bannerStyles = {
  // Layout and container styles
  // Layout and container styles
  container: "relative pt-20 md:pt-25 xl:pt-25 sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 bg-[#05050A] animate-gradient-bg rounded-3xl overflow-hidden border border-white/5",

  // Floating icons wrapper
  floatingIconsWrapper: "absolute inset-0 pointer-events-none overflow-visible z-0",

  // Floating icon base styles
  floatingIcon: "absolute animate-float max-w-none pb-4 md:-ml-11.5 md:mt-2 lg:-mr-12 lg:-ml-13 xl:-mr-0 xl:-ml-0 xl:mt-5 xl:w-12 xl:h-40 md:-mr-12 lg:-mr-0 xl:-mr-0 pointer-events-none drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] glow-icon transform transition-transform duration-300 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-violet-400 opacity-80",

  // Main content
  mainContent: "max-w-6xl w-full mx-auto bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 relative z-10 p-6 sm:p-8 lg:p-12 animate-fade-in ring-1 ring-white/10",

  // Grid layout
  grid: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",

  // Left content
  leftContent: "space-y-5 sm:space-y-6",

  // Badge
  badge: "inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 text-violet-300 border border-violet-500/20 rounded-full text-sm font-semibold animate-fade-in font-exo shadow-[0_0_10px_rgba(139,92,246,0.2)]",
  badgeIcon: "w-4 h-4 text-violet-400",

  // Heading
  heading: "text-3xl sm:text-4xl lg:text-5xl font-orbiter font-heading uppercase tracking-wider leading-tight text-white",
  headingSpan1: "block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 animate-text-gradient drop-shadow-sm",
  headingSpan2: "block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 animate-text-gradient animation-delay-300 drop-shadow-sm",

  videoModal: {
    overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn",
    container: "relative w-[90%] max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.3)] border border-white/20",
    iframe: "w-full h-full",
    closeButton: "absolute top-3 cursor-pointer right-3 bg-black/50 hover:bg-white/10 text-white border border-white/20 rounded-full p-2 shadow-lg transition-all duration-200 backdrop-blur-sm",
    closeIcon: "w-5 h-5"
  },

  // Description
  description: "text-lg sm:text-xl font-exo font-light text-slate-400 leading-relaxed mt-2 sm:mt-4",

  // Features
  featuresGrid: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-fade-in opacity-0 animation-delay-700",
  featureItem: "flex items-center space-x-3",
  featureIconContainer: "w-6 h-6 flex items-center justify-center shrink-0 bg-violet-500/10 rounded-full border border-violet-500/20",
  featureIcon: "text-sm text-violet-300",
  featureText: "text-slate-300 font-exo text-sm sm:text-base",

  // Buttons
  buttonsContainer: "flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 animate-fade-in opacity-0 animation-delay-900",
  buttonGetStarted: "px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300 transform font-exo text-sm sm:text-base text-center border border-white/10",
  buttonViewDemo: "px-6 py-3 sm:px-8 sm:py-3 bg-white/5 hover:bg-white/10 cursor-pointer text-white font-semibold rounded-xl border border-white/10 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform font-exo text-sm sm:text-base text-center backdrop-blur-sm",

  // Image
  imageContainer: "flex items-center justify-center relative",
  image: "w-full max-w-[220px] sm:max-w-sm md:max-w-md lg:max-w-sm h-auto rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.25)] border border-white/20 animate-float object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
};

// Animation delays
export const animationDelays = {
  delay300: "animation-delay-300",
  delay500: "animation-delay-500",
  delay700: "animation-delay-700",
  delay900: "animation-delay-900"
};

// Custom CSS styles as string (for the style jsx block)
export const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:wght@100;200;300;400;500;600;700;800;900&display=swap');

  .font-orbiter {
    font-family: "Orbitron", sans-serif;
  }
  
  .font-exo {
    font-family: "Exo 2", sans-serif;
  }

  /* Fade in */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-12px) rotate(3deg);
    }
  }

  @keyframes float-slow {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(5deg);
    }
  }

  @keyframes text-gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  .animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
  }
  .animate-fade-in {
    animation: fade-in 0.9s ease-out forwards;
  }
  .animate-text-gradient {
    background-size: 200% 200%;
    animation: text-gradient 4s ease infinite;
  }

  .glow-icon {
    filter: drop-shadow(0 0 10px rgba(100, 100, 255, 0.35));
    transition: transform 0.35s ease, filter 0.35s ease, opacity 0.35s ease;
    opacity: 0.98;
  }
  .glow-icon:hover {
    transform: scale(1.12);
    filter: drop-shadow(0 0 14px rgba(100, 100, 255, 0.65));
  }

  .animation-delay-300 {
    animation-delay: 0.3s;
  }
  .animation-delay-500 {
    animation-delay: 0.5s;
  }
  .animation-delay-700 {
    animation-delay: 0.7s;
  }
  .animation-delay-900 {
    animation-delay: 0.9s;
  }

  /* Make sure the icon images keep their intrinsic proportions and never get squashed */
  img {
    object-fit: contain;
  }

  /* Small tweak: reduce icon size on very small screens to avoid overlapping essential text */
  @media (max-width: 420px) {
    .glow-icon {
      width: 22px !important;
      height: 22px !important;


    }
  }
    

  .font-cursive {
    font-family: "Dancing Script", cursive;
  }

  /* Fade in */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-12px) rotate(3deg);
    }
  }

  @keyframes float-slow {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(5deg);
    }
  }

  @keyframes text-gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  .animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
  }
  .animate-fade-in {
    animation: fade-in 0.9s ease-out forwards;
  }
  .animate-text-gradient {
    background-size: 200% 200%;
    animation: text-gradient 4s ease infinite;
  }

  .glow-icon {
    filter: drop-shadow(0 0 10px rgba(100, 100, 255, 0.35));
    transition: transform 0.35s ease, filter 0.35s ease, opacity 0.35s ease;
    opacity: 0.98;
  }
  .glow-icon:hover {
    transform: scale(1.12);
    filter: drop-shadow(0 0 14px rgba(100, 100, 255, 0.65));
  }

  .animation-delay-300 {
    animation-delay: 0.3s;
  }
  .animation-delay-500 {
    animation-delay: 0.5s;
  }
  .animation-delay-700 {
    animation-delay: 0.7s;
  }
  .animation-delay-900 {
    animation-delay: 0.9s;
  }

  /* Make sure the icon images keep their intrinsic proportions and never get squashed */
  img {
    object-fit: contain;
  }

  /* Small tweak: reduce icon size on very small screens to avoid overlapping essential text */
  @media (max-width: 420px) {
    .glow-icon {
      width: 22px !important;
      height: 22px !important;
    }
  }

  /* Add fadeIn animation for modal */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

`;

// src/assets/dummyStyles.js
// src/assets/dummyStyles.js
export const aboutUsStyles = {
  // Layout & Container
  container: "min-h-screen bg-[#05050A] text-slate-300",

  // Hero Section
  heroSection: "relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden",
  heroBackground: "absolute inset-0 z-0",
  heroImageContainer: "absolute inset-0 bg-cover bg-center transform scale-105 opacity-40 mix-blend-overlay",
  heroVignette: "absolute inset-0 bg-gradient-to-b from-[#05050A] via-transparent to-[#05050A] pointer-events-none",
  heroTint: "absolute inset-0 bg-[#05050A]/80 mix-blend-multiply pointer-events-none",
  heroContent: "relative z-20 max-w-7xl mx-auto text-center",

  // Trust Badge
  trustBadge: "inline-flex items-center px-6 py-3 rounded-full bg-white/5 text-cyan-300 text-lg mb-8 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.2)] animate-fade-in",
  trustIcon: "w-5 h-5 mr-2 fill-current",

  // Typography
  mainHeading: "text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-orbiter tracking-tight drop-shadow-[0_0_30px_rgba(139,92,246,0.3)] bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent",
  subHeading: "text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-8 font-exo font-light",
  inlineHighlight: "inline-block ml-2 px-3 py-1 text-violet-300 bg-violet-900/30 border border-violet-500/30 rounded-full font-semibold",

  // Stats
  statsGrid: "grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12",
  statCard: "text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-violet-500/30 transition-all duration-300 hover:bg-white/10",
  statNumber: "text-3xl font-bold text-white drop-shadow-lg font-orbiter mb-1",
  statLabel: "text-cyan-400/80 text-sm font-exo uppercase tracking-wider",

  // Mission/Vision Sections
  sectionContainer: "py-20 px-4 sm:px-6 lg:px-8 relative",
  sectionGrid: "max-w-7xl mx-auto",
  sectionContentGrid: "grid lg:grid-cols-2 md:grid-cols-2 gap-16 items-center",
  sectionImageContainer: "relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-900/20",
  sectionImage: "relative group hover:scale-105 transition-transform duration-700",
  sectionContent: "space-y-6",
  sectionBadge: "inline-flex items-center px-4 py-2 rounded-full bg-violet-900/20 border border-violet-500/30 mb-6",
  sectionIcon: "w-5 h-5 mr-2 text-violet-400",
  sectionBadgeText: "font-semibold text-violet-300 text-sm uppercase tracking-widest font-orbiter",
  sectionTitle: "text-4xl sm:text-5xl font-bold text-white mb-6 font-orbiter leading-tight",
  sectionDescription: "text-xl text-slate-400 mb-8 leading-relaxed font-exo",
  featuresContainer: "space-y-4 mb-8",
  featureItem: "flex items-center gap-4 group p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5",
  featureIcon: "w-10 h-10 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform",
  featureIconSvg: "w-5 h-5 text-white",
  featureText: "text-lg text-slate-200 font-medium font-exo",

  // Values Section
  valuesSection: "py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#05050A] to-[#0a0a14] relative overflow-hidden",
  valuesHeader: "text-center mb-16",
  valuesBadge: "inline-flex items-center px-6 py-3 rounded-full bg-cyan-900/20 border border-cyan-500/30 mb-6 backdrop-blur-sm",
  valuesBadgeIcon: "w-6 h-6 text-cyan-400 mr-2",
  valuesBadgeText: "font-semibold text-cyan-300 font-orbiter tracking-wide",
  valuesTitle: "text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-orbiter",
  valuesSubtitle: "text-xl text-slate-400 max-w-2xl mx-auto font-exo",
  valuesGrid: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10",
  valueCard: "bg-white/5 p-8 rounded-3xl shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-3 group border border-white/10 relative overflow-hidden backdrop-blur-md",
  valueGradient: "absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
  valueCardTitle: "text-2xl font-bold font-orbiter text-white mb-4 relative z-10 truncate group-hover:text-cyan-300 transition-colors",
  valueCardDescription: "text-slate-400 leading-relaxed mb-6 relative z-10 group-hover:text-slate-300 transition-colors",
  valueFeatures: "space-y-3 relative z-10",
  valueFeatureItem: "flex items-center gap-3 text-slate-400 group-hover:text-slate-200 transition-colors",
  valueFeatureDot: "w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.8)]",
  valueUnderline: "absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500",

  // Team Section
  teamSection: "py-20 px-4 sm:px-6 lg:px-8 bg-[#05050A] border-t border-white/5",
  teamHeader: "text-center mb-16",
  teamTitle: "text-4xl sm:text-5xl font-bold text-white mb-4 font-orbiter",
  teamSubtitle: "text-xl text-slate-400 max-w-2xl mx-auto font-exo",
  teamGrid: "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
  teamMember: "text-center font-exo group cursor-pointer bg-white/5 rounded-3xl p-6 border border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:bg-white/10",
  teamImageContainer: "relative mb-6 inline-block rounded-full p-1 bg-gradient-to-br from-violet-500 to-cyan-500",
  teamImage: "w-40 h-40 mx-auto rounded-full transform transition-all duration-500 group-hover:scale-105 object-cover grayscale group-hover:grayscale-0",
  teamName: "text-2xl font-bold text-white mb-2 transition-colors font-orbiter",
  teamRole: "text-cyan-400 italic font-semibold mb-3 tracking-wide text-sm",
  teamBio: "text-slate-500 mb-4 group-hover:text-slate-400 transition-colors text-sm",

  // Testimonials Section
  testimonialsSection: "py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a14] to-[#05050A] relative",
  testimonialsHeader: "text-center mb-16 relative z-10",
  testimonialsTitle: "text-4xl sm:text-5xl font-bold text-white mb-4 font-orbiter",
  testimonialsSubtitle: "text-xl text-slate-400 max-w-2xl mx-auto font-exo",
  testimonialsGrid: "grid md:grid-cols-3 gap-8 relative z-10",
  testimonialCard: "bg-white/5 p-8 rounded-3xl hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 group border border-white/10 backdrop-blur-md relative",
  testimonialStars: "flex items-center gap-1 mb-6",
  testimonialStar: "w-5 h-5 text-yellow-400 fill-current drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]",
  testimonialText: "text-slate-300 mb-8 leading-relaxed italic font-light font-exo text-lg",
  testimonialAuthor: "flex items-center gap-4 border-t border-white/10 pt-6",
  testimonialAvatar: "w-12 h-12 rounded-full object-cover ring-2 ring-violet-500/50",
  testimonialAuthorName: "font-semibold text-white font-orbiter tracking-wide",
  testimonialAuthorRole: "text-cyan-400/80 text-sm font-exo uppercase",

  // CTA Section
  ctaSection: "py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-12",
  ctaOrb1: "absolute top-1/2 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px] animate-pulse pointer-events-none",
  ctaOrb2: "absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-cyan-600/10 rounded-full translate-x-1/2 translate-y-1/2 blur-[120px] animate-pulse animation-delay-2000 pointer-events-none",
  ctaContent: "relative max-w-5xl mx-auto text-center z-10 bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 border border-white/10 shadow-2xl",
  ctaTitle: "text-5xl md:text-7xl font-bold text-white mb-8 font-orbiter bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent",
  ctaDescription: "text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-exo font-light",
  ctaButtons: "flex flex-col sm:flex-row gap-6 justify-center items-center",
  ctaButton: "group bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 cursor-pointer text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] font-orbiter tracking-wider",
  ctaButtonIcon: "w-6 h-6 group-hover:translate-x-1 transition-transform"
};

// CSS animations (for style jsx)
export const aboutUsAnimations = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-3000 {
    animation-delay: 3s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  .text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// Add these to the existing dummyStyles.js file
// assets/dummyStyles.js
export const contactStyles = {
  // Layout & Container
  container: "min-h-screen bg-[#05050A] py-10 px-4 sm:px-6 md:px-10 lg:px-12 overflow-x-hidden",
  mainContainer: "max-w-7xl mx-auto",

  // Header
  header: "text-center mb-12 sm:mb-16",
  title: "text-3xl sm:text-4xl md:text-5xl inline-flex items-center space-x-2 mt-15 rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-violet-500/30 font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-orbiter shadow-[0_0_15px_rgba(139,92,246,0.3)] bg-white/5 backdrop-blur-sm",

  // Main Section
  mainSection: "grid grid-cols-1 font-exo lg:grid-cols-2 md:grid-cols-2 md:gap-2 gap-10 lg:gap-12 items-center",

  // Contact Form
  formContainer: "relative order-2 lg:order-1",
  formGlow1: "absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl opacity-40 blur-xl animate-pulse",
  formGlow2: "absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl opacity-20 animate-pulse delay-75",
  formGlow3: "absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl opacity-10 animate-pulse delay-150",
  form: "relative bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/10",
  formElements: "space-y-6",

  // Form Grid
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",

  // Form Groups
  formGroup: "group",
  label: "block text-sm font-medium text-slate-300 mb-2 flex items-center",
  labelIcon: "w-4 h-4 mr-2 text-violet-400",
  input: "w-full px-4 py-3 rounded-lg border border-white/10 focus:ring-2 focus:border-transparent transition-all duration-300 bg-white/5 text-white placeholder-slate-500 focus:bg-white/10",
  inputError: "border-red-500/50 focus:ring-red-500/50",
  errorText: "mt-2 text-sm text-red-400 font-light",
  textarea: "w-full px-4 py-3 rounded-lg border border-white/10 focus:ring-2 focus:border-transparent transition-all duration-300 bg-white/5 text-white placeholder-slate-500 focus:bg-white/10 group-hover:border-violet-500/50 resize-none",
  select: "w-full px-4 py-3 rounded-lg border border-white/10 focus:ring-2 focus:border-transparent transition-all duration-300 bg-white/5 text-white group-hover:border-cyan-500/50",

  // Colors for different form fields
  colors: {
    purple: {
      icon: "text-violet-400",
      focus: "focus:ring-violet-500",
      hover: "group-hover:border-violet-400"
    },
    blue: {
      icon: "text-cyan-400",
      focus: "focus:ring-cyan-500",
      hover: "group-hover:border-cyan-400"
    },
    green: {
      icon: "text-emerald-400",
      focus: "focus:ring-emerald-500",
      hover: "group-hover:border-emerald-400"
    }
  },

  // Submit Button
  submitButton: "w-full py-4 px-6 rounded-full font-bold text-white transition-all duration-300 flex items-center justify-center font-orbiter tracking-wide",
  submitButtonEnabled: "bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] border border-white/10",
  submitButtonDisabled: "bg-white/10 text-slate-500 cursor-not-allowed border border-white/5",
  spinner: "w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2",
  submitIcon: "w-5 h-5 mr-2",

  // Animation Section
  animationContainer: "relative order-1 xl:order-2 lg:order-2 w-full flex justify-center items-center",
  animationWrapper: "relative max-w-md sm:max-w-lg md:max-w-xl lg:max-w-full xl:max-w-full rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.2)] border border-white/10",

  // Footer Info
  footer: "mt-12 sm:mt-16 text-center",
  footerBadge: "inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/10 backdrop-blur-sm",
  footerIcon: "w-5 h-5 text-violet-400",
  footerText: "text-slate-400 text-sm sm:text-base"
};

// Add these to your existing assets/dummyStyles.js

// assets/dummyStyles.js
export const coursePageStyles = {
  // Layout and container styles
  pageContainer: "min-h-screen pt-20 md:pt-28 bg-[#05050A] py-8 px-4 relative overflow-hidden",
  headerContainer: "text-center mb-12 md:mb-16 relative z-10",
  headerTransform: "transform perspective-1000 mb-6",
  headerTitle: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 tracking-tight font-orbiter drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]",
  headerSubtitle: "text-base sm:text-lg md:text-2xl text-slate-400 font-light mb-6 md:mb-8 tracking-wide font-exo",

  // Search bar
  searchContainer: "max-w-2xl mx-auto mb-8 md:mb-12 relative group px-2 sm:px-0",
  searchGradient: "absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 rounded-3xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-700 animate-gradient-x",
  searchInputContainer: "relative bg-[#0a0a14] border border-white/10 group-hover:border-violet-400/50 rounded-3xl shadow-2xl transition-all duration-500",
  searchIconContainer: "absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none",
  searchIcon: "w-5 h-5 text-violet-400 group-hover:text-cyan-400 transition-colors duration-500",
  searchInput: "w-full pl-12 pr-10 py-3 rounded-3xl bg-transparent text-white placeholder-slate-500 focus:outline-none focus:ring-0 font-medium text-sm sm:text-base font-exo",
  clearButton: "absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-slate-500 hover:text-red-400 transition-colors duration-300",

  // Results count
  resultsCount: "text-slate-500 text-sm sm:text-base font-exo",

  // No courses found
  noCoursesContainer: "text-center py-12",
  noCoursesIcon: "w-16 h-16 mx-auto text-slate-600",
  noCoursesTitle: "text-xl font-semibold text-slate-400 mb-2 font-orbiter",
  noCoursesButton: "mt-4 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors w-full sm:w-auto shadow-lg shadow-violet-900/40",

  // Courses grid
  coursesGrid: "max-w-7xl font-exo mx-auto relative z-10",
  coursesGridContainer: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10",

  // Course card
  courseCard: "group perspective-1000 transform-style-3d transition-all duration-500 ease-out cursor-pointer",
  courseCardInner: "relative transform-style-3d group-hover:rotate-y-2 group-hover:rotate-x-2 transition-transform duration-500 ease-out h-full",
  courseCardContent: "backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 transform translate-z-0 h-full flex flex-col bg-white/5 overflow-hidden hover:border-violet-500/40 transition-colors",

  // Course image
  courseImageContainer: "relative overflow-hidden rounded-t-3xl h-48 w-full bg-[#0a0a14]",
  courseImage: "w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100",

  // Course info
  courseInfo: "p-4 sm:p-6 flex-1 flex flex-col",
  courseName: "text-base sm:text-lg font-bold text-white leading-tight line-clamp-2 mb-2 font-orbiter group-hover:text-cyan-300 transition-colors",
  teacherContainer: "flex items-center space-x-2 mb-3 text-sm sm:text-sm",
  teacherIcon: "w-4 h-4 text-violet-400",
  teacherName: "text-slate-400 font-medium truncate",

  // Rating
  ratingContainer: "mb-3",
  ratingStars: "flex items-center space-x-2 mb-2",
  ratingStarsInner: "flex space-x-1",
  ratingStarButton: "p-2 sm:p-0.5 rounded-full focus:outline-none",

  // Price
  priceContainer: "mt-auto flex items-center justify-between pt-3 border-t border-white/5",
  priceFree: "text-2xl font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)] font-orbiter",
  priceCurrent: "text-2xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] font-orbiter",
  priceOriginal: "text-lg text-slate-400 line-through font-exo",

  // Show more button
  showMoreContainer: "mt-12 flex justify-center px-2 sm:px-0",
  showMoreButton: "px-8 py-3 rounded-full cursor-pointer bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-violet-500/50 shadow-lg hover:shadow-violet-900/30 transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center",
  showMoreText: "text-sm font-medium text-white font-orbiter tracking-wide"
};

// Add these to your existing assets/dummyStyles.js

// assets/dummyStyles.js
export const myCoursesStyles = {
  // Layout and container styles
  pageContainer: "min-h-screen pt-20 md:pt-25 bg-[#05050A] py-8 font-exo",
  mainContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",

  // Header
  header: "text-4xl font-bold text-white mb-12 text-center font-orbiter drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]",
  emptyHeader: "text-4xl font-bold text-slate-300 mb-6 font-orbiter",
  emptyText: "text-slate-500 text-lg font-exo",

  // Grid layout
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-8",

  // Course card
  courseCard: "group bg-[#0a0a14]/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-500 transform hover:-translate-y-2 border border-white/10 hover:border-violet-500/50 cursor-pointer relative",
  imageContainer: "relative overflow-hidden h-48 w-full bg-[#0a0a14]",
  courseImage: "w-full h-full object-cover object-center pb-0 transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100",
  courseContent: "p-5 relative z-10",

  // Course info
  courseName: "text-lg font-bold text-white mb-3 line-clamp-2 transition-colors duration-300 font-orbiter group-hover:text-cyan-400",
  infoContainer: "flex flex flex-col gap-2 justify-between mb-4 border-t border-white/5 pt-3",

  // Rating
  ratingContainer: "flex items-center space-x-1 bg-white/5 rounded-full px-3 py-1 border border-white/10 w-fit",
  ratingIcon: "w-4 h-4 text-yellow-400 fill-current drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]",
  ratingText: "text-sm font-semibold text-slate-300",

  // Teacher
  teacherContainer: "flex items-center space-x-1 px-3 py-1 bg-violet-900/10 rounded-full border border-violet-500/20 w-fit",
  teacherIcon: "w-4 h-4 text-violet-400",
  teacherText: "text-sm font-medium text-violet-300 truncate max-w-[80px]",

  // Button
  viewButton: "w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 transform shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center space-x-2 cursor-pointer group/btn border border-white/10 font-exo",
  buttonIcon: "w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110",
  buttonText: ""
};

// Custom styles for MyCourses
export const myCoursesCustomStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Custom styles for CoursePage
export const coursePageCustomStyles = `
  .perspective-1000 { perspective: 1000px; }
  .transform-style-3d { transform-style: preserve-3d; }
  .translate-z-0 { transform: translateZ(0px); }
  .translate-z-5 { transform: translateZ(5px); }
  .translate-z-10 { transform: translateZ(10px); }
  .translate-z-[-20px] { transform: translateZ(-20px); }
  .translate-z-[-30px] { transform: translateZ(-30px); }
  .rotate-x-12 { transform: rotateX(12deg); }
  .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .group:hover .group-hover\\:rotate-y-5 { transform: rotateY(5deg); }
  .group:hover .group-hover\\:rotate-x-2 { transform: rotateX(2deg); }

  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 6s ease infinite;
  }

  /* reduce heavy transforms on small screens for performance */
  @media (max-width: 640px) {
    .group:hover .group-hover\\:rotate-y-5,
    .group:hover .group-hover\\:rotate-x-5 {
      transform: none !important;
    }
  }
`;

// Add these to the existing dummyStyles.js file
// assets/dummyStyles.js
export const facultyStyles = {
  // Layout & Container
  container: "min-h-screen pt-12 sm:pt-16 bg-[#05050A]",

  // Header Section
  header: "relative py-12 sm:py-16 px-4 text-center bg-[#05050A]",
  headerContent: "relative z-10 max-w-4xl mx-auto",
  title: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4 font-orbiter tracking-wide drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]",
  titleDivider: "w-20 sm:w-28 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto mb-4 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]",
  subtitle: "text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-exo",

  // Faculty Grid
  facultySection: "py-8 px-4 sm:px-6 lg:px-8",
  facultyContainer: "max-w-7xl mx-auto",
  facultyGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10",

  // Teacher Card
  card: "group",
  teacherCard: "bg-white/5 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-500 p-4 sm:p-6 border border-white/10 hover:border-violet-500/40 relative overflow-hidden",

  // Image Section
  imageContainer: "relative mb-4 sm:mb-6",
  imageWrapper: "w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden ring-4 ring-white/5 shadow-2xl group-hover:ring-violet-500/30 transition-all duration-500",
  image: "w-full h-full rounded-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500",

  // Experience Badge
  experienceBadge: "absolute -bottom-3 left-1/2 transform -translate-x-1/2",
  experienceBadgeContent: "bg-gradient-to-r from-violet-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg border border-white/20 font-exo",

  // Teacher Info
  teacherInfo: "text-center mb-3 sm:mb-4 px-1",
  teacherName: "text-lg sm:text-xl font-bold text-white mb-1 font-orbiter truncate group-hover:text-cyan-300 transition-colors",
  teacherQualification: "text-sm sm:text-sm text-violet-400 font-semibold mb-2 truncate font-exo",
  teacherBio: "text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 font-exo",

  // Rating Section
  ratingContainer: "mb-4 flex justify-center",
  starRating: "flex flex-row items-center space-x-2",
  starsContainer: "flex flex-row items-center space-x-1",
  starButton: "transition-all duration-200 transform hover:scale-125 p-1 rounded-full focus:outline-none",
  starButtonActive: "text-yellow-400 fill-current drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]",
  starButtonInactive: "text-slate-700",
  starIcon: "w-4 h-4",

  // Social Icons
  socialContainer: "flex justify-center gap-3 sm:gap-4 mt-2 pt-4 border-t border-white/5",
  socialIcon: "transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-2.5 rounded-xl shadow-lg border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10",
  socialIconEmail: "text-emerald-400 hover:text-emerald-300",
  socialIconLinkedin: "text-cyan-400 hover:text-cyan-300",
  socialIconInstagram: "text-fuchsia-400 hover:text-fuchsia-300",
  socialIconSvg: "w-4 h-4 sm:w-5 sm:h-5",

  // CSS Animations and Utilities
  animations: `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:wght@100;200;300;400;500;600;700;800;900&display=swap');
    
    .font-orbiter {
      font-family: 'Orbitron', sans-serif;
    }
    .font-exo {
      font-family: 'Exo 2', sans-serif;
    }
    .line-clamp-3 { 
      display: -webkit-box; 
      -webkit-line-clamp: 3; 
      -webkit-box-orient: vertical; 
      overflow: hidden; 
    }
    .truncate { 
      overflow: hidden; 
      text-overflow: ellipsis; 
      white-space: nowrap; 
    }
    @media (max-width: 640px) {
      .group:hover { transform: none; }
    }
  `
};

// Add these to your existing assets/dummyStyles.js

// assets/dummyStyles.js
export const footerStyles = {
  // Layout and container styles
  footer: "relative bg-[#05050A] text-slate-300 overflow-hidden border-t border-white/5",
  container: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16",

  // Grid layout
  grid: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16",
  brandSection: "lg:col-span-1",
  brandTransform: "transform transition-transform duration-500",
  brandContainer: "relative mb-4 sm:mb-6 group",
  brandGradient: "absolute -inset-3 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl blur-lg opacity-10 sm:opacity-20 transition-all duration-500 pointer-events-none",
  brandTitle: "text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 py-1 font-orbiter",
  brandDescription: "text-slate-500 leading-relaxed mb-4 text-sm sm:text-sm font-exo",

  // Section headers
  sectionHeader: "text-lg font-bold mb-4 text-white flex items-center gap-2 font-orbiter tracking-wide",
  sectionIcon: "w-5 h-5 text-violet-400",

  // Links
  linksList: "space-y-2",
  linkItem: "text-slate-400 transition-all duration-300 transform hover:translate-x-2 flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 hover:text-cyan-300 min-w-0 font-exo font-light",
  linkIcon: "w-4 h-4 flex-shrink-0 text-violet-500/70",

  // Contact info
  contactSpace: "space-y-3 text-slate-400",
  contactItem: "flex items-center group transform transition-all duration-300 p-3 rounded-xl hover:bg-white/5",
  contactIconContainer: "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 transform transition-transform duration-300 shadow-lg border border-white/10 overflow-hidden bg-white/5 group-hover:border-violet-500/50",
  contactIcon: "w-4 h-4 text-cyan-400",
  contactTextContainer: "min-w-0",
  contactTextPrimary: "font-medium text-sm break-words xl:text-xs text-white group-hover:text-violet-300 transition-colors",
  contactTextSecondary: "text-xs text-slate-500",

  // Social section
  socialSection: "border-t border-white/10 pt-8",
  socialContainer: "flex flex-col lg:flex-row items-center justify-between gap-6",
  socialIconsContainer: "flex flex-wrap items-center gap-3 sm:gap-4 justify-center lg:justify-start",
  socialIconLink: "relative group transform transition-all duration-300 hover:scale-105",
  socialIconContainer: "relative w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border border-white/10 shadow-md backdrop-blur-sm overflow-hidden bg-white/5 hover:bg-white/10 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]",
  socialIconInner: "absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
  socialIcon: "w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-white transition-colors",
  socialTooltip: "absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-violet-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden md:block border border-white/10 shadow-xl backdrop-blur-md",
  socialTooltipArrow: "absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-violet-900/90 rotate-45 border-l border-t border-white/10",

  // Design credit
  designCredit: "text-center lg:text-right",
  designCreditContainer: "relative inline-block group",
  designCreditGradient: "absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl blur-lg opacity-10 group-hover:opacity-30 transition-all duration-500 pointer-events-none",
  designCreditText: "relative font-orbiter text-slate-500 text-sm bg-[#0a0a14] backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 border border-white/10 shadow-sm inline-flex items-center gap-2",
  designCreditLink: "ml-1 font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-300"
};

// Background elements styles
export const footerBackgroundStyles = {
  backgroundContainer: "absolute inset-0 pointer-events-none",
  floatingOrb1: "hidden sm:block absolute top-10 left-10 w-24 h-24 bg-violet-600/10 rounded-full blur-3xl animate-float-1",
  floatingOrb2: "hidden sm:block absolute top-32 right-20 w-32 h-32 bg-cyan-600/10 rounded-full blur-3xl animate-float-2",
  floatingOrb3: "hidden sm:block absolute bottom-20 left-1/4 w-28 h-28 bg-fuchsia-600/10 rounded-full blur-3xl animate-float-3",
  floatingOrb4: "hidden sm:block absolute bottom-32 right-32 w-20 h-20 bg-indigo-600/10 rounded-full blur-3xl animate-float-4",
  gridOverlay: "absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
};

// Contact icon background gradients
export const contactIconGradients = {
  address: "bg-transparent",
  phone: "bg-transparent",
  email: "bg-transparent"
};

// Icon colors
export const iconColors = {
  cyan: "text-cyan-400",
  purple: "text-violet-400",
  emerald: "text-emerald-400",
  cyan600: "text-cyan-500",
  purple600: "text-violet-500",
  emerald600: "text-emerald-500"
};

// Custom styles for Footer
export const footerCustomStyles = `
  @keyframes float-1 {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    33% { transform: translateY(-12px) rotate(3deg) scale(1.03); }
    66% { transform: translateY(-6px) rotate(-2deg) scale(0.98); }
  }
  @keyframes float-2 {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    25% { transform: translateY(-18px) rotate(-4deg) scale(1.06); }
    75% { transform: translateY(-4px) rotate(2deg) scale(0.96); }
  }
  @keyframes float-3 {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    50% { transform: translateY(-10px) rotate(5deg) scale(1.02); }
  }
  @keyframes float-4 {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    40% { transform: translateY(-14px) rotate(-3deg) scale(1.05); }
    80% { transform: translateY(-5px) rotate(4deg) scale(0.98); }
  }
  .animate-float-1 { animation: float-1 9s ease-in-out infinite; }
  .animate-float-2 { animation: float-2 11s ease-in-out infinite; }
  .animate-float-3 { animation: float-3 13s ease-in-out infinite; }
  .animate-float-4 { animation: float-4 10s ease-in-out infinite; }

  /* Keep transitions snappy but avoid heavy layout work on small screens */
  @media (max-width: 640px) {
    * { transition-duration: 180ms !important; }
  }

  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    .animate-float-1, .animate-float-2, .animate-float-3, .animate-float-4 { animation: none !important; }
    * { transition: none !important; }
  }
`;

// Add these to the existing dummyStyles.js file
// assets/dummyStyles.js
export const homeCoursesStyles = {
  // Layout & Container
  container: "bg-[#05050A] min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-12 relative overflow-hidden",
  mainContainer: "max-w-7xl mx-auto relative z-10",

  // Header Section
  header: "flex flex-col items-center gap-6 mb-12",
  title: "text-3xl sm:text-4xl md:text-5xl mb-0 text-center bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center justify-center gap-3 font-orbiter font-bold tracking-wide",
  titleIcon: "w-8 h-8 md:w-10 md:h-10 animate-spin-slow text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",

  // Courses Grid
  coursesGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4",

  // Course Card
  courseCard: "cursor-pointer group relative bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-500 hover:-translate-y-2",
  imageContainer: "relative overflow-hidden rounded-t-3xl h-48 w-full bg-[#0a0a14]",
  courseImage: "w-full h-full !object-cover !w-full !h-full object-center block transform transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100",

  // Course Info
  courseInfo: "p-5 bg-gradient-to-b from-transparent to-black/20",
  courseName: "text-base sm:text-lg text-white font-orbiter font-bold mb-2 line-clamp-2 min-h-[3.5rem] leading-tight group-hover:text-cyan-400 transition-colors duration-300",
  teacherInfo: "flex items-center text-slate-400 text-sm mb-3",
  teacherIcon: "mr-2 w-4 h-4 text-violet-400",
  teacherName: "font-exo text-slate-300 truncate",

  // Rating Section
  ratingContainer: "flex items-center justify-between mb-3",
  starsContainer: "flex items-center gap-1",
  interactiveStars: "flex",
  starButton: "p-0.5 focus:outline-none transform transition-transform active:scale-95",
  starButtonActive: "text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]",
  starButtonInactive: "text-slate-700",
  starIcon: "size-3.5",

  // Pricing Section
  pricingContainer: "flex items-center justify-between mt-2 pt-3 border-t border-white/10",
  freePrice: "text-lg font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)] font-orbiter",
  salePrice: "text-lg font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] font-orbiter",
  originalPrice: "line-through text-slate-400 text-sm font-medium font-exo ml-2",

  // CTA Button
  ctaContainer: "flex justify-center mt-16",
  ctaWrapper: "relative inline-block group",
  ctaGlow: "absolute -inset-1 rounded-full border-0 pointer-events-none bg-gradient-to-r from-violet-600 via-cyan-500 to-fuchsia-600 blur opacity-40 group-hover:opacity-100 transition duration-500",
  ctaButton: "relative z-10 inline-flex items-center gap-4 px-12 py-4 text-xl font-bold rounded-3xl bg-[#05050A] text-white border border-white/10 transition duration-300 cursor-pointer active:scale-95 focus:outline-none group-hover:bg-[#0a0a14]",
  ctaButtonContent: "relative flex items-center gap-3",
  ctaText: "relative z-10 font-orbiter tracking-wider bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-violet-200 group-hover:to-cyan-200",
  ctaIcon: "w-5 h-5 z-10 text-cyan-400 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-violet-400",

  // Font Classes
  fonts: {
    title: "font-orbiter",
    course: "font-exo",
    detail: "font-exo"
  },

  // Animations
  animations: `
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow { 
      animation: spin-slow 6s linear infinite; 
    }
  `
};

// Add these to the existing dummyStyles.js file
export const navbarStyles = {
  // Main Navbar
  navbar: "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
  navbarVisible: "translate-y-0 opacity-100",
  navbarHidden: "-translate-y-full opacity-0",
  navbarScrolled: "bg-[#05050A]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2 border-b border-white/5",
  navbarDefault: "bg-transparent py-3 border-b border-transparent",

  // Container
  container: "max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8",
  innerContainer: "flex items-center justify-between h-14",

  // Logo
  logo: "flex items-center space-x-3 group cursor-pointer flex-shrink-0 relative z-50",
  logoIconContainer: "relative",
  logoIcon: "w-9 h-9 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-xl flex items-center justify-center transform transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]",
  logoIconGlow: "absolute -inset-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300",
  logoText: "font-bold text-xl bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent font-orbiter tracking-wider",

  // Desktop Navigation
  desktopNav: "hidden lg:flex items-center justify-center flex-1 absolute inset-0 pointer-events-none",
  desktopNavContainer: "pointer-events-auto flex items-center space-x-1 bg-white/5 backdrop-blur-md rounded-2xl p-1.5 shadow-lg border border-white/10 ring-1 ring-white/5",
  desktopNavItem: "group relative px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center space-x-2 overflow-hidden",
  desktopNavItemActive: "bg-white/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]",
  desktopNavIcon: "text-slate-400 transition-colors duration-300 group-hover:text-cyan-400",
  desktopNavText: "text-sm font-medium text-slate-300 group-hover:text-white font-exo tracking-wide transition-colors",

  // Auth Buttons
  authContainer: "flex items-center space-x-4 flex-shrink-0",
  loginButton: "hidden lg:flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold shadow-lg border border-white/10 hover:border-violet-500/50 transition-all duration-300 group backdrop-blur-sm font-exo",
  createAccountButton: "hidden lg:flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transform transition-all duration-300 hover:-translate-y-0.5 font-orbiter tracking-wide border border-white/10",

  // Mobile Menu Button
  mobileMenuButton: "lg:hidden p-2.5 rounded-xl bg-white/5 shadow-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:shadow-cyan-500/20 transition-all duration-300",

  // Mobile Menu
  mobileMenu: "lg:hidden fixed inset-x-0 top-[72px] z-40 transition-all duration-500 overflow-hidden px-4",
  mobileMenuOpen: "max-h-[600px] opacity-100 translate-y-0",
  mobileMenuClosed: "max-h-0 opacity-0 -translate-y-4",
  mobileMenuContainer: "bg-[#0a0a14]/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/10 ring-1 ring-white/5",
  mobileMenuItems: "space-y-2",
  mobileMenuItem: "flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 border border-transparent",
  mobileMenuItemActive: "bg-violet-600/20 border-violet-500/30 text-cyan-400",
  mobileMenuItemHover: "hover:bg-white/5 hover:border-white/10 hover:text-white",
  mobileMenuIconContainer: "p-2.5 rounded-xl bg-white/5 transition-colors duration-300 group-hover:bg-cyan-500/10",
  mobileMenuIcon: "text-slate-400 group-hover:text-cyan-400",
  mobileMenuText: "font-medium text-lg text-slate-300 font-exo",

  // Mobile Auth Buttons
  mobileLoginButton: "w-full flex items-center justify-center space-x-2 p-4 rounded-2xl bg-white/5 text-white font-semibold shadow-lg border border-white/10 hover:bg-white/10 transition-all duration-300 mt-4 font-exo",
  mobileCreateAccountButton: "w-full flex items-center justify-center space-x-2 p-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-white/10 hover:shadow-cyan-500/30 transition-all duration-300 mt-3 font-orbiter tracking-wide",

  // Background Pattern
  backgroundPattern: "absolute inset-0 -z-10 opacity-30 pointer-events-none",
  pattern: "hidden"
};


// Add these to your existing assets/dummyStyles.js

export const signUpPageStyles = {
  // Layout and container styles
  pageContainer: "min-h-screen flex items-center justify-center bg-[#05050A] p-4 relative overflow-hidden",

  // Back button
  backButton: "absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white z-10 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 transition-all hover:bg-white/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:border-violet-500/30 group",
  backButtonIcon: "w-5 h-5",

  // Main layout
  mainLayout: "w-full pt-20 max-w-6xl flex flex-col md:flex-row lg:flex-row items-center justify-center gap-12",

  // Animation section
  animationContainer: "flex items-center justify-center w-full order-1 md:order-none lg:order-none",
  animationWrapper: "w-full flex justify-center",

  // Form section
  formContainer: "flex items-center justify-center w-full",
  formWrapper: "relative w-full max-w-md",
  formCard: "relative bg-[#0a0a14]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl transition-all duration-500 hover:border-violet-500/30",

  // Header
  header: "text-center mb-8 font-orbiter",
  title: "text-2xl font-bold text-white mb-2 tracking-wide",
  subtitle: "text-slate-400 text-sm font-exo font-light",

  // Form
  form: "space-y-4",
  submitButton: "w-full mt-6 py-4 px-6 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300 transform active:scale-95 disabled:opacity-50 relative overflow-hidden font-orbiter tracking-wider border border-white/10",
  buttonContent: "relative flex items-center justify-center gap-2",
  buttonIcon: "w-5 h-5",

  // Sign in link
  signinContainer: "mt-6 text-center",
  signinText: "text-slate-500 text-sm font-exo",
  signinLink: "text-cyan-400 font-semibold hover:text-cyan-300 transition-colors ml-1"
};

// Floating Input styles
export const floatingInputStyles = {
  container: "relative mb-6 group",
  inputWrapper: "relative",
  input: "w-full bg-[#05050A]/50 backdrop-blur-sm border border-white/10 rounded-xl pt-6 pb-2 px-4 text-white placeholder-transparent focus:outline-none focus:ring-1 focus:border-violet-500/50 transition-all duration-300 shadow-inner group-hover:border-white/20 font-exo",
  inputError: "focus:ring-red-500/50 border-red-500/50",
  inputNormal: "focus:ring-violet-500/30",
  label: "absolute left-4 transition-all duration-300 cursor-text",
  labelFocused: "top-2 text-xs text-cyan-400 font-bold tracking-wide",
  labelNormal: "top-4 text-sm text-slate-500 font-light",
  labelError: "text-red-400",
  iconsContainer: "absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2",
  emailIcon: "w-5 h-5 text-violet-400",
  passwordToggle: "focus:outline-none cursor-pointer hover:scale-110 transition-transform",
  passwordToggleIcon: "w-5 h-5 text-violet-400 hover:text-cyan-400 transition-colors",
  dotsContainer: "absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1",
  dot: "w-1 h-1 bg-cyan-400 rounded-full animate-bounce",
  errorContainer: "flex items-center mt-2 text-red-400 text-xs ml-1 font-exo",
  errorIcon: "w-3 h-3 mr-1 text-red-400"
};

// Custom styles for SignUpPage
export const signUpPageCustomStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  .animate-float { animation: float 6s ease-in-out infinite; }
`;

// Add these to the existing dummyStyles.js file
// assets/dummyStyles.js
export const testimonialStyles = {
  // Main Section
  section: "py-12 sm:py-16 px-4 sm:px-6 bg-[#05050A] border-t border-white/5",
  container: "max-w-6xl mx-auto text-center mb-12 sm:mb-16 relative z-10",

  // Header
  badge: "inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-violet-500/30 mb-4 sm:mb-6 shadow-[0_0_15px_rgba(139,92,246,0.2)]",
  badgeDot: "w-2 h-2 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full animate-pulse",
  badgeText: "text-sm font-medium text-violet-300 font-exo",
  title: "text-3xl sm:text-4xl md:text-5xl font-bold font-orbiter mb-3 sm:mb-6 text-white",
  titleGradient: "bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]",
  subtitle: "text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-exo font-light",

  // Testimonials Grid
  grid: "max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-2 sm:px-0 relative z-10",

  // Testimonial Card
  cardWrapper: "relative group",
  glowBorder: "absolute -inset-2 rounded-3xl bg-gradient-to-r from-violet-600/20 via-cyan-600/20 to-fuchsia-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none",
  backgroundPattern: "absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 pointer-events-none",

  // Floating Elements
  floatingElement1: "absolute -left-4 -top-4 w-16 h-16 rounded-full bg-violet-600/10 blur-xl animate-float-slow pointer-events-none hidden sm:block",
  floatingElement2: "absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-cyan-600/10 blur-xl animate-float pointer-events-none hidden sm:block",

  // Main Card
  card: "relative z-10 bg-[#0a0a14]/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 transform transition-all duration-300 card-init hover:shadow-2xl will-change-transform border border-white/10 group-hover:border-violet-500/30 overflow-hidden",
  cardShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",

  // Course Badge
  courseBadge: "course-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-6",
  courseBadgeDot: "w-2 h-2 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.5)]",
  courseBadgeText: "text-sm font-medium text-slate-300 truncate font-exo",

  // Quote Icon
  quoteIcon: "quote-icon absolute top-4 right-4 text-white/5 transform transition-transform duration-500 hidden sm:block group-hover:text-violet-500/20",
  quoteIconSvg: "w-10 h-10 sm:w-12 sm:h-12",

  // Content Layout
  content: "flex items-start gap-4 mb-4 sm:mb-6",
  avatarContainer: "avatar-container relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 transform transition-transform duration-500",
  avatarWrapper: "relative w-full h-full rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-violet-500/50 transition-all",
  avatarImage: "avatar-img w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500",
  avatarGlow: "absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/20 to-cyan-600/20 blur-md -z-10 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity",

  // User Info
  userInfo: "flex-1 min-w-0",
  userHeader: "flex flex-col md:flex-row items-start md:items-center justify-between mb-2 gap-2",
  userName: "font-orbiter font-bold text-white text-base sm:text-lg md:text-lg leading-tight truncate group-hover:text-cyan-400 transition-colors",
  userRole: "text-sm sm:text-sm text-violet-400 font-medium truncate font-exo",
  ratingContainer: "flex flex-col items-start md:items-end gap-1 mt-2 md:mt-0",
  starsContainer: "flex items-center gap-1 whitespace-nowrap",
  star: "w-4 h-4",
  starActive: "text-yellow-400 fill-current drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]",
  starInactive: "text-slate-700",

  // Message
  message: "text-slate-300 leading-relaxed mb-4 sm:mb-6 relative z-10 text-sm sm:text-base font-light font-exo italic",
  quoteMark: "text-violet-500 font-serif text-xl leading-none",

  // Footer
  footer: "flex items-center justify-between pt-3 sm:pt-4 border-t border-white/5 text-xs sm:text-sm",
  verified: "flex items-center gap-2 text-sm text-slate-500",
  verifiedIcon: "w-4 h-4 text-emerald-400",
  date: "flex items-center gap-2 text-sm text-slate-500",
  dateIcon: "w-4 h-4 text-violet-400",

  // Animations
  animations: `
    @keyframes rotateGlow {
      0% { transform: rotate(0deg) scale(1); opacity: 0.6; }
      50% { transform: rotate(180deg) scale(1.05); opacity: 0.8; }
      100% { transform: rotate(360deg) scale(1); opacity: 0.6; }
    }
    @keyframes float { 
      0%,100%{ transform: translateY(0) rotate(0deg);} 
      50%{ transform: translateY(-12px) rotate(5deg);} 
    }
    @keyframes float-slow { 
      0%,100%{ transform: translateY(0) rotate(0deg);} 
      50%{ transform: translateY(-8px) rotate(-3deg);} 
    }
    @keyframes pulseSlow { 
      0% { box-shadow: 0 0 0 0 rgba(139,92,246,0.15); } 
      70% { box-shadow: 0 0 0 10px rgba(139,92,246,0); } 
      100% { box-shadow: 0 0 0 0 rgba(139,92,246,0); } 
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
    .animate-pulse-slow { animation: pulseSlow 3s ease-out infinite; }
    .card-init { 
      opacity: 0; 
      transform: translateY(18px) scale(0.98) rotateX(2deg); 
      filter: blur(3px);
    } 
    .card-visible { 
      opacity: 1; 
      transform: translateY(0) scale(1) rotateX(0); 
      filter: blur(0); 
      transition: all 700ms cubic-bezier(0.22, 1, 0.36, 1);
    } 
    .will-change-transform { will-change: transform; }

    /* ensure avatar images cover their container and never stretch */
    .avatar-img { object-fit: cover; object-position: center; display: block; }

    /* on very small screens reduce some spacing to keep cards compact */
    @media (max-width: 420px) {
      .card-init { transform: translateY(10px) scale(0.99) rotateX(0deg); }
    }

    /* small performance hint - don't animate heavy shadows on mobile */
    @media (max-width: 640px) {
      .group:hover .card-init { box-shadow: none; }
    }
  `
};

// Add these to the existing dummyStyles.js file
// assets/dummyStyles.js
export const courseDetailStyles = {
  // Layout & Container
  container: "min-h-screen pt-20 md:pt-28 bg-[#05050A] py-8 px-4 relative overflow-hidden",
  mainContainer: "max-w-7xl mx-auto space-y-8 relative z-10 transition-all duration-1000",
  containerVisible: "opacity-100 translate-y-0",
  containerHidden: "opacity-0 translate-y-8",

  // Back Button
  backButton: "inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300 border border-white/10 hover:border-violet-500/50 animate-slideInLeft group",
  backIcon: "w-5 h-5 text-slate-400 group-hover:text-white transition-colors",
  backText: "font-medium text-slate-400 group-hover:text-white transition-colors font-exo",

  // Course Header
  header: "text-center space-y-6 relative",
  badge: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.2)] border border-violet-500/20 animate-bounceIn",
  badgeIcon: "w-5 h-5 text-violet-400",
  badgeText: "text-sm font-medium bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-exo",
  title: "text-4xl md:text-6xl font-orbiter font-bold text-white leading-tight animate-fadeInUp drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]",

  // Course Overview
  overviewContainer: "max-w-4xl mx-auto",
  overview: "p-6 font-exo rounded-3xl bg-[#0a0a14]/60 backdrop-blur-md shadow-2xl border border-white/10 hover:border-violet-500/30 transition-all duration-500 animate-slideInUp",
  overviewHeader: "flex items-center gap-3 mb-3",
  overviewIcon: "w-5 h-5 text-cyan-400",
  overviewTitle: "text-lg font-semibold text-white font-orbiter",
  overviewText: "text-slate-300 text-base leading-relaxed text-left font-light",

  // Course Stats
  statsContainer: "flex items-center justify-center gap-8 flex-wrap animate-fadeInUp",
  statItem: "flex items-center gap-3 text-slate-300 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:border-violet-500/30 transition-colors",
  statIcon: "w-5 h-5 text-violet-400",
  statText: "font-medium font-exo",
  teacherStat: "flex items-center gap-3 text-slate-300 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 transition-all duration-1000 hover:border-cyan-500/30",
  teacherAnimating: "scale-110 border-violet-500/50 bg-violet-500/10",

  // Main Grid
  mainGrid: "grid font-exo grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8",

  // Video Player
  videoSection: "xl:col-span-2 space-y-6",
  videoContainer: "rounded-3xl bg-black shadow-[0_0_40px_rgba(139,92,246,0.15)] overflow-hidden border border-white/10 hover:border-violet-500/30 transition-all duration-500 animate-slideInRight block",
  video: "w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover bg-black rounded-t-3xl",
  iframe: "w-full h-[250px] sm:h-[350px] md:h-[500px] rounded-t-3xl",
  videoPlaceholder: "w-full h-[250px] sm:h-[350px] md:h-[500px] flex items-center justify-center bg-[#0a0a14] text-white relative overflow-hidden rounded-t-3xl border-b border-white/5",
  videoPlaceholderBg: "absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/40 via-[#05050A] to-[#05050A]",
  videoPlaceholderOrb1: "absolute top-1/4 left-1/4 w-32 h-32 bg-violet-600/30 rounded-full mix-blend-screen filter blur-3xl animate-blob",
  videoPlaceholderOrb2: "absolute bottom-1/4 right-1/4 w-32 h-32 bg-cyan-600/30 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000",
  videoPlaceholderContent: "text-center relative z-10",
  videoPlaceholderIcon: "w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.2)]",
  videoPlaceholderPlayIcon: "w-8 h-8 opacity-90 text-white",
  videoPlaceholderText: "text-2xl mb-2 font-orbiter font-bold tracking-wide",
  videoPlaceholderSubtext: "text-lg text-slate-400 font-light",

  // Video Info
  videoInfo: "p-6 bg-[#0a0a14]/60 backdrop-blur-md border-x border-b border-white/10 rounded-b-3xl",
  videoTitle: "text-2xl font-bold text-white mb-3 font-orbiter",
  videoDescription: "text-slate-400 leading-relaxed font-light",
  videoMeta: "flex items-center gap-3 mt-4",
  durationBadge: "flex items-center gap-2 text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10",
  durationIcon: "w-4 h-4 text-violet-400",
  chapterBadge: "text-sm bg-violet-500/10 text-violet-300 px-3 py-1 rounded-full border border-violet-500/20 font-exo",

  // Completion Button
  completionSection: "mt-6 pt-6 border-t border-white/10",
  completionButton: "inline-flex cursor-pointer items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm",
  completionButtonCompleted: "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30",
  completionButtonIncomplete: "bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 border border-violet-500/30 hover:border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]",
  completionIcon: "w-5 h-5",
  completionText: "text-sm text-slate-500 mt-2",

  // Sidebar
  sidebar: "space-y-6",

  // Course Content
  contentCard: "p-6 rounded-3xl bg-[#0a0a14]/60 backdrop-blur-md shadow-2xl border border-white/10 hover:border-violet-500/30 transition-all duration-500 animate-slideInLeft",
  contentHeader: "flex items-center justify-between mb-6 pb-4 border-b border-white/5",
  contentTitle: "text-xl font-bold text-white font-orbiter",
  freeBadge: "text-sm text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-2 border border-emerald-500/20",
  freeBadgeIcon: "w-4 h-4",
  contentList: "space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2",

  // Lecture Item
  lectureItem: "rounded-2xl bg-white/5 backdrop-blur-sm shadow-lg border border-white/5 hover:border-white/10 transition-all duration-300 animate-fadeInUp",
  lectureHeader: "p-4 cursor-pointer transition-all duration-300",
  lectureHeaderExpanded: "bg-gradient-to-r from-violet-600/10 to-cyan-600/10 border-b border-white/10",
  lectureHeaderCollapsed: "hover:bg-white/5",
  lectureHeaderContent: "flex items-center justify-between",
  lectureLeftSection: "flex items-center gap-3",
  lectureChevron: "transform transition-transform duration-300",
  lectureChevronExpanded: "rotate-180 text-cyan-400",
  lectureChevronCollapsed: "text-slate-500",
  lectureInfo: "",
  lectureTitle: "font-semibold text-slate-200 group-hover:text-white transition-colors",
  lectureMeta: "text-sm text-slate-500 flex items-center gap-3 mt-1 font-light",
  lectureDuration: "flex items-center gap-1",
  lectureChapterCount: "text-xs bg-white/10 px-2 py-1 rounded-full border border-white/10 text-slate-400",

  // Chapter List
  chapterList: "p-4 pt-0 space-y-2 animate-fadeIn bg-black/20 rounded-b-2xl",
  chapterItem: "p-3 rounded-xl cursor-pointer transition-all duration-300 group border border-transparent",
  chapterSelected: "bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.1)]",
  chapterNotSelected: "bg-white/5 hover:bg-white/10 hover:border-white/10",
  chapterDisabled: "opacity-50 cursor-not-allowed grayscale",
  chapterContent: "flex items-center justify-between",
  chapterLeftSection: "flex items-center gap-3 flex-1",
  completionToggle: "flex-shrink-0 transition-all duration-300 hover:scale-110",
  completionToggleCompleted: "text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]",
  completionToggleIncomplete: "text-slate-600 group-hover:text-slate-400",
  completionIconSmall: "w-5 h-5",
  chapterText: "flex-1",
  chapterName: "font-medium transition-colors duration-300 text-sm",
  chapterNameSelected: "text-cyan-400",
  chapterNameNotSelected: "text-slate-400 group-hover:text-slate-200",
  chapterTopic: "text-xs text-slate-500 mt-0.5",
  chapterDuration: "text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-full border border-white/5 ml-2",

  // Pricing Card
  pricingCard: "p-6 rounded-3xl bg-[#0a0a14]/80 backdrop-blur-md shadow-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 animate-slideInLeft relative overflow-hidden group",
  pricingHeader: "flex items-center gap-2 mb-4 relative z-10",
  pricingTitle: "font-bold text-lg text-white font-orbiter tracking-wide",
  pricingAmount: "flex items-baseline gap-3 mb-2 relative z-10",
  price: "text-3xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]",
  originalPrice: "text-sm text-slate-500 line-through font-exo",
  discountBadge: "ml-auto text-sm bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]",
  pricingDescription: "text-sm text-slate-400 mb-6 font-light font-exo relative z-10 line-clamp-3",

  // Enrollment Buttons
  enrollButton: "w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl cursor-pointer font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed font-orbiter tracking-wide border border-transparent relative z-10",
  freeEnrolledButton: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 cursor-default",
  enrollPaidButton: "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] border-white/10",
  enrolledButton: "bg-white/5 border-white/10 text-emerald-400 cursor-default",
  enrollSpinner: "w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin",
  enrollIcon: "w-5 h-5 transition-transform group-hover:scale-110",
  enrollArrow: "ml-auto opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all",

  // Progress Card
  progressCard: "p-6 rounded-3xl bg-[#0a0a14]/60 backdrop-blur-md shadow-2xl border border-white/10 hover:border-violet-500/30 transition-all duration-500 animate-slideInLeft",
  progressHeader: "flex items-center gap-2 mb-4",
  progressIcon: "w-5 h-5 text-violet-500",
  progressTitle: "font-semibold text-white font-orbiter",
  progressContent: "space-y-4",
  progressBar: "w-full bg-white/5 rounded-full h-3 backdrop-blur-sm border border-white/5",
  progressFill: "bg-gradient-to-r from-violet-600 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(139,92,246,0.5)]",
  progressStats: "grid grid-cols-2 gap-4 text-center",
  progressStat: "p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300",
  progressStatValue: "text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-orbiter",
  progressStatLabel: "text-sm text-slate-500 mt-1 font-exo",

  // Toast
  toast: "fixed top-6 right-6 p-4 rounded-2xl shadow-2xl backdrop-blur-md transform transition-all duration-500 z-50 animate-slideInRight border border-white/10",
  toastError: "bg-red-500/20 text-red-200 border-red-500/30",
  toastInfo: "bg-violet-600/20 text-violet-200 border-violet-500/30",
  toastContent: "flex items-center gap-3",
  toastClose: "hover:scale-110 transition-transform opacity-70 hover:opacity-100",
  toastCloseIcon: "w-4 h-4",

  // Not Found State
  notFoundContainer: "min-h-screen flex items-center justify-center p-6 bg-[#05050A] relative overflow-hidden",
  notFoundContent: "text-center relative z-10",
  notFoundTitle: "text-2xl font-bold text-white font-orbiter",
  notFoundText: "mt-2 text-slate-400 font-exo",
  notFoundButton: "mt-4 cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.2)] bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all",

  // Animations
  animations: `
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes bounceIn {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.05); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); opacity: 1; }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
    .animate-slideInUp {
      animation: slideInUp 0.8s ease-out;
    }
    .animate-slideInLeft {
      animation: slideInLeft 0.8s ease-out;
    }
    .animate-slideInRight {
      animation: slideInRight 0.8s ease-out;
    }
    .animate-bounceIn {
      animation: bounceIn 0.8s ease-out;
    }
    .animate-fadeInUp {
      animation: fadeInUp 0.8s ease-out;
    }
    .animation-delay-200 {
      animation-delay: 0.2s;
    }
    .animation-delay-400 {
      animation-delay: 0.4s;
    }
    .animation-delay-300 {
      animation-delay: 0.3s;
    }
    .animation-delay-1000 {
      animation-delay: 1s;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-3000 {
      animation-delay: 3s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(139, 92, 246, 0.3);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(139, 92, 246, 0.5);
    }
  `
};

// Add these to your existing assets/dummyStyles.js

// assets/dummyStyles.js


// Toast styles
// Toast styles
export const toastStyles = {
  toast: "fixed top-6 right-6 p-4 rounded-2xl shadow-2xl backdrop-blur-md transform transition-all duration-500 z-50 animate-slideInRight border border-white/10",
  toastError: "bg-red-500/20 text-red-200 border-red-500/30",
  toastInfo: "bg-violet-600/20 text-violet-200 border-violet-500/30",
  toastContent: "flex items-center gap-3",
  toastClose: "hover:scale-110 transition-transform opacity-70 hover:opacity-100",
  toastCloseIcon: "w-4 h-4 cursor-pointer text-white"
};

// Animation delays


// Custom styles for CourseDetail
// Custom styles for CourseDetail
export const courseDetailCustomStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
  .animate-slideInUp {
    animation: slideInUp 0.8s ease-out;
  }
  .animate-slideInLeft {
    animation: slideInLeft 0.8s ease-out;
  }
  .animate-slideInRight {
    animation: slideInRight 0.8s ease-out;
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.8s ease-out;
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
  .animation-delay-300 {
    animation-delay: 0.3s;
  }
  .animation-delay-400 {
    animation-delay: 0.4s;
  }
  .animation-delay-1000 {
    animation-delay: 1s;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.5);
  }
`;


// Add these to your existing assets/dummyStyles.js

export const loginPageStyles = {
  // Layout and container styles
  pageContainer: "min-h-screen bg-[#05050A] relative overflow-hidden",

  // Back button
  backButton: "absolute top-6 left-6 z-10 group",
  backButtonContainer: "flex items-center space-x-2 text-slate-400 hover:text-white transition-all duration-300 transform hover:translate-x-1",
  backButtonIcon: "p-2 bg-white/5 rounded-full backdrop-blur-sm group-hover:bg-white/10 border border-white/10 transition-all duration-300 shadow-sm",
  backButtonArrow: "w-5 h-5",
  backButtonText: "font-semibold font-exo",

  // Main content
  mainContent: "relative min-h-screen font-exo flex items-center justify-center p-4",
  contentContainer: "w-full max-w-6xl flex flex-col md:flex-row lg:flex-row items-center justify-center gap-10",

  // Animation section
  animationContainer: "flex flex-1 items-center justify-center w-full mb-8 lg:mb-0",

  // Login card
  cardContainer: "flex-1 flex justify-center w-full",
  cardWrapper: "relative w-full max-w-md",
  cardGlow: "absolute -inset-4 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200",
  mainCard: "relative bg-[#0a0a14]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transform transition-all duration-500 hover:border-violet-500/30",
  cardTopLine: "absolute -top-1 left-8 right-8 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-t-2xl blur-[1px]",
  cardContent: "p-8",

  // Header
  header: "text-center mb-8",
  title: "text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2 transform hover:scale-105 transition-transform duration-300 font-orbiter tracking-wide",
  subtitle: "text-slate-400 font-light",

  // Form
  form: "space-y-6",
  formGroup: "group",
  label: "flex items-center space-x-3 text-slate-300 mb-2 font-medium",
  labelIcon: "w-5 h-5 text-violet-400",
  inputContainer: "relative",
  input: "w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300 backdrop-blur-sm font-exo",
  passwordInput: "w-full px-4 py-3 pl-12 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-400/50 focus:bg-white/10 focus:ring-1 focus:ring-violet-400/30 transition-all duration-300 backdrop-blur-sm font-exo",
  inputIcon: "absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors",
  passwordToggle: "absolute right-4 cursor-pointer top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white transition-colors duration-200",
  passwordToggleIcon: "w-4 h-4",

  // Submit button
  submitButton: "w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold rounded-xl cursor-pointer hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 relative overflow-hidden group shadow-lg border border-white/10 font-orbiter tracking-wider",
  buttonContent: "flex items-center justify-center space-x-2",
  buttonIcon: "w-5 h-5 text-white group-hover:scale-110 transition-transform",
  buttonText: "relative z-10",

  // Sign up link
  signupContainer: "text-center mt-6 relative z-10",
  signupText: "text-slate-500",
  signupLink: "text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200 ml-1",

  // Toast notification
  toast: "fixed bottom-6 right-6 bg-[#0a0a14]/90 backdrop-blur-xl border border-emerald-500/30 shadow-2xl rounded-xl px-6 py-4 flex items-center space-x-3 animate-slideInRight",
  toastIcon: "text-emerald-400 w-6 h-6",
  toastContent: "",
  toastTitle: "font-semibold text-emerald-400 font-orbiter",
  toastMessage: "text-sm text-slate-400 font-exo"
};

// Icon colors
export const loginIconColors = {
  cyan: "text-cyan-400",
  purple: "text-violet-400",
  cyan600: "text-cyan-500",
  purple600: "text-violet-500"
};

// Custom styles for LoginPage
export const loginPageCustomStyles = `
  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out;
  }
`;