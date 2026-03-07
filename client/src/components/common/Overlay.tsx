"use client";

import React, { createContext, useContext, useEffect } from 'react';
import { cn } from '@/lib/utils';

const OverlayContext = createContext<{ isOpen: boolean; onClose: () => void } | undefined>(undefined);

function useOverlay() {
    const context = useContext(OverlayContext);
    if (!context) throw new Error("Overlay sub-components must be used within <Overlay />");
    return context;
}

export function Overlay({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <OverlayContext.Provider value={{ isOpen, onClose }}>
            {children}
        </OverlayContext.Provider>
    );
}

Overlay.Backdrop = function OverlayBackdrop({ className }: { className?: string }) {
    const { isOpen, onClose } = useOverlay();
    return (
        <div
            onClick={onClose}
            className={cn(
                "fixed inset-0 bg-black/50 transition-opacity duration-300 z-40",
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                className
            )}
        />
    );
};

Overlay.Content = function OverlayContent({ children, className }: { children: React.ReactNode; className?: string }) {
    const { isOpen } = useOverlay();
    return (
        <div className={cn(
            "fixed z-50 transition-all duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full", // Defaulting to side drawer
            className
        )}>
            {children}
        </div>
    );
};