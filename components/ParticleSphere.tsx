'use client';

import { useEffect, useRef } from 'react';

export default function ParticleSphere() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.parentElement?.offsetWidth || 600;
        let height = canvas.height = canvas.parentElement?.offsetHeight || 600;

        // Sphere configuration
        const particleCount = 1000;

        // Function to calculate radius based on viewport
        const getRadius = (w: number, h: number) => {
            const isMobile = w < 768;
            return isMobile
                ? Math.max(w, h) * 0.45
                : Math.min(w, h) * 0.6;
        };

        let radius = getRadius(width, height);
        const particles: { x: number; y: number; z: number; size: number }[] = [];

        // Initialize particles on a sphere surface
        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            particles.push({
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.sin(phi) * Math.sin(theta),
                z: radius * Math.cos(phi),
                size: Math.random() * 2 + 0.5 // Slightly larger variation
            });
        }

        let rotationX = 0;
        let rotationY = 0;

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Auto rotation
            rotationX += 0.002;
            rotationY += 0.002;

            // Center of canvas
            const cx = width / 2;
            const cy = height / 2;

            // Draw particles
            particles.forEach(p => {
                // Rotate around Y
                const x1 = p.x * Math.cos(rotationY) - p.z * Math.sin(rotationY);
                const z1 = p.z * Math.cos(rotationY) + p.x * Math.sin(rotationY);

                // Rotate around X
                const y2 = p.y * Math.cos(rotationX) - z1 * Math.sin(rotationX);
                const z2 = z1 * Math.cos(rotationX) + p.y * Math.sin(rotationX);

                // Project to 2D (Perspective)
                const distance = 400;
                if (distance + z2 <= 0) return; // Skip particles behind the camera

                const scale = distance / (distance + z2);
                const x2D = x1 * scale + cx;
                const y2D = y2 * scale + cy;

                // Draw only front-facing particles (optional, or draw all with opacity)
                // Using alpha based on depth
                const alpha = (z2 + radius) / (2 * radius); // 0 to 1 based on depth

                ctx.beginPath();
                ctx.arc(x2D, y2D, p.size * scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(48, 84, 253, ${0.3 + alpha * 0.7})`; // Platform Blue #3054fd
                ctx.fill();
            });

            // Connect nearby particles (optional, for "network" look)
            // Skipping for performance and "sphere" look typically implies dots or simple lines.

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        const handleResize = () => {
            width = canvas.width = canvas.parentElement?.offsetWidth || 600;
            height = canvas.height = canvas.parentElement?.offsetHeight || 600;
            radius = getRadius(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
