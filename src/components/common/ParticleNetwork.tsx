"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SiReact } from "react-icons/si";
import * as THREE from "three";

type ParticleNetworkProps = {
    className?: string;
    intensity?: number; // number of particles baseline
    accentColor?: string;
    showCenterCode?: boolean;
    speed?: number; // particle velocity multiplier
    connectionDistance?: number; // px distance to connect lines
    pointSize?: number; // particle point size
    variant?: "circle" | "banner"; // shape mask
};

const ParticleNetwork: React.FC<ParticleNetworkProps> = ({
    className,
    intensity = 0.8,
    accentColor = "var(--theme-color)",
    showCenterCode = true,
    speed = 1,
    connectionDistance = 110,
    pointSize = 1.6,
    variant = "circle",
}) => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const cleanupRef = useRef<() => void>();

    useEffect(() => {
        if (!mountRef.current) return;

        const container = mountRef.current;
        // Resolve accent color (prefer CSS variable from document)
        const resolvedAccent = (() => {
            if (accentColor?.includes("var(")) {
                const root = getComputedStyle(document.documentElement);
                const v = root.getPropertyValue("--theme-color").trim();
                return v || "#6ee7ff";
            }
            return accentColor || "#6ee7ff";
        })();
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        const width = container.clientWidth || 400;
        const height = container.clientHeight || 400;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
        camera.position.z = 220;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
        renderer.setSize(width, height, false);
        renderer.setClearColor(0x000000, 0); // transparent
        container.appendChild(renderer.domElement);

        // Particles
        const particleCount = Math.floor(600 * intensity);
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3 + 0] = (Math.random() - 0.5) * 400;
            positions[i3 + 1] = (Math.random() - 0.5) * 260;
            positions[i3 + 2] = (Math.random() - 0.5) * 260;
            velocities[i3 + 0] = (Math.random() - 0.5) * 0.5 * speed;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.5 * speed;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.5 * speed;
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({ color: new THREE.Color(resolvedAccent), size: isLight ? pointSize + 0.6 : pointSize, sizeAttenuation: true, transparent: true, opacity: isLight ? 1.0 : 0.9 });
        const points = new THREE.Points(particleGeo, particleMat);
        scene.add(points);

        // Lines
        const maxConnections = 4;
        const distanceThreshold = connectionDistance;
        const lineGeo = new THREE.BufferGeometry();
        const linePositions = new Float32Array(particleCount * maxConnections * 3);
        const lineColors = new Float32Array(particleCount * maxConnections * 3);
        const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: isLight ? 0.45 : 0.28 });
        const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
        scene.add(lineMesh);

        // Parallax
        const mouse = new THREE.Vector2(0, 0);
        const onPointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
        };
        container.addEventListener("pointermove", onPointerMove);

        let raf = 0;
        const animate = () => {
            raf = requestAnimationFrame(animate);

            // Velocity movement with soft bounce
            const pos = particleGeo.getAttribute("position") as THREE.BufferAttribute;
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                pos.array[i3 + 0] += velocities[i3 + 0];
                pos.array[i3 + 1] += velocities[i3 + 1];
                pos.array[i3 + 2] += velocities[i3 + 2];

                const bx = 200, by = 130, bz = 130;
                if (pos.array[i3 + 0] > bx || pos.array[i3 + 0] < -bx) velocities[i3 + 0] *= -1;
                if (pos.array[i3 + 1] > by || pos.array[i3 + 1] < -by) velocities[i3 + 1] *= -1;
                if (pos.array[i3 + 2] > bz || pos.array[i3 + 2] < -bz) velocities[i3 + 2] *= -1;
            }
            pos.needsUpdate = true;

            // Rebuild connections
            let ptr = 0;
            for (let i = 0; i < particleCount; i++) {
                let connections = 0;
                const xi = pos.array[i * 3 + 0];
                const yi = pos.array[i * 3 + 1];
                const zi = pos.array[i * 3 + 2];
                for (let j = i + 1; j < particleCount && connections < maxConnections; j++) {
                    const xj = pos.array[j * 3 + 0];
                    const yj = pos.array[j * 3 + 1];
                    const zj = pos.array[j * 3 + 2];
                    const dx = xi - xj;
                    const dy = yi - yj;
                    const dz = zi - zj;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    if (dist < distanceThreshold) {
                        const alpha = 1 - dist / distanceThreshold;
                        linePositions[ptr + 0] = xi; linePositions[ptr + 1] = yi; linePositions[ptr + 2] = zi;
                        linePositions[ptr + 3] = xj; linePositions[ptr + 4] = yj; linePositions[ptr + 5] = zj;
                        const c = new THREE.Color(resolvedAccent);
                        const r = c.r, g = c.g, b = c.b;
                        lineColors[ptr + 0] = r; lineColors[ptr + 1] = g; lineColors[ptr + 2] = b * alpha;
                        lineColors[ptr + 3] = r; lineColors[ptr + 4] = g; lineColors[ptr + 5] = b * alpha;
                        ptr += 6;
                        connections++;
                    }
                }
            }
            lineGeo.setDrawRange(0, ptr / 3);
            lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
            lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
            lineGeo.attributes.position.needsUpdate = true;
            lineGeo.attributes.color.needsUpdate = true;

            // Parallax
            camera.position.x += (mouse.x * 20 - camera.position.x) * 0.02;
            camera.position.y += (mouse.y * 10 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            if (w && h) {
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h, false);
            }
        };
        const ro = new ResizeObserver(onResize);
        ro.observe(container);

        cleanupRef.current = () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            container.removeEventListener("pointermove", onPointerMove);
            container.removeChild(renderer.domElement);
            particleGeo.dispose();
            lineGeo.dispose();
            particleMat.dispose();
            lineMat.dispose();
            renderer.dispose();
        };

        return () => cleanupRef.current?.();
    }, [intensity, accentColor, speed, connectionDistance, pointSize]);

    const maskStyles = variant === "circle" ? {
        borderRadius: "50%",
        overflow: "hidden" as const,
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 68%, transparent 72%)",
        maskImage: "radial-gradient(circle at 50% 50%, #000 68%, transparent 72%)",
    } : {} as any;

    return (
        <div
            ref={mountRef}
            className={className}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                ...maskStyles,
                boxShadow: "0 0 60px rgba(0,0,0,0.25), 0 0 120px rgba(0,0,0,0.2)",
            }}
        >
            {/* Overlay UI */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {/* soft corner glows with React icon */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.7, 0.4, 0.7], scale: [1, 1.05, 1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    style={{ position: "absolute", top: 0, left: 0, transform: "translate(-20%, -20%)", filter: "blur(6px)", color: "var(--theme-color)" }}
                >
                    <SiReact size={56} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.7, 0.4, 0.7], scale: [1.05, 1, 1.05] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1.2 }}
                    style={{ position: "absolute", right: 0, bottom: 0, transform: "translate(20%, 20%)", filter: "blur(6px)", color: "var(--theme-color)" }}
                >
                    <SiReact size={56} />
                </motion.div>

                {showCenterCode && (
                    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 0.1, scale: [0.95, 1, 0.95] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{
                                fontSize: "min(18vw, 160px)",
                                fontWeight: 800,
                                color: "var(--theme-color)",
                                textShadow: `0 0 50px var(--theme-color)`,
                                filter: "blur(1px)",
                                lineHeight: 1,
                            }}
                        >
                            {"</>"}
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParticleNetwork;


