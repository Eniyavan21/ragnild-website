'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LottieAnimationData = any;

type Props = {
    path?: string;
    animationData?: LottieAnimationData;
    className?: string;
};

// Generic "Loading/Scan" Pulse Animation (Base64 or JSON) to ensure NO 404s if URL fails
const pulseAnimation = {
    "v": "5.7.4",
    "fr": 60,
    "ip": 0,
    "op": 60,
    "w": 100,
    "h": 100,
    "nm": "Pulse",
    "ddd": 0,
    "assets": [],
    "layers": [
        {
            "ddd": 0,
            "ind": 1,
            "ty": 4,
            "nm": "Circle",
            "sr": 1,
            "ks": {
                "o": { "a": 1, "k": [{ "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [100] }, { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 30, "s": [0] }, { "t": 60, "s": [100] }], "ix": 11 },
                "r": { "a": 0, "k": 0, "ix": 10 },
                "p": { "a": 0, "k": [50, 50, 0], "ix": 2 },
                "a": { "a": 0, "k": [0, 0, 0], "ix": 1 },
                "s": { "a": 1, "k": [{ "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [50, 50, 100] }, { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 30, "s": [80, 80, 100] }, { "t": 60, "s": [50, 50, 100] }], "ix": 6 }
            },
            "ao": 0,
            "shapes": [
                {
                    "ty": "el",
                    "d": 1,
                    "s": { "a": 0, "k": [50, 50], "ix": 2 },
                    "p": { "a": 0, "k": [0, 0], "ix": 3 },
                    "nm": "Ellipse Path 1",
                    "mn": "ADBE Vector Shape - Ellipse",
                    "hd": false
                },
                {
                    "ty": "fl",
                    "c": { "a": 0, "k": [0.188, 0.329, 0.992, 1], "ix": 4 },
                    "o": { "a": 0, "k": 100, "ix": 5 },
                    "r": 1,
                    "bm": 0,
                    "nm": "Fill 1",
                    "mn": "ADBE Vector Graphic - Fill",
                    "hd": false
                }
            ],
            "ip": 0,
            "op": 60,
            "st": 0,
            "bm": 0
        }
    ]
};


export default function LottieIcon({ path, animationData, className }: Props) {
    const [data, setData] = useState(animationData || null);

    useEffect(() => {
        if (path) {
            fetch(path)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to load lottie");
                    return res.json();
                })
                .then((json) => setData(json))
                .catch(() => setData(pulseAnimation));
        }
    }, [path]);

    return (
        <div className={className}>
            <Lottie
                animationData={data || pulseAnimation}
                loop={true}
                autoplay={true}
            />
        </div>
    );
}
