#!/usr/bin/env node
/**
 * Fetches AClean Building Solutions reviews from the Google Places API (Legacy).
 * Writes results to src/data/reviews.json.
 *
 * Usage: npm run fetch-reviews
 * Requires GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in .env
 */

import { writeFileSync, readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname  = dirname(fileURLToPath(import.meta.url))
const rootDir    = resolve(__dirname, '..')
const outputPath = resolve(rootDir, 'src/data/reviews.json')

const BUSINESS_NAME   = 'AClean Building Solutions'
const MAPS_URL        = 'https://maps.google.com/?cid=6892143774555714101'
const REVIEWS_URL     = 'https://maps.app.goo.gl/MaeuJpk7uLv8nYnz9'
const WRITE_REVIEW_URL = 'https://g.page/r/CTUyUC8_0KVfEAE/review'

// Strip street number — only show city, state, zip, country
function formatAddress(full) {
  if (!full) return ''
  const parts = full.split(', ')
  return parts.length > 1 ? parts.slice(1).join(', ') : full
}

function loadEnv() {
  const envPath = resolve(rootDir, '.env')
  if (!existsSync(envPath)) return {}
  const env = {}
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 0) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (key && val) env[key] = val
  }
  return env
}

async function main() {
  const env    = loadEnv()
  const apiKey = env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    console.error('❌  GOOGLE_PLACES_API_KEY not found in .env')
    process.exit(1)
  }

  const placeId = env.GOOGLE_PLACE_ID || process.env.GOOGLE_PLACE_ID || 'ChIJmUMh9XNBsq4RNTJQLz_QpV8'
  console.log(`📍  Using Place ID: ${placeId}`)

  console.log('📡  Fetching place details and reviews...')
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'name,place_id,rating,user_ratings_total,reviews,formatted_address,url',
    key: apiKey,
  })
  const res  = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`)
  const data = await res.json()

  if (data.status !== 'OK') {
    throw new Error(`Places API error: ${data.status} — ${data.error_message ?? ''}`)
  }

  const r = data.result
  const reviews = (r.reviews || [])
    .sort((a, b) => b.time - a.time)
    .map(rev => ({
      author_name:               rev.author_name,
      author_url:                rev.author_url || '',
      profile_photo_url:         rev.profile_photo_url || '',
      rating:                    rev.rating ?? 5,
      text:                      rev.text || '',
      time:                      rev.time,
      relative_time_description: rev.relative_time_description || '',
    }))

  const output = {
    place_id:         placeId,
    place_name:       r.name || BUSINESS_NAME,
    address:          formatAddress(r.formatted_address),
    rating:           r.rating ?? 5,
    total_reviews:    r.user_ratings_total ?? 0,
    maps_url:         MAPS_URL,
    reviews_url:      REVIEWS_URL,
    write_review_url: WRITE_REVIEW_URL,
    fetched_at:       new Date().toISOString(),
    reviews,
  }

  writeFileSync(outputPath, JSON.stringify(output, null, 2))
  console.log(`✅  Saved ${reviews.length} review(s) to src/data/reviews.json`)
  console.log(`    ⭐  ${r.rating}/5 based on ${r.user_ratings_total} total reviews`)
}

main().catch(err => {
  console.error('❌ ', err.message)
  process.exit(1)
})
