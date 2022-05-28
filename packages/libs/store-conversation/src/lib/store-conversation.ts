import { Firestore } from '@google-cloud/firestore'

const { PROJECT, GOOGLE_APPLICATION_CREDENTIALS } = process.env
const db = new Firestore({ projectId: PROJECT, keyFile: GOOGLE_APPLICATION_CREDENTIALS })

export async function storeConversation(conversation): Promise<void> {
  const docRef = db.collection('conversations').doc(`${conversation.id}`)
  const conversationExists = await docRef.get()

  if (!conversationExists.exists) {
    await docRef.set(conversation)
  }
}
