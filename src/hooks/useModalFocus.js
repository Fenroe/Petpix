import { useEffect, useRef } from 'react'

export const useModalFocus = () => {
  const modalRef = useRef()

  const firstFocusRef = useRef()

  const handleKeydown = (e) => {
    if (e.key !== 'Tab') return
    const focusableElements = modalRef.current.querySelectorAll('a, input, button, textarea, .upload-image-label')
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus()
      return e.preventDefault()
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus()
      e.preventDefault()
    }
  }

  useEffect(() => {
    firstFocusRef.current.focus()
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', (e) => handleKeydown(e))

    return () => document.addEventListener('keydown', (e) => handleKeydown(e))
  }, [])

  return [modalRef, firstFocusRef]
}
