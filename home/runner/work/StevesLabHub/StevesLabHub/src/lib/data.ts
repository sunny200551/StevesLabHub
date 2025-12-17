
import type { Subject, Program, Note, Syllabus, Material } from './types';
import programsData from './programs.json';
import materialsData from './materials.json';
import year1sem1 from './data/year-1/sem-1.json';
import year1sem2 from './data/year-1/sem-2.json';
import year2sem1 from './data/year-2/sem-1.json';
import year2sem2 from './data/year-2/sem-2.json';
import year3sem1 from './data/year-3/sem-1.json';
import year3sem2 from './data/year-3/sem-2.json';

// Create a structure for year 4, even if empty
const year4sem1 = { subjects: [] };
const year4sem2 = { subjects: [] };


type SemesterData = {
    subjects: any[];
};

const allSemesters: { year: number; semester: number; data: SemesterData }[] = [
    { year: 1, semester: 1, data: year1sem1 },
    { year: 1, semester: 2, data: year1sem2 },
    { year: 2, semester: 1, data: year2sem1 },
    { year: 2, semester: 2, data: year2sem2 },
    { year: 3, semester: 1, data: year3sem1 },
    { year: 3, semester: 2, data: year3sem2 },
    { year: 4, semester: 1, data: year4sem1 },
    { year: 4, semester: 2, data: year4sem2 },
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
  '23CS32T1': 'ml', // ML
  '23CS32P1': 'ml', // ML Lab
  '23CS32T3': 'cns', // CNS
  '23CS32P2': 'cns', // CNS Lab
  '23CS32T2': 'cloud', // CC
  '23CS32E2': 'cyber', // CS
  '23CS32AC': 'writing', // TRW & IPR
  '23CS32SC': 'speaking', // Soft Skills
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

const finalSubjects: Subject[] = [];
const finalPrograms: Program[] = [];
const finalMaterials: Material[] = [];
const finalSyllabi: Syllabus[] = [];
const finalNotes: Note[] = [];

allSemesters.forEach(sem => {
    sem.data.subjects.forEach(s => {
        const subject: Subject = {
            id: s.id,
            title: s.name,
            shortTitle: shortTitleMap[s.id] || s.short || s.name.split(' ')[0],
            description: s.short || '',
            color: subjectColorMap[s.id] || 'default',
            hasLab: s.hasLab,
            isLabOnly: s.isLabOnly,
            year: sem.year,
            semester: sem.semester,
        };
        finalSubjects.push(subject);

        if (s.programs) {
            s.programs.forEach((p: any) => {
                finalPrograms.push({
                    ...p,
                    subjectId: s.id,
                    canRunInBrowser: p.language.toLowerCase() === 'html/css/js',
                    aim: p.problem,
                    year: sem.year,
                    semester: sem.semester,
                });
            });
        }
    });
});


// Process materials from materials.json and assign them to correct subjects
materialsData.materials.forEach(m => {
    const matchingSubject = finalSubjects.find(s => s.id === m.subjectId);
    if (matchingSubject) {
        finalMaterials.push({
            ...m,
            year: matchingSubject.year,
            semester: matchingSubject.semester,
        } as Material);
    }
});

// Process syllabi from programs.json and assign them
let syllabusIdCounter = 1;
(programsData.syllabi || []).forEach(s => {
    const matchingSubject = finalSubjects.find(subj => subj.id === s.subjectId);
    if (matchingSubject) {
        finalSyllabi.push({
            id: s.id || `syllabus-${syllabusIdCounter++}`,
            title: s.title,
            subjectId: s.subjectId,
            type: s.type as 'PDF' | 'Link',
            url: s.url,
            year: matchingSubject.year,
            semester: matchingSubject.semester,
        });
    }
});

// Process notes from programs.json and assign them
let noteIdCounter = 1;
(programsData.notes || []).forEach(n => {
    const matchingSubject = finalSubjects.find(s => s.shortTitle.toLowerCase() === n.subject.toLowerCase() || s.title.toLowerCase().includes(n.subject.toLowerCase()));
    if(matchingSubject) {
        finalNotes.push({
            id: `note-${noteIdCounter++}`,
            title: n.title,
            subjectId: matchingSubject.id,
            type: n.type as 'PDF' | 'Link' | 'Document',
            url: n.url,
            year: matchingSubject.year,
            semester: matchingSubject.semester,
        });
    }
});


export const subjects: Subject[] = finalSubjects;
export const programs: Program[] = finalPrograms;
export const materials: Material[] = finalMaterials;
export const syllabi: Syllabus[] = finalSyllabi;
export const notes: Note[] = finalNotes;
