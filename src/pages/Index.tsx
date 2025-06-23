import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, LogOut, User, Menu, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PalmUpload from '@/components/PalmUpload';
import UserProfile from '@/components/UserProfile';
import PalmistryReport from '@/components/palmistry_report/PalmistryReport';
import ChatInterface from '@/components/ChatInterface';
import Auth from '@/components/Auth';
import Landing from './Landing';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PalmReadingProgress from '@/components/PalmReadingProgress';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [palmImage, setPalmImage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState(null);
  const [palmAnalysis, setPalmAnalysis] = useState(null);
  const [palmReadingId, setPalmReadingId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState("");
  const { toast } = useToast();

  // Show landing page for new visitors
  useEffect(() => {
    if (!loading && !user) {
      setShowLanding(true);
    } else if (user) {
      setShowLanding(false);
      loadUserReadings();
    }
  }, [user, loading]);

  // Load user's existing readings
  const loadUserReadings = async () => {
    try {
      const { data: readings, error } = await supabase
        .from('palm_readings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (readings && readings.length > 0) {
        const latestReading = readings[0];
        setPalmAnalysis(latestReading.analysis_data);
        setPalmReadingId(latestReading.id);
        setCurrentStep('reading');
      }
    } catch (error) {
      console.error('Error loading readings:', error);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setPalmImage(imageUrl);
    setCurrentStep('profile');
  };

  const handleProfileComplete = async (profile: any) => {
    setUserProfile(profile);
    setShowProgress(true);
    setProgress(0);
    setProgressStatus("Uploading your palm photo...");

    // Progress bar simulation
    let uploadStep = 30;
    let analyzeStep = 80;

    const increaseProgress = (to: number, nextStatus?: string, duration = 600) => {
      let interval: NodeJS.Timeout | null = null;
      return new Promise<void>((resolve) => {
        let start = progress;
        let step = (to - start) / Math.max(1, (duration / 40));
        interval = setInterval(() => {
          setProgress((prev) => {
            let next = prev + step;
            if (next >= to) {
              clearInterval(interval!);
              next = to;
              if (nextStatus) setProgressStatus(nextStatus);
              resolve();
            }
            return next > to ? to : next;
          });
        }, 40);
      });
    };

    try {
      // Step 1: Uploading palm image (simulate progress)
      setProgressStatus("Uploading your palm photo...");
      await increaseProgress(uploadStep);

      // Step 2: Update profile in DB (fast, runs before analyze)
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          date_of_birth: profile.dateOfBirth || null,
          hand_preference: profile.handPreference,
          gender: profile.gender,
          updated_at: new Date().toISOString(),
        });
      if (profileError) throw profileError;

      // Step 3: Analyzing palm (AI invoke)
      setProgressStatus("Analyzing your palm...");
      await increaseProgress(analyzeStep, undefined, 1000);

      const response = await supabase.functions.invoke('generate-palm-reading', {
        body: {
          userProfile: profile,
          palmImageBase64: palmImage,
        },
      });

      // Handle error responses from the function
      if (response.error) {
        throw response.error;
      }

      // Check if the response contains an error (invalid image)
      if (response.data?.error) {
        setShowProgress(false);
        setProgress(0);
        setProgressStatus("");
        toast({
          title: "Image Issue",
          description: response.data.error,
          variant: "destructive",
        });
        setCurrentStep('upload'); // Go back to upload step
        return;
      }

      const { analysisData } = response.data;

      // Step 4: Saving your reading
      setProgressStatus("Saving your reading...");
      await increaseProgress(90, undefined, 300);

      const { data: readingData, error: readingError } = await supabase
        .from('palm_readings')
        .insert({
          user_id: user?.id,
          palm_image_url: palmImage,
          analysis_data: analysisData,
        })
        .select()
        .single();
      if (readingError) throw readingError;

      setPalmAnalysis(analysisData);
      setPalmReadingId(readingData.id);

      // Step 5: Finalizing
      setProgressStatus("Finished! Just a second...");
      await increaseProgress(100, undefined, 300);

      setTimeout(() => {
        setShowProgress(false);
        setCurrentStep('reading');
      }, 350);

      toast({
        title: "Reading Generated!",
        description: "Your personalized palm reading is ready.",
      });

    } catch (error: any) {
      setShowProgress(false);
      setProgress(0);
      setProgressStatus("");
      console.error('Error generating reading:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate reading. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setCurrentStep('welcome');
    setPalmImage(null);
    setUserProfile(null);
    setPalmAnalysis(null);
    setPalmReadingId(null);
    setShowLanding(true);
    setMobileMenuOpen(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleAuthBack = () => {
    setShowLanding(true);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-pulse" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page for non-authenticated users
  if (showLanding && !user) {
    return <Landing onGetStarted={handleGetStarted} />;
  }

  if (!user) {
    return <Auth onBack={handleAuthBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Mobile-friendly Header - Optimized */}
      <div className="relative z-10 p-3 md:p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
            <h1 className="text-lg md:text-2xl font-bold text-white">Palm AI</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-200 hover:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              {user.email}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-purple-200 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-purple-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Optimized */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-purple-200 px-2 py-1">
                <User className="w-4 h-4" />
                <span className="text-xs truncate">{user.email}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-purple-200 hover:text-white justify-start text-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-3 md:px-4 py-4 md:py-8">
        {currentStep === 'welcome' && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] md:min-h-[80vh] text-center px-2">
            <div className="mb-6 md:mb-8 animate-fade-in">
              <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-yellow-400 mx-auto mb-3 md:mb-4 animate-pulse" />
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                Welcome to Your Palm Journey
              </h2>
              <p className="text-base md:text-xl text-purple-200 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
                Discover the secrets hidden in your palm. Let AI unveil your destiny, 
                career potential, love life, and spiritual path through ancient palmistry wisdom.
              </p>
            </div>
            
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 max-w-sm md:max-w-md w-full">
              <CardContent className="p-4 md:p-6">
                <Button 
                  onClick={() => setCurrentStep('upload')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 md:py-4 text-base md:text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Camera className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Start Your Reading
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 'upload' && (
          <PalmUpload onImageUpload={handleImageUpload} />
        )}

        {currentStep === 'profile' && !showProgress && (
          <UserProfile onComplete={handleProfileComplete} />
        )}

        {currentStep === 'profile' && showProgress && (
          <PalmReadingProgress progress={Math.round(progress)} status={progressStatus} />
        )}

        {currentStep === 'reading' && palmAnalysis && (
          <PalmistryReport
            analysis={palmAnalysis}
            onChatStart={() => setCurrentStep('chat')}
          />
        )}

        {currentStep === 'chat' && (
          <ChatInterface
            palmAnalysis={palmAnalysis}
            userProfile={userProfile}
            palmReadingId={palmReadingId}
            onBack={() => setCurrentStep('reading')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
