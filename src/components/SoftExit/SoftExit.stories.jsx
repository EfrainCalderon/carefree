import { SoftExit } from './SoftExit'

export default {
  title: 'Components/SoftExit',
  component: SoftExit,
  tags: ['autodocs'],
  decorators: [Story => <div style={{ width: 480 }}><Story /></div>],
}

export const Medicare = {
  args: {
    message: "Medicare covers many preventive services, but through its own rules — not the same law this tool is based on. For the most accurate picture of your coverage, visit medicare.gov or call 1-800-MEDICARE.",
  },
}

export const Unsure = {
  args: {
    message: "Check your insurance card — the plan name and a customer service number should be on the back. A quick call can tell you what type of plan you have and confirm your preventive care benefits.",
  },
}
