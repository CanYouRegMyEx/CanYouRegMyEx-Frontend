/**
 * Mock song data - will be replaced with API data later
 */
export const mockSongData = {
	title: "Mune ga Dokidoki",
	description: "Mune ga Dokidoki is a single by the music group 'THE HIGH-LOWS' released February 21, 1996. The titular song is the 1st opening of the anime and is also the opening theme for Episode One: The Great Detective Turned Small. The B-side of the single, 'Soba ni Iru Kara', is used as insert song in Episode 12.",
	albumCover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBCw-bas5eua5VBOGMkbSusAl1BmXBx7XWig&s",
	cast: [
		{
			name: "Conan Edogawa",
			character: "นักสืบจิ๋ว",
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxWiYgB5wjQBXKFz8vHYV3iKQzCXz4Yz2zLA&s"
		},
		{
			name: "Ran Mouri",
			character: "วัยรุ่นสาว",
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXgMz8g8jR4bGa7YQmX5KtTvWwGl6rU3Y2_Q&s"
		},
		{
			name: "Kogoro Mouri",
			character: "นักสืบเอกชน",
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8rF1KVgHqBLz3Nz7xQe8gTy5u6YbZzMqfPw&s"
		},
		{
			name: "Ai Haibara",
			character: "นักวิทยาศาสตร์",
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Xv3Yz8z7jK6Qa9G4F2c8Lb5YxNmTp1z9Wg&s"
		},
		{
			name: "Dr. Agasa",
			character: "นักประดิษฐ์",
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Lb3XzK5q8Fm7Ys6hR2e8Jp4YwMvZx1q9Lg&s"
		},
		{
			name: "Ayumi Yoshida",
			character: "เด็กนักสืบ",
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Mv8XzJ5r9Gk6Zt7wQ3f9Nr5YyOuAx2r8Mg&s"
		}
	],
	openingSpeech: {
		japanese: {
			title: "Japanese Version",
			content: `真実はいつもひとつ！
私の名前は江戸川コナン。
高校生の新一が薬を飲まされ、
体が縮んでしまった。
小さくたって頭脳は同じ。
迷宮なしの名探偵！`
		},
		english: {
			title: "English Version", 
			content: `There is only one truth!
My name is Conan Edogawa.
Originally a high school student named Shinichi,
I was forced to take a drug that shrunk my body.
Although my body got smaller, my mind remains the same.
I'm the great detective with no unsolved cases!`
		}
	},
	lyrics: `真実の扉を開けて
心の奥に隠された
秘密を探し続けよう
謎めいた世界の中で

時を超えて響く声が
導いてくれるから
信じる気持ちを胸に
歩いていこう`,
	lyricsRomanji: `Shinjitsu no tobira wo akete
Kokoro no oku ni kakusareta
Himitsu wo sagashi tsuzukeyou
Nazomeita sekai no naka de

Toki wo koete hibiku koe ga
Michibiite kureru kara
Shinjiru kimochi wo mune ni
Aruite ikou`,
	cdInfo: {
		artist: "THE HIGH-LOWS",
		album: "Mune ga Dokidoki",
		releaseDate: "February 21, 1996",
		duration: "4:32",
		genre: "J-Rock"
	},
	trackList: [
		{
			number: 1,
			titleJapanese: "胸がドキドキ",
			titleRomanji: "Mune ga Dokidoki",
			translation: "Heart Pounding",
			length: "4:32"
		},
		{
			number: 2,
			titleJapanese: "そばにいるから",
			titleRomanji: "Soba ni Iru Kara",
			translation: "Because I'm By Your Side",
			length: "5:18"
		},
		{
			number: 3,
			titleJapanese: "胸がドキドキ (カラオケ)",
			titleRomanji: "Mune ga Dokidoki (Karaoke)",
			translation: "Heart Pounding (Karaoke)",
			length: "4:32"
		}
	]
};
