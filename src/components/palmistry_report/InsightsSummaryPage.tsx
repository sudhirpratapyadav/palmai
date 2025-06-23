
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Target, 
  CheckCircle,
  Lightbulb
} from 'lucide-react';

interface InsightsSummaryPageProps {
  analysis: any;
  onChatStart: () => void;
  onNavigate: (page: number) => void;
}

const InsightsSummaryPage: React.FC<InsightsSummaryPageProps> = ({ analysis, onChatStart }) => {

  const actionableGuidance = [
    "Consider mindfulness practices to balance your strong mental focus and enhance spiritual awareness.",
    "Engage in regular physical activity to bolster health during mid-life transitions.",
    "Pursue leadership roles or academic endeavors to fully leverage your career potential.",
    "Practice emotional intelligence to deepen your relationships and communication skills.",
    "Set aside time for creative pursuits to nurture your artistic and intuitive abilities.",
    "Maintain a balanced diet and stress management techniques for optimal health."
  ];

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Final Conclusion - Mobile Optimized */}
      <Card className="bg-black/30 backdrop-blur-lg border-purple-500/30 shadow-2xl">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-white flex items-center gap-2 md:gap-3 text-lg md:text-2xl">
            <div className="p-2 md:p-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full">
              <Target className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            Final Conclusion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-emerald-600/20 to-green-600/20 rounded-xl p-4 md:p-8 border border-emerald-400/30">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-emerald-100 text-base md:text-xl font-bold mb-3 md:mb-4">Your Palm Reading Summary</h3>
                <p className="text-emerald-100 text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                  This detailed palm reading reveals a capable and thoughtful individual whose consistent discipline 
                  and natural intuition guide personal growth. You possess a unique blend of practical wisdom and 
                  creative insight that positions you well for both material success and spiritual fulfillment.
                </p>
                <p className="text-emerald-200 text-xs md:text-base leading-relaxed">
                  Your analytical strengths combined with emotional intelligence suggest a balanced approach to life's 
                  challenges. The prominence of certain mounts and the clarity of your major lines indicate strong 
                  potential in leadership, relationships, and creative endeavors.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Guidance - Mobile Optimized */}
      <Card className="bg-black/30 backdrop-blur-lg border-purple-500/30 shadow-2xl">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-white flex items-center gap-2 md:gap-3 text-lg md:text-2xl">
            <div className="p-2 md:p-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full">
              <Lightbulb className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            Actionable Guidance
          </CardTitle>
          <p className="text-purple-200 text-xs md:text-sm">Personalized recommendations based on your palm analysis</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {actionableGuidance.map((guidance, index) => (
              <div key={index} className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 rounded-lg p-4 md:p-5 border border-amber-400/30">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-1">
                    <span className="text-white text-xs md:text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-amber-100 leading-relaxed text-xs md:text-sm">{guidance}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsSummaryPage;
