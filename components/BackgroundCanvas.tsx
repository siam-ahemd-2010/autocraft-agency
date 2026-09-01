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
    camera.position.z = 15

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Floating Automation Particles Network
    const count = 200
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xff6b35,
      transparent: true,
      opacity: 0.4,
    })
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Central Glowing Orbit Mesh
    const ringGeo = new THREE.TorusGeometry(6, 0.05, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff8c42, wireframe: true, transparent: true, opacity: 0.15 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    scene.add(ring)

    // Scroll Track Logic
    let scrollY = 0
    const handleScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)

    let reqId: number
    const animate = () => {
      // Rotation accelerates based on scroll position
      particles.rotation.y = scrollY * 0.001
      particles.rotation.x = scrollY * 0.0005
      ring.rotation.z = scrollY * 0.0015

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
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  )
}