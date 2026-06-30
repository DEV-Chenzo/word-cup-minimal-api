import fastify from 'fastify'
import {getWordCupData} from './services/services.ts'
const server = fastify({
  logger: true
})

server.get('/api/wordcup', await getWordCupData)
