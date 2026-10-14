/**
 * Generate ADMIN_PASSWORD_HASH for the /admin login.
 *
 *   npm run admin:hash-password            # prompts (input hidden)
 *   echo -n 'secret' | npm run admin:hash-password -- --stdin
 *
 * Put the output in a server-side env var (never NEXT_PUBLIC_*), e.g. .env.local or a K8s Secret:
 *   ADMIN_USERNAME=admin
 *   ADMIN_PASSWORD_HASH=scrypt:32768:8:1:...
 */
import readline from 'node:readline'
import { hashPassword } from '../src/lib/rag/admin/auth.ts'

async function readPassword(): Promise<string> {
  if (process.argv.includes('--stdin') || !process.stdin.isTTY) {
    let data = ''
    for await (const chunk of process.stdin) data += chunk
    return data.replace(/\r?\n$/, '')
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })
  const out = rl as unknown as { _writeToOutput: (s: string) => void; output: NodeJS.WriteStream }
  const original = out._writeToOutput.bind(rl)
  let muted = false
  out._writeToOutput = (s: string) => (muted ? out.output.write('') : original(s))
  const answer = await new Promise<string>((resolve) => {
    rl.question('Admin password: ', resolve)
    muted = true
  })
  rl.close()
  process.stdout.write('\n')
  return answer
}

const password = await readPassword()
try {
  console.log(await hashPassword(password))
} catch (e) {
  console.error((e as Error).message)
  process.exit(1)
}
