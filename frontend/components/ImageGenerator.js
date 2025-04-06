import { useRef, useEffect } from 'react';

const ImageGenerator = ({ type, width = 800, height = 800, colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'] }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Generate art based on type
    switch (type) {
      case 'cosmic':
        generateCosmicArt(ctx, width, height, colors);
        break;
      case 'geometric':
        generateGeometricArt(ctx, width, height, colors);
        break;
      case 'abstract':
        generateAbstractArt(ctx, width, height, colors);
        break;
      case 'gradient':
        generateGradientArt(ctx, width, height, colors);
        break;
      default:
        generateCosmicArt(ctx, width, height, colors);
    }
  }, [type, width, height, colors]);

  const generateCosmicArt = (ctx, width, height, colors) => {
    // Background
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, width / 2
    );
    
    colors.forEach((color, index) => {
      gradient.addColorStop(index / (colors.length - 1), color + '40');
    });
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Stars
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    // Nebula
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 100 + 50;
      
      const nebulaGradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, radius
      );
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      nebulaGradient.addColorStop(0, color + '80');
      nebulaGradient.addColorStop(1, color + '00');
      
      ctx.fillStyle = nebulaGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const generateGeometricArt = (ctx, width, height, colors) => {
    // Background
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, width, height);

    // Grid
    const gridSize = 40;
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;
        
        // Random shape
        const shapeType = Math.floor(Math.random() * 3);
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        ctx.fillStyle = color + '80';
        
        if (shapeType === 0) {
          // Circle
          ctx.beginPath();
          ctx.arc(x + gridSize/2, y + gridSize/2, gridSize/3, 0, Math.PI * 2);
          ctx.fill();
        } else if (shapeType === 1) {
          // Square
          ctx.fillRect(x + gridSize/4, y + gridSize/4, gridSize/2, gridSize/2);
        } else {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(x + gridSize/2, y + gridSize/4);
          ctx.lineTo(x + gridSize/4, y + gridSize*3/4);
          ctx.lineTo(x + gridSize*3/4, y + gridSize*3/4);
          ctx.closePath();
          ctx.fill();
        }
      }
    }
  };

  const generateAbstractArt = (ctx, width, height, colors) => {
    // Background
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, width, height);

    // Abstract shapes
    for (let i = 0; i < 10; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillStyle = color + '80';
      
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      
      for (let j = 0; j < 5; j++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.lineTo(x, y);
      }
      
      ctx.closePath();
      ctx.fill();
    }

    // Lines
    for (let i = 0; i < 20; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      ctx.strokeStyle = color + '80';
      ctx.lineWidth = Math.random() * 5 + 1;
      
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }
  };

  const generateGradientArt = (ctx, width, height, colors) => {
    // Create multiple gradients
    for (let i = 0; i < 3; i++) {
      const x1 = Math.random() * width;
      const y1 = Math.random() * height;
      const x2 = Math.random() * width;
      const y2 = Math.random() * height;
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      
      // Use a subset of colors for each gradient
      const startColor = colors[Math.floor(Math.random() * colors.length)];
      const endColor = colors[Math.floor(Math.random() * colors.length)];
      
      gradient.addColorStop(0, startColor + '80');
      gradient.addColorStop(1, endColor + '80');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
    
    // Add some noise
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      ctx.fillStyle = color + '40';
      ctx.fillRect(x, y, size, size);
    }
  };

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height}
      className="w-full h-full object-cover"
    />
  );
};

export default ImageGenerator; 