"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Flame, Heart, RotateCcw, Shuffle, ShoppingBag, Sparkles } from "lucide-react";
import { useState } from "react";
import { BUDGETS, GIFTS, INTERESTS, OCCASIONS, shopLinks, type Gift, type GiftFor, type Interest, type Occasion } from "@data/gifts";
import { ShareBar } from "@/components/ui/ShareBar";
import { sfx } from "@/lib/audio";
import { celebrate } from "@/lib/confetti";
import { useCouple } from "@/lib/couple";
import { buildLink } from "@/lib/share";
import { useHydrated, useStored } from "@/lib/storage";
import { markActive } from "@/lib/streak";

type Recipient = Exclude<GiftFor, "both">;
type Filters = { to: Recipient; budget: number | null; occasion: Occasion | null; interests: Interest[] };

/** Link payload for /hint: who dropped it and the gift ids they'd love. */
export type HintShare = { n: string; g: string[] };

const INITIAL: Filters = { to: "her", budget: null, occasion: null, interests: [] };
export const HINTS_KEY = "gift-hints";

/** Scores a gift against the filters; null means it doesn't fit at all. */
export function scoreGift(g: Gift, f: Filters) {
  if (g.for !== "both" && g.for !== f.to) return null;
  if (f.budget !== null && g.budget > f.budget) return null;
  let score = g.for === f.to ? 3 : 2;
  let max = 3;
  if (f.budget !== null) {
    max += 3;
    score += g.budget === f.budget ? 3 : 1;
  }
  if (f.occasion) {
    max += 2;
    if (g.occasions.includes(f.occasion)) score += 2;
  }
  if (f.interests.length) {
    max += f.interests.length * 2;
    score += g.interests.filter((i) => f.interests.includes(i)).length * 2;
    if (!g.interests.some((i) => f.interests.includes(i))) return null;
  }
  max += 1;
  if (g.hot) score += 1;
  return Math.round((score / max) * 100);
}

export function GiftCard({ gift, match, saved, onSave }: { gift: Gift; match?: number; saved?: boolean; onSave?: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="relative flex flex-col overflow-hidden rounded-[28px] bg-white shadow-soft"
    >
      <div className="flex items-start gap-3 bg-gradient-to-br from-rose-soft/70 via-amber-soft/40 to-white p-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-3xl shadow-sm">{gift.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-1.5">
            {gift.hot && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                <Flame className="size-3 fill-white" /> Trending
              </span>
            )}
            <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold tracking-wide text-ink-soft uppercase">
              {gift.for === "both" ? "For you both" : gift.for === "him" ? "For him" : "For her"}
            </span>
          </div>
          <h3 className="mt-1.5 font-display text-[17px] leading-snug font-semibold">{gift.name}</h3>
          <p className="text-sm font-semibold text-rose">{gift.price}</p>
        </div>
        {onSave && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.8 }}
            onClick={onSave}
            aria-pressed={saved}
            aria-label={saved ? "Remove from hint list" : "Save to hint list"}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-white shadow-sm"
          >
            <Heart className={`size-5 transition ${saved ? "fill-rose text-rose" : "text-ink-soft"}`} />
          </motion.button>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4 pt-3">
        <p className="text-sm leading-snug text-ink-soft">
          <Sparkles className="mr-1 inline size-3.5 text-amber" />
          {gift.trend}
        </p>
        <p className="rounded-2xl bg-cream px-3 py-2 text-sm leading-snug">
          <b className="font-semibold">Make it yours:</b> {gift.touch}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          {match !== undefined ? <span className="text-xs font-bold text-sage">{match}% match</span> : <span />}
          <div className="flex gap-1.5">
            {shopLinks(gift).map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-cream hover:text-ink"
              >
                <ShoppingBag className="size-3.5" /> {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on} className={`chip shrink-0 ${on ? "border-ink bg-ink text-cream" : "border-line bg-white/70 text-ink-soft"}`}>
      {children}
    </button>
  );
}

/** Filter → ranked trending gift picks for him or her, plus a shareable "drop a hint" wishlist. */
export function GiftFinder() {
  const [f, setF] = useStored<Filters>("gift-filters", INITIAL);
  const [hints, setHints] = useStored<string[]>(HINTS_KEY, []);
  const [limit, setLimit] = useState(6);
  const [spotlight, setSpotlight] = useState<string | null>(null);
  const { couple } = useCouple();
  const sender = couple.a.trim() || "Someone";
  const hydrated = useHydrated();

  const update = (patch: Partial<Filters>) => {
    sfx.pop();
    setLimit(6);
    setSpotlight(null);
    setF({ ...f, ...patch });
  };

  const ranked = GIFTS.map((g) => ({ g, match: scoreGift(g, f) }))
    .filter((x): x is { g: Gift; match: number } => x.match !== null)
    .sort((a, b) => b.match - a.match || Number(!!b.g.hot) - Number(!!a.g.hot));
  const spot = ranked.find((r) => r.g.id === spotlight);
  const list = spot ? [spot, ...ranked.filter((r) => r !== spot)] : ranked;

  const toggleHint = (id: string) => {
    markActive();
    setHints((h) => {
      if (h.includes(id)) {
        sfx.pop();
        return h.filter((x) => x !== id);
      }
      sfx.chime();
      return [...h, id];
    });
  };

  const surprise = () => {
    if (!ranked.length) return;
    const pick = ranked[Math.floor(Math.random() * Math.min(ranked.length, 8))];
    sfx.chime();
    celebrate();
    markActive();
    setSpotlight(pick.g.id);
    window.scrollTo({ top: (document.getElementById("gift-results")?.offsetTop ?? 0) - 90, behavior: "smooth" });
  };

  const hintGifts = GIFTS.filter((g) => hints.includes(g.id));
  const hintUrl = hydrated && hints.length ? buildLink("/hint", { n: sender, g: hints } satisfies HintShare) : "";

  return (
    <div className="grid gap-6">
      <div className="card grid gap-4 [&>*]:min-w-0">
        <div className="flex rounded-full bg-white/70 p-1">
          {(["her", "him"] as Recipient[]).map((to) => (
            <button key={to} type="button" onClick={() => update({ to })} className="relative flex-1 rounded-full py-2.5 text-sm font-semibold">
              {f.to === to && <motion.span layoutId="gift-to" className="absolute inset-0 rounded-full bg-rose shadow-soft" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className={`relative ${f.to === to ? "text-white" : "text-ink-soft"}`}>{to === "her" ? "🌸 For her" : "🌿 For him"}</span>
            </button>
          ))}
        </div>

        <div>
          <p className="mb-2 text-xs font-bold tracking-wider text-ink-soft uppercase">Budget</p>
          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
            <Chip on={f.budget === null} onClick={() => update({ budget: null })}>Any</Chip>
            {BUDGETS.map((b) => (
              <Chip key={b.id} on={f.budget === b.id} onClick={() => update({ budget: b.id })}>
                {b.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold tracking-wider text-ink-soft uppercase">Occasion</p>
          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
            {OCCASIONS.map((o) => (
              <Chip key={o.id} on={f.occasion === o.id} onClick={() => update({ occasion: f.occasion === o.id ? null : o.id })}>
                {o.emoji} {o.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold tracking-wider text-ink-soft uppercase">
            {f.to === "her" ? "She" : "He"} loves… <span className="font-normal normal-case">(pick any)</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {INTERESTS.map((i) => {
              const on = f.interests.includes(i.id);
              return (
                <Chip key={i.id} on={on} onClick={() => update({ interests: on ? f.interests.filter((x) => x !== i.id) : [...f.interests, i.id] })}>
                  {i.emoji} {i.label}
                </Chip>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary" onClick={surprise} disabled={!ranked.length}>
            <Shuffle className="size-4" /> Surprise me
          </button>
          <button type="button" className="btn-ghost" onClick={() => update({ ...INITIAL, to: f.to })}>
            <RotateCcw className="size-4" /> Reset
          </button>
        </div>
      </div>

      <div id="gift-results" className="scroll-mt-28">
        <p className="mb-3 px-1 text-sm font-semibold text-ink-soft">
          {hydrated ? `${ranked.length} idea${ranked.length === 1 ? "" : "s"} for ${f.to === "her" ? "her" : "him"}` : " "}
        </p>
        {hydrated && ranked.length === 0 && (
          <div className="card text-center text-sm text-ink-soft">No gifts fit every filter. Try a bigger budget or fewer interests 💝</div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {hydrated &&
              list.slice(0, limit).map(({ g, match }) => (
                <div key={g.id} className={spotlight === g.id ? "rounded-[30px] ring-4 ring-rose/60" : ""}>
                  <GiftCard gift={g} match={match} saved={hints.includes(g.id)} onSave={() => toggleHint(g.id)} />
                </div>
              ))}
          </AnimatePresence>
        </div>
        {limit < ranked.length && (
          <div className="mt-5 text-center">
            <button type="button" className="btn-ghost" onClick={() => setLimit((l) => l + 6)}>
              Show more ideas
            </button>
          </div>
        )}
      </div>

      <div className="card bg-gradient-to-br from-white/80 to-rose-soft/40">
        <p className="headline text-xl">💝 Drop a hint</p>
        <p className="mt-1 text-sm text-ink-soft">
          Tap the heart on gifts <i>you</i> would love, then send the list. Subtle? Not really. Effective? Very.
        </p>
        {hintGifts.length ? (
          <>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {hintGifts.map((g) => (
                <button key={g.id} type="button" onClick={() => toggleHint(g.id)} className="chip border-rose/30 bg-white text-ink" aria-label={`Remove ${g.name}`}>
                  {g.emoji} {g.name.length > 28 ? g.name.slice(0, 26) + "…" : g.name} <span className="text-ink-soft">×</span>
                </button>
              ))}
            </div>
            <div className="mt-4">
              <ShareBar compact url={hintUrl} title="A little hint 👀" text={`👀 Not saying anything… but ${sender === "Someone" ? "I" : sender} made a TwoFold gift wishlist:`} />
            </div>
          </>
        ) : (
          <p className="mt-3 text-sm font-semibold text-rose">No hearts yet.</p>
        )}
      </div>
    </div>
  );
}
