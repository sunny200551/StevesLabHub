
"use client"

import React, { useState } from 'react';
import { Program, Subject } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Terminal, Copy, Check, Play, X, Sparkles, BrainCircuit, Loader2, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type ProgramDetailClientProps = {
    program: Program;
    subject?: Subject;
};

const subjectColorClasses: Record<string, string> = {
    ai: "bg-subject-ai/10 text-subject-ai border-subject-ai/20",
    fsd: "bg-subject-fsd/10 text-subject-fsd border-subject-fsd/20",
    cn: "bg-subject-cn/10 text-subject-cn border-subject-cn/20",
    tinkering: "bg-subject-tinkering/10 text-subject-tinkering/20",
    spm: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    cyber: "bg-red-500/10 text-red-500 border-red-500/20",
    cloud: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    ml: "bg-green-500/10 text-green-500 border-green-500/20",
    writing: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    speaking: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    cns: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    ws: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    sfs: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    mpmc: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    atcd: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
    ooad: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    default: "bg-slate-500/10 text-slate-500 border-slate-500/20",
};

export function ProgramDetailClient({ program, subject }: ProgramDetailClientProps) {
    const [isRunModalOpen, setIsRunModalOpen] = useState(false);
    const { isCopied, copy } = useCopyToClipboard();
    const { toast } = useToast();

    const handleCopy = () => {
        copy(program.code);
        toast({
            title: "Copied to clipboard!",
            description: "The code has been successfully copied.",
        });
    };

    return (
        <>
            <Card className="overflow-hidden rounded-2xl border">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {subject && (
                                <Badge className={cn("font-semibold", subjectColorClasses[subject.color || 'default'])}>
                                    {subject.shortTitle}
                                </Badge>
                            )}
                            <Badge variant="outline">{program.language}</Badge>
                        </div>
                    </div>
                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{program.title}</h1>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {program.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="p-6">
                    <h2 className="flex items-center text-lg font-semibold">
                        <Terminal className="mr-3 h-5 w-5 text-muted-foreground" />
                        Problem / Aim
                    </h2>
                    <p className="mt-3 text-muted-foreground prose dark:prose-invert max-w-none">{program.aim}</p>
                </div>

                <Separator />

                <div className="p-6">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <h2 className="text-lg font-semibold">Code</h2>
                        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
                            <Button variant="secondary" onClick={handleCopy} className="w-full sm:w-auto">
                                {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                                {isCopied ? 'Copied!' : 'Copy Code'}
                            </Button>
                            {program.canRunInBrowser && (
                                <Button onClick={() => setIsRunModalOpen(true)} className="w-full sm:w-auto">
                                    <Play className="mr-2 h-4 w-4" />
                                    Run
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-code-bg p-4 font-code">
                        <div className="mb-2 flex items-center gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <pre className="overflow-x-auto py-2 text-sm text-white/80"><code>{program.code}</code></pre>
                    </div>

                    {!program.canRunInBrowser && (
                        <p className="mt-3 text-sm italic text-muted-foreground">
                            This program cannot be run in a local {program.language} environment.
                        </p>
                    )}
                </div>
            </Card>
            
            <Dialog open={isRunModalOpen} onOpenChange={setIsRunModalOpen}>
                <DialogContent className="max-w-5xl h-[80vh] p-0 animate-scale-in">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle>Run: {program.title}</DialogTitle>
                         <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state-open]:text-muted-foreground">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                    </DialogHeader>
                    <div className="h-full w-full">
                        <iframe
                          srcDoc={program.code}
                          title="Code Runner"
                          sandbox="allow-scripts allow-modals"
                          className="h-full w-full border-0"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
