const profiles = {
  routine: [
    ['define-outcome', 'Define the desired outcome', ['Choose measurable results', 'Set a realistic time commitment']],
    ['choose-cue', 'Choose a consistent cue and schedule', ['Select a time or trigger', 'Create a backup option']],
    ['prepare', 'Prepare the environment and materials', ['Gather what is needed', 'Remove avoidable friction']],
    ['practice', 'Follow the routine consistently', ['Start small', 'Track completion']],
    ['review', 'Review and improve the routine', ['Identify obstacles', 'Change one element at a time']]
  ],
  organize: [
    ['inventory', 'Inventory the items or information', ['Identify all sources', 'Separate active and inactive items']],
    ['structure', 'Create a simple organization structure', ['Choose categories', 'Define naming or labeling rules']],
    ['sort', 'Sort and remove unnecessary items', ['Keep the best version', 'Archive, donate, recycle, or delete safely']],
    ['store', 'Store retained items intentionally', ['Group by use', 'Protect sensitive items']],
    ['maintain', 'Schedule recurring maintenance', ['Set a review reminder', 'Define an inbox for new items']]
  ],
  digitalSafety: [
    ['inventory', 'Inventory important accounts, devices, and data', ['Prioritize email and financial accounts', 'Identify unsupported devices or software']],
    ['protect-access', 'Strengthen account access', ['Use unique passwords and a password manager', 'Enable multifactor authentication']],
    ['update', 'Update software and security settings', ['Enable automatic updates', 'Remove unused applications and permissions']],
    ['backup', 'Back up critical information', ['Keep a separate copy', 'Test restoring a sample']],
    ['monitor', 'Monitor and respond to suspicious activity', ['Verify unexpected requests', 'Report phishing and review account alerts']]
  ],
  emergency: [
    ['assess', 'Assess people, pets, medical, and accessibility needs', ['List essential needs', 'Assign responsibilities']],
    ['contacts', 'Prepare communication and emergency contacts', ['Choose local and out-of-area contacts', 'Store offline copies']],
    ['supplies', 'Gather essential supplies and documents', ['Check food, water, power, first aid, and hygiene', 'Protect copies of key documents']],
    ['access', 'Make resources easy to access', ['Choose safe storage', 'Prepare portable essentials']],
    ['practice', 'Practice and maintain the plan', ['Run a brief drill', 'Replace expired or used items']]
  ],
  health: [
    ['baseline', 'Assess the current baseline and limitations', ['Record current habits', 'Consider medical or safety limitations']],
    ['goal', 'Set a practical health goal', ['Choose frequency and duration', 'Define a minimum version']],
    ['plan', 'Create a safe and sustainable plan', ['Choose suitable activities or behaviors', 'Plan recovery and alternatives']],
    ['track', 'Track consistency and response', ['Record completion', 'Note symptoms, energy, sleep, or mood']],
    ['adjust', 'Review progress and adjust gradually', ['Keep helpful changes', 'Seek professional guidance when needed']]
  ],
  finance: [
    ['collect', 'Collect balances, income, expenses, and records', ['Use recent statements', 'Separate regular and irregular amounts']],
    ['classify', 'Classify obligations, needs, goals, and optional spending', ['Identify essentials', 'Identify fees, waste, or duplication']],
    ['plan', 'Choose a clear financial plan', ['Set amounts and due dates', 'Leave a realistic buffer']],
    ['automate', 'Automate safe recurring actions', ['Set reminders or transfers', 'Protect minimum obligations']],
    ['review', 'Review results monthly', ['Compare planned and actual amounts', 'Update the next action']]
  ],
  career: [
    ['target', 'Define the target audience, role, or opportunity', ['List required capabilities', 'Clarify constraints and priorities']],
    ['evidence', 'Collect relevant evidence and achievements', ['Capture scope and impact', 'Add measurable results where honest']],
    ['prepare', 'Prepare tailored professional materials', ['Align terminology', 'Keep claims accurate and concise']],
    ['practice', 'Practice communication and outreach', ['Rehearse key stories', 'Prepare thoughtful questions']],
    ['track', 'Track follow-ups and improve', ['Record status and next action', 'Review outcomes weekly']]
  ],
  learning: [
    ['outcome', 'Define a demonstrable learning outcome', ['Specify what you will be able to do', 'Choose how it will be tested']],
    ['baseline', 'Assess current knowledge and gaps', ['List strengths', 'Prioritize weak areas']],
    ['curriculum', 'Create a focused learning sequence', ['Cover fundamentals', 'Include practice and a project']],
    ['practice', 'Schedule active and spaced practice', ['Use recall or problem solving', 'Keep an error log']],
    ['feedback', 'Get feedback and review progress', ['Use self-tests or external review', 'Adjust the next learning block']]
  ],
  project: [
    ['outcome', 'Define the outcome and success criteria', ['Describe the deliverable', 'Set a quality bar']],
    ['scope', 'Define scope, exclusions, and constraints', ['Separate must-haves from optional work', 'Identify dependencies']],
    ['breakdown', 'Break the work into milestones and tasks', ['Order dependencies', 'Assign owners where relevant']],
    ['execute', 'Schedule and execute the work', ['Add buffers', 'Track blockers and decisions']],
    ['close', 'Review, publish, or hand off the result', ['Verify completion', 'Capture lessons and maintenance needs']]
  ],
  communication: [
    ['purpose', 'Define the audience and desired outcome', ['Clarify the decision or action needed', 'Identify audience needs']],
    ['content', 'Prepare the key message and supporting information', ['Lead with the main point', 'Use only relevant evidence']],
    ['structure', 'Create a clear sequence or agenda', ['Assign time or emphasis', 'Prepare transitions']],
    ['deliver', 'Practice and deliver clearly', ['Test technology or materials', 'Invite participation and questions']],
    ['follow-up', 'Document decisions and follow up', ['List actions and owners', 'Set dates and share notes']]
  ],
  relationship: [
    ['purpose', 'Clarify the purpose and desired outcome', ['Separate needs from assumptions', 'Identify boundaries']],
    ['perspective', 'Consider each person’s perspective', ['List known facts', 'Identify questions instead of guessing']],
    ['prepare', 'Prepare respectful language and requests', ['Use specific observations', 'Propose realistic next steps']],
    ['discuss', 'Hold the conversation and listen actively', ['Avoid interruption', 'Confirm shared understanding']],
    ['follow-up', 'Agree on actions and a check-in', ['Assign responsibilities', 'Choose a review date']]
  ],
  travel: [
    ['requirements', 'Confirm documents, health needs, and essential requirements', ['Check validity and deadlines', 'Store secure copies']],
    ['bookings', 'Organize transport, lodging, and confirmations', ['Keep reservation details together', 'Review cancellation terms']],
    ['money', 'Prepare primary and backup payment access', ['Set a budget', 'Protect cards and emergency funds']],
    ['packing', 'Prepare a categorized packing list', ['Separate critical carry-on items', 'Include medication and chargers']],
    ['handoff', 'Prepare home, contacts, and return arrangements', ['Share emergency information', 'Handle bills, pets, plants, and deliveries']]
  ],
  maintenance: [
    ['inventory', 'Inventory equipment, systems, and reference information', ['Record model or identifying details', 'Collect manuals and prior records']],
    ['inspect', 'Inspect condition and safety-critical components', ['Look for wear, damage, or warning signs', 'Record findings']],
    ['service', 'Complete routine cleaning or maintenance', ['Use manufacturer guidance', 'Use appropriate tools and protection']],
    ['record', 'Record work, dates, costs, and next due items', ['Store receipts', 'Note unresolved issues']],
    ['schedule', 'Schedule recurring checks and professional service', ['Set reminders', 'Escalate safety issues promptly']]
  ]
};

const rows = [
  ['build-morning-routine','Build a morning routine','personal-productivity','routine'],
  ['build-evening-routine','Build an evening routine','personal-productivity','routine'],
  ['weekly-planning','Run a weekly planning session','personal-productivity','routine'],
  ['declutter-home','Declutter a living space','household','organize'],
  ['deep-clean-room','Deep clean a room','household','maintenance'],
  ['organize-digital-files','Organize digital files','digital-organization','organize'],
  ['backup-important-data','Back up important data','digital-safety','digitalSafety'],
  ['secure-online-accounts','Secure online accounts','digital-safety','digitalSafety'],
  ['privacy-review','Review personal privacy settings','digital-safety','digitalSafety'],
  ['prepare-emergency-kit','Prepare a basic emergency kit','emergency-preparedness','emergency'],
  ['create-emergency-plan','Create an emergency communication plan','emergency-preparedness','emergency'],
  ['first-aid-readiness','Improve first-aid readiness','emergency-preparedness','emergency'],
  ['start-walking-program','Start a walking program','health-fitness','health'],
  ['strength-training-routine','Start a strength-training routine','health-fitness','health'],
  ['improve-sleep-habits','Improve sleep habits','health-wellness','health'],
  ['healthy-meal-planning','Plan balanced meals for a week','health-nutrition','health'],
  ['stress-management-plan','Create a stress-management plan','mental-wellness','health'],
  ['mindfulness-practice','Start a mindfulness practice','mental-wellness','routine'],
  ['personal-health-record','Create a personal health record','health-organization','organize'],
  ['monthly-budget','Create a monthly budget','personal-finance','finance'],
  ['emergency-savings','Build an emergency savings plan','personal-finance','finance'],
  ['debt-repayment-plan','Create a debt repayment plan','personal-finance','finance'],
  ['subscription-audit','Audit recurring subscriptions','personal-finance','finance'],
  ['financial-document-organization','Organize financial documents','personal-finance','organize'],
  ['resume-refresh','Refresh a resume','career','career'],
  ['job-search-plan','Create a job-search plan','career','career'],
  ['interview-preparation','Prepare for a job interview','career','career'],
  ['professional-portfolio','Build a professional portfolio','career','career'],
  ['networking-routine','Build a professional networking routine','career','career'],
  ['learn-new-skill','Plan learning a new skill','learning','learning'],
  ['study-plan','Create a study plan','learning','learning'],
  ['reading-plan','Create a reading plan','learning','learning'],
  ['write-research-report','Write a research report','learning','learning'],
  ['language-learning-routine','Build a language-learning routine','learning','learning'],
  ['plan-personal-project','Plan a personal project','project-management','project'],
  ['launch-small-website','Launch a small website','project-management','project'],
  ['organize-event','Organize a small event','events','project'],
  ['host-virtual-meeting','Host an effective virtual meeting','work','communication'],
  ['prepare-presentation','Prepare a presentation','communication','communication'],
  ['difficult-conversation','Prepare for a difficult conversation','relationships','relationship'],
  ['family-check-in','Run a family or household check-in','relationships','relationship'],
  ['volunteer-plan','Create a volunteering plan','community','project'],
  ['travel-preparation','Prepare for a trip','travel','travel'],
  ['packing-checklist','Create a reusable packing checklist','travel','travel'],
  ['move-home-generic','Plan a household move','household','project'],
  ['vehicle-readiness','Maintain basic vehicle readiness','transportation','maintenance'],
  ['home-maintenance-calendar','Create a home maintenance calendar','household','maintenance'],
  ['document-emergency-info','Create an emergency information packet','emergency-preparedness','emergency'],
  ['email-inbox-reset','Reset an email inbox','digital-organization','organize'],
  ['annual-personal-review','Run an annual personal review','personal-productivity','routine']
];

function taskObject(activityId, task, index) {
  const [id, title, subtasks] = task;
  return {
    id,
    sequence: (index + 1) * 10,
    title,
    subtasks: subtasks.map((subtask, subIndex) => ({
      id: `${activityId}-${id}-${subIndex + 1}`,
      sequence: (subIndex + 1) * 10,
      title: subtask
    }))
  };
}

export const globalActivities = rows.map(([id, title, category, profile], index) => ({
  id,
  title,
  category,
  rank: index + 1,
  scope: 'global',
  location_specific: false,
  tasks: profiles[profile].map((task, taskIndex) => taskObject(id, task, taskIndex))
}));

export const globalActivityById = new Map(globalActivities.map((activity) => [activity.id, activity]));
