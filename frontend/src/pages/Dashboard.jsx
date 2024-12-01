import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Slider } from '../components/ui/slider'
import { Textarea } from '../components/ui/textarea'
import { Bell, LineChartIcon, BookOpen, BarChart2, Settings } from 'lucide-react'
import { toast } from 'react-hot-toast'

const NavItem = ({ href, icon: Icon, children }) => (
  <Link to={href} className="flex items-center text-sm font-medium transition-colors hover:text-primary">
    <Icon className="h-4 w-4 mr-2" />
    {children}
  </Link>
)

const InsightCard = ({ title, change, message }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center gap-2">
        {change >= 0 ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        {Math.abs(change)}% vs last week
      </p>
      {message && (
        <p className="mt-4 text-sm text-muted-foreground">{message}</p>
      )}
    </CardContent>
  </Card>
)

export default function Dashboard() {
  const [currentMood, setCurrentMood] = useState(3)
  const [checkInsData, setCheckInsData] = useState({ checkIns: [], stats: {} })
  const [loading, setLoading] = useState(true)
  const [journal, setJournal] = useState('')
  const [aiFeedback, setAiFeedback] = useState('')

  useEffect(() => {
    fetchCheckIns()
  }, [])

  const fetchCheckIns = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/check-in`)
      setCheckInsData(response.data)
    } catch (error) {
      console.error('Error fetching check-ins:', error)
      toast.error('Failed to fetch check-ins')
    } finally {
      setLoading(false)
    }
  }

  const handleMoodSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/check-in`, {
        mood: currentMood,
        stressLevel: currentMood, 
        journal: journal
      })
      toast.success('Mood recorded successfully')
      fetchCheckIns() 
      getAIFeedback() 
    } catch (error) {
      console.error('Error submitting mood:', error)
      toast.error('Failed to record mood')
    }
  }

  const getAIFeedback = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/analyze/analyze`, {
        mood: currentMood,
        stressLevel: currentMood,
        journal: journal
      })
      setAiFeedback(response.data.feedback)
    } catch (error) {
      console.error('Error getting AI feedback:', error)
      toast.error('Failed to get AI feedback')
    }
  }

  const moodData = checkInsData.checkIns?.map(checkIn => ({
    date: new Date(checkIn.createdAt).toLocaleDateString(),
    value: checkIn.mood
  })) || []

  const stepsData = [
    { date: 'June 15', value: 4500 },
    { date: 'June 22', value: 5200 },
    { date: 'June 29', value: 6800 },
    { date: 'July 6', value: 5500 },
    { date: 'July 13', value: 4800 },
    { date: 'July 20', value: 6000 },
  ]

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
    
      <main className="container mx-auto py-6 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="mood-slider" className="block text-sm font-medium text-gray-700">
                  Rate your mood (1-5)
                </label>
                <Slider
                  id="mood-slider"
                  value={[currentMood]}
                  onValueChange={(value) => setCurrentMood(value[0])}
                  max={5}
                  min={1}
                  step={0.5}
                />
                <div className="text-center font-medium">{currentMood}</div>
              </div>
              <Textarea
                placeholder="Write about your thoughts and feelings..."
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                rows={4}
              />
              <Button onClick={handleMoodSubmit}>Submit</Button>
            </div>
          </CardContent>
        </Card>

        {aiFeedback && (
          <Card>
            <CardHeader>
              <CardTitle>AI Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{aiFeedback}</p>
            </CardContent>
          </Card>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-4">Trends</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Daily Mood</CardTitle>
                  <div className="text-2xl font-bold">{checkInsData.stats.averageMood || '0.0'}</div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Average Daily Steps</CardTitle>
                  <div className="text-2xl font-bold">6000</div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stepsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Insights</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <InsightCard 
              title="Mood" 
              change={-10} 
            />
            <InsightCard 
              title="Steps" 
              change={20} 
            />
            <InsightCard 
              title="Sleep" 
              change={-10} 
            />
            <InsightCard 
              title="Social" 
              change={20} 
            />
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  You're feeling more energetic lately, keep it up!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}









