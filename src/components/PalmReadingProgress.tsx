
import React from "react";
import { Progress } from "@/components/ui/progress";

interface PalmReadingProgressProps {
  progress: number;
  status: string;
}

const statusColors = [
  "from-purple-600 to-pink-600",
  "from-blue-600 to-purple-600",
  "from-pink-600 to-yellow-400"
];

const PalmReadingProgress: React.FC<PalmReadingProgressProps> = ({
  progress,
  status,
}) => (
  <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto animate-fade-in">
    <div className="mb-4 text-xl font-bold text-white">
      {status}
    </div>
    <div className="w-full mb-4">
      <Progress
        value={progress}
        className="h-4 bg-purple-600/20"
        style={{
          background:
            "linear-gradient(to right, #a78bfa, #ec4899)",
        }}
      />
    </div>
    <div className="text-xs text-purple-200">{progress}%</div>
  </div>
);

export default PalmReadingProgress;
