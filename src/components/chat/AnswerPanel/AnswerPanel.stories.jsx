import { fn } from '@storybook/test'
import { AnswerPanel } from './AnswerPanel'
import { AGE_RANGES, INSURANCE, PERSONAL_QUESTIONS, sexualHealthFactors } from '@/app/logic'

export default { title: 'Form/AnswerPanel', component: AnswerPanel, tags: ['autodocs'], decorators: [S => <div className="max-w-[400px]"><S /></div>], args: { onEdit: fn(), onAnswer: fn(), onBack: fn(), onSkip: fn(), onTune: fn(), onRetune: fn() } }

const CHIPS = [{ id: 'age', label: '45–49' }, { id: 'sex', label: 'Male' }]
const smoking = PERSONAL_QUESTIONS.find(q => q.id === 'smoking')

// The first question is on the landing page itself.
export const FirstQuestion = { args: { question: { id: 'age', title: 'How old are you?', description: 'What’s recommended changes with age.', options: AGE_RANGES, columns: 2 } } }
// Answers read back as chips. Tap one to change it.
export const WithAnswers = { args: { answers: CHIPS, question: { id: 'insurance', title: 'How do you get health insurance?', options: INSURANCE } } }
// With the basics done, the panel offers the health questions.
export const Offer = { args: { answers: [...CHIPS, { id: 'insurance', label: 'Job or own plan' }], offer: { count: 8, questions: 4 } } }
// A health question: progress, Back and Skip, and a line saying what the last answer added.
export const HealthQuestion = { args: { answers: [...CHIPS, { id: 'insurance', label: 'Job or own plan' }], feedback: 'Added: Diabetes screening', progress: { step: 1, total: 4, label: 'Your health' }, question: { id: smoking.id, title: smoking.text, options: smoking.options } } }
export const SexualHealth = { args: { answers: [...CHIPS, { id: 'insurance', label: 'Job or own plan' }], progress: { step: 3, total: 4, label: 'Your health' }, question: { id: 'sexual', title: 'Any of these true for you in the past year?', details: sexualHealthFactors('male'), footnote: 'You don’t need to say which. “Yes” adds free STI tests and HIV prevention to your plan.', options: [{ id: 'yes', label: 'Yes, add the tests' }, { id: 'no', label: 'No, not for me' }] } } }
export const Done = { args: { answers: [...CHIPS, { id: 'insurance', label: 'Job or own plan' }], done: { title: '4 added from your answers', detail: 'Diabetes screening, Hepatitis B screening, PrEP (HIV prevention medication), Syphilis screening' } } }
