import type { ReactNode } from "react"
import { PawIcon } from "./neko-icons"

type SectionProps = {
  title: string
  subtitle?: string
  icon?: ReactNode
  children: ReactNode
  rightSlot?: ReactNode
}

export function Section ({ title, subtitle, icon, children, rightSlot }: SectionProps) {
  return (
    <section className="rounded-2xl shadow-sm bg-card shadow-[0_2px_0_0_rgba(244,168,184,0.15)]">
      <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
            {icon ?? <PawIcon className="h-5 w-5" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground leading-tight">{title}</h2>
            {subtitle ? (
              <p className="text-xs text-muted-foreground leading-tight mt-0.5">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {rightSlot ? <div className="text-xs text-muted-foreground">{rightSlot}</div> : null}
      </header>
      <div className="p-5">{children}</div>
    </section>
  )
}

export function StatTile ({
  label,
  value,
  hint,
}: {
  label: string
  value: ReactNode
  hint?: string
}) {
  return (
    <div className="rounded-xl shadow-sm bg-secondary/40 px-3 py-2.5">
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-mono text-sm font-semibold text-foreground tabular-nums leading-tight">
        {value}
      </div>
      {hint ? <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div> : null}
    </div>
  )
}

export function ProgressBar ({
  value,
  tone = "primary",
}: {
  value: number
  tone?: "primary" | "accent" | "warn"
}) {
  const toneClass =
    tone === "primary"
      ? "bg-primary"
      : tone === "accent"
        ? "bg-[oklch(0.78_0.08_200)]"
        : "bg-[oklch(0.82_0.13_70)]"
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className={`h-full rounded-full ${toneClass}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
