// IMPORTANT: This is a placeholder API route.
// The code here does NOT scrape the live college website. It returns mock data.
// To make this functional, you would need to implement a web scraping solution
// using a library like Puppeteer or Cheerio to log in and parse the attendance page.

import { NextRequest, NextResponse } from 'next/server';

// Sample data structure
const sampleAttendanceData = {
  studentName: 'STUDENT NAME',
  rollNumber: 'YOUR_ROLL_NUM',
  attendance: [
    { subject: 'Artificial Intelligence', attended: 28, total: 30, percentage: 93.33 },
    { subject: 'Computer Networks', attended: 25, total: 28, percentage: 89.28 },
    { subject: 'Full Stack Development', attended: 35, total: 40, percentage: 87.5 },
    { subject: 'Automata Theory', attended: 22, total: 32, percentage: 68.75 },
    { subject: 'Tinkering Lab', attended: 14, total: 15, percentage: 93.33 },
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rollNumber = searchParams.get('rollNumber');

  if (!rollNumber) {
    return NextResponse.json({ error: 'Roll number is required.' }, { status: 400 });
  }

  // --- Web Scraping Logic Would Go Here ---
  // 1. Launch a headless browser (e.g., Puppeteer).
  // 2. Navigate to https://at.nbkrist.org/.
  // 3. Enter the roll number into the input field and submit.
  // 4. Wait for the attendance page to load.
  // 5. Parse the HTML table containing the attendance data.
  // 6. Extract subject names, classes attended, total classes, etc.
  // 7. Format the extracted data into the `sampleAttendanceData` structure.
  // 8. Return the real data instead of the sample data.
  //
  // NOTE: This process can be fragile. If the college website changes its HTML,
  // the scraper will likely break and need to be updated.

  // For now, we return sample data after a short delay to simulate a network request.
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (rollNumber.length < 8) {
     return NextResponse.json({ error: 'Invalid Roll Number format.' }, { status: 400 });
  }
  
  // Return the sample data
  const responseData = {
      ...sampleAttendanceData,
      rollNumber: rollNumber.toUpperCase(),
  }

  return NextResponse.json(responseData);
}
