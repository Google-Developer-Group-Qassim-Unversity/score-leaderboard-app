"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw, X, Loader2 } from "lucide-react"

interface PDFFlipbookProps {
  pdfUrl: string
  title?: string
  showCloseButton?: boolean
}

interface PageData {
  pageNumber: number
  canvas: HTMLCanvasElement
}

export function PDFFlipbook({ pdfUrl, title = "Magazine", showCloseButton = false }: PDFFlipbookProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState<PageData[]>([])
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileControls, setShowMobileControls] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [swipeStartX, setSwipeStartX] = useState(0)
  const [swipeCurrentX, setSwipeCurrentX] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [touchStartTime, setTouchStartTime] = useState(0)
  const [hasMoved, setHasMoved] = useState(false)
  const [isZooming, setIsZooming] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-hide controls on mobile after inactivity
  useEffect(() => {
    if (!isMobile) return
    
    const timer = setTimeout(() => {
      setShowMobileControls(false)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [currentPage, isMobile])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning || isFlipping) return
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          prevPage()
          break
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Spacebar
          e.preventDefault()
          nextPage()
          break
        case 'Home':
          e.preventDefault()
          if (isMobile) {
            setCurrentPage(1)
          } else {
            flipToPage(1, 'prev')
          }
          break
        case 'End':
          e.preventDefault()
          const lastPage = isMobile ? totalPages : totalPages - 1
          if (isMobile) {
            setCurrentPage(totalPages)
          } else {
            flipToPage(lastPage, 'next')
          }
          break
        case 'Escape':
          if (isMobile) {
            setShowMobileControls(!showMobileControls)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, totalPages, isMobile, isTransitioning, isFlipping, showMobileControls])

  const handleMobileInteraction = () => {
    if (isMobile) {
      setShowMobileControls(true)
    }
  }

  const handleMobileClick = (e: React.MouseEvent) => {
    if (!isMobile || isTransitioning || isZooming) return
    
    // Only show/hide controls on simple tap, don't navigate
    setShowMobileControls(!showMobileControls)
  }

  // Load PDF.js from CDN
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
        loadPDF()
      }
    }
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const loadPDF = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const pdf = await window.pdfjsLib.getDocument(pdfUrl).promise
      setTotalPages(pdf.numPages)
      
      // Render all pages
      const pagePromises = []
      for (let i = 1; i <= pdf.numPages; i++) {
        pagePromises.push(renderPage(pdf, i))
      }
      
      const renderedPages = await Promise.all(pagePromises)
      setPages(renderedPages)
      
      // Smooth loading animation
      setTimeout(() => {
        setIsLoading(false)
        setTimeout(() => setIsLoaded(true), 100)
      }, 300)
    } catch (err) {
      console.error('Error loading PDF:', err)
      setError('Failed to load PDF. Please try again.')
      setIsLoading(false)
    }
  }

  const renderPage = async (pdf: any, pageNumber: number): Promise<PageData> => {
    const page = await pdf.getPage(pageNumber)
    
    // Dynamic scale based on viewport for optimal quality
    const getOptimalScale = () => {
      if (typeof window === 'undefined') return 1.5
      const width = window.innerWidth
      const height = window.innerHeight
      // Calculate scale based on available space
      if (width < 768) {
        // Mobile: Single page full-screen optimization
        const availableHeight = height - 60 // Account for bottom controls
        return Math.max(1.5, Math.min(width / 300, availableHeight / 400))
      }
      return Math.min(width / 800, height / 800) // Desktop
    }
    
    const scale = getOptimalScale()
    const viewport = page.getViewport({ scale })
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    
    canvas.width = viewport.width
    canvas.height = viewport.height
    
    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise
    
    return {
      pageNumber,
      canvas
    }
  }

  const nextPage = () => {
    if (isMobile) {
      if (currentPage < totalPages && !isTransitioning) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentPage(currentPage + 1)
          setIsTransitioning(false)
        }, 200)
        handleMobileInteraction()
      }
    } else {
      if (currentPage < totalPages - 1) {
        flipToPage(currentPage + 2, 'next')
      }
    }
  }

  const prevPage = () => {
    if (isMobile) {
      if (currentPage > 1 && !isTransitioning) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentPage(currentPage - 1)
          setIsTransitioning(false)
        }, 200)
        handleMobileInteraction()
      }
    } else {
      if (currentPage > 1) {
        flipToPage(Math.max(1, currentPage - 2), 'prev')
      }
    }
  }

  const flipToPage = (pageNum: number, direction: 'next' | 'prev') => {
    if (isFlipping || pageNum === currentPage) return
    
    setIsFlipping(true)
    setFlipDirection(direction)
    setCurrentPage(pageNum)
    
    setTimeout(() => {
      setIsFlipping(false)
      setFlipDirection(null)
    }, 300)
  }

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const centerX = rect.width / 2
    
    if (clickX > centerX) {
      nextPage()
    } else {
      prevPage()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return
    
    const touch = e.touches[0]
    setSwipeStartX(touch.clientX)
    setSwipeCurrentX(touch.clientX)
    setTouchStartTime(Date.now())
    setHasMoved(false)
    
    // Detect if this might be a zoom gesture (two fingers)
    if (e.touches.length > 1) {
      setIsZooming(true)
      return
    }
    
    setIsZooming(false)
    handleMobileInteraction()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || isTransitioning) return
    
    // If multi-touch, it's likely zoom
    if (e.touches.length > 1) {
      setIsZooming(true)
      return
    }
    
    const touch = e.touches[0]
    const moveDistance = Math.abs(touch.clientX - swipeStartX)
    
    // Mark as moved if significant movement
    if (moveDistance > 10) {
      setHasMoved(true)
    }
    
    setSwipeCurrentX(touch.clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || isTransitioning || !isLoaded) return
    
    const touchEndTime = Date.now()
    const touchDuration = touchEndTime - touchStartTime
    const swipeDistance = swipeCurrentX - swipeStartX
    const minSwipeDistance = 50
    
    // Reset zoom state
    setTimeout(() => setIsZooming(false), 100)
    
    // If it was a zoom gesture, don't navigate
    if (isZooming) {
      setSwipeStartX(0)
      setSwipeCurrentX(0)
      return
    }
    
    // Handle significant swipe gesture
    if (Math.abs(swipeDistance) > minSwipeDistance && hasMoved) {
      if (swipeDistance > 0) {
        prevPage() // Swipe right = previous page
      } else {
        nextPage() // Swipe left = next page
      }
    } else if (!hasMoved && touchDuration < 300) {
      // Handle quick tap for navigation (only if no movement and quick tap)
      const rect = e.currentTarget.getBoundingClientRect()
      const centerX = rect.width / 2
      const tapX = swipeStartX
      
      // Only navigate on edge taps, center taps just show/hide controls
      if (tapX < centerX * 0.3) {
        prevPage() // Tap far left
      } else if (tapX > centerX * 1.7) {
        nextPage() // Tap far right
      } else {
        // Center tap - just toggle controls
        setShowMobileControls(!showMobileControls)
      }
    }
    
    setSwipeStartX(0)
    setSwipeCurrentX(0)
    setHasMoved(false)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 animate-pulse">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-6" />
          <div className="absolute inset-0 h-12 w-12 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-ping"></div>
        </div>
        <p className="text-base font-medium text-gray-700 dark:text-gray-300 animate-bounce">Loading PDF...</p>
        <div className="mt-4 flex gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400 text-center mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" size="sm">
          Try Again
        </Button>
      </div>
    )
  }

  if (pages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">No pages to display</p>
      </div>
    )
  }

  const currentPageData = pages.find(p => p.pageNumber === currentPage)
  const nextPageData = pages.find(p => p.pageNumber === currentPage + 1)

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Desktop Header - Hidden on mobile */}
      {!isMobile && (
        <div className="relative z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-2 mb-2 animate-slide-down">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate transition-all duration-300">{title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-all duration-300">
                Page {currentPage}{currentPage < totalPages ? `-${currentPage + 1}` : ''} of {totalPages}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                onClick={prevPage}
                disabled={currentPage <= 1 || isFlipping}
                variant="outline"
                size="sm"
                className="px-3 py-1 control-button"
                title="Previous page (← or ↑)"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-2 px-2">
                <input
                  type="range"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value)
                    if (page !== currentPage) {
                      flipToPage(page, page > currentPage ? 'next' : 'prev')
                    }
                  }}
                  disabled={isFlipping}
                  className="w-32 h-2 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg appearance-none cursor-pointer dark:from-blue-800 dark:to-blue-700 transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentPage / totalPages) * 100}%, #e5e7eb ${(currentPage / totalPages) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[2rem] text-center">{totalPages}</span>
              </div>
              
              <Button
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1 || isFlipping}
                variant="outline"
                size="sm"
                className="px-3 py-1 control-button"
                title="Next page (→ or ↓ or Space)"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={() => flipToPage(1, 'prev')}
                disabled={currentPage === 1 || isFlipping}
                variant="ghost"
                size="sm"
                className="px-2 py-1 control-button ml-2"
                title="First page (Home)"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main PDF Container */}
      <div 
        ref={containerRef}
        className={`relative flex-1 flex items-center justify-center perspective-1000 z-10 ${
          isMobile ? 'w-screen h-full bg-black' : 'w-full'
        }`}
        onClick={isMobile ? handleMobileClick : handlePageClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          perspective: '1000px',
          minHeight: isMobile ? '100vh' : '300px'
        }}
      >
        {/* Book Container */}
        <div 
          className={`relative bg-gray-100 dark:bg-gray-800 shadow-2xl overflow-hidden transition-all duration-300 ${
            isMobile 
              ? 'w-full h-full max-w-none max-h-none bg-black flex items-center justify-center' 
              : 'md:rounded-lg max-w-[95vw] max-h-[85vh] w-full book-container'
          }`}
          style={!isMobile ? { 
            aspectRatio: currentPageData ? `${currentPageData.canvas.width * 2}/${currentPageData.canvas.height}` : '16/9',
            width: '100%',
            height: 'auto'
          } : {}}
        >
          {isMobile ? (
            /* Mobile: Simple Page View */
            <div className="w-full h-full flex items-center justify-center bg-white dark:bg-gray-900 relative overflow-hidden">
              {currentPageData && (
                <img
                  src={currentPageData.canvas.toDataURL()}
                  alt={`Page ${currentPage}`}
                  className={`max-w-full max-h-full object-contain transition-all duration-200 ease-out ${
                    isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  } ${
                    isTransitioning ? 'opacity-75' : 'opacity-100'
                  }`}
                  style={{ 
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100vw',
                    maxHeight: 'calc(100vh - 60px)'
                  }}
                />
              )}
              
              {/* Swipe indicator */}
              {Math.abs(swipeCurrentX - swipeStartX) > 30 && swipeStartX > 0 && hasMoved && !isZooming && (
                <div className={`absolute top-1/2 transform -translate-y-1/2 text-white bg-black/50 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  swipeCurrentX > swipeStartX ? 'left-4' : 'right-4'
                }`}>
                  {swipeCurrentX > swipeStartX ? '← Previous' : 'Next →'}
                </div>
              )}
            </div>
          ) : (
            /* Desktop: Simple Double Page Spread */
            <>
              {/* Left Page */}
              <div className="absolute left-0 top-0 w-1/2 h-full flex items-center justify-center bg-white dark:bg-gray-900 p-1">
                {currentPageData && (
                  <img
                    src={currentPageData.canvas.toDataURL()}
                    alt={`Page ${currentPage}`}
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      isFlipping ? 'opacity-75' : 'opacity-100'
                    }`}
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%'
                    }}
                  />
                )}
              </div>

              {/* Right Page */}
              <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center bg-white dark:bg-gray-900 p-1">
                {nextPageData && (
                  <img
                    src={nextPageData.canvas.toDataURL()}
                    alt={`Page ${currentPage + 1}`}
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      isFlipping ? 'opacity-75' : 'opacity-100'
                    }`}
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%'
                    }}
                  />
                )}
              </div>

              {/* Central Binding Effect */}
              <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent transform -translate-x-1/2 opacity-30"></div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/95 to-gray-800/90 backdrop-blur-sm text-white transition-all duration-500 ease-out z-50 ${
          showMobileControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <div className="flex items-center justify-between px-4 py-3 relative">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 h-0.5 bg-blue-500 transition-all duration-300" 
                 style={{ width: `${(currentPage / totalPages) * 100}%` }}></div>
            
            {/* Left: Page Navigation */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1 || isTransitioning}
                className="text-white hover:bg-white/20 p-2 control-button disabled:opacity-50"
                title="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="text-sm font-medium min-w-[80px] text-center bg-white/10 rounded-full px-3 py-1">
                <span className="text-blue-300">{currentPage}</span> / {totalPages}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages || isTransitioning}
                className="text-white hover:bg-white/20 p-2 control-button disabled:opacity-50"
                title="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Center: Quick Navigation */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1 || isTransitioning}
                className="text-white hover:bg-white/20 p-2 control-button disabled:opacity-50"
                title="First page (Home key)"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Right: Hide Controls */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowMobileControls(false)}
                className="text-white hover:bg-white/20 p-2 control-button"
                title="Hide controls (Esc key)"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Mobile navigation hint */}
          <div className="text-xs text-gray-400 text-center pb-2">
            Swipe left/right • Tap far edges to navigate • Tap center to hide controls
          </div>
        </div>
      )}

      {/* Simple CSS without complex animations */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        /* Enhanced hover effects */
        .book-container:hover {
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
          transform: translateY(-2px);
        }
        
        /* Mobile optimizations */
        @media (max-width: 767px) {
          .pdf-page {
            width: 100vw !important;
            height: calc(100vh - 60px) !important;
            object-fit: contain !important;
          }
        }
        
        /* Smooth control animations */
        .control-button {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .control-button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .control-button:active {
          transform: scale(0.95);
        }
        
        @keyframes slide-down {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        
        /* Custom range slider styling */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          background: #2563eb;
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  )
}

declare global {
  interface Window {
    pdfjsLib: any
  }
}