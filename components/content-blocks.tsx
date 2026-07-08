import { Lightbulb } from 'lucide-react'
import type { ContentBlock } from '@/lib/content'

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2
                key={i}
                className="mt-4 font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              >
                {block.text}
              </h2>
            )
          case 'paragraph':
            return (
              <p key={i} className="text-pretty leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            )
          case 'list':
            return (
              <ul key={i} className="flex flex-col gap-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            )
          case 'steps':
            return (
              <ol key={i} className="flex flex-col gap-4">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {j + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            )
          case 'tip':
            return (
              <div
                key={i}
                className="flex gap-3 rounded-lg border border-accent/30 bg-accent/10 p-4"
              >
                <Lightbulb className="size-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-foreground">
                  <span className="font-semibold">Pro tip: </span>
                  {block.text}
                </p>
              </div>
            )
          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-2 border-accent pl-4 font-serif text-lg italic text-foreground"
              >
                {block.text}
              </blockquote>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
