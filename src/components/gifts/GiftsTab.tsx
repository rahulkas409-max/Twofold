"use client";

import { TREND_REPORT, TREND_SOURCES, TRENDS_UPDATED } from "@data/gifts";
import { ModuleHero, Section } from "@/components/ui/Section";
import { GiftFinder } from "./GiftFinder";

export function GiftsTab() {
  return (
    <div className="grid gap-12">
      <ModuleHero
        kicker="the perfect present"
        title="Gifts they'll"
        italic="actually love."
        blurb="Trending gift ideas for him and for her, matched to your budget, the occasion and what they're into. Each one comes with a tip to make it personal."
      />

      <Section
        eyebrow={`Trend report · updated ${TRENDS_UPDATED}`}
        title="What everyone's gifting right now"
      >
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {TREND_REPORT.map((t) => (
            <div key={t.title} className="card w-64 shrink-0 snap-start lg:w-auto">
              <span className="text-3xl">{t.emoji}</span>
              <p className="headline mt-2 text-lg leading-snug">{t.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{t.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Gift finder" title="Find the one">
        <GiftFinder />
      </Section>

      <p className="px-1 text-xs text-ink-soft">
        Trend sources:{" "}
        {TREND_SOURCES.map((s, i) => (
          <span key={s.href}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-2 hover:text-ink">
              {s.label}
            </a>
            {i < TREND_SOURCES.length - 1 ? " · " : ""}
          </span>
        ))}
        . Prices are typical ranges in India and vary by seller.
      </p>
    </div>
  );
}
