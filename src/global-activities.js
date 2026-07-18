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
  ],
  dailyPlanning: [
    ['capture', 'Capture all open tasks and commitments', ['Collect tasks from notes, email, calendars, and conversations', 'Write each task as a clear action']],
    ['review', 'Review deadlines, overdue work, and dependencies', ['Check due dates and reminders', 'Identify blocked or waiting tasks']],
    ['prioritize', 'Choose the most important tasks for today', ['Limit the daily focus list', 'Balance urgent and important work']],
    ['schedule', 'Place focused work and small tasks into the day', ['Reserve time for priority work', 'Batch quick administrative tasks']],
    ['close-day', 'Close the day and carry work forward intentionally', ['Mark completed work', 'Reschedule or remove unfinished tasks']]
  ],
  shopping: [
    ['inventory', 'Check current supplies before creating the list', ['Review pantry, refrigerator, freezer, and household supplies', 'Note items running low']],
    ['plan-needs', 'Plan meals and other needs for the period', ['List required ingredients', 'Include recurring household essentials']],
    ['build-list', 'Create and categorize the shopping list', ['Group items by type', 'Record quantity and acceptable alternatives']],
    ['review-budget', 'Review budget, priorities, and constraints', ['Estimate the total', 'Separate essential and optional items']],
    ['complete-store', 'Complete shopping and update inventory', ['Check items off while shopping', 'Store items and record anything still needed']]
  ],
  chores: [
    ['inventory', 'List recurring household chores', ['Cover daily, weekly, monthly, and seasonal work', 'Include shared spaces and personal responsibilities']],
    ['frequency', 'Assign a realistic frequency to each chore', ['Match frequency to actual need', 'Avoid overloading one day']],
    ['ownership', 'Assign ownership and backup responsibility', ['Make one person accountable for each chore', 'Agree how handoffs will work']],
    ['schedule', 'Schedule chores and required supplies', ['Set recurring reminders', 'Keep needed tools and supplies available']],
    ['review', 'Review completion and rebalance the schedule', ['Discuss missed or difficult chores', 'Adjust frequency or ownership']]
  ],
  habitTracker: [
    ['select', 'Choose a small set of habits to track', ['Connect each habit to a meaningful goal', 'Define the minimum successful action']],
    ['define', 'Define frequency, cue, and measurement', ['Choose daily or weekly frequency', 'Specify exactly what counts as complete']],
    ['prepare', 'Prepare reminders and the environment', ['Place cues where the action happens', 'Remove common sources of friction']],
    ['track', 'Record completion consistently', ['Mark completion soon after the action', 'Record exceptions without hiding them']],
    ['review', 'Review trends and adjust the habit', ['Look for patterns rather than perfect streaks', 'Scale difficulty gradually']]
  ],
  meetingLifecycle: [
    ['purpose', 'Define the meeting purpose and required outcome', ['Confirm a meeting is necessary', 'State the decision, plan, or information needed']],
    ['agenda', 'Prepare and distribute the agenda', ['List topics with time allocations', 'Attach pre-reading and context']],
    ['participants', 'Confirm participants, roles, and logistics', ['Invite only required contributors', 'Assign facilitator and note taker']],
    ['conduct', 'Run the meeting and capture decisions', ['Keep discussion aligned to the agenda', 'Record decisions, risks, and unresolved questions']],
    ['follow-up', 'Publish actions and follow up to completion', ['Assign one owner and due date per action', 'Review outstanding actions before the next meeting']]
  ],
  onboarding: [
    ['prepare', 'Prepare access, equipment, information, and welcome materials', ['Create required accounts and permissions', 'Share schedule, contacts, and essential references']],
    ['orientation', 'Explain goals, roles, expectations, and ways of working', ['Clarify responsibilities and success measures', 'Review communication and escalation paths']],
    ['training', 'Complete required training and guided practice', ['Sequence foundational learning first', 'Provide examples and safe practice tasks']],
    ['relationships', 'Introduce key people and support contacts', ['Schedule stakeholder introductions', 'Assign a primary support person']],
    ['checkpoints', 'Run structured check-ins and confirm readiness', ['Collect questions and feedback', 'Track remaining gaps and next milestones']]
  ],
  contentCalendar: [
    ['goals', 'Define audience, goals, channels, and themes', ['Choose measurable communication goals', 'Define recurring content pillars']],
    ['ideas', 'Capture and prioritize content ideas', ['Map ideas to audience needs', 'Select ideas based on value and effort']],
    ['calendar', 'Schedule content and assign ownership', ['Choose publish dates and channels', 'Assign creator, reviewer, and approver']],
    ['produce', 'Create, review, and approve each asset', ['Draft or produce the content', 'Check accuracy, accessibility, links, and brand requirements']],
    ['publish-review', 'Publish, distribute, and review performance', ['Verify the published result', 'Record results and reuse successful ideas']]
  ],
  campaign: [
    ['brief', 'Create the campaign brief and success measures', ['Define audience, message, offer, and desired action', 'Choose measurable targets']],
    ['plan', 'Plan channels, timeline, budget, and responsibilities', ['Sequence dependencies and milestones', 'Assign owners and approval dates']],
    ['assets', 'Create and approve campaign assets', ['Produce channel-specific versions', 'Review claims, links, tracking, and accessibility']],
    ['launch', 'Launch and verify the campaign', ['Confirm publishing and delivery', 'Test links, forms, tracking, and audience targeting']],
    ['optimize', 'Monitor, optimize, and close the campaign', ['Compare results with targets', 'Document learnings and follow-up actions']]
  ],
  bugTriage: [
    ['reproduce', 'Capture and reproduce the problem', ['Record exact steps and environment', 'Compare expected and actual behavior']],
    ['evidence', 'Collect diagnostic evidence', ['Attach screenshots, logs, or recordings without exposing secrets', 'Record frequency and affected users or systems']],
    ['classify', 'Classify severity, priority, and ownership', ['Assess impact and urgency', 'Identify the responsible component or team']],
    ['resolve', 'Implement and review the resolution', ['Create the smallest safe fix', 'Review code, configuration, or process changes']],
    ['verify', 'Test, deploy, and communicate closure', ['Verify the fix and check for regressions', 'Update stakeholders and document the resolution']]
  ],
  launch: [
    ['outcome', 'Define launch goals, audience, scope, and success measures', ['Clarify the released value', 'Set measurable adoption and quality targets']],
    ['readiness', 'Create the cross-functional readiness plan', ['Track product, operations, support, legal, and communication dependencies', 'Assign owners and deadlines']],
    ['validate', 'Validate quality and operational readiness', ['Complete testing and acceptance checks', 'Prepare monitoring, rollback, and incident response']],
    ['communicate', 'Prepare launch communication and enablement', ['Create internal and external messages', 'Train support, sales, or affected users']],
    ['release-review', 'Release, monitor, and run a post-launch review', ['Watch key health and adoption signals', 'Capture issues, decisions, and follow-up work']]
  ],
  assignmentTracker: [
    ['capture', 'Capture every assignment and requirement', ['Record course or project, instructions, and due date', 'Attach references and submission details']],
    ['breakdown', 'Break assignments into actionable steps', ['Identify research, drafting, practice, review, and submission work', 'Estimate effort and dependencies']],
    ['schedule', 'Schedule work before the deadline', ['Create intermediate milestones', 'Reserve buffer for feedback and technical problems']],
    ['complete', 'Complete and review the assignment', ['Check work against the rubric or requirements', 'Verify citations, files, and formatting']],
    ['submit', 'Submit and record the result', ['Confirm successful submission', 'Record feedback, grade, and lessons for future work']]
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
  ['annual-personal-review','Run an annual personal review','personal-productivity','routine'],
  ['daily-task-planning','Plan and prioritize daily tasks','personal-productivity','dailyPlanning'],
  ['grocery-shopping-list','Create and complete a grocery shopping list','household','shopping'],
  ['household-chore-schedule','Create a recurring household chore schedule','household','chores'],
  ['habit-tracker','Create and maintain a habit tracker','personal-productivity','habitTracker'],
  ['meeting-agenda-follow-up','Prepare, run, and follow up a meeting','work','meetingLifecycle'],
  ['employee-onboarding','Onboard a new employee','work','onboarding'],
  ['client-onboarding','Onboard a new client','work','onboarding'],
  ['content-calendar','Create and maintain a content calendar','marketing','contentCalendar'],
  ['social-media-campaign','Plan and execute a social media campaign','marketing','campaign'],
  ['bug-report-triage','Report, triage, and resolve a software bug','software-development','bugTriage'],
  ['product-launch','Plan and execute a product launch','project-management','launch'],
  ['assignment-tracker','Track and complete assignments','learning','assignmentTracker']
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