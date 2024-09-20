import React from 'react'
import Footer from './_components/Footer';
import Header from './_components/Menu/Header';

interface RoutesLayoutProps {
    children: React.ReactNode;

}
const RoutesLayout = ({ children }: RoutesLayoutProps) => {
    return (
        <div>
            <Header/>
            <div className='min-h-screen'>
                {children}
            </div>

            <Footer/>
        </div>
    )
}

export default RoutesLayout
