import express from 'express'
import { start } from './server'

const initialize = () => {
	const app = express()
	start(app)
}

initialize()