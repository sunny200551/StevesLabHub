
import type { Subject, Program, Note, Syllabus, Material } from './types';
import programsData from './programs.json';
import materialsData from './materials.json';
import year1sem1 from './data/year-1/sem-1.json';
import year1sem2 from './data/year-1/sem-2.json';
import year2sem1 from './data/year-2/sem-1.json';
import year2sem2 from './data/year-2/sem-2.json';
import year3sem1 from './data/year-3/sem-1.json';
import year3sem2 from './data/year-3/sem-2.json';

const allYearSubjects = [
    ...year1sem1.subjects,
    ...year1sem2.subjects,
    ...year2sem1.subjects,
    ...year2sem2.subjects,
    ...year3sem1.subjects,
    ...year3sem2.subjects,
];

const subjectColorMap: Record<string, Subject['color']> = {
  '23A15501': 'speaking',
  '23A15301': 'cloud',
  '23A15101': 'ml',
  '23A11301': 'tinkering',
  '23A10501': 'fsd',
  '23A15502': 'speaking',
  '23A15302': 'cloud',
  '23A10302': 'tinkering',
  '23A10502': 'fsd',
  '23A15901': 'sfs',
  '23A25201': 'ai',
  '23A25101': 'ml',
  '23A22401': 'cn',
  '23A20302': 'tinkering',
  '23A20501': 'fsd',
  '23A25202': 'ai',
  '23A20501-it': 'ws',
  '23A22402': 'cn',
  '23A20503': 'fsd',
  '23A25902': 'sfs',
  '23A35105': 'ml',
  '23A35401a': 'spm',
  '23A30503': 'cn',
  '23A30504': 'fsd',
  '23A30505': 'ai',
  '23A30506': 'fsd',
  '23A30507': 'ai',
  '23A30502': 'fsd',
  '23A45102': 'ml',
  '23A40501': 'cn',
  '23A40502': 'spm',
  '23A40503': 'writing',
  '23A40504': 'cn',
  '23A40505': 'spm',
  '23A40506': 'fsd',
  '23A49901': 'tinkering',
  '23CS31T1': 'ai',
  '23CS31P1': 'ai',
  '23CS31T2': 'cn',
  '23CS31P2': 'cn',
  '23CS31T3': 'fsd',
  '23CS31E4': 'spm',
  '23AD31SC': 'fsd',
  '23ES31P1': 'tinkering',
  '23ES31T1': 'ai',
  '23CS32T1': 'ml',
  '23CS32P1': 'ml',
  '23CS32T3': 'cns',
  '23CS32P2': 'cns',
  '23CS32T2': 'cloud',
  '23CS32E2': 'cyber',
  '23CS32AC': 'writing',
  '23CS32SC': 'speaking',
};

const shortTitleMap: Record<string, string> = {
    '23A15501': 'English',
    '23A15301': 'Chemistry',
    '23A15101': 'Maths-I',
    '23A11301': 'BCME',
    '23A10501': 'C-Prog',
    '23A15502': 'Eng Lab',
    '23A15302': 'Chem Lab',
    '23A10302': 'Workshop',
    '23A10502': 'C-Prog Lab',
    '23A15901': 'Yoga',
    '23A25201': 'Physics',
    '23A25101': 'Maths-II',
    '23A22401': 'BEE',
    '23A20302': 'Graphics',
    '23A20501': 'DS',
    '23A25202': 'Physics Lab',
    '23A20501-it': 'IT Shop',
    '23A22402': 'BEE Shop',
    '23A20503': 'DS Lab',
    '23A25902': 'NSS/NCC',
    '23A35105': 'DMGT',
    '23A35401a': 'MEFA',
    '23A30503': 'DLCO',
    '23A30504': 'ADSA',
    '23A30505': 'JAVA',
    '23A30506': 'ADSA Lab',
    '23A30507': 'JAVA Lab',
    '23A30502': 'Python',
    '23A45102': 'P&S',
    '23A40501': 'OS',
    '23A40502': 'DBMS',
    '23A40503': 'SE',
    '23A40504': 'OS Lab',
    '23A40505': 'DBMS Lab',
    '23A40506': 'FSD',
    '23A49901': 'Design',
    '23CS31T1': 'AI',
    '23CS31P1': 'AI Lab',
    '23CS31T2': 'CN & IP',
    '23CS31P2': 'CN & IP Lab',
    '23CS31T3': 'ATCD',
    '23CS31E4': 'DMDW',
    '23AD31SC': 'FSD-II',
    '23ES31P1': 'Tinkering',
    '23ES31T1': 'Quantum',
    '23CS32T1': 'ML',
    '23CS32P1': 'ML Lab',
    '23CS32T3': 'CNS',
    '23CS32P2': 'CNS Lab',
    '23CS32T2': 'CC',
    '23CS32E2': 'CS',
    '23CS32AC': 'TRW & IPR',
    '23CS32SC': 'Soft Skills'
};


const subjectMap = new Map<string, Subject>();

allYearSubjects.forEach(s => {
    if (!subjectMap.has(s.id)) {
        subjectMap.set(s.id, {
            ...s,
            title: s.name,
            shortTitle: shortTitleMap[s.id] || s.short || s.name.split(' ')[0],
            description: s.short || '',
            color: subjectColorMap[s.id] || 'default',
        });
    }
});


export const subjects: Subject[] = Array.from(subjectMap.values());

export const programs: Program[] = programsData.programs.map(p => {
      const sub = subjectMap.get(p.subjectId);
      return {
        ...p,
        canRunInBrowser: p.language.toLowerCase() === 'html/css/js',
        year: sub?.year || 0,
        semester: sub?.semester || 0,
      };
  });

let noteIdCounter = 1;
export const notes: Note[] = (programsData.notes || []).map(n => {
    const matchingSubject = subjects.find(s => s.shortTitle.toLowerCase() === n.subject.toLowerCase() || s.title.toLowerCase().includes(n.subject.toLowerCase()));
    return {
        id: `note-${noteIdCounter++}`,
        title: n.title,
        subjectId: matchingSubject ? matchingSubject.id : 'tinkering-lab',
        type: n.type as 'PDF' | 'Link' | 'Document',
        url: n.url,
        year: matchingSubject?.year || 4,
        semester: matchingSubject?.semester || 1,
    };
});

export const syllabi: Syllabus[] = (programsData.syllabi || []).map(s => {
    const matchingSubject = subjects.find(subj => subj.id === s.subjectId);
    return {
        id: s.id,
        title: s.title,
        subjectId: s.subjectId,
        type: s.type as 'PDF' | 'Link',
        url: s.url,
        year: matchingSubject?.year || 1,
        semester: matchingSubject?.semester || 1,
    };
});

export const materials: Material[] = materialsData.materials.map(m => {
    const matchingSubject = subjects.find(s => s.id === m.subjectId);
    return {
        ...m,
        year: matchingSubject?.year || 4,
        semester: matchingSubject?.semester || 1,
    } as Material;
});
