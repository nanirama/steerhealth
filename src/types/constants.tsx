
import { Question } from './types';

export const QUESTIONS: Question[] = [
  // --- Pre-Visit ---
  {
    id: 'q1',
    section: 'pre-visit',
    text: 'Can someone sitting at home at 11 PM book a confirmed appointment on your website without speaking to staff?',
    weight: 15,
    priority: 1, // Highest Priority
    failureInsight: "You have a 'Closed' sign on your door 16 hours a day. Modern patients expect to book instantly, not play phone tag.",
    fixText: "Add an online booking widget that syncs with your calendar immediately."
  },
  {
    id: 'q2',
    section: 'pre-visit',
    text: 'If a patient calls and you miss it, do they get an automatic text back instantly?',
    weight: 15,
    priority: 2,
    failureInsight: "62% of calls to clinics go unanswered. Without auto-text-back, those patients immediately call your competitor.",
    fixText: "Install a 'Missed Call Text Back' workflow to capture every lead instantly."
  },
  {
    id: 'q3',
    section: 'pre-visit',
    text: 'Do you automatically text patients a reminder 24 hours before their visit?',
    weight: 10,
    priority: 6,
    failureInsight: "Manual confirmations consume hours of staff time. Automated reminders reduce no-show rates by up to 40% instantly.",
    fixText: "Automate SMS reminders 24h and 2h before appointments."
  },
  
  // --- Visit ---
  {
    id: 'q4',
    section: 'visit',
    text: 'Can patients fill out their intake forms on their phone before they walk in?',
    weight: 15,
    priority: 5,
    failureInsight: "Clipboards create bottlenecks in the waiting room. Mobile-first intake speeds up appointment flow.",
    fixText: "Switch to digital intake forms that write directly to your EMR."
  },
  {
    id: 'q5',
    section: 'visit',
    text: 'Do your front-desk staff have to manually type patient data from forms into your computer?',
    weight: 15,
    priority: 4,
    reverseScore: true, // "No" is the correct answer. "Yes" implies manual work.
    failureInsight: "Double-entry is the enemy of profit. Paying staff to type data that patients already wrote down is a sunk cost.",
    fixText: "Integrate your intake software with your patient record system."
  },
  
  // --- Post-Visit ---
  {
    id: 'q6',
    section: 'post-visit',
    text: 'Do you automatically send a text asking for a Google Review 1 hour after they leave?',
    weight: 15,
    priority: 3,
    failureInsight: "Review requests sent days later have a 90% lower conversion rate. Speed is the key to building reputation.",
    fixText: "Trigger an automated review request SMS exactly 60 minutes after checkout."
  },
  {
    id: 'q7',
    section: 'post-visit',
    text: "Do you have an automated system that texts patients who haven't visited in 6 months to book a check-up?",
    weight: 15,
    priority: 7,
    failureInsight: "Your database is a goldmine. Ignoring past patients is expensive; reactivating them is pure profit.",
    fixText: "Launch a 'Database Reactivation' campaign to patients unseen in 6+ months."
  },
];
