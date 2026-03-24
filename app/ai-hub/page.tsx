
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cpu, Send, Sparkles, MessageSquare, History, Bookmark, Share2 } from "lucide-react";
import { aiTutorPersonalizedExplanation } from "@/ai/flows/ai-tutor-personalized-explanation";
import { aiTutorTopicSummarization } from "@/ai/flows/ai-tutor-topic-summarization";
import { aiTutorContentGeneration } from "@/ai/flows/ai-tutor-content-generation";
import { useToast } from "@/hooks/use-toast";

const initialFeed = [
  { id: 1, user: "Abdi Hassan", content: "Just finished the Machine Learning foundations! Anyone want to discuss neural network backpropagation?", time: "2m ago", topic: "AI foundations" },
  { id: 2, user: "Fartun Ali", content: "The new research paper on LLM safety is incredible. Highly recommend reading it in the Research section.", time: "15m ago", topic: "Research" },
  { id: 3, user: "Liban Omar", content: "Is anyone using Gemini for software architecture? Curious about best practices.", time: "1h ago", topic: "Gemini" }
];

export default function AIHubPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = async (type: 'explain' | 'summarize' | 'generate') => {
    if (!input.trim()) {
      toast({ title: "Error", description: "Please enter some text first.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setResult(null);
    try {
      if (type === 'explain') {
        const res = await aiTutorPersonalizedExplanation({ question: input });
        setResult(res.explanation);
      } else if (type === 'summarize') {
        const res = await aiTutorTopicSummarization({ text: input });
        setResult(res.summary);
      } else if (type === 'generate') {
        const res = await aiTutorContentGeneration({ prompt: input });
        setResult(res.generatedContent);
      }
    } catch (error) {
      toast({ title: "AI Error", description: "Something went wrong with the AI service. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left Side: AI Tutor Tool */}
        <div className="w-full md:w-2/3 space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold text-primary flex items-center gap-3">
              <Cpu className="w-10 h-10 text-secondary" />
              AI Learning Hub
            </h1>
            <p className="text-muted-foreground text-lg">Your sophisticated Gemini-powered tutor for personalized assistance.</p>
          </div>

          <Card className="border-none shadow-xl overflow-hidden bg-white">
            <CardHeader className="bg-primary text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-headline">Gemini AI Tutor</CardTitle>
                  <CardDescription className="text-primary-foreground/70">What would you like to learn today?</CardDescription>
                </div>
                <Sparkles className="w-8 h-8 text-secondary" />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <Textarea
                placeholder="Paste a complex topic, ask a question, or describe content you want to generate..."
                className="min-h-[150px] text-lg resize-none border-primary/20 focus-visible:ring-primary"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => handleAction('explain')} 
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explain Simply
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleAction('summarize')} 
                  disabled={isLoading}
                  className="border-primary text-primary"
                >
                  <History className="w-4 h-4 mr-2" />
                  Summarize Topic
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => handleAction('generate')} 
                  disabled={isLoading}
                  className="bg-secondary text-primary font-bold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Generate Practice
                </Button>
              </div>

              {result && (
                <div className="mt-8 p-6 bg-muted/50 rounded-2xl border-l-4 border-primary animate-in fade-in slide-in-from-bottom-2">
                  <h3 className="font-headline font-bold text-primary mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-secondary" />
                    Tutor Explanation:
                  </h3>
                  <div className="prose prose-primary max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {result}
                  </div>
                  <div className="flex gap-4 mt-6 pt-6 border-t border-muted">
                    <Button variant="ghost" size="sm" className="text-primary">
                      <Bookmark className="w-4 h-4 mr-2" /> Save to Profile
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary">
                      <Share2 className="w-4 h-4 mr-2" /> Share Result
                    </Button>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="mt-8 p-12 text-center animate-pulse">
                  <Cpu className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                  <p className="text-primary font-bold">Gemini is thinking...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Live Discussion Feed */}
        <div className="w-full md:w-1/3 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-headline font-bold text-primary flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-secondary" />
              Live Discussion
            </h2>
            <p className="text-sm text-muted-foreground">Real-time collaboration with fellow tech enthusiasts.</p>
          </div>

          <Card className="border-none shadow-lg h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Feed</CardTitle>
                <Badge variant="outline" className="animate-pulse bg-green-50 text-green-600 border-green-200">
                  LIVE
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <ScrollArea className="h-[450px] p-4">
                <div className="space-y-6">
                  {initialFeed.map((item) => (
                    <div key={item.id} className="space-y-2 pb-4 border-b last:border-0 border-muted">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-primary">{item.user}</span>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                      <Badge variant="secondary" className="text-[10px] bg-secondary/20 text-primary">
                        #{item.topic}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t mt-auto">
                <div className="flex gap-2">
                  <Textarea placeholder="Share an insight..." className="min-h-[40px] text-xs py-2 resize-none" />
                  <Button size="icon" className="shrink-0 bg-primary h-auto">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
