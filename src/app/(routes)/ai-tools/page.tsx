
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Bot, Loader2, Lightbulb, Bug, Wrench } from 'lucide-react';
import { explainCode, type ExplainCodeOutput } from '@/ai/flows/explain-code-flow';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function CodeExplainerPage() {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState<ExplainCodeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input Error',
        description: 'Please enter some code to explain.',
      });
      return;
    }

    setIsLoading(true);
    setExplanation(null);

    try {
      const result = await explainCode({ code });
      setExplanation(result);
    } catch (error) {
      console.error('Failed to explain code:', error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Could not generate an explanation at this time.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const ExplanationSection = ({ title, content, icon, defaultOpen = false }: { title: string; content: string; icon: React.ReactNode, defaultOpen?: boolean }) => (
    <AccordionItem value={title}>
      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
        <div className="flex items-center gap-3">
          {icon}
          {title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
        <ReactMarkdown>{content}</ReactMarkdown>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-3 mb-2">
              <Bot className="h-10 w-10 text-primary" />
              <CardTitle className="text-4xl font-extrabold">AI Code Explainer</CardTitle>
            </div>
            <CardDescription className="text-lg">
              Paste any code snippet below and let our AI tutor explain it to you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <Textarea
                placeholder="Enter your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[200px] font-code text-sm bg-muted/50 focus:bg-background transition-colors"
                disabled={isLoading}
              />
              <Button onClick={handleSubmit} disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Explanation...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explain Code
                  </>
                )}
              </Button>
            </div>

            <AnimatePresence>
              {explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10"
                >
                  <Card className="bg-card border">
                     <CardContent className="p-6">
                        <Accordion type="multiple" defaultValue={["High-Level Explanation"]}>
                          <ExplanationSection 
                            title="High-Level Explanation" 
                            content={explanation.highLevelExplanation}
                            icon={<Lightbulb className="h-5 w-5 text-yellow-500" />}
                            defaultOpen
                          />
                           <ExplanationSection 
                            title="Line-by-Line Breakdown" 
                            content={explanation.lineByLineExplanation}
                            icon={<Sparkles className="h-5 w-5 text-primary" />}
                          />
                          <ExplanationSection 
                            title="Suggested Improvements" 
                            content={explanation.improvements}
                            icon={<Wrench className="h-5 w-5 text-green-500" />}
                          />
                          <ExplanationSection 
                            title="Potential Bugs & Edge Cases" 
                            content={explanation.potentialBugs}
                            icon={<Bug className="h-5 w-5 text-red-500" />}
                          />
                        </Accordion>
                     </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
