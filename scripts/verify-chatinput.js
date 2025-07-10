#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

console.log('🔍 ChatInput Component Verification\n')

// Check if required files exist
const checks = [
  {
    name: 'ChatInput Component',
    path: 'src/components/conversation/ChatInput.tsx',
    required: true
  },
  {
    name: 'Button Component (dependency)',
    path: 'src/components/ui/Button.tsx', 
    required: true
  },
  {
    name: 'Badge Component (dependency)',
    path: 'src/components/ui/Badge.tsx',
    required: true
  },
  {
    name: 'Utils (dependency)', 
    path: 'src/lib/utils.ts',
    required: true
  },
  {
    name: 'Main export file',
    path: 'src/index.ts',
    required: true
  },
  {
    name: 'Package.json',
    path: 'package.json',
    required: true
  },
  {
    name: 'Rollup config',
    path: 'rollup.config.js',
    required: true
  },
  {
    name: 'TypeScript config',
    path: 'tsconfig.json', 
    required: true
  },
  {
    name: 'Build output directory',
    path: 'dist',
    required: false
  }
]

let allPassed = true

checks.forEach(check => {
  const exists = fs.existsSync(check.path)
  const status = exists ? '✅' : (check.required ? '❌' : '⚠️')
  const message = exists ? 'Found' : (check.required ? 'MISSING (REQUIRED)' : 'Missing (optional)')
  
  console.log(`${status} ${check.name}: ${message}`)
  
  if (check.required && !exists) {
    allPassed = false
  }
})

console.log('\n📦 Package.json Analysis')

// Check package.json content
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  
  const requiredFields = ['name', 'version', 'main', 'module', 'types', 'files']
  requiredFields.forEach(field => {
    const exists = packageJson[field] !== undefined
    console.log(`${exists ? '✅' : '❌'} ${field}: ${exists ? packageJson[field] : 'MISSING'}`)
    if (!exists) allPassed = false
  })
  
  // Check dependencies
  console.log('\n📚 Dependencies Check')
  const requiredDeps = [
    'react',
    'lucide-react', 
    'sonner',
    'class-variance-authority',
    'clsx',
    'tailwind-merge'
  ]
  
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies }
  
  requiredDeps.forEach(dep => {
    const exists = allDeps[dep] !== undefined
    console.log(`${exists ? '✅' : '❌'} ${dep}: ${exists ? allDeps[dep] : 'MISSING'}`)
    if (!exists) allPassed = false
  })
  
} catch (error) {
  console.log('❌ Could not read package.json')
  allPassed = false
}

// Check if ChatInput is exported
console.log('\n📤 Export Verification')
try {
  const indexContent = fs.readFileSync('src/index.ts', 'utf8')
  const hasChatInputExport = indexContent.includes('ChatInput')
  console.log(`${hasChatInputExport ? '✅' : '❌'} ChatInput exported: ${hasChatInputExport ? 'Yes' : 'No'}`)
  if (!hasChatInputExport) allPassed = false
} catch (error) {
  console.log('❌ Could not read src/index.ts')
  allPassed = false
}

// Check build status
console.log('\n🏗️ Build Status')
const distExists = fs.existsSync('dist')
if (distExists) {
  const expectedFiles = ['index.js', 'index.esm.js', 'index.d.ts']
  expectedFiles.forEach(file => {
    const exists = fs.existsSync(path.join('dist', file))
    console.log(`${exists ? '✅' : '⚠️'} dist/${file}: ${exists ? 'Found' : 'Not built yet'}`)
  })
} else {
  console.log('⚠️ dist/ directory not found - run "npm run build" to build the package')
}

// File size analysis
console.log('\n📊 Component Analysis')
try {
  const chatInputContent = fs.readFileSync('src/components/conversation/ChatInput.tsx', 'utf8')
  const lines = chatInputContent.split('\n').length
  const size = Buffer.byteLength(chatInputContent, 'utf8')
  
  console.log(`📄 ChatInput.tsx: ${lines} lines, ${(size / 1024).toFixed(1)}KB`)
  
  // Count imports
  const imports = chatInputContent.match(/^import.*from.*$/gm) || []
  console.log(`📦 Imports: ${imports.length} dependencies`)
  
  // Count interfaces  
  const interfaces = chatInputContent.match(/^interface.*{$/gm) || []
  console.log(`🔧 Interfaces: ${interfaces.length} TypeScript interfaces`)
  
} catch (error) {
  console.log('❌ Could not analyze ChatInput component')
}

// Final status
console.log('\n' + '='.repeat(50))
if (allPassed) {
  console.log('🎉 ALL CHECKS PASSED!')
  console.log('✅ ChatInput component is ready for packaging')
  console.log('\nNext steps:')
  console.log('1. Run "npm run build" to build the package')
  console.log('2. Run "npm pack" to create a test package')
  console.log('3. Test in another project')
  console.log('4. Run "npm publish" when ready')
} else {
  console.log('❌ SOME CHECKS FAILED')
  console.log('⚠️ Please fix the issues above before packaging')
}

console.log('\n📖 See CHATINPUT_PACKAGING_GUIDE.md for detailed instructions')