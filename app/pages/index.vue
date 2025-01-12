<script setup lang="ts">
import type { SystemInformation } from '~/types'

import {ScrollArea} from '~/components/ui/scroll-area'
import { Progress } from '~/components/ui/progress'
import { Card, CardContent, CardTitle, CardHeader } from '~/components/ui/card'

const { data: info, refresh } = await useFetch<SystemInformation>('/api/hono')

onMounted(() => {
  setInterval(() => {
    refresh()
  }, 2000)
})
</script>

<template>
  <Card class="max-w-xl w-full">
    <CardHeader>
      <CardTitle>System Information</CardTitle>
    </CardHeader>
    <ScrollArea class="h-[500px] xl:h-[600px]">
        <CardContent class="space-y-4">
        <ul v-if="info" class="space-y-2">
      <li v-if="info.hostname" class="text-sm flex justify-between">
        Hostname: <span>{{ info.hostname }}</span>
      </li>
      <li v-if="info.platform" class="flex text-sm justify-between">
        Platform: <span>{{ info.platform }}</span>
      </li>
      <li v-if="info.cpuModel" class="flex text-sm justify-between">
        CPU Model: <span>{{ info.cpuModel }}</span>
      </li>
      <li v-if="info.arch" class="flex text-sm justify-between">
        Architecture: <span>{{ info.arch }}</span>
      </li>
      <li v-if="info.cpuTemp" class="text-sm flex justify-between">
        CPU Temperature: <span>{{ info.cpuTemp }}</span>
      </li>
      <li v-if="info.uptime" class="text-sm flex justify-between">
        Uptime: <span>{{ Math.floor(info.uptime / 3600) }} hrs {{ Math.floor((info.uptime % 3600) / 60) }} min</span>
      </li>
    </ul>
    <ul v-if="info" class="space-y-2">
        <h2 class="text-lg font-semibold text-foreground">
          CPU Usage
        </h2>
        <li v-for="(usage, index) in info.cpuUsage" :key="index" class="space-y-1">
          <div class="text-sm text-muted-foreground flex justify-between">
            <span>Core {{ index + 1 }}</span>
            <span>{{ usage }}%</span>
          </div>
          <Progress :model-value="Number.parseFloat(usage)" class="h-2" />
        </li>
      </ul>
      <ul v-if="info" class="space-y-2">
        <h3 class="text-lg font-semibold text-foreground">
          Memory Usage
        </h3>
        <div class="flex justify-between text-sm text-muted-foreground">
          <span>Used</span>
          <span>{{ info.memoryUsage.used.toFixed(2) }} / {{ info.memoryUsage.total.toFixed(2) }} GB</span>
        </div>
        <Progress class="h-2" :model-value="(info.memoryUsage.used/ info.memoryUsage.total) * 100" />
      </ul>
    </CardContent>
      </ScrollArea>
  </Card>
</template>
