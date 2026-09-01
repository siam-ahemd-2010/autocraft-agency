'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    container.innerHTML = ''

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 18

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 1. Interactive Automation Nodes & Connections
    const particleCount = 70
    const positions = new Float32Array(particleCount * 3)
    const velocities: THREE.Vector3[] = []

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.01
        )
      )
    }

    const particlesGeo = new THREE.BufferGeometry()
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particlesMat = new THREE.PointsMaterial({
      size: 0.25,
      color: 0xff6b35,
      transparent: true,
      opacity: 0.8,
    })

    const particleSystem = new THREE.Points(particlesGeo, particlesMat)
    scene.add(particleSystem)

    // Dynamic Connection Lines (Workflow Mesh)
    const linesGeo = new THREE.BufferGeometry()
    const linesMat = new THREE.LineBasicMaterial({
      color: 0xff8c42,
      transparent: true,
      opacity: 0.2,
    })
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat)
    scene.add(linesMesh)

    // 2. Central Glowing Automation Ring
    const ringGeo = new THREE.TorusGeometry(7, 0.03, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: 0xff4500, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.15 
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 4
    scene.add(ring)

    // Mouse Interaction
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Scroll Tracking
    let scrollY = 0
    const handleScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)

    let reqId: number
    const animate = () => {
      const posArr = particlesGeo.attributes.position.array as Float32Array

      // Move Nodes
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3] += velocities[i].x
        posArr[i * 3 + 1] += velocities[i].y
        posArr[i * 3 + 2] += velocities[i].z

        // Bounce from boundaries
        if (Math.abs(posArr[i * 3]) > 20) velocities[i].x *= -1
        if (Math.abs(posArr[i * 3 + 1]) > 20) velocities[i].y *= -1
        if (Math.abs(posArr[i * 3 + 2]) > 10) velocities[i].z *= -1
      }
      particlesGeo.attributes.position.needsUpdate = true

      // Draw Connection Lines between close nodes
      const linePositions: number[] = []
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArr[i * 3] - posArr[j * 3]
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1]
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < 6) {
            linePositions.push(
              posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2],
              posArr[j * 3], posArr[j * 3 + 1], posArr[j * 3 + 2]
            )
          }
        }
      }

      linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

      // Smooth Mouse Tracking & Scroll Rotation
      scene.rotation.y += (mouseX * 0.2 - scene.rotation.y) * 0.05
      scene.rotation.x += (-mouseY * 0.2 - scene.rotation.x) * 0.05
      
      particleSystem.rotation.y = scrollY * 0.0005
      ring.rotation.z += 0.002 + scrollY * 0.0008

      renderer.render(scene, camera)
      reqId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(reqId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  )
}