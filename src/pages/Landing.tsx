import React from 'react';
import { Sparkles, Eye, Heart, Star, ArrowRight, Zap, BookOpen, Brain, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BlurImage from "@/components/BlurImage";
import { useIsMobile } from "@/hooks/use-mobile";

interface LandingProps {
  onGetStarted: () => void;
}

const Landing = ({ onGetStarted }: LandingProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-400/10 rounded-full blur-xl animate-bounce delay-700"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 animate-float">
          <Star className="w-6 h-6 text-yellow-300/60" />
        </div>
        <div className="absolute top-40 right-32 animate-float delay-1000">
          <Sparkles className="w-8 h-8 text-purple-300/60" />
        </div>
        <div className="absolute bottom-32 left-32 animate-float delay-2000">
          <Heart className="w-6 h-6 text-pink-300/60" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 md:p-6 flex justify-between items-center animate-fade-in">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Palm AI
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-purple-200">
          <Award className="w-3 h-3 md:w-4 md:h-4" />
          <span>Research-Backed</span>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* Palm Reading Animation with Real Hand Image */}
        <div className="flex justify-center mb-4 md:mb-6 animate-fade-in">
          <div className="relative">
            {/* Real Hand Image with blur/shimmer effect */}
            <div className="relative w-48 h-60 md:w-56 md:h-72 mx-auto">
              <BlurImage
                src={isMobile 
                  ? "/lovable-uploads/mobile_hand_img.png" 
                  : "/lovable-uploads/c115b0a9-6e9e-489a-9b22-251e21712f96.png"
                }
                alt="Palm for reading"
                className="w-full h-full object-contain"
                skeletonClassName="rounded-lg"
              />

              {/* Scanning beam effects - NOW IN FRONT */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 10 }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan opacity-80"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan delay-1000 opacity-60"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-scan delay-2000 opacity-40"></div>
              </div>

              {/* Mystical particles around hand */}
              <div className="absolute -top-4 -left-4 w-4 h-4 bg-yellow-400 rounded-full animate-float blur-sm opacity-80"></div>
              <div className="absolute top-8 -right-6 w-3 h-3 bg-pink-400 rounded-full animate-float delay-500 blur-sm opacity-70"></div>
              <div className="absolute top-20 -left-6 w-2 h-2 bg-blue-400 rounded-full animate-float delay-1000 blur-sm opacity-60"></div>
              <div className="absolute bottom-16 -right-4 w-3 h-3 bg-purple-400 rounded-full animate-float delay-1500 blur-sm opacity-80"></div>
              <div className="absolute bottom-8 -left-3 w-2 h-2 bg-green-400 rounded-full animate-float delay-2000 blur-sm opacity-70"></div>
              <div className="absolute top-32 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-float delay-700 blur-sm opacity-60"></div>
              <div className="absolute bottom-24 left-4 w-3 h-3 bg-orange-400 rounded-full animate-float delay-1200 blur-sm opacity-75"></div>

              {/* Glowing aura around the hand */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-2xl animate-pulse scale-110"></div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-cyan-400/10 to-yellow-400/10 blur-xl animate-pulse delay-500 scale-105"></div>

              {/* Energy lines emanating from palm */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="absolute w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rotate-45 animate-pulse opacity-60"></div>
                <div className="absolute w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent -rotate-45 animate-pulse delay-300 opacity-50"></div>
                <div className="absolute w-14 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent rotate-90 animate-pulse delay-600 opacity-40"></div>
                <div className="absolute w-10 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse delay-900 opacity-50"></div>
              </div>
            </div>

            {/* AI Analysis Text */}
            <div className="text-center mt-4">
              <p className="text-sm md:text-base text-purple-200 animate-pulse">
                ✨ AI Analyzing Palm Lines ✨
              </p>
              <div className="flex justify-center mt-2 space-x-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Hero Section - Mobile Optimized */}
        <div className="text-center mb-12 md:mb-20">
          <div className="mb-6 md:mb-8 animate-fade-in">
            {/* Main Headline */}
            <h2
              className={`
                text-4xl
                sm:text-5xl
                md:text-7xl
                font-extrabold
                text-white 
                mb-6
                md:mb-10
                bg-gradient-to-r
                from-purple-200
                via-pink-200
                to-yellow-200
                bg-clip-text
                text-transparent
                animate-fade-in
                delay-300
                leading-tight
                tracking-tight
                drop-shadow-lg
              `}
              style={{
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              AI Palm Reading
            </h2>

            {/* Updated supporting text */}
            <div className="max-w-3xl mx-auto mb-7 md:mb-10 animate-fade-in delay-500 px-4">
              <p className="text-lg md:text-2xl text-yellow-100 mb-2 leading-snug md:leading-snug font-semibold">
                Reveal your{' '}
                <span className="text-yellow-300 font-extrabold drop-shadow-lg">
                  Life&apos;s Path
                </span>{' '}
                with our{' '}
                <span className="text-pink-400 font-extrabold drop-shadow-lg">
                  Advanced AI
                </span>{' '}
                Technology
              </p>
              <p className="text-base md:text-xl text-purple-200 leading-normal md:leading-relaxed font-normal">
                Rooted in Traditional Palmistry Texts and Validated by Modern Research.
              </p>
            </div>

            {/* Scientific credibility badges - Mobile Optimized */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 md:mb-6 animate-fade-in delay-700 px-4">
              <div className="flex items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-2">
                <BookOpen className="w-3 h-3 md:w-4 md:h-4 text-blue-300" />
                <span className="text-xs md:text-base text-blue-100">Research-Based</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-2">
                <Brain className="w-3 h-3 md:w-4 md:h-4 text-purple-300" />
                <span className="text-xs md:text-base text-purple-100">AI-Powered</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-2">
                <Award className="w-3 h-3 md:w-4 md:h-4 text-yellow-300" />
                <span className="text-xs md:text-base text-yellow-100">Authenticated</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="animate-fade-in delay-1000 px-4">
            <Button 
              onClick={onGetStarted}
              className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 text-base md:text-xl rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-purple-500/25 animate-pulse"
            >
              <Eye className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span className="hidden md:inline">Unlock Your Palm's Secrets</span>
              <span className="md:hidden">Start Analysis</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2" />
            </Button>
            <p className="text-purple-300 mt-3 text-xs md:text-sm px-2">
              ✨ No fake predictions • Science-backed analysis • Authentic insights
            </p>
          </div>
        </div>

        {/* Enhanced Features Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-20 px-4">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:rotate-1 animate-fade-in delay-300">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="relative mb-3 md:mb-4">
                <Heart className="w-12 h-12 md:w-16 md:h-16 text-pink-400 mx-auto animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-pink-500 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Love & Relationships</h3>
              <p className="text-sm md:text-base text-purple-200 leading-relaxed">
                AI analysis of your heart line, mount of Venus, and relationship indicators 
                based on documented palmistry research.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 animate-fade-in delay-500">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="relative mb-3 md:mb-4">
                <Zap className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 mx-auto animate-pulse delay-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-yellow-500 rounded-full animate-ping delay-300"></div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Career & Success</h3>
              <p className="text-sm md:text-base text-purple-200 leading-relaxed">
                Professional potential analysis using authenticated palmistry studies 
                on success lines and career indication patterns.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:rotate-1 animate-fade-in delay-700">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="relative mb-3 md:mb-4">
                <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-purple-400 mx-auto animate-pulse delay-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full animate-ping delay-600"></div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Spiritual Journey</h3>
              <p className="text-sm md:text-base text-purple-200 leading-relaxed">
                Discover your spiritual path through AI interpretation of intuition lines, 
                mystic crosses, and other spiritual markers.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Scientific Approach Section */}
        <div className="text-center mb-12 md:mb-20 animate-fade-in delay-900 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg border-white/20 rounded-3xl p-6 md:p-12">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="relative">
                <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-blue-300 animate-pulse" />
                <div className="absolute -top-1 md:-top-2 -right-1 md:-right-2">
                  <Award className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-bounce" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">Scientifically Grounded Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
              <div>
                <h4 className="text-lg md:text-xl font-semibold text-purple-200 mb-2 md:mb-3">📚 Research Foundation</h4>
                <ul className="text-sm md:text-base text-purple-100 space-y-1 md:space-y-2">
                  <li>• Published academic studies on palmistry</li>
                  <li>• Traditional texts and historical documentation</li>
                  <li>• Cross-cultural palmistry research</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold text-purple-200 mb-2 md:mb-3">🧠 AI Technology</h4>
                <ul className="text-sm md:text-base text-purple-100 space-y-1 md:space-y-2">
                  <li>• Advanced computer vision analysis</li>
                  <li>• Pattern recognition algorithms</li>
                  <li>• Authenticated source integration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works with enhanced animations */}
        <div className="text-center mb-12 md:mb-20 px-4">
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 md:mb-16 animate-fade-in">How Our AI Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center animate-fade-in delay-300">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl mb-4 md:mb-6 animate-bounce">
                1
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Capture Your Palm</h4>
              <p className="text-sm md:text-lg text-purple-200">Upload a clear photo using our guided capture system with optimal lighting detection</p>
            </div>
            <div className="flex flex-col items-center animate-fade-in delay-500">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl mb-4 md:mb-6 animate-bounce delay-300">
                2
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">AI Analysis Engine</h4>
              <p className="text-sm md:text-lg text-purple-200">Advanced algorithms analyze lines, mounts, and patterns against authenticated palmistry databases</p>
            </div>
            <div className="flex flex-col items-center animate-fade-in delay-700">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl mb-4 md:mb-6 animate-bounce delay-600">
                3
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Personalized Insights</h4>
              <p className="text-sm md:text-lg text-purple-200">Receive detailed, research-backed interpretations with interactive guidance</p>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section with better contrast */}
        <div className="text-center animate-fade-in delay-1000 px-4">
          <Card className="bg-black/40 backdrop-blur-xl border-white/30 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500 shadow-2xl">
            <CardContent className="p-6 md:p-12">
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="relative">
                  <Brain className="w-12 h-12 md:w-16 md:h-16 text-purple-300 animate-pulse" />
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 absolute -top-1 md:-top-2 -right-1 md:-right-2 animate-spin" />
                </div>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">Ready for Authentic AI Palm Reading?</h3>
              <p className="text-base md:text-xl text-gray-100 mb-6 md:mb-10 leading-relaxed drop-shadow-md">
                Join thousands discovering their authentic destiny through our scientifically-informed, 
                AI-powered palmistry analysis. No fake predictions - just research-backed insights.
              </p>
              <Button 
                onClick={onGetStarted}
                className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 md:py-6 px-8 md:px-12 text-lg md:text-2xl rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl animate-pulse"
              >
                <span className="hidden md:inline">Start Your Scientific Palm Analysis</span>
                <span className="md:hidden">Start Palm Analysis</span>
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 ml-2 md:ml-4" />
              </Button>
              <p className="text-gray-200 mt-4 md:mt-6 text-xs md:text-sm drop-shadow-md">
                🔬 Research-validated • 🤖 AI-powered • ✅ Authentic insights
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
          @keyframes scan {
            0% { transform: translateY(0) scaleX(0); opacity: 0; }
            50% { transform: translateY(200px) scaleX(1); opacity: 1; }
            100% { transform: translateY(240px) scaleX(0); opacity: 0; }
          }
          .animate-scan {
            animation: scan 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Landing;
