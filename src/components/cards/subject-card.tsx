
import Link from 'next/link';
import type { Subject } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Bot, Code, Network, Wrench, BookOpen, ShieldCheck, Cloud, BrainCircuit, PenTool, Mic, KeyRound, Presentation, Hand, FileQuestion, Cpu, Binary, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type SubjectCardProps = {
  subject: Subject;
  programCount: number;
};

const iconMap: Record<string, React.ReactNode> = {
  ai: <Bot size={28} />,
  fsd: <Code size={28} />,
  cn: <Network size={28} />,
  tinkering: <Wrench size={28} />,
  spm: <BookOpen size={28} />,
  cyber: <ShieldCheck size={28} />,
  cloud: <Cloud size={28} />,
  ml: <BrainCircuit size={28} />,
  writing: <PenTool size={28} />,
  speaking: <Mic size={28} />,
  cns: <KeyRound size={28} />,
  ws: <Presentation size={28} />,
  sfs: <Hand size={28} />,
  mpmc: <Cpu size={28} />,
  atcd: <Binary size={28} />,
  ooad: <Layers size={28} />,
  default: <FileQuestion size={28} />,
};

const colorClasses: Record<string, string> = {
  ai: 'from-subject-ai/20 to-subject-ai/5 border-subject-ai/30 hover:border-subject-ai/60 text-subject-ai dark:hover:shadow-glow-ai',
  fsd: 'from-subject-fsd/20 to-subject-fsd/5 border-subject-fsd/30 hover:border-subject-fsd/60 text-subject-fsd dark:hover:shadow-glow-fsd',
  cn: 'from-subject-cn/20 to-subject-cn/5 border-subject-cn/30 hover:border-subject-cn/60 text-subject-cn dark:hover:shadow-glow-cn',
  tinkering: 'from-subject-tinkering/20 to-subject-tinkering/5 border-subject-tinkering/30 hover:border-subject-tinkering/60 text-subject-tinkering dark:hover:shadow-glow-tinkering',
  spm: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-500/60 text-purple-500 dark:hover:shadow-glow-spm',
  cyber: 'from-red-500/20 to-red-500/5 border-red-500/30 hover:border-red-500/60 text-red-500 dark:hover:shadow-glow-cyber',
  cloud: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-500/60 text-blue-500 dark:hover:shadow-glow-cloud',
  ml: 'from-green-500/20 to-green-500/5 border-green-500/30 hover:border-green-500/60 text-green-500 dark:hover:shadow-glow-ml',
  writing: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 hover:border-yellow-500/60 text-yellow-500 dark:hover:shadow-glow-writing',
  speaking: 'from-orange-500/20 to-orange-500/5 border-orange-500/30 hover:border-orange-500/60 text-orange-500 dark:hover:shadow-glow-speaking',
  cns: 'from-pink-500/20 to-pink-500/5 border-pink-500/30 hover:border-pink-500/60 text-pink-500 dark:hover:shadow-glow-cns',
  mpmc: 'from-lime-500/20 to-lime-500/5 border-lime-500/30 hover:border-lime-500/60 text-lime-500 dark:hover:shadow-glow-mpmc',
  atcd: 'from-violet-500/20 to-violet-500/5 border-violet-500/30 hover:border-violet-500/60 text-violet-500 dark:hover:shadow-glow-atcd',
  ooad: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/60 text-emerald-500 dark:hover:shadow-glow-ooad',
  default: 'from-slate-500/20 to-slate-500/5 border-slate-500/30 hover:border-slate-500/60 text-slate-500',
};

const iconBgClasses: Record<string, string> = {
    ai: 'bg-subject-ai/10',
    fsd: 'bg-subject-fsd/10',
    cn: 'bg-subject-cn/10',
    tinkering: 'bg-subject-tinkering/10',
    spm: 'bg-purple-500/10',
    cyber: 'bg-red-500/10',
    cloud: 'bg-blue-500/10',
    ml: 'bg-green-500/10',
    writing: 'bg-yellow-500/10',
    speaking: 'bg-orange-500/10',
    cns: 'bg-pink-500/10',
    mpmc: 'bg-lime-500/10',
    atcd: 'bg-violet-500/10',
    ooad: 'bg-emerald-500/10',
    default: 'bg-slate-500/10',
};

export function SubjectCard({ subject, programCount }: SubjectCardProps) {
  const safeColor = subject.color || 'default';
  
  return (
    <Link 
      href={`/subjects/${subject.id}?year=${subject.year}&sem=${subject.semester}`}
      className={cn(
        "group relative flex flex-col w-full rounded-2xl border-2 bg-gradient-to-br p-4 text-left transition-all duration-300",
        "md:p-5 md:hover:-translate-y-1",
        colorClasses[safeColor],
        "dark:md:from-card dark:md:to-card dark:md:border dark:md:border-border dark:md:text-foreground dark:md:hover:border-primary dark:md:hover:bg-primary/5 dark:hover:shadow-none"
      )}
      style={{'--glow-color': `hsl(var(--subject-${safeColor}))`} as React.CSSProperties}
    >
        <div className="flex justify-between items-start">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl", 
              iconBgClasses[safeColor],
              "dark:text-primary dark:md:text-current",
              "dark:bg-primary/10 dark:md:bg-inherit"
            )}>
                {iconMap[safeColor] || iconMap.default}
            </div>
            <div className='flex flex-col items-end gap-2'>
                <Badge variant="outline" className="border-current/30 bg-current/10 text-current dark:md:border-border dark:md:bg-secondary dark:md:text-secondary-foreground text-xs px-2">R-23</Badge>
                {subject.hasLab && (
                    <Badge variant="outline" className="border-accent-foreground/30 bg-accent/80 text-accent-foreground dark:md:border-border dark:md:bg-secondary dark:md:text-secondary-foreground text-xs px-2 whitespace-nowrap">
                        {subject.isLabOnly ? "Lab" : "Lab+Theory"}
                    </Badge>
                )}
            </div>
        </div>
      
        <div className="flex-grow mt-4">
            <h3 className="text-base font-bold text-foreground transition-colors md:text-lg group-hover:text-primary">{subject.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground flex-grow min-h-[36px] md:min-h-[40px]">{subject.description}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-foreground">
            <span className="md:text-base">{subject.hasLab ? 'View Content' : 'View Materials'}</span>
             {subject.hasLab && programCount > 0 && (
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs md:text-sm">
                    {programCount} Programs
                </Badge>
            )}
        </div>
    </Link>
  );
}
