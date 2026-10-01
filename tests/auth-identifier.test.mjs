import assert from 'node:assert/strict'
import { test } from 'node:test'
import { asUniversityEmail } from '../lib/auth-identifier.ts'

test('university IDs become Qassim University email addresses', () => {
  assert.equal(asUniversityEmail(' 442106350 '), '442106350@qu.edu.sa')
  assert.equal(asUniversityEmail('44210635'), null)
  assert.equal(asUniversityEmail('4421063500'), null)
})

test('email addresses and non-digit IDs cannot enter the university flow', () => {
  assert.equal(asUniversityEmail('student@qu.edu.sa'), null)
  assert.equal(asUniversityEmail('name@example.com'), null)
  assert.equal(asUniversityEmail('44210635x'), null)
})
