type YouTubeEmbedProps = {
  id: string
  title: string
  channel: string
}

export function YouTubeEmbed({ id, title, channel }: YouTubeEmbedProps) {
  return (
    <section className="mt-10" aria-labelledby="watch-heading">
      <h2
        id="watch-heading"
        className="font-serif text-2xl font-semibold tracking-tight text-foreground"
      >
        Watch someone make it
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Video by {channel} on YouTube — helpful for technique; follow our written ratio if the
        amounts differ.
      </p>
      <div className="relative mt-4 aspect-video overflow-hidden rounded-2xl border border-border bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          className="font-medium text-accent underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
        {' · '}
        {channel}
      </p>
    </section>
  )
}
