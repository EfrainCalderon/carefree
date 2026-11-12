import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Runs the functions in api/ during `npm run dev`, the way Vercel does once deployed, so email and feedback
// really send from localhost. Keys come from .env.local.
function devApi() {
  return {
    name: 'carefree-dev-api',
    configureServer(server) {
      Object.assign(process.env, loadEnv('development', process.cwd(), ''))
      server.middlewares.use(async (req, res, next) => {
        const name = req.url.startsWith('/api/') && req.url.slice(5).split('?')[0]
        if (!name || !/^[a-z-]+$/.test(name)) return next()
        res.status = code => { res.statusCode = code; return res }
        res.json = body => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)) }
        try {
          let raw = ''
          for await (const chunk of req) raw += chunk
          req.body = raw ? JSON.parse(raw) : {}
          const { default: handler } = await server.ssrLoadModule(`/api/${name}.js`)
          await handler(req, res)
        } catch (err) {
          console.error(`[api/${name}]`, err)
          res.status(500).json({ error: 'The local API failed. See the dev server log.' })
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devApi()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
})
