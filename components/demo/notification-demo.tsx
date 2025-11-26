'use client';

import { Notification } from '@/components/notification';

export function NotificationDemo() {
  const data = [
    {
      avatar: 'images/usefork3.jpeg',
      message: 'Hello! How are you?',
    },
    {
      avatar: 'images/usefork6.jpeg',
      message: "I'm good! Just working on some React stuff.",
    },
    {
      avatar: 'images/usefork7.jpeg',
      message: "I'm good! Just working on some React stuff",
    },
  ];

  return (
    <div>
      <Notification data={data} />
    </div>
  );
}
