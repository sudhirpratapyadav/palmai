
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Hand, 
  Heart, 
  Briefcase, 
  Activity, 
  Sparkles, 
  ChevronRight,
  Star
} from 'lucide-react';

interface OverviewPageProps {
  analysis: any;
  onChatStart: () => void;
  onNavigate: (page: number) => void;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ analysis, onChatStart, onNavigate }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Exceptional';
    if (score >= 70) return 'Strong';
    if (score >= 55) return 'Moderate';
    if (score >= 40) return 'Developing';
    return 'Emerging';
  };

  const previewCards = [
    {
      key: 'lifePath',
      title: 'Life Path & Destiny',
      icon: Star,
      data: analysis?.lifePath,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      key: 'career',
      title: 'Career & Success',
      icon: Briefcase,
      data: analysis?.career,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      key: 'relationships',
      title: 'Love & Relationships',
      icon: Heart,
      data: analysis?.relationships,
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      key: 'health',
      title: 'Health & Vitality',
      icon: Activity,
      data: analysis?.health,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      key: 'spiritual',
      title: 'Spiritual Growth',
      icon: Sparkles,
      data: analysis?.spiritual,
      gradient: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Personality Overview - Mobile Optimized */}
      <Card className="bg-black/30 backdrop-blur-lg border-purple-500/30 shadow-2xl">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-white flex items-center gap-3 text-base md:text-2xl">
            <div className="p-2 md:p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full">
              <User className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            Personality Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-4 md:p-6 border border-green-400/30">
            <p className="text-green-100 text-sm md:text-lg leading-snug md:leading-relaxed">
              You exhibit a grounded and pragmatic personality. An Earth hand shape indicates a practical nature 
              coupled with strong physical stamina. Your palm reveals a balanced individual who approaches life 
              with methodical thinking and steady determination. You possess natural leadership qualities while 
              maintaining a compassionate approach to relationships.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Section Preview Cards - Mobile Optimized */}
      <Card className="bg-black/30 backdrop-blur-lg border-purple-500/30 shadow-2xl">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-white text-lg md:text-2xl mb-2 md:mb-4">
            Analysis Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {previewCards.map((card) => {
              const IconComponent = card.icon;
              const score = card.data?.score || 0;
              
              return (
                <div
                  key={card.key}
                  className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => onNavigate(2)}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-r ${card.gradient}`}>
                      <IconComponent className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-purple-300 group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-white font-bold text-sm md:text-lg mb-2 md:mb-3">{card.title}</h3>
                  
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <span className={`text-xl md:text-2xl font-bold ${getScoreColor(score)}`}>
                      {score}
                    </span>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        score >= 70 ? 'bg-green-500/20 text-green-300' :
                        score >= 40 ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {getScoreLabel(score)}
                    </Badge>
                  </div>
                  
                  <p className="text-purple-200 text-xs md:text-sm line-clamp-3">
                    {card.data?.description || 'Analysis not available'}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewPage;
