'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !containerRef.current) return
    const container = containerRef.current
    container.innerHTML = ''

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 15, 30)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Wave Geometry Setup
    const AMOUNTX = 50
    const AMOUNTY = 50
    const SEPARATION = 1.5

    const numParticles = AMOUNTX * AMOUNTY
    const positions = new Float32Array(numParticles * 3)
    const scales = new Float32Array(numParticles)

    let i = 0, j = 0
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
        positions[i + 1] = 0
        positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
        scales[j] = 1
        i += 3
        j++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    const material = new THREE.PointsMaterial({
      color: 0xff6b35,
      size: 0.25,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Scroll & Mouse Interactivity
    let mouseX = 0
    let mouseY = 0
    let scrollY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.02
      mouseY = (event.clientY - window.innerHeight / 2) * 0.02
    }

    const handleScroll = () => {
      scrollY = window.scrollY * 0.015
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    let count = 0
    let reqId: number

    const animate = () => {
      camera.position.x += (mouseX - camera.position.x) * 0.05
      camera.position.y += (-mouseY + 15 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      const positionAttribute = geometry.attributes.position as THREE.BufferAttribute
      const positionArray = positionAttribute.array as Float32Array

      let p = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Wave movement calculation driven by time and scroll
          positionArray[p + 1] =
            Math.sin((ix + count) * 0.3) * 1.8 +
            Math.sin((iy + count + scrollY) * 0.5) * 1.8

          p += 3
        }
      }

      positionAttribute.needsUpdate = true
      count += 0.05

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
  }, [isMounted])

  if (!isMounted) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  )
}