'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// 👇 TypeScript Interface for Notification items
export interface NotificationItem {
  avatar: string;
  message: string;
}

// 👇 Props Interface
interface NotificationProps {
  data?: NotificationItem[];
}

export function Notification({ data }: NotificationProps) {
  // Default Data
  const defaultData: NotificationItem[] = [
    {
      avatar: 'images/usefork3.jpeg',
      message: 'Hello! How are you?',
    },
    {
      avatar: 'images/usefork2.jpeg',
      message: "I'm good! Just working on some React stuff.",
    },
    {
      avatar: 'images/usefork3.jpeg',
      message: "I'm good! Just working on some React stuff",
    },
  ];

  const finalData = data ?? defaultData; // Use props if passed, else fallback

  const [openId, setOpenId] = useState(-1);
  const [openMessage, setOpenMessage] = useState(false);

  return (
    <motion.div
      className={`overflow-hidden ${openId === -1 ? 'max-w-[200px] min-w-[160px]' : ' max-w-md'}  `}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key="avatars"
          initial={{ width: 0.5, opacity: 0, filter: 'blur(2px)' }}
          animate={{ width: '100%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0.5, width: 0, filter: 'blur(2px)' }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className=" flex items-center gap-3 bg-muted3 px-2 py-2 rounded-full origin-center overflow-hidden"
        >
          {finalData.map((item, index) => (
            <div key={index} className="flex items-center justify-start gap-3">
              {(openId === -1 || openId === index) && (
                <motion.img
                  initial={{ y: -100, scale: 0.95 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{
                    duration: 0.1,
                    ease: 'linear',
                    delay: index * 0.02,
                  }}
                  src={item.avatar}
                  className="w-10 h-10 object-cover rounded-full cursor-pointer active:scale-95 transition-transform duration-200"
                  onClick={() => {
                    setOpenId(index);
                    setOpenMessage(true);
                  }}
                />
              )}

              <AnimatePresence mode="sync">
                {openId === index && openMessage && (
                  <motion.div
                    layout
                    key="messages"
                    initial={{ width: 0, opacity: 0, filter: 'blur(2px)', originX: 0 }}
                    animate={{ width: '100%', opacity: 1, filter: 'blur(0px)', originX: 0 }}
                    exit={{ opacity: 0, width: 0.3, originX: 0, filter: 'blur(2px)' }}
                    transition={{ duration: 0.35, ease: 'easeInOut', type: 'tween' }}
                    className=" flex items-center gap-3 bg-gradient-to-br from-sky-200 to-sky-400 py-1.5  rounded-full overflow-hidden origin-center px-2"
                  >
                    <div className="truncate">{finalData[openId].message}</div>

                    <div
                      className="rounded-full bg-background/20 p-1 hover:bg-red-500 transition-colors duration-200 cursor-pointer active:scale-105"
                      onClick={() => {
                        setOpenMessage(false);
                        setTimeout(() => {
                          setOpenId(-1);
                        }, 350);
                      }}
                    >
                      <X className="w-5 h-5" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
