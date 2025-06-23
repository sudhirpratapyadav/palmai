import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  palmAnalysis: any;
  userProfile: any;
  palmReadingId: string | null;
  onBack?: () => void; // NEW: Add optional onBack prop
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  palmAnalysis,
  userProfile,
  palmReadingId,
  onBack, // NEW
}) => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSessionId, setChatSessionId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize when user is loaded and available
    if (!authLoading && user?.id) {
      console.log('User authenticated, initializing chat session...');
      initializeChatSession();
    } else if (!authLoading && !user) {
      console.error('No authenticated user found');
      setIsInitializing(false);
      toast({
        title: "Authentication Error",
        description: "Please log in to start a chat session.",
        variant: "destructive",
      });
    }
  }, [user, authLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeChatSession = async () => {
    if (!user?.id) {
      console.error('Cannot initialize chat: No user ID available');
      setIsInitializing(false);
      return;
    }

    try {
      console.log('Creating chat session for user:', user.id);
      console.log('Palm reading ID:', palmReadingId);

      // Create new chat session
      const { data: sessionData, error: sessionError } = await supabase
        .from('chat_sessions')
        .insert({
          user_id: user.id,
          palm_reading_id: palmReadingId,
          title: 'Palm Reading Chat',
        })
        .select()
        .single();

      if (sessionError) {
        console.error('Session creation error:', sessionError);
        throw sessionError;
      }

      console.log('Chat session created successfully:', sessionData);
      setChatSessionId(sessionData.id);

      // Add welcome message
      const welcomeMessage: Message = {
        id: '1',
        type: 'assistant',
        content: "Hello! I'm your Palm Vision guide. I've analyzed your palm and I'm here to provide personalized guidance. What would you like to know about your future? You can ask about career, relationships, health, or any specific life question!",
        timestamp: new Date()
      };

      setMessages([welcomeMessage]);

      // Save welcome message to database
      const { error: messageError } = await supabase.from('chat_messages').insert({
        chat_session_id: sessionData.id,
        user_id: user.id,
        message_type: 'assistant',
        content: welcomeMessage.content,
      });

      if (messageError) {
        console.error('Welcome message error:', messageError);
        // Don't throw here - the chat can still work without saving the welcome message
      }

    } catch (error: any) {
      console.error('Error initializing chat:', error);
      toast({
        title: "Chat Initialization Error",
        description: `Failed to initialize chat session. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatSessionId || !user?.id) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Save user message to database
      const { error: saveError } = await supabase.from('chat_messages').insert({
        chat_session_id: chatSessionId,
        user_id: user.id,
        message_type: 'user',
        content: userMessage.content,
      });

      if (saveError) {
        console.error('Error saving user message:', saveError);
      }

      // Get chat history for context
      const { data: chatHistory } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_session_id', chatSessionId)
        .order('created_at', { ascending: true });

      // Get AI response
      const response = await supabase.functions.invoke('chat-with-ai', {
        body: {
          message: userMessage.content,
          palmAnalysis,
          userProfile,
          chatHistory,
        },
      });

      if (response.error) {
        console.error('AI response error:', response.error);
        throw response.error;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Save AI response to database
      const { error: aiSaveError } = await supabase.from('chat_messages').insert({
        chat_session_id: chatSessionId,
        user_id: user.id,
        message_type: 'assistant',
        content: botMessage.content,
      });

      if (aiSaveError) {
        console.error('Error saving AI message:', aiSaveError);
      }

    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Message Error",
        description: `Failed to send message: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "What does my career future look like?",
    "When will I find true love?",
    "What are my spiritual gifts?",
    "How can I improve my health?"
  ];

  // Show loading while authentication is still loading
  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Personal Guidance Chat
          </h2>
          <p className="text-purple-200 mb-8">
            Loading your session...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error if no user after loading
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-purple-200 mb-8">
            Please log in to start a chat session.
          </p>
        </div>
      </div>
    );
  }

  if (isInitializing) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Personal Guidance Chat
          </h2>
          <p className="text-purple-200 mb-8">
            Initializing your chat session...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Back Button */}
      {onBack && (
        <div className="mb-4 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-purple-300 hover:text-white flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reading
          </Button>
        </div>
      )}

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          Personal Guidance Chat
        </h2>
        <p className="text-purple-200">
          Ask me anything about your future, based on your palm reading
        </p>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20 h-96 flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white/20 text-purple-100 border border-white/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.type === 'assistant' ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.type === 'assistant' ? 'Palm Guide' : 'You'}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/20 border border-white/30 px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-300" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      <div className="mt-4 space-y-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me about your future..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder-purple-300"
            disabled={!chatSessionId}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping || !chatSessionId}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => setInputValue(question)}
              className="text-left justify-start border-purple-400/30 text-purple-200 hover:bg-purple-400/10 text-sm"
              disabled={!chatSessionId}
            >
              <Sparkles className="w-3 h-3 mr-2" />
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
