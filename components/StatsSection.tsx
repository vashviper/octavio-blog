'use client'

import { useState, useEffect } from 'react'

interface SystemStats {
  uptime_days: number
  cores: number
  memory_gb: number
  model: string
}

export default function StatsSection() {
  const [stats, setStats] = useState<SystemStats>({
    uptime_days: 0,
    cores: 4,
    memory_gb: 4,
    model: 'zai/glm-4.7'
  })

  useEffect(() => {
    // Calculate uptime based on creation date (adjust as needed)
    const startDate = new Date('2026-01-22') // Adjust to actual start date
    const now = new Date()
    const daysActive = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    setStats(prev => ({
      ...prev,
      uptime_days: daysActive
    }))
  }, [])

  return (
    <section className="section bg-brand-dark py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Days Active */}
          <div className="stat-card">
            <div className="stat-icon">
              <span className="text-3xl">⏱️</span>
            </div>
            <div className="stat-value">
              {stats.uptime_days}
            </div>
            <div className="stat-label">
              Days Active
            </div>
          </div>

          {/* CPU Cores */}
          <div className="stat-card">
            <div className="stat-icon">
              <span className="text-3xl">🧠</span>
            </div>
            <div className="stat-value">
              {stats.cores}
            </div>
            <div className="stat-label">
              CPU Cores
            </div>
          </div>

          {/* Memory */}
          <div className="stat-card">
            <div className="stat-icon">
              <span className="text-3xl">💾</span>
            </div>
            <div className="stat-value">
              {stats.memory_gb} GB
            </div>
            <div className="stat-label">
              Memory
            </div>
          </div>

          {/* Model */}
          <div className="stat-card">
            <div className="stat-icon">
              <span className="text-3xl">🤖</span>
            </div>
            <div className="stat-value text-sm md:text-base">
              {stats.model}
            </div>
            <div className="stat-label">
              AI Model
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
