
"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { SubjectsSection } from '@/components/sections/subjects-section';
import { AllProgramsSection } from '@/components/sections/all-programs-section';
import { NotesSection } from '@/components/sections/notes-section';
import { SyllabusSection } from '@/components/sections/syllabus-section';
import { materials, programs, subjects } from '@/lib/data';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function DashboardClient() {
  const [activeYear, setActiveYear] = useState('3');
  const [activeSem, setActiveSem] = useState('1');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client after the component mounts.
    // It checks the URL for query params to set the initial state.
    const params = new URLSearchParams(window.location.search);
    const year = params.get('year') || '3';
    const sem = params.get('sem') || '1';
    setActiveYear(year);
    setActiveSem(sem);
    setIsMounted(true); // Mark as mounted to trigger re-render with correct state
  }, []);

  const filteredData = useMemo(() => {
    const year = parseInt(activeYear);
    const sem = parseInt(activeSem);

    return {
      subjects: subjects.filter(s => s.year === year && s.semester === sem),
      programs: programs.filter(p => p.year === year && p.semester === sem),
      materials: materials.filter(m => m.year === year && m.semester === sem),
    };
  }, [activeYear, activeSem]);

  const syllabi = filteredData.materials.filter(m => m.type === 'Syllabus');
  const notes = filteredData.materials.filter(m => m.type !== 'Syllabus');

  if (!isMounted) {
    // Render nothing or a loading skeleton on the server and initial client render
    // to prevent hydration mismatch.
    return null;
  }

  return (
    <div className="relative z-10 w-full overflow-hidden container py-8">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">Dashboard</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-center">
          Select a year and semester to explore all related academic materials for R-23.
        </p>
        <Tabs value={activeYear} onValueChange={setActiveYear} className="w-full max-w-md mt-8">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="3">Year 3</TabsTrigger>
          </TabsList>
        </Tabs>
        <ToggleGroup type="single" value={activeSem} onValueChange={(value) => {if(value) setActiveSem(value)}} className="mt-4">
          <ToggleGroupItem value="1" aria-label="Toggle Semester 1">
            Semester 1
          </ToggleGroupItem>
          <ToggleGroupItem value="2" aria-label="Toggle Semester 2">
            Semester 2
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <SubjectsSection subjects={filteredData.subjects} programs={filteredData.programs} />
      <SyllabusSection syllabi={syllabi} subjects={filteredData.subjects} />
      <AllProgramsSection programs={filteredData.programs} subjects={filteredData.subjects} />
      <NotesSection materials={notes} subjects={filteredData.subjects} />
    </div>
  );
}
