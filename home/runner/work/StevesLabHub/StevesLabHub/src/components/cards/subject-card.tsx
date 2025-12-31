
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
  ws: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 hover:border-indigo-500/60 text-indigo-500 dark:hover:shadow-glow-ws',
  sfs: 'from-teal-500/20 to-teal-500/5 border-teal-500/30 hover:border-teal-500/60 text-teal-500 dark:hover:shadow-glow-sfs',
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
    ws: 'bg-indigo-500/10',
    sfs: 'bg-teal-500/10',
    default: 'bg-slate-500/10',
};


export function SubjectCard({ subject, programCount }: SubjectCardProps) {
  const safeColor = subject.color || 'default';
  
  return (
    <Link 
      href={`/subjects/${subject.id}?year=${subject.year}&sem=${subject.semester}`}
      className={cn(
        "group relative flex flex-col w-full rounded-xl border p-4 text-left transition-all duration-300 md:rounded-2xl md:p-5 md:shadow-sm md:hover:-translate-y-1",
        "dark:md:from-card dark:md:to-card dark:md:border dark:md:border-border dark:md:text-foreground dark:md:hover:border-primary dark:md:hover:bg-primary/5",
        "dark:border-border/50 dark:hover:shadow-glow-primary", // Mobile dark glow
        colorClasses[safeColor]
      )}
    >
        <div className="flex items-start justify-between">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg md:h-12 md:w-12 md:rounded-xl", iconBgClasses[safeColor], "dark:md:bg-primary/10 dark:md:text-primary")}>
                {iconMap[safeColor] || iconMap.default}
            </div>
            <div className='flex items-center gap-2'>
                <Badge variant="outline" className="border-current/30 bg-current/10 text-xs text-current dark:md:border-border dark:md:bg-secondary dark:md:text-secondary-foreground">R-23</Badge>
                {subject.hasLab && (
                    <Badge variant="outline" className="whitespace-nowrap border-accent-foreground/30 bg-accent/80 text-xs text-accent-foreground dark:md:border-border dark:md:bg-secondary dark:md:text-secondary-foreground">
                        {subject.isLabOnly ? "Lab" : "Lab+Theory"}
                    </Badge>
                )}
            </div>
        </div>
      
        <div className="mt-3 flex-grow md:mt-4">
            <h3 className="text-base font-bold text-foreground transition-colors md:text-lg md:group-hover:text-primary dark:md:group-hover:text-primary">{subject.title}</h3>
            <p className="mt-1 min-h-[30px] flex-grow text-xs text-muted-foreground md:min-h-[40px] md:text-sm">{subject.description}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-foreground">
            <span>{subject.hasLab ? 'View Content' : 'View Materials'}</span>
             {subject.hasLab && programCount > 0 && (
                <Badge className="border-primary/20 bg-primary/10 text-primary">
                    {programCount} Programs
                </Badge>
            )}
        </div>
    </Link>
  );
}
