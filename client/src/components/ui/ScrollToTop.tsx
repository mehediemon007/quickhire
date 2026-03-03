'use client';

import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils';

import { ArrowUp } from 'lucide-react';

interface Props {
    className?: string
}

function ScrollToTop({ className } : Props) {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {

        if(window.scrollY > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

    }

    useEffect(()=> {

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        }

    },[])

    return (
        <div className={cn("fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50", className)}>
            <button 
                type='button'
                onClick={scrollToTop}
                className={cn(
                    "inline-flex justify-center items-center w-10 h-10 text-white bg-primary rounded-full shadow-lg transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 active:scale-95",
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none",
                    className
                )}
                aria-label='Scroll to top'
            >
                <ArrowUp size={24}/>

            </button>
        </div>
    )
}

export default ScrollToTop