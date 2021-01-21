import React, { useState, useEffect, useCallback, useRef } from 'react'

function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef()
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      const isSupported = element && element.addEventListener
      if (!isSupported) return
      const eventListener = (event) => savedHandler.current(event)
      element.addEventListener(eventName, eventListener)
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element]
  )
}

function CursorCore({
  color = '0, 0, 0',
  outerColor = '220, 90, 90',
  outerAlpha = 0.3,
  innerSizeH = 4,
  innerSizeW = 50,
  innerScale = 0.7,
  outerSize = 8,
  outerScale = 5
}) {
  const cursorOuterRef = useRef()
  const cursorInnerRef = useRef()
  const requestRef = useRef()
  const previousTimeRef = useRef()
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isActiveClickable, setIsActiveClickable] = useState(false)
  let endX = useRef(0)
  let endY = useRef(0)

  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY })
    cursorInnerRef.current.style.top = clientY + 'px'
    cursorInnerRef.current.style.left = clientX + 'px'
    endX.current = clientX
    endY.current = clientY
  }, [])

  const animateOuterCursor = useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 8
        coords.y += (endY.current - coords.y) / 8
        cursorOuterRef.current.style.top = coords.y + 'px'
        cursorOuterRef.current.style.left = coords.x + 'px'
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animateOuterCursor)
    },
    [requestRef] 
  )
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor)
    return () => {
      cancelAnimationFrame(requestRef.current)
    }
  }, [animateOuterCursor])

  const onMouseDown = useCallback(() => {
    setIsActive(true)
  }, [])

  const onMouseUp = useCallback(() => {
    setIsActive(false)
  }, [])

  const onMouseEnterViewport = useCallback(() => {
    setIsVisible(true)
  }, [])

  const onMouseLeaveViewport = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEventListener('mousemove', onMouseMove)
  useEventListener('mousedown', onMouseDown)
  useEventListener('mouseup', onMouseUp)
  useEventListener('mouseover', onMouseEnterViewport)
  useEventListener('mouseout', onMouseLeaveViewport)

  useEffect(() => {
    if (isActive) {
      cursorInnerRef.current.style.transform = `translateZ(0) scale(${innerScale})`
      cursorOuterRef.current.style.transform = `translateZ(0) scale(${outerScale})`
    } else {
      cursorInnerRef.current.style.transform = 'translateZ(0) scale(1)'
      cursorOuterRef.current.style.transform = 'translateZ(0) scale(1)'
    }
  }, [innerScale, outerScale, isActive])

  useEffect(() => {
    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = `translateZ(0) scale(${
        innerScale * 1.2
      })`
      cursorOuterRef.current.style.transform = `translateZ(0) scale(${
        outerScale * 1.4
      })`
    }
  }, [innerScale, outerScale, isActiveClickable])

  useEffect(() => {
    if (isVisible) {
      cursorInnerRef.current.style.opacity = 1
      cursorOuterRef.current.style.opacity = 1
    } else {
      cursorInnerRef.current.style.opacity = 0
      cursorOuterRef.current.style.opacity = 0
    }
  }, [isVisible])

  useEffect(() => {
    const clickables = document.querySelectorAll(
      'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
    )
    clickables.forEach((el) => {
      el.style.cursor = 'none'

      el.addEventListener('mouseover', () => {
        setIsActive(true)
      })
      el.addEventListener('click', () => {
        setIsActive(true)
        setIsActiveClickable(false)
      })
      el.addEventListener('mousedown', () => {
        setIsActiveClickable(true)
      })
      el.addEventListener('mouseup', () => {
        setIsActive(true)
      })
      el.addEventListener('mouseout', () => {
        setIsActive(false)
        setIsActiveClickable(false)
      })
    })

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener('mouseover', () => {
          setIsActive(true)
        })
        el.removeEventListener('click', () => {
          setIsActive(true)
          setIsActiveClickable(false)
        })
        el.removeEventListener('mousedown', () => {
          setIsActiveClickable(true)
        })
        el.removeEventListener('mouseup', () => {
          setIsActive(true)
        })
        el.removeEventListener('mouseout', () => {
          setIsActive(false)
          setIsActiveClickable(false)
        })
      })
    }
  }, [isActive])

  const styles = {
    cursorInner: {
      zIndex: 999,
      display: 'block',
      position: 'fixed',
      width: innerSizeW,
      height: innerSizeH,
      pointerEvents: 'none',
      backgroundColor: `rgba(${color}, 1)`,
      transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out',
      backfaceVisibility: 'hidden',
      willChange: 'transform',
      transform: 'rotate(20deg)'
    },
    cursorOuter: {
      zIndex: 999,
      display: 'block',
      position: 'fixed',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${outerColor}, ${outerAlpha})`,
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
      backfaceVisibility: 'hidden',
      willChange: 'transform',
      transform: 'rotate(20deg)'
    }
  }
  document.body.style.cursor = 'none'

  return (
    <React.Fragment>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </React.Fragment>
  )
}

function AnimatedCursor({
  color = '0, 0, 0',
  outerColor = '220, 90, 90',
  outerAlpha = 0.3,
  innerSizeH = 4,
  innerSizeW = 50,
  outerSize = 8,
  outerScale = 5,
  innerScale = 0.7
}) {

  return (
    <CursorCore
      color={color}
      outerColor={outerColor}
      outerAlpha={outerAlpha}
      innerSizeH={innerSizeH}
      innerSizeW={innerSizeW}
      innerScale={innerScale}
      outerSize={outerSize}
      outerScale={outerScale}
    />
  )
}

export default AnimatedCursor