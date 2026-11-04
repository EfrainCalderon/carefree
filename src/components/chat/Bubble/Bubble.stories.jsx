import { Bubble } from './Bubble'

export default { title: 'Chat/Conversation/Bubble', component: Bubble, tags: ['autodocs'] }

export const Assistant = { args: { role: 'assistant', children: 'First, how old are you?' } }
export const User = { args: { role: 'user', children: '45–49' } }

// 6px between one speaker's messages, 20px when the speaker changes.
export const Conversation = {
  render: () => (
    <div className="flex max-w-xl flex-col">
      <Bubble role="assistant">Hi. Most insurance covers a set of preventive checkups at no cost.</Bubble>
      <div className="mt-(--cf-chat-gap-group)"><Bubble role="assistant">First, how old are you?</Bubble></div>
      <div className="mt-(--cf-chat-gap-turn)"><Bubble role="user">45–49</Bubble></div>
    </div>
  ),
}
