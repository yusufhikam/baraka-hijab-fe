import { createPortal } from 'react-dom'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import { useEffect, useRef, useState } from 'react'

type ModalProps = {
    children: React.ReactNode
    onClose: () => void
    variant?: string
    animationType: 'slideDown' | 'scale' | 'fade' | 'none' | 'slideLeft'
    isOpen: boolean
}

export default function Modal({
    children,
    onClose,
    variant,
    animationType,
    isOpen,
}: ModalProps) {
    const { isDarkMode } = useDarkMode()
    const modalRef = useRef<HTMLDivElement>(null)
    const [showContent, setShowContent] = useState<boolean>(false)

    // open modal
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setShowContent(true)
            }, 10)

            return () => clearTimeout(timer)
        } else {
            setShowContent(false)
        }
    }, [isOpen])

    // close modal animation
    useEffect(() => {
        if (!isOpen && showContent) {
            const timeout = setTimeout(() => onClose(), 300)
            return () => clearTimeout(timeout)
        }
    }, [isOpen, showContent, onClose])

    const handleClickOutside = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setShowContent(false)
            setTimeout(() => {
                onClose()
            }, 300)
        }
    }

    const animationClasses = {
        scale: showContent ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        fade: showContent ? 'opacity-100' : 'opacity-0',
        slideLeft: showContent //for mobile
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-4',
        slideDown: showContent
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4',
        none: '',
    }

    return createPortal(
        <div
            className={`fixed top-0 z-50 flex h-full w-full items-center bg-black/25 backdrop-blur-[3px] transition-opacity duration-300 ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
            onClick={handleClickOutside}
        >
            <div
                ref={modalRef}
                className={`transform transition-all duration-300 ${
                    animationClasses[animationType]
                } ${variant} ${isDarkMode ? '' : ''}`}
            >
                {children}
            </div>
        </div>,
        document.getElementById('modal')!
    )
}
