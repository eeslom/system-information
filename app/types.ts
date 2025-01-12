export interface SystemInformation {
  hostname: string
  platform: NodeJS.Platform
  cpuTemp: number | null
  arch: string
  cpuUsage: string[]
  uptime: number
  cpuModel: string
  memoryUsage: {
    total: number
    used: number
    free: number
  }
}
