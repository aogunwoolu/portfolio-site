import React from 'react';

import {
    ClockIcon,
} from '@heroicons/react/24/outline'

const actions = [
    {
        title: 'Request time off',
        href: '#',
        icon: ClockIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
    },
    {
        title: 'Request time off',
        href: '#',
        icon: ClockIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
    },
    {
        title: 'Request time off',
        href: '#',
        icon: ClockIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
    },
    {
        title: 'Request time off',
        href: '#',
        icon: ClockIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
    },
    {
        title: 'Request time off',
        href: '#',
        icon: ClockIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
    },
    {
        title: 'Request time off',
        href: '#',
        icon: ClockIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
    }
]

export default function Projects() {
  return(
    <div className="divide-y gap-x-10 overflow-hidden shadow sm:grid sm:grid-cols-3 sm:gap-px sm:divide-y-0">
        {actions.map((action, actionIdx) => (
            <div
                key={action.title}
                className={'m-2 p-4 bg-stone-900'}
            >
                <div>
                    <span
                        className={'mt-10 text-teal-700 bg-teal-50 rounded-lg inline-flex p-3 ring-4 ring-white'}
                    >
                        <action.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                </div>
                <div className="mt-8">
                    <h3 className="text-lg font-medium">
                    <a href={action.href} className="focus:outline-none">
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        {action.title}
                    </a>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                    Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et
                    quo et molestiae.
                    </p>
                </div>
            </div>
        ))}
    </div>
);
}
