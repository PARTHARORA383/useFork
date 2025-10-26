"use client"

import { AnimatePresence, motion } from "motion/react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/cn"
import { ArrowRight, Command, Ghost, SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import Link from "next/link"
import { createContext, ReactNode, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { WaveInText } from "./wave-in-text"


interface ItemProps {
  title: string,
  href: string,
  icon?: ReactNode
}

interface ObjectProps {
  heading: string,
  items: ItemProps[]
}

interface DataProps {
  data: ObjectProps[]
}


export const data = [
  {
    heading: "Documentation",
    items: [
      { title: "Introduction", href: "/docs/introduction", icon: <ArrowRight className="w-5 h-5" /> },
      { title: "Getting Started", href: "/docs/getting-started", icon: <ArrowRight className="w-5 h-5" /> },
      { title: "Installation", href: "/docs/installation", icon: <ArrowRight className="w-5 h-5" /> },
      { title: "Theming", href: "/docs/theming", icon: <ArrowRight className="w-5 h-5" /> },
    ],
  },
  {
    heading: "Components",
    items: [
      { title: "Code Block", href: "/docs/code-block", icon: <Ghost className="w-5 h-5" /> },
      { title: "ToolBar", href: "/docs/toolbar", icon: <Ghost className="w-5 h-5" /> },
      { title: "MusicPlayer", href: "/docs/music-player", icon: <Ghost className="w-5 h-5" /> },
      { title: "WaveInText", href: "/docs/wave-in-text", icon: <Ghost className="w-5 h-5" /> },
    ],
  },

];



interface PopoverTriggerProps
  extends React.ComponentProps<typeof PopoverPrimitive.Trigger> {
  icon?: React.ReactNode
}

interface isOpenContextProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const isOpenContext = createContext<isOpenContextProps | undefined>(undefined)
export const useIsOpen = () => {
  const context = useContext(isOpenContext)
  if (!context) throw new Error('isOpen must me use in proper context')
  return context
}

export function PopoverTrigger({ className, children, icon, ...props }: PopoverTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // macOS uses MetaKey for Cmd, Windows/Linux uses CtrlKey
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); // prevent browser search / default behavior
        setIsOpen(true);
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  return (
    <isOpenContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={cn('', className)} onClick={(e) => {
       setIsOpen(!isOpen)
      }}>
        {icon}
      </div>

      <div>
        <AnimatePresence>
          {isOpen && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>}
        </AnimatePresence>
      </div>
    </isOpenContext.Provider>
  )
}

type Position = "top" | "center" | "bottom"

interface PopoverContentProps
  extends React.ComponentProps<typeof PopoverPrimitive.Content> {
  position?: Position
}



export function PopoverContent({ position = 'top' }: PopoverContentProps) {
  const positionClass = {
    top: "fixed top-20 left-1/2 -translate-x-1/2 z-[999]",
    center: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]",
    bottom: "fixed bottom-10 left-1/2 -translate-x-1/2 z-[999]",
  }[position]

  const { isOpen, setIsOpen } = useIsOpen()
  const [search, setSearch] = useState('')
  const [filterData, setFilterData] = useState<ObjectProps[]>()
  const popoverRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        console.log(e.target)
      }
    }

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside)
    }

    return () => window.removeEventListener('mousedown', handleClickOutside)

  }, [isOpen, setIsOpen])



  useEffect(() => {
    const filterSearch = data
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((section) => section.items.length > 0); // only keep sections with matching items

    setFilterData(filterSearch);


  }, [search])

  return (
    <>

      <motion.div
        className="fixed inset-0 z-50 bg-black/30"
      />

      <motion.div
        ref={popoverRef}
        layout='preserve-aspect'
        transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
        className={cn(
          "relative border bg-muted2 rounded-xl z-[999] w-sm max-w-md md:min-w-lg md:max-w-xl lg:min-w-2xl max-h-[500px] overflow-scroll no-scrollbar lg:max-w-3xl shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.1),inset_-1.5px_-1.5px_5px_rgba(0,0,0,0.1)] dark:shadow-[inset_1px_1px_2px_rgba(255,255,255,0.08),inset_-1px_-1px_2px_rgba(255,255,255,0.08)]",
          positionClass
        )}
      >
        {/* Search bar */}
        <div className="sticky top-0 backdrop-blur-3xl mb-6 bg-muted3/40 p-2 z-50 shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.1),inset_-1.5px_-1.5px_5px_rgba(0,0,0,0.1)] dark:shadow-[inset_1px_1px_2px_rgba(255,255,255,0.08),inset_-1px_-1px_2px_rgba(255,255,255,0.08)]" onClick={() => { setIsOpen(true) }}>
          <Input
            className="pl-10 rounded-lg border active:border-0 border-muted/40 focus:outline-none focus:ring-0 ring-0"
            placeholder="Search components"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Section list */}
        {filterData && filterData.map((section) => (
          <div key={section.heading}>
            <div className="text-[15px] text-muted-foreground flex items-center gap-2 pl-2 cursor-default ">
              <h1 className="whitespace-nowrap">{section.heading}</h1>
            </div>

            {section.items.map((item: ItemProps) => (
              <div key={item.href} className="hover:bg-muted2 rounded-lg">
                <Link

                  key={item.href}
                  className="text-[16px]"
                  href={item.href}
                  onClick={(e) => {
                    setIsOpen(false)
                    e.stopPropagation()
                  }}
                >
                  <motion.div
                    className="delius-swash-caps-regular transform hover:scale-101 transition-transform duration-200 hover:translate-x-3 pl-4  py-1.5 rounded-lg flex items-center justify-start gap-3"
                  >
                    {/* ✅ Replace circle with the passed icon */}
                    {item.icon ? (
                      <span className="text-muted-foreground  ">
                        {item.icon}
                      </span>
                    ) : (
                      <motion.div className="w-3 h-3 rounded-full border border-dashed" />
                    )}
                    <WaveInText duration={0.5} yOffset={1}>
                      {item.title}
                    </WaveInText>
                  </motion.div>
                </Link>
              </div>
            ))}
          </div>
        ))}

        <div className="sticky bottom-0  h-10 bg-muted3 p-2 pr-3 text-muted-foreground z-50 shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.1),inset_-1.5px_-1.5px_5px_rgba(0,0,0,0.1)] dark:shadow-[inset_1px_1px_2px_rgba(255,255,255,0.08),inset_-1px_-1px_2px_rgba(255,255,255,0.08)] text-end ">
          <h1>useFork</h1>
        </div>

      </motion.div>

    </>
  )
}
