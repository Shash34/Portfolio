// HUDBackground.jsx
import React, { useEffect, useRef } from 'react';

const HUDBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frames = 0;

    // ==== Background particles ====
    const bgParticles = [];
    for (let i = 0; i < 150; i++) {
      bgParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.5,
      });
    }

    // ==== Nodes & connections ====
    const nodes = [];
    const connections = [];
    for (let i = 0; i < 60; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // ==== Helper ====
    const distance = (a, b) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // ==== Animate ====
    const animate = () => {
      frames++;

      // Fill background with dark color
      ctx.fillStyle = '#0a0f2c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Background particles
      bgParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.fillStyle = `rgba(0,255,255,${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Move nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.05;
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;
      });

      // Update connections
      connections.length = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (distance(nodes[i], nodes[j]) < 150) {
            connections.push({ from: nodes[i], to: nodes[j] });
          }
        }
      }

      // Draw connections
      connections.forEach((c) => {
        ctx.strokeStyle = 'rgba(0,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(c.from.x, c.from.y);
        ctx.lineTo(c.to.x, c.to.y);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((n) => {
        const glow = Math.sin(n.pulse) * 0.5 + 1;
        ctx.fillStyle = `rgba(0,255,255,${glow})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Scanning circle
      ctx.strokeStyle = 'rgba(0,255,255,0.05)';
      ctx.lineWidth = 2;
      const radius = (frames * 2) % Math.max(canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />
};

export default HUDBackground;
