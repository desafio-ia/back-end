import { MongoClient, Db } from 'mongodb'

let client: MongoClient
let db: Db

export async function connectMongo(): Promise<Db> {
  const uri = process.env.MONGO_URI!
  client = new MongoClient(uri)

  await client.connect()
  db = client.db(process.env.MONGO_DB_NAME)
  console.log('🍃 MongoDB conectado')

  return db
}

export async function initCollections(db: Db) {
  const collections = await db.listCollections().toArray()
  const existingCollections = collections.map(c => c.name)

  if (!existingCollections.includes('trainers')) {
    await db.createCollection('trainers')
    console.log('📦 Collection trainers criada')
  }

  if (!existingCollections.includes('pokemons')) {
    await db.createCollection('pokemons')
    console.log('📦 Collection pokemons criada')
  }
}

export async function initIndexes(db: Db) {
  await db.collection('users').createIndex(
    { name: 1 },
    { unique: true }
  )

  await db.collection('animal').createIndex(
    { name: 1 }
  )

  console.log('📌 Indexes criados')
}

export function getDb(): Db {
  if (!db) {
    throw new Error('MongoDB not initialized')
  }
  return db
}

export async function closeMongo() {
  if (client) {
    await client.close()
  }
}