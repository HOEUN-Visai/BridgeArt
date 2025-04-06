import { useEffect, useState } from 'react';

export default function BlockchainBackground() {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [particles, setParticles] = useState([]);
  const [dataPackets, setDataPackets] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [hexagons, setHexagons] = useState([]);

  // Generate random nodes
  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      const nodeCount = 15;
      
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 3,
        });
      }
      
      setNodes(newNodes);
      
      // Generate connections between nodes
      const newConnections = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          // Only connect some nodes (not all)
          if (Math.random() > 0.7) {
            newConnections.push({
              id: `${i}-${j}`,
              from: i,
              to: j,
              delay: Math.random() * 3,
            });
          }
        }
      }
      
      setConnections(newConnections);
    };
    
    generateNodes();
    
    // Regenerate nodes on window resize
    const handleResize = () => {
      generateNodes();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 10 + Math.random() * 20,
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    // Regenerate particles on window resize
    const handleResize = () => {
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate data packets
  useEffect(() => {
    const generateDataPackets = () => {
      const newDataPackets = [];
      const packetCount = 5;
      
      for (let i = 0; i < packetCount; i++) {
        newDataPackets.push({
          id: i,
          y: 20 + Math.random() * 60, // Random vertical position
          delay: i * 2, // Stagger the animations
        });
      }
      
      setDataPackets(newDataPackets);
    };
    
    generateDataPackets();
  }, []);

  // Generate blockchain blocks
  useEffect(() => {
    const generateBlocks = () => {
      const newBlocks = [];
      const blockCount = 8;
      
      for (let i = 0; i < blockCount; i++) {
        newBlocks.push({
          id: i,
          x: Math.random() * 90,
          y: Math.random() * 90,
          delay: Math.random() * 15,
          size: 40 + Math.random() * 40,
        });
      }
      
      setBlocks(newBlocks);
    };
    
    generateBlocks();
    
    // Regenerate blocks on window resize
    const handleResize = () => {
      generateBlocks();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate hexagon grid
  useEffect(() => {
    const generateHexagons = () => {
      const newHexagons = [];
      const hexCount = 20;
      
      for (let i = 0; i < hexCount; i++) {
        newHexagons.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 8,
          size: 20 + Math.random() * 30,
        });
      }
      
      setHexagons(newHexagons);
    };
    
    generateHexagons();
    
    // Regenerate hexagons on window resize
    const handleResize = () => {
      generateHexagons();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="blockchain-bg">
      {/* Grid background */}
      <div className="blockchain-grid"></div>
      
      {/* Blockchain nodes and connections */}
      <div className="blockchain-nodes">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="blockchain-node"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              animationDelay: `${node.delay}s`,
            }}
          />
        ))}
        
        {connections.map((connection) => {
          const fromNode = nodes.find((n) => n.id === connection.from);
          const toNode = nodes.find((n) => n.id === connection.to);
          
          if (!fromNode || !toNode) return null;
          
          // Calculate connection position and angle
          const fromX = fromNode.x;
          const fromY = fromNode.y;
          const toX = toNode.x;
          const toY = toNode.y;
          
          const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
          const angle = Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI);
          
          return (
            <div
              key={connection.id}
              className="blockchain-connection"
              style={{
                left: `${fromX}%`,
                top: `${fromY}%`,
                width: `${length}%`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: '0 0',
                animationDelay: `${connection.delay}s`,
              }}
            />
          );
        })}
      </div>
      
      {/* Floating particles */}
      <div className="blockchain-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="blockchain-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
      
      {/* Data flow animation */}
      <div className="data-flow">
        {dataPackets.map((packet) => (
          <div
            key={packet.id}
            className="data-packet"
            style={{
              top: `${packet.y}%`,
              animationDelay: `${packet.delay}s`,
            }}
          />
        ))}
      </div>
      
      {/* Blockchain blocks */}
      <div className="blockchain-blocks">
        {blocks.map((block) => (
          <div
            key={block.id}
            className="block"
            style={{
              left: `${block.x}%`,
              top: `${block.y}%`,
              width: `${block.size}px`,
              height: `${block.size}px`,
              animationDelay: `${block.delay}s`,
            }}
          />
        ))}
      </div>
      
      {/* Hexagon grid */}
      <div className="hexagon-grid">
        {hexagons.map((hexagon) => (
          <div
            key={hexagon.id}
            className="hexagon"
            style={{
              left: `${hexagon.x}%`,
              top: `${hexagon.y}%`,
              width: `${hexagon.size}px`,
              height: `${hexagon.size * 0.577}px`,
              animationDelay: `${hexagon.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
} 