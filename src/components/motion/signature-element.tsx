import { cn } from "@/lib/utils"

interface SignatureElementProps {
  /** Section index from 1 to 5 */
  index: number
  className?: string
}

export function SignatureElement({ index, className }: SignatureElementProps) {
  const label = String(Math.min(5, Math.max(1, index))).padStart(2, "0")

  return (
    <div className={cn("signature-index", className)} aria-hidden="true">
      <span className="signature-index__digits">{label}</span>
      <span className="signature-index__scan" />
    </div>
  )
}
