const Firestore = require('@google-cloud/firestore')
const { PROJECT, GOOGLE_APPLICATION_CREDENTIALS } = process.env

export const db = new Firestore({ projectId: PROJECT, keyFile: GOOGLE_APPLICATION_CREDENTIALS })
