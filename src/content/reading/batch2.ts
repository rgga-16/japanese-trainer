// Reading comprehension passages (読解), batch 2: two more N5 passages.
// Every passage carries EXACTLY 3 questions — see CONTENT_GUIDE.md.

import type { ReadingPassage } from "../types";

export const readingBatch2: ReadingPassage[] = [
  {
    id: "reading.supermarket-visit",
    title: "スーパーで買[か]い物[もの]",
    level: "N5",
    paragraphsJa: [
      "きのう、私[わたし]は妹[いもうと]とスーパーに行[い]きました。スーパーは家[いえ]から歩[ある]いて十分[じゅっぷん]です。",
      "私[わたし]はりんごを三[みっ]つと牛乳[ぎゅうにゅう]を買[か]いました。妹[いもうと]はアイスクリームを買[か]いたいと言[い]いましたが、お金[かね]が足[た]りませんでした。それで、私[わたし]が少[すこ]しお金[かね]を出[だ]しました。",
    ],
    questions: [
      {
        id: "reading.supermarket-visit.q1",
        question: "家[いえ]からスーパーまで、歩[ある]いてどのくらいかかりますか。",
        choices: ["五分[ごふん]", "十分[じゅっぷん]", "三十分[さんじゅっぷん]", "一時間[いちじかん]"],
        correctIndex: 1,
        explanation: "「歩いて十分です」と書かれている。",
      },
      {
        id: "reading.supermarket-visit.q2",
        question: "「私[わたし]」は何[なに]を買[か]いましたか。",
        choices: [
          "アイスクリームと牛乳[ぎゅうにゅう]",
          "りんごとアイスクリーム",
          "りんごと牛乳[ぎゅうにゅう]",
          "牛乳[ぎゅうにゅう]とパン",
        ],
        correctIndex: 2,
        explanation: "「りんごを三つと牛乳を買いました」とある。アイスクリームは妹が買いたかったもの。",
      },
      {
        id: "reading.supermarket-visit.q3",
        question: "どうして「私[わたし]」はお金[かね]を出[だ]しましたか。",
        choices: [
          "妹[いもうと]のお金[かね]が足[た]りなかったから",
          "妹[いもうと]がお金[かね]をなくしたから",
          "スーパーが安[やす]かったから",
          "妹[いもうと]が買[か]い物[もの]をしたくなかったから",
        ],
        correctIndex: 0,
        explanation: "「お金が足りませんでした。それで、私が少しお金を出しました」と理由が書かれている。",
      },
    ],
    focusPointIds: ["n5.ni-iku", "n5.tai-form"],
  },
  {
    id: "reading.rainy-sunday",
    title: "雨[あめ]の日曜日[にちようび]",
    level: "N5",
    paragraphsJa: [
      "日曜日[にちようび]は朝[あさ]から雨[あめ]でした。ケンさんは出[で]かけないで、家[いえ]で本[ほん]を読[よ]みました。",
      "昼[ひる]ごはんのあと、お母[かあ]さんに電話[でんわ]をしました。お母[かあ]さんは「来週[らいしゅう]、うちに来[き]てください。」と言[い]いました。ケンさんは「はい、行[い]きます。」と言[い]いました。",
    ],
    questions: [
      {
        id: "reading.rainy-sunday.q1",
        question: "日曜日[にちようび]、ケンさんは家[いえ]で何[なに]をしましたか。",
        choices: ["本[ほん]を読[よ]みました", "掃除[そうじ]をしました", "映画[えいが]を見[み]ました", "料理[りょうり]をしました"],
        correctIndex: 0,
        explanation: "雨だったので出かけず、「家で本を読みました」とある。",
      },
      {
        id: "reading.rainy-sunday.q2",
        question: "ケンさんはいつお母[かあ]さんに電話[でんわ]をしましたか。",
        choices: ["朝[あさ]ごはんの前[まえ]", "昼[ひる]ごはんのあと", "夜[よる]", "来週[らいしゅう]"],
        correctIndex: 1,
        explanation: "「昼ごはんのあと、お母さんに電話をしました」と書かれている。",
      },
      {
        id: "reading.rainy-sunday.q3",
        question: "ケンさんは来週[らいしゅう]、どこへ行[い]きますか。",
        choices: [
          "図書館[としょかん]",
          "友[とも]だちの家[いえ]",
          "お母[かあ]さんの家[いえ]",
          "会社[かいしゃ]",
        ],
        correctIndex: 2,
        explanation: "お母さんが「うちに来てください」と言い、ケンさんが「はい、行きます」と答えたので、母の家へ行く。",
      },
    ],
    focusPointIds: ["n5.naide-kudasai", "n5.ta-form"],
  },
];
