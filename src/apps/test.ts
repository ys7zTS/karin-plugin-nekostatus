import si from 'systeminformation'
import karin, { logger } from 'node-karin'

export const test = karin.command(/^#test$/i, async (e) => {
  const cpu = (await si.blockDevices())[0].label
  logger.info(cpu)
})
