'use client'
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback
} from 'react'

const CanvasContext = createContext()
export const useCanvas = () => useContext(CanvasContext)

export function CanvasProvider ({ children }) {
  const [scale, setScale] = useState(1)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [connectors, setConnectors] = useState([])
  const [showConnector, setShowConnector] = useState(false)
  const [showLength, setShowLength] = useState(false)
  const [pageNameTaking, setPageNameTaking] = useState('')
  const [selectedConnector, setSelectedConnector] = useState(null)

  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const buttonPosRef = useRef({ x: 0, y: 0 })
  const canvasSizeRef = useRef({ width: 0, height: 0 })
  const lastElementRotationRef = useRef(0)

  const currentRotationRef = useRef(0) // глобальний напрям
  const imageCacheRef = useRef(new Map())

  // розміри
  const CONNECTOR_WIDTH = 50
  const CONNECTOR_HEIGHT = 50
  const RAIL_HEIGHT = 20
  const BUTTON_OFFSET = 20

  // мапа поворотів
  const directionRotation = {
    right: 0,
    up: -Math.PI / 2,
    left: Math.PI,
    down: Math.PI / 2
  }

  const doubleDirections = {
    upDown: [directionRotation.up, directionRotation.down],
    upRight: [directionRotation.up, directionRotation.right],
    rightDown: [directionRotation.right, directionRotation.down]
  }

  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3))
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5))

  const handleAddButtonClick = e => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale

    const distance = Math.hypot(
      x - buttonPosRef.current.x,
      y - buttonPosRef.current.y
    )
    if (distance <= 15) {
      if (pageNameTaking === 'set-connector') {
        setShowLength(true)
      } else if (pageNameTaking === 'set-length-rail') {
        setShowConnector(true)
      } else {
        setShowConnector(true)
      }
    }
  }

  const getImage = useCallback((path, onLoad) => {
    const cache = imageCacheRef.current
    if (cache.has(path)) {
      const img = cache.get(path)
      if (img.complete) return img
      if (onLoad) img.addEventListener('load', onLoad, { once: true })
      return img
    }
    const img = new Image()
    if (onLoad) img.addEventListener('load', onLoad, { once: true })
    img.src = path
    cache.set(path, img)
    return img
  }, [])

  const calculateEndPoint = connector => {
    const effLength =
      connector.svgPath === '/connectors/line.svg' && connector.length
        ? connector.length
        : connector.width

    const angle = connector.rotation || 0
    return {
      x: connector.x + Math.cos(angle) * effLength,
      y: connector.y + Math.sin(angle) * effLength
    }
  }

  const updateButtonPosition = connector => {
    const endPoint = calculateEndPoint(connector)
    const angle = connector.rotation || 0
    buttonPosRef.current = {
      x: endPoint.x + Math.cos(angle) * BUTTON_OFFSET,
      y: endPoint.y + Math.sin(angle) * BUTTON_OFFSET
    }
  }

  const addConnector = (svgPath, length = null, newDirection) => {
    if (newDirection === '') return
    const isRail = svgPath === '/connectors/line.svg'
    const last = connectors[connectors.length - 1]

    let startX, startY, angle
    if (last) {
      const lastEnd = calculateEndPoint(last)
      startX = lastEnd.x
      startY = lastEnd.y
      angle = currentRotationRef.current
    } else {
      startX = buttonPosRef.current.x
      startY = buttonPosRef.current.y
      angle = currentRotationRef.current || 0
    }

    const width = isRail ? length || 100 : CONNECTOR_WIDTH
    const height = isRail ? RAIL_HEIGHT : CONNECTOR_HEIGHT

    const newConnector = {
      id: Date.now(),
      svgPath,
      x: startX,
      y: startY,
      width,
      height,
      length,
      rotation: angle,
      doubleRotation: doubleDirections[newDirection] || null
    }

    setConnectors(prev => [...prev, newConnector])

    if (newDirection) {
      if (doubleDirections[newDirection]) {
        // для подвійного повороту беремо перший кут
        currentRotationRef.current = angle + doubleDirections[newDirection]
      } else if (directionRotation[newDirection] !== undefined) {
        currentRotationRef.current = angle + directionRotation[newDirection]
      }
    }

    updateButtonPosition(newConnector)

    setSelectedConnector(svgPath)
    setShowConnector(false)
    setShowLength(false)
    setPageNameTaking('set-connector')
  }

  // малювання
  const drawGrid = (ctx, width, height) => {
    ctx.save()
    ctx.scale(scale, scale)
    ctx.fillStyle = '#ccc'
    const spacing = 20
    const cols = Math.floor(width / spacing / scale)
    const rows = Math.floor(height / spacing / scale)
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        ctx.beginPath()
        ctx.arc(i * spacing, j * spacing, 1, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.restore()
  }

  const drawButton = ctx => {
    ctx.save()
    ctx.translate(
      buttonPosRef.current.x * scale,
      buttonPosRef.current.y * scale
    )

    ctx.fillStyle = isButtonHovered ? '#f5f5f5' : '#fff'
    ctx.strokeStyle = '#d7d7d7'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(0, 0, 15, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Малюємо "+"
    const drawPlus = (xOffset = 0, yOffset = 0) => {
      ctx.fillStyle = isButtonHovered ? '#888' : '#aaa8a8'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('+', xOffset, yOffset)
    }

    const last = connectors[connectors.length - 1]
    if (last?.doubleRotation) {
      last.doubleRotation.forEach((rot, i) => {
        const offset = 20
        drawPlus(Math.cos(rot) * offset, Math.sin(rot) * offset)
      })
    } else {
      drawPlus()
    }

    ctx.restore()
  }

  const drawConnectors = ctx => {
    const onImgReady = () => drawAll()

    connectors.forEach(connector => {
      const img = getImage(connector.svgPath, onImgReady)
      if (!img.complete) return

      ctx.save()
      ctx.scale(scale, scale)

      ctx.translate(connector.x, connector.y)
      ctx.rotate(connector.rotation || 0)

      const w =
        connector.svgPath === '/connectors/line.svg' && connector.length
          ? connector.length
          : connector.width
      const h = connector.height

      // Малюємо від (0, -h/2), щоб новий елемент точно починався з кінця попереднього
      ctx.drawImage(img, 0, -h / 2, w, h)

      ctx.restore()
    })
  }

  const drawAll = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { width, height } = canvasSizeRef.current
    ctx.clearRect(0, 0, width, height)
    drawGrid(ctx, width, height)
    drawConnectors(ctx)
    drawButton(ctx)
  }, [scale, isButtonHovered, connectors])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resizeCanvas = () => {
      const width = container.offsetWidth
      const height = container.offsetHeight
      canvas.width = width
      canvas.height = height
      canvasSizeRef.current = { width, height }

      if (connectors.length === 0) {
        buttonPosRef.current = { x: width / scale / 2, y: height / scale / 2 }
        lastElementRotationRef.current = 0
        currentRotationRef.current = 0
      }
      drawAll()
    }

    const checkHover = e => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / scale
      const y = (e.clientY - rect.top) / scale
      const dist = Math.hypot(
        x - buttonPosRef.current.x,
        y - buttonPosRef.current.y
      )
      const hovered = dist <= 15
      if (hovered !== isButtonHovered) {
        setIsButtonHovered(hovered)
        canvas.style.cursor = hovered ? 'pointer' : 'default'
      }
    }

    const handleWheel = e => {
      const isTouchpad = Math.abs(e.deltaY) < 15 && Math.abs(e.deltaX) < 15
      if (!isTouchpad) return
      e.preventDefault()
      setScale(prev =>
        Math.max(0.5, Math.min(3, prev + (e.deltaY > 0 ? -0.05 : 0.05)))
      )
    }

    resizeCanvas()
    const observer = new ResizeObserver(resizeCanvas)
    observer.observe(container)

    canvas.addEventListener('wheel', handleWheel, { passive: false })
    canvas.addEventListener('click', handleAddButtonClick)
    canvas.addEventListener('mousemove', checkHover)

    return () => {
      observer.disconnect()
      canvas.removeEventListener('wheel', handleWheel)
      canvas.removeEventListener('click', handleAddButtonClick)
      canvas.removeEventListener('mousemove', checkHover)
    }
  }, [scale, isButtonHovered, connectors, drawAll])

  useEffect(() => {
    drawAll()
  }, [drawAll])

  return (
    <CanvasContext.Provider
      value={{
        scale,
        zoomIn,
        zoomOut,
        canvasRef,
        containerRef,
        showConnector,
        setShowConnector,
        showLength,
        setShowLength,
        connectors,
        addConnector,
        selectedConnector,
        setSelectedConnector,
        setPageNameTaking,
        lastElementRotation: lastElementRotationRef.current
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}
