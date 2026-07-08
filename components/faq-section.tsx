import type { FaqItem } from '@/lib/content'

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs.length) return null
  return (
    <section className="mt-14" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
      >
        Frequently asked questions
      </h2>
      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
        {faqs.map((faq, i) => (
          <details key={i} className="group px-5 py-4" name="faq">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-foreground marker:content-['']">
              {faq.question}
              <span
                className="shrink-0 text-accent transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
