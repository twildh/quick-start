import { useEffect, useRef } from "react"

/**
 * Source: https://usehooks.com/useEventListener (modified)
 */
const useEventListener = (
  eventName: string,
  handler: (event: any) => void,
  element = window,
): void => {
  const savedHandler = useRef<(event: any) => void>()

  useEffect((): void | (() => void | undefined) => {
    savedHandler.current = handler
  }, [handler])

  useEffect((): void | (() => void | undefined) => {
    // Make sure element supports `addEventListener`
    const isSupported = element && element.addEventListener
    if (!isSupported) {
      return undefined
    }

    // Create event listener that calls handler function stored in `ref`
    const eventListener = (event: any): void => {
      if (savedHandler.current) {
        savedHandler.current(event)
      }
    }

    // Add event listener
    element.addEventListener(eventName, eventListener)

    // Remove event listener on component unmount
    return (): void => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

export default useEventListener
