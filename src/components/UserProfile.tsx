
import React, { useState } from 'react';
import { User, Calendar, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserProfileProps {
  onComplete: (profile: any) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onComplete }) => {
  const [profile, setProfile] = useState({
    dateOfBirth: '',
    handPreference: '',
    gender: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(profile);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Tell Us About Yourself
        </h2>
        <p className="text-purple-200">
          This information helps us provide a more personalized reading
        </p>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-center flex items-center justify-center gap-2">
            <User className="w-6 h-6" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-purple-200 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date of Birth (Optional)
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                className="bg-white/5 border-purple-400/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="handPreference" className="text-purple-200 flex items-center gap-2">
                <Hand className="w-4 h-4" />
                Which hand did you photograph? *
              </Label>
              <Select 
                value={profile.handPreference} 
                onValueChange={(value) => setProfile({ ...profile, handPreference: value })}
                required
              >
                <SelectTrigger className="bg-white/5 border-purple-400/30 text-white">
                  <SelectValue placeholder="Select your hand" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-400/30">
                  <SelectItem value="left" className="text-white hover:bg-purple-800">Left Hand</SelectItem>
                  <SelectItem value="right" className="text-white hover:bg-purple-800">Right Hand</SelectItem>
                  <SelectItem value="both" className="text-white hover:bg-purple-800">Both Hands</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-purple-200">
                Gender (Optional)
              </Label>
              <Select 
                value={profile.gender} 
                onValueChange={(value) => setProfile({ ...profile, gender: value })}
              >
                <SelectTrigger className="bg-white/5 border-purple-400/30 text-white">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-400/30">
                  <SelectItem value="male" className="text-white hover:bg-purple-800">Male</SelectItem>
                  <SelectItem value="female" className="text-white hover:bg-purple-800">Female</SelectItem>
                  <SelectItem value="other" className="text-white hover:bg-purple-800">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say" className="text-white hover:bg-purple-800">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-purple-900/30 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Why we ask:</h3>
              <ul className="text-purple-200 text-sm space-y-1">
                <li>• Hand preference affects palm reading interpretation</li>
                <li>• Age and gender can influence palm characteristics</li>
                <li>• All information is kept private and secure</li>
                <li>• You can skip optional fields if preferred</li>
              </ul>
            </div>

            <Button
              type="submit"
              disabled={!profile.handPreference}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
            >
              Generate My Palm Reading
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
