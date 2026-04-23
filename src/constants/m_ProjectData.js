export const m_ProjectData = [
    {
        id: 1,
        title: "Axis:Save",
        description: "<strong>■ やったこと</strong>\n3Dアクションゲームにおいて、10以上の状態（攻撃・被ダメ・死亡・演出ロック等）を持つプレイヤーの状態管理と、演出中の物理挙動の破綻防止を設計しました。\n\n<strong>■ 設計の核心</strong>\n▸ PlayerController（入力・物理）と CinematicManager（演出）を責務分離\n▸ 状態遷移に優先度を設定し、「割り込める状態」と「割り込めない状態」を設計段階で定義\n▸ 演出中は FixedUpdate早期return ＋ Physics.IgnoreLayerCollision で物理干渉を停止\n▸ UniTaskでFixedUpdateタイミングの状態復帰を保証（コルーチンではUpdate依存で物理と同期不可）\n\n<strong>■ 成果</strong>\n▸ 状態競合に起因する致命的バグをゼロに抑制\n▸ 演出追加・状態追加が他担当のコードに波及しない構造を実現\n\n※ 詳細な構造は下図を参照してください。\n\n<strong>制作期間</strong> : 3ヶ月 &emsp; <strong>チーム人数</strong> : 個人制作 &emsp; <strong>プラットフォーム</strong> : PC / Windows",
        descriptionEn: "<strong>■ What I Did</strong>\nDesigned state management for a player with 10+ states (attack, damage, death, cinematic lock, etc.) in a 3D action game, and prevented physics behavior breakdown during cinematics.\n\n<strong>■ Core Design</strong>\n▸ Separated responsibilities: PlayerController (input/physics) and CinematicManager (cinematics)\n▸ Defined transition priorities at design level — distinguishing interruptible vs. non-interruptible states\n▸ During cinematics: early return in FixedUpdate + Physics.IgnoreLayerCollision to halt physics interference\n▸ UniTask guarantees state recovery at FixedUpdate timing (coroutines are Update-dependent, can't sync with physics)\n\n<strong>■ Results</strong>\n▸ Zero critical bugs caused by state conflicts\n▸ Adding cinematics or states never ripples into other team members' code\n\n※ See the diagram below for detailed architecture.\n\n<strong>Duration</strong> : 3 months &emsp; <strong>Team</strong> : Solo &emsp; <strong>Platform</strong> : PC / Windows",
        videoUrl: "/projects/AxisSave/Game4.mp4",
        imageUrls: [
            "/projects/AxisSave/AxisSave1.png",
            "/projects/AxisSave/AxisSave2.png",
            "/projects/AxisSave/AxisSave3.png",
            "/projects/AxisSave/AxisSave4.png",
            "/projects/AxisSave/AxisSaveTitle.png",
        ],
        githubUrl: "https://github.com/chogeru/3DCombat",
        downloadUrl: "https://drive.google.com/drive/folders/1mN7YWpIgN0pv2fasbTTO-C3A3vCtW4GQ?usp=drive_link",
        backgroundUrl: "/projects/AxisSave/AxisSaveBack.png",
        thumbnailIndex: 4,
        technologies: ["Unity", "C#"],
    },
    {
        id: 2,
        title: "PlanetariumVR",
        description: "<strong>■ やったこと</strong>\nVR空間でのプラネタリウム体験アプリ。音声・UI・進行が連動するプレゼンテーションシーケンスを設計しました。\n\n<strong>■ 設計の核心</strong>\n▸ フラグ依存の進行管理 → UniTask.WaitWhile() によるイベントベースの非同期シーケンスへ再構築\n▸ 音響制御・UI制御・進行管理をクラス単位で責務分離\n▸ Vector3.Dot で視線方向を算出し、音量補間による自然な視線誘導を実装\n\n<strong>■ 成果</strong>\n▸ 音声とフェードの完了タイミングを保証し、進行破綻をゼロに\n▸ 本作での非同期制御経験が Axis:Save の UniTask設計の基盤に\n\n※ 詳細な構造は下図を参照してください。\n\n<strong>制作期間</strong> : 3日 &emsp; <strong>チーム人数</strong> : 個人制作 &emsp; <strong>プラットフォーム</strong> : VR",
        descriptionEn: "<strong>■ What I Did</strong>\nA planetarium experience app in VR. Designed a presentation sequence where audio, UI, and progression are synchronized.\n\n<strong>■ Core Design</strong>\n▸ Rebuilt flag-dependent progression → event-based async sequence using UniTask.WaitWhile()\n▸ Separated audio control, UI control, and progression management at class level\n▸ Calculated gaze direction via Vector3.Dot; implemented natural gaze guidance through volume interpolation\n\n<strong>■ Results</strong>\n▸ Guaranteed audio and fade completion timing — zero progression breakdowns\n▸ Async control experience here became the foundation for UniTask design in Axis:Save\n\n※ See the diagram below for detailed architecture.\n\n<strong>Duration</strong> : 3 days &emsp; <strong>Team</strong> : Solo &emsp; <strong>Platform</strong> : VR",
        videoUrl: "",
        imageUrls: [
            "/projects/PlanetariumVR/PlanetariumVR1.png",
            "/projects/PlanetariumVR/Planetarium2.png",
        ],
        githubUrl: "https://github.com/sogotoya/Planetarium_VR",
        downloadUrl: "https://drive.google.com/drive/folders/1gKum3c_dI211KniKmo8cWO2rhy93Dcph?usp=sharing",
        backgroundUrl: "/projects/PlanetariumVR/PlanetariumVRBack.png",
        technologies: ["Unity", "C#", "VR"],
    },
    {
        id: 4,
        title: "GreenKun",
        description: "<strong>■ やったこと</strong>\nState PatternによるボスAI制御を実装。責務分離による拡張性確保に初めて本格的に取り組んだ作品です。\n\n<strong>■ 設計の核心</strong>\n▸ 各攻撃（Move / Roll / Hari 等）を個別ステートクラスとして分離\n▸ Time.deltaTimeによるフレームレート非依存移動\n▸ 攻撃ロジックをクラス単位で分離し、巨大な単一クラス化を回避\n\n<strong>■ 課題と学び</strong>\n▸ パラメータのコード依存 / Instantiate依存のGCリスク / Coroutine主体の進行分散\n▸ →「状態を分けるだけでは不十分。終了保証・データ駆動設計まで踏み込む必要がある」と学んだ\n▸ この経験が Axis:Save の状態競合防止設計に直結\n\n※ 詳細な構造は下図を参照してください。\n\n<strong>制作期間</strong> : 3週間 &emsp; <strong>チーム人数</strong> : 2人 &emsp; <strong>プラットフォーム</strong> : PC / スマホ",
        descriptionEn: "<strong>■ What I Did</strong>\nImplemented boss AI control using the State Pattern. My first serious attempt at ensuring extensibility through separation of responsibilities.\n\n<strong>■ Core Design</strong>\n▸ Each attack (Move / Roll / Hari, etc.) separated into individual state classes\n▸ Framerate-independent movement via Time.deltaTime\n▸ Attack logic separated at class level — avoided monolithic single class\n\n<strong>■ Challenges & Learnings</strong>\n▸ Hard-coded parameters / GC risks from Instantiate / fragmented progression via Coroutines\n▸ → Learned: 'Merely separating states is insufficient — must address guaranteed completion and data-driven design'\n▸ These challenges directly led to state conflict prevention design in Axis:Save\n\n※ See the diagram below for detailed architecture.\n\n<strong>Duration</strong> : 3 weeks &emsp; <strong>Team</strong> : 2 people &emsp; <strong>Platform</strong> : PC / Mobile",

        imageUrls: [
            "/projects/Orimichikun/Orimichikun2.png",
            "/projects/Orimichikun/Orimichikun3.png",
            "/projects/Orimichikun/Orimichikun4.png",
            "/projects/Orimichikun/Orimichikun5.png",
            "/projects/Orimichikun/Orimichikun1.png",
            "/projects/Orimichikun/OrimichikunTitle.png",
            { url: "/projects/Orimichikun/IMG_1165.jpg", fit: "contain" },
        ],
        githubUrl: "https://github.com/sogotoya/Orimichikun",
        downloadUrl: "https://drive.google.com/drive/folders/1xEAsCMCRCop58vf_M3RzBoVBekWlsWDD?usp=sharing",
        videoUrl: "/projects/Orimichikun/OrimichikunMovie.mp4",
        backgroundUrl: "/projects/Orimichikun/OrimichikunBack.png",
        thumbnailIndex: 5,
        technologies: ["Unity", "C#"],
    },
    {
        id: 3,
        title: "DartsVR",
        description: "VRダーツゲーム制作中",
        descriptionEn: "A VR darts game (in production)",
        videoUrl: "",
        imageUrls: [
            "/projects/DartsVR/DartsVR1.png",
            "/projects/DartsVR/DartsVR2.png",
        ],
        githubUrl: "",
        downloadUrl: "",
        backgroundUrl: "/projects/DartsVR/DartsVRBack.png",
        technologies: ["Unity", "C#", "VR"],
    },
    {
        id: 5,
        title: "Tsumitobu",
        description: "<strong>■ ゲーム概要</strong>\nプレイヤー操作担当とブロック操作担当の 2人で協力してゴールを目指す2Dアクションゲーム。\nブロックを回転・配置して足場を作りながらステージを進んでいく協力型ゲームとして制作しました。\n\n<strong>■ 実装した要素（地形による移動挙動の変化）</strong>\nプレイヤーの移動処理では摩擦係数（friction）を用いて速度を制御し、ステージごとに値を変更することで地形による移動感の違いを表現しました。\n\n▸ 通常ステージ: friction = 0.7\n▸ 氷ステージ: friction = 0.9（滑りやすくなる）\n▸ 砂ステージ: friction = 0.63（減速しやすくなる）\n\nまた、移動速度が過剰に増加しないよう最大速度を設定してクランプ処理を行っています。\n\n<strong>■ 苦労した点（プレイヤーがブロックに挟まる問題の解決）</strong>\nプレイヤーとマップの衝突処理ではX軸とY軸を分離した判定を行っています。\nしかし、ジャンプ時や狭い隙間でプレイヤーがブロックに挟まり動けなくなる問題が発生しました。\n\nそこで、衝突処理後に再度Collision判定を行い、重なりが残っていた場合はプレイヤーを1マス分押し出す処理を追加することで、挟まりバグを解消しました。",
        descriptionEn: "<strong>■ Game Overview</strong>\nA 2D action game where two players cooperate to reach the goal—one controls the character, and the other controls blocks.\nDeveloped as a cooperative game where players progress by rotating and placing blocks to create footholds.\n\n<strong>■ Implemented Features (Movement based on Terrain)</strong>\nMovement speed is controlled using a friction coefficient, changing values per stage to express different movement feels:\n\n▸ Normal stage: friction = 0.7\n▸ Ice stage: friction = 0.9 (slippery)\n▸ Sand stage: friction = 0.63 (easy to decelerate)\n\nAdditionally, a maximum speed clamp is applied to prevent excessive acceleration.\n\n<strong>■ Challenges Overcome (Solving the Block Stuck Issue)</strong>\nCollision detection between the player and the map separates the X and Y axes.\nHowever, an issue occurred where the player would get stuck in blocks during jumps or in narrow gaps.\n\nTo resolve this, I added a process to \"perform another collision check after the initial collision handling, and if an overlap remains, push the player out by one tile space,\" effectively eliminating the stuck bug.",
        videoUrl: "",
        imageUrls: [
            "/projects/Tsumitobu/Tsumitobu1.png",
            "/projects/Tsumitobu/Tsumitobu2.png",
            "/projects/Tsumitobu/Tsumitobu3.png",
            "/projects/Tsumitobu/Tsumitobu4.png",
            "/projects/Tsumitobu/Tsumitobu5.png",
        ],
        githubUrl: "https://github.com/sogotoya/Tsumitobu",
        downloadUrl: "https://drive.google.com/drive/folders/14FBOnrtJv7AqB3z9kq5AkqRfSAf9bFvr?usp=drive_link",
        backgroundUrl: "/projects/Tsumitobu/TsumitobuBack.png",
        markdownUrl: "/projects/Tsumitobu/engine_analysis.md",
        thumbnailIndex: 0,
        technologies: [
            "OpenGL",
            "C++"
        ],
    },
];

// クライアントワークス（案件作品）
export const m_ClientWorksData = [
    {
        id: "cw-1",
        title: "玉藻城",
        description: "香川県高松市にある「玉藻城（高松城）」をテーマにした案件作品です。詳細は準備中です。",
        descriptionEn: "A client project based on 'Tamamo Castle' (Takamatsu Castle) in Kagawa Prefecture. Details coming soon.",
        videoUrl: "",
        imageUrls: ["https://placehold.jp/32/1a1a1a/cccccc/800x450.png?text=No%20Image"],
        githubUrl: "",
        downloadUrl: "",
        backgroundUrl: "",
        technologies: ["Unity"],
    },
    {
        id: "cw-2",
        title: "SetouchiTreasureQuest",
        description: "瀬戸内芸術祭用ゲーム。\n香川県さぬき市津田町周辺に設置されている絵を探し、そこに書かれている【パスワード】を見つけ出して該当する画像の入力フォームに打ち込むとクリア。全10問すべてクリアすると、津田の松原に設置されているパズルのピースが1つ追加されます。\n参加者全員で、パズルのピースを探し出し隠された3つの絵を完成させましょう!!\n\n<strong>開発元</strong> : 専門学校穴吹デザインカレッジ ゲームクリエイター学科XR専攻",
        descriptionEn: "A game created for the Setouchi Art Festival.\nSearch for paintings placed around Tsuda Town, Sanuki City, Kagawa Prefecture, find the [PASSWORD] written on them, and enter it into the input form of the corresponding image to clear. Clearing all 10 questions adds a puzzle piece to the puzzle installed at Tsuda no Matsubara.\nLet all participants search for puzzle pieces and complete the 3 hidden paintings!!\n\n<strong>Developer</strong> : Anabuki Design College, Game Creator Department, XR Major",
        videoUrl: "",
        imageUrls: [
            "/projects/Client/SetouchiTreasureQuest/SetouchiTreasureQuest1.png",
            "/projects/Client/SetouchiTreasureQuest/SetouchiTreasureQuest2.png",
            "/projects/Client/SetouchiTreasureQuest/SetouchiTreasureQuest0.png",
        ],
        githubUrl: "",
        downloadUrl: "",
        playUrl: "https://anabukigames.itch.io/setouchitreasurequest",
        backgroundUrl: "/projects/Client/SetouchiTreasureQuest/SetouchiTreasureQuestBack.png",
        technologies: ["Unity"],
    }
];

// ツール一覧
export const m_ToolData = [
    {
        id: "tool-1",
        title: "BatchProcessAutomation",
        description: "このツールは、プロジェクトの健康診断（エラーチェック）や各種の自動処理を、複数まとめて一気に実行できる便利な機能です。\nビルド前（ゲームを書き出す前）の最終チェックなどに活用できます。",
        descriptionEn: "Unity Editor Extension",
        imageUrls: [
            "/projects/Tools/BatchProcessAutomation/BatchProcessAutomation1.png",
            "/projects/Tools/BatchProcessAutomation/BatchProcessAutomation2.png",
            "/projects/Tools/BatchProcessAutomation/BatchProcessAutomation3.png",
        ],
        backgroundUrl: "/projects/Tools/BatchProcessAutomation/BatchProcessAutomation1.png",
        technologies: ["Unity", "C#"],
        githubUrl: "#",
        downloadUrl: "https://drive.google.com/drive/folders/1Bs2oXTUNJAlu1QVL9lsFN-VkI8JHCImW?usp=sharing",
    },
    {
        id: "tool-2",
        title: "AssetDependencyVisualizer",
        description: "プロジェクト内の「アセット同士のつながり」を可視化するEditor拡張ツールです。\nテクスチャ・プレハブ・マテリアルなどの使用状況を簡単に確認でき、\nどこからも参照されていない不要なアセットの特定に役立ちます。",
        descriptionEn: "Unity Editor Extension",
        imageUrls: [
            "/projects/Tools/AssetDependencyVisualizer/AssetDependencyVisualizer1.png",
            "/projects/Tools/AssetDependencyVisualizer/AssetDependencyVisualizer2.png",
            "/projects/Tools/AssetDependencyVisualizer/AssetDependencyVisualizer3.png",
        ],
        backgroundUrl: "/projects/Tools/AssetDependencyVisualizer/AssetDependencyVisualizer1.png",
        technologies: ["Unity", "C#"],
        githubUrl: "#",
        downloadUrl: "https://drive.google.com/drive/folders/1WGPgiF_Zeddhv4zD2E1y0kbZG9-2qNsW?usp=sharing",
    },
];

// ゲームジャム作品
export const m_GameJamData = [
    {
        id: "gj-1",
        title: "Global",
        description: "開発人数：2名（双方途中参加） / 制作期間：36時間\n担当：ゲームシーン設計・実装全般\n\n<strong>■ やったこと</strong>\n途中参加の制約下で、既存構造を把握→仕様再定義→ロジック再構築→完成まで担当。\n\n<strong>■ 設計の核心</strong>\n▸ NPC生成（ScreenEdgeSpawner）・個体制御（PersonController）・イベント管理（RandomEventManager）を責務分離\n▸ 3種の経路パターンを確率ベースで割り当て\n▸ 雨イベントによる状態割り込み時の競合防止処理\n▸ CharacterCreatorEditor（Editor拡張）で設定作業を自動化\n\n<strong>■ 学び</strong>\n▸ 36時間の制約下で「何を省略し、何を守るか」の判断を実践\n▸ 抽象化は省略しつつもロジックの安定性を最優先にした",
        descriptionEn: "Team Size: 2 (both joined mid-development) / Development Time: 36 hours\nRole: Game scene design & full implementation\n\n<strong>■ What I Did</strong>\nJoined mid-development: grasped existing structure → redefined specs → reconstructed logic → completed.\n\n<strong>■ Core Design</strong>\n▸ Separated NPC generation (ScreenEdgeSpawner), individual control (PersonController), and event management (RandomEventManager)\n▸ 3 route patterns assigned via probability at spawn\n▸ State conflict prevention during rain event interruptions\n▸ CharacterCreatorEditor (Editor extension) to automate setup\n\n<strong>■ Learnings</strong>\n▸ Practiced 'what to omit and what to protect' decisions under 36-hour constraint\n▸ Prioritized logic stability while intentionally omitting abstraction layers",
        imageUrls: [
            "/projects/GameJam/GlobalGameJam/GlobalGameJam1.png",
            "/projects/GameJam/GlobalGameJam/GlobalGameJam2.png",
            "/projects/GameJam/GlobalGameJam/GlobalGameJam3.png",
            "/projects/GameJam/GlobalGameJam/GlobalGameJam4.png",
        ],
        backgroundUrl: "/projects/GameJam/GlobalGameJam/GlobalGameJamBack.png",
        technologies: ["Unity", "C#"],
        githubUrl: "https://github.com/MKTkakumei/GGJ2026_01",
        downloadUrl: "https://drive.google.com/drive/folders/1zqc_DEku_vkQqIurhKQhbbz50RdoKSxb?usp=sharing",
        playUrl: "https://unityroom.com/games/no-mitsu",
    },
    {
        id: "gj-2",
        title: "Takahashi",
        description: "ゲームジャム高梁 参加作品\nプログラムリーダー・キャラクター実装担当 / 36時間 / 6名\n\n<strong>■ やったこと</strong>\n自作State Patternベースのステートマシンでキャラクター制御基盤を設計。GitHubブランチ運用で並列開発。\n\n<strong>■ 発生した問題</strong>\n▸ 遷移優先度・キャンセルフレーム・アニメーションイベントの事前合意不足\n▸ → 統合時にアニメと判定のズレ、状態競合が発生（統合設計ミス）\n\n<strong>■ この経験からの学び</strong>\n▸ 実装前にステート遷移図＋優先度を明文化する\n▸ 2〜3時間単位で統合テスト\n▸ 設計基準を「速度最大化」→「統合容易性と完成確率の最大化」へ転換\n▸ この失敗が、現在の状態競合防止設計方針の直接の契機",
        descriptionEn: "Game Jam Takahashi Entry\nProgram Leader & Character Implementation / 36 hours / 6 members\n\n<strong>■ What I Did</strong>\nDesigned character control foundation using custom State Pattern-based state machine. Parallel development via GitHub branches.\n\n<strong>■ Problem Encountered</strong>\n▸ Lack of prior agreement on transition priorities, cancelable frames, and animation events\n▸ → Animation-hitbox misalignment and state conflicts during integration (integration design failure)\n\n<strong>■ Learnings</strong>\n▸ Document state transition diagrams + priorities before implementation\n▸ Integration tests every 2-3 hours\n▸ Shifted design standard from 'maximizing speed' → 'maximizing ease of integration and completion probability'\n▸ This failure became the direct catalyst for my current state conflict prevention design policy",
        imageUrls: [
            "/projects/GameJam/GameJamTakahashi/GameJamTakahashi1.png",
            "/projects/GameJam/GameJamTakahashi/GameJamTakahashi2.png",
            "/projects/GameJam/GameJamTakahashi/GameJamTakahashi3.png",
            "/projects/GameJam/GameJamTakahashi/GameJamTakahashi4.png",
        ],
        backgroundUrl: "/projects/GameJam/GameJamTakahashi/GameJamTakahashiBack.png",
        technologies: ["Unity", "C#"],
        githubUrl: "https://github.com/Hamster-jpg/mistshooter",
        downloadUrl: "https://drive.google.com/drive/folders/18Ln0c9baNiyWdGVi3LZ3yTVFrFlPXg9k?usp=sharing",
        playUrl: "https://unityroom.com/games/mist_shooter",
    },
    {
        id: "gj-3",
        title: "BitSummit",
        description: "BitSummit GameJam 参加作品\nスコア全般・リザルト画面全般",
        descriptionEn: "Game Jam entry",
        imageUrls: [
            "/projects/GameJam/BitSummitGameJam/BitSummitGameJam1.png",
            "/projects/GameJam/BitSummitGameJam/BitSummitGameJam2.png",
            "/projects/GameJam/BitSummitGameJam/BitSummitGameJam3.png",
            "/projects/GameJam/BitSummitGameJam/BitSummitGameJam4.png",
        ],
        backgroundUrl: "/projects/GameJam/BitSummitGameJam/BitSummitGameJamBack.jpg",
        technologies: ["Unity", "C#"],
        githubUrl: "https://github.com/hy0by0/Bug_Cord",
        downloadUrl: "https://drive.google.com/drive/folders/1mp87IbYL_i7KyUzruZjmDjG0Ns4ulh1v?usp=sharing",
    },
    {
        id: "gj-4",
        title: "Saikyou",
        description: "最強ゲームジャム 参加作品\nタイトル画面全般",
        descriptionEn: "Game Jam entry",
        imageUrls: [
            "/projects/GameJam/SaikyouGameJam/SaikyouGameJam1.png",
            "/projects/GameJam/SaikyouGameJam/SaikyouGameJam2.png",
            "/projects/GameJam/SaikyouGameJam/SaikyouGameJam3.png",
            "/projects/GameJam/SaikyouGameJam/SaikyouGameJam4.png",
        ],
        backgroundUrl: "/projects/GameJam/SaikyouGameJam/SaikyouGameJamBack.png",
        technologies: ["Unity", "C#"],
        githubUrl: "https://github.com/kayinazlost/ExcellentTeam",
        downloadUrl: "https://drive.google.com/drive/folders/1oc61BSOcm2yNSzKaiYQrBK2_w6dQYO-7?usp=sharing",
        playUrl: "https://unityroom.com/games/saikyogamejam2025_eteam",
    },
    {
        id: "gj-5",
        title: "Shoutengai",
        description: "商店街ゲームジャム 参加作品\n左上のうんちバーの配置",
        descriptionEn: "Game Jam entry",
        imageUrls: [
            "/projects/GameJam/ShoutengaiGameJam/ShoutengaiGameJam1.png",
            "/projects/GameJam/ShoutengaiGameJam/ShoutengaiGameJam2.png",
            "/projects/GameJam/ShoutengaiGameJam/ShoutengaiGameJam3.png",
            "/projects/GameJam/ShoutengaiGameJam/ShoutengaiGameJam4.png",
        ],
        backgroundUrl: "/projects/GameJam/ShoutengaiGameJam/ShoutengaiGameJamBack.png",
        technologies: ["Unity", "C#"],
        githubUrl: "https://github.com/SanukiGameN108/ShotengaiGJ2024_TeamD",
        downloadUrl: "https://drive.google.com/drive/folders/1JMCisiSB07Oe4FoF3CWBAfveRvkJsGrf?usp=sharing",
    },
];

// VRChat ワールド作品 (おまけ)
export const m_VRChatWorldsData = [
    {
        id: "vrc-1",
        title: "Bar",
        description: "VRChat用ワールド「Bar」の詳細。\n美しいライティングと雰囲気を重視して制作しました。",
        descriptionEn: "Details of VRChat World 'Bar'.",
        imageUrls: [
            "/projects/VrC/Bar/BarBack.png", // 仮で背景画像を代用
        ],
        backgroundUrl: "/projects/VrC/Bar/BarBack.png",
        technologies: ["Unity", "VRChat"],
        downloadUrl: "https://vrchat.com/home/world/wrld_49194f3c-95d6-468f-86f5-ac7f697cf70f/info",
    },
    {
        id: "vrc-2",
        title: "Bill",
        description: "VRChat用ワールド「Bill」の詳細。\n落ち着いた空間を目指して制作しました。",
        descriptionEn: "Details of VRChat World 'Bill'.",
        imageUrls: [
            "/projects/VrC/Bill/BillBack.png",
        ],
        backgroundUrl: "/projects/VrC/Bill/BillBack.png",
        technologies: ["Unity", "VRChat"],
        downloadUrl: "https://vrchat.com/home/world/wrld_689ecf91-f27d-4128-855a-d0b10d237437/info",
    }
];
