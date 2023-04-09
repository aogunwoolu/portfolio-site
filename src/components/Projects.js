import React from 'react';

import {
    ClockIcon,
} from '@heroicons/react/24/outline'

const actions = [
    {
        title: 'Coming Soon',
        href: '#',
        icon: ClockIcon,
    },
    {
        title: 'Coming Soon',
        href: '#',
        icon: ClockIcon,
    },
    {
        title: 'Coming Soon',
        href: '#',
        icon: ClockIcon,
    },
]

export default function Projects() {
    return(
      <div className="divide-y gap-x-10 shadow sm:grid sm:grid-cols-3 sm:gap-px sm:divide-y-0">
          {actions.map((action, actionIdx) => (
              <div
                  key={action.title}
                  className={'m-2 p-4 bg-stone-900 h-80 flex justify-center items-center'}
                  style={{ transition: 'transform 0.2s ease-in-out', backgroundColor: '#222', color: '#fff', fontSize: '2rem', fontWeight: 'thin' }}
                  onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.backgroundColor = '#141414';
                  }}
                  onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.backgroundColor = '#222';
                  }}
              >
                  <span className="inline-flex items-center justify-center h-full">{action.title}</span>
              </div>
          ))}
      </div>
    );
  }