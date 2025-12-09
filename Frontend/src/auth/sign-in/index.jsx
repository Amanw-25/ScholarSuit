import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import Header from '@/components/custom/Header'
function SignInPage() {
    return (
        <>
            {/* <Header /> */}
            <div className='flex justify-center items-center my-20'>
                <SignIn />
            </div>
        </>
    )
}

export default SignInPage