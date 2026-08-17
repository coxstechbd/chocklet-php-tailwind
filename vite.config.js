import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const rootDirectory = fileURLToPath(new URL('.', import.meta.url))
const darkCompoundPage = '/products/dark-compound-chocolate'
const milkyDarkPage = '/products/dark-compound-chocolate-premium-milky-dark'
const whiteCompoundPage = '/products/white-compound-chocolate'
const signatureDarkPage = '/products/signature-dark-chocolate'
const icecreamCoatingPage = '/products/chocolate-icecream-coating'
const whiteSpreadCoatingPage = '/products/white-chocolate-spread-coating'
const darkChocolateChipsPage = '/products/dark-chocolate-chips'
const whiteChocolateChipsPage = '/products/white-chocolate-chips'
const milkChocolateChipsPage = '/products/milk-chocolate-chips'
const whiteIcecreamCoatingPage = '/products/white-chocolate-icecream-coating-standard'
const chocolateSpreadPage = '/products/chocolate-spread'
const chocolateChipsCategoryPage = '/categories/chocolate-chips'
const spreadsCategoryPage = '/categories/spreads'
const comingSoonPage = '/coming-soon'
const categoriesPage = '/categories'
const aboutUsPage = '/about-us'

function productDetailRoute() {
  return {
    name: 'product-detail-route',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const route = request.url?.split('?')[0]
        if (route === categoriesPage) {
          response.statusCode = 200
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(readFileSync(new URL('./categories/index.html', import.meta.url)))
          return
        }
        if (route === comingSoonPage) {
          response.statusCode = 200
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(readFileSync(new URL('./coming-soon/index.html', import.meta.url)))
          return
        }
        if (route === aboutUsPage) {
          response.statusCode = 200
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(readFileSync(new URL('./about-us/index.html', import.meta.url)))
          return
        }
        if ([chocolateChipsCategoryPage, spreadsCategoryPage].includes(route)) {
          response.statusCode = 200
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(readFileSync(new URL('./products.html', import.meta.url)))
          return
        }
        if (![darkCompoundPage, milkyDarkPage, whiteCompoundPage, signatureDarkPage, icecreamCoatingPage, whiteSpreadCoatingPage, darkChocolateChipsPage, whiteChocolateChipsPage, milkChocolateChipsPage, whiteIcecreamCoatingPage, chocolateSpreadPage].includes(route)) return next()

        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.end(readFileSync(new URL('./products/dark-compound-chocolate/index.html', import.meta.url)))
      })
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), productDetailRoute()],
  build: {
    rollupOptions: {
      input: {
        home: `${rootDirectory}index.html`,
        products: `${rootDirectory}products.html`,
        productDetail: `${rootDirectory}products/dark-compound-chocolate/index.html`,
        categories: `${rootDirectory}categories/index.html`,
        comingSoon: `${rootDirectory}coming-soon/index.html`,
        aboutUs: `${rootDirectory}about-us/index.html`,
      },
    },
  },
})
