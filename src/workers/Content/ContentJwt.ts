/**
 * Workers - Content Jwt
 */

/**
 * The one signing algorithm used here. GitHub requires RS256 for app tokens
 * and Cloudflare Access signs its own assertions the same way.
 *
 * @type {object}
 */
const jwtAlgorithm = {
  name: 'RSASSA-PKCS1-v1_5',
  hash: 'SHA-256'
} as const

/**
 * Encode bytes or text as base64url, the encoding a JWT is built from.
 *
 * @param {ArrayBuffer|Uint8Array|string} input
 * @return {string}
 */
const encodeBase64Url = (input: ArrayBuffer | Uint8Array | string): string => {
  let bytes: Uint8Array

  if (typeof input === 'string') {
    bytes = new TextEncoder().encode(input)
  } else if (input instanceof Uint8Array) {
    bytes = input
  } else {
    bytes = new Uint8Array(input)
  }

  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/**
 * Decode base64url back into bytes.
 *
 * @param {string} input
 * @return {Uint8Array}
 */
const decodeBase64Url = (input: string): Uint8Array => {
  const padded = input
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(input.length / 4) * 4, '=')

  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }

  return bytes
}

/**
 * Import a PEM private key for signing.
 *
 * GitHub hands out PKCS#1 keys, which begin `BEGIN RSA PRIVATE KEY`, and Web
 * Crypto only imports PKCS#8, which begins `BEGIN PRIVATE KEY`. Convert the
 * key once before storing it rather than trying to convert it here:
 *
 * ```sh
 * openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in app.pem -out app-pkcs8.pem
 * ```
 *
 * @param {string} pem
 * @return {Promise<CryptoKey>}
 * @throws {Error} When the key is not PKCS#8.
 */
const importPrivateKey = async (pem: string): Promise<CryptoKey> => {
  if (pem.includes('BEGIN RSA PRIVATE KEY')) {
    throw new Error(
      'The GitHub app key is PKCS#1. Convert it to PKCS#8 with openssl before storing it — see the Content worker readme.'
    )
  }

  const body = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s+/g, '')

  return await crypto.subtle.importKey(
    'pkcs8',
    decodeBase64Url(body).buffer as ArrayBuffer,
    jwtAlgorithm,
    false,
    ['sign']
  )
}

/**
 * Sign a JWT with an RSA private key.
 *
 * @param {Object<string, unknown>} payload
 * @param {string} pem
 * @return {Promise<string>}
 */
const signJwt = async (payload: Record<string, unknown>, pem: string): Promise<string> => {
  const key = await importPrivateKey(pem)
  const header = { alg: 'RS256', typ: 'JWT' }
  const signingInput =
    `${encodeBase64Url(JSON.stringify(header))}.${encodeBase64Url(JSON.stringify(payload))}`

  const signature = await crypto.subtle.sign(
    jwtAlgorithm.name,
    key,
    new TextEncoder().encode(signingInput)
  )

  return `${signingInput}.${encodeBase64Url(signature)}`
}

/**
 * Verify a JWT against a public key in JWK form and return its claims.
 *
 * @param {string} token
 * @param {JsonWebKey} jwk
 * @return {Promise<Object<string, unknown>|undefined>}
 */
const verifyJwt = async (
  token: string,
  jwk: JsonWebKey
): Promise<Record<string, unknown> | undefined> => {
  const parts = token.split('.')
  const [header, payload, signature] = parts

  if (parts.length !== 3 || !header || !payload || !signature) {
    return undefined
  }

  const key = await crypto.subtle.importKey('jwk', jwk, jwtAlgorithm, false, ['verify'])
  const valid = await crypto.subtle.verify(
    jwtAlgorithm.name,
    key,
    decodeBase64Url(signature),
    new TextEncoder().encode(`${header}.${payload}`)
  )

  if (!valid) {
    return undefined
  }

  return JSON.parse(new TextDecoder().decode(decodeBase64Url(payload))) as Record<string, unknown>
}

/* Exports */

export {
  encodeBase64Url,
  decodeBase64Url,
  signJwt,
  verifyJwt
}
