
import type { Subject, Program, Material } from './types';
import materialsData from './materials.json';

// Year 3, Semester 1
import y3s1_23AD31SC_sub from './data/year-3/sem-1/23AD31SC/subject.json';
import y3s1_23AD31SC_prog from './data/year-3/sem-1/23AD31SC/programs.json';
import y3s1_23CS31P1_sub from './data/year-3/sem-1/23CS31P1/subject.json';
import y3s1_23CS31P1_prog from './data/year-3/sem-1/23CS31P1/programs.json';
import y3s1_23CS31P2_sub from './data/year-3/sem-1/23CS31P2/subject.json';
import y3s1_23CS31P2_prog from './data/year-3/sem-1/23CS31P2/programs.json';
import y3s1_23ES31P1_sub from './data/year-3/sem-1/23ES31P1/subject.json';
import y3s1_23ES31P1_prog from './data/year-3/sem-1/23ES31P1/programs.json';
import y3s1_23CS31T1_sub from './data/year-3/sem-1/23CS31T1/subject.json';
import y3s1_23CS31T1_prog from './data/year-3/sem-1/23CS31T1/programs.json';
import y3s1_23CS31T2_sub from './data/year-3/sem-1/23CS31T2/subject.json';
import y3s1_23CS31T2_prog from './data/year-3/sem-1/23CS31T2/programs.json';
import y3s1_23CS31T3_sub from './data/year-3/sem-1/23CS31T3/subject.json';
import y3s1_23CS31T3_prog from './data/year-3/sem-1/23CS31T3/programs.json';
import y3s1_23CS31E4_sub from './data/year-3/sem-1/23CS31E4/subject.json';
import y3s1_23CS31E4_prog from './data/year-3/sem-1/23CS31E4/programs.json';
import y3s1_23ES31T1_sub from './data/year-3/sem-1/23ES31T1/subject.json';
import y3s1_23ES31T1_prog from './data/year-3/sem-1/23ES31T1/programs.json';
import y3s1_23CS31E1_sub from './data/year-3/sem-1/23CS31E1/subject.json';
import y3s1_23CS31E1_prog from './data/year-3/sem-1/23CS31E1/programs.json';
import y3s1_23CS31E2_sub from './data/year-3/sem-1/23CS31E2/subject.json';
import y3s1_23CS31E2_prog from './data/year-3/sem-1/23CS31E2/programs.json';
import y3s1_23CS31E3_sub from './data/year-3/sem-1/23CS31E3/subject.json';
import y3s1_23CS31E3_prog from './data/year-3/sem-1/23CS31E3/programs.json';
import y3s1_23CS31O1_sub from './data/year-3/sem-1/23CS31O1/subject.json';
import y3s1_23CS31O1_prog from './data/year-3/sem-1/23CS31O1/programs.json';
import y3s1_23CS31O2_sub from './data/year-3/sem-1/23CS31O2/subject.json';
import y3s1_23CS31O2_prog from './data/year-3/sem-1/23CS31O2/programs.json';


// Year 3, Semester 2
import y3s2_23CS32AC_sub from './data/year-3/sem-2/23CS32AC/subject.json';
import y3s2_23CS32AC_prog from './data/year-3/sem-2/23CS32AC/programs.json';
import y3s2_23CS32P1_sub from './data/year-3/sem-2/23CS32P1/subject.json';
import y3s2_23CS32P1_prog from './data/year-3/sem-2/23CS32P1/programs.json';
import y3s2_23CS32P2_sub from './data/year-3/sem-2/23CS32P2/subject.json';
import y3s2_23CS32P2_prog from './data/year-3/sem-2/23CS32P2/programs.json';
import y3s2_23CS32SC_sub from './data/year-3/sem-2/23CS32SC/subject.json';
import y3s2_23CS32SC_prog from './data/year-3/sem-2/23CS32SC/programs.json';
import y3s2_23CS32T1_sub from './data/year-3/sem-2/23CS32T1/subject.json';
import y3s2_23CS32T1_prog from './data/year-3/sem-2/23CS32T1/programs.json';
import y3s2_23CS32T2_sub from './data/year-3/sem-2/23CS32T2/subject.json';
import y3s2_23CS32T2_prog from './data/year-3/sem-2/23CS32T2/programs.json';
import y3s2_23CS32T3_sub from './data/year-3/sem-2/23CS32T3/subject.json';
import y3s2_23CS32T3_prog from './data/year-3/sem-2/23CS32T3/programs.json';
import y3s2_23CS32E2_sub from './data/year-3/sem-2/23CS32E2/subject.json';
import y3s2_23CS32E2_prog from './data/year-3/sem-2/23CS32E2/programs.json';


const processSubject = (sub: any, year: number, semester: number): Subject => ({
    ...sub,
    year,
    semester,
    title: sub.name,
    description: sub.short,
});

const y3s1_subjects = [
    processSubject(y3s1_23AD31SC_sub, 3, 1),
    processSubject(y3s1_23CS31E1_sub, 3, 1),
    processSubject(y3s1_23CS31E2_sub, 3, 1),
    processSubject(y3s1_23CS31E3_sub, 3, 1),
    processSubject(y3s1_23CS31E4_sub, 3, 1),
    processSubject(y3s1_23CS31O1_sub, 3, 1),
    processSubject(y3s1_23CS31O2_sub, 3, 1),
    processSubject(y3s1_23CS31P1_sub, 3, 1),
    processSubject(y3s1_23CS31P2_sub, 3, 1),
    processSubject(y3s1_23CS31T1_sub, 3, 1),
    processSubject(y3s1_23CS31T2_sub, 3, 1),
    processSubject(y3s1_23CS31T3_sub, 3, 1),
    processSubject(y3s1_23ES31P1_sub, 3, 1),
    processSubject(y3s1_23ES31T1_sub, 3, 1),
];

const y3s2_subjects = [
    processSubject(y3s2_23CS32AC_sub, 3, 2),
    processSubject(y3s2_23CS32P1_sub, 3, 2),
    processSubject(y3s2_23CS32P2_sub, 3, 2),
    processSubject(y3s2_23CS32SC_sub, 3, 2),
    processSubject(y3s2_23CS32T1_sub, 3, 2),
    processSubject(y3s2_23CS32T2_sub, 3, 2),
    processSubject(y3s2_23CS32T3_sub, 3, 2),
    processSubject(y3s2_23CS32E2_sub, 3, 2),
];


export const subjects: Subject[] = [
    ...y3s1_subjects,
    ...y3s2_subjects,
];
const subjectMap = new Map(subjects.map(s => [s.id, s]));

const processPrograms = (programsArr: any[], subjectId: string): Program[] => {
    const sub = subjectMap.get(subjectId);
    if (!sub) return [];
    return programsArr.map((p: any) => ({
        ...p,
        subjectId: subjectId,
        year: sub.year,
        semester: sub.semester,
        aim: p.problem,
        canRunInBrowser: p.language?.toLowerCase() === 'html/css/js',
        language: p.language || 'N/A',
        tags: p.tags || [],
        code: p.code || 'No code available.'
    }));
}

export const programs: Program[] = [
    ...processPrograms(y3s1_23AD31SC_prog, '23AD31SC'),
    ...processPrograms(y3s1_23CS31P1_prog, '23CS31P1'),
    ...processPrograms(y3s1_23CS31P2_prog, '23CS31P2'),
    ...processPrograms(y3s1_23ES31P1_prog, '23ES31P1'),
    ...processPrograms(y3s1_23CS31T1_prog, '23CS31T1'),
    ...processPrograms(y3s1_23CS31T2_prog, '23CS31T2'),
    ...processPrograms(y3s1_23CS31T3_prog, '23CS31T3'),
    ...processPrograms(y3s1_23CS31E4_prog, '23CS31E4'),
    ...processPrograms(y3s1_23ES31T1_prog, '23ES31T1'),
    ...processPrograms(y3s1_23CS31E1_prog, '23CS31E1'),
    ...processPrograms(y3s1_23CS31E2_prog, '23CS31E2'),
    ...processPrograms(y3s1_23CS31E3_prog, '23CS31E3'),
    ...processPrograms(y3s1_23CS31O1_prog, '23CS31O1'),
    ...processPrograms(y3s1_23CS31O2_prog, '23CS31O2'),
    ...processPrograms(y3s2_23CS32AC_prog, '23CS32AC'),
    ...processPrograms(y3s2_23CS32P1_prog, '23CS32P1'),
    ...processPrograms(y3s2_23CS32P2_prog, '23CS32P2'),
    ...processPrograms(y3s2_23CS32SC_prog, '23CS32SC'),
    ...processPrograms(y3s2_23CS32T1_prog, '23CS32T1'),
    ...processPrograms(y3s2_23CS32T2_prog, '23CS32T2'),
    ...processPrograms(y3s2_23CS32T3_prog, '23CS32T3'),
    ...processPrograms(y3s2_23CS32E2_prog, '23CS32E2'),
];

export const materials: Material[] = materialsData.materials.map((m: any) => {
    const sub = subjectMap.get(m.subjectId);
    return {
        ...m,
        year: sub?.year ?? 0,
        semester: sub?.semester ?? 0,
    };
}).filter((m: any) => m.year !== 0);

// These are now part of materials.json
export const notes: Note[] = [];
export const syllabi: Syllabus[] = [];
