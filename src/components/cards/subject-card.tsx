
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
  ai: 'dark:from-subject-ai/10 dark:to-subject-ai/5 border-subject-ai/20 dark:hover:border-subject-ai/40 text-subject-ai dark:hover:shadow-glow-ai',
  fsd: 'dark:from-subject-fsd/10 dark:to-subject-fsd/5 border-subject-fsd/20 dark:hover:border-subject-fsd/40 text-subject-fsd dark:hover:shadow-glow-fsd',
  cn: 'dark:from-subject-cn/10 dark:to-subject-cn/5 border-subject-cn/20 dark:hover:border-subject-cn/40 text-subject-cn dark:hover:shadow-glow-cn',
  tinkering: 'dark:from-subject-tinkering/10 dark:to-subject-tinkering/5 border-subject-tinkering/20 dark:hover:border-subject-tinkering/40 text-subject-tinkering dark:hover:shadow-glow-tinkering',
  spm: 'dark:from-indigo-500/10 dark:to-indigo-500/5 border-indigo-500/20 dark:hover:border-indigo-500/40 text-indigo-500 dark:hover:shadow-glow-spm',
  cyber: 'dark:from-red-500/10 dark:to-red-500/5 border-red-500/20 dark:hover:border-red-500/40 text-red-500 dark:hover:shadow-glow-cyber',
  cloud: 'dark:from-sky-500/10 dark:to-sky-500/5 border-sky-500/20 dark:hover:border-sky-500/40 text-sky-500 dark:hover:shadow-glow-cloud',
  ml: 'dark:from-green-500/10 dark:to-green-500/5 border-green-500/20 dark:hover:border-green-500/40 text-green-500 dark:hover:shadow-glow-ml',
  writing: 'dark:from-yellow-500/10 dark:to-yellow-500/5 border-yellow-500/20 dark:hover:border-yellow-500/40 text-yellow-500 dark:hover:shadow-glow-writing',
  speaking: 'dark:from-amber-500/10 dark:to-amber-500/5 border-amber-500/20 dark:hover:border-amber-500/40 text-amber-500 dark:hover:shadow-glow-speaking',
  cns: 'dark:from-rose-500/10 dark:to-rose-500/5 border-rose-500/20 dark:hover:border-rose-500/40 text-rose-500 dark:hover:shadow-glow-cns',
  mpmc: 'dark:from-lime-500/10 dark:to-lime-500/5 border-lime-500/20 dark:hover:border-lime-500/40 text-lime-500 dark:hover:shadow-glow-mpmc',
  atcd: 'dark:from-violet-500/10 dark:to-violet-500/5 border-violet-500/20 dark:hover:border-violet-500/40 text-violet-500 dark:hover:shadow-glow-atcd',
  ooad: 'dark:from-emerald-500/10 dark:to-emerald-500/5 border-emerald-500/20 dark:hover:border-emerald-500/40 text-emerald-500 dark:hover:shadow-glow-ooad',
  default: 'dark:from-slate-500/10 dark:to-slate-500/5 border-slate-500/20 dark:hover:border-slate-500/40 text-slate-500',
};

const iconBgClasses: Record<string, string> = {
    ai: 'bg-subject-ai/10', fsd: 'bg-subject-fsd/10', cn: 'bg-subject-cn/10', tinkering: 'bg-subject-tinkering/10',
    spm: 'bg-indigo-500/10', cyber: 'bg-red-500/10', cloud: 'bg-sky-500/10', ml: 'bg-green-500/10',
    writing: 'bg-yellow-500/10', speaking: 'bg-amber-500/10', cns: 'bg-rose-500/10',
    mpmc: 'bg-lime-500/10', atcd: 'bg-violet-500/10', ooad: 'bg-emerald-500/10',
    default: 'bg-slate-500/10',
};


export function SubjectCard({ subject, programCount }: SubjectCardProps) {
  const safeColor = subject.color || 'default';
  
  return (
    <Link 
      href={`/subjects/${subject.id}?year=${subject.year}&sem=${subject.semester}`}
      className={cn(
        "group relative flex flex-col w-full rounded-2xl p-4 text-left transition-all duration-300",
        "bg-card border-2 border-border/10 shadow-lg",
        // Desktop overrides
        "md:p-5 md:bg-gradient-to-br md:shadow-none md:hover:-translate-y-1",
        "md:from-card md:to-card md:border md:border-border",
        // The following classes are for the DESKTOP dark theme, mobile will just use its own --primary
        "dark:md:from-card dark:md:to-card dark:md:border-border/50 dark:md:hover:border-primary dark:md:hover:bg-primary/5 dark:hover:shadow-none",
        colorClasses[safeColor]
      )}
      style={{'--glow-color': `hsl(var(--subject-${safeColor}))`} as React.CSSProperties}
    >
        <div className="flex justify-between items-start">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl", 
              iconBgClasses[safeColor],
              // On desktop, the icon uses the specific subject color. On mobile, it uses the primary (green) theme color.
              "md:bg-inherit", // Reset background for desktop so gradient/color classes take over
              "dark:text-primary dark:md:text-current", // Mobile icon text is primary, desktop is current subject color
              "dark:bg-primary/10 dark:md:bg-transparent" // Mobile icon bg is primary, desktop is transparent
            )}>
                {iconMap[safeColor] || iconMap.default}
            </div>
            <div className='flex items-center gap-2'>
                <Badge variant="outline" className="border-border/30 bg-secondary text-secondary-foreground text-xs">R-23</Badge>
                {subject.hasLab && (
                    <Badge variant="outline" className="border-border/30 bg-secondary text-secondary-foreground text-xs">
                        {subject.isLabOnly ? "Lab" : "Lab+Theory"}
                    </Badge>
                )}
            </div>
        </div>
      
        <div className="flex-grow mt-4">
            <h3 className="text-base font-bold text-foreground transition-colors md:text-lg group-hover:text-primary">{subject.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground flex-grow min-h-[36px] md:min-h-[40px]">{subject.description}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-foreground md:text-base">
            <span>{subject.hasLab ? 'View Content' : 'View Materials'}</span>
             {subject.hasLab && programCount > 0 && (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                    {programCount} Programs
                </Badge>
            )}
        </div>
    </Link>
  );
}
