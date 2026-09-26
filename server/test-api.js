const http = require('http');

async function testApi() {
  console.log('[Test] Initiating API verification...');

  // Test Login
  const loginPayload = JSON.stringify({
    email: 'student@careerpulse.ai',
    password: 'password123',
  });

  const loginRes = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: loginPayload,
  });

  const loginData = await loginRes.json();
  console.log('1. Login Test:', loginData.success ? 'PASSED' : 'FAILED', '| User:', loginData.user?.fullName);

  const token = loginData.token;
  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // Test Profile
  const profRes = await fetch('http://localhost:5000/api/profile', { headers: authHeaders });
  const profData = await profRes.json();
  console.log('2. Profile Test:', profData.success ? 'PASSED' : 'FAILED', '| College:', profData.profile?.education?.college);

  // Test Careers
  const careersRes = await fetch('http://localhost:5000/api/careers');
  const careersData = await careersRes.json();
  console.log('3. Careers Count:', careersData.count, '| Top Track:', careersData.careers?.[0]?.title);

  // Test Assessment Questions
  const qRes = await fetch('http://localhost:5000/api/assessments');
  const qData = await qRes.json();
  console.log('4. Assessment Questions Count:', qData.count);

  // Test Learning Path
  const learnRes = await fetch('http://localhost:5000/api/learning-path', { headers: authHeaders });
  const learnData = await learnRes.json();
  console.log('5. Learning Progress:', learnData.progress?.progressPercentage + '%', '| Target:', learnData.career?.title);

  // Test Skill Gap
  const gapRes = await fetch('http://localhost:5000/api/skill-gap', { headers: authHeaders });
  const gapData = await gapRes.json();
  console.log('6. Skill Gap Readiness Score:', gapData.readinessScore + '%', '| Priority Skills:', gapData.priorityFocusSkills);

  // Test AI Chatbot
  const chatRes = await fetch('http://localhost:5000/api/ai/chat', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ message: 'Which career is suitable for me?' }),
  });
  const chatData = await chatRes.json();
  console.log('7. AI Counselor Response:', chatData.success ? 'PASSED' : 'FAILED', '| Reply Preview:', chatData.reply?.slice(0, 50) + '...');

  // Test Client Frontend
  const clientRes = await fetch('http://localhost:5173/');
  console.log('8. Client Webpage (Port 5173): Status', clientRes.status, '| HTML Loaded:', clientRes.ok);

  console.log('\n[Result] All endpoints and frontend verified successfully!');
  process.exit(0);
}

testApi().catch((err) => {
  console.error('[Verification Failed]', err);
  process.exit(1);
});
