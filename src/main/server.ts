import dotenv from 'dotenv'
import buildApp from './app'
import { connectMongo, initCollections, initIndexes } from '../shared/config/MongoDataSource'

dotenv.config()

const PORT = Number(process.env.PORT) || 3003

async function bootstrap() {
  try {
    const db = await connectMongo()    
    console.log('✅ Database connected')
    
    await initCollections(db)
    await initIndexes(db)
    const app = await buildApp()
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('❌ Error starting server:', err)
    process.exit(1)
  }
}

bootstrap()