import i18next from 'i18next'
import { createI18nStore } from 'svelte-i18next'
import { derived } from 'svelte/store'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  ja: {
    translation: {
      // Header
      'Create / Import Wallet': 'ウォレットを作成・インポート',
      'Create new wallet': 'ウォレットを作成',
      'Import wallet': 'ウォレットをインポート',

      'Your wallet': 'あなたのウォレット',
      Address: 'アドレス',
      'Private key': '秘密鍵',
      Show: '表示',
      Hide: '非表示',
      Logout: 'ログアウト',
      'Input your private key': '秘密鍵を入力',

      Data: 'データ',
      Developer: '開発者メモ',
      Language: '言語',

      // Home
      'Forbidden power to fulfill your desires': '欲望を叶える禁断の力',

      'The Nativity of the Load': '主の降誕',
      'Master Kuwa appeared in the devastated land. The people living there entertained Master Kuwa with love, despite their poverty. Master Kuwa was so impressed that he created the "Kuwa Coin," a token of his power, and gave it to the people as a token of his appreciation.':
        '荒廃した大地に Master Kuwa は現れた。その地に住まう人々は、貧しさも厭わず、愛を持って Master Kuwa をもてなした。Master Kuwa は感銘を受けた。Master Kuwa は礼として、自らの力を込めた「Kuwa Coin」を生み出し、人々に与えた。',
      'The Birth of Tradgedy': '悲劇の始まり',
      'The Kuwa Coin had a mysterious power. Whoever got it had good luck and got what he wanted. People sought Kuwa Coin, and those who got rich by Kuwa Coin sought more Kuwa Coin. And they became more and more frantic. Soon, people began to compete for Kuwa Coin. The powerful wanted more power, and the powerless were left helpless, robbed of everything.':
        'Kuwa Coin には不思議な力があった。手にした者には次々と幸運が訪れ、望むものを手にした。人々は Kuwa Coin を求めた。Kuwa Coin により富を得た者は、さらなる Kuwa Coinを求めた。そして次第に狂喜乱舞した。やがて人々は Kuwa Coin を奪い合うようになった。力あるものはさらなる力を求め、そして力なき者はなす術もなく、全てを奪われた。',
      'The Redemption of Kuwa': 'Kuwa の贖罪',
      "Master Kuwa despaired. The people who had treated Master Kuwa with love that day were nowhere to be seen. They are taking away from each other as they desire. Master Kuwa repented and began to make amends. Master Kuwa received Kuwa Coins from people who were tired of fighting, and treated them with love. Master Kuwa's redemption is still going on today.":
        'Master Kuwa は絶望した。あの日、愛を持って Master Kuwa をもてなした人々の姿はもうどこにもない。欲望のままに全てを奪い合っている。Master Kuwa は悔いた。そして償いを始めた。Master Kuwa は争いに疲れ果てた人々から Kuwa Coin を受け取り、愛を持って接した。Master Kuwa の贖罪は今もなお続いている。',

      // Get
      'Your wallet address:': 'あなたのウォレット：',
      'Input your wallet address': 'アドレスを入力',
      'Give me KWC': 'KWC を入手',
      "You've got Kuwa Coin": 'KuwaCoin を獲得しました',

      // Send
      "You haven't sent KWC to Master Kuwa yet.":
        'まだ Master Kuwa に KuwaCoin を送っていません。',
      "You've sent some KWC to Master Kuwa.":
        'あなたは Master Kuwa に KWC を送りました。',
      'Show Cirtificate': '証書を表示する',
      Send: '送る',

      // Error
      'Something went wrong': '不明なエラー',
    },
  },
} as const

i18next.use(LanguageDetector).init({
  resources,
  interpolation: {
    escapeValue: false, // not needed for svelte as it escapes by default
  },
})

export const i18n = createI18nStore(i18next)
export const t = derived(i18n, ($i18n) => $i18n.t)

export const languages = [
  { key: 'en', label: 'English' },
  { key: 'ja', label: '日本語' },
]
