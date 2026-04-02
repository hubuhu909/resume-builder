import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...payload } = body;

    let systemPrompt = '';
    let userMessage = '';

    if (type === 'generate-resume') {
      const { resumeData, config } = payload;
      systemPrompt = `You are an expert resume writer who specializes in creating compelling resumes for high school students. 
Your job is to take the raw information provided and transform it into a polished, professional resume tailored for ${config.jobCategory}.
Style: ${config.style}
Rules:
- Use action verbs to start bullet points
- Quantify achievements where possible
- Keep language appropriate for a high school student
- Make it ATS-friendly
- Output the resume as clean HTML with inline styles that match the "${config.style}" style
- For "modern" style: use clean sans-serif fonts, bold section headers, subtle accent colors in navy blue (#1a365d) and gold (#d4a017)
- For "classic" style: traditional formatting, Times New Roman feel, formal layout
- For "creative" style: modern with a left sidebar, colorful accents in teal (#0d9488) and coral (#f97316)
- For "minimal" style: ultra clean, lots of whitespace, simple dividers
IMPORTANT: Return ONLY the HTML for the resume body content (not full HTML page). Make it print-ready and beautiful.`;

      userMessage = `Create a ${config.style} resume for this high school student applying for ${config.jobCategory} jobs:

Name: ${resumeData.firstName} ${resumeData.lastName}
Email: ${resumeData.email}
Phone: ${resumeData.phone}
Location: ${resumeData.city}, ${resumeData.state}
${resumeData.linkedIn ? `LinkedIn: ${resumeData.linkedIn}` : ''}

ABOUT: ${resumeData.aboutYou}

EDUCATION:
${resumeData.education.map((e: { schoolName: string; graduationYear: string; gpa: string; relevantCourses: string; honors: string }) => `- ${e.schoolName}, Class of ${e.graduationYear}${e.gpa ? `, GPA: ${e.gpa}` : ''}${e.honors ? `, Honors: ${e.honors}` : ''}${e.relevantCourses ? `, Relevant Courses: ${e.relevantCourses}` : ''}`).join('\n')}

EXPERIENCE:
${resumeData.experience.length > 0 ? resumeData.experience.map((ex: { jobTitle: string; employer: string; startDate: string; endDate: string; description: string }) => `- ${ex.jobTitle} at ${ex.employer} (${ex.startDate} - ${ex.endDate}): ${ex.description}`).join('\n') : 'None provided'}

VOLUNTEERING:
${resumeData.volunteering.length > 0 ? resumeData.volunteering.map((v: { role: string; organization: string; hours: string; description: string }) => `- ${v.role} at ${v.organization}${v.hours ? ` (${v.hours} hours)` : ''}: ${v.description}`).join('\n') : 'None provided'}

SKILLS: ${resumeData.skills.join(', ')}

AWARDS & ACHIEVEMENTS: ${resumeData.awards || 'None provided'}

CLUBS & ACTIVITIES: ${resumeData.clubs || 'None provided'}

Please create a stunning, professional resume HTML. Make the content compelling and use powerful action verbs.`;
    } else if (type === 'generate-cover-letter') {
      const { resumeData, config } = payload;
      systemPrompt = `You are an expert career counselor helping high school students write compelling cover letters. Write in an enthusiastic but professional tone appropriate for a teenager's first job.`;
      userMessage = `Write a cover letter for ${resumeData.firstName} ${resumeData.lastName} applying for a ${config.jobCategory} position. 
Their background: ${resumeData.aboutYou}
Skills: ${resumeData.skills.join(', ')}
Experience: ${resumeData.experience.map((e: { jobTitle: string; employer: string }) => `${e.jobTitle} at ${e.employer}`).join(', ')}
Keep it to 3 paragraphs, enthusiastic, and appropriate for a high school student's first job application.`;
    } else if (type === 'chat') {
      const { message, resumeData, config, chatHistory } = payload;
      systemPrompt = `You are a friendly, encouraging career counselor helping a high school student build their resume. 
You have context about their resume:
- Applying for: ${config?.jobCategory || 'unknown'}
- Style: ${config?.style || 'modern'}
- Their name: ${resumeData?.firstName || ''} ${resumeData?.lastName || ''}
- Their skills: ${resumeData?.skills?.join(', ') || 'not filled in yet'}

Give specific, actionable advice. Be encouraging and use simple language. Keep responses concise (2-4 sentences max). 
Use emojis occasionally to keep it friendly. If they ask about improving specific sections, give concrete examples.`;
      
      const messages = [
        ...(chatHistory || []),
        { role: 'user', content: message }
      ];

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY || '',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: systemPrompt,
          messages,
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || 'I had trouble responding. Please try again!';
      return NextResponse.json({ reply });
    }

    if (type === 'generate-resume' || type === 'generate-cover-letter') {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY || '',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: systemPrompt,
          messages: [{ role: 'user', content: userMessage }],
        }),
      });

      const data = await response.json();
      const content = data.content?.[0]?.text || '';
      return NextResponse.json({ content });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
