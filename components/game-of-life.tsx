"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import debounce from "lodash.debounce"

interface LivingCells {
  [key: string]: boolean
}

interface WorldDimensions {
  height: number
  width: number
}

const patterns = {
  bHeptopmino: "O.OO\nOOO.\n.O..\n",
  piHeptopmino: "OOO\nO.O\nO.O\n",
  rPentomino: ".OO\nOO.\n.O.\n",
  acorn: ".O.....\n...O...\nOO..OOO\n",
}

export default function GameOfLife() {
  const cellSize = 21
  const initialSpeed = 100
  const { theme } = useTheme()
  const [worldDimensions, setWorldDimensions] = useState<WorldDimensions>({ height: 0, width: 0 })
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(initialSpeed)
  const [livingCells, setLivingCells] = useState<LivingCells>({})
  const [generation, setGeneration] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Get color palette based on theme
  const getColorPalette = useCallback(() => {
    switch (theme) {
      case "dark":
        return ["#0e4429", "#006d32", "#26a641", "#39d353"] // Green shades
      case "cyberwave":
        return ["#ff00ff", "#bf00ff", "#7f00ff", "#3f00ff"] // Purple/pink shades
      case "hacker":
        return ["#00ff00", "#00dd00", "#00bb00", "#009900"] // Matrix green shades
      default:
        return ["#0066cc", "#0099ff", "#33ccff", "#66e0ff"] // Blue shades
    }
  }, [theme])

  useEffect(() => {
    const handleResize = debounce(() => {
      setWorldDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 200)

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (worldDimensions.height > 0 && worldDimensions.width > 0) {
      initializePattern()
      setIsRunning(true)
    }
  }, [worldDimensions])

  function parsePatternToCoords(pattern: string, midX: number, midY: number) {
    const coords = []

    const rows = pattern.trim().split("\n")

    const height = rows.length
    const width = rows[0].length

    const offsetX = Math.floor(width / 2)
    const offsetY = Math.floor(height / 2)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (rows[y][x] === "O") {
          coords.push([midX + (x - offsetX), midY + (y - offsetY)])
        }
      }
    }

    return coords
  }

  const generatePattern = () => {
    const cells: LivingCells = {}
    const midX = Math.floor(worldDimensions.width / cellSize / 2) - 1
    const midY = Math.floor(worldDimensions.height / cellSize / 2) - 1

    const randomPattern = Object.values(patterns)[Math.floor(Math.random() * Object.values(patterns).length)]

    parsePatternToCoords(randomPattern, midX, midY).forEach(([x, y]) => {
      cells[`${x}-${y}`] = true
    })

    return cells
  }

  const initializePattern = () => {
    const cells = generatePattern()
    setLivingCells({ ...cells })
    setGeneration(0)
  }

  const draw = useCallback(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, worldDimensions.width, worldDimensions.height)

        const colorPalette = getColorPalette()

        Object.keys(livingCells).forEach((key) => {
          const [x, y] = key.split("-").map(Number)
          if (livingCells[key]) {
            ctx.fillStyle = colorPalette[Math.floor(Math.random() * colorPalette.length)]
            ctx.fillRect(x * cellSize, y * cellSize, cellSize - 2, cellSize - 2)
          }
        })
      }
    }
  }, [livingCells, worldDimensions, getColorPalette])

  const getNeighbors = (x: number, y: number): [number, number][] =>
    [-1, 0, 1]
      .flatMap((dx) => [-1, 0, 1].map((dy) => [x + dx, y + dy] as [number, number]))
      .filter(
        ([nx, ny]) =>
          (nx !== x || ny !== y) &&
          nx >= 0 &&
          ny >= 0 &&
          nx < Math.floor(worldDimensions.width / cellSize) &&
          ny < Math.floor(worldDimensions.height / cellSize),
      )

  const progressLife = useCallback(() => {
    const newLivingCells: LivingCells = {}
    const potentialCells: { [key: string]: number } = {}

    Object.entries(livingCells).forEach(([key, isAlive]) => {
      if (isAlive) {
        const [x, y] = key.split("-").map(Number)
        let livingNeighbors = 0

        getNeighbors(x, y).forEach(([nx, ny]) => {
          const neighborKey = `${nx}-${ny}`
          if (livingCells[neighborKey]) {
            livingNeighbors++
          } else {
            potentialCells[neighborKey] = (potentialCells[neighborKey] || 0) + 1
          }
        })

        if (livingNeighbors === 2 || livingNeighbors === 3) {
          newLivingCells[key] = true
        }
      }
    })

    Object.keys(potentialCells).forEach((key) => {
      if (potentialCells[key] === 3) {
        newLivingCells[key] = true
      }
    })

    setLivingCells(newLivingCells)
    setGeneration((gen) => gen + 1)

    if (isRunning) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(progressLife, speed)
    }
  }, [isRunning, speed, livingCells, worldDimensions])

  useEffect(() => {
    if (isRunning) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(progressLife, speed)
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isRunning, speed, progressLife])

  useEffect(() => {
    draw()
  }, [draw, livingCells])

  return (
    <>
      <canvas
        ref={canvasRef}
        width={worldDimensions.width}
        height={worldDimensions.height}
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-20"
      />
      <div className="controls-container mt-4 right-0 bottom-5 p-4 absolute opacity-20 group hidden md:block">
        <div className="options-icon group-hover:hidden">
          <Button className="btn">⚙️</Button>
        </div>
        <div className="controls hidden group-hover:block transition-all z-50">
          <Button className="btn" onClick={() => setIsRunning(true)}>
            Begin
          </Button>
          <Button className="btn" onClick={() => setIsRunning(false)}>
            Pause
          </Button>
          <Button className="btn" onClick={initializePattern}>
            Reset
          </Button>
          <div className="mt-2">
            Speed (ms):
            <input
              className="w-16 text-center font-semibold"
              type="number"
              value={speed}
              onChange={(e) => setSpeed(+e.target.value)}
            />
          </div>
          <div>Generation: {generation}</div>
        </div>
      </div>
    </>
  )
}
