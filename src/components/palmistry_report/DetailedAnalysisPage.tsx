
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Hand, 
  Mountain, 
  Route, 
  Zap, 
  Clock,
  Eye,
  Star,
  Triangle,
  X,
  Circle
} from 'lucide-react';

interface DetailedAnalysisPageProps {
  analysis: any;
  onChatStart: () => void;
  onNavigate: (page: number) => void;
}

const DetailedAnalysisPage: React.FC<DetailedAnalysisPageProps> = ({ analysis }) => {
  const palmLineFeatures = analysis?.palmLines || {};

  const fingerData = [
    { name: 'Thumb', shape: 'Waisted', angle: 'Wide', interpretation: 'Strong willpower and independent thinking' },
    { name: 'Index', shape: 'Square', angle: 'Normal', interpretation: 'Leadership qualities and ambition' },
    { name: 'Middle', shape: 'Tapered', angle: 'Straight', interpretation: 'Responsibility and serious nature' },
    { name: 'Ring', shape: 'Round', angle: 'Curved', interpretation: 'Creativity and artistic expression' },
    { name: 'Little', shape: 'Pointed', angle: 'Curved', interpretation: 'Communication skills and diplomacy' }
  ];

  const mountsData = [
    { name: 'Jupiter', prominence: 'Prominent', meaning: 'Ambition and leadership' },
    { name: 'Saturn', prominence: 'Moderate', meaning: 'Wisdom and responsibility' },
    { name: 'Apollo', prominence: 'Well-developed', meaning: 'Creativity and success' },
    { name: 'Mercury', prominence: 'Average', meaning: 'Communication and business' },
    { name: 'Venus', prominence: 'Flat', meaning: 'Restrained sensuality' },
    { name: 'Moon', prominence: 'Very prominent', meaning: 'Rich imagination and spirituality' },
    { name: 'Mars Positive', prominence: 'Strong', meaning: 'Courage and determination' },
    { name: 'Mars Negative', prominence: 'Moderate', meaning: 'Patience and endurance' }
  ];

  const symbolsData = [
    { symbol: 'Star', location: 'Sun Mount', icon: Star, meaning: 'Sudden fame or breakthrough', color: 'text-yellow-400' },
    { symbol: 'Triangle', location: 'Head Line', icon: Triangle, meaning: 'Scientific or analytical ability', color: 'text-blue-400' },
    { symbol: 'Cross', location: 'Life Line', icon: X, meaning: 'Challenge or obstacle period', color: 'text-red-400' },
    { symbol: 'Circle', location: 'Heart Line', icon: Circle, meaning: 'Emotional sensitivity', color: 'text-pink-400' }
  ];

  const timelineEvents = [
    { age: 25, event: 'Career breakthrough indicated', line: 'Fate Line' },
    { age: 30, event: 'Health consideration period', line: 'Life Line' },
    { age: 35, event: 'Relationship milestone', line: 'Heart Line' },
    { age: 45, event: 'Career redirection phase', line: 'Fate Line' },
    { age: 50, event: 'Creative awakening period', line: 'Sun Line' }
  ];

  return (
    <div className="space-y-4 md:space-y-8">
      <Tabs defaultValue="fingers" className="w-full">
        {/* Mobile: Scrollable horizontal tabs */}
        <div className="md:hidden">
          <TabsList className="flex h-auto p-1 bg-black/30 backdrop-blur-lg border border-purple-400/30 rounded-xl overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 min-w-full">
              <TabsTrigger value="fingers" className="data-[state=active]:bg-purple-600 px-3 py-2 text-xs whitespace-nowrap">Fingers</TabsTrigger>
              <TabsTrigger value="mounts" className="data-[state=active]:bg-purple-600 px-3 py-2 text-xs whitespace-nowrap">Mounts</TabsTrigger>
              <TabsTrigger value="lines" className="data-[state=active]:bg-purple-600 px-3 py-2 text-xs whitespace-nowrap">Lines</TabsTrigger>
              <TabsTrigger value="symbols" className="data-[state=active]:bg-purple-600 px-3 py-2 text-xs whitespace-nowrap">Symbols</TabsTrigger>
              <TabsTrigger value="timeline" className="data-[state=active]:bg-purple-600 px-3 py-2 text-xs whitespace-nowrap">Timeline</TabsTrigger>
              <TabsTrigger value="handprofile" className="data-[state=active]:bg-purple-600 px-3 py-2 text-xs whitespace-nowrap">Profile</TabsTrigger>
            </div>
          </TabsList>
        </div>
        
        {/* Desktop: Grid layout tabs */}
        <div className="hidden md:block">
          <TabsList className="grid w-full grid-cols-6 bg-black/30 backdrop-blur-lg border border-purple-400/30">
            <TabsTrigger value="fingers" className="data-[state=active]:bg-purple-600">Fingers</TabsTrigger>
            <TabsTrigger value="mounts" className="data-[state=active]:bg-purple-600">Mounts</TabsTrigger>
            <TabsTrigger value="lines" className="data-[state=active]:bg-purple-600">Lines</TabsTrigger>
            <TabsTrigger value="symbols" className="data-[state=active]:bg-purple-600">Symbols</TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-purple-600">Timeline</TabsTrigger>
            <TabsTrigger value="handprofile" className="data-[state=active]:bg-purple-600">Hand Profile</TabsTrigger>
          </TabsList>
        </div>

        {/* Finger Analysis - Mobile Optimized */}
        <TabsContent value="fingers" className="space-y-4 md:space-y-6">
          <Card className="bg-black/30 backdrop-blur-lg border-purple-500/30 shadow-2xl">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-white flex items-center gap-2 md:gap-3 text-lg md:text-2xl">
                <div className="p-2 md:p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full">
                  <Hand className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                Finger Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {fingerData.map((finger, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-xl p-4 md:p-6 border border-blue-400/30">
                    <h4 className="text-blue-100 font-bold text-base md:text-lg mb-3 md:mb-4">{finger.name} Finger</h4>
                    <div className="space-y-2 md:space-y-3">
                      <div>
                        <span className="text-blue-300 text-xs md:text-sm">Shape:</span>
                        <p className="text-white font-medium text-sm md:text-base">{finger.shape}</p>
                      </div>
                      <div>
                        <span className="text-blue-300 text-xs md:text-sm">Angle:</span>
                        <p className="text-white font-medium text-sm md:text-base">{finger.angle}</p>
                      </div>
                      <div>
                        <span className="text-blue-300 text-xs md:text-sm">Interpretation:</span>
                        <p className="text-blue-100 text-xs md:text-sm">{finger.interpretation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mounts Analysis - Mobile Optimized */}
        <TabsContent value="mounts" className="space-y-4 md:space-y-6">
          <Card className="bg-black/30 backdrop-blur-lg border-purple-500/30 shadow-2xl">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-white flex items-center gap-2 md:gap-3 text-lg md:text-2xl">
                <div className="p-2 md:p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full">
                  <Mountain className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                Mounts Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {mountsData.map((mount, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg p-3 md:p-4 border border-green-400/30">
                    <h4 className="text-green-100 font-bold mb-2 text-sm md:text-base">{mount.name} Mount</h4>
                    <Badge className="bg-green-500/20 text-green-300 mb-2 md:mb-3 text-xs">{mount.prominence}</Badge>
                    <p className="text-green-100 text-xs md:text-sm">{mount.meaning}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lines Analysis - Mobile Optimized */}
        <TabsContent value="lines" className="space-y-4 md:space-y-6">
          <Card className="bg-black/30 backdrop-blur-lg border-purple-500/30 shadow-2xl">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-white flex items-center gap-2 md:gap-3 text-lg md:text-2xl">
                <div className="p-2 md:p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                  <Route className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                Palm Lines Analysis
              </CardTitle>
              <p className="text-purple-200 text-xs md:text-sm">Actual features detected from your uploaded palm photo</p>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {Object.entries(palmLineFeatures).map(([lineType, data]: [string, any]) => (
                  <div key={lineType} className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-purple-400/30">
                    <h4 className="text-purple-100 font-bold text-base md:text-lg mb-2 md:mb-3 capitalize">
                      {lineType.replace(/([A-Z])/g, ' $1').trim()} 
                    </h4>
                    <p className="text-purple-200 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed">
                      {data?.description || 'Analysis not available'}
                    </p>
                    {data?.characteristics && (
                      <div className="space-y-1 md:space-y-2">
                        {data.characteristics.map((char: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 md:gap-3">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex-shrink-0"></div>
                            <span className="text-purple-100 text-xs md:text-sm">{char}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-400/30">
                <p className="text-purple-100 text-xs md:text-sm font-medium">
                  <Eye className="w-3 h-3 md:w-4 md:h-4 inline mr-1 md:mr-2" />
                  These features were detected by AI analysis of your uploaded palm image
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Symbols Analysis - Mobile Optimized */}
        <TabsContent value="symbols" className="space-y-4 md:space-y-6">
          <Card className="bg-black/30 backdrop-blur-lg border-purple-500/30 shadow-2xl">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-white flex items-center gap-2 md:gap-3 text-lg md:text-2xl">
                <div className="p-2 md:p-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full">
                  <Zap className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                Symbols & Special Markings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {symbolsData.map((symbol, index) => {
                  const IconComponent = symbol.icon;
                  return (
                    <div key={index} className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-xl p-4 md:p-6 border border-yellow-400/30">
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${symbol.color}`} />
                        <h4 className="text-yellow-100 font-bold text-base md:text-lg">{symbol.symbol}</h4>
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <p className="text-yellow-200 text-xs md:text-sm">
                          <strong>Location:</strong> {symbol.location}
                        </p>
                        <p className="text-yellow-100 text-xs md:text-sm">{symbol.meaning}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Analysis - Mobile Optimized */}
        <TabsContent value="timeline" className="space-y-4 md:space-y-6">
          <Card className="bg-black/30 backdrop-blur-lg border-purple-500/30 shadow-2xl">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-white flex items-center gap-2 md:gap-3 text-lg md:text-2xl">
                <div className="p-2 md:p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                Life Timeline
              </CardTitle>
              <p className="text-purple-200 text-xs md:text-sm">Key events mapped from your palm lines</p>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 to-purple-400"></div>
                <div className="space-y-4 md:space-y-6">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="relative flex items-center gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold z-10 text-sm md:text-base">
                        {event.age}
                      </div>
                      <div className="flex-1 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-xl p-3 md:p-4 border border-indigo-400/30">
                        <h4 className="text-indigo-100 font-bold mb-1 md:mb-2 text-sm md:text-base">{event.event}</h4>
                        <Badge className="bg-indigo-500/20 text-indigo-300 text-xs">{event.line}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hand Profile Analysis - Mobile Optimized */}
        <TabsContent value="handprofile" className="space-y-4 md:space-y-6">
          <Card className="bg-black/30 backdrop-blur-lg border-purple-500/30 shadow-2xl">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-white flex items-center gap-2 md:gap-3 text-lg md:text-2xl">
                <div className="p-2 md:p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                  <Hand className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                Hand Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {[
                  { label: 'Dominant Hand', value: 'Right' },
                  { label: 'Hand Shape', value: 'Earth' },
                  { label: 'Skin Texture', value: 'Soft' },
                  { label: 'Palm Color', value: 'Pale Pink' },
                  { label: 'Nail Shape', value: 'Oval' },
                  { label: 'Overall Size', value: 'Medium' }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg p-3 md:p-4 border border-purple-400/30">
                    <p className="text-purple-300 text-xs md:text-sm mb-1">{item.label}</p>
                    <p className="text-white font-semibold text-sm md:text-base">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailedAnalysisPage;
