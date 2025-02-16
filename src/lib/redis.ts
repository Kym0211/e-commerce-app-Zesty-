import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://knowing-peacock-14964.upstash.io',
  token: 'ATp0AAIjcDE1NjY5ZWY4OGE2ZWI0MTI5OTFjMGNlZDc3MmMwMTBlY3AxMA',
})

export default redis;
