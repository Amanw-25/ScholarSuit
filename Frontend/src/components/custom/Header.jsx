import React from 'react'
import logo from '../../../public/logo.svg'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'

function Header() {
    const { isSignedIn, user } = useUser()
    
    return (
        <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm'>
            <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
                {/* Logo */}
                <Link to="/" className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
                    <img src={logo} alt="ScholarSuite Logo" className='h-10 w-10' />
                    <span className='text-2xl font-bold'>
                        Scholar<span className='text-primary'>Suite</span>
                    </span>
                </Link>

                {/* Navigation */}
                {isSignedIn ? (
                    <div className='flex items-center gap-4'>
                        <Link to="/dashboard">
                            <Button 
                                variant="outline" 
                                className='border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-semibold'
                            >
                                Dashboard
                            </Button>
                        </Link>
                        <div className='flex items-center gap-3 pl-3 border-l border-gray-200'>
                            <div className='hidden md:block text-right'>
                                <p className='text-sm font-medium text-gray-900'>{user?.fullName}</p>
                                <p className='text-xs text-gray-500'>{user?.primaryEmailAddress?.emailAddress}</p>
                            </div>
                            <UserButton 
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10",
                                        userButtonPopoverCard: "shadow-xl border border-gray-200",
                                        userButtonPopoverActionButton: "hover:bg-gray-100",
                                        userButtonPopoverActionButtonText: "text-gray-700",
                                        userButtonPopoverActionButtonIcon: "text-gray-600"
                                    }
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <Link to="/auth/sign-in">
                        <Button className='font-medium shadow-sm hover:shadow-md transition-shadow'>
                            Get Started
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Header