"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Search, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type AttendanceRecord = {
  subject: string;
  attended: number;
  total: number;
  percentage: number;
};

type ApiResponse = {
  studentName?: string;
  rollNumber?: string;
  attendance?: AttendanceRecord[];
  error?: string;
};

export function AttendanceSection() {
  const [rollNumber, setRollNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  const handleFetchAttendance = async () => {
    if (!rollNumber) {
      setData({ error: 'Please enter a valid roll number.' });
      return;
    }
    setIsLoading(true);
    setData(null);
    try {
      const response = await fetch(`/api/attendance?rollNumber=${rollNumber}`);
      const result: ApiResponse = await response.json();
      setData(result);
    } catch (error) {
      setData({ error: 'Failed to fetch attendance data. The service might be down.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 65) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <section id="attendance" className="py-12">
      <div className="container">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">Attendance Checker</CardTitle>
            <CardDescription className="mt-2 text-lg text-muted-foreground">
              Enter your roll number to check your latest attendance status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full max-w-sm mx-auto items-center space-x-2">
              <Input
                type="text"
                placeholder="E.g., 23A12345"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleFetchAttendance()}
                disabled={isLoading}
              />
              <Button onClick={handleFetchAttendance} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Get
              </Button>
            </div>
            
            {data && (
              <div className="mt-8">
                {data.error && (
                   <div className="text-center text-red-500 flex items-center justify-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      <p>{data.error}</p>
                   </div>
                )}
                {data.attendance && (
                  <>
                    <div className="text-center mb-4">
                        <h3 className="font-bold text-xl">{data.studentName}</h3>
                        <p className="text-muted-foreground">{data.rollNumber}</p>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[40%]">Subject</TableHead>
                            <TableHead>Attended</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead className="text-right">Percentage</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.attendance.map((record) => (
                            <TableRow key={record.subject}>
                                <TableCell className="font-medium">{record.subject}</TableCell>
                                <TableCell>{record.attended}</TableCell>
                                <TableCell>{record.total}</TableCell>
                                <TableCell className="text-right">
                                <div className="flex items-center gap-2 justify-end">
                                    <span className="w-12">{record.percentage.toFixed(2)}%</span>
                                    <Progress value={record.percentage} className="w-24 h-2 [&>div]:bg-green-500" indicatorClassName={getPercentageColor(record.percentage)} />
                                </div>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
           <CardFooter className="text-center text-xs text-muted-foreground justify-center">
             <p>Disclaimer: This is a frontend demonstration. The attendance data is sample data and not live from the college portal.</p>
           </CardFooter>
        </Card>
      </div>
    </section>
  );
}

// Custom Progress component to allow dynamic indicator color
const CustomProgress = ({ value, indicatorClassName }: { value: number, indicatorClassName: string }) => (
  <ProgressPrimitive.Root className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
    <ProgressPrimitive.Indicator
      className={`h-full w-full flex-1 transition-all ${indicatorClassName}`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
);
