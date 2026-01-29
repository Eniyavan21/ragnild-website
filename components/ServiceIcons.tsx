'use client';

import { motion } from 'framer-motion';

const iconProps = {
    width: "100%",
    height: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

const transition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const
};

export function AIOpsIcon({ className }: { className?: string }) {
    return (
        <div className={className}>
            <motion.svg {...iconProps} className="text-[#3054fd]">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                <motion.path
                    d="M22 12h-4l-3 9L9 3l-3 9H2"
                    strokeOpacity={0.5}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.svg>
        </div>
    );
}

export function VoiceIcon({ className }: { className?: string }) {
    return (
        <div className={className}>
            <svg {...iconProps} className="text-[#3054fd]">
                <motion.path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
                <motion.path
                    d="M2 10c0-4 4-8 10-8s10 4 10 8"
                    initial={{ opacity: 0, scale: 0.8, x: 12, y: 12 }}
                    animate={{ opacity: [0, 1, 0], scale: 1.2 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                    transition={transition}
                />
            </svg>
        </div>
    );
}

export function DevOpsIcon({ className }: { className?: string }) {
    return (
        <div className={className}>
            <motion.svg {...iconProps} className="text-[#3054fd]">
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "12px", originY: "12px" }}
                >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </motion.g>
            </motion.svg>
        </div>
    );
}

export function CloudIcon({ className }: { className?: string }) {
    return (
        <div className={className}>
            <motion.svg {...iconProps} className="text-[#3054fd]">
                <path d="M17.5 19c0-1.7-1.3-3-3-3h-1.1c-.2-3.2-2.8-5.7-6-5.4-2.7.3-4.9 2.5-5.3 5.3-.2 1.5.3 3 .3 3" />
                <motion.path
                    d="M 6 16 l 3 -3 l 3 3 m -3 -3 v 8"
                    initial={{ y: 2, opacity: 0 }}
                    animate={{ y: -2, opacity: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                />
                <path d="M19 11h.1c1.7 0 3 1.3 3 3s-1.3 3-3 3h-1.6" />
            </motion.svg>
        </div>
    );
}

export function FinOpsIcon({ className }: { className?: string }) {
    return (
        <div className={className}>
            <svg {...iconProps} className="text-[#3054fd]">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                <motion.circle
                    cx="18" cy="6" r="2"
                    initial={{ y: 0 }}
                    animate={{ y: 12 }}
                    transition={{ duration: 2, repeat: Infinity, bounce: 0.5 }}
                />
            </svg>
        </div>
    );
}

export function MLIcon({ className }: { className?: string }) {
    return (
        <div className={className}>
            <svg {...iconProps} className="text-[#3054fd]">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
                <motion.path
                    d="M 12 10 v 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </svg>
        </div>
    );
}
