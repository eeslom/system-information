import { exec } from 'node:child_process'
import os from 'node:os'
import { promisify } from 'node:util'
import { Hono } from 'hono'

const app = new Hono()

const execAsync = promisify(exec)

app.get('/', (c) => {
  function getCpuUsage() {
    const cpus = os.cpus()
    return cpus.map((cpu) => {
      const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0)
      const usage = 100 - (100 * cpu.times.idle) / total
      return usage.toFixed(1)
    })
  }

  async function getCpuTemp() {
    const { stdout } = await execAsync('vcgencmd measure_temp')

    return Number.parseFloat(stdout.replace('temp=', '').replace('\'C', ''))
  }

  function bytesToGB(bytes: number) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2)
  }

  function getHostname() {
    return os.hostname()
  }

  function getPlatform() {
    return os.platform()
  }

  function getArchitecture() {
    return os.arch()
  }

  function getCpuModel() {
    return os.cpus()[0]?.model || null
  }

  function getUptime() {
    return os.uptime()
  }

  const hostname = getHostname()
  const platform = getPlatform()
  const architecture = getArchitecture()

  const cpuUsage = getCpuUsage()

  const totalMem = os.totalmem()
  const freeMem = os.freemem()
  const usedMem = totalMem - freeMem
  const cpuModel = getCpuModel()

  const uptime = getUptime()

  const cpuTemp = platform === 'linux' ? getCpuTemp() : null

  return c.json({
    hostname,
    platform,
    cpuModel,
    uptime,
    cpuTemp,
    arch: architecture,
    cpuUsage,
    memoryUsage: {
      total: Number.parseFloat(bytesToGB(totalMem)),
      used: Number.parseFloat(bytesToGB(usedMem)),
      free: Number.parseFloat(bytesToGB(freeMem)),
    },
  })
})

export default defineEventHandler((event) => {
  event.node.req.originalUrl = ''
  const webReq = toWebRequest(event)
  return app.fetch(webReq)
})
