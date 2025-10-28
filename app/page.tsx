'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import AuthModal from '@/components/AuthModal'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import type { User } from '@supabase/supabase-js'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-accent-50/20">
      {/* Professional Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">AIVisaPro</span>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600 hidden md:block">
                    {user.email}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <Button size="sm" onClick={() => openAuthModal('signup')}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-accent-50 border border-accent-200 rounded-full mb-8">
            <span className="text-sm font-medium text-accent-700">
              Trusted by 100,000+ global travelers
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Streamline Your Global Travel
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
              with AI-Powered Visa Processing
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Navigate complex international visa requirements with confidence.
            Our intelligent platform transforms document-heavy processes into
            seamless, guided digital workflows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => openAuthModal('signup')}>
              Start Application
            </Button>
            <Button variant="outline" size="lg">
              View Supported Countries
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span>90% Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Enterprise-Grade Visa Processing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sophisticated automation meets intuitive design. Experience the future of international travel preparation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Intelligent Document Analysis"
            description="AI-powered validation ensures your documents meet specific requirements for each destination country, reducing rejection rates by 85%."
            accentColor="primary"
          />
          <FeatureCard
            title="Automated Form Completion"
            description="Smart pre-fill technology leverages your profile data to complete complex visa applications in minutes instead of hours."
            accentColor="accent"
          />
          <FeatureCard
            title="Real-Time Processing Updates"
            description="Track your application status with live updates from embassies and consulates, with predictive timeline estimates."
            accentColor="primary"
          />
          <FeatureCard
            title="Multi-Country Management"
            description="Plan complex itineraries across multiple destinations with automatic visa requirement mapping and timeline coordination."
            accentColor="accent"
          />
          <FeatureCard
            title="Compliance Monitoring"
            description="Stay within legal limits with automatic tracking of visa-free days, work authorization periods, and residency requirements."
            accentColor="primary"
          />
          <FeatureCard
            title="Enterprise Integration"
            description="White-label API for HR platforms, travel agencies, and universities to streamline organizational visa workflows."
            accentColor="accent"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <StatCard number="250M+" label="Annual visa applications processed globally" />
            <StatCard number="90%" label="Application accuracy rate" />
            <StatCard number="50+" label="Supported destination countries" />
            <StatCard number="<10min" label="Average application completion time" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to Simplify Your International Travel?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of professionals, students, and travelers who trust AIVisaPro
            for their visa processing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => openAuthModal('signup')}>
              Create Free Account
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-xl font-bold text-gray-900">AIVisaPro</span>
              </div>
              <p className="text-gray-600 text-sm">
                Simplifying global travel with AI-powered visa automation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 AIVisaPro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  accentColor: 'primary' | 'accent'
}

function FeatureCard({ title, description, accentColor }: FeatureCardProps) {
  const colors = {
    primary: 'from-primary-500 to-primary-600',
    accent: 'from-accent-500 to-accent-600',
  }

  return (
    <Card hover>
      <div className={`w-12 h-12 bg-gradient-to-br ${colors[accentColor]} rounded-lg mb-4 flex items-center justify-center`}>
        <div className="w-6 h-6 border-2 border-white rounded"></div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </Card>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-5xl font-bold mb-2">{number}</div>
      <div className="text-primary-100 text-sm">{label}</div>
    </div>
  )
}
