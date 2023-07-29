import { useEffect, useRef, useState } from 'react'
import { classNames } from '../utils/index'
 

export function Popup({
  action,
  children,
  className
}) {
  const [handleLeft, setHandleLeft] = useState(0)
  const [contentLeft, setContentLeft] = useState(9)
  const [open, setOpen] = useState(false)

  const positionLeft = e => {
    const target = e.target
    const component = target.classList.contains('popup-component') ? target : target.closest('.popup-component')
    if (component) {
      const handle = component.querySelector('.popupHandle')
      const content = component.querySelector('.popupContent')
      let newContentLeft = contentLeft
      if (content) {
        newContentLeft = Math.min(window.innerWidth - handle.getBoundingClientRect().left - content.clientWidth - 20, 9)
        setContentLeft(newContentLeft)
      }

      if (handle) {
        setHandleLeft(Math.max(0, handle.clientWidth / 2 - 12 - newContentLeft))
      }
    }
  }
  const props = {}
  if (action == 'click') {
    props.onFocus = e => {
      positionLeft(e)
      setOpen(true)
    }
    props.onBlur = e => {
      // Do not close if a child gains focus
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setOpen(false)
      }
    }
    props.tabIndex = 0
  } else {
    props.onMouseEnter = positionLeft
  }
  return <div className={classNames("popup-component", open && "open", className)} data-action={action || "hover"} {...props} style={{
    '--handleLeft': handleLeft.toString()+'px',
    '--contentLeft': contentLeft.toString()+'px'
  }}>
    {children}
  </div>
}

export function PopupContent({
  position,
  children
}) {
  const [below, setBelow] = useState(position == "below")
  const ref = useRef(null)
  useEffect(() => {
    if (!position) {
      const component = ref.current.parentElement
      const scrollParent = component.closest('.overflow-auto')

      const flip = () => {
        if (ref.current) {
          const top = component.getBoundingClientRect().top - ref.current.getBoundingClientRect().height
          setBelow(top < (scrollParent ? scrollParent.getBoundingClientRect().top : 0))
        }
      }
      (scrollParent || window).addEventListener('scroll', flip)
      window.addEventListener('resize', flip)
      flip()
    }
  }, [])

  return <div className={classNames(below ? "below" : "above", "popupContent")} ref={ref}>
    <div className="inner">
      {children}
    </div>
  </div>
}

export function PopupHandle({
  children
}) {
  return <div className="popupHandle">
    {children}
  </div>
}
