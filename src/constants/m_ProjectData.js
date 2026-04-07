export const m_ProjectData = [
    {
        id: 1,
        title: "Axis:Save",
        description: "<strong>■ 設計選定とトレードオフ</strong>\n本作では状態制御の設計において、以下の3案を比較検討しました。\n\n▸ 案1：単一クラスでの状態管理\n▸ 案2：コルーチン主体による進行制御\n▸ 案3：状態遷移を明示的に管理し、外部から制御可能な構造＋責務分離（採用）\n\n<strong>案1を不採用とした理由：</strong>\n実装初期コストは最も低いが、状態数が増加するとif/switchの分岐が肥大化し、ある状態の修正が別状態に波及する「状態競合」が発生しやすい。本作はダメージ・死亡・攻撃・演出ロック等の状態が10以上あり、単一クラスでは影響範囲の特定とデバッグコストが現実的でないと判断しました。\n\n<strong>案2を不採用とした理由：</strong>\nコルーチンは直列的な進行制御には有効だが、Unityのコルーチンはyield return後の再開タイミングがUpdate依存であり、FixedUpdate（物理更新）との実行順が保証されない。本作では演出中に衝突判定の無効化・復帰を物理フレーム単位で制御する必要があり、コルーチンでは演出と物理制御の競合が発生するリスクがあるため不採用としました。\n\n<strong>案3を採用した理由：</strong>\nPlayerControllerは入力・物理処理およびプレイヤー固有の状態管理を担当し、演出処理はCinematicManagerへ分離。演出中は m_IsEventLocked により外部から状態を制御し、ロジックと演出の干渉を構造的に防止できる。また、死亡・被ダメージ・イベントロックを最優先とする遷移順序を明確化し、「どの状態からでも割り込める状態」と「割り込めない状態」を設計段階で定義できる点を重視しました。\n\n本作は状態数が多く（10以上）、かつ物理更新と演出制御の同期が要求されるため、「状態遷移の明示的管理」と「物理フレーム単位での制御」が両立できる構造が必要でした。その条件を満たす設計として本構成を採用しています。\n\n<strong>■ 物理干渉問題への対応と技術選定理由</strong>\n基本の物理制御にCharacterControllerを採用したうえで、演出中に移動・衝突が破綻する問題への追加対策として以下の4案を比較検討しました。\n\n▸ <strong>Rigidbody.constraints</strong>\n　メリット：Unityの標準機能で追加依存なし\n　デメリット：軸単位の制限のみでレイヤー単位の柔軟な制御ができない\n　→ 演出中に「特定レイヤーのみ衝突無効化」が必要なため不採用\n\n▸ <strong>Rigidbody.isKinematic切替</strong>\n　メリット：物理演算を完全に停止できる\n　デメリット：復帰時にvelocity/angularVelocityがリセットされ、物理状態の復元が不安定\n　→ 演出終了後の挙動が予測困難なため不採用\n\n▸ <strong>FixedUpdate内の早期return（採用）</strong>\n　メリット：物理更新サイクル自体を停止するため確実\n　デメリット：FixedUpdate内の全処理が停止するため、停止中に実行したい物理処理があれば別途設計が必要\n　→ 本作では演出中の物理処理は不要であり、最もシンプルかつ確実な手法として採用。ただし、将来的に演出中にも一部物理処理（例：落下補正など）が必要になった場合、本手法では対応が困難になるため、その際は処理単位での分離設計が必要になると認識しています\n\n▸ <strong>Physics.IgnoreLayerCollision（採用）</strong>\n　メリット：即時反映、影響範囲がレイヤー単位で明確\n　デメリット：レイヤー設計への依存度が高まり、レイヤー追加時に衝突マトリクスの再確認が必要\n　→ 本作のレイヤー数は限定的であり、明確性と即時性を優先して採用\n\n<strong>■ UniTask採用理由</strong>\n状態復帰の非同期制御にUniTaskを採用。以下がその判断根拠です。\n\n▸ 標準コルーチン：yield returnの再開がUpdate依存であり、FixedUpdateとの実行順が保証されない。物理フレーム単位での状態復帰タイミングを制御できないため不採用\n▸ UniTask：PlayerLoopへの統合によりFixedUpdate/LateUpdate等の任意タイミングで待機可能。フレーム単位の物理制御との整合性が取れる\n\nデメリットとして外部ライブラリへの依存増加と学習コストがあるが、物理制御の安全性と演出終了保証の確実性を優先しました。\n\n<strong>■ カメラ演出設計</strong>\n▸ Lens.FieldOfViewを直接制御し、\n▸ elapsed / animationLength による補間係数算出を行い、\n▸ Mathf.Lerpにより線形補間によるFOV遷移を設計。\n\nCinemachineBlendを動的にCutへ変更することで、演出意図に応じたカメラ遷移制御を実装しました。\n\n<strong>■ チーム開発を想定した分割設計</strong>\n本構造は以下の単位で責務を分割し、担当者間の実装競合を防止する設計としています。\n\n▸ PlayerController：入力・物理処理担当\n▸ 状態フラグ群および制御API：状態遷移および優先度制御担当\n▸ CinematicManager：演出・カメラ制御担当\n\n状態遷移はAPI経由で制御しているため、各担当がPlayerControllerの内部実装を知らなくても状態変更が可能です。また、演出側は状態イベントのみを購読する設計としており、ロジック側の修正が演出側に波及しない構造を意図しています。\n\nこの分割により、例えば「新規状態の追加」は主に状態制御ロジック側で完結し、「演出タイミングの調整」はCinematicManagerのみで完結するため、他担当のコードとの競合を抑制できます。\n\n<strong>■ 設計成果</strong>\n本設計では特に「状態競合の排除」と「物理挙動の破綻防止」を最優先とし、そのために一部の実装コストや柔軟性の低下を許容しています。\n\n本構造により、状態競合に起因する不具合の発生箇所を限定でき、修正時の影響範囲を局所化することが可能となりました。\n本構造の導入以降、状態競合に起因する致命的な不具合は確認されておらず、問題発生時も影響範囲を局所化できました。\n同様の要件（状態数増加・非同期処理・物理制御の競合）が発生するプロジェクトにおいても、本設計をベースとして適用可能であると考えています。\n\n<strong>制作期間</strong> : 3ヶ月 &emsp; <strong>チーム人数</strong> : 個人制作 &emsp; <strong>プラットフォーム</strong> : PC / Windows",
        descriptionEn: "<strong>■ Design Selection and Tradeoffs</strong>\nFor state control in this project, I compared and evaluated the following three approaches:\n\n▸ Option 1: Single-class state management\n▸ Option 2: Coroutine-driven progression control\n▸ Option 3: Explicitly managed state transitions with externally controllable structure + separation of responsibilities (adopted)\n\n<strong>Why Option 1 was rejected:</strong>\nLowest initial implementation cost, but as states grow, if/switch branching bloats, and modifying one state easily causes \"state conflicts\" that ripple into others. With 10+ states (damage, death, attack, cinematic lock, etc.), pinpointing impact scope and debugging cost became impractical.\n\n<strong>Why Option 2 was rejected:</strong>\nCoroutines are effective for sequential flow control, but Unity coroutines resume after yield return at Update timing—execution order with FixedUpdate (physics) is not guaranteed. This project requires per-physics-frame control of collision enable/disable during cinematics, and coroutines risk conflicts between presentation and physics control.\n\n<strong>Why Option 3 was adopted:</strong>\nPlayerController handles input, physics processing, and player-specific state management; cinematic processing is separated into CinematicManager. During cinematics, state is controlled externally via m_IsEventLocked, structurally preventing logic-presentation interference. Additionally, transition priority is explicitly defined (death > damage > event lock), distinguishing \"always-interruptible states\" from \"non-interruptible states\" at the design level.\n\nThis project has a high state count (10+) and requires synchronization between physics updates and cinematic control. Therefore, a structure capable of both \"explicit state transition management\" and \"per-physics-frame control\" was necessary. This architecture was adopted as the design that satisfies those conditions.\n\n<strong>■ Physics Interference Resolution and Technical Selection Rationale</strong>\nHaving adopted CharacterController for basic physics control, movement and collisions still broke during cinematics. The following four approaches were evaluated as countermeasures:\n\n▸ <strong>Rigidbody.constraints</strong>\n　Pro: Built-in Unity feature, no additional dependencies\n　Con: Only axis-level restriction; no per-layer flexible control\n　→ Rejected: \"disable collision for specific layers only\" was required during cinematics\n\n▸ <strong>Rigidbody.isKinematic toggle</strong>\n　Pro: Completely stops physics simulation\n　Con: velocity/angularVelocity reset on recovery; physics state restoration is unstable\n　→ Rejected: Post-cinematic behavior becomes unpredictable\n\n▸ <strong>Early return in FixedUpdate (adopted)</strong>\n　Pro: Halts the physics update cycle itself—most reliable\n　Con: All processing in FixedUpdate stops; requires separate design if any physics must run during suspension\n　→ Adopted: No physics processing needed during cinematics; simplest and most reliable method. However, if partial physics processing (e.g., fall correction) becomes necessary during cinematics in the future, this approach would be insufficient, and a per-process separation design would be required\n\n▸ <strong>Physics.IgnoreLayerCollision (adopted)</strong>\n　Pro: Immediate effect; impact scope is explicit at the layer level\n　Con: Increases dependency on layer design; collision matrix must be re-verified when adding layers\n　→ Adopted: Layer count is limited in this project; clarity and immediacy were prioritized\n\n<strong>■ UniTask Adoption Rationale</strong>\nUniTask was adopted for asynchronous state recovery control. The decision rationale:\n\n▸ Standard coroutines: Resume timing is Update-dependent; execution order with FixedUpdate is not guaranteed. Cannot control state recovery timing at the physics-frame level → rejected\n▸ UniTask: Integrates into PlayerLoop, enabling waits at arbitrary timing (FixedUpdate, LateUpdate, etc.). Maintains consistency with per-frame physics control\n\nThe tradeoff is increased external library dependency and learning cost, but safety of physics control and reliability of cinematic completion guarantee were prioritized.\n\n<strong>■ Camera Presentation Design</strong>\n▸ Direct control of Lens.FieldOfView\n▸ Interpolation coefficient via elapsed / animationLength\n▸ Linear FOV transition designed with Mathf.Lerp\n\nBy dynamically switching CinemachineBlend to Cut, camera transition control matching the cinematic intent was implemented.\n\n<strong>■ Team Development Split Design</strong>\nThis architecture divides responsibilities into the following units, designed to prevent implementation conflicts between team members:\n\n▸ PlayerController: Input and physics processing\n▸ State flags and control APIs: State transitions and priority control\n▸ CinematicManager: Cinematics and camera control\n\nState transitions are controlled via API, so each member can modify states without knowing PlayerController's internal implementation. The cinematic side subscribes only to state events, ensuring that logic-side modifications do not ripple into the presentation layer.\n\nWith this division, for example, \"adding an attack motion\" is completed within the State management layer only, and \"adjusting cinematic timing\" is completed within CinematicManager only—suppressing conflicts with other members' code.\n\n<strong>■ Design Outcome</strong>\nIn this design, \"elimination of state conflicts\" and \"prevention of physics behavior breakdown\" were given top priority, accepting increased implementation cost and reduced flexibility as tradeoffs.\n\nThis architecture enabled localization of bugs caused by state conflicts and scoping of modification impact, making it possible to identify and fix issues without side effects on unrelated systems.\nSince adopting this architecture, no critical bugs caused by state conflicts have been observed, and when issues did arise, their impact scope was successfully localized.\nI believe this design can serve as a base for any project that encounters similar requirements: increasing state count, asynchronous processing, and physics control conflicts.\n\n<strong>Duration</strong> : 3 months &emsp; <strong>Team</strong> : Solo &emsp; <strong>Platform</strong> : PC / Windows",
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
        description: "<strong>■ 本作における設計方針の適用</strong>\n本作でも、状態競合の防止と責務分離を設計方針として適用し、「状態遷移の明示化」と「終了保証設計」を中心に設計しました。\n\n<strong>■ 改善前の問題</strong>\n初期実装ではプレゼン進行をフラグ依存で管理しており、音声再生とフェード処理の完了タイミングが保証されず、進行破綻やUI表示の不整合が発生していました。\n\n<strong>■ 改善後の設計</strong>\n音声再生終了をトリガーとするイベントベースの非同期シーケンス管理へ再構築。UniTask.WaitWhile() により音声終了を明示的に待機し、進行状態の完了を保証する設計としました。\n\nまた、音響制御・UI制御・進行管理をクラス単位で責務分離し、素材追加時の影響範囲を限定する構造としました。\n\n<strong>■ 空間認識制御</strong>\nVector3.Dot により視線方向と対象方向の一致度を算出。\n一致度に応じて AudioSource の音量を補間制御することで、ユーザー操作を伴わない自然な視線誘導を実装。\n\n<strong>■ VRUX設計</strong>\nQuaternion.LookRotation によるビルボードUI制御、\nTime.time ベースのフェード補間により、VR空間での没入感と視認性を両立。\n\n本作での非同期シーケンス制御と終了保証の経験が、Axis:Saveにおける物理フレーム単位でのUniTask制御設計の基盤となっています。\n\n<strong>制作期間</strong> : 3日 &emsp; <strong>チーム人数</strong> : 個人制作 &emsp; <strong>プラットフォーム</strong> : VR",
        descriptionEn: "<strong>■ Application of Design Philosophy</strong>\nConsistent with my design policy, I applied state conflict prevention and separation of responsibilities, focusing the design on \"explicit state transitions\" and \"guaranteed completion design.\"\n\n<strong>■ Pre-Improvement Issues</strong>\nThe initial implementation managed presentation progression via flag dependency, with no guarantees on audio playback and fade completion timing—causing progression breakdowns and UI display inconsistencies.\n\n<strong>■ Post-Improvement Design</strong>\nReconstructed into event-based asynchronous sequence management triggered by the end of audio playback. Using UniTask.WaitWhile() to explicitly await audio completion, the design guarantees progression state completion.\n\nFurthermore, audio control, UI control, and progression management are separated at the class level, creating a structure that limits the scope of impact when adding new assets.\n\n<strong>■ Spatial Recognition Control</strong>\nCalculates the degree of alignment between the gaze direction and target direction using Vector3.Dot.\nBy interpolating the AudioSource volume based on this alignment, natural gaze guidance without user operation is implemented.\n\n<strong>■ VR UX Design</strong>\nBillboard UI control using Quaternion.LookRotation and Time.time-based fade interpolation achieve a balance between immersion and visibility in VR space.\n\nThe asynchronous sequence control and guaranteed completion experience from this project became the foundation for the per-physics-frame UniTask control design in Axis:Save.\n\n<strong>Duration</strong> : 3 days &emsp; <strong>Team</strong> : Solo &emsp; <strong>Platform</strong> : VR",
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
        description: "<strong>■ 本作の位置付け</strong>\n本作は、責務分離による拡張性確保に初めて本格的に取り組んだ作品です。\nState Machineベースの戦闘AI設計を通じて、状態分離の有効性と限界の両方を経験しました。\n拡張性と実行効率の両立を目標に、State PatternによるボスAI制御を実装しました。\n\n<strong>■ 設計内容</strong>\n各攻撃（Move / Roll / Hari など）を個別ステートクラスとして分離し、状態遷移を明確化。\n\nTime.deltaTimeを用いたフレームレート非依存移動を実装し、\ntransform加算による安定した速度制御を行いました。\n\nまた、攻撃ロジックをクラス単位で分離し、巨大な単一クラス化を回避しました。\n\n<strong>■ 発生した課題と学び</strong>\nしかし以下の問題が発生しました：\n\n▸ パラメータがコード依存で調整性が低い\n▸ Instantiate依存によるGC発生リスク\n▸ Coroutine主体で進行管理が分散\n▸ transform直操作による物理拡張制限\n\nこの経験から、\n「状態を分けるだけでは不十分であり、終了保証・責務分離・データ駆動設計まで踏み込む必要がある」\nという制御設計に至りました。\n\n本作で発生した設計上の課題が、後のAxis:Saveにおける状態競合防止設計および終了保証設計へと直接繋がっています。\n\n<strong>制作期間</strong> : 3週間 &emsp; <strong>チーム人数</strong> : 2人 &emsp; <strong>プラットフォーム</strong> : PC / スマホ",
        descriptionEn: "<strong>■ Positioning of this Work</strong>\nThis project marks my first full-scale attempt at ensuring extensibility through separation of responsibilities.\nThrough State Machine-based combat AI design, I experienced both the effectiveness and limitations of state separation.\nAiming to balance extensibility and execution efficiency, I implemented boss AI control using the State Pattern.\n\n<strong>■ Design Details</strong>\nEach attack (Move / Roll / Hari, etc.) was separated into individual state classes, clarifying state transitions.\n\nImplemented framerate-independent movement using Time.deltaTime,\nachieving stable speed control through transform addition.\n\nFurthermore, by separating attack logic into individual classes, I avoided creating a massive single monolithic class.\n\n<strong>■ Issues Encountered and Learnings</strong>\nHowever, the following issues occurred:\n\n▸ Parameters were hard-coded, resulting in low adjustability\n▸ Risk of GC spikes due to Instantiate dependency\n▸ Progression management was fragmented due to heavy reliance on Coroutines\n▸ Physics extension limitations due to direct transform manipulation\n\nFrom this experience, I arrived at the design philosophy that:\n\"Merely separating states is insufficient; one must delve into guaranteed completion, separation of responsibilities, and data-driven design.\"\n\nThe design challenges encountered in this project directly led to the state conflict prevention and guaranteed completion design adopted in Axis:Save.\n\n<strong>Duration</strong> : 3 weeks &emsp; <strong>Team</strong> : 2 people &emsp; <strong>Platform</strong> : PC / Mobile",

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
        description: "開発人数：2名（双方途中参加）\n制作期間：36時間\n担当：ゲームシーン設計・実装全般（Unity / C#）\n\n【概要】\n短期間かつ途中参加という制約下で、ゲームシーンの設計整理から実装までを担当。既存構造を把握した上で、仕様の再定義とロジックの再構築を行い、最終的に動作する形まで完成させた。\n\n【アーキテクチャ設計】\nNPC生成・個体制御・ランダムイベント管理をクラス単位で責務分離。\n\n・ScreenEdgeSpawner：NPCスポーン管理および確率制御\n・PersonController：個体の移動・状態管理\n・RandomEventManager：天候などの外部イベント制御\n\n生成管理と個体挙動を分離することで、スポーン仕様変更やイベント追加に耐えられる構造を構築した。\n\n【NPC経路制御設計】\n3種類の経路パターン（通過型／密集地点向かい型／特定地点誘導型）を実装。\nスポーン時に確率ベースでルートを割り当て、個体側で挙動を分岐制御。\n役割ごとに状態を持たせることで処理の肥大化を防いだ。\n\n【外部イベントによる状態割り込み】\n雨イベント発生時に、既存状態を上書きする処理を実装。\n状態競合を防ぐ条件分岐を設け、二重実行を回避。アニメーション同期を維持したまま安全にステートを切り替える構造を設計した。\n\n【エディタ拡張による効率化】\nCharacterCreatorEditor（Unity Editor拡張）を実装。\nキャラクター生成およびアニメーション設定の自動化を行い、手作業工程を削減。短期開発における設定コストを抑制した。\n\n【設計判断：制約下での妥協と優先順位】\n開発期間から逆算し、拡張性を保つための抽象化レイヤー（インターフェース分離、データ駆動設計など）は意図的に省略した。\n体験の中核に直結しない要素は段階実装へ変更し、ロジックの安定性を最優先とした。\n\nこの「何を省略し、何を守るか」の判断を制約下で行えたことが、以降のチーム開発における設計判断基準の形成に繋がっている。\n\n36時間という制約下においても、責務分離とクラス単位での状態管理を適用することで、統合時の競合を最小限に抑えることができた。",
        descriptionEn: "Team Size: 2 (both joined mid-development)\nDevelopment Time: 36 hours\nRole: Game scene design & full implementation (Unity / C#)\n\n[Overview]\nUnder the constraints of a short 36-hour timeframe and joining mid-development, I took charge of organizing the game scene design through to implementation. After grasping the existing structure, I redefined specifications and reconstructed the logic, ultimately bringing it to a fully functional state.\n\n[Architecture Design]\nSeparated responsibilities for NPC generation, individual control, and random event management at the class level.\n\n- ScreenEdgeSpawner: NPC spawn management and probability control.\n- PersonController: Individual movement and state management.\n- RandomEventManager: Control of external events such as weather.\n\nSeparating generation from individual behavior created a structure resilient to spawn specification changes and event additions.\n\n[NPC Pathfinding Design]\nImplemented 3 types of route patterns (pass-through / heading to dense areas / guided to specific points).\nRoutes are assigned via probability at spawn, with units controlling their own behavioral branching.\nPrevented processing bloat by establishing states for each role.\n\n[State Interruption via External Events]\nImplemented logic to overwrite existing states when a rain event occurs.\nEstablished conditional branching to prevent state conflicts and avoid double execution. Designed a structure to safely switch states while maintaining animation synchronization.\n\n[Efficiency via Editor Extensions]\nImplemented CharacterCreatorEditor (Unity Editor extension).\nAutomated character generation and animation settings, reducing manual labor. Suppressed setup costs during short-term development.\n\n[Design Decisions: Compromise and Prioritization Under Constraints]\nWorking backward from the development period, abstraction layers for extensibility (interface separation, data-driven design, etc.) were intentionally omitted.\nElements not directly tied to the core experience were shifted to phased implementation, with logic stability given the highest priority.\n\nBeing able to make these decisions—\"what to omit and what to protect\"—under tight constraints directly contributed to forming the design judgment standards applied in subsequent team development.\n\nEven within the 36-hour constraint, applying separation of responsibilities and class-level state management minimized integration conflicts.",
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
        description: "ゲームジャム高梁 参加作品\nプログラムリーダー・キャラクター実装担当\n\nUnity環境における36時間の短期開発で、3名のプログラマーのタスク設計およびキャラクター制御基盤の設計・実装を担当しました。GitHubを用いたブランチ運用（main / Sogou 他）で並列開発を行いました。\n\nキャラクター制御には自作のState Patternベースのステートマシン（State.cs / StateMachine.cs / StatefulObjectBase.cs）を採用し、プレイヤーおよびNPCに共通のインターフェースを定義しました。内部実装は各担当者に委譲し、並列実装による初速最大化を狙いました。\n\nしかし、以下の設計共有を事前に定義しなかったことが問題となりました。\n・ステート遷移優先度\n・キャンセル可能フレームの定義\n・アニメーションイベントと攻撃判定生成タイミングの統一\n・移動処理とステート遷移の責務境界\n\nその結果、統合段階で以下のような不整合が発生しました。\n・アニメーション進行と当たり判定生成タイミングのズレ\n・特定モーション中のキャンセル処理と移動入力処理の競合\n・被弾遷移と攻撃遷移の優先度未定義による状態競合\n\nこれは実装力の問題ではなく、「ステート設計粒度と遷移条件の合意不足」に起因する統合設計ミスでした。\n\nこの経験から、短期開発においても以下を最低限実施する方針に変更しました。\n・実装前にステート遷移図を作成し、優先度まで明文化\n・アニメーションイベント発火仕様の統一\n・攻撃判定生成の責務を明確化（State側に集約）\n・2〜3時間単位での統合テスト\n・PRベースの差分レビュー徹底\n\n速度最大化ではなく、「統合容易性と完成確率の最大化」を設計基準としています。\n\n本作での統合失敗の経験が、状態競合の防止を設計段階で担保するという現在の設計方針を形成する直接の契機となりました。",
        descriptionEn: "Game Jam Takahashi Entry\nProgram Leader & Character Implementation\n\nDuring a 36-hour short-term development in Unity, I was responsible for task design for 3 programmers, as well as the design and implementation of the character control foundation. We utilized GitHub branch management (main / Sogou etc.) for parallel development.\n\nFor character control, I employed a custom State Machine based on the State Pattern (State.cs / StateMachine.cs / StatefulObjectBase.cs), defining common interfaces for players and NPCs. Internal implementation was delegated to each member, aiming to maximize initial velocity through parallel development.\n\nHowever, failing to define the following shared designs in advance caused critical issues:\n- State transition priority\n- Definition of cancelable frames\n- Unification of animation events and attack hitbox generation timing\n- Responsibility boundaries between movement processing and state transitions\n\nAs a result, inconsistencies emerged during the integration phase:\n- Misalignment between animation progression and hitbox generation timing\n- Conflicts between cancel processing during specific motions and movement input processing\n- State conflicts due to undefined priorities between hit transitions and attack transitions\n\nThis was not an implementation flaw, but an integration design failure stemming from a \"lack of consensus on state design granularity and transition conditions.\"\n\nFrom this experience, I shifted my policy to enforce the following minimum practices, even in short-term development:\n- Creating state transition diagrams before implementation, documenting up to priorities\n- Unifying animation event trigger specifications\n- Clarifying the responsibility for attack hitbox generation (consolidated within States)\n- Conducting integration tests every 2-3 hours\n- Enforcing PR-based differential reviews\n\nMy design standard is now \"maximizing ease of integration and probability of completion,\" rather than merely maximizing speed.\n\nThe integration failure experienced in this project became the direct catalyst for my current design policy of ensuring state conflict prevention at the design stage.",
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
