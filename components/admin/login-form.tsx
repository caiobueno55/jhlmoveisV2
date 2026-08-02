'use client'

import { Loader2, Lock } from 'lucide-react'
import { useActionState } from 'react'
import { type ActionState, loginAction } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const INITIAL: ActionState = { ok: false, message: '' }

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, INITIAL)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Senha de acesso</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>

      {state.message && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Lock className="size-4" />
        )}
        Entrar no painel
      </Button>
    </form>
  )
}
