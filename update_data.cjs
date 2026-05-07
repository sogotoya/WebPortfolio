const fs = require('fs');
let content = fs.readFileSync('./src/constants/m_ProjectData.js', 'utf8');

// 1. Axis:Save
content = content.replace(
    /\\n\\n<strong>制作期間<\/strong> : 3ヶ月 &emsp; <strong>チーム人数<\/strong> : 個人制作 &emsp; <strong>プラットフォーム<\/strong> : PC \/ Windows/,
    ''
);
content = content.replace(
    /\\n\\n<strong>Duration<\/strong> : 3 months &emsp; <strong>Team<\/strong> : Solo &emsp; <strong>Platform<\/strong> : PC \/ Windows/,
    ''
);
content = content.replace(
    /(title: "Axis:Save",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { genre: "3Dアクションゲーム", platform: "PC / Windows", teamSize: "1人", duration: "3ヶ月" },'
);

// 2. PlanetariumVR
content = content.replace(
    /\\n\\n<strong>制作期間<\/strong> : 3日 &emsp; <strong>チーム人数<\/strong> : 個人制作 &emsp; <strong>プラットフォーム<\/strong> : VR/,
    ''
);
content = content.replace(
    /\\n\\n<strong>Duration<\/strong> : 3 days &emsp; <strong>Team<\/strong> : Solo &emsp; <strong>Platform<\/strong> : VR/,
    ''
);
content = content.replace(
    /(title: "PlanetariumVR",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { genre: "VR体験アプリ", platform: "VR", teamSize: "1人", duration: "3日" },'
);

// 3. GreenKun (Orimichikun)
content = content.replace(
    /\\n\\n<strong>制作期間<\/strong> : 3週間 &emsp; <strong>チーム人数<\/strong> : 2人 &emsp; <strong>プラットフォーム<\/strong> : PC \/ スマホ/,
    ''
);
content = content.replace(
    /\\n\\n<strong>Duration<\/strong> : 3 weeks &emsp; <strong>Team<\/strong> : 2 people &emsp; <strong>Platform<\/strong> : PC \/ Mobile/,
    ''
);
content = content.replace(
    /(title: "GreenKun",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { genre: "2Dアクションゲーム", platform: "PC / スマホ", teamSize: "2人", duration: "3週間" },'
);

// 4. DartsVR
content = content.replace(
    /(title: "DartsVR",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { genre: "VRダーツゲーム", platform: "VR", teamSize: "1人" },'
);

// 5. Tsumitobu
content = content.replace(
    /(title: "Tsumitobu",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { genre: "2D協力アクション", platform: "PC / Windows", teamSize: "2人" },'
);

// CW1. 玉藻城
content = content.replace(
    /(title: "玉藻城",\s*description:.*,)/,
    '$1\n        status: { genre: "VRワールド", platform: "VRChat", event: "案件作品" },'
);

// CW2. 瀬戸内お宝マウンテン
content = content.replace(
    /\\n\\n<strong>開発元<\/strong> : 専門学校穴吹デザインカレッジ ゲームクリエイター学科XR専攻/,
    ''
);
content = content.replace(
    /\\n\\n<strong>Developer<\/strong> : Anabuki Design College, Game Creator Department, XR Major/,
    ''
);
content = content.replace(
    /(title: "瀬戸内お宝マウンテン",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { genre: "謎解きゲーム", platform: "WebGL", event: "瀬戸内芸術祭", teamSize: "穴吹デザインカレッジ XR専攻" },'
);

// GJ1. グローバルゲームジャム2026
content = content.replace(
    /開発人数：2名（双方途中参加） \/ 制作期間：36時間\\n担当：ゲームシーン設計・実装全般\\n\\n/,
    '担当：ゲームシーン設計・実装全般\n\n'
);
content = content.replace(
    /Team Size: 2 \(both joined mid-development\) \/ Development Time: 36 hours\\nRole: Game scene design & full implementation\\n\\n/,
    'Role: Game scene design & full implementation\n\n'
);
content = content.replace(
    /(title: "グローバルゲームジャム2026",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { event: "グローバルゲームジャム2026", teamSize: "2人", duration: "36時間", role: "ゲームシーン設計・実装全般" },'
);

// GJ2. ゲームジャム高梁2025
content = content.replace(
    /ゲームジャム高梁 参加作品\\nプログラムリーダー・キャラクター実装担当 \/ 36時間 \/ 6名\\n\\n/,
    'プログラムリーダー・キャラクター実装担当\n\n'
);
content = content.replace(
    /Game Jam Takahashi Entry\\nProgram Leader & Character Implementation \/ 36 hours \/ 6 members\\n\\n/,
    'Program Leader & Character Implementation\n\n'
);
content = content.replace(
    /(title: "ゲームジャム高梁2025",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { event: "ゲームジャム高梁", teamSize: "6人", duration: "36時間", role: "プログラムリーダー・キャラクター実装" },'
);

// GJ3. ビットサミットゲームジャム2025
content = content.replace(
    /BitSummit GameJam 参加作品\\n/,
    ''
);
content = content.replace(
    /(title: "ビットサミットゲームジャム2025",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { event: "BitSummit GameJam", role: "スコア全般・リザルト画面全般" },'
);

// GJ4. 最強ゲームジャム2025
content = content.replace(
    /最強ゲームジャム 参加作品\\n/,
    ''
);
content = content.replace(
    /(title: "最強ゲームジャム2025",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { event: "最強ゲームジャム2025", role: "タイトル画面全般" },'
);

// GJ5. 商店街ゲームジャム2024
content = content.replace(
    /商店街ゲームジャム 参加作品\\n/,
    ''
);
content = content.replace(
    /(title: "商店街ゲームジャム2024",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { event: "商店街ゲームジャム2024", role: "左上のうんちバーの配置" },'
);

// GJ6. 最強ゲームジャム2026
content = content.replace(
    /最強ゲームジャム2026 参加作品。\\n開発人数：6名 \/ 制作期間：2日\\n/,
    ''
);
content = content.replace(
    /Saikyou Game Jam 2026 entry\.\\nTeam Size: 6 \/ Duration: 2 days\\n/,
    ''
);
content = content.replace(
    /(title: "最強ゲームジャム2026",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { event: "最強ゲームジャム2026", teamSize: "6人", duration: "2日" },'
);

// VRC1. Bar
content = content.replace(
    /(title: "Bar",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { genre: "VRChat ワールド", platform: "VRChat" },'
);

// VRC2. Bill
content = content.replace(
    /(title: "Bill",\s*description:.*,)\s*(descriptionEn:.*,)/,
    '$1\n        $2\n        status: { genre: "VRChat ワールド", platform: "VRChat" },'
);

fs.writeFileSync('./src/constants/m_ProjectData.js', content, 'utf8');
console.log('Update finished.');
