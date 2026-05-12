import { RecCard } from './RecCard'

export default {
  title: 'Components/RecCard',
  component: RecCard,
  tags: ['autodocs'],
  decorators: [Story => <div style={{ width: 480 }}><Story /></div>],
}

const universal = {
  grade: 'A',
  plain_name: 'Blood pressure screening',
  description: 'Blood pressure measurement to screen for high blood pressure. Recommended for all adults 18 and older.',
  doctor_prompt: null,
}

const conditional = {
  grade: 'B',
  plain_name: 'Lung cancer screening (low-dose CT scan)',
  description: 'A yearly low-dose CT scan to screen for lung cancer in adults 50–80 with a significant smoking history.',
  doctor_prompt: "Ask your doctor: 'Based on my smoking history, do I qualify for a yearly low-dose CT scan to screen for lung cancer?'",
}

export const Universal = { args: { rec: universal, conditional: false } }
export const Conditional = { args: { rec: conditional, conditional: true } }
