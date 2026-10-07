import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import vm from 'node:vm'

const require = createRequire(import.meta.url)
const ts = require('typescript')
const React = require('react')
const source = readFileSync(new URL('../components/profile-form.tsx', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React,
  target: ts.ScriptTarget.ES2020, esModuleInterop: true,
} }).outputText

class ApiError extends Error {
  constructor(status) { super('Request failed'); this.status = status }
}

function setup({ missing = false, failSave = false, saveStatus = 503, metadataFails = false } = {}) {
  const state = [], dependencies = []
  let index = 0, effectIndex = 0
  const calls = { patches: [], metadata: [], success: [], errors: [], warnings: [] }
  const member = missing ? undefined : {
    name: 'Official Full Name', public_name: 'Chosen Public Alias',
    email: 'test@example.com', phone_number: '0500000000',
    gender: 'Male', uni_level: 7, uni_college: 'كلية الحاسب',
  }
  const user = {
    publicMetadata: { fullArabicName: 'Stale Sign-in Name', saudiPhone: '0500000000' },
    primaryEmailAddress: { emailAddress: 'test@example.com' },
    externalAccounts: [], emailAddresses: [], reload: async () => {},
  }
  const hooks = {
    ...React,
    useState(initial) {
      const slot = index++
      if (!(slot in state)) state[slot] = initial
      return [state[slot], value => { state[slot] = typeof value === 'function' ? value(state[slot]) : value }]
    },
    useMemo: fn => fn(),
    useEffect(fn, deps) {
      const slot = effectIndex++
      if (!dependencies[slot] || deps.some((v, i) => v !== dependencies[slot][i])) {
        dependencies[slot] = deps
        fn()
      }
    },
  }
  const component = name => ({ [name]: name })
  const imports = {
    react: hooks,
    '@clerk/nextjs': { useUser: () => ({ user, isLoaded: true }) },
    sonner: { toast: {
      success: message => calls.success.push(message),
      error: message => calls.errors.push(message), warning: message => calls.warnings.push(message),
    } },
    'lucide-react': { Loader2: 'Loader2', Lock: 'Lock', Save: 'Save' },
    '@/components/ui/button': component('Button'),
    '@/components/ui/input': component('Input'),
    '@/components/ui/select': Object.fromEntries(['Select','SelectContent','SelectItem','SelectTrigger','SelectValue'].map(v => [v,v])),
    '@/lib/actions': {
      updateClerkMetadata: async data => { calls.metadata.push(data); return metadataFails ? { error: 'Sync failed' } : {} },
      promoteEmailToPrimary: async () => ({ promoted: false }),
    },
    '@/hooks/queries/use-current-member': { useCurrentMember: () => ({
      data: member, isPending: false, isError: missing,
      error: missing ? new ApiError(404) : null, refetch: async () => {},
    }) },
    '@/hooks/mutations/use-update-profile': { useUpdateProfile: () => ({
      mutateAsync: async data => {
        calls.patches.push(data)
        if (failSave) throw new ApiError(saveStatus)
        return { ...member, ...data }
      },
    }) },
    '@/lib/api/errors': { ApiError },
    '@/lib/utils': { cn: (...args) => args.filter(Boolean).join(' ') },
    'react-i18next': { useTranslation: () => ({ t: key => key }) },
    '@/lib/i18n-client': {},
  }
  const module = { exports: {} }
  vm.runInNewContext(compiled, {
    module, exports: module.exports, require: id => {
      assert.ok(id in imports, `Unmocked import: ${id}`)
      return imports[id]
    }, console: { error() {} },
  })
  function render() {
    index = 0; effectIndex = 0
    return module.exports.ProfileForm()
  }
  render() // Initial effects load membership into state.
  return { render, calls }
}

function find(tree, predicate) {
  if (!tree || typeof tree !== 'object') return undefined
  if (predicate(tree)) return tree
  for (const child of React.Children.toArray(tree.props?.children)) {
    const result = find(child, predicate)
    if (result) return result
  }
}

test('profile displays persisted full and public names rather than stale sign-in metadata', () => {
  const { render } = setup()
  const tree = render()
  assert.ok(find(tree, node => node.type === 'Input' && node.props.value === 'Official Full Name'))
  assert.equal(find(tree, node => node.props.id === 'public-name').props.value, 'Chosen Public Alias')
})

test('editing only public name saves it independently without changing sign-in metadata or wallet name', async () => {
  const { render, calls } = setup()
  find(render(), node => node.props.id === 'public-name').props.onChange({ target: { value: '  New Public Alias  ' } })
  await render().props.onSubmit({ preventDefault() {} })
  assert.equal(calls.patches.length, 1)
  assert.equal(calls.patches[0].public_name, 'New Public Alias')
  assert.equal(calls.patches[0].name, 'Official Full Name')
  assert.equal('custom_name' in calls.patches[0], false)
  assert.equal(calls.metadata.length, 0)
  assert.equal(calls.success.length, 1)
})

test('failed member save leaves edits available and never reports success or updates sign-in metadata', async () => {
  const { render, calls } = setup({ failSave: true })
  find(render(), node => node.props.id === 'public-name').props.onChange({ target: { value: 'Unsaved Alias' } })
  await render().props.onSubmit({ preventDefault() {} })
  assert.equal(calls.success.length, 0)
  assert.equal(calls.metadata.length, 0)
  assert.equal(calls.errors.length, 1)
  assert.equal(find(render(), node => node.type === 'Button' && node.props.type === 'submit').props.disabled, false)
})

test('missing membership explains the problem and disables saving', () => {
  const { render } = setup({ missing: true })
  const tree = render()
  assert.ok(find(tree, node => node.props.role === 'alert'))
  assert.equal(find(tree, node => node.props.id === 'public-name').props.disabled, true)
  assert.equal(find(tree, node => node.type === 'Button' && node.props.type === 'submit').props.disabled, true)
})


test('editing full name preserves the chosen public name and syncs sign-in details after saving', async () => {
  const { render, calls } = setup()
  find(render(), node => node.type === 'Input' && node.props.value === 'Official Full Name')
    .props.onChange({ target: { value: '  Updated Full Identity  ' } })
  await render().props.onSubmit({ preventDefault() {} })
  assert.equal(calls.patches[0].name, 'Updated Full Identity')
  assert.equal(calls.patches[0].public_name, 'Chosen Public Alias')
  assert.equal(calls.metadata[0].fullArabicName, 'Updated Full Identity')
  assert.equal('publicName' in calls.metadata[0], false)
  assert.equal(calls.success.length, 1)
})

test('whitespace-only public name blocks both writes', async () => {
  const { render, calls } = setup()
  find(render(), node => node.props.id === 'public-name').props.onChange({ target: { value: '   ' } })
  await render().props.onSubmit({ preventDefault() {} })
  assert.equal(calls.patches.length, 0)
  assert.equal(calls.metadata.length, 0)
  assert.ok(find(render(), node => node.type === 'p' && node.props.children === 'profileForm.errors.publicNameRequired'))
})

test('email conflict keeps edits and reports the actionable conflict without updating sign-in details', async () => {
  const { render, calls } = setup({ failSave: true, saveStatus: 409 })
  find(render(), node => node.props.id === 'public-name').props.onChange({ target: { value: 'New Alias' } })
  await render().props.onSubmit({ preventDefault() {} })
  assert.equal(calls.errors[0], 'profileForm.toast.emailConflict')
  assert.equal(calls.metadata.length, 0)
  assert.equal(calls.success.length, 0)
})

test('metadata sync failure explains that membership was saved without claiming full success', async () => {
  const { render, calls } = setup({ metadataFails: true })
  find(render(), node => node.type === 'Input' && node.props.value === 'Official Full Name')
    .props.onChange({ target: { value: 'Updated Full Identity' } })
  await render().props.onSubmit({ preventDefault() {} })
  assert.equal(calls.patches.length, 1)
  assert.equal(calls.warnings[0], 'profileForm.toast.metadataSyncFailed')
  assert.equal(calls.success.length, 0)
})
