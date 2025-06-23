import React, { useState, useEffect, useRef } from 'react';
import { FileText, User, Hand, Target, Share, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import OverviewPage from './OverviewPage';
import DetailedAnalysisPage from './DetailedAnalysisPage';
import InsightsSummaryPage from './InsightsSummaryPage';

interface PalmistryReportProps {
  analysis: any;
  onChatStart: () => void;
}

const PalmistryReport: React.FC<PalmistryReportProps> = ({ analysis, onChatStart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isChatCtaVisible, setIsChatCtaVisible] = useState(false);
  const { toast } = useToast();
  const chatCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show button after scrolling down 50px, but only if chat CTA is not visible
      if (scrollY > 50 && !isChatCtaVisible) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsChatCtaVisible(entry.isIntersecting);
          // Hide floating button when bottom CTA is visible
          if (entry.isIntersecting) {
            setShowFloatingButton(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (chatCtaRef.current) {
      observer.observe(chatCtaRef.current);
    }

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (chatCtaRef.current) {
        observer.unobserve(chatCtaRef.current);
      }
    };
  }, [isChatCtaVisible]);

  const handleShare = () => {
    const shareUrl = "https://PalmAI.live";
    const shareOptions = {
      title: "Palm Vision - See your palm reading!",
      text: "Check out this amazing AI-powered palmistry app! Get your palm read and discover your destiny.",
      url: shareUrl,
    };

    if (navigator.share) {
      navigator
        .share(shareOptions)
        .then(() => {
          toast({
            title: "Shared!",
            description: "Invite sent to your friend 🚀",
          });
        })
        .catch(() => {
          // ignore user dismissal
        });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast({
          title: "Link Copied!",
          description: "App link copied to clipboard. Share it with your friend!",
        });
      });
    } else {
      window.prompt("Copy this link:", shareUrl);
    }
  };

  const pages = [
    {
      id: 1,
      title: 'Overview & Profile',
      icon: User,
      component: OverviewPage
    },
    {
      id: 2,
      title: 'Detailed Analysis',
      icon: Hand,
      component: DetailedAnalysisPage
    },
    {
      id: 3,
      title: 'Insights & Summary',
      icon: Target,
      component: InsightsSummaryPage
    }
  ];

  const currentPageData = pages.find(p => p.id === currentPage);
  const CurrentPageComponent = currentPageData?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-2 md:py-8 px-2 md:px-4">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-xl md:text-4xl font-bold text-white mb-1 md:mb-2">Your Palm Analysis</h1>
          <p className="text-purple-200 text-xs md:text-sm">
            Prepared on {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Page Navigation - Mobile Optimized */}
        <div className="mb-4 md:mb-8">
          {/* Mobile: Centered tabs */}
          <div className="md:hidden flex justify-center">
            <div className="flex bg-black/30 backdrop-blur-lg rounded-xl p-1 border border-purple-400/30 gap-1">
              {pages.map((page) => {
                const IconComponent = page.icon;
                return (
                  <button
                    key={page.id}
                    onClick={() => setCurrentPage(page.id)}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 min-w-[70px] ${
                      currentPage === page.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-purple-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-xs font-medium leading-tight text-center">{page.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Desktop: Original centered navigation */}
          <div className="hidden md:flex justify-center">
            <div className="flex bg-black/30 backdrop-blur-lg rounded-full p-2 border border-purple-400/30">
              {pages.map((page) => {
                const IconComponent = page.icon;
                return (
                  <button
                    key={page.id}
                    onClick={() => setCurrentPage(page.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      currentPage === page.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-purple-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{page.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Page Content */}
        {CurrentPageComponent && (
          <CurrentPageComponent
            analysis={analysis}
            onChatStart={onChatStart}
            onNavigate={setCurrentPage}
          />
        )}

        {/* Chat CTA Footer - Mobile Optimized */}
        <div ref={chatCtaRef} className="mt-6 md:mt-12">
          <Card className="bg-black/30 backdrop-blur-lg border-purple-500/30 shadow-2xl">
            <CardContent className="p-4 md:p-8 text-center">
              <div className="flex justify-center mb-3 md:mb-6">
                <MessageCircle className="w-10 h-10 md:w-16 md:h-16 text-purple-400 animate-pulse" />
              </div>
              <h3 className="text-white text-base md:text-2xl font-bold mb-2 md:mb-4">
                Explore Your Reading Further
              </h3>
              <p className="text-purple-200 mb-4 md:mb-8 text-xs md:text-lg leading-relaxed max-w-2xl mx-auto">
                Have questions about your detailed palm analysis? Get personalized insights and ask specific 
                questions about any aspect of your reading with our AI palmist.
              </p>
              <Button 
                onClick={onChatStart}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 md:py-4 md:px-8 text-sm md:text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 md:w-6 md:h-6 mr-2 md:mr-3" />
                <span className="hidden sm:inline">Start Personal Palm Chat</span>
                <span className="sm:hidden">Start Chat</span>
                <Sparkles className="w-4 h-4 md:w-6 md:h-6 ml-2 md:ml-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Action Buttons - Mobile Optimized */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-2 md:gap-4">
        {/* Floating Share Button */}
        <div className={`transition-all duration-500 ease-in-out transform ${
          showFloatingButton 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-16 opacity-0 scale-95 pointer-events-none'
        }`}>
          <Button
            onClick={handleShare}
            className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-indigo-400/30 backdrop-blur-lg group"
            size="lg"
          >
            <Share className="w-5 h-5 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-200" />
          </Button>
        </div>

        {/* Floating Chat Button */}
        <div className={`transition-all duration-500 ease-in-out transform ${
          showFloatingButton 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-16 opacity-0 scale-95 pointer-events-none'
        }`}>
          <Button
            onClick={onChatStart}
            className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-purple-400/30 backdrop-blur-lg group"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PalmistryReport;
