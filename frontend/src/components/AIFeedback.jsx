import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Bot } from 'lucide-react'

export default function AIFeedback({ feedback }) {
  return (
    <Card className="mt-6 max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-2">
        <Bot className="w-5 h-5" />
        <CardTitle>AI Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{feedback}</p>
      </CardContent>
    </Card>
  )
}





