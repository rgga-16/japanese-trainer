# Native-speaker review queue

Items from the 2026-07 content expansion (357 → 561 exercises, plus the reading,
vocabulary, mock-passage, particle and transitivity banks) that a native or
advanced speaker should confirm.

**Nothing here is known to be wrong.** Everything passes mechanical validation —
furigana well-formedness, id uniqueness, choice counts, `correctIndex` bounds —
and `npx vitest run src/engine/__tests__/content.test.ts` is green. These are
judgment calls the authors flagged themselves: naturalness, register, whether a
distractor is *cleanly* wrong rather than merely less common, and a few readings
worth a second pair of eyes.

Work top-down: **§1 is the group that could actually mislead a learner** if a
call went the wrong way. Everything below that is polish.

When an item is resolved, delete it from this file. When one turns out to be a
real defect, fix the content and add a regression case to
`src/engine/__tests__/content.test.ts` if it's mechanically checkable.

---

## 1. Ambiguity risk — could a second answer also be correct?

These are the ones that matter. A question with two defensible answers marks a
correct response wrong, which is worse than no question at all.

| Where | Item | The concern |
|---|---|---|
| `pd.wa-contrast`, `pd.wa-known-topic` | は chosen as the sole answer | が could work in a different context than the English gloss implies. |
| `pd.de-cause-typhoon` (台風で vs から) | direct-cause で | Leans on the textbook direct-cause preference rather than a categorical rule. |
| `pd.ni-passive-agent` (母に vs から しかられる) | passive agent に | から is attested for some passive agents; confirm に is the only natural choice here. |
| `pd.ni-tsuku-arrival`, `pd.made-distance-endpoint` | へ treated as wrong | Is へ actually ungrammatical here, or just less natural? The drill has no "less natural" verdict. |
| `vq.ortho-kiku-kusuri` | 利く as a distractor for 効く | 効く is the standard collocation for medicine, but 利く is defensible in some registers — may not be cleanly wrong. |
| `n4.hazu.ex8` | 持っているらしいです distractor | Confirm らしい reads as wrong here rather than an equally valid alternative. |
| `passage.station.g2` | はず vs よう/つもり/そう | Near-synonym distractors; confirm only one reads naturally. |
| `passage.trip-plan.g4` | なら vs と/ば/たら | Relies on と's no-volitional-result constraint. |
| `passage.lost-and-found.g3` | らしい conjugation-mistake distractors | Confirm the wrong forms are unambiguously wrong. |
| `n5.mo.ex11` | どこへも行きませんでした *and* どこも行きませんでした both accepted | Are these equally natural, or is one a stretch? |
| `n4.passive.ex10` | 私は…盗まれました and the topic-dropped variant both accepted | Both natural without prior context establishing 私? |

Deliberately avoided as unfixably ambiguous, for context on where the line was
drawn: に/へ on ordinary motion verbs (行く/来る/帰る take either), and
もらう/習う with に vs から. If any item above is judged equally ambiguous, the
right fix is to rewrite the sentence so one answer is forced — not to add the
second answer to `accepted`, which would stop the item teaching the contrast.

## 2. Naturalness — does a native actually say this?

- `n4.te-shimau.ex9` — 料理をしていて、うっかりお皿を割ってしまいました. Does 「〜していて」as a background clause read naturally or slightly clipped?
- `n4.nagara.ex11` — シャワーを浴びながら、歌を歌いました. The source is a sequential て-chain reinterpreted as simultaneous; is that meaning-shift a stretch?
- `n4.sugiru.ex9` — お金を使いすぎています for "overspend". Natural against the more colloquial noun-form 使いすぎ?
- `n5.te-iru.ex11` — 電気が消えている for the change-of-state sense.
- `n5.wa-ga.ex8` — 誰が…背が高い. Double-が in one clause, same pattern as 象は鼻が長い. Ear-check at beginner level.
- `n5.naru.ex8` — 薬を飲んだら、少し元気になりました. Sequential/discovery たら with a past result — standard, but a slightly advanced use.
- `n4.ba-tara.ex8` — 暇なら、映画を見に行きませんか. Natural without です after 暇?
- `n4.you-ni.ex9` — 受かる with ように. Non-volitional-outcome verb alongside potential-form examples.
- `n4.rashii.ex11` — 冬らしい寒さ. Abstract noun-modifying らしい at N4 level.
- `passage.lost-and-found.g1`, `passage.shopping.g5` — 〜ている / かもしれません register judgments (found-item description tone, self-referential soft guess).

## 3. Register and politeness

- `n4.nakereba-naranai.ex11` — bare なきゃ。 as a complete standalone sentence, no いけない. Complete, or a fragment?
- `n4.temo-ii.ex10` — てはだめです accepted alongside てはいけません. Register parity, or should だめです be dropped?
- `n5.kara-reason.ex11` — 〜からだ as a plain/blunt accepted variant next to からです. Natural or curt?
- `n5.no-ga-suki.ex11` — the 上手 (about others) vs 得意 (about oneself) modesty nuance is the graded point. Is that an unambiguous transformation or a matter of taste?
- `n4.te-oku.ex8` — コピーする as a loanword-suru verb. Fine for this app's register?
- `n4.batch1-patterns` overall — politeness spread across the 32 items; confirm no point skews entirely plain or entirely polite.

## 4. Readings and orthography

- **お腹[なか]** (`n5.tai-form.ex8`) — 腹 reads なか only in this set word. Irregular; confirm the bracketing convention handles it acceptably.
- **九時[くじ]** (`n5.o-ni-de.ex11`) — く not きゅう. Standard, but 九 has two common readings.
- **三[みっ]つ / 一[ひと]つ** (`n5.dake-shika.ex8`, reading passages) — counter suffix left outside the bracket, following the お金[かね] precedent. Confirm consistent.
- **近所[きんじょ]のパン屋[や]** (`reading.bakery` title) — two-kanji compound bracketed as one unit. `title` is **exempt from the furigana validator**, so a mistake here is not caught mechanically.
- **さして** (`reading.kyoto-trip`) — 差して written kana-only to avoid an uncommon gloss. Prefer 差[さ]して?
- **いす vs 椅子** (`n5.to-ya.ex10`/`ex11`) — kana chosen since 椅子 wasn't established in the file's vocabulary.
- **80歳** (`n5.mou-mada.ex8`) — arabic numeral before 歳, where existing content writes ages in kanji (二十歳[はたち]). House-style inconsistency.
- `vq.read-jouzu` (上手 → じょうず/うわて) and `vq.read-ichinichi` (一日 → いちにち/ついたち) — traps built on real alternate readings. Confirm the distractor reading is attested and not misleading in isolation.

## 5. Vocabulary level

- `n4.seed.batch2` uses 資料, 同僚, 会議室 — borderline N4/N3 office vocabulary.
- `reading.sports-day` uses 綱引き / 玉入れ and `reading.autumn-weather` uses 泥棒, all **distractor-only** and never explained. They're never the correct answer, but may read as "should I know this?" noise.
- **48 vocab questions omit `vocabIds` entirely.** That was deliberate — a wrong id fails `content.test.ts` — but it means words like 象, 動物, 旅館, 誕生日, 辞書, 得意, 重要, 不安, 珍しい, 問題 were never mechanically checked against the app's own 122-entry `vocab.ts`. All are standard textbook vocabulary; none is verified.

## 6. Exercise design calls

- `n4.te-miru.ex8` — 着てみたい vs the 着てみて distractor. Too subtle a contrast?
- `n4.sugiru.ex11` — the transformation requires dropping たくさん entirely; たくさん寝すぎました (redundant but heard colloquially) is **not** in `accepted`. Intended?
- `n5.tai-form.ex10` — a が-marked object variant (コーヒーが飲みたくない) was deliberately excluded on the grounds that が is less natural with negative たい. Confirm that call.
- `n5.yori-hou-ga.ex11` — rewriting 地下鉄よりタクシーのほうが早く着きます → タクシーは地下鉄より早く着きます. Does dropping のほうが lose a nuance the grader should still require?
- `n5.o-ni-de.ex10` — accepted variants differ only in politeness (ています/ている), not in the に→で particle swap that is the actual teaching point.
- `n5.ni-iku.ex10`/`ex11` — only the movement verb conjugates; the purpose clause is frozen. A deliberate reading of "transformation" for a sentence-pattern point.
- `n5.plain-form.ex8`, `n5.naide-kudasai.ex8` — invented wrong ない-forms as distractors (呼わない, 呼むない, 泳いでいないで). Confirm none accidentally reads as a real dialectal or colloquial form.
- `n4.you-ni-naru.ex11` — たばこを吸わなくなりました glossed with a parenthetical "(he used to, but doesn't anymore)". Overexplaining?
- `n5.na-adjectives.ex11` — 田中さんは親切な人です, chosen over a role noun to avoid awkward repetition.
- `n4.to-nara.ex11` — the instruction embeds unbracketed 「あの店」in English prose. `instruction` is exempt from the furigana contract, so this is legal; flagged only in case bracketing is preferred for readability.
- `n5.kara-made.ex11` — 冬休み spanning 十二月→一月 (a calendar-year rollover). Does the framing read oddly?

## 7. Transitivity pair notes

All 25 pairs from the standard N4 set were verified as genuine 自他 pairs; none
were rejected. Five carry `note`s because their primary sense has a secondary
meaning a learner may trip on — worth confirming the notes say the right thing:

- `tp.tsukeru-tsuku` — pure hiragana, no kanji cue; direction rests entirely on the gloss.
- `tp.okosu-okiru` — also 事故を起こす / 事故が起きる.
- `tp.tateru-tatsu` — also 計画を立てる.
- `tp.kakeru-kakaru` — also 鍵をかける and お金がかかる.
