
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
  ...year3sem2.subjects
];

const subjectMap = new Map<string, Subject>();

allYearSubjects.forEach(s => {
  if (!subjectMap.has(s.id)) {
    subjectMap.set(s.id, {
      id: s.id,
      title: s.name,
      shortTitle: s.short || s.name.split(' ')[0],
      description: s.description || '',
      color: s.color || 'default',
      hasLab: s.hasLab,
      isLabOnly: s.isLabOnly,
      year: s.year,
      semester: s.semester
    } as Subject);
  }
});

export const subjects: Subject[] = Array.from(subjectMap.values());

export const programs: Program[] = programsData.subjects.flatMap(subject =>
  (subject.programs || []).map(p => {
    const sub = subjectMap.get(subject.id);

    if (!sub) {
      console.warn('Invalid program subjectId:', subject.id);
      return null;
    }

    return {
      id: p.id,
      title: p.title,
      language: p.language,
      tags: p.tags,
      aim: p.problem,
      code: p.code,
      canRunInBrowser: p.language.toLowerCase() === 'html/css/js',
      subjectId: subject.id,
      year: sub.year,
      semester: sub.semester,
      problem: p.problem,
    };
  })
).filter(Boolean) as Program[];

let noteIdCounter = 1;

export const notes: Note[] = (programsData.notes || [])
  .map(n => {
    const matchingSubject = subjects.find(
      s =>
        s.shortTitle.toLowerCase() === n.subject.toLowerCase() ||
        s.title.toLowerCase().includes(n.subject.toLowerCase())
    );

    if (!matchingSubject) {
      console.warn('Invalid note subject:', n.subject);
      return null;
    }

    return {
      id: `note-${noteIdCounter++}`,
      title: n.title,
      subjectId: matchingSubject.id,
      type: n.type as 'PDF' | 'Link' | 'Document' | 'Notes' | 'Assignment' | 'Question Paper' | 'Image',
      url: n.url,
      year: matchingSubject.year,
      semester: matchingSubject.semester,
      fileType: 'Link'
    };
  })
  .filter(Boolean) as Note[];

export const syllabi: Syllabus[] = (programsData.syllabi || [])
  .map(s => {
    const matchingSubject = subjectMap.get(s.subjectId);

    if (!matchingSubject) {
      console.warn('Invalid syllabus subjectId:', s.subjectId);
      return null;
    }

    return {
      id: s.id,
      title: s.title,
      subjectId: s.subjectId,
      type: s.type as 'PDF' | 'Link' | 'Syllabus',
      url: s.url,
      year: matchingSubject.year,
      semester: matchingSubject.semester,
      fileType: 'PDF',
    };
  })
  .filter(Boolean) as Syllabus[];

export const materials: Material[] = materialsData.materials
  .filter(m => {
    const exists = subjectMap.has(m.subjectId);
    if (!exists) {
      console.warn('Invalid material subjectId:', m);
    }
    return exists;
  })
  .map(m => {
    const sub = subjectMap.get(m.subjectId)!;
    return {
      ...m,
      year: sub.year,
      semester: sub.semester
    } as Material;
  });
