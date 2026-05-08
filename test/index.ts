/* eslint-disable unused-imports/no-unused-imports */

import { AnimeTrace, Ascii2d, Iqdb, SauceNAO, TinEye, TraceMoe } from '@/index.js'

const url = 'https://img.huankong.top/i/2024/04/15/661cc5a5b583d.jpg'
const path = './test/test.jpg'

// Ascii2d({
//   type: 'bovw',
//   url,
//   flareSolverr: 'https://flaresolverr.huankong.top',
// })
//   .then((res) => {
//     console.dir(res, { depth: null })
//   })

// SauceNAO({
//   path,
// }).then((res) => {
//   console.dir(res, { depth: null })
// })

// Iqdb({
//   url,
// }).then((res) => {
//   console.dir(res, { depth: null })
// })

// TraceMoe({
//   url,
// }).then((res) => {
//   console.dir(res, { depth: null })
// })

// TinEye({
//   url,
// }).then((res) => {
//   console.dir(res, { depth: null })
// })

AnimeTrace({
  url,
}).then((res) => {
  console.dir(res, { depth: null })
})
