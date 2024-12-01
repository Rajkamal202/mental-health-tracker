import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { useAuth } from '../context/AuthContext'; // Assume this hook exists for authentication
import { motion } from 'framer-motion';

export default function Home() {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">

      

      <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center mb-24"
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              Elevate Your Mental Well-being
            </h1>
            <p className="text-xl leading-8 text-muted-foreground mb-12 max-w-3xl mx-auto">
              Embark on a transformative journey with our AI-powered mental health platform. Track your mood, manage stress, and cultivate lasting positive habits.
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="max-w-xs"
                />
                <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                </Button>
                </Link>
              </div>
            )}
            <div className="relative">
              <img
                src="\imageweb.png"
                alt="MindfulMe App Interface"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-lg"></div>
            </div>
          </motion.div>
          
          {/* Features Section */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-16">Cutting-edge Features for Your Mental Wellness</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<CheckCircleIcon />}
                title="AI-Powered Insights"
                description="Our advanced AI analyzes your daily check-ins to provide personalized recommendations and insights, helping you understand your emotional patterns."
              />
              <FeatureCard
                icon={<ChartIcon />}
                title="Interactive Progress Tracking"
                description="Visualize your mental health journey with interactive charts and goal-setting tools. Celebrate milestones and identify areas for growth."
              />
              <FeatureCard
                icon={<LockIcon />}
                title="Bank-Grade Security"
                description="Your data is protected with end-to-end encryption and adheres to HIPAA standards, ensuring your personal information remains confidential and secure."
              />
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="mb-24 bg-primary/5 rounded-lg p-12">
            <h2 className="text-4xl font-bold text-center mb-12">Transforming Lives</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard
                quote="MindfulMe has revolutionized my approach to mental health. The AI insights have helped me identify triggers I never noticed before."
                author="Dr. Sarah K., Psychologist"
                image="/women.avif"
              />
              <TestimonialCard
                quote="As someone who struggled with consistency in self-care, the interactive progress tracking has been a game-changer. I'm more motivated than ever."
                author="Michael T., Software Engineer"
                image="/men.jpg"
              />
            </div>
          </div>

          {/* Call-to-Action Section */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Mental Health?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join over 100,000 users who have experienced significant improvements in their well-being with MindfulMe.
            </p>
            {!user && (
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Your 14-Day Free Trial
                </Button>
              </Link>
            )}
            {user && (
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6">
                  Go to Your Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-primary/5 mt-24 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">&copy; 2024 MindfulMe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="flex flex-col items-center text-center p-6">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({ quote, author, image }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <img src={image} alt={author} className="w-20 h-20 rounded-full mb-6" />
        <p className="text-lg mb-4 italic">"{quote}"</p>
        <p className="font-semibold">{author}</p>
      </CardContent>
    </Card>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      className="h-8 w-8 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      className="h-8 w-8 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="h-8 w-8 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

