import { useState, useEffect } from 'react'
import { Activity, Zap, Clock, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'

interface MetricData {
  label: string
  value: number
  unit: string
  change?: number
  trend?: 'up' | 'down' | 'stable'
  color?: 'green' | 'yellow' | 'red' | 'blue'
}

interface UsageMetricsProps {
  tokensUsed: number
  tokensRemaining?: number
  cost: number
  requestCount: number
  averageResponseTime: number
  className?: string
  refreshInterval?: number
  showTrends?: boolean
  compact?: boolean
}

export function UsageMetrics({
  tokensUsed,
  tokensRemaining,
  cost,
  requestCount,
  averageResponseTime,
  className,
  refreshInterval = 5000,
  showTrends = true,
  compact = false,
}: UsageMetricsProps) {
  const [metrics, setMetrics] = useState<MetricData[]>([])

  useEffect(() => {
    const calculateMetrics = (): MetricData[] => {
      const totalTokens = tokensUsed + (tokensRemaining || 0)
      const usagePercentage = totalTokens > 0 ? (tokensUsed / totalTokens) * 100 : 0
      
      return [
        {
          label: 'Tokens Used',
          value: tokensUsed,
          unit: 'tokens',
          color: usagePercentage > 80 ? 'red' : usagePercentage > 60 ? 'yellow' : 'green',
          trend: 'up',
          change: 15, // Mock change percentage
        },
        {
          label: 'Requests',
          value: requestCount,
          unit: 'calls',
          color: 'blue',
          trend: 'up',
          change: 8,
        },
        {
          label: 'Avg Response',
          value: averageResponseTime,
          unit: 'ms',
          color: averageResponseTime > 2000 ? 'red' : averageResponseTime > 1000 ? 'yellow' : 'green',
          trend: averageResponseTime > 1500 ? 'up' : 'down',
          change: -5,
        },
        {
          label: 'Cost',
          value: cost,
          unit: '$',
          color: 'blue',
          trend: 'up',
          change: 12,
        },
      ]
    }

    setMetrics(calculateMetrics())

    if (refreshInterval > 0) {
      const interval = setInterval(() => {
        setMetrics(calculateMetrics())
      }, refreshInterval)

      return () => clearInterval(interval)
    }
  }, [tokensUsed, tokensRemaining, cost, requestCount, averageResponseTime, refreshInterval])

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      return `$${value.toFixed(2)}`
    }
    if (unit === 'tokens' && value > 1000) {
      return `${(value / 1000).toFixed(1)}k`
    }
    if (unit === 'ms') {
      if (value > 1000) {
        return `${(value / 1000).toFixed(1)}s`
      }
      return `${Math.round(value)}ms`
    }
    return value.toLocaleString()
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'yellow':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'red':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'blue':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getIcon = (label: string) => {
    switch (label) {
      case 'Tokens Used':
        return <Zap className="h-4 w-4" />
      case 'Requests':
        return <Activity className="h-4 w-4" />
      case 'Avg Response':
        return <Clock className="h-4 w-4" />
      case 'Cost':
        return <DollarSign className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') {
      return <TrendingUp className="h-3 w-3 text-green-500" />
    } else if (trend === 'down') {
      return <TrendingDown className="h-3 w-3 text-red-500" />
    }
    return null
  }

  if (compact) {
    return (
      <div className={cn('flex items-center gap-4 p-3 border rounded-lg bg-card', className)}>
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center gap-2">
            <div className={cn('p-1 rounded border', getColorClasses(metric.color!))}>
              {getIcon(metric.label)}
            </div>
            <div>
              <div className="text-sm font-medium">
                {formatValue(metric.value, metric.unit)}
              </div>
              <div className="text-xs text-muted-foreground">
                {metric.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('border rounded-lg bg-card', className)}>
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <h3 className="font-semibold">Usage Metrics</h3>
          <Badge variant="secondary" className="text-xs">
            Live
          </Badge>
        </div>
      </div>

      {/* Token Usage Bar */}
      {tokensRemaining !== undefined && (
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Token Usage</span>
            <span className="text-sm text-muted-foreground">
              {tokensUsed.toLocaleString()} / {(tokensUsed + tokensRemaining).toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                tokensUsed / (tokensUsed + tokensRemaining) > 0.8
                  ? 'bg-red-500'
                  : tokensUsed / (tokensUsed + tokensRemaining) > 0.6
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              )}
              style={{
                width: `${Math.min((tokensUsed / (tokensUsed + tokensRemaining)) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn('p-1 rounded border', getColorClasses(metric.color!))}>
                    {getIcon(metric.label)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {metric.label}
                  </span>
                </div>
                {showTrends && metric.trend && metric.change !== undefined && (
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span
                      className={cn(
                        'text-xs',
                        metric.change > 0 ? 'text-green-600' : 'text-red-600'
                      )}
                    >
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold">
                {formatValue(metric.value, metric.unit)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-3 bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          {refreshInterval > 0 && (
            <span>Updates every {refreshInterval / 1000}s</span>
          )}
        </div>
      </div>
    </div>
  )
}