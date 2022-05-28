import { db } from './db'

export const getChartSubscribers = async (chartId: string): Promise<string[]> => {
  const subscribersRef = db.collection('charts').doc(`${chartId}`)
  const subscribers = await subscribersRef.get()

  if (subscribers.exists) {
    return subscribers.data().subscribers
  }

  return []
}
