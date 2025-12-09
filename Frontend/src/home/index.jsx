import React from 'react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText, Sparkles, Zap, Download, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

function HomePage() {
    const { isSignedIn, isLoaded } = useUser()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Header />
            
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                
                <div className="container mx-auto px-4 py-20 md:py-32">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium animate-fade-in">
                            <Sparkles className="w-4 h-4" />
                            <span>AI-Powered Resume Builder</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight animate-slide-up">
                            Build Your Dream Resume with{' '}
                            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                                Scholar<span className="text-primary">Suite</span>
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto animate-slide-up animation-delay-100">
                            Create professional, ATS-friendly resumes in minutes with AI-powered content generation
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-200">
                            <Link to={isSignedIn ? "/dashboard" : "/auth/sign-in"}>
                                <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    {isSignedIn ? 'Go to Dashboard' : 'Get Started Free'}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="text-lg px-8 py-6 rounded-full border-2 hover:bg-gray-50"
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Learn More
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 animate-fade-in animation-delay-300">
                            <div>
                                <div className="text-3xl font-bold text-primary">10K+</div>
                                <div className="text-sm text-gray-600">Resumes Created</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary">95%</div>
                                <div className="text-sm text-gray-600">Success Rate</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary">4.8★</div>
                                <div className="text-sm text-gray-600">User Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Why Choose ScholarSuite?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Everything you need to create a standout resume
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Feature 1 */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <Sparkles className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">AI-Powered Content</h3>
                            <p className="text-gray-600">
                                Generate professional summaries and bullet points with our advanced AI technology
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                            <p className="text-gray-600">
                                Create and customize your resume in minutes, not hours
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <FileText className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">ATS-Friendly</h3>
                            <p className="text-gray-600">
                                Optimized for Applicant Tracking Systems to increase your chances
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                                <Download className="w-7 h-7 text-orange-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy Download</h3>
                            <p className="text-gray-600">
                                Download your resume as PDF with one click, ready to send
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                                <Share2 className="w-7 h-7 text-cyan-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy Sharing</h3>
                            <p className="text-gray-600">
                                Share your resume with a unique link, perfect for online applications
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-gradient-to-br from-rose-50 to-red-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                                <Sparkles className="w-7 h-7 text-rose-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Multiple Templates</h3>
                            <p className="text-gray-600">
                                Choose from professional templates with customizable themes
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Build Your Perfect Resume?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of job seekers who landed their dream jobs with ScholarSuite
                    </p>
                    <Link to={isSignedIn ? "/dashboard" : "/auth/sign-in"}>
                        <Button 
                            size="lg" 
                            variant="secondary"
                            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            Start Building Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>© 2025 ScholarSuite. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default HomePage