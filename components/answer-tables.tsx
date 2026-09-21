import type { AnswerTable } from '@/lib/content'

export function AnswerTables({ tables }: { tables: AnswerTable[] }) {
  if (!tables.length) return null

  return (
    <div className="mt-10 flex flex-col gap-8">
      {tables.map((table) => (
        <section key={table.title} aria-labelledby={`table-${table.title}`}>
          <h2
            id={`table-${table.title}`}
            className="font-serif text-2xl font-semibold tracking-tight text-foreground"
          >
            {table.title}
          </h2>
          {table.caption && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{table.caption}</p>
          )}
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
              <thead className="bg-secondary/80">
                <tr>
                  {table.headers.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="border-b border-border px-3 py-2.5 font-semibold text-foreground"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={i} className="odd:bg-card even:bg-secondary/30">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`border-b border-border px-3 py-2.5 text-muted-foreground ${
                          j === 0 ? 'font-medium text-foreground' : ''
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  )
}
