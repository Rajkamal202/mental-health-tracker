import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Slider } from '../components/ui/slider'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { toast } from 'react-hot-toast'
import AIFeedback from '../components/AIFeedback'

export default function CheckIn() {
  const [mood, setMood] = useState(5)
  const [stressLevel, setStressLevel] = useState(5)
  const [journal, setJournal] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [aiFeedback, setAIFeedback] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Submit check-in
      await axios.post(`${import.meta.env.VITE_API_URL}/api/check-in`, {
        mood,
        stressLevel,
        journal
      })
      
      // Get AI feedback
      const aiResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/analyze/analyze`, {
        mood,
        stressLevel,
        journal
      })
      
      setAIFeedback(aiResponse.data.feedback)
      toast.success('Check-in submitted successfully')
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting check-in:', error)
      toast.error(error.response?.data?.message || 'Failed to submit check-in')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewCheckIn = () => {
    setMood(5)
    setStressLevel(5)
    setJournal('')
    setAIFeedback('')
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Check-in Submitted</CardTitle>
            <CardDescription className="text-center">
              Thank you for your check-in. Here's your AI feedback:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AIFeedback feedback={aiFeedback} />
            <div className="flex justify-center space-x-4 mt-6">
              <Button onClick={handleNewCheckIn}>New Check-in</Button>
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Daily Check-in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mood">How's your mood today? (1-5)</Label>
              <Slider
                id="mood"
                min={1}
                max={5}
                step={0.5}
                value={[mood]}
                onValueChange={(value) => setMood(value[0])}
                className="mt-2"
              />
              <div className="text-center font-medium">{mood}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stressLevel">What's your stress level? (1-5)</Label>
              <Slider
                id="stressLevel"
                min={1}
                max={5}
                step={0.5}
                value={[stressLevel]}
                onValueChange={(value) => setStressLevel(value[0])}
                className="mt-2"
              />
              <div className="text-center font-medium">{stressLevel}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="journal">How are you feeling today?</Label>
              <Textarea
                id="journal"
                placeholder="Write about your thoughts and feelings..."
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Check-in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}








