import { fn } from '@storybook/test'
import { QuestionStep } from './QuestionStep'
import { OptionList } from '../OptionList/OptionList'
import { AGE_RANGES, INSURANCE, SEX, sexualHealthFactors } from '@/app/logic'

export default { title: 'Form/QuestionStep', component: QuestionStep, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

// Age is a tap on a range. No typing, and no exact age is ever collected.
export const Age = {
  render: () => (
    <QuestionStep title="How old are you?" description="What’s recommended changes with age." progress={{ step: 0, total: 3, label: 'About you' }} onBack={fn()}>
      <OptionList label="How old are you?" options={AGE_RANGES} columns={2} onSelect={fn()} />
    </QuestionStep>
  ),
}
export const Sex = {
  render: () => (
    <QuestionStep title="What sex were you assigned at birth?" description="Some screenings depend on the body you were born with." progress={{ step: 1, total: 3, label: 'About you' }} onBack={fn()}>
      <OptionList label="Sex assigned at birth" options={SEX} onSelect={fn()} />
    </QuestionStep>
  ),
}
export const Insurance = {
  render: () => (
    <QuestionStep title="How do you get health insurance?" progress={{ step: 2, total: 3, label: 'About you' }} onBack={fn()}>
      <OptionList label="How do you get health insurance?" options={INSURANCE} onSelect={fn()} />
    </QuestionStep>
  ),
}
// Sexual health is a self-select list: the app never records which line applies. Each line leads with its key words.
export const SexualHealth = {
  render: () => (
    <QuestionStep
      title="Any of these true for you in the past year?"
      details={sexualHealthFactors('male')}
      footnote="You don’t need to say which. “Yes” adds free STI tests and HIV prevention to your plan."
      progress={{ step: 3, total: 4, label: 'Your health' }}
      onBack={fn()}
    >
      <OptionList label="Add sexual health tests?" options={[{ id: 'yes', label: 'Yes, add the tests' }, { id: 'no', label: 'No, not for me' }]} onSelect={fn()} />
    </QuestionStep>
  ),
}
