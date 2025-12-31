
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
  ai: 'from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:border-blue-500/40 text-blue-500',
  fsd: 'from-purple-500/10 to-purple-500/5 border-purple-500/20 hover:border-purple-500/40 text-purple-500',
  cn: 'from-orange-500/10 to-orange-500/5 border-orange-500/20 hover:border-orange-500/40 text-orange-500',
  tinkering: 'from-pink-500/10 to-pink-500/5 border-pink-500/20 hover:border-pink-500/40 text-pink-500',
  spm: 'from-indigo-500/10 to-indigo-500/5 border-indigo-500/20 hover:border-indigo-500/40 text-indigo-500',
  cyber: 'from-red-500/10 to-red-500/5 border-red-500/20 hover:border-red-500/40 text-red-500',
  cloud: 'from-sky-500/10 to-sky-500/5 border-sky-500/20 hover:border-sky-500/40 text-sky-500',
  ml: 'from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/40 text-green-500',
  writing: 'from-yellow-500/10 to-yellow-500/5 border-yellow-500/20 hover:border-yellow-500/40 text-yellow-500',
  speaking: 'from-amber-500/10 to-amber-500/5 border-amber-500/20 hover:border-amber-500/40 text-amber-500',
  cns: 'from-rose-500/10 to-rose-500/5 border-rose-500/20 hover:border-rose-500/40 text-rose-500',
  ws: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40 text-cyan-500',
  sfs: 'from-teal-500/10 to-teal-500/5 border-teal-500/20 hover:border-teal-500/40 text-teal-500',
  mpmc: 'from-lime-500/10 to-lime-500/5 border-lime-500/20 hover:border-lime-500/40 text-lime-500',
  atcd: 'from-violet-500/10 to-violet-500/5 border-violet-500/20 hover:border-violet-500/40 text-violet-500',
  ooad: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40 text-emerald-500',
  default: 'from-slate-500/10 to-slate-500/5 border-slate-500/20 hover:border-slate-500/40 text-slate-500',
};

const iconBgClasses: Record<string, string> = {
    ai: 'bg-blue-500/10', fsd: 'bg-purple-500/10', cn: 'bg-orange-500/10', tinkering: 'bg-pink-500/10',
    spm: 'bg-indigo-500/10', cyber: 'bg-red-500/10', cloud: 'bg-sky-500/10', ml: 'bg-green-500/10',
    writing: 'bg-yellow-500/10', speaking: 'bg-amber-500/10', cns: 'bg-rose-500/10', ws: 'bg-cyan-500/10',
    sfs: 'bg-teal-500/10', mpmc: 'bg-lime-500/10', atcd: 'bg-violet-500/10', ooad: 'bg-emerald-500/10',
    default: 'bg-slate-500/10',
};


export function SubjectCard({ subject, programCount }: SubjectCardProps) {
  const safeColor = subject.color || 'default';
  
  return (
    <Link 
      href={`/subjects/${subject.id}?year=${subject.year}&sem=${subject.semester}`}
      className={cn(
        "group relative flex h-full w-full flex-col rounded-2xl border-2 bg-gradient-to-br p-4 text-left transition-all duration-300 dark:border-border/50 dark:hover:shadow-glow-primary md:rounded-xl md:p-5 md:shadow-sm md:hover:-translate-y-1 md:[&_h3]:text-lg md:[&_h3]:font-bold",
        "dark:md:from-card dark:md:to-card dark:md:border dark:md:border-border dark:md:text-foreground dark:md:hover:border-primary dark:md:hover:bg-primary/5",
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
            <h3 className="text-base font-bold text-foreground transition-colors md:group-hover:text-primary dark:md:group-hover:text-primary">{subject.title}</h3>
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
