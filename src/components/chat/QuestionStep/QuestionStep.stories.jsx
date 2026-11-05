import { fn } from '@storybook/test'
import { QuestionStep } from './QuestionStep'
import { OptionList } from '../OptionList/OptionList'
import { AgeInput } from '../AgeInput/AgeInput'
import { SEXUAL_HEALTH } from '@/app/logic'

export default { title: 'Form/QuestionStep', component: QuestionStep, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

const SEX = [{ id: 'male', label: 'Male' }, { id: 'female', label: 'Female' }]

export const Age = {
  render: () => (
    <QuestionStep title="How old are you?" description="Screenings change with age. Only your age range is used." progress={{ step: 0, total: 4, label: 'About you' }}>
      <AgeInput onSubmit={fn()} />
    </QuestionStep>
  ),
}
export const Sex = {
  render: () => (
    <QuestionStep title="What sex were you assigned at birth?" description="Some screenings depend on the body you were born with." progress={{ step: 1, total: 4, label: 'About you' }} onBack={fn()}>
      <OptionList label="Sex assigned at birth" options={SEX} onSelect={fn()} />
    </QuestionStep>
  ),
}
// The opt-in at the end of the basics: the bar is full.
export const OptIn = {
  render: () => (
    <QuestionStep title="Want a more accurate plan?" description="A few quick questions could add up to 4 more free screenings. About a minute." progress={{ step: 4, total: 4, label: 'About you' }} onBack={fn()}>
      <OptionList label="Improve your plan?" options={[{ id: 'yes', label: 'Yes, ask me' }, { id: 'no', label: 'No, show my plan' }]} onSelect={fn()} />
    </QuestionStep>
  ),
}
// Sexual health is a self-select list: the app never records which factor applies.
export const SexualHealth = {
  render: () => (
    <QuestionStep
      title="Some free tests depend on your sexual health"
      description="If any of these have been true for you in the last year, they’re worth asking about. No need to say which."
      details={[...SEXUAL_HEALTH.factors.slice(0, 4), SEXUAL_HEALTH.maleFactor, ...SEXUAL_HEALTH.factors.slice(4)]}
      progress={{ step: 3, total: 4, label: 'Improve your plan' }}
      onBack={fn()}
    >
      <OptionList label="Add sexual health tests?" options={[{ id: 'yes', label: 'Add these tests' }, { id: 'no', label: 'Not for me' }]} onSelect={fn()} />
    </QuestionStep>
  ),
}
