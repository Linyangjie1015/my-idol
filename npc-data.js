// ==================== CARD IMAGE MAPPING ====================
var CARD_IMG_BASE = 'imgs/cards/';
var CARD_IMG_MAP = {
    '夏恩': 'card_haeoreum_leader.jpg',
    '俊昊': 'card_haeoreum_lead_vocal.jpg',
    '智媛': 'card_haeoreum_maknae.jpg',
    '素雅': 'card_haeoreum_main_vocal.jpg',
    '瑞贤': 'card_haeoreum_main_rapper.jpg'
};

var _getCardImgUrl = function(charName) {
    if (CARD_IMG_MAP[charName]) return CARD_IMG_BASE + CARD_IMG_MAP[charName];
    var names = Object.keys(CARD_IMG_MAP);
    for (var i = 0; i < names.length; i++) {
        if (charName.indexOf(names[i]) >= 0 || names[i].indexOf(charName) >= 0) {
            return CARD_IMG_BASE + CARD_IMG_MAP[names[i]];
        }
    }
    return CARD_IMG_BASE + 'card_default.jpg';
};

// ==================== GAME DATA ====================
var COMPANIES = {
    "SEONGWOO ENT": {
        name: "SEONGWOO ENT 星隅娱乐",
        desc: "韩娱圈新晋势力，以温暖治愈与舞台实力并重著称。旗下唯一团体Haeoreum，正在书写属于自己的传奇。",
        tags: ["温暖治愈", "舞台实力", "星隅之光"],
        groups: {
            "Haeoreum": {
                name: "Haeoreum（해오름）曙光纯白治愈团",
                desc: "曙光纯白治愈团，以温暖治愈风格与真挚情感著称。五个人，一个家。",
                tier: "S",
                members: [
                    { name: "夏恩(Ha Eun)", personality: ["认真", "温柔", "上进"], position: "Leader",
                      bio: "夏恩扛下了团初期最艰难的日子。性格看似刚强，私下其实是会为了一碗妈妈寄来的辣酱汤哭鼻子的人。作为队长，她永远站在最前面替成员挡风。",
                      quote: "我带大家走的方向，是对的方向。",
                      hidden: "深夜会一个人看练习视频到凌晨" },
                    { name: "俊昊(Junho)", personality: ["开朗", "热情", "幽默"], position: "Lead Vocal",
                      bio: "俊昊的音色是团最温暖的底色。他看起来总是笑嘻嘻的，但练歌时对自己最狠——一首歌唱到嗓子哑了才肯停下，然后在空练习室小声哼儿歌放松。",
                      quote: "你闭上眼睛听的时候，是我最幸福的时刻。",
                      hidden: "录完歌会在空练习室小声唱儿歌" },
                    { name: "智媛(Jiwon)", personality: ["活泼", "好奇", "热情"], position: "Maknae",
                      bio: "智媛是队内的团宠，谁都不准凶忙内是她的护身符。但其实她比谁都更想快点长大，证明自己不只是可爱。给每个成员都记了小本本，记得所有人的生日和喜好。",
                      quote: "我想快点长大，替哥哥姐姐们扛一点。",
                      hidden: "给每个成员都记了小本本（生日/喜好）" },
                    { name: "素雅(Sua)", personality: ["冷静", "温柔", "认真"], position: "Main Vocal",
                      bio: "素雅的声线温柔但有韧劲，高音不是用来炫技的，是用来在情绪最满的时候替观众喊出来的。她是最安静的人，但她的声音你闭上眼睛能认出来。",
                      quote: "我想做那种闭上眼睛也认得出的声音。",
                      hidden: "会偷偷研究其他主唱的换气技巧" },
                    { name: "瑞贤(Seohyun)", personality: ["沉默", "酷", "认真"], position: "Main Rapper",
                      bio: "瑞贤话少到让人以为他在生气，其实他只是不知道怎么开口。递水、让座、默默帮你收东西——他的关心从来不用说的。写rap时关灯戴耳机，反复听beat到自己开始笑才算到位。",
                      quote: "我写的不是rap，是日记。",
                      hidden: "随身带个小本子记灵感" }
                ]
            }
        }
    }
};

// ==================== HIDDEN DIALOGUES ====================
var HIDDEN_DIALOGUES = {};
var _buildHiddenDialogues = function() {
    HIDDEN_DIALOGUES = {};
    var npcNames = ['夏恩', '俊昊', '智媛', '素雅', '瑞贤'];
    for (var i = 0; i < npcNames.length; i++) {
        var n = npcNames[i];
        HIDDEN_DIALOGUES[n] = [
            { req: 20, text: '最近感觉你好像变了一个人似的，是好事。' },
            { req: 40, text: '有你在的时候，练习室好像都不那么冷了。' },
            { req: 60, text: '我好像……有点习惯你在身边了。' },
            { req: 80, text: '如果有一天你要走，我会很难过的。' },
            { req: 100, text: '谢谢你来到我身边。真的。' }
        ];
    }
};
_buildHiddenDialogues();

// ==================== NPC PERSONALITY DATA ====================
// Used by AI chat system to generate character-appropriate responses
var NPC_PROFILES = {
    '夏恩': {
        personality: '认真、温柔、上进',
        position: 'Leader',
        speakingStyle: '温柔但坚定，像姐姐一样照顾人，偶尔会露出脆弱的一面',
        likes: '看练习视频、喝辣酱汤、照顾成员',
        background: '扛下团初期最艰难日子的队长，外表刚强内心柔软'
    },
    '俊昊': {
        personality: '开朗、热情、幽默',
        position: 'Lead Vocal',
        speakingStyle: '爱开玩笑、喜欢逗人笑，但聊到认真的话题会突然变得很真诚',
        likes: '唱歌、逗成员笑、深夜录歌',
        background: '表面笑嘻嘻，对自己最狠的练歌狂人'
    },
    '智媛': {
        personality: '活泼、好奇、热情',
        position: 'Maknae',
        speakingStyle: '说话快、用很多感叹号、喜欢问问题、偶尔撒娇',
        likes: '记成员小本本、追番、吃零食',
        background: '团宠忙内，想快点长大证明自己不只是可爱'
    },
    '素雅': {
        personality: '冷静、温柔、认真',
        position: 'Main Vocal',
        speakingStyle: '话不多但每句都很走心，会突然说出让人感动的话',
        likes: '研究唱功、安静的地方、下雨天',
        background: '最安静的人，但声音最让人认得出'
    },
    '瑞贤': {
        personality: '沉默、酷、认真',
        position: 'Main Rapper',
        speakingStyle: '话很少、短句为主、偶尔冒出一句让人心跳的话',
        likes: '写rap、关灯听beat、记灵感小本子',
        background: '把关心藏在行动里的人，不用说的那种温柔'
    }
};

// ==================== AFFINITY LEVEL DEFINITIONS ====================
var AFFINITY_LEVELS = [
    { min: 0, max: 19, label: '陌生', style: '礼貌客气，像刚认识的人' },
    { min: 20, max: 39, label: '熟悉', style: '偶尔开玩笑，开始放下防备' },
    { min: 40, max: 59, label: '朋友', style: '自然随意，会分享日常' },
    { min: 60, max: 79, label: '亲密', style: '语气暧昧，会主动关心你的情绪' },
    { min: 80, max: 100, label: '专属', style: '只对你说的温柔，偶尔害羞，会吃醋' }
];

var getAffinityLevel = function(affinity) {
    for (var i = AFFINITY_LEVELS.length - 1; i >= 0; i--) {
        if (affinity >= AFFINITY_LEVELS[i].min) return AFFINITY_LEVELS[i];
    }
    return AFFINITY_LEVELS[0];
};

if (typeof window !== 'undefined') {
    window.COMPANIES = COMPANIES;
    window.CARD_IMG_MAP = CARD_IMG_MAP;
    window.CARD_IMG_BASE = CARD_IMG_BASE;
    window._getCardImgUrl = _getCardImgUrl;
    window.HIDDEN_DIALOGUES = HIDDEN_DIALOGUES;
    window.NPC_PROFILES = NPC_PROFILES;
    window.AFFINITY_LEVELS = AFFINITY_LEVELS;
    window.getAffinityLevel = getAffinityLevel;
    window.__npcDataLoaded = true;
    if (typeof COMPANIES !== 'undefined' && Object.keys(COMPANIES).length > 0) {
        if (typeof __diag === 'function') __diag('npc-data.js: COMPANIES loaded (' + Object.keys(COMPANIES).length + ' companies)');
    }
}
