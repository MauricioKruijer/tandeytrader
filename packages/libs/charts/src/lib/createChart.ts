import { db } from './db'

export const createCharts = async (chartId: string, alertType: string, description: string) => {
  const docRef = db.collection('charts').doc(`${chartId}`);
  const chart = await docRef.get();
  await docRef.collection('alerts').doc(alertType).set({ description });
  if (!chart.exists) {
    try {
      await docRef.set({
        subscribers: []
      })
    } catch(error) {
      console.log('error', error);
    }
  }
}
