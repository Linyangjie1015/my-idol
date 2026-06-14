

/* Safari Compatibility Polyfills */
if (!Object.entries) { Object.entries = function(obj) { var ownProps = Object.keys(obj), i = ownProps.length, resArray = new Array(i); for (; i--; ) resArray[i] = [ownProps[i], obj[ownProps[i]]]; return resArray; }; }
if (!Array.prototype.includes) { Array.prototype.includes = function(searchElement, fromIndex) { if (this == null) throw new TypeError('"this" is null or not defined'); var o = Object(this), len = o.length >>> 0; if (len === 0) return false; var n = fromIndex | 0, k = Math.max(n >= 0 ? n : len - Math.abs(n), 0); while (k < len) { if (o[k] === searchElement) return true; k++; } return false; }; }
if (!String.prototype.padStart) { String.prototype.padStart = function padStart(targetLength, padString) { targetLength = targetLength >> 0; padString = String(typeof padString !== 'undefined' ? padString : ' '); if (this.length >= targetLength) return String(this); var padLen = targetLength - this.length; while (padString.length < padLen) padString += padString; return padString.slice(0, padLen) + String(this); }; }

// Navigation helper - avoids quote nesting issues in inline handlers
function navTo(page) { goToPage(page); }
function setAndNav(stateExpr, page) { eval(stateExpr); goToPage(page); }

// ==================== GAME DATA ====================
var COMPANIES = {
    "SM Entertainment": {
        name: "SM Entertainment",
        desc: "韩国最大型经纪公司，以精致标准化著称。旗下艺人以出众的颜值、完美的舞台展现和强大的综合实力闻名。",
        tags: ["精致标准化", "颜值担当", "综合实力"],
        groups: {
            "Haeoreum": {
                name: "Haeoreum（해오름）曙光纯白治愈团",
                desc: "曙光纯白治愈团，以温暖治愈风格著称",
                tier: "S",
                members: [
                    { name: "金始源(Kim Siwon)", personality: ["认真", "自信", "上进"], position: "Leader" },
                    { name: "崔娜恩(Choi Naeun)", personality: ["温柔", "开朗", "热情"], position: "Main Vocal" },
                    { name: "朴智宇(Park Jiwoo)", personality: ["开朗", "幽默", "热情"], position: "Main Dancer" },
                    { name: "李贤珍(Lee Hyunjin)", personality: ["冷静", "认真", "上进"], position: "Lead Vocal" },
                    { name: "郑瑞夏(Jung Seoha)", personality: ["温柔", "冷静", "认真"], position: "Maknae" }
                ,
                    { name: "洪秀贤(Hong Soohyun)", personality: ["温柔", "认真"], position: "Sub Vocal" }]
            },
            "Nuriwave": {
                name: "Nuriwave（누리웨이브）未来赛博舞台团",
                desc: "未来赛博舞台团，先锋大胆的舞台创意",
                tier: "S",
                members: [
                    { name: "姜正勋(Kang Junghoon)", personality: ["自信", "上进", "热情"], position: "Leader" },
                    { name: "韩有珍(Han Yujin)", personality: ["冷静", "认真", "上进"], position: "Main Rapper" },
                    { name: "文采媛(Moon Chaewon)", personality: ["自信", "幽默", "热情"], position: "Main Dancer" },
                    { name: "裴成雅(Bae Seongah)", personality: ["开朗", "幽默", "自信"], position: "Main Vocal" },
                    { name: "安敏宇(Ahn Minwoo)", personality: ["温柔", "认真", "上进"], position: "Maknae" }
                ,
                    { name: "刘泰民(Yoo Taemin)", personality: ["自信", "上进"], position: "Main Dancer" }]
            },
            "Saeunlyric": {
                name: "Saeunlyric（새은리릭）清吟抒情主唱团",
                desc: "清吟抒情主唱团，以感性深情歌声著称",
                tier: "A",
                members: [
                    { name: "林宇珍(Im Woojin)", personality: ["温柔", "自信", "上进"], position: "Leader" },
                    { name: "刘敏宰(Yoo Minjae)", personality: ["冷静", "认真", "上进"], position: "Main Vocal" },
                    { name: "车希媛(Cha Heewon)", personality: ["开朗", "幽默", "自信"], position: "Main Dancer" },
                    { name: "申柔娜(Shin Yuna)", personality: ["温柔", "认真", "冷静"], position: "Lead Vocal" },
                    { name: "吴承泰(Oh Seungtae)", personality: ["温柔", "冷静", "认真"], position: "Maknae" }
                ,
                    { name: "韩艺琳(Han Yerin)", personality: ["开朗", "温柔"], position: "Lead Vocal" }]
            },
            "Gaeulvibe": {
                name: "Gaeulvibe（가을바이브）秋日复古清新团",
                desc: "秋日复古清新团，阳光友善路人好感极高",
                tier: "A",
                members: [
                    { name: "郑多彬(Jeong Dabin)", personality: ["开朗", "热情", "温柔"], position: "Leader" },
                    { name: "宋韩星(Song Hanbyul)", personality: ["冷静", "温柔", "认真"], position: "Main Vocal" },
                    { name: "南智浩(Nam Jiho)", personality: ["自信", "开朗", "上进"], position: "Main Rapper" },
                    { name: "高恩智(Go Eunji)", personality: ["温柔", "认真", "冷静"], position: "Main Dancer" },
                    { name: "黄茶媛(Hwang Chawon)", personality: ["冷静", "自信", "认真"], position: "Maknae" }
                ,
                    { name: "徐道允(Seo Doyun)", personality: ["幽默", "冷静"], position: "Sub Rapper" }]
            },
            "Star Apex": {
                name: "Star Apex（스타에이펙스）星巅全能王牌团",
                desc: "星巅全能王牌团，强力队长与顶尖实力",
                tier: "S",
                members: [
                    { name: "李承宇(Lee Seungwoo)", personality: ["上进", "自信", "认真"], position: "Leader" },
                    { name: "金秀珍(Kim Soojin)", personality: ["自信", "冷静", "开朗"], position: "Main Vocal" },
                    { name: "朴贤浩(Park Hyunho)", personality: ["上进", "自信", "热情"], position: "Main Rapper" },
                    { name: "崔允成(Choi Yoonsung)", personality: ["冷静", "认真", "上进"], position: "Main Dancer" },
                    { name: "姜世夏(Kang Saeha)", personality: ["开朗", "温柔", "冷静"], position: "Maknae" }
                ,
                    { name: "申惠珍(Shin Hyejin)", personality: ["上进", "自信"], position: "Main Vocal" }]
            }
        }
    },
    "YG Entertainment": {
        name: "YG Entertainment",
        desc: "以嘻哈和Swag风格闻名，打造了多个现象级团体。注重艺人的个性与舞台感染力。",
        tags: ["嘻哈Swag", "个性鲜明", "舞台感染力"],
        groups: {
            "Taegiflow": {
                name: "Taegiflow（태기플로우）不羁黑泡王牌团",
                desc: "不羁黑泡王牌团，霸气领袖与创作极强",
                tier: "S",
                members: [
                    { name: "张太宇(Jang Taewoo)", personality: ["自信", "上进", "热情"], position: "Leader" },
                    { name: "柳夏俊(Ryu Hajun)", personality: ["冷静", "自信", "上进"], position: "Main Rapper" },
                    { name: "徐俊浩(Seo Junho)", personality: ["热情", "自信", "认真"], position: "Main Dancer" },
                    { name: "元宇英(Won Wooyoung)", personality: ["温柔", "冷静", "认真"], position: "Main Vocal" },
                    { name: "田大贤(Jeon Daehyun)", personality: ["开朗", "幽默", "热情"], position: "Maknae" }
                ,
                    { name: "朴瑞俊(Park Seojun)", personality: ["热情", "认真"], position: "Lead Rapper" }]
            },
            "Black Luna": {
                name: "Black Luna（블랙루나）暗夜高级氛围团",
                desc: "暗夜高级氛围团，冷艳疏离高级氛围",
                tier: "S",
                members: [
                    { name: "金娜里(Kim Nari)", personality: ["自信", "冷静", "上进"], position: "Leader" },
                    { name: "尹世珍(Yoon Sejin)", personality: ["冷静", "认真", "上进"], position: "Main Vocal" },
                    { name: "洪智延(Hong Jiyeon)", personality: ["热情", "自信", "开朗"], position: "Main Rapper" },
                    { name: "林昭恩(Lim Soeun)", personality: ["冷静", "认真", "温柔"], position: "Main Dancer" },
                    { name: "采有珍(Chae Yujin)", personality: ["自信", "上进", "认真"], position: "Maknae" }
                ,
                    { name: "崔恩雅(Choi Euna)", personality: ["冷静", "自信"], position: "Sub Vocal" }]
            },
            "Artist Moon": {
                name: "Artist Moon（아티스트문）月光全员创作团",
                desc: "月光全员创作团，文艺浪漫灵感充沛",
                tier: "A",
                members: [
                    { name: "文俊熙(Moon Junhee)", personality: ["开朗", "自信", "上进"], position: "Leader" },
                    { name: "权限宰(Kwon Minjae)", personality: ["认真", "上进", "冷静"], position: "Main Vocal" },
                    { name: "吴泰京(Oh Taekyung)", personality: ["开朗", "幽默", "自信"], position: "Main Rapper" },
                    { name: "李诗妍(Lee Siyeon)", personality: ["冷静", "认真", "温柔"], position: "Main Dancer" },
                    { name: "朴惠媛(Park Hyewon)", personality: ["温柔", "开朗", "冷静"], position: "Maknae" }
                ,
                    { name: "金秀彬(Kim Soobin)", personality: ["温柔", "开朗"], position: "Visual" }]
            },
            "Cloud Echo": {
                name: "Cloud Echo（클라우드에코）云雾治愈抒情团",
                desc: "云雾治愈抒情团，温柔绵软治愈音色",
                tier: "A",
                members: [
                    { name: "郑银河(Jung Eunha)", personality: ["温柔", "开朗", "热情"], position: "Leader" },
                    { name: "孙宰雅(Son Jaeah)", personality: ["温柔", "冷静", "认真"], position: "Main Vocal" },
                    { name: "范锡民(Bum Seokmin)", personality: ["开朗", "温柔", "热情"], position: "Main Dancer" },
                    { name: "刘彩恩(Yoo Chaeun)", personality: ["认真", "温柔", "冷静"], position: "Lead Vocal" },
                    { name: "安承烨(Ahn Seungyeop)", personality: ["冷静", "认真", "上进"], position: "Maknae" }
                ,
                    { name: "李多顺(Lee Dasun)", personality: ["认真", "上进"], position: "Sub Vocal" }]
            },
            "Odd Muse": {
                name: "Odd Muse（오드뮤즈）小众艺术概念团",
                desc: "小众艺术概念团，特立独行审美超前",
                tier: "A",
                members: [
                    { name: "李泰民(Lee Taemin)", personality: ["自信", "上进", "开朗"], position: "Leader" },
                    { name: "崔圭珍(Choi Kyujin)", personality: ["冷静", "认真", "上进"], position: "Main Dancer" },
                    { name: "郑多恩(Jung Daeun)", personality: ["开朗", "温柔", "热情"], position: "Main Vocal" },
                    { name: "南基贤(Nam Kihyun)", personality: ["认真", "上进", "自信"], position: "Main Rapper" },
                    { name: "金宰运(Kim Jaewoon)", personality: ["冷静", "认真", "温柔"], position: "Maknae" }
                ,
                    { name: "郑彩润(Jung Chaeyun)", personality: ["幽默", "自信"], position: "Main Dancer" }]
            }
        }
    },
    "JYP Entertainment": {
        name: "JYP Entertainment",
        desc: "以亲和力和国民度见长，旗下团体以整齐划一的刀群舞和洗脑旋律著称。",
        tags: ["国民亲和", "刀群舞", "洗脑旋律"],
        groups: {
            "Wave Bright": {
                name: "Wave Bright（웨이브브라이트）晴空元气王牌团",
                desc: "晴空元气王牌团，阳光亲和感染力满格",
                tier: "S",
                members: [
                    { name: "金熙仙(Kim Heesun)", personality: ["开朗", "热情", "自信"], position: "Leader" },
                    { name: "朴都贤(Park Dohyun)", personality: ["认真", "温柔", "上进"], position: "Main Vocal" },
                    { name: "刘光民(Yoo Kwangmin)", personality: ["开朗", "幽默", "热情"], position: "Main Rapper" },
                    { name: "申延宇(Shin Yeonwoo)", personality: ["温柔", "冷静", "认真"], position: "Main Dancer" },
                    { name: "韩承雅(Han Seungah)", personality: ["温柔", "开朗", "冷静"], position: "Maknae" }
                ,
                    { name: "韩俊书(Han Junseo)", personality: ["热情", "上进"], position: "Lead Vocal" }]
            },
            "Melody Pitch": {
                name: "Melody Pitch（멜로디피치）和声主唱团",
                desc: "和声主唱团，稳重大气零失误唱功",
                tier: "A",
                members: [
                    { name: "林在贤(Im Jaehyun)", personality: ["认真", "自信", "上进"], position: "Leader" },
                    { name: "郑秀民(Jung Soomin)", personality: ["自信", "开朗", "热情"], position: "Main Vocal" },
                    { name: "崔宇珍(Choi Woojin)", personality: ["冷静", "认真", "上进"], position: "Main Dancer" },
                    { name: "文瑞恩(Moon Seoeun)", personality: ["温柔", "认真", "冷静"], position: "Lead Vocal" },
                    { name: "裴镇宇(Bae Jinwoo)", personality: ["温柔", "开朗", "热情"], position: "Maknae" }
                ,
                    { name: "申敏浩(Shin Minho)", personality: ["冷静", "认真"], position: "Main Rapper" }]
            },
            "Beat Motion": {
                name: "Beat Motion（비트모션）刀群舞蹈团",
                desc: "刀群舞蹈团，自律带队舞蹈天花板",
                tier: "A",
                members: [
                    { name: "姜贤泰(Kang Hyuntae)", personality: ["上进", "认真", "自信"], position: "Leader" },
                    { name: "吴正贤(Oh Junghyun)", personality: ["冷静", "认真", "上进"], position: "Main Dancer" },
                    { name: "南永浩(Nam Youngho)", personality: ["开朗", "热情", "上进"], position: "Main Rapper" },
                    { name: "孙智勋(Son Jihoon)", personality: ["冷静", "认真", "温柔"], position: "Main Vocal" },
                    { name: "李灿宇(Lee Chanwoo)", personality: ["温柔", "开朗", "认真"], position: "Maknae" }
                ,
                    { name: "金夏妍(Kim Hayeon)", personality: ["开朗", "自信"], position: "Sub Dancer" }]
            },
            "Warm Horizon": {
                name: "Warm Horizon（웜호라이즌）温柔治愈团",
                desc: "温柔治愈团，恬静温柔治愈气质",
                tier: "A",
                members: [
                    { name: "采秀允(Chae Sooyun)", personality: ["温柔", "冷静", "认真"], position: "Leader" },
                    { name: "尹智惠(Yoon Jihae)", personality: ["温柔", "开朗", "认真"], position: "Main Vocal" },
                    { name: "朴宣宇(Park Sunwoo)", personality: ["开朗", "热情", "上进"], position: "Main Dancer" },
                    { name: "金惠琳(Kim Hyerin)", personality: ["温柔", "认真", "冷静"], position: "Lead Vocal" },
                    { name: "郑海仁(Jung Haein)", personality: ["冷静", "认真", "温柔"], position: "Maknae" }
                ,
                    { name: "朴智安(Park Jiah)", personality: ["温柔", "上进"], position: "Lead Vocal" }]
            },
            "Funky Glow": {
                name: "Funky Glow（펑키글로우）综艺人气团",
                desc: "综艺人气团，反应超快临场梗王",
                tier: "S",
                members: [
                    { name: "李光翼(Lee Kwangi)", personality: ["开朗", "幽默", "自信"], position: "Leader" },
                    { name: "崔成烈(Choi Sungyul)", personality: ["开朗", "热情", "幽默"], position: "Main Rapper" },
                    { name: "刘泰珍(Yoo Taejin)", personality: ["冷静", "幽默", "认真"], position: "Main Vocal" },
                    { name: "元智恩(Won Jieun)", personality: ["热情", "温柔", "开朗"], position: "Main Dancer" },
                    { name: "裴敏宰(Bae Minjae)", personality: ["自信", "冷静", "认真"], position: "Maknae" }
                ,
                    { name: "崔敏赫(Choi Minhyuk)", personality: ["幽默", "开朗"], position: "Main Rapper" }]
            }
        }
    },
    "HYBE": {
        name: "HYBE",
        desc: "多厂牌运营的新生代巨头，从BTS到NewJeans持续引领全球K-pop浪潮。",
        tags: ["全球影响力", "多厂牌", "现象级"],
        groups: {
            "Myth Echo": {
                name: "Myth Echo（미스에코）全球顶级概念王牌团",
                desc: "全球顶级概念王牌团，格局大抗压极强",
                tier: "S",
                members: [
                    { name: "田锡珍(Jeon Seokjin)", personality: ["上进", "自信", "认真"], position: "Leader" },
                    { name: "金智勋(Kim Jihoon)", personality: ["上进", "自信", "热情"], position: "Main Rapper" },
                    { name: "朴熙英(Park Heeyoung)", personality: ["温柔", "冷静", "认真"], position: "Main Vocal" },
                    { name: "郑泽均(Jung Taekyun)", personality: ["开朗", "自信", "幽默"], position: "Main Dancer" },
                    { name: "姜柔娜(Kang Yuna)", personality: ["冷静", "认真", "上进"], position: "Maknae" }
                ,
                    { name: "郑浩镇(Jung Hojin)", personality: ["认真", "上进"], position: "Sub Vocal" }]
            },
            "Teen Nova": {
                name: "Teen Nova（틴노바）少年养成成长团",
                desc: "少年养成成长团，青涩上进拼命努力",
                tier: "A",
                members: [
                    { name: "崔宣宇(Choi Sunwoo)", personality: ["上进", "认真", "热情"], position: "Leader" },
                    { name: "李正汉(Lee Junghan)", personality: ["开朗", "热情", "温柔"], position: "Main Vocal" },
                    { name: "刘智勋(Yoo Jihoon)", personality: ["认真", "上进", "冷静"], position: "Main Dancer" },
                    { name: "宋大贤(Song Daehyun)", personality: ["冷静", "温柔", "认真"], position: "Main Rapper" },
                    { name: "吴承镇(Oh Seungjin)", personality: ["认真", "上进", "冷静"], position: "Maknae" }
                ,
                    { name: "金素恩(Kim Soeun)", personality: ["开朗", "温柔"], position: "Sub Vocal" }]
            },
            "Crush Aura": {
                name: "Crush Aura（크러쉬오라）炽飒Girl Crush团",
                desc: "炽飒Girl Crush团，气场王者舞台统治力MAX",
                tier: "S",
                members: [
                    { name: "金茶媛(Kim Chawon)", personality: ["自信", "上进", "热情"], position: "Leader" },
                    { name: "郑瑞妍(Jung Seoyeon)", personality: ["自信", "热情", "上进"], position: "Main Dancer" },
                    { name: "洪恩智(Hong Eunji)", personality: ["热情", "温柔", "认真"], position: "Main Rapper" },
                    { name: "林娜延(Lim Nayeon)", personality: ["冷静", "认真", "上进"], position: "Main Vocal" },
                    { name: "裴秀珍(Bae Soojin)", personality: ["开朗", "自信", "幽默"], position: "Maknae" }
                ,
                    { name: "李泰永(Lee Taeyoung)", personality: ["自信", "热情"], position: "Lead Dancer" }]
            },
            "Moon Lyric": {
                name: "Moon Lyric（문리릭）月光叙事抒情团",
                desc: "月光叙事抒情团，忧郁浪漫电影感歌声",
                tier: "A",
                members: [
                    { name: "朴宇珍(Park Woojin)", personality: ["温柔", "认真", "冷静"], position: "Leader" },
                    { name: "金瑞夏(Kim Seoha)", personality: ["冷静", "认真", "温柔"], position: "Main Vocal" },
                    { name: "崔智宇(Choi Jiwoo)", personality: ["温柔", "开朗", "热情"], position: "Main Dancer" },
                    { name: "尹彩恩(Yoon Chaeun)", personality: ["温柔", "认真", "冷静"], position: "Lead Vocal" },
                    { name: "郑贤圭(Jung Hyunkyu)", personality: ["冷静", "认真", "上进"], position: "Maknae" }
                ,
                    { name: "姜书妍(Kang Seoyeon)", personality: ["温柔", "认真"], position: "Sub Vocal" }]
            },
            "Secret Verse": {
                name: "Secret Verse（시크릿버스）悬疑小众概念团",
                desc: "悬疑小众概念团，神秘内敛思维深邃",
                tier: "A",
                members: [
                    { name: "安圭珍(Ahn Kyujin)", personality: ["冷静", "认真", "上进"], position: "Leader" },
                    { name: "孙泰容(Son Taeyong)", personality: ["自信", "开朗", "上进"], position: "Main Dancer" },
                    { name: "李恩秀(Lee Eunsoo)", personality: ["温柔", "开朗", "热情"], position: "Main Vocal" },
                    { name: "南在贤(Nam Jaehyun)", personality: ["认真", "上进", "自信"], position: "Main Rapper" },
                    { name: "韩承烨(Han Seungyeop)", personality: ["冷静", "温柔", "开朗"], position: "Maknae" }
                ,
                    { name: "申东贤(Shin Donghyun)", personality: ["冷静", "上进"], position: "Main Rapper" }]
            }
        }
    },
    "SEONGWOO ENT": {
        name: "SEONGWOO ENT",
        desc: "涵盖众多中大型经纪公司的爱豆，实力与潜力并存，是韩娱不可忽视的力量。",
        tags: ["百花齐放", "实力派", "潜力无限"],
        groups: {
            "Sky Hush": {
                name: "Sky Hush（스카이허쉬）空寂星语王牌团",
                desc: "空寂星语王牌团，清冷文艺安静温柔",
                tier: "A",
                members: [
                    { name: "文俊熙(Moon Junhee)", personality: ["冷静", "温柔", "认真"], position: "Leader" },
                    { name: "朴思恩(Park Saeun)", personality: ["温柔", "认真", "开朗"], position: "Main Vocal" },
                    { name: "金泰珍(Kim Taejin)", personality: ["上进", "开朗", "热情"], position: "Main Rapper" },
                    { name: "郑智媛(Jung Jiwon)", personality: ["冷静", "自信", "认真"], position: "Main Dancer" },
                    { name: "崔海琳(Choi Haerin)", personality: ["冷静", "温柔", "认真"], position: "Maknae" }
                ,
                    { name: "韩瑞琳(Han Serin)", personality: ["开朗", "温柔"], position: "Lead Vocal" }]
            },
            "Little Glow": {
                name: "Little Glow（리틀글로우）微光元气小众团",
                desc: "微光元气小众团，元气纯粹感染力超强",
                tier: "B",
                members: [
                    { name: "刘秀妍(Yoo Sooyeon)", personality: ["开朗", "热情", "温柔"], position: "Leader" },
                    { name: "裴大贤(Bae Daehyun)", personality: ["认真", "上进", "冷静"], position: "Main Vocal" },
                    { name: "吴采珍(Oh Chaejin)", personality: ["开朗", "幽默", "自信"], position: "Main Dancer" },
                    { name: "孙惠媛(Son Hyewon)", personality: ["温柔", "认真", "开朗"], position: "Lead Vocal" },
                    { name: "林智浩(Im Jiho)", personality: ["冷静", "开朗", "温柔"], position: "Maknae" }
                ,
                    { name: "林俊赫(Lim Junhyuk)", personality: ["热情", "上进"], position: "Sub Rapper" }]
            },
            "Wind Ballad": {
                name: "Wind Ballad（윈드발라드）风吟治愈民谣团",
                desc: "风吟治愈民谣团，温柔质朴治愈声线",
                tier: "B",
                members: [
                    { name: "采恩宇(Chae Eunwoo)", personality: ["温柔", "冷静", "认真"], position: "Leader" },
                    { name: "宋智汉(Song Jihan)", personality: ["冷静", "温柔", "认真"], position: "Main Vocal" },
                    { name: "姜多恩(Kang Daeun)", personality: ["开朗", "温柔", "上进"], position: "Main Dancer" },
                    { name: "金瑞允(Kim Seoyun)", personality: ["温柔", "热情", "认真"], position: "Lead Vocal" },
                    { name: "朴贤宇(Park Hyunwoo)", personality: ["冷静", "温柔", "开朗"], position: "Maknae" }
                ,
                    { name: "文恩菲(Moon Eunbi)", personality: ["温柔", "开朗"], position: "Sub Vocal" }]
            },
            "Wild Edge": {
                name: "Wild Edge（와일드엣지）野锐摇滚个性团",
                desc: "野锐摇滚个性团，桀骜自由热爱真我",
                tier: "B",
                members: [
                    { name: "郑太宇(Jung Taewoo)", personality: ["自信", "热情", "上进"], position: "Leader" },
                    { name: "李光民(Lee Kwangmin)", personality: ["自信", "开朗", "认真"], position: "Main Rapper" },
                    { name: "刘承雅(Yoo Seungah)", personality: ["温柔", "冷静", "认真"], position: "Main Vocal" },
                    { name: "崔敏宰(Choi Minjae)", personality: ["认真", "上进", "冷静"], position: "Main Dancer" },
                    { name: "安镇宇(Ahn Jinwoo)", personality: ["开朗", "冷静", "温柔"], position: "Maknae" }
                ,
                    { name: "金泰宪(Kim Taheun)", personality: ["自信", "认真"], position: "Lead Vocal" }]
            },
            "Dream Loop": {
                name: "Dream Loop（드림루프）梦环空灵仙气团",
                desc: "梦环空灵仙气团，浪漫梦幻想象力爆棚",
                tier: "B",
                members: [
                    { name: "文秀珍(Moon Soojin)", personality: ["开朗", "自信", "上进"], position: "Leader" },
                    { name: "朴智惠(Park Jihae)", personality: ["冷静", "温柔", "认真"], position: "Main Vocal" },
                    { name: "金多恩(Kim Daeun)", personality: ["温柔", "开朗", "热情"], position: "Main Dancer" },
                    { name: "郑瑞京(Jung Seokyung)", personality: ["认真", "冷静", "上进"], position: "Lead Vocal" },
                    { name: "韩采媛(Han Chaewon)", personality: ["开朗", "冷静", "温柔"], position: "Maknae" }
                ,
                    { name: "郑诗雅(Jung Siya)", personality: ["温柔", "幽默"], position: "Sub Vocal" }]
            }
        }
    }
};

// ==================== GAME STATE ====================
var GROUP_INTROS = {};
// Group intros generated dynamically from COMPANIES


var gameState = {
    player: {
        name: '',
        gender: '',
        birthDate: '',
        age: 0,
        personality: [],
        company: '',
        group: '',
        groups: [],
        positions: [],
        role: '',
        avatar: ''
    },
    体力: 200,
    max体力: 200,
    life: 150,
    credit: 150,
    danger: 0,
    trainCount: 0,
    scheduleCount: 0,
    firstPlaceCount: 0,
    money: 50000,
    fans: 0,
    teamMembers: [],
    relationships: {},
    emails: [],
    bubbleMessages: [],
    bubble已发送: [],
    dating: null,
    restTimeout: null,
    inventory: [],
    stats: { dance: 60, vocal: 50, rap: 40, acting: 55, variety: 45 },
    scheduleItems: [],
    meetings: [],
    loanAmount: 0,
    loanInterest: 0,
    npc好感度: {},
    meetingDialogState: null,
    insProfileView: null,
    influence: 50,
    fame: 30,
    lucky: 50,
    totalLikes: 0,
    insPosts: [],
    tiktokPosts: [],
    insMessages: [],
    tiktokMessages: [],
    membersViewLevel: 0,
    membersViewCompany: '',
    membersViewGroup: '',
    liveMode: 'video',
    earnCooldowns: {},
    groupPopularity: 0,
    kakaoChats: {},
    kakaoFriends: [],
    kakaoCurrentChat: '',
    kakaoTab: 'chats',
    certificates: {
        dance: [false, false, false],
        vocal: [false, false, false],
        rap: [false, false, false],
        acting: [false, false, false],
        variety: [false, false, false]
    },
    examResult: { comprehensive: [false, false] },
    preDebut: false,
    debutStep: 0,
    debutResult: null,
    noticeList: null,
    noticeDetail: null,
    insUnread: 0,
    tiktokUnread: 0,
    bubbleUnread: 0,
    weverseUnread: 0,
    datingUnread: 0,
    livePendingReward: false,
    newNotice: false,
    lastReadVersion: '',
    aiUsage: {},
    gacha: null,
    vipTier: null,
    aiBoostPacks: [],
    teammates: [],
    contract: null,
    looks: 50,
    comeback: null,
    management: null,
    fanClub: null,
    antiEvents: [],
    achievements: [],
    mvCollection: [],
    kickMemberIndex: 0
};
var _defaultGameState = JSON.parse(JSON.stringify(gameState));


// ==================== NAVIGATION ====================
var currentPage = 'welcome';
var creationStep = 1;
var INVITE_CODES = ['IDOL0486', 'STAR9255', 'KPOP8739', 'FAME2676', 'DEBUT4769', 'DANCE7939', 'VOCAL0569', 'STAGE5332', 'SHINE2250', 'CROWN1985'];

function renderInviteCodePage(app) {
    app.innerHTML = '<div class="page active"><div class="page-content" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:40px 30px;background:linear-gradient(180deg,#FFF5F7,#FFE4EC);">'
        + '<div style="font-size:32px;font-weight:800;color:#FF6B8A;margin-bottom:8px;">My Idol</div>'
        + '<div style="font-size:13px;color:#8E8E93;margin-bottom:40px;">韩娱爱豆模拟器</div>'
        + '<div style="width:100%;max-width:300px;background:white;border-radius:16px;padding:28px 24px;box-shadow:0 2px 12px rgba(255,107,138,0.1);">'
        + '<div style="font-size:16px;font-weight:600;color:#333;text-align:center;margin-bottom:6px;">内测邀请码</div>'
        + '<div style="font-size:12px;color:#8E8E93;text-align:center;margin-bottom:20px;">请输入邀请码进入游戏</div>'
        + '<input id="inviteCodeInput" type="text" placeholder="输入邀请码" style="width:100%;padding:14px 16px;border:1.5px solid #FFD5DE;border-radius:12px;font-size:15px;text-align:center;outline:none;letter-spacing:2px;text-transform:uppercase;" oninput="handleInviteCodeInput(this)" onkeydown="if(event.key===\'Enter\')checkInviteCode()">'
        + '<div id="inviteCodeError" style="font-size:12px;color:#FF3B30;text-align:center;margin-top:10px;display:none;"></div>'
        + '<button onclick="checkInviteCode()" id="inviteCodeBtn" style="width:100%;margin-top:16px;padding:14px;background:linear-gradient(135deg,#FF8FA3,#FF6B8A);color:white;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;">进入游戏</button>'
        + '</div>'
        + '<div style="margin-top:24px;font-size:12px;color:#C7C7CC;text-align:center;">没有邀请码？敬请期待正式上线</div>'
        + '</div></div>';
    setTimeout(function(){ var inp = document.getElementById('inviteCodeInput'); if(inp) inp.focus(); }, 300);
}


var _inviteCodeTimer = null;
function handleInviteCodeInput(el) {
    if (_inviteCodeTimer) clearTimeout(_inviteCodeTimer);
    _inviteCodeTimer = setTimeout(function() {
        var oldVal = el.value;
        var cursorPos = el.selectionStart;
        el.value = el.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        try { el.setSelectionRange(cursorPos, cursorPos); } catch(e) {}
        if (oldVal.length > 0 && el.value.length < oldVal.length) {
            var errEl = document.getElementById('inviteCodeError');
            if (errEl) { errEl.style.display = 'block'; errEl.textContent = '仅支持英文和数字'; setTimeout(function(){ if(errEl) errEl.style.display='none'; }, 2000); }
        }
    }, 80);
}

function checkInviteCode() {
    var code = (document.getElementById('inviteCodeInput').value || '').trim().toUpperCase().replace(/\s/g, '');
    var errEl = document.getElementById('inviteCodeError');
    var btnEl = document.getElementById('inviteCodeBtn');
    if (!code) {
        errEl.style.display = 'block';
        errEl.textContent = '请输入邀请码';
        var inpEl = document.getElementById('inviteCodeInput');
        if(inpEl) { inpEl.style.animation = 'shake 0.3s'; setTimeout(function(){ inpEl.style.animation = ''; }, 300); }
        return;
    }
    if (INVITE_CODES.indexOf(code) !== -1) {
        if(btnEl) btnEl.textContent='验证中...';
        window._inviteVerified = true;
        /* localStorage.setItem('myIdolInviteVerified', 'true'); */
        currentPage = 'welcome';
        render();
    } else {
        errEl.style.display = 'block';
        errEl.textContent = '邀请码无效，请检查后重试';
        var inpEl = document.getElementById('inviteCodeInput');
        if(inpEl) { inpEl.style.borderColor = '#FF3B30'; inpEl.style.animation = 'shake 0.3s'; setTimeout(function(){ inpEl.style.borderColor = '#FFD5DE'; inpEl.style.animation = ''; }, 1500); }
    }
}

function render() {
    var ls = document.getElementById('loadingScreen');
    if (ls) ls.style.display = 'none';
    if (typeof _checkAutoRest === 'function') _checkAutoRest();
    if (typeof gameState !== 'undefined' && gameState.体力 !== undefined) { if (gameState.体力 < 0) gameState.体力 = 0; if (gameState.体力 > gameState.max体力) gameState.体力 = gameState.max体力; }
    if (typeof gameState !== 'undefined' && gameState.stats) { var _sk = Object.keys(gameState.stats); for(var _si=0;_si<_sk.length;_si++){ if(gameState.stats[_sk[_si]]>150) gameState.stats[_sk[_si]]=150; } }
    var app = document.getElementById('app');
    if (!app) return;
    try {
        if (!window._inviteVerified) {
            renderInviteCodePage(app);
            return;
        }
        if (!window._inviteVerified && false) {
            window._inviteVerified = true;
        }
        switch(currentPage) {
            case 'welcome':
                var currentUser = localStorage.getItem('myIdolCurrentUser');
                if (currentUser) {
                    renderLoggedInPage(app);
                } else {
                    renderWelcomeAccountPage(app);
                }
                break;
            case 'create':
                renderCreationPage(app);
                break;
            case 'home':
                renderHomePage(app);
                break;
            case 'training':
                render训练Page(app);
                break;
            case 'exam':
                render考核Page(app);
                break;
            case 'examGame':
                renderExamGamePage(app);
                break;
            case 'me':
                render我的Page(app);
                break;
            case 'hotsearch':
                renderHotsearchPage(app);
                break;
            case 'ranking':
                renderRankingPage(app);
                break;
            case 'schedule':
                render行程表Page(app);
                break;
            case 'meeting':
                render会议Page(app);
                break;
            case 'mail':
                renderMailPage(app);
                break;
            case 'work':
                render工作Page(app);
                break;
            case 'dating':
                render恋爱Page(app);
                break;
            case 'bubble':
                render泡泡Page(app);
                break;
            case 'weverse':
                renderWeversePage(app);
                break;
            case 'ins':
                renderInsPage(app);
                break;
            case 'tiktok':
                renderTiktokPage(app);
                break;
            case 'more':
                render更多服务Page(app);
                break;
            case 'food':
                renderFoodPage(app);
                break;
            case 'delivery':
                render快递服务Page(app);
                break;
            case 'loan':
                renderLoanPage(app);
                break;
            case 'crisis':
                renderCrisisPage(app);
                break;
            case 'live':
                renderLivePage(app);
                break;
            case 'settings':
                render设置Page(app);
                break;
            case 'members':
                render成员信息Page(app);
                break;
            case 'updates':
                render更新通知Page(app);
                break;
            case 'kakaotalk':
                renderKakaoTalkPage(app);
                break;
            case 'kakaochat':
                renderKakaoChatPage(app);
                break;
            case 'debut':
                render出道企划Page(app);
                break;
            case 'debutdialog':
                render出道DialogPage(app);
                break;
            case 'comeback':
                renderComebackPage(app);
                break;
            case 'songprod':
                renderSongProdPage(app);
                break;
            case 'mvshoot':
                renderMVShootPage(app);
                break;
            case 'music':
                renderMusicPage(app);
                break;
            case 'mvstudio':
                renderMVStudioPage(app);
                break;
            case 'contract':
                renderContractPage(app);
                break;
            case 'relation':
                renderRelationPage(app);
                break;
            case 'management':
                renderManagementPage(app);
                break;
            case 'antiblack':
                renderAntiBlackPage(app);
                break;
            case 'fanclub':
                renderFanClubPage(app);
                break;
            case 'pr':
                renderPROfficePage(app);
                break;
            case 'kpopwiki':
                renderKpopWikiPage(app);
                break;
            case 'achievement':
                renderAchievementsPage(app);
                break;
            case 'gacha':
                renderGachaPage(app);
                break;
            case 'vip':
                renderVipPage(app);
                break;
            case 'company':
                renderCompanyDetailPage(app);
                break;
            case 'earn':
                render赚钱中心Page(app);
                break;
            case 'noticedetail':
                render通告详情Page(app);
                break;
            case 'insprofile':
                renderInsProfilePage(app);
                break;
            case 'meetingdialog':
                render会议DialogPage(app);
                break;
            case 'hotsearchdetail':
                renderHotsearchDetailPage(app);
                break;
            default:
                app.innerHTML = '<div class="page active"><div class="page-content" style="text-align:center;padding:60px 20px;"><div style="font-size:18px;color:var(--color-text-light);">页面不存在</div><button class="btn btn-primary" onclick="goToPage(\'home\')" style="margin-top:16px;">返回首页</button></div></div>';
        }
    } catch(e) {
        console.error('render error:', e);
        app.innerHTML = '<div style="text-align:center;padding:60px 20px;"><div style="font-size:16px;color:#FF6B8A;">渲染出错</div><div style="font-size:12px;color:#8E8E93;margin-top:8px;">' + (e.message || '未知错误') + '</div><button onclick="goToPage(\'home\')" style="margin-top:16px;padding:12px 24px;background:#FF8FA3;color:white;border:none;border-radius:50px;cursor:pointer;">返回首页</button></div>';
    }
}

// ==================== WELCOME PAGE ====================
function renderWelcomePage(container) {
    var saves = loadAllSaves();
    var slotsHtml = '';
    for (var si = 0; si < 3; si++) {
        var save = saves[si];
        if (save && save.player && save.player.name) {
            var roleText = save.player.role === 'Trainee' ? '练习生' : '出道爱豆';
            slotsHtml += '<div class="save-slot occupied" onclick="loadGame(' + si + ')">'
                + '<div style="font-weight:600;color:var(--color-text);">存档 ' + (si + 1) + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">' + save.player.name + ' | ' + roleText + '</div>'
                + '<div style="font-size:11px;color:var(--color-text-light);">粉丝: ' + (save.fans || 0).toLocaleString() + '</div>'
                + '</div>';
        } else {
            slotsHtml += '<div class="save-slot empty" onclick="startNewGame(' + si + ')">'
                + '<div>空存档 ' + (si + 1) + '</div></div>';
        }
    }
    container.innerHTML = '<div class="welcome-container">'
        + '<div class="welcome-logo">My Idol</div>'
        + '<div class="welcome-subtitle">K-Pop Idol Simulator</div>'
        + '<button class="btn btn-primary btn-lg" onclick="startNewGame()" style="margin-bottom:12px;">开始游戏</button>'
        + '<div style="width:100%;max-width:280px;margin-top:32px;">'
        + '<div class="section-title" style="text-align:center;margin-bottom:16px;">存档槽位</div>'
        + slotsHtml
        + '</div></div>';
}

// ==================== CHARACTER CREATION ====================
function startNewGame(slot) {
    if (slot === undefined) slot = 0;
    Object.assign(gameState, JSON.parse(JSON.stringify(_defaultGameState)));
    _ensureV16Fields();
    gameState.player = {
        name: '',
        gender: '',
        birthDate: '',
        age: 0,
        personality: [],
        company: '',
        group: '',
        groups: [],
        positions: [],
        role: '',
        avatar: ''
    };
    current存档 = slot;
    creationStep = 1;
    currentPage = 'create';
    render();
}

function renderCreationPage(container) {
    var content = '';
    
    switch(creationStep) {
        case 1:
            content = renderCreationStep1();
            setTimeout(function() { if (gameState.player.birthDate) calculateAge(); }, 50);
            break;
        case 2:
            content = renderCreationStep2();
            break;
        case 3:
            content = renderCreationStep3();
            break;
        case 4:
            content = renderCreationStep4();
            break;
        case 5:
            content = renderCreationStep5();
            break;
        case 6:
            content = renderCreationStep6();
            break;
    }
    
    container.innerHTML = content;
    updateTime();
    
    // 绑定开始游戏按钮
    var startBtn = document.getElementById('startGameBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            completeCreation();
        });
    }
}

function renderCreationStep1() {
    return '\n        <div class="page active" style="display: flex; flex-direction: column; height: 100%;">\n            <div class="page-header">\n                <div class="back-btn" onclick="goToWelcome()">‹ 返回</div>\n                <div class="page-title">第 1 步 / 共 6 步</div>\n                <div style="width: 32px;"></div>\n            </div>\n            \n            <div class="page-content" style="flex: 1; overflow-y: auto;">\n                <h2 style="font-size: 24px; font-weight: 700; color: var(--color-text); margin-bottom: 8px;">个人信息</h2>\n                <p style="color: var(--color-text-light); font-size: 14px; margin-bottom: 24px;">输入艺名、选择性别、输入生日</p>\n                \n                <div class="section-title">艺名 (英文)</div>\n                <input type="text" id="inputName" placeholder="例如: Jenny, Lisa, Rose" value="' + (gameState.player.name) + '" onblur="gameState.player.name = this.value">\n                \n                <div class="section-title">性别</div>\n                <div style="display: flex; gap: 12px;">\n                    <button class="btn ' + (gameState.player.gender === 'F' ? 'btn-primary' : 'btn-secondary') + '" onclick="select性别(\'F\')" style="flex: 1;">女</button>\n                    <button class="btn ' + (gameState.player.gender === 'M' ? 'btn-primary' : 'btn-secondary') + '" onclick="select性别(\'M\')" style="flex: 1;">男</button>\n                </div>\n                \n                <div class="section-title">生日</div>\n                <div style="display: flex; gap: 8px;">\n                    <select id="inputBirth年" onchange="calculateAge()" style="flex:1;padding:14px 8px;font-size:16px;border:1.5px solid var(--color-border);border-radius:12px;background:white;min-height:48px;-webkit-appearance:none;appearance:none;">\n                        <option value="">年</option>\n                        ' + (genBirthOptions(2012, 23, 0)) + '\n                    </select>\n                    <select id="inputBirth月" onchange="calculateAge()" style="flex:1;padding:14px 8px;font-size:16px;border:1.5px solid var(--color-border);border-radius:12px;background:white;min-height:48px;-webkit-appearance:none;appearance:none;">\n                        <option value="">月</option>\n                        ' + (genBirthOptions(1, 12, 1)) + '\n                    </select>\n                    <select id="inputBirth日" onchange="calculateAge()" style="flex:1;padding:14px 8px;font-size:16px;border:1.5px solid var(--color-border);border-radius:12px;background:white;min-height:48px;-webkit-appearance:none;appearance:none;">\n                        <option value="">日</option>\n                        ' + (genBirthOptions(1, 31, 2)) + '\n                    </select>\n                </div>\n                \n                <div id="ageDisplay" style="text-align: center; padding: 12px; background: var(--bg-card); border-radius: var(--radius-md); margin-bottom: 16px;">\n                    <span style="color: var(--color-text-light); font-size: 13px;">年龄: </span>\n                    <span id="ageValue" style="color: var(--color-primary); font-weight: 600;">' + (gameState.player.age > 0 ? gameState.player.age : "-") + '</span>\n                </div>\n                \n                <div class="section-title" style="margin-top: 24px;">性格标签 (选择3个)</div>\n                <div id="personalityTags">\n                    ' + (['热情', '冷静', '开朗', '上进', '幽默', '认真', '温柔', '自信'].map(function(p) { return '\n                        <span class="tag ' + (gameState.player.personality.indexOf(p) > -1 ? 'selected' : '') + '" onclick="togglePersonality(\'' + (p) + '\')">' + (p) + '</span>\n                    '}).join('')) + '\n                </div>\n                <div style="text-align: center; margin-top: 12px; color: var(--color-text-light); font-size: 13px;">\n                    已选: <span id="personalityCount">' + (gameState.player.personality.length) + '</span>/3\n                </div>\n            </div>\n            \n            <div style="padding: 16px 20px; background: var(--bg-card); border-top: 1px solid var(--color-border);">\n                <button class="btn btn-primary btn-lg" onclick="nextCreationStep(2)">下一步</button>\n            </div>\n        </div>\n    ';
}

function renderCreationStep2() {
    return '\n        <div class="page active" style="display: flex; flex-direction: column; height: 100%;">\n            <div class="page-header">\n                <div class="back-btn" onclick="prevCreationStep()">‹ 上一步</div>\n                <div class="page-title">第 2 步 / 共 6 步</div>\n                <div style="width: 32px;"></div>\n            </div>\n            \n            <div class="page-content" style="flex: 1; overflow-y: auto;">\n                <h2 style="font-size: 24px; font-weight: 700; color: var(--color-text); margin-bottom: 8px;">选择公司</h2>\n                <p style="color: var(--color-text-light); font-size: 14px; margin-bottom: 24px;">从五大公司中选择您的经纪公司</p>\n                \n                ' + (Object.entries(COMPANIES).map(function(entry) { var key = entry[0]; var company = entry[1]; return '\n                    <div class="company-card ' + (gameState.player.company === key ? 'selected' : '') + '" onclick="selectCompany(\'' + (key) + '\')">\n                        <div class="company-name">' + (company.name) + '</div>\n                        <div class="company-desc">' + (company.desc) + '</div>\n                        <div class="company-tags">\n                            ' + (company.tags.map(function(t) { return '<span class="badge badge-secondary">' + t + '</span>'; }).join('')) + '\n                        </div>\n                    </div>\n                '}).join('')) + '\n            </div>\n            \n            <div style="padding: 16px 20px; background: var(--bg-card); border-top: 1px solid var(--color-border);">\n                <button class="btn btn-primary btn-lg" onclick="nextCreationStep(3)">下一步</button>\n            </div>\n        </div>\n    ';
}

function renderCreationStep3() {
    return '\n        <div class="page active" style="display: flex; flex-direction: column; height: 100%;">\n            <div class="page-header">\n                <div class="back-btn" onclick="prevCreationStep()">‹ 上一步</div>\n                <div class="page-title">第 3 步 / 共 6 步</div>\n                <div style="width: 32px;"></div>\n            </div>\n            \n            <div class="page-content" style="flex: 1; overflow-y: auto;">\n                <h2 style="font-size: 24px; font-weight: 700; color: var(--color-text); margin-bottom: 8px;">选择身份</h2>\n                <p style="color: var(--color-text-light); font-size: 14px; margin-bottom: 24px;">选择您的起始路线</p>\n                \n                <div class="card ' + (gameState.player.role === 'Trainee' ? 'selected' : '') + '" onclick="selectRole(\'Trainee\')" style="margin-bottom: 12px; cursor: pointer;">\n                    <div style="font-weight: 600; font-size: 16px; margin-bottom: 8px;">练习生 Trainee</div>\n                    <div style="font-size: 13px; color: var(--color-text-light);">从零开始，努力训练，等待出道机会</div>\n                </div>\n                \n                <div class="card ' + (gameState.player.role === 'Idol' ? 'selected' : '') + '" onclick="selectRole(\'Idol\')" style="cursor: pointer;">\n                    <div style="font-weight: 600; font-size: 16px; margin-bottom: 8px;">出道爱豆 Debut Idol</div>\n                    <div style="font-size: 13px; color: var(--color-text-light);">以出道爱豆身份开始，选择你的原创团体</div>\n                </div>\n            </div>\n            \n            <div style="padding: 16px 20px; background: var(--bg-card); border-top: 1px solid var(--color-border);">\n                <button class="btn btn-primary btn-lg" onclick="nextCreationStep(4)">下一步</button>\n            </div>\n        </div>\n    ';
}

function renderCreationStep4() {
    if (gameState.player.role === 'Idol') {
        var company = COMPANIES[gameState.player.company];
        var groupKeys = Object.keys(company.groups);
        var groupEntries = [];
        for (var _igei = 0; _igei < groupKeys.length; _igei++) { groupEntries.push([groupKeys[_igei], company.groups[groupKeys[_igei]]]); }
        var idolGroupHtml = groupEntries.map(function(entry) {
            var _ikey = entry[0]; var _igroup = entry[1];
            var _igIdx = gameState.player.groups.indexOf(_ikey);
            var _isSelected = _igIdx > -1;
            var _ilabel = _igIdx === 0 ? '\u7b2c\u4e00\u5fd7\u613f' : _igIdx === 1 ? '\u7b2c\u4e8c\u5fd7\u613f' : _igIdx === 2 ? '\u7b2c\u4e09\u5fd7\u613f' : '';
            return '<div class="group-card ' + (_isSelected ? 'selected' : '') + '" data-key="' + _ikey + '" onclick="toggleGroup(this.dataset.key)" style="cursor:pointer;">'
            + '<div style="display:flex;justify-content:space-between;align-items:center;"><div class="group-name">' + _igroup.name + '</div>'
            + (_ilabel ? '<span style="font-size:11px;padding:2px 8px;border-radius:50px;background:var(--color-primary);color:white;font-weight:600;">' + _ilabel + '</span>' : '')
            + '</div><div class="group-desc">' + _igroup.desc + '</div></div>';
        }).join('');
        return '<div class="page active" style="display:flex;flex-direction:column;height:100%;">'
        + '<div class="page-header"><div class="back-btn" onclick="prevCreationStep()">\u2039 \u4e0a\u4e00\u6b65</div><div class="page-title">\u7b2c 4 \u6b65 / \u5171 6 \u6b65</div><div style="width:32px;"></div></div>'
        + '<div class="page-content" style="flex:1;overflow-y:auto;">'
        + '<h2 style="font-size:24px;font-weight:700;color:var(--color-text);margin-bottom:8px;">\u9009\u62e9\u56e2\u4f53</h2>'
        + '<p style="color:var(--color-text-light);font-size:14px;margin-bottom:24px;">\u4f5c\u4e3a\u51fa\u9053\u7231\u8c46\uff0c\u9009\u62e9\u4f60\u6240\u5c5e\u7684\u56e2\u4f53</p>'
        + idolGroupHtml
        + '</div>'
        + '<div style="padding:16px 20px;background:var(--bg-card);border-top:1px solid var(--color-border);"><button class="btn btn-primary btn-lg" onclick="nextCreationStep(5)">\u4e0b\u4e00\u6b65</button></div>'
        + '</div>';
    }
    var company = COMPANIES[gameState.player.company];
    var groupKeys = Object.keys(company.groups);
    var groupEntries = [];
    for (var _gei = 0; _gei < groupKeys.length; _gei++) { groupEntries.push([groupKeys[_gei], company.groups[groupKeys[_gei]]]); }
    return '<div class="page active" style="display:flex;flex-direction:column;height:100%;">'
    + '<div class="page-header"><div class="back-btn" onclick="prevCreationStep()">\u2039 \u4e0a\u4e00\u6b65</div><div class="page-title">\u7b2c 4 \u6b65 / \u5171 6 \u6b65</div><div style="width:32px;"></div></div>'
    + '<div class="page-content" style="flex:1;overflow-y:auto;">'
    + '<h2 style="font-size:24px;font-weight:700;color:var(--color-text);margin-bottom:8px;">\u5fd7\u613f\u56e2</h2>'
    + '<p style="color:var(--color-text-light);font-size:14px;margin-bottom:24px;">\u9009\u62e9\u6700\u591a3\u4e2a\u5fd7\u613f\u56e2\uff0c\u6309\u9009\u62e9\u987a\u5e8f\u4e3a\u5fd7\u613f\u987a\u5e8f</p>'
    + groupEntries.map(function(entry) { var _key = entry[0]; var _group = entry[1]; var _gIdx = gameState.player.groups.indexOf(_key); var _label = _gIdx === 0 ? '\u7b2c\u4e00\u5fd7\u613f' : _gIdx === 1 ? '\u7b2c\u4e8c\u5fd7\u613f' : _gIdx === 2 ? '\u7b2c\u4e09\u5fd7\u613f' : ''; return '<div class="group-card ' + (_gIdx > -1 ? 'selected' : '') + '" data-key="' + _key + '" onclick="toggleGroup(this.dataset.key)"><div style="display:flex;justify-content:space-between;align-items:center;"><div class="group-name">' + _group.name + '</div>' + (_label ? '<span style="font-size:11px;padding:2px 8px;border-radius:50px;background:var(--color-primary);color:white;font-weight:600;">' + _label + '</span>' : '') + '</div><div class="group-desc">' + _group.desc + '</div></div>'; }).join('')
    + '<div style="text-align:center;margin-top:16px;color:var(--color-text-light);font-size:13px;">\u5df2\u9009: <span id="groupCount">' + gameState.player.groups.length + '</span>/3</div>'
    + '</div>'
    + '<div style="padding:16px 20px;background:var(--bg-card);border-top:1px solid var(--color-border);"><button class="btn btn-primary btn-lg" onclick="nextCreationStep(5)">\u4e0b\u4e00\u6b65</button></div>'
    + '</div>';
}
function renderCreationStep5() {
    var positions = ['主唱', '主舞', '主Rapper', '门面', '中心位', '队长', '忙内'];
    
    return '\n        <div class="page active" style="display: flex; flex-direction: column; height: 100%;">\n            <div class="page-header">\n                <div class="back-btn" onclick="prevCreationStep()">‹ 上一步</div>\n                <div class="page-title">第 5 步 / 共 6 步</div>\n                <div style="width: 32px;"></div>\n            </div>\n            \n            <div class="page-content" style="flex: 1; overflow-y: auto;">\n                <h2 style="font-size: 24px; font-weight: 700; color: var(--color-text); margin-bottom: 8px;">队内定位</h2>\n                <p style="color: var(--color-text-light); font-size: 14px; margin-bottom: 24px;">选择最多3个定位，按志愿顺序排列</p>\n                \n                <div style="text-align: center;">\n                    ' + (positions.map(function(p) {
                        var pIdx = gameState.player.positions.indexOf(p);
                        var label = pIdx === 0 ? '第一定位' : pIdx === 1 ? '第二定位' : pIdx === 2 ? '第三定位' : '';
                        return '<span class="tag ' + (pIdx > -1 ? 'selected' : '') + '" data-p="' + p + '" onclick="togglePosition(this.dataset.p)" style="font-size:14px;padding:12px 20px;margin:6px;position:relative;">' + p + (label ? '<span style="position:absolute;top:-6px;right:-6px;font-size:9px;padding:1px 5px;border-radius:50px;background:var(--color-primary);color:white;font-weight:600;">' + label + '</span>' : '') + '</span>';
                    }).join('')) + '\n                </div>\n                \n                <div style="text-align: center; margin-top: 24px; color: var(--color-text-light); font-size: 13px;">\n                    已选: <span id="positionCount">' + (gameState.player.positions.length) + '</span>/3\n                </div>\n            </div>\n            \n            <div style="padding: 16px 20px; background: var(--bg-card); border-top: 1px solid var(--color-border);">\n                <button class="btn btn-primary btn-lg" onclick="nextCreationStep(6)">下一步</button>\n            </div>\n        </div>\n    ';
}

function renderCreationStep6() {
    var company = COMPANIES[gameState.player.company];
    
    return '\n        <div class="page active" style="display: flex; flex-direction: column; height: 100%;">\n            <div class="page-header">\n                <div class="back-btn" onclick="prevCreationStep()">‹ 上一步</div>\n                <div class="page-title">第 6 步 / 共 6 步</div>\n                <div style="width: 32px;"></div>\n            </div>\n            \n            <div class="page-content" style="flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;">\n                <h2 style="font-size: 24px; font-weight: 700; color: var(--color-text); margin-bottom: 24px; text-align: center;">确认并开始</h2>\n                \n                <div class="card">\n                    <div style="display: flex; align-items: center; margin-bottom: 16px;">\n                        <div class="avatar" style="width: 64px; height: 64px; font-size: 24px;">' + (gameState.player.name.charAt(0).toUpperCase()) + '</div>\n                        <div style="margin-left: 16px;">\n                            <div style="font-size: 20px; font-weight: 700; color: var(--color-text);">' + (gameState.player.name) + '</div>\n                            <div style="color: var(--color-text-light);">' + (gameState.player.gender === 'F' ? '女' : '男') + ' | ' + (gameState.player.age) + '岁</div>\n                        </div>\n                    </div>\n                    \n                    <div class="section-divider" style="height: 1px; margin: 16px 0;"></div>\n                    \n                    <div style="font-size: 13px;">\n                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">\n                            <span style="color: var(--color-text-light);">公司</span>\n                            <span style="font-weight: 600;">' + (company.name) + '</span>\n                        </div>\n                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">\n                            <span style="color: var(--color-text-light);">身份</span>\n                            <span style="font-weight: 600;">' + (gameState.player.role === 'Trainee' ? '练习生' : '出道爱豆') + '</span>\n                        </div>\n                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">\n                            <span style="color: var(--color-text-light);">志愿团</span>\n                            <span style="font-weight: 600;">' + (gameState.player.groups.map(function(gk){ var c=COMPANIES[gameState.player.company]; return c&&c.groups[gk]?c.groups[gk].name:gk; }).join(' > ')) + '</span>\n                        </div>\n                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">\n                            <span style="color: var(--color-text-light);">队内定位</span>\n                            <span style="font-weight: 600;">' + (gameState.player.positions.join(' > ')) + '</span>\n                        </div>\n                        <div style="display: flex; justify-content: space-between;">\n                            <span style="color: var(--color-text-light);">性格</span>\n                            <span style="font-weight: 600;">' + (gameState.player.personality.join('、')) + '</span>\n' + (gameState.player.birthDate ? '<div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span style="color:var(--color-text-light);">出生日期</span><span style="font-weight:600;">' + gameState.player.birthDate + '</span></div>' : '') + '\n                        </div>\n                    </div>\n                </div>\n            </div>\n            \n            <div style="padding: 16px 20px; background: var(--bg-card); border-top: 1px solid var(--color-border); flex-shrink: 0;">\n                <button id="startGameBtn" class="btn btn-primary btn-lg" style="width: 100%; min-height: 50px; font-size: 18px;">开始游戏</button>\n            </div>\n        </div>\n    ';
}

function genBirthOptions(start, count, part) {
    var bd = gameState.player.birthDate || '';
    var parts = bd.split('-');
    var sel = parts[part] || '';
    var html = '';
    for (var i = 0; i < count; i++) {
        var val = part === 0 ? start - i : start + i;
        html += '<option value="' + val + '"' + (String(val) === sel ? ' selected' : '') + '>' + val + '</option>';
    }
    return html;
}

function calculateAge() {
    var yearEl = document.getElementById('inputBirth年');
    var monthEl = document.getElementById('inputBirth月');
    var dayEl = document.getElementById('inputBirth日');
    var year = yearEl ? yearEl.value : '';
    var month = monthEl ? monthEl.value : '';
    var day = dayEl ? dayEl.value : '';
    
    if (year && month && day) {
        var birthDate = new Date(year, month - 1, day);
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        gameState.player.age = age;
        gameState.player.birthDate = (year) + '-' + (month) + '-' + (day);
        
        var ageEl = document.getElementById('ageValue');
        if (ageEl) ageEl.textContent = age;
    }
}

function select性别(g) {
    gameState.player.gender = g;
    render();
}

function togglePersonality(p) {
    if (gameState.player.personality.length >= 3 && gameState.player.personality.indexOf(p) === -1) {
        showToast('最多选择3个性格标签');
        return;
    }
    var idx = gameState.player.personality.indexOf(p);
    if (idx > -1) {
        gameState.player.personality.splice(idx, 1);
    } else {
        gameState.player.personality.push(p);
    }
    if (gameState.player.personality.length > 3) gameState.player.personality = gameState.player.personality.slice(0, 3);
    render();
}

function selectCompany(key) {
    gameState.player.company = key;
    // 选中公司后自动跳到下一步
    setTimeout(function() { nextCreationStep(3); }, 300);
}

function selectRole(role) {
    gameState.player.role = role;
    // 选中身份后自动跳到下一步
    setTimeout(function() { nextCreationStep(4); }, 300);
}

function toggleGroup(key) {
    var idx = gameState.player.groups.indexOf(key);
    if (idx > -1) {
        gameState.player.groups.splice(idx, 1);
    } else if (gameState.player.groups.length >= 3) {
        showToast('最多选择3个志愿团');
        return;
    } else {
        gameState.player.groups.push(key);
    }
    var countEl = document.getElementById('groupCount');
    if (countEl) countEl.textContent = gameState.player.groups.length;
    render();
    // 选满3个志愿团后自动跳到下一步
    if (gameState.player.groups.length === 3) {
        setTimeout(function() { nextCreationStep(5); }, 400);
    }
}

function toggleIdolGroup(key) {
    var idx = gameState.player.groups.indexOf(key);
    if (idx > -1) {
        gameState.player.groups.splice(idx, 1);
    } else if (gameState.player.groups.length >= 3) {
        showToast('最多选择3个志愿团');
        return;
    } else {
        gameState.player.groups.push(key);
    }
    render();
}

function togglePosition(p) {
    if (gameState.player.positions.length >= 3 && gameState.player.positions.indexOf(p) === -1) {
        showToast('最多选择3个定位');
        return;
    }
    var idx = gameState.player.positions.indexOf(p);
    if (idx > -1) {
        gameState.player.positions.splice(idx, 1);
    } else {
        gameState.player.positions.push(p);
    }
    if (gameState.player.positions.length > 3) gameState.player.positions = gameState.player.positions.slice(0, 3);
    var countEl = document.getElementById('positionCount');
    if (countEl) countEl.textContent = gameState.player.positions.length;
    render();
    if (gameState.player.positions.length === 3) {
        setTimeout(function() { nextCreationStep(6); }, 400);
    }
}

function nextCreationStep(step) {
    // 验证步骤1必填项
    if (creationStep === 1) {
        if (!gameState.player.name || !gameState.player.gender || gameState.player.personality.length !== 3) {
            showModal('提示', '请填写：艺名、性别、选择3个性格标签');
            return;
        }
    }
    // 验证步骤2必填项
    if (creationStep === 2) {
        if (!gameState.player.company) {
            showModal('提示', '请选择公司');
            return;
        }
    }
    // 验证步骤3必填项
    if (creationStep === 3) {
        if (!gameState.player.role) {
            showModal('提示', '请选择身份：练习生或出道艺人');
            return;
        }
    }
    // 验证步骤4必填项
    if (creationStep === 4) {
        if (gameState.player.role === 'Trainee' && gameState.player.groups.length !== 3) {
            showModal('\u63d0\u793a', '\u8bf7\u9009\u62e93\u4e2a\u5fd7\u613f\u56e2');
            return;
        }
        if (gameState.player.role === 'Idol' && gameState.player.groups.length < 1) {
            showModal('\u63d0\u793a', '\u8bf7\u81f3\u5c11\u9009\u62e91\u4e2a\u56e2\u4f53');
            return;
        }
    }
    // 验证步骤5必填项
    if (creationStep === 5) {
        if (gameState.player.positions.length !== 3) {
            showModal('提示', '请选择3个定位');
            return;
        }
    }
    creationStep = step;
    render();
}

function prevCreationStep() {
    if (creationStep > 1) { creationStep--; render(); }
}

function goToWelcome() {
    if (gameState.player.name || gameState.player.company || gameState.player.personality.length > 0) {
        showModal('确认返回', '返回将清空已填写的信息，确定放弃当前编辑吗？', [
            { text: '取消', action: closeModal },
            { text: '确定返回', action: function() { closeModal(); _resetCreation(); currentPage = 'welcome'; render(); } }
        ]);
    } else {
        currentPage = 'welcome';
        render();
    }
}

function _resetCreation() {
    gameState.player = { name: '', gender: '', birthDate: '', age: 0, personality: [], company: '', groups: [], positions: [], role: '', avatar: '' };
    creationStep = 1;
}

function completeCreation() {
    try {
        if (gameState.player.role === 'Trainee') {
            initAsTrainee();
        } else {
            initAsIdol();
        }
        
        // 初始化所有V1.6字段（含gacha、kakao等）
        _ensureV16Fields();
        
        // 检查管理员模式
        _checkAdmin(localStorage.getItem('myIdolCurrentUser'));
        
        // 切换到首页
        currentPage = 'home';
        render();
        
        // 渲染完成后再显示UI元素
        document.getElementById('statusBar').style.display = 'flex';
        document.getElementById('restButtons').style.display = 'flex';
        document.getElementById('bottomNav').style.display = 'flex';
        document.getElementById('homeIndicator').style.display = 'block';
        
        renderBottomNav();
        initScheduleItems();
        initMeetings();
        startAutoSave();
        triggerSilentSave();
    } catch(e) {
        alert('初始化出错: ' + e.message);
        console.error('completeCreation error:', e);
    }
}

function do工作() {
    currentPage = 'work';
    render();
    renderBottomNav();
}

function initAsTrainee() {
    gameState.money = 70000;
    
    var company = gameState.player.company;
    if (company === 'SM Entertainment' || company === 'YG Entertainment' || company === 'HYBE') {
        gameState.fans = 500 + Math.floor(Math.random() * 201);
    } else if (company === 'JYP Entertainment') {
        gameState.fans = 300 + Math.floor(Math.random() * 201);
    } else {
        gameState.fans = 100 + Math.floor(Math.random() * 101);
    }
    
    gameState.player.avatar = gameState.player.name.charAt(0).toUpperCase();
    
    var companyData = COMPANIES[company];
    gameState.emails.unshift({
        title: '欢迎加入 ' + ((companyData && companyData.name) || company) + '！',
        from: ((companyData && companyData.name) || company) + ' 人事部',
        content: '亲爱的 ' + gameState.player.name + '：\n\n欢迎正式加入' + ((companyData && companyData.name) || company) + '！\n\n【公司简介】\n' + ((companyData && companyData.desc) || '') + '\n\n【训练须知】\n1. 每日按时参加训练课程\n2. 月末将进行综合考核\n3. 保持良好的体力和状态\n4. 注意个人形象管理\n\n【导师寄语】\n每一位练习生都有闪耀的潜力，坚持训练，出道的机会一定会到来！\n\n加油！\n——人事部',
        time: new Date().toLocaleDateString('zh-CN'),
        read: false
    });
    
    gameState.emails.push({
        title: '训练课程安排通知',
        from: ((companyData && companyData.name) || company) + ' 训练管理部',
        content: '通知：\n\n本周训练课程安排如下：\n周一/三/五 - 舞蹈训练（9:00-12:00）\n周二/四 - 声乐训练（9:00-12:00）\n周六 - 综合训练（10:00-16:00）\n\n请准时参加。\n\n——训练管理部',
        time: new Date().toLocaleDateString('zh-CN'),
        read: false
    });
    
    gameState.emails.push({
        title: '经纪人问候',
        from: '经纪人 李秀珍',
        content: gameState.player.name + '，你好！\n\n我是你的经纪人李秀珍，以后有什么问题都可以来找我。\n\n记住：保持谦虚、努力训练、注意休息。这个行业竞争很激烈，但只要坚持，一定能发光。\n\n期待看到你的成长！\n\n——李秀珍',
        time: new Date().toLocaleDateString('zh-CN'),
        read: false
    });
    triggerSilentSave();
}

function initAsIdol() {
    var company = gameState.player.company;
    var gpBase3 = { 'SM Entertainment': 80, 'YG Entertainment': 70, 'JYP Entertainment': 60, 'HYBE': 90, 'SEONGWOO ENT': 40 };
    gameState.groupPopularity = gpBase3[company] || 50;
    if (company === 'SM Entertainment' || company === 'YG Entertainment' || company === 'HYBE') {
        gameState.money = 150000 + Math.floor(Math.random() * 50001);
    } else if (company === 'JYP Entertainment') {
        gameState.money = 120000 + Math.floor(Math.random() * 60001);
    } else {
        gameState.money = 80000 + Math.floor(Math.random() * 40001);
    }
    
        var selectedGroupKey = (gameState.player.groups && gameState.player.groups.length > 0) ? gameState.player.groups[0] : null;
        var _compObj = COMPANIES[company];
        var originalGroupName = selectedGroupKey && _compObj && _compObj.groups[selectedGroupKey] ? _compObj.groups[selectedGroupKey].name : gameState.player.name + '\u7684\u56e2\u4f53';
        gameState.player.group = originalGroupName; gameState.player.originalGroup = true;
    
    gameState.fans = 200 + Math.floor(Math.random() * 601);
    gameState.player.avatar = gameState.player.name.charAt(0).toUpperCase();
    
    var companyData = COMPANIES[company];
    gameState.emails.unshift({
        title: '出道快乐！',
        from: (companyData ? companyData.name || company : company) + ' 经纪部',
        content: '恭喜 ' + gameState.player.name + '！\n\n你已正式作为原创团体「' + originalGroupName + '」成员出道！\n\n【团名】' + originalGroupName + '\n【成员】' + gameState.player.name + '\n\n【出道舞台安排】\n时间：下周六 20:00\n地点：首尔奥林匹克公园\n曲目：出道主打歌 + 副主打歌\n\n【经纪人寄语】\n出道只是开始，接下来的路更长。保持初心，团结互助，你们一定能走得更远！\n\n祝贺！\n——经纪部',
        time: new Date().toLocaleDateString('zh-CN'),
        read: false
    });
    gameState.emails.push({
        title: '出道宣传计划',
        from: (companyData ? companyData.name || company : company) + ' 宣传部',
        content: '出道宣传计划如下：\n\n1. 音乐节目打歌（2周）\n2. 综艺节目录制\n3. 粉丝签名会\n4. 社交媒体宣传\n\n请各位成员配合行程安排。\n\n——宣传部',
        time: new Date().toLocaleDateString('zh-CN'),
        read: false
    });
}

// ==================== HOME PAGE (APP GRID) ====================
function renderHomePage(container) {
    var apps = [
        { id: 'debut', icon: 'debut', name: '出道企划', unlock: 0 },
        { id: 'earn', icon: 'earn', name: '赚钱中心', unlock: 0 },
        { id: 'hotsearch', icon: 'hotsearch', name: '热搜', unlock: 0 },
        { id: 'ranking', icon: 'ranking', name: '排行榜', unlock: 0 },
        { id: 'schedule', icon: 'schedule', name: '行程表', unlock: 0 },
        { id: 'meeting', icon: 'meeting', name: '会议', unlock: 0 },
        { id: 'mail', icon: 'mail', name: '邮箱', unlock: 0 },
        { id: 'work', icon: 'work', name: '通告', unlock: 0 },
        { id: 'ins', icon: 'ins', name: 'INS', unlock: 0 },
        { id: 'tiktok', icon: 'tiktok', name: 'TikTok', unlock: 0 },
        { id: 'food', icon: 'food', name: '外卖', unlock: 0 },
        { id: 'delivery', icon: 'delivery', name: '快递', unlock: 0 },
        { id: 'loan', icon: 'loan', name: '贷款', unlock: 0 },
        { id: 'live', icon: 'live', name: '直播', unlock: 0 },
        { id: 'dating', icon: 'dating', name: '恋爱', unlock: 0 },
        { id: 'bubble', icon: 'bubble', name: '泡泡', unlock: 1000 },
        { id: 'weverse', icon: 'weverse', name: 'Weverse', unlock: 1000 },
        { id: 'crisis', icon: 'crisis', name: '私生危机', unlock: 5000 },
        { id: 'members', icon: 'members', name: '成员信息', unlock: 0 },
        { id: 'kakaotalk', icon: 'kakaotalk', name: 'KakaoTalk', unlock: 0 },
        { id: 'updates', icon: 'updates', name: '更新通知', unlock: 0 },
        { id: 'achievement', icon: 'achievement', name: '成就', unlock: 0 },
        { id: 'gacha', icon: 'gacha', name: '抽卡', unlock: 0 },
        { id: 'vip', icon: 'vip', name: '会员', unlock: 0 },
        { id: 'company', icon: 'company', name: '我的公司', unlock: 0 },
        { id: 'comeback', icon: 'comeback', name: '回归计划', unlock: 0 },
        { id: 'songprod', icon: 'songprod', name: '歌曲制作', unlock: 0 },
        { id: 'music', icon: 'music', name: '音乐放送', unlock: 0 },
        { id: 'mvstudio', icon: 'mvstudio', name: 'MV工作室', unlock: 0 },
        { id: 'contract', icon: 'contract', name: '合约', unlock: 0 },
        { id: 'relation', icon: 'relation', name: '队友关系', unlock: 0 },
        { id: 'management', icon: 'management', name: '经纪团队', unlock: 0 },
        { id: 'antiblack', icon: 'antiblack', name: '反黑中心', unlock: 0 },
        { id: 'fanclub', icon: 'fanclub', name: '后援会', unlock: 0 },
        { id: 'pr', icon: 'pr', name: '公关室', unlock: 0 },
        { id: 'kpopwiki', icon: 'kpopwiki', name: 'Kpop百科', unlock: 0 }
    ];
    
    var roleText = gameState.player.role === 'Trainee' ? '练习生' : '出道爱豆';
    var company = COMPANIES[gameState.player.company];
    var homeSubInfo = '';
    if (gameState.player.role === 'Trainee') {
        homeSubInfo = '<div style="font-size:11px;color:var(--color-text-light);">' + ((company && company.name) || '') + ' 练习生</div>';
    } else if (gameState.preDebut) {
        homeSubInfo = '<div style="font-size:11px;color:var(--color-text-light);">' + ((company && company.name) || '') + ' 预备出道</div>';
    } else {
        var _hGroup = gameState.player.group || '';
        var _hPos = (gameState.player.positions && gameState.player.positions.length > 0) ? gameState.player.positions.join(' / ') : '';
        homeSubInfo = '<div style="font-size:11px;color:var(--color-text-light);">' + ((company && company.name) || '') + '</div>' + (_hGroup ? '<div style="font-size:12px;font-weight:700;color:var(--color-primary);">' + _hGroup + '</div>' : '') + '<div style="font-size:10px;color:var(--color-text-light);">' + (_hPos ? _hPos + ' | ' : '') + '出道爱豆</div>';
    }
    
    container.innerHTML = '\n        <div class="page active">\n            <div style="padding: 16px 20px; display: flex; align-items: center; background: var(--bg-card); border-bottom: 1px solid var(--color-border);">\n                <div class="avatar" style="width: 40px; height: 40px; font-size: 16px;">' + (gameState.player.avatar) + '</div>\n                <div style="margin-left: 10px; flex: 1;">\n                    <div style="font-size: 16px; font-weight: 700; color: var(--color-text);">' + (gameState.player.name) + '</div>\n                    ' + homeSubInfo + '\n                </div>\n                <div class="back-btn" onclick="goToPage(\'settings\')" style="color: var(--color-text-light); font-size: 13px;">\n                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>\n                </div>\n            </div>\n            <div class="page-content" style="padding: 16px 20px;">\n                ' + (function() {
                    var appMap = {};
                    for (var ai = 0; ai < apps.length; ai++) { appMap[apps[ai].id] = apps[ai]; }
                    var homePageNum = gameState.homePageNum || 1;
                    var categories = [
                        { title: '工作', ids: ['debut', 'work', 'schedule', 'meeting', 'mail', 'members', 'crisis', 'updates', 'contract', 'management', 'antiblack', 'pr'], page: 1 },
                        { title: '赚钱', ids: ['earn', 'food', 'delivery', 'loan', 'gacha', 'vip'], page: 1 },
                        { title: '社交', ids: ['ins', 'tiktok', 'kakaotalk', 'bubble', 'weverse', 'dating', 'relation', 'fanclub'], page: 2 },
                        { title: '娱乐', ids: ['live', 'hotsearch', 'ranking', 'comeback', 'songprod', 'music', 'mvstudio', 'achievement', 'company', 'kpopwiki'], page: 2 }
                    ];
                    var catHtml = '';
                    for (var ci = 0; ci < categories.length; ci++) {
                        var cat = categories[ci];
                        if (cat.page !== homePageNum) continue;
                        catHtml += '<div style="font-size:11px;color:var(--color-text-light);margin:' + (catHtml.length > 0 ? '16' : '0') + 'px 0 6px 4px;font-weight:500;">' + cat.title + '</div>';
                        catHtml += '<div class="app-grid">';
                        for (var ji = 0; ji < cat.ids.length; ji++) {
                            var _appItem = appMap[cat.ids[ji]];
                            if (!_appItem) continue;
                            var _locked = _appItem.unlock > 0 && gameState.fans < _appItem.unlock;
                            var _rd = (!_locked) ? getAppRedDot(_appItem.id) : null;
                            catHtml += '<div class="app-item ' + (_locked ? 'locked' : '') + '" data-id="' + _appItem.id + '" onclick="if(!this.classList.contains(\'locked\'))goToPage(this.dataset.id)"' + '><div class="app-icon-wrap ' + (_locked ? 'locked' : '') + '">' + getIcon(_appItem.icon) + (_locked ? '<div class="app-lock">' + getIcon('lock') + '</div>' : '') + (_rd ? '<div class="app-red-dot' + (_rd > 1 ? ' has-count' : '') + '">' + (_rd > 1 ? _rd : '') + '</div>' : '') + '</div><div class="app-name">' + _appItem.name + '</div></div>';
                        }
                        catHtml += '</div>';
                    }
                    catHtml += '<div style="display:flex;justify-content:center;gap:8px;margin-top:16px;padding-bottom:8px;">';
                    catHtml += '<div style="width:8px;height:8px;border-radius:50%;background:' + (homePageNum === 1 ? 'var(--color-primary)' : '#DDD') + ';cursor:pointer;" onclick="gameState.homePageNum=1;render();"></div>';
                    catHtml += '<div style="width:8px;height:8px;border-radius:50%;background:' + (homePageNum === 2 ? 'var(--color-primary)' : '#DDD') + ';cursor:pointer;" onclick="gameState.homePageNum=2;render();"></div>';
                    catHtml += '</div>';
                    return catHtml;
                }()) + '\n            </div>\n        </div>\n    ';
}



// ==================== TRAINING PAGE ====================
function render训练Page(container) {
    var trainOptions = [
        { name: '舞蹈训练', stat: 'dance', statName: '舞蹈', cost: 20, moneyCost: 1000, gain: 2 },
        { name: '声乐训练', stat: 'vocal', statName: '声乐', cost: 20, moneyCost: 1000, gain: 2 },
        { name: '说唱训练', stat: 'rap', statName: '说唱', cost: 20, moneyCost: 1000, gain: 2 },
        { name: '表演训练', stat: 'acting', statName: '表演', cost: 20, moneyCost: 1000, gain: 2 },
        { name: '综艺训练', stat: 'variety', statName: '综艺', cost: 15, moneyCost: 800, gain: 2 },
        { name: '综合训练', stat: 'random', statName: '随机', cost: 30, moneyCost: 2000, gain: 3 }
    ];
    
    container.innerHTML = '\n        <div class="page active">\n            <div class="page-header">\n                <div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>\n                <div class="page-title">训练</div>\n                <div style="width: 32px;"></div>\n            </div>\n            <div class="page-content">\n                <div class="card" style="text-align: center; background: linear-gradient(135deg, var(--color-primary), var(--color-accent)); color: white;">\n                    <div style="font-size: 12px; opacity: 0.8;">当前体力</div>\n                    <div style="font-size: 28px; font-weight: 700;">' + (gameState.体力) + ' / ' + (gameState.max体力) + '</div>\n                </div>\n                \n                <div class="section-title" style="margin-top: 16px;">能力值</div>\n                <div class="card">\n                    ' + (Object.entries(gameState.stats).map(function(entry) { var key = entry[0]; var val = entry[1];
                        var names = { dance: '舞蹈', vocal: '声乐', rap: '说唱', acting: '表演', variety: '综艺' };
                        return '\n                            <div class="my-stat-bar">\n                                <span class="my-stat-label">' + (names[key]) + '</span>\n                                <div class="my-stat-track">\n                                    <div class="my-stat-fill ' + (key) + '" style="width: ' + (Math.min(100, (val / 150) * 100)) + '%;"></div>\n                                </div>\n                                <span class="my-stat-val">' + (val) + '</span>\n                            </div>\n                        ';
                    }).join('')) + '\n                </div>\n                \n                <div class="section-title" style="margin-top: 16px;">选择训练项目</div>\n                ' + (trainOptions.map(function(opt) { return '\n                    <div class="card" onclick="do训练项目(\'' + (opt.stat) + '\', ' + (opt.cost) + ', ' + (opt.moneyCost) + ', \'' + (opt.name) + '\')">\n                        <div style="display: flex; justify-content: space-between; align-items: center;">\n                            <div>\n                                <div style="font-weight: 600;">' + (opt.name) + '</div>\n                                <div style="font-size: 12px; color: var(--color-text-light);">体力 -' + (opt.cost) + ' | 金币 -' + (opt.moneyCost.toLocaleString()) + '</div>\n                            </div>\n                        </div>\n                    </div>\n                '}).join('')) + '\n                <div style="margin-top: 16px;">\n                    <button class="btn btn-outline btn-lg" onclick="goToPage(\'exam\')" style="width:100%;">去考核</button>\n                </div>\n                <div class="section-title" style="margin-top: 16px;">体力恢复</div>\n                <div class="card" id="restBtnCard" onclick="startRestRecovery()" style="text-align:center;cursor:pointer;">\n                    <div style="font-weight:600;">Rest 30s</div>\n                    <div style="font-size:12px;color:var(--color-text-light);">30秒不可操作，体力恢复至200</div>\n                </div>\n            </div>\n        </div>\n    ';
}

var _isTraining = false;
var _lastTrainTime = 0;
function do训练项目(stat, 体力cost, moneyCost, name) {
    var now = Date.now();
    if (_isTraining || now - _lastTrainTime < 1200) return;
    _isTraining = true;
    _lastTrainTime = now;
    setTimeout(function() { _isTraining = false; }, 1200);
    if (gameState.体力 < 体力cost) {
        showModal('体力不足', '请先休息恢复体力');
        return;
    }
    if (gameState.money < moneyCost) {
        showModal('金币不足', '金币不够支付训练费用');
        return;
    }
    
    gameState.体力 = Math.max(0, gameState.体力 - 体力cost);
    gameState.money -= moneyCost;
    
    if (stat === 'random') {
        var keys = Object.keys(gameState.stats);
        stat = keys[Math.floor(Math.random() * keys.length)];
        var names = { dance: '舞蹈', vocal: '声乐', rap: '说唱', acting: '表演', variety: '综艺' };
        name = names[stat] + '训练';
    }
    
    var gain = Math.floor(Math.random() * 16) + 5;
    gameState.stats[stat] = Math.min(150, gameState.stats[stat] + gain);
    gameState.influence = Math.min(200, (gameState.influence || 50) + Math.floor(Math.random() * 3) + 1);
    
    var names = { dance: '舞蹈', vocal: '声乐', rap: '说唱', acting: '表演', variety: '综艺' };
    showModal('训练完成', '-' + 体力cost + ' 体力\n-' + moneyCost.toLocaleString() + ' 金币\n+' + gain + ' ' + names[stat]);
    render();
}

function startRestRecovery() {
    if (isResting) return;
    if (gameState.体力 >= gameState.max体力) {
        showModal('体力已满', '当前体力已满，无需休息');
        return;
    }
    isResting = true;
    var remaining = 30;
    var restCard = document.getElementById('restBtnCard');
    if (restCard) {
        restCard.innerHTML = '<div style="font-weight:600;color:var(--color-primary);">恢复中...</div><div style="font-size:24px;font-weight:700;color:var(--color-primary);">' + remaining + 's</div><div style="font-size:12px;color:var(--color-text-light);">请勿操作</div>';
        restCard.onclick = null;
        restCard.style.cursor = 'default';
    }
    restCountdown = setInterval(function() {
        remaining--;
        if (remaining <= 0) {
            clearInterval(restCountdown);
            restCountdown = null;
            isResting = false;
            gameState.体力 = gameState.max体力;
            render();
            showModal('恢复完成', '体力已恢复至 ' + gameState.max体力);
            return;
        }
        var card = document.getElementById('restBtnCard');
        if (card) {
            card.innerHTML = '<div style="font-weight:600;color:var(--color-primary);">恢复中...</div><div style="font-size:24px;font-weight:700;color:var(--color-primary);">' + remaining + 's</div><div style="font-size:12px;color:var(--color-text-light);">请勿操作</div>';
        }
    }, 1000);
}

// ==================== EXAM SYSTEM ====================
var isExamInProgress = false;
var currentExamSubject = '';
var currentExamLevel = 0;
var currentExamAttempt = 0;

var rapQuestions = [
    { word: '梦想', options: ['飞翔', '食物', '鞋子', '墙壁'], answer: 0 },
    { word: '舞台', options: ['灯光', '厨房', '书包', '河流'], answer: 0 },
    { word: '节拍', options: ['节奏', '颜色', '天气', '书本'], answer: 0 },
    { word: '热血', options: ['沸腾', '冰冷', '安静', '沉睡'], answer: 0 },
    { word: '自由', options: ['翱翔', '束缚', '固定', '囚禁'], answer: 0 },
    { word: '传奇', options: ['故事', '数学', '家具', '规则'], answer: 0 },
    { word: '灵魂', options: ['歌唱', '吃饭', '睡觉', '奔跑'], answer: 0 },
    { word: '实力', options: ['证明', '隐藏', '放弃', '逃避'], answer: 0 },
    { word: '信仰', options: ['坚持', '怀疑', '忘却', '背叛'], answer: 0 },
    { word: '巅峰', options: ['征服', '退下', '停留', '坠落'], answer: 0 },
    { word: '突破', options: ['极限', '墙壁', '水面', '云层'], answer: 0 },
    { word: '天赋', options: ['闪耀', '暗淡', '消失', '沉没'], answer: 0 },
    { word: '汗水', options: ['浇灌', '蒸发', '冰冻', '流失'], answer: 0 },
    { word: '音浪', options: ['翻涌', '平息', '消失', '凝固'], answer: 0 },
    { word: '坚持', options: ['到底', '放弃', '犹豫', '退缩'], answer: 0 },
    { word: '风格', options: ['独特', '模仿', '抄袭', '跟风'], answer: 0 },
    { word: '节奏', options: ['律动', '混乱', '静止', '杂乱'], answer: 0 },
    { word: '态度', options: ['坚决', '软弱', '模糊', '摇摆'], answer: 0 }
];

var actingQuestions = [
    { scene: '得知自己首次登顶音放一位', options: ['激动落泪', '面无表情', '愤怒拍桌', '紧张颤抖'], answer: 0 },
    { scene: '练习生时期被导师严厉批评', options: ['哈哈大笑', '认真反思', '当场走人', '反唇相讥'], answer: 1 },
    { scene: '在综艺上被问到尴尬问题', options: ['沉默不语', '巧妙化解', '当场发火', '假装没听见'], answer: 1 },
    { scene: '看到粉丝为自己准备的惊喜', options: ['视而不见', '感动拥抱', '嫌弃推走', '淡淡点头'], answer: 1 },
    { scene: '队友受伤无法参加演出', options: ['幸灾乐祸', '担心关心', '毫不在乎', '暗自窃喜'], answer: 1 },
    { scene: '获得年度最佳新人奖', options: ['谦虚致谢', '骄傲炫耀', '拒绝领奖', '冷嘲热讽'], answer: 0 },
    { scene: '深夜练习到筋疲力尽', options: ['坚持到底', '直接放弃', '抱怨队友', '偷懒休息'], answer: 0 },
    { scene: '被私生饭跟踪', options: ['主动搭话', '冷静报警', '热情拥抱', '追上去理论'], answer: 1 },
    { scene: '新歌MV预告公开后反响平平', options: ['加倍努力', '无所谓', '责怪公司', '自暴自弃'], answer: 0 },
    { scene: '粉丝在签售会上送手写信', options: ['珍惜收好', '随手丢掉', '当场阅读', '转送他人'], answer: 2 },
    { scene: '综艺上需要即兴模仿前辈', options: ['认真模仿致敬', '拒绝参与', '恶意丑化', '敷衍了事'], answer: 0 },
    { scene: '团内出现矛盾', options: ['调解沟通', '煽风点火', '事不关己', '选择站队'], answer: 0 },
    { scene: '舞台失误差点摔倒', options: ['迅速恢复微笑继续', '停下来检查', '愤怒踢道具', '当场哭泣'], answer: 0 },
    { scene: '听到外界质疑你的实力', options: ['用实力回应', '在网上反击', '躲避舆论', '情绪崩溃'], answer: 0 },
    { scene: '年末颁奖礼候场时', options: ['默默复习动作', '和队友聊天放松', '紧张发抖', '打盹睡觉'], answer: 0 },
    { scene: '被安排不喜欢的概念风格', options: ['专业地尝试适应', '直接拒绝', '消极怠工', '到处抱怨'], answer: 0 }
];

var varietyQuestions = [
    { host: '主持人：最近有没有暗恋的人？', options: ['这个问题要保密哦~', '关你什么事', '有！就是现场这位', '我暗恋的人就在团里'], answer: 2 },
    { host: '主持人：你觉得团里谁最懒？', options: ['都挺勤快的', '那肯定是XX（开玩笑）', '我不想说', '大家懒的方向不一样'], answer: 1 },
    { host: '主持人：给我们展示一下特殊才能吧！', options: ['我没有才能', '来一段即兴freestyle', '让其他成员来', '展示一个翻跟头'], answer: 1 },
    { host: '主持人：如果世界末日最后一天做什么？', options: ['和家人在一起', '开演唱会', '什么都不做', '吃遍所有美食'], answer: 1 },
    { host: '主持人：手机里最近的自拍给我们看看？', options: ['大方展示', '藏起来不让看', '删掉最近的自拍', '给看一张滤镜最重的'], answer: 0 },
    { host: '主持人：最想和哪位前辈合作？', options: ['有很多想合作的', '说出具体前辈名字并表达尊敬', '不想和任何人合作', '和谁都行看缘分'], answer: 1 },
    { host: '主持人：团里谁是吃货担当？', options: ['大家都很能吃', '举荐一个成员并说趣事', '我们都不怎么吃', '吃货担当轮流当'], answer: 1 },
    { host: '主持人：最近有什么烦恼吗？', options: ['没有烦恼', '分享一个小烦恼然后用积极态度化解', '抱怨一堆', '烦恼就是总有这种问题'], answer: 1 },
    { host: '主持人：用一句话形容你的队友？', options: ['很好的人', '温暖的家人', '不想评价', '一个比一个有趣'], answer: 1 },
    { host: '主持人：下次回归想要什么概念？', options: ['听公司的', '分享自己的创意想法', '无所谓', '想尝试完全不同的风格'], answer: 1 },
    { host: '主持人：最难忘的舞台是哪个？', options: ['都很难忘', '说出具体舞台并分享感受', '不记得了', '下一个舞台才是最难忘的'], answer: 1 },
    { host: '主持人：给粉丝们说句心里话？', options: ['谢谢你们', '认真表达感谢和未来承诺', '没什么好说的', '你们的钱我收到了'], answer: 1 },
    { host: '主持人：听说你最近和某位偶像走得很近？', options: ['我们只是朋友', '大方澄清并转移话题', '生气拒绝回答', '沉默不语让气氛尴尬'], answer: 1 },
    { host: '主持人：团里谁是颜值TOP？', options: ['每个人都很帅/美', '开玩笑说是自己', '指名道姓选一个', '这个问题太危险了'], answer: 1 },
    { host: '主持人：如果可以拥有超能力选什么？', options: ['隐身术', '时间暂停', '读心术', '瞬间移动去见粉丝'], answer: 3 },
    { host: '主持人：出道至今最后悔的事是什么？', options: ['没有后悔的事', '分享一个真实的遗憾并表达成长', '后悔当爱豆', '后悔没多吃点'], answer: 1 }
];

var simonColors = ['#FF8FA3', '#FFD700', '#87CEEB', '#98FB98'];
var simonColorNames = ['粉', '金', '蓝', '绿'];

function _ensureExamState() {
    if (!gameState.certificates) {
        gameState.certificates = {
            dance: [false, false, false],
            vocal: [false, false, false],
            rap: [false, false, false],
            acting: [false, false, false],
            variety: [false, false, false]
        };
    }
    if (!gameState.examResult) {
        gameState.examResult = { comprehensive: [false, false] };
    }
    if (gameState.preDebut === undefined) {
        gameState.preDebut = false;
    }
}

function render考核Page(container) {
    _ensureExamState();
    var certs = gameState.certificates;
    var subjects = [
        { key: 'dance', name: '舞蹈', icon: 'D', color: '#FF6B8A' },
        { key: 'vocal', name: '声乐', icon: 'V', color: '#7EB6FF' },
        { key: 'rap', name: '说唱', icon: 'R', color: '#FFBE5C' },
        { key: 'acting', name: '表演', icon: 'A', color: '#B88AFF' },
        { key: 'variety', name: '综艺', icon: 'S', color: '#5CC9A7' }
    ];
    var levelNames = ['一级', '二级', '三级'];
    var allLevel3 = true;
    for (var si = 0; si < subjects.length; si++) {
        if (!certs[subjects[si].key][2]) { allLevel3 = false; break; }
    }
    var compDone = gameState.examResult.comprehensive[0] && gameState.examResult.comprehensive[1];

    var certCardsHtml = '';
    for (var si = 0; si < subjects.length; si++) {
        var s = subjects[si];
        var allObtained = certs[s.key][0] && certs[s.key][1] && certs[s.key][2];
        var obtainedCount = 0;
        for (var li = 0; li < 3; li++) { if (certs[s.key][li]) obtainedCount++; }
        var levelStr = '';
        for (var li = 0; li < 3; li++) {
            if (certs[s.key][li]) {
                levelStr += '<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:' + (allObtained ? 'linear-gradient(135deg,#FFD700,#FFA500)' : 'var(--color-primary)') + ';color:white;font-size:10px;font-weight:700;line-height:22px;text-align:center;margin:0 1px;">' + (li+1) + '</span>';
            } else {
                levelStr += '<span style="display:inline-block;width:18px;height:18px;border-radius:50%;border:2px solid var(--color-border);color:var(--color-text-light);font-size:10px;font-weight:600;line-height:22px;text-align:center;margin:0 1px;">' + (li+1) + '</span>';
            }
        }
        var progressPct = Math.floor(obtainedCount / 3 * 100);
        var certBg = allObtained ? 'background:linear-gradient(135deg,rgba(255,143,163,0.12),rgba(255,179,193,0.08));border:1.5px solid var(--color-primary);' : 'background:var(--bg-card);border:1.5px solid var(--color-border);';
        certCardsHtml += '<div class="exam-cert-card ' + (allObtained ? 'obtained' : '') + '" style="' + certBg + 'border-radius:12px;padding:12px;">'
            + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">'
            + '<div class="cert-icon" style="background:' + (allObtained ? 'linear-gradient(135deg,#FFD700,#FFA500)' : s.color) + ';color:white;font-weight:700;font-size:14px;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;">' + s.icon + '</div>'
            + '<div style="flex:1;">'
            + '<div class="cert-name" style="font-weight:600;font-size:13px;">' + s.name + (allObtained ? ' <span style="font-size:10px;color:#FFD700;">MASTER</span>' : '') + '</div>'
            + '<div style="font-size:10px;color:var(--color-text-light);margin-top:2px;">' + obtainedCount + '/3 \u5df2\u901a\u8fc7</div>'
            + '</div></div>'
            + '<div style="display:flex;justify-content:center;gap:4px;margin-bottom:10px;">' + levelStr + '</div>'
            + '<div style="height:6px;background:var(--color-border);border-radius:3px;overflow:hidden;">'
            + '<div style="height:100%;width:' + progressPct + '%;background:' + (allObtained ? 'linear-gradient(90deg,#FFD700,#FFA500)' : 'linear-gradient(90deg,var(--color-primary),var(--color-accent))') + ';border-radius:2px;"></div>'
            + '</div>'
            + '</div>';
    }
    var examEntriesHtml = '';
    for (var si = 0; si < subjects.length; si++) {
        var s = subjects[si];
        var statVal = gameState.stats[s.key];
        var nextLevel = -1;
        for (var li = 0; li < 3; li++) {
            if (!certs[s.key][li]) { nextLevel = li; break; }
        }
        if (nextLevel === -1) {
            examEntriesHtml += '<div class="exam-entry locked">'
                + '<div class="exam-entry-left">'
                + '<div class="exam-entry-title"><span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:' + s.color + ';color:white;font-size:11px;font-weight:700;line-height:20px;text-align:center;margin-right:6px;">' + s.icon + '</span>' + s.name + ' - 已全部通过</div>'
                + '<div class="exam-entry-sub">恭喜！该科目三级合格证已全部获得</div>'
                + '</div>'
                + '<div class="exam-entry-right" style="color:var(--color-success);">✓ 完成</div>'
                + '</div>';
        } else {
            var canTake = statVal >= 105 && gameState.money >= 300;
            var lockReason = '';
            if (statVal < 105) lockReason = '需' + s.name + '≥105（当前' + statVal + '）';
            else if (gameState.money < 300) lockReason = '金币不足300';
            examEntriesHtml += '<div class="exam-entry ' + (canTake ? '' : 'locked') + '" onclick="' + (canTake ? "startExam('" + s.key + "'," + nextLevel + ")" : '') + '">'
                + '<div class="exam-entry-left">'
                + '<div class="exam-entry-title"><span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:' + s.color + ';color:white;font-size:11px;font-weight:700;line-height:20px;text-align:center;margin-right:6px;">' + s.icon + '</span>' + s.name + ' - ' + levelNames[nextLevel] + '合格证</div>'
                + '<div class="exam-entry-sub">' + (lockReason ? lockReason : '能力值满足 · 300金币/次') + '</div>'
                + '</div>'
                + '<div class="exam-entry-right">' + (canTake ? '参加考试 ›' : '未满足') + '</div>'
                + '</div>';
        }
    }

    var compHtml = '';
    if (gameState.preDebut) {
        compHtml = '<div class="exam-comprehensive-entry unlocked" style="border-color:var(--color-success);background:linear-gradient(135deg,rgba(76,217,100,0.1),rgba(76,217,100,0.2));">'
            + '<div style="font-size:28px;margin-bottom:8px;color:var(--color-success);font-weight:700;">PASS</div>'
            + '<div style="font-size:16px;font-weight:700;color:var(--color-success);">预备出道！</div>'
            + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">综合考试已通过，预备出道状态</div>'
            + '</div>';
    } else if (compDone) {
        compHtml = '<div class="exam-comprehensive-entry unlocked" style="border-color:var(--color-success);">'
            + '<div style="font-size:16px;font-weight:700;color:var(--color-success);">✓ 综合考试已通过</div></div>';
    } else if (allLevel3) {
        var nextComp = gameState.examResult.comprehensive[0] ? 1 : 0;
        var needScore = nextComp === 0 ? '3/5' : '4/5';
        compHtml = '<div class="exam-comprehensive-entry unlocked" data-nextComp="' + nextComp + '" onclick="startComprehensiveExam(this.dataset.nextComp)">'
            + '<div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#FF8FA3,#FFB3C1);color:white;font-weight:700;font-size:12px;line-height:32px;text-align:center;margin:0 auto 8px;">F</div>'
            + '<div style="font-size:16px;font-weight:700;color:var(--color-primary);">综合考试 - 第' + (nextComp + 1) + '次</div>'
            + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">5科各出1题，需答对' + needScore + '以上 · 300金币</div>'
            + '</div>';
    } else {
        compHtml = '<div class="exam-comprehensive-entry locked">'
            + '<div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#FF8FA3,#FFB3C1);color:white;font-weight:700;font-size:12px;line-height:32px;text-align:center;margin:0 auto 8px;">F</div>'
            + '<div style="font-size:16px;font-weight:700;color:var(--color-text-light);">综合考试</div>'
            + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">需5科三级合格证全部获得后解锁</div>'
            + '</div>';
    }

    var preDebutTag = gameState.preDebut ? '<span class="pre-debut-badge">预备出道</span>' : '';

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">考核' + preDebutTag + '</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="section-title">合格证状态</div>'
        + '<div class="exam-subject-row">' + certCardsHtml + '</div>'
        + '<div class="section-title" style="margin-top:16px;">可参加考试</div>'
        + examEntriesHtml
        + compHtml
        + renderWeeklyMonthlyExamSection()
        + '</div></div>';
}

function startExam(subject, level) {
    _ensureExamState();
    var statVal = gameState.stats[subject];
    if (statVal < 105) {
        showModal('无法参加', '该科目能力值需达到105才能参加考试（当前：' + statVal + '）');
        return;
    }
    if (gameState.money < 300) {
        showModal('金币不足', '参加考试需要300金币');
        return;
    }
    gameState.money -= 300;
    isExamInProgress = true;
    currentExamSubject = subject;
    currentExamLevel = level;
    currentPage = 'examGame';
    render();
}

function startComprehensiveExam(attempt) {
    _ensureExamState();
    if (gameState.money < 300) {
        showModal('金币不足', '参加综合考试需要300金币');
        return;
    }
    gameState.money -= 300;
    isExamInProgress = true;
    currentExamSubject = 'comprehensive';
    currentExamLevel = attempt;
    currentPage = 'examGame';
    render();
}

function renderExamGamePage(container) {
    _ensureExamState();
    var subject = currentExamSubject;
    var level = currentExamLevel;

    if (subject === 'dance') {
        renderDanceExam(container, level);
    } else if (subject === 'vocal') {
        renderVocalExam(container, level);
    } else if (subject === 'rap') {
        renderRapExam(container, level);
    } else if (subject === 'acting') {
        renderActingExam(container, level);
    } else if (subject === 'variety') {
        renderVarietyExam(container, level);
    } else if (subject === 'comprehensive') {
        renderComprehensiveExam(container, level);
    }
}

function passExam(subject, level) {
    _ensureExamState();
    if (subject === 'comprehensive') {
        gameState.examResult.comprehensive[level] = true;
        if (gameState.examResult.comprehensive[0] && gameState.examResult.comprehensive[1]) {
            gameState.preDebut = true;
            triggerSilentSave();
        }
    } else {
        gameState.certificates[subject][level] = true;
    }
    isExamInProgress = false;
}

function failExam() {
    isExamInProgress = false;
}

function _examResultHtml(passed, title, sub) {
    var icon = passed ? 'PASS' : 'FAIL';
    var color = passed ? 'var(--color-success)' : 'var(--color-danger)';
    var btnText = passed ? '太好了！' : '再接再厉';
    return '<div class="exam-result-overlay">'
        + '<div class="exam-result-box">'
        + '<div class="exam-result-icon">' + icon + '</div>'
        + '<div class="exam-result-title" style="color:' + color + ';">' + title + '</div>'
        + '<div class="exam-result-sub">' + sub + '</div>'
        + '<button class="btn btn-primary btn-lg" onclick="_finishExam(' + (passed ? 'true' : 'false') + ')">' + btnText + '</button>'
        + '</div></div>';
}

function _finishExam(passed) {
    if (passed) {
        passExam(currentExamSubject, currentExamLevel);
    } else {
        failExam();
    }
    currentPage = 'exam';
    render();
}

// ==================== DANCE EXAM - Rhythm Click ====================
function renderDanceExam(container, level) {
    var levelNames = ['一级', '二级', '三级'];
    var speeds = [1100, 800, 500];
    var speed = speeds[level];
    var round = 0;
    var totalRounds = 5;
    var totalDots = 12;
    var totalHits = 0;
    var totalAttempts = 0;
    var currentLitIndex = -1;
    var roundHits = 0;
    var roundActive = false;
    var roundTimeout = null;
    var dotTimeout = null;

    var dotsHtml = '';
    for (var i = 0; i < totalDots; i++) {
        dotsHtml += '<div class="rhythm-dot" id="rdot' + i + '" data-i="' + i + '" onclick="_hitDanceDot(this.dataset.i)"></div>';
    }

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="page-title">舞蹈考试 - ' + levelNames[level] + '</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content" style="text-align:center;">'
        + '<div class="card" style="background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">节奏点击</div>'
        + '<div style="font-size:16px;margin-top:4px;">第 <span id="dRound">1</span> / ' + totalRounds + ' 轮</div>'
        + '</div>'
        + '<div style="margin:16px 0;font-size:14px;color:var(--color-text-light);">点击亮起的圆点！5轮共需点中30个以上</div>'
        + '<div class="rhythm-container" id="rhythmContainer">' + dotsHtml + '</div>'
        + '<div style="font-size:20px;font-weight:700;color:var(--color-text);margin-top:12px;">命中: <span id="dScore">0</span></div>'
        + '<div id="dExamResult"></div>'
        + '</div></div>';

    function startRound() {
        roundHits = 0;
        currentLitIndex = -1;
        roundActive = true;
        var dotIndex = 0;

        function lightNext() {
            if (!roundActive || dotIndex >= totalDots) {
                roundActive = false;
                totalHits += roundHits;
                round++;
                var el = document.getElementById('dRound');
                var scoreEl = document.getElementById('dScore');
                if (scoreEl) scoreEl.textContent = totalHits;
                if (round >= totalRounds) {
                    finishDanceExam();
                } else if (el) {
                    el.textContent = (round + 1);
                    setTimeout(startRound, 800);
                }
                return;
            }
            for (var ci = 0; ci < totalDots; ci++) {
                var dot = document.getElementById('rdot' + ci);
                if (dot) {
                    dot.className = 'rhythm-dot';
                    dot.textContent = '';
                }
            }
            currentLitIndex = dotIndex;
            var litDot = document.getElementById('rdot' + dotIndex);
            if (litDot) litDot.className = 'rhythm-dot lit';
            dotIndex++;
            dotTimeout = setTimeout(lightNext, speed);
        }
        lightNext();
    }

    window._hitDanceDot = function(idx) {
        if (!roundActive) return;
        var dot = document.getElementById('rdot' + idx);
        if (!dot) return;
        if (idx === currentLitIndex) {
            dot.className = 'rhythm-dot hit';
            dot.textContent = '✓';
            roundHits++;
            var scoreEl = document.getElementById('dScore');
            if (scoreEl) scoreEl.textContent = totalHits + roundHits;
            currentLitIndex = -1;
        } else if (dot.className.indexOf('lit') === -1 && dot.className.indexOf('hit') === -1) {
            dot.className = 'rhythm-dot miss';
            dot.textContent = '✗';
        }
    };

    function finishDanceExam() {
        var passed = totalHits >= 30;
        var levelNames2 = ['一级', '二级', '三级'];
        var resEl = document.getElementById('dExamResult');
        if (resEl) {
            resEl.innerHTML = _examResultHtml(
                passed,
                passed ? '合 格' : '不合格',
                '命中 ' + totalHits + ' / ' + (totalDots * totalRounds) + (passed ? '\n' + levelNames2[level] + '合格证已获得！' : '\n需命中30个以上，继续加油！')
            );
        }
    }

    _addTimer(setTimeout(function() { startRound(); }, 500));
}

// ==================== VOCAL EXAM - Simon Memory ====================
function renderVocalExam(container, level) {
    var levelNames = ['一级', '二级', '三级'];
    var seqLen = [6, 7, 8][level];
    var sequence = [];
    var playerSeq = [];
    var isShowing = false;

    for (var i = 0; i < seqLen; i++) {
        sequence.push(Math.floor(Math.random() * 4));
    }

    var padsHtml = '';
    for (var i = 0; i < 4; i++) {
        padsHtml += '<div class="simon-pad" id="spad' + i + '" style="background:' + simonColors[i] + ';" data-i="' + i + '" onclick="_simonClick(this.dataset.i)"></div>';
    }

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="page-title">声乐考试 - ' + levelNames[level] + '</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content" style="text-align:center;">'
        + '<div class="card" style="background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">音高记忆</div>'
        + '<div style="font-size:16px;margin-top:4px;">记住顺序，按序点击（' + seqLen + '个音）</div>'
        + '</div>'
        + '<div style="margin:16px 0;font-size:14px;color:var(--color-text-light);" id="simonStatus">正在播放序列...</div>'
        + '<div class="simon-grid" id="simonGrid">' + padsHtml + '</div>'
        + '<div style="font-size:14px;color:var(--color-text-light);margin-top:12px;" id="simonProgress">0 / ' + seqLen + '</div>'
        + '<div id="vExamResult"></div>'
        + '</div></div>';

    function showSequence() {
        isShowing = true;
        var idx = 0;
        function lightOne() {
            if (idx >= sequence.length) {
                isShowing = false;
                var st = document.getElementById('simonStatus');
                if (st) st.textContent = '轮到你了！按顺序点击';
                return;
            }
            for (var ci = 0; ci < 4; ci++) {
                var pad = document.getElementById('spad' + ci);
                if (pad) pad.className = 'simon-pad';
            }
            var pad = document.getElementById('spad' + sequence[idx]);
            if (pad) pad.className = 'simon-pad lit';
            idx++;
            _addTimer(setTimeout(function() {
                for (var ci = 0; ci < 4; ci++) {
                    var p = document.getElementById('spad' + ci);
                    if (p) p.className = 'simon-pad';
                }
                _addTimer(setTimeout(lightOne, 300));
            }, 600));
        }
        _addTimer(setTimeout(lightOne, 800));
    }

    window._simonClick = function(idx) {
        if (isShowing) return;
        var pad = document.getElementById('spad' + idx);
        if (pad) {
            pad.className = 'simon-pad lit';
            setTimeout(function() { if (pad) pad.className = 'simon-pad'; }, 200);
        }
        playerSeq.push(idx);
        var pos = playerSeq.length - 1;
        var progEl = document.getElementById('simonProgress');
        if (progEl) progEl.textContent = playerSeq.length + ' / ' + seqLen;

        if (playerSeq[pos] !== sequence[pos]) {
            var resEl = document.getElementById('vExamResult');
            if (resEl) {
                resEl.innerHTML = _examResultHtml(false, '不合格', '序列记错了！再试一次吧');
            }
            return;
        }
        if (playerSeq.length === sequence.length) {
            var resEl2 = document.getElementById('vExamResult');
            if (resEl2) {
                resEl2.innerHTML = _examResultHtml(true, '合 格', '音高记忆完美！' + levelNames[level] + '合格证已获得！');
            }
        }
    };

    _addTimer(setTimeout(showSequence, 500));
}

// ==================== RAP EXAM - Word Chain ====================
function renderRapExam(container, level) {
    var levelNames = ['一级', '二级', '三级'];
    var qCounts = [3, 4, 5];
    var passCounts = [2, 3, 4];
    var totalQ = qCounts[level];
    var needCorrect = passCounts[level];

    var shuffled = rapQuestions.slice().sort(function() { return Math.random() - 0.5; });
    var questions = shuffled.slice(0, totalQ);
    var currentQ = 0;
    var correctCount = 0;
    var answered = false;

    function showQuestion() {
        if (currentQ >= totalQ) {
            finishQuiz();
            return;
        }
        answered = false;
        var q = questions[currentQ];
        var optionsHtml = '';
        for (var oi = 0; oi < q.options.length; oi++) {
            optionsHtml += '<div class="quiz-option" id="rapOpt' + oi + '" data-oi="' + oi + '" onclick="_rapAnswer(this.dataset.oi)">'
                + q.options[oi] + '</div>';
        }
        var qArea = document.getElementById('rapQArea');
        if (qArea) {
            qArea.innerHTML = '<div class="card" style="text-align:center;">'
                + '<div style="font-size:12px;color:var(--color-text-light);">第 ' + (currentQ + 1) + ' / ' + totalQ + ' 题</div>'
                + '<div style="font-size:20px;font-weight:700;margin-top:8px;color:var(--color-text);">' + q.word + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">选择能接上的词</div>'
                + '</div>'
                + optionsHtml;
        }
    }

    window._rapAnswer = function(idx) {
        if (answered) return;
        answered = true;
        var q = questions[currentQ];
        var correct = idx === q.answer;
        if (correct) correctCount++;
        var el = document.getElementById('rapOpt' + idx);
        if (el) el.className = 'quiz-option ' + (correct ? 'selected-correct' : 'selected-wrong');
        if (!correct) {
            var correctEl = document.getElementById('rapOpt' + q.answer);
            if (correctEl) correctEl.className = 'quiz-option selected-correct';
        }
        currentQ++;
        _addTimer(setTimeout(showQuestion, 1000));
    };

    function finishQuiz() {
        var passed = correctCount >= needCorrect;
        var resEl = document.getElementById('rapQArea');
        if (resEl) {
            resEl.innerHTML = _examResultHtml(
                passed, passed ? '合 格' : '不合格',
                '答对 ' + correctCount + ' / ' + totalQ + (passed ? '\n' + levelNames[level] + '合格证已获得！' : '\n需答对' + needCorrect + '题以上')
            );
        }
    }

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="page-title">说唱考试 - ' + levelNames[level] + '</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">词语接龙</div>'
        + '<div style="font-size:14px;margin-top:4px;">答对' + needCorrect + '题/' + totalQ + '题即合格</div>'
        + '</div>'
        + '<div id="rapQArea"></div>'
        + '</div></div>';

    _addTimer(setTimeout(showQuestion, 300));
}

// ==================== ACTING EXAM - Expression Choice ====================
function renderActingExam(container, level) {
    var levelNames = ['一级', '二级', '三级'];
    var qCounts = [3, 4, 5];
    var passCounts = [2, 3, 4];
    var totalQ = qCounts[level];
    var needCorrect = passCounts[level];

    var shuffled = actingQuestions.slice().sort(function() { return Math.random() - 0.5; });
    var questions = shuffled.slice(0, totalQ);
    var currentQ = 0;
    var correctCount = 0;
    var answered = false;

    function showQuestion() {
        if (currentQ >= totalQ) {
            finishQuiz();
            return;
        }
        answered = false;
        var q = questions[currentQ];
        var optionsHtml = '';
        for (var oi = 0; oi < q.options.length; oi++) {
            optionsHtml += '<div class="quiz-option" id="actOpt' + oi + '" data-oi="' + oi + '" onclick="_actAnswer(this.dataset.oi)">'
                + q.options[oi] + '</div>';
        }
        var qArea = document.getElementById('actQArea');
        if (qArea) {
            qArea.innerHTML = '<div class="card" style="text-align:center;">'
                + '<div style="font-size:12px;color:var(--color-text-light);">第 ' + (currentQ + 1) + ' / ' + totalQ + ' 题</div>'
                + '<div style="font-size:16px;font-weight:600;margin-top:8px;color:var(--color-text);">' + q.scene + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">选择正确的表情/反应</div>'
                + '</div>'
                + optionsHtml;
        }
    }

    window._actAnswer = function(idx) {
        if (answered) return;
        answered = true;
        var q = questions[currentQ];
        var correct = idx === q.answer;
        if (correct) correctCount++;
        var el = document.getElementById('actOpt' + idx);
        if (el) el.className = 'quiz-option ' + (correct ? 'selected-correct' : 'selected-wrong');
        if (!correct) {
            var correctEl = document.getElementById('actOpt' + q.answer);
            if (correctEl) correctEl.className = 'quiz-option selected-correct';
        }
        currentQ++;
        _addTimer(setTimeout(showQuestion, 1000));
    };

    function finishQuiz() {
        var passed = correctCount >= needCorrect;
        var resEl = document.getElementById('actQArea');
        if (resEl) {
            resEl.innerHTML = _examResultHtml(
                passed, passed ? '合 格' : '不合格',
                '答对 ' + correctCount + ' / ' + totalQ + (passed ? '\n' + levelNames[level] + '合格证已获得！' : '\n需答对' + needCorrect + '题以上')
            );
        }
    }

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="page-title">表演考试 - ' + levelNames[level] + '</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">表情选择</div>'
        + '<div style="font-size:14px;margin-top:4px;">答对' + needCorrect + '题/' + totalQ + '题即合格</div>'
        + '</div>'
        + '<div id="actQArea"></div>'
        + '</div></div>';

    _addTimer(setTimeout(showQuestion, 300));
}

// ==================== VARIETY EXAM - Improv Response ====================
function renderVarietyExam(container, level) {
    var levelNames = ['一级', '二级', '三级'];
    var qCounts = [3, 4, 5];
    var passCounts = [2, 3, 4];
    var totalQ = qCounts[level];
    var needCorrect = passCounts[level];

    var shuffled = varietyQuestions.slice().sort(function() { return Math.random() - 0.5; });
    var questions = shuffled.slice(0, totalQ);
    var currentQ = 0;
    var correctCount = 0;
    var answered = false;

    function showQuestion() {
        if (currentQ >= totalQ) {
            finishQuiz();
            return;
        }
        answered = false;
        var q = questions[currentQ];
        var optionsHtml = '';
        for (var oi = 0; oi < q.options.length; oi++) {
            optionsHtml += '<div class="quiz-option" id="varOpt' + oi + '" data-oi="' + oi + '" onclick="_varAnswer(this.dataset.oi)">'
                + q.options[oi] + '</div>';
        }
        var qArea = document.getElementById('varQArea');
        if (qArea) {
            qArea.innerHTML = '<div class="card" style="text-align:center;">'
                + '<div style="font-size:12px;color:var(--color-text-light);">第 ' + (currentQ + 1) + ' / ' + totalQ + ' 题</div>'
                + '<div style="font-size:14px;font-weight:600;margin-top:8px;color:var(--color-text);">' + q.host + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">选择最佳回应</div>'
                + '</div>'
                + optionsHtml;
        }
    }

    window._varAnswer = function(idx) {
        if (answered) return;
        answered = true;
        var q = questions[currentQ];
        var correct = idx === q.answer;
        if (correct) correctCount++;
        var el = document.getElementById('varOpt' + idx);
        if (el) el.className = 'quiz-option ' + (correct ? 'selected-correct' : 'selected-wrong');
        if (!correct) {
            var correctEl = document.getElementById('varOpt' + q.answer);
            if (correctEl) correctEl.className = 'quiz-option selected-correct';
        }
        currentQ++;
        _addTimer(setTimeout(showQuestion, 1000));
    };

    function finishQuiz() {
        var passed = correctCount >= needCorrect;
        var resEl = document.getElementById('varQArea');
        if (resEl) {
            resEl.innerHTML = _examResultHtml(
                passed, passed ? '合 格' : '不合格',
                '答对 ' + correctCount + ' / ' + totalQ + (passed ? '\n' + levelNames[level] + '合格证已获得！' : '\n需答对' + needCorrect + '题以上')
            );
        }
    }

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="page-title">综艺考试 - ' + levelNames[level] + '</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">即兴回应</div>'
        + '<div style="font-size:14px;margin-top:4px;">答对' + needCorrect + '题/' + totalQ + '题即合格</div>'
        + '</div>'
        + '<div id="varQArea"></div>'
        + '</div></div>';

    _addTimer(setTimeout(showQuestion, 300));
}

// ==================== COMPREHENSIVE EXAM - Mixed Challenge ====================
function renderComprehensiveExam(container, attempt) {
    var needCorrect = attempt === 0 ? 5 : 6;
    var totalQuestions = 7;
    var currentQ = 0;
    var correctCount = 0;
    var answered = false;

    var subjects = ['dance', 'vocal', 'rap', 'acting', 'variety'];
    var subjectNames = { dance: '舞蹈', vocal: '声乐', rap: '说唱', acting: '表演', variety: '综艺' };
    var subjectIcons = { dance: 'D', vocal: 'V', rap: 'R', acting: 'A', variety: 'S' };
    var subjectColors = { dance: '#FF6B8A', vocal: '#7EB6FF', rap: '#FFBE5C', acting: '#B88AFF', variety: '#5CC9A7' };
    var mixedQuestions = [];

    for (var si = 0; si < subjects.length; si++) {
        var subj = subjects[si];
        if (subj === 'dance') {
            var seq = [];
            for (var di = 0; di < 4; di++) {
                seq.push(Math.floor(Math.random() * 12));
            }
            mixedQuestions.push({ type: 'dance', data: seq });
        } else if (subj === 'vocal') {
            var vseq = [];
            for (var vi = 0; vi < 4; vi++) {
                vseq.push(Math.floor(Math.random() * 4));
            }
            mixedQuestions.push({ type: 'vocal', data: vseq });
        } else if (subj === 'rap') {
            var rq = rapQuestions[Math.floor(Math.random() * rapQuestions.length)];
            mixedQuestions.push({ type: 'rap', data: rq });
        } else if (subj === 'acting') {
            var aq = actingQuestions[Math.floor(Math.random() * actingQuestions.length)];
            mixedQuestions.push({ type: 'acting', data: aq });
        } else if (subj === 'variety') {
            var vq = varietyQuestions[Math.floor(Math.random() * varietyQuestions.length)];
            mixedQuestions.push({ type: 'variety', data: vq });
        }
    }
    var extraSubjects = ['rap', 'acting', 'variety'];
    for (var ei = 0; ei < 2; ei++) {
        var es = extraSubjects[ei];
        if (es === 'rap') {
            var rq2 = rapQuestions[Math.floor(Math.random() * rapQuestions.length)];
            mixedQuestions.push({ type: 'rap', data: rq2 });
        } else if (es === 'acting') {
            var aq2 = actingQuestions[Math.floor(Math.random() * actingQuestions.length)];
            mixedQuestions.push({ type: 'acting', data: aq2 });
        } else {
            var vq2 = varietyQuestions[Math.floor(Math.random() * varietyQuestions.length)];
            mixedQuestions.push({ type: 'variety', data: vq2 });
        }
    }

    function showQuestion() {
        if (currentQ >= mixedQuestions.length) {
            finishCompExam();
            return;
        }
        answered = false;
        var mq = mixedQuestions[currentQ];
        var qArea = document.getElementById('compQArea');
        if (!qArea) return;

        var header = '<div style="font-size:12px;color:var(--color-text-light);margin-bottom:12px;">第 ' + (currentQ + 1) + ' / ' + totalQuestions + ' 题 · <span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:' + subjectColors[mq.type] + ';color:white;font-size:9px;font-weight:700;line-height:16px;text-align:center;vertical-align:middle;">' + subjectIcons[mq.type] + '</span> ' + subjectNames[mq.type] + '</div>';

        if (mq.type === 'dance') {
            var dotsHtml = '';
            for (var i = 0; i < 12; i++) {
                dotsHtml += '<div class="rhythm-dot" id="cdot' + i + '" data-i="' + i + '" onclick="_compDanceHit(this.dataset.i)"></div>';
            }
            qArea.innerHTML = header
                + '<div style="font-size:14px;color:var(--color-text-light);margin-bottom:12px;">记住亮起的顺序，然后按序点击</div>'
                + '<div class="rhythm-container" id="compRhythm">' + dotsHtml + '</div>'
                + '<div id="compDanceStatus" style="font-size:13px;color:var(--color-primary);">观看序列...</div>';
            _showCompDanceSeq(mq.data);
        } else if (mq.type === 'vocal') {
            var padsHtml = '';
            for (var i = 0; i < 4; i++) {
                padsHtml += '<div class="simon-pad" id="cspad' + i + '" style="background:' + simonColors[i] + ';" data-i="' + i + '" onclick="_compSimonClick(this.dataset.i)"></div>';
            }
            qArea.innerHTML = header
                + '<div style="font-size:14px;color:var(--color-text-light);margin-bottom:8px;">记住音高顺序，按序点击</div>'
                + '<div id="compSimonStatus" style="font-size:13px;color:var(--color-primary);margin-bottom:8px;">观看序列...</div>'
                + '<div class="simon-grid">' + padsHtml + '</div>';
            _showCompSimonSeq(mq.data);
        } else if (mq.type === 'rap' || mq.type === 'acting' || mq.type === 'variety') {
            var q = mq.data;
            var prompt = '';
            if (mq.type === 'rap') prompt = '接龙词: <b>' + q.word + '</b>';
            else if (mq.type === 'acting') prompt = '' + q.scene;
            else prompt = q.host;

            var optionsHtml = '';
            for (var oi = 0; oi < q.options.length; oi++) {
                optionsHtml += '<div class="quiz-option" id="compOpt' + oi + '" data-oi="' + oi + '" onclick="_compQuizAnswer(this.dataset.oi)">'
                    + q.options[oi] + '</div>';
            }
            qArea.innerHTML = header
                + '<div class="card" style="text-align:center;">'
                + '<div style="font-size:15px;font-weight:600;color:var(--color-text);">' + prompt + '</div>'
                + '</div>'
                + optionsHtml;
        }
    }

    var compDancePlayerSeq = [];
    var compDanceShowing = true;
    window._showCompDanceSeq = function(seq) {
        compDanceShowing = true;
        compDancePlayerSeq = [];
        var idx = 0;
        function lightOne() {
            for (var ci = 0; ci < 12; ci++) {
                var d = document.getElementById('cdot' + ci);
                if (d) { d.className = 'rhythm-dot'; d.textContent = ''; }
            }
            if (idx >= seq.length) {
                compDanceShowing = false;
                var st = document.getElementById('compDanceStatus');
                if (st) st.textContent = '轮到你了！按顺序点击';
                return;
            }
            var d = document.getElementById('cdot' + seq[idx]);
            if (d) d.className = 'rhythm-dot lit';
            idx++;
            _addTimer(setTimeout(function() {
                for (var ci = 0; ci < 12; ci++) {
                    var dd = document.getElementById('cdot' + ci);
                    if (dd) dd.className = 'rhythm-dot';
                }
                _addTimer(setTimeout(lightOne, 300));
            }, 600));
        }
        _addTimer(setTimeout(lightOne, 500));
    };

    window._compDanceHit = function(idx) {
        if (compDanceShowing) return;
        compDancePlayerSeq.push(idx);
        var pos = compDancePlayerSeq.length - 1;
        var seq = mixedQuestions[currentQ].data;
        var dot = document.getElementById('cdot' + idx);
        if (compDancePlayerSeq[pos] === seq[pos]) {
            if (dot) { dot.className = 'rhythm-dot hit'; dot.textContent = '✓'; }
        } else {
            if (dot) { dot.className = 'rhythm-dot miss'; dot.textContent = '✗'; }
            answered = true;
            _addTimer(setTimeout(function() { currentQ++; showQuestion(); }, 800));
            return;
        }
        if (compDancePlayerSeq.length === seq.length) {
            correctCount++;
            answered = true;
            _addTimer(setTimeout(function() { currentQ++; showQuestion(); }, 800));
        }
    };

    var compSimonPlayerSeq = [];
    var compSimonShowing = true;
    window._showCompSimonSeq = function(seq) {
        compSimonShowing = true;
        compSimonPlayerSeq = [];
        var idx = 0;
        function lightOne() {
            for (var ci = 0; ci < 4; ci++) {
                var p = document.getElementById('cspad' + ci);
                if (p) p.className = 'simon-pad';
            }
            if (idx >= seq.length) {
                compSimonShowing = false;
                var st = document.getElementById('compSimonStatus');
                if (st) st.textContent = '轮到你了！按顺序点击';
                return;
            }
            var p = document.getElementById('cspad' + seq[idx]);
            if (p) p.className = 'simon-pad lit';
            idx++;
            _addTimer(setTimeout(function() {
                for (var ci = 0; ci < 4; ci++) {
                    var pp = document.getElementById('cspad' + ci);
                    if (pp) pp.className = 'simon-pad';
                }
                _addTimer(setTimeout(lightOne, 300));
            }, 600));
        }
        _addTimer(setTimeout(lightOne, 500));
    };

    window._compSimonClick = function(idx) {
        if (compSimonShowing) return;
        compSimonPlayerSeq.push(idx);
        var pos = compSimonPlayerSeq.length - 1;
        var seq = mixedQuestions[currentQ].data;
        var pad = document.getElementById('cspad' + idx);
        if (pad) { pad.className = 'simon-pad lit'; setTimeout(function() { if (pad) pad.className = 'simon-pad'; }, 200); }
        if (compSimonPlayerSeq[pos] !== seq[pos]) {
            answered = true;
            _addTimer(setTimeout(function() { currentQ++; showQuestion(); }, 800));
            return;
        }
        if (compSimonPlayerSeq.length === seq.length) {
            correctCount++;
            answered = true;
            _addTimer(setTimeout(function() { currentQ++; showQuestion(); }, 800));
        }
    };

    window._compQuizAnswer = function(idx) {
        if (answered) return;
        answered = true;
        var mq = mixedQuestions[currentQ];
        var q = mq.data;
        var correct = idx === q.answer;
        if (correct) correctCount++;
        var el = document.getElementById('compOpt' + idx);
        if (el) el.className = 'quiz-option ' + (correct ? 'selected-correct' : 'selected-wrong');
        if (!correct) {
            var correctEl = document.getElementById('compOpt' + q.answer);
            if (correctEl) correctEl.className = 'quiz-option selected-correct';
        }
        currentQ++;
        _addTimer(setTimeout(showQuestion, 1000));
    };

    function finishCompExam() {
        var passed = correctCount >= needCorrect;
        var resEl = document.getElementById('compQArea');
        if (resEl) {
            var sub = '答对 ' + correctCount + ' / ' + totalQuestions;
            if (passed) {
                sub += '\n综合考试第' + (attempt + 1) + '次通过！';
                if (attempt === 0) sub += '\n还需通过第2次综合考试';
                else sub += '\n恭喜！预备出道状态达成！';
            } else {
                sub += '\n需答对' + needCorrect + '题以上';
            }
            resEl.innerHTML = _examResultHtml(passed, passed ? '合 格' : '不合格', sub);
        }
    }

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="page-title">综合考试 - 第' + (attempt + 1) + '次</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,#FFD700,#FFA500);color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">混合挑战</div>'
        + '<div style="font-size:14px;margin-top:4px;">7题混合挑战，需答对' + needCorrect + '题以上</div>'
        + '</div>'
        + '<div id="compQArea"></div>'
        + '</div></div>';

    _addTimer(setTimeout(showQuestion, 300));
}

// ==================== MY PAGE ====================
function render我的Page(container) {
    var roleText = gameState.player.role === 'Trainee' ? '练习生' : '出道爱豆';
    var company = COMPANIES[gameState.player.company];
    var genderText = gameState.player.gender === 'F' ? '女' : '男';
    
    container.innerHTML = '\n        <div class="page active">\n            <div class="page-header">\n                <div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>\n                <div class="page-title">我的</div>\n                <div style="width: 32px;"></div>\n            </div>\n            <div class="page-content">\n                <!-- 个人资料卡 -->\n                <div class="card" style="text-align: center; padding: 24px;">\n                    <div class="avatar" style="width: 64px; height: 64px; font-size: 24px; margin: 0 auto 12px;">' + (gameState.player.avatar) + '</div>\n                    <div style="font-size: 20px; font-weight: 700; color: var(--color-text);">' + (gameState.player.name) + '</div>\n                    <div style="font-size: 13px; color: var(--color-text-light); margin-top: 4px;">' + (genderText) + ' | ' + (gameState.player.age) + '岁</div>\n                    <div style="font-size: 13px; color: var(--color-text-light); margin-top: 2px;">' + ((company && company.name) || '') + ' | ' + (roleText) + '</div>\n                    ' + (gameState.player.group ? '<div style="font-size: 13px; color: var(--color-text-light); margin-top: 2px;">' + gameState.player.group + '</div>' : '') + '\n                    <div style="font-size: 13px; color: var(--color-text-light); margin-top: 2px;">定位: ' + (gameState.player.positions.join(' / ')) + '</div>\n                </div>\n                \n                <!-- 状态卡 -->\n                <div class="section-title">状态</div>\n                <div class="card">\n                    <div class="stat-bar">\n                        <span class="stat-label">生命</span>\n                        <div class="stat-track"><div class="stat-fill life" style="width: ' + (gameState.life) + '%;"></div></div>\n                        <span class="stat-value">' + (gameState.life) + '</span>\n                    </div>\n                    <div class="stat-bar">\n                        <span class="stat-label">体力</span>\n                        <div class="stat-track"><div class="stat-fill 体力" style="width: ' + ((gameState.体力 / gameState.max体力) * 100) + '%;"></div></div>\n                        <span class="stat-value">' + (gameState.体力) + '</span>\n                    </div>\n                    <div class="stat-bar">\n                        <span class="stat-label">信誉</span>\n                        <div class="stat-track"><div class="stat-fill credit" style="width: ' + ((gameState.credit / 150) * 100) + '%;"></div></div>\n                        <span class="stat-value">' + (gameState.credit) + '</span>\n                    </div>\n                </div>\n                \n                <div class="section-title">声望</div>\n                <div class="card">\n                    <div class="stat-bar">\n                        <span class="stat-label" style="color: var(--color-danger);">危险</span>\n                        <div class="stat-track"><div class="stat-fill danger" style="width: ' + (Math.min(100, gameState.danger)) + '%;"></div></div>\n                        <span class="stat-value" style="color: ' + (gameState.danger > 50 ? 'var(--color-danger)' : 'var(--color-text)') + ';">' + (gameState.danger) + '</span>\n                    </div>\n                    <div class="stat-bar">\n                        <span class="stat-label">影响力</span>\n                        <div class="stat-track"><div class="stat-fill 体力" style="width: ' + (Math.min(100, (gameState.influence || 50) / 2)) + '%;"></div></div>\n                        <span class="stat-value">' + (gameState.influence || 50) + '</span>\n                    </div>\n                    <div class="stat-bar">\n                        <span class="stat-label">名气</span>\n                        <div class="stat-track"><div class="stat-fill credit" style="width: ' + (Math.min(100, (gameState.fame || 30) / 2)) + '%;"></div></div>\n                        <span class="stat-value">' + (gameState.fame || 30) + '</span>\n                    </div>\n                    <div class="stat-bar">\n                        <span class="stat-label" style="color:#FF69B4;">颜值</span>\n                        <div class="stat-track"><div class="stat-fill" style="width:' + Math.min(100, (gameState.looks || 0) / 2) + '%;background:linear-gradient(90deg,#FF69B4,#FFB6C1);"></div></div>\n                        <span class="stat-value" style="color:#FF69B4;">' + (gameState.looks || 0) + '</span>\n                    </div>\n                    ' + (gameState.player.role === 'Idol' ? '<div class="stat-bar"><span class="stat-label" style="color:#A070E0;">团体人气</span><div class="stat-track"><div class="stat-fill" style="width:' + Math.min(100, (gameState.groupPopularity || 0) / 2) + '%;background:linear-gradient(90deg,#A070E0,#C9A0FF);"></div></div><span class="stat-value" style="color:#A070E0;">' + (gameState.groupPopularity || 0) + '</span></div>' : '') + '\n                </div>\n                \n                <!-- 能力卡 -->\n                <div class="section-title">能力</div>\n                <div class="card">\n                    ' + (Object.entries(gameState.stats).map(function(entry) { var key = entry[0]; var val = entry[1];
                        var names = { dance: '舞蹈', vocal: '声乐', rap: '说唱', acting: '表演', variety: '综艺' };
                        return '\n                            <div class="my-stat-bar">\n                                <span class="my-stat-label">' + (names[key]) + '</span>\n                                <div class="my-stat-track">\n                                    <div class="my-stat-fill ' + (key) + '" style="width: ' + (Math.min(100, (val / 150) * 100)) + '%;"></div>\n                                </div>\n                                <span class="my-stat-val">' + (val) + '</span>\n                            </div>\n                        ';
                    }).join('')) + '\n                </div>\n                \n                <!-- 经济卡 -->\n                <div class="section-title">经济</div>\n                <div class="card">\n                    <div style="display: flex; justify-content: space-around;">\n                        <div style="text-align: center;">\n                            <div style="font-size: 20px; font-weight: 700; color: var(--color-primary);">' + (gameState.money.toLocaleString()) + '</div>\n                            <div style="font-size: 11px; color: var(--color-text-light);">金币</div>\n                        </div>\n                        <div style="text-align: center;">\n                            <div style="font-size: 20px; font-weight: 700; color: var(--color-primary);">' + (gameState.fans.toLocaleString()) + '</div>\n                            <div style="font-size: 11px; color: var(--color-text-light);">粉丝</div>\n                        </div>\n                    </div>\n                </div>\n                \n                <!-- 背包卡 -->\n                <div class="section-title">背包</div>\n                <div class="card">\n                    ' + (gameState.inventory.length === 0 ? '\n                        <div style="text-align: center; padding: 20px; color: var(--color-text-light); font-size: 13px;">暂无物品</div>\n                    ' : gameState.inventory.map(function(item, i) { return '\n                        <div class="inventory-item">\n                            <span class="item-name">' + (item.name) + '</span>\n                            <button class="item-use" onclick="useItem(' + (i) + ')">使用</button>\n                        </div>\n                    '}).join('')) + '\n                </div>\n                \n                <!-- 账号操作 -->\n                <div class="section-title" style="margin-top:16px;">账号</div>\n                <div class="card" onclick="_doLogout()" style="cursor:pointer;">\n                    <div style="font-weight:600;color:var(--color-danger);">退出登录</div>\n                    <div style="font-size:12px;color:var(--color-text-light);">退出当前账号</div>\n                </div>\n            </div>\n        </div>\n    ';
}

function useItem(index) {
    var item = gameState.inventory[index];
    if (!item) return;
    
    if (item.effect === '体力') {
        gameState.体力 = Math.min(gameState.max体力, gameState.体力 + item.value);
        showModal('使用成功', '使用了 ' + (item.name) + '\n+' + (item.value) + ' 体力');
    } else if (item.effect === '生命') {
        gameState.life = Math.min(100, gameState.life + item.value);
        showModal('使用成功', '使用了 ' + (item.name) + '\n+' + (item.value) + ' 生命');
    } else {
        showModal('使用成功', '使用了 ' + (item.name));
    }
    
    gameState.inventory.splice(index, 1);
    render();
}

// ==================== NAVIGATION ====================


var AI_PROXY_URL = '';
var COZE_API_TOKEN = 'pat_AmSccb3iybFfdyR8nfuvAYyUPWxwaQSP6RW0QTNtJrvLJsuVbQKapw5Jv7ijNJrV';
var COZE_BOT_ID = '7650781503017959439';

function getAITotalUsageToday() {
    var d = new Date();
    var dateStr = d.getFullYear() + '' + ('0' + (d.getMonth() + 1)).slice(-2) + '' + ('0' + d.getDate()).slice(-2);
    if (!gameState.aiUsage) gameState.aiUsage = {};
    var total = 0;
    var aiApps = ['kakaotalk', 'bubble', 'dating', 'ins', 'tiktok', 'weverse', 'live'];
    for (var i = 0; i < aiApps.length; i++) {
        var key = aiApps[i] + '_' + dateStr;
        total += (gameState.aiUsage[key] || 0);
    }
    return total;
}

function getAIUsageToday(appId) {
    var d = new Date();
    var dateStr = d.getFullYear() + '' + ('0' + (d.getMonth() + 1)).slice(-2) + '' + ('0' + d.getDate()).slice(-2);
    var key = appId + '_' + dateStr;
    if (!gameState.aiUsage) gameState.aiUsage = {};
    return gameState.aiUsage[key] || 0;
}

function getAIMaxTotalToday() {
    // VIP tier-based limits
    var vipTier = null;
    try { vipTier = JSON.parse(localStorage.getItem('myidol_saves_' + localStorage.getItem('myidol_current_account')) || '{}').vipTier; } catch(e) {}
    if (vipTier === 'premium') return 80;
    if (vipTier === 'advanced') return 40;
    if (vipTier === 'basic') return 15;
    return 3; // Free users get 3 AI messages per day (trial)
}

function canUseAIToday() {
    return getAITotalUsageToday() < getAIMaxTotalToday();
}

// ===== VIP SYSTEM =====
var VIP_TIERS = {
    basic: { name: '基础版', price: 5, dailyLimit: 15, features: ['练习生路线', '基础社交互动', 'AI对话15条/天'] },
    advanced: { name: '进阶版', price: 8, dailyLimit: 40, features: ['出道爱豆路线', 'AI对话40条/天', '全部社交APP'] },
    premium: { name: '完整版', price: 15, dailyLimit: 80, features: ['全部APP解锁', 'AI对话80条/天', '直播功能', '优先体验'] }
};
var AFDIAN_URL = 'https://afdian.com/a/myidol';
var WORKER_URL = 'https://my-idol-api.vercel.app';

function getVipTier() {
    try { return JSON.parse(localStorage.getItem('myidol_saves_' + localStorage.getItem('myidol_current_account')) || '{}').vipTier || null; } catch(e) { return null; }
}

function isVipUser(minTier) {
    var tier = getVipTier();
    if (!tier) return false;
    var order = { basic: 1, advanced: 2, premium: 3 };
    return (order[tier] || 0) >= (order[minTier] || 0);
}

function showVipPage() {
    var currentTier = getVipTier();
    var tierCard = function(key, t, isCurrent) {
        return '<div class="card" style="margin-bottom:12px;' + (isCurrent ? 'border:2px solid var(--color-primary);' : '') + '">'
            + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'
            + '<div style="font-weight:600;font-size:16px;">' + t.name + '</div>'
            + '<span style="font-weight:700;font-size:18px;color:var(--color-primary);">' + t.price + '元/月</span></div>'
            + '<div style="font-size:13px;color:var(--color-text-light);line-height:1.6;">'
            + t.features.map(function(f) { return '- ' + f; }).join('<br>') + '</div>'
            + (isCurrent ? '<div style="margin-top:10px;text-align:center;color:var(--color-primary);font-weight:600;">当前档位</div>' : '') + '</div>';
    };
    var html = '<div style="padding:8px 0;"><div style="text-align:center;margin-bottom:16px;">'
        + '<div style="font-size:18px;font-weight:700;margin-bottom:4px;">开通会员</div>'
        + '<div style="font-size:13px;color:var(--color-text-light);">解锁完整游戏体验</div></div>'
        + tierCard('premium', VIP_TIERS.premium, currentTier === 'premium')
        + tierCard('advanced', VIP_TIERS.advanced, currentTier === 'advanced')
        + tierCard('basic', VIP_TIERS.basic, currentTier === 'basic')
        + '<button onclick="window.open(\'https://afdian.com/a/myidol\',\'_blank\')" style="width:100%;padding:14px;background:var(--color-primary);color:white;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;margin-top:8px;">前往爱发电开通</button>'
        + '<button onclick="showVerifyOrder()" style="width:100%;padding:14px;background:transparent;color:var(--color-primary);border:1px solid var(--color-primary);border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;margin-top:8px;">已付费？输入订单号验证</button>'
        + '<div style="text-align:center;margin-top:12px;font-size:12px;color:var(--color-text-light);">付款后在爱发电订单页复制订单号</div></div>';
    showModal('开通会员', html);
}

function showVerifyOrder() {
    var html = '<div style="padding:4px 0;">'
        + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:12px;">在爱发电"我的订单"中复制订单号</div>'
        + '<input type="text" id="vipOrderNo" placeholder="粘贴订单号" style="width:100%;padding:12px;border:1px solid var(--color-border);border-radius:8px;font-size:14px;box-sizing:border-box;">'
        + '<div id="vipVerifyMsg" style="margin-top:8px;font-size:13px;min-height:20px;"></div></div>';
    showModal('验证订单', html, [
        { text: '取消', action: function() { closeModal(); } },
        { text: '验证', action: function() { verifyVipOrder(); } }
    ]);
}

function verifyVipOrder() {
    var orderNo = document.getElementById('vipOrderNo');
    var msgEl = document.getElementById('vipVerifyMsg');
    if (!orderNo || !orderNo.value.trim()) {
        msgEl.style.color = 'var(--color-danger)'; msgEl.textContent = '请输入订单号'; return;
    }
    msgEl.style.color = 'var(--color-text-light)'; msgEl.textContent = '验证中...';
    if (!WORKER_URL) {
        msgEl.style.color = 'var(--color-danger)'; msgEl.textContent = '系统暂未开放，V1.6正式版上线后可用'; return;
    }
    var account = localStorage.getItem('myidol_current_account') || '';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', WORKER_URL + '/verify-order', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        try {
            var data = JSON.parse(xhr.responseText);
            if (data.success) {
                var saves = JSON.parse(localStorage.getItem('myidol_saves_' + account) || '{}');
                saves.vipTier = data.tier; saves.vipOrderNo = data.orderNo; saves.vipVerifiedAt = Date.now();
                localStorage.setItem('myidol_saves_' + account, JSON.stringify(saves));
                msgEl.style.color = '#4CD964'; msgEl.textContent = '验证成功！激活中...';
                setTimeout(function() { closeModal(); render(); notifySystem('会员', '会员权益已激活'); showToast('会员权益已激活！'); }, 800);
            } else {
                msgEl.style.color = 'var(--color-danger)'; msgEl.textContent = data.message || '验证失败';
            }
        } catch(e) { msgEl.style.color = 'var(--color-danger)'; msgEl.textContent = '验证失败'; }
    };
    xhr.onerror = function() { msgEl.style.color = 'var(--color-danger)'; msgEl.textContent = '网络错误'; };
    xhr.send(JSON.stringify({ order_no: orderNo.value.trim(), account: account }));
}

function recordAIUsage(appId) {
    var d = new Date();
    var dateStr = d.getFullYear() + '' + ('0' + (d.getMonth() + 1)).slice(-2) + '' + ('0' + d.getDate()).slice(-2);
    var key = appId + '_' + dateStr;
    if (!gameState.aiUsage) gameState.aiUsage = {};
    gameState.aiUsage[key] = (gameState.aiUsage[key] || 0) + 1;
}

function getAIReply(appId, context, playerMessage, callback) {
    if (!canUseAIToday()) {
        callback(getFallbackReply(appId));
        return;
    }
    recordAIUsage(appId);

    var prompts = {
        kakaotalk: '你是韩娱爱豆模拟器中的NPC，正在通过KakaoTalk和玩家聊天。' + context + '。用简短随意的韩式聊天语气回复，1-2句话，偶尔用~和！，不要用emoji。用中文回复。',
        bubble: '你是韩娱爱豆模拟器中的爱豆，正在通过泡泡和粉丝聊天。' + context + '。用甜蜜亲切的语气回复粉丝，1-2句话，偶尔用~，不要用emoji。用中文回复。',
        dating: '你是韩娱爱豆模拟器中和玩家恋爱的NPC。' + context + '。用温柔暧昧的恋爱语气回复，1-2句话，不要用emoji。用中文回复。',
        ins: '你是韩娱爱豆模拟器中INS上的粉丝。用热情简短的评论语气回复，1句话，不要用emoji。用中文回复。',
        tiktok: '你是韩娱爱豆模拟器中TikTok上的粉丝。用活泼简短的评论语气回复，1句话，不要用emoji。用中文回复。',
        weverse: '你是韩娱爱豆模拟器中Weverse上的爱豆，在跟粉丝互动。用温暖真诚的语气回复，1-2句话，不要用emoji。用中文回复。',
        live: '你是韩娱爱豆模拟器中直播间的观众。用热情简短的弹幕语气回复，1句话，不要用emoji。用中文回复。'
    };
    var systemPrompt = prompts[appId] || prompts.kakaotalk;
    var userId = (gameState.player.name || 'player') + '_' + Math.floor(Math.random() * 10000);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.coze.cn/v3/chat', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + COZE_API_TOKEN);
    xhr.timeout = 30000;

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var resp = JSON.parse(xhr.responseText);
                    if (resp.code === 0 && resp.data) {
                        var chatId = resp.data.id;
                        var convId = resp.data.conversation_id;
                        _pollCozeChat(chatId, convId, appId, 0, callback);
                    } else {
                        callback(getFallbackReply(appId));
                    }
                } catch(e) {
                    callback(getFallbackReply(appId));
                }
            } else {
                callback(getFallbackReply(appId));
            }
        }
    };
    xhr.ontimeout = function() { callback(getFallbackReply(appId)); };

    var payload = {
        bot_id: COZE_BOT_ID,
        user_id: userId,
        stream: false,
        auto_save_history: true,
        additional_messages: [
            { role: 'system', content: systemPrompt, content_type: 'text' },
            { role: 'user', content: playerMessage, content_type: 'text' }
        ]
    };
    try { xhr.send(JSON.stringify(payload)); } catch(e) { callback(getFallbackReply(appId)); }
}

function _pollCozeChat(chatId, convId, appId, count, callback) {
    if (count > 10) { callback(getFallbackReply(appId)); return; }
    setTimeout(function() {
        var xhr2 = new XMLHttpRequest();
        xhr2.open('GET', 'https://api.coze.cn/v3/chat/retrieve?chat_id=' + chatId + '&conversation_id=' + convId, true);
        xhr2.setRequestHeader('Authorization', 'Bearer ' + COZE_API_TOKEN);
        xhr2.setRequestHeader('Content-Type', 'application/json');
        xhr2.timeout = 10000;
        xhr2.onreadystatechange = function() {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                try {
                    var r = JSON.parse(xhr2.responseText);
                    if (r.code === 0 && r.data) {
                        if (r.data.status === 'completed') {
                            _fetchCozeMessages(chatId, convId, appId, callback);
                        } else if (r.data.status === 'failed' || r.data.status === 'requires_action') {
                            callback(getFallbackReply(appId));
                        } else {
                            _pollCozeChat(chatId, convId, appId, count + 1, callback);
                        }
                    } else {
                        callback(getFallbackReply(appId));
                    }
                } catch(e) { callback(getFallbackReply(appId)); }
            } else if (xhr2.readyState === 4) {
                callback(getFallbackReply(appId));
            }
        };
        xhr2.ontimeout = function() { callback(getFallbackReply(appId)); };
        try { xhr2.send(); } catch(e) { callback(getFallbackReply(appId)); }
    }, 2000);
}

function _fetchCozeMessages(chatId, convId, appId, callback) {
    var xhr3 = new XMLHttpRequest();
    xhr3.open('GET', 'https://api.coze.cn/v3/chat/message/list?chat_id=' + chatId + '&conversation_id=' + convId, true);
    xhr3.setRequestHeader('Authorization', 'Bearer ' + COZE_API_TOKEN);
    xhr3.setRequestHeader('Content-Type', 'application/json');
    xhr3.timeout = 10000;
    xhr3.onreadystatechange = function() {
        if (xhr3.readyState === 4 && xhr3.status === 200) {
            try {
                var m = JSON.parse(xhr3.responseText);
                if (m.code === 0 && m.data) {
                    for (var i = 0; i < m.data.length; i++) {
                        if (m.data[i].role === 'assistant' && m.data[i].type === 'answer') {
                            callback(m.data[i].content);
                            return;
                        }
                    }
                }
                callback(getFallbackReply(appId));
            } catch(e) { callback(getFallbackReply(appId)); }
        } else if (xhr3.readyState === 4) {
            callback(getFallbackReply(appId));
        }
    };
    xhr3.ontimeout = function() { callback(getFallbackReply(appId)); };
    try { xhr3.send(); } catch(e) { callback(getFallbackReply(appId)); }
}

function getFallbackReply(appId) {
    var replies = {
        kakaotalk: ['好的呀~', '嗯嗯，我知道了！', '哈哈真的吗？', '加油哦！', '好期待呢~', '今天辛苦了！', '下次一起练习吧~', '听说最近有新通告呢', '一起去食堂吧？', '你今天状态好好！'],
        bubble: ['谢谢你的消息！', '想你哦~', '今天也要开心！', '一起加油吧！', '爱你~', '一直在等你呢~', '你是最好的！', '刚练完舞好累~', '给你比心！', '晚安~'],
        dating: ['我也想你了~', '下次一起出去吧', '今天过得怎么样？', '有你在真好', '好想见你~', '最喜欢你了~', '今天看了好美的夕阳', '想和你分享今天的歌', '你吃饭了吗？'],
        ins: ['姐姐这组图也太绝了吧，每一张都能当壁纸！', '这颜值是真的真实存在的吗？太仙了', '造型师加鸡腿！今天这身好好看', '氛围感好强，感觉像画报一样', '期待你的下一组照片，永远不嫌多', '这个角度太绝了，好会拍！', '今天的妆容好好看，求分享色号', '每次看到你的动态都会反复看好几遍'],
        tiktok: ['这个编舞也太帅了吧！教教我吧', '刷到就停不下来，已经循环了二十遍', '背景音乐是什么？太好听了', '你跳的这个挑战比原版还好看', '转发了！闺蜜们都在看', '这个视频必须上热门！', '又是被你帅到的一天', '评论区都在说你是这个挑战的天花板'],
        weverse: ['想你们了！', '今天辛苦了', '一起加油', '爱你们！', '永远在一起~', '你们是最好的粉丝', '明天也要来看哦'],
        live: ['加油加油！', '好可爱', '哈哈笑死了', '太棒了！', '爱了爱了！', '再看一遍！', '主持人好幽默']
    };
    var list = replies[appId] || ['嗯嗯', '好的', '知道了'];
    return list[Math.floor(Math.random() * list.length)];
}

function getAppRedDot(appId) {
    if (!gameState || !gameState.player || !gameState.player.name) return null;
    var count = 0;
    switch(appId) {
        case 'mail':
            if (gameState.emails) { for (var i = 0; i < gameState.emails.length; i++) { if (!gameState.emails[i].read) count++; } }
            break;
        case 'meeting':
            if (gameState.meetings) { for (var i = 0; i < gameState.meetings.length; i++) { if (!gameState.meetings[i].read) count++; } }
            break;
        case 'kakaotalk':
            if (gameState.kakaoChats) { var _kkeys = Object.keys(gameState.kakaoChats); for (var ki = 0; ki < _kkeys.length; ki++) { var _kmsgs = gameState.kakaoChats[_kkeys[ki]]; for (var kj = 0; kj < _kmsgs.length; kj++) { if (_kmsgs[kj].from !== 'me' && !_kmsgs[kj].read) count++; } } }
            break;
        case 'ins':
            if (gameState.insUnread) count += gameState.insUnread;
            break;
        case 'tiktok':
            if (gameState.tiktokUnread) count += gameState.tiktokUnread;
            break;
        case 'bubble':
            if (gameState.bubbleUnread) count += gameState.bubbleUnread;
            break;
        case 'weverse':
            if (gameState.weverseUnread) count += gameState.weverseUnread;
            break;
        case 'updates':
            if (!gameState.lastReadVersion || gameState.lastReadVersion !== 'V1.5.2') count = 1;
            break;
        case 'schedule':
            if (gameState.schedule) { for (var i = 0; i < gameState.schedule.length; i++) { if (!gameState.schedule[i].done) count++; } }
            break;
        case 'work':
            if (gameState.newNotice) count = 1;
            break;
        case 'crisis':
            if (gameState.crisis && gameState.crisis.length) count = gameState.crisis.length;
            break;
        case 'live':
            if (gameState.livePendingReward) count = 1;
            break;
        case 'dating':
            if (gameState.datingUnread) count += gameState.datingUnread;
            break;
    }
    return count > 0 ? count : null;
}
function goToPage(page) {
        if (typeof gameState !== 'undefined' && gameState.体力 !== undefined) { if (gameState.体力 < 0) gameState.体力 = 0; if (gameState.体力 > gameState.max体力) gameState.体力 = gameState.max体力; }
if (gameState.player.name && currentPage !== 'welcome' && currentPage !== 'create') {
        try {
            var saveData = {};
            var keys = Object.keys(gameState);
            for (var si = 0; si < keys.length; si++) {
                if (keys[si] !== 'restTimeout') saveData[keys[si]] = gameState[keys[si]];
            }
            localStorage.setItem(_getSaveKey(), JSON.stringify(saveData));
        } catch(e) {}
    }
    if (isExamInProgress) {
        showModal('考试进行中', '请先完成当前考试');
        return;
    }
    if (isResting) {
        showModal('请等待', '体力恢复中，请等待');
        return;
    }
    _clearPageTimers();
    try {
        if (page === 'mail' && gameState.emails) { for (var _mi = 0; _mi < gameState.emails.length; _mi++) gameState.emails[_mi].read = true; }
        if (page === 'meeting' && gameState.meetings) { for (var _mi2 = 0; _mi2 < gameState.meetings.length; _mi2++) gameState.meetings[_mi2].read = true; }
        if (page === 'kakaotalk' && gameState.kakaoChats) { var _kck = Object.keys(gameState.kakaoChats); for (var _kci = 0; _kci < _kck.length; _kci++) { var _kcm = gameState.kakaoChats[_kck[_kci]]; for (var _kcj = 0; _kcj < _kcm.length; _kcj++) _kcm[_kcj].read = true; } }
        if (page === 'updates') { gameState.lastReadVersion = 'V1.5.2'; }
        if (page === 'work') { gameState.newNotice = false; }
        if (page === 'live') { gameState.livePendingReward = false; }
        if (page === 'ins') { gameState.insUnread = 0; }
        if (page === 'tiktok') { gameState.tiktokUnread = 0; }
        if (page === 'bubble') { gameState.bubbleUnread = 0; }
        if (page === 'weverse') { gameState.weverseUnread = 0; }
        if (page === 'dating') { gameState.datingUnread = 0; }
        currentPage = page;
        render();
        renderBottomNav();
    } catch(e) {
        console.error('goToPage error:', e);
        currentPage = 'home';
        try {
            var _app = document.getElementById('app');
            if (_app) _app.innerHTML = '<div style="padding:40px;text-align:center;"><div style="font-size:18px;color:#FF6B8A;margin-bottom:8px;">页面加载出错</div><button onclick="goToPage(\'home\')" style="padding:12px 24px;background:#FF8FA3;color:white;border:none;border-radius:50px;font-size:14px;cursor:pointer;">返回首页</button></div>';
            renderBottomNav();
        } catch(e2) {}
    }
}

function renderBottomNav() {
    var nav = document.getElementById('bottomNav');
    var navPages = ['home','training','exam','me'];
    var showNav = false;
    for (var ni = 0; ni < navPages.length; ni++) {
        if (currentPage === navPages[ni]) { showNav = true; break; }
    }
    nav.style.display = showNav ? 'flex' : 'none';
    if (!showNav) return;
    
    var homePages = ['home'];
    var trainPages = ['training'];
    var examPages = ['exam', 'examGame'];
    var mePages = ['me'];
    
    function isActive(group) { return group.indexOf(currentPage) > -1; }
    
    var items = [
        { id: 'home', icon: 'navHome', label: '首页', group: homePages },
        { id: 'training', icon: 'navTrain', label: '训练', group: trainPages },
        { id: 'exam', icon: 'navExam', label: '考核', group: examPages },
        { id: 'me', icon: 'navMe', label: '我的', group: mePages }
    ];
    
    nav.innerHTML = items.map(function(item) {
        var active = isActive(item.group);
        return '\n            <div class="nav-item ' + (active ? 'active' : '') + '" onclick="goToPage(\'' + (item.id) + '\')">\n                <div class="nav-icon">' + (getNavIcon(item.icon, active)) + '</div>\n                <div class="nav-label">' + (item.label) + '</div>\n            </div>\n        ';
    }).join('');
}

function getNavIcon(name, active) {
    var color = active ? 'var(--color-primary)' : 'var(--color-text-light)';
    var icons = {
        'navHome': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="' + (color) + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
        'navTrain': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="' + (color) + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11v11h-11z"></path><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M2 12h4"></path><path d="M18 12h4"></path></svg>',
        'navExam': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="' + (color) + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>',
        'navMe': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="' + (color) + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
    };
    return icons[name] || '';
}

function getIcon(name) {
    var icons = {
        'hotsearch': '<svg viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>',
        'ranking': '<svg viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>',
        'schedule': '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
        'meeting': '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        'mail': '<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
        'work': '<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
        'dating': '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
        'bubble': '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
        'weverse': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
        'ins': '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
        'tiktok': '<svg viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>',
        'food': '<svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>',
        'delivery': '<svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
        'loan': '<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
        'crisis': '<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
        'live': '<svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',
        'more': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>',
        'lock': '<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
        'members': '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        'updates': '<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path><circle cx="18" cy="3" r="3" fill="#FF8FA3" stroke="none"></circle></svg>',
        'kakaotalk': '<svg class="kakao-icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="14" rx="3" ry="3" fill="#FAE100" stroke="none"></rect><path d="M7 10h4M13 10h4M9 13h6" stroke="#392020" stroke-width="1.5" stroke-linecap="round" fill="none"></path><polygon points="8,18 10,22 12,18" fill="#FAE100" stroke="none"></polygon></svg>',
        'debut': '<svg viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></polygon><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"></circle></svg>',
        'gacha': '<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"></rect><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"></circle><path d="M12 9v6M9 12h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
        'vip': '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M2 17l10 5 10-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M2 12l10 5 10-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path></svg>',
        'earn': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M12 6v12M9 9c0-1.66 1.34-2 3-2s3 .34 3 2-1.34 2-3 2-3 .34-3 2 1.34 2 3 2 3-.34 3-2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
        'achievement': '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path></svg>',
        'comeback': '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.5"></circle><circle cx="18" cy="16" r="3" fill="none" stroke="currentColor" stroke-width="1.5"></circle></svg>',
        'music': '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.5"></circle><circle cx="18" cy="16" r="3" fill="none" stroke="currentColor" stroke-width="1.5"></circle></svg>',
        'mvstudio': '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" fill="none" stroke="currentColor" stroke-width="1.5"></rect><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" opacity="0.6"></polygon></svg>',
        'contract': '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" stroke-width="1.5"></path><polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" stroke-width="1.5"></polyline><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="1.5"></line><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="1.5"></line></svg>',
        'relation': '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" stroke-width="1.5"></path><circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" fill="none" stroke="currentColor" stroke-width="1.5"></path><path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" stroke-width="1.5"></path></svg>',
        'management': '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M2 17l10 5 10-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M2 12l10 5 10-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path></svg>',
        'antiblack': '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" stroke-width="1.5"></path></svg>',
        'fanclub': '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="none" stroke="currentColor" stroke-width="1.5"></path><path d="M3.22 4.61a5.5 5.5 0 0 1 7.78 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"></path></svg>',
        'pr': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line></svg>',
        'kpopwiki': '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" fill="none" stroke="currentColor" stroke-width="1.5"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="none" stroke="currentColor" stroke-width="1.5"></path></svg>',
        'company': '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="1.5"></rect><line x1="9" y1="6" x2="9.01" y2="6" stroke="currentColor" stroke-width="1.5"></line><line x1="15" y1="6" x2="15.01" y2="6" stroke="currentColor" stroke-width="1.5"></line><line x1="9" y1="10" x2="9.01" y2="10" stroke="currentColor" stroke-width="1.5"></line><line x1="15" y1="10" x2="15.01" y2="10" stroke="currentColor" stroke-width="1.5"></line><path d="M9 18h6v4H9z" fill="currentColor" opacity="0.3"></path></svg>'
    };
    return icons[name] || '';
}

// ==================== GAME PAGES ====================
var hotsearchList = [];
var hotsearchDetailIdx = -1;

function generateHotsearchList() {
    var allTopics = [
        { topic: '#NewIdolDebut', posts: '12.5万', hot: true, detail: '韩娱圈再次迎来重磅出道消息！多家公司同时推出新团，引发粉丝热议。\n\n出道舞台在首尔奥林匹克公园举行，现场座无虚席。新团成员们展现出超强的舞台实力，从舞蹈到唱功都获得了观众的好评。\n\n业界分析认为，这批新团的出道将重新洗牌K-pop格局，各大公司的竞争将更加激烈。' },
        { topic: '#SMNewGirlGroup', posts: '9.8万', hot: true, detail: 'SM娱乐正式宣布新女团出道计划，引发全网关注。\n\n据悉，新团将以"未来概念"为核心，融合AI与人类艺术表达。成员们经过长达5年的训练期，实力备受期待。\n\n粉丝们在社交媒体上纷纷表达期待，相关话题迅速登上多个平台热搜榜首。' },
        { topic: '#KpopTwitter', posts: '8.7万', detail: 'K-pop在全球社交媒体上的影响力持续扩大，Twitter平台数据显示韩娱话题讨论量再创新高。\n\n据统计，过去一个月K-pop相关推文超过10亿条，覆盖全球190多个国家和地区。东南亚和南美市场增长尤为显著。\n\n分析指出，短视频平台的传播效应对韩娱全球化起到了关键推动作用。' },
        { topic: '#콘서트Tonight', posts: '7.6万', detail: '今晚首尔将迎来多场大型演唱会，粉丝们早已按捺不住激动的心情。\n\n从蚕室主竞技场到KSPO Dome，多个场馆同时开演。安保部门已启动最高级别安保方案。\n\n值得一提的是，部分演唱会的线上直播观看人数也创下纪录，体现了后疫情时代演唱会形态的转变。' },
        { topic: '#MusicBank', posts: '6.5万', detail: '本周MusicBank打歌舞台竞争激烈，多组艺人带来精彩表演。\n\n新曲首舞台、回归舞台和特别舞台轮番上演，为观众带来视听盛宴。评审团表示本周评分差距极小，最终排名悬念十足。\n\n粉丝们积极为自己喜欢的艺人投票应援，社交平台一度因流量过大出现短暂卡顿。' },
        { topic: '#IdolDanceChallenge', posts: '5.2万', detail: '最新舞蹈挑战在短视频平台爆火，多位爱豆亲自下场参与挑战。\n\n挑战源自新曲的副歌编舞，节奏感极强，动作简洁有力。发布48小时内，参与视频数量突破100万条。\n\n众多偶像在舞台上和社交平台上接力挑战，甚至引发了跨公司联动的热潮，成为近期最出圈的韩娱话题。' },
        { topic: '#신인상', posts: '4.1万', detail: '年末颁奖季将至，新人奖的角逐成为焦点话题。\n\n今年出道的新人数量创历史新高，实力出众的团体和solo艺人层出不穷。业界评论认为，这是近年来新人质量最高的一年。\n\n各大奖项的预测投票已经开启，粉丝间为自家偶像拉票的竞争也日益白热化。' },
        { topic: '#FanMeetup', posts: '3.8万', detail: '粉丝见面会文化在韩娱圈持续升温，越来越多的艺人选择通过线下互动拉近与粉丝的距离。\n\n最新一场粉丝见面会采用了全息投影技术，让远端粉丝也能感受到"面对面"的温暖。活动当天的创意互动环节获得了广泛好评。\n\n业内人士指出，高质量的粉丝互动活动已经成为艺人长期发展的核心竞争力之一。' },
        { topic: '#IdolActing', posts: '3.2万', detail: '越来越多的爱豆跨界影视圈，演技实力成为热门讨论话题。\n\n最近一部由当红爱豆主演的韩剧收视率一路飙升，证明了偶像演员的票房号召力。但也有声音指出，并非所有偶像都适合演戏。\n\n经纪公司表示，未来将在训练阶段增加更多表演课程，为偶像的多元发展打下基础。' },
        { topic: '#DancePractice', posts: '2.9万', detail: '一段练习室舞蹈视频在网上疯传，引发了关于偶像训练强度的讨论。\n\n视频中，偶像们反复练习同一个舞蹈段落数十次，汗水和努力令人动容。粉丝纷纷留言表示心疼，同时也为他们的敬业精神所感动。\n\n这也让人们再次关注到韩娱产业背后，那些不为人知的辛苦付出。' }
    ];
    var shuffled = allTopics.sort(function() { return Math.random() - 0.5; });
    hotsearchList = [];
    for (var i = 0; i < 8; i++) {
        hotsearchList.push({ rank: i + 1, topic: shuffled[i].topic, posts: shuffled[i].posts, hot: i < 2, detail: shuffled[i].detail });
    }
}

function renderHotsearchPage(container) {
    if (hotsearchList.length === 0) generateHotsearchList();
    
    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">热搜榜</div>'
        + '<div style="width:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="generateHotsearchList();render();">'
        + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>'
        + '</div>'
        + '</div>'
        + '<div class="page-content">'
        + hotsearchList.map(function(t) {
            return '<div class="list-item" onclick="hotsearchDetailIdx=' + (t.rank - 1) + ';goToPage(\'hotsearchdetail\');" style="cursor:pointer;">'
                + '<div style="display:flex;align-items:center;">'
                + '<span style="font-size:16px;font-weight:700;color:' + (t.hot ? 'var(--color-danger)' : 'var(--color-text-light)') + ';margin-right:12px;">' + t.rank + '</span>'
                + '<div>'
                + '<div style="font-weight:600;color:var(--color-text);">' + t.topic + (t.hot ? ' <span style="font-size:10px;color:var(--color-danger);">HOT</span>' : '') + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">' + t.posts + ' 讨论</div>'
                + '</div></div></div>';
        }).join('')
        + '</div></div>';
}

function renderHotsearchDetailPage(container) {
    var t = hotsearchList[hotsearchDetailIdx];
    if (!t) { goToPage('hotsearch'); return; }
    var paragraphs = (t.detail || '暂无详情').split('\n');
    var detailHtml = '';
    for (var i = 0; i < paragraphs.length; i++) {
        if (paragraphs[i].trim()) detailHtml += '<p style="font-size:14px;color:var(--color-text);line-height:1.8;margin-bottom:12px;">' + paragraphs[i] + '</p>';
    }
    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'hotsearch\')">‹ 热搜</div>'
        + '<div class="page-title">热搜详情</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">热搜排名 #' + t.rank + '</div>'
        + '<div style="font-size:20px;font-weight:700;margin-top:4px;">' + t.topic + '</div>'
        + '<div style="font-size:12px;opacity:0.8;margin-top:4px;">' + t.posts + ' 讨论</div>'
        + '</div>'
        + '<div class="card">' + detailHtml + '</div>'
        + '</div></div>';
}

function renderRankingPage(container) {
    if (!window._rankingTab) window._rankingTab = 'idol';
    var tab = window._rankingTab;
    
    var idolRanking = [
        { name: 'EXO', val: 100000, unit: '粉丝' },
        { name: 'Black Luna', val: 85000, unit: '粉丝' },
        { name: 'Myth', val: 70000, unit: '粉丝' },
        { name: 'Red Velvet', val: 55000, unit: '粉丝' },
        { name: 'Wave', val: 40000, unit: '粉丝' },
        { name: 'Taegi Flow', val: 25000, unit: '粉丝' },
        { name: 'Nova', val: 10000, unit: '粉丝' }
    ];
    var powerRanking = [
        { name: 'EXO', val: 92, unit: '综合能力' },
        { name: 'Black Luna', val: 88, unit: '综合能力' },
        { name: 'Myth', val: 85, unit: '综合能力' },
        { name: 'Red Velvet', val: 79, unit: '综合能力' },
        { name: 'Wave', val: 75, unit: '综合能力' },
        { name: 'Taegi Flow', val: 70, unit: '综合能力' },
        { name: 'Nova', val: 65, unit: '综合能力' }
    ];
    var fanRanking = [
        { name: 'EXO', val: 100000, unit: '粉丝' },
        { name: 'Black Luna', val: 85000, unit: '粉丝' },
        { name: 'Myth', val: 70000, unit: '粉丝' },
        { name: 'Red Velvet', val: 55000, unit: '粉丝' },
        { name: 'Wave', val: 40000, unit: '粉丝' },
        { name: 'Taegi Flow', val: 25000, unit: '粉丝' },
        { name: 'Nova', val: 10000, unit: '粉丝' }
    ];
    var wealthRanking = [
        { name: 'EXO', val: 2500000, unit: '金币' },
        { name: 'Black Luna', val: 1800000, unit: '金币' },
        { name: 'Myth', val: 1500000, unit: '金币' },
        { name: 'Red Velvet', val: 900000, unit: '金币' },
        { name: 'Wave', val: 700000, unit: '金币' },
        { name: 'Taegi Flow', val: 500000, unit: '金币' },
        { name: 'Nova', val: 300000, unit: '金币' }
    ];
    var tabs = [
        { id: 'idol', label: '偶像' },
        { id: 'power', label: '实力' },
        { id: 'fan', label: '人气' },
        { id: 'wealth', label: '财富' }
    ];
    var dataMap = { idol: idolRanking, power: powerRanking, fan: fanRanking, wealth: wealthRanking };
    var rankings = dataMap[tab] || idolRanking;
    
    container.innerHTML = '\n        <div class="page active">\n            <div class="page-header">\n                <div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>\n                <div class="page-title">排行榜</div>\n                <div style="width: 32px;"></div>\n            </div>\n            <div class="page-content">\n                <div style="display:flex;gap:6px;margin-bottom:16px;">\n                    ' + (tabs.map(function(t) { return '<button class="btn btn-sm '+(tab===t.id?'btn-primary':'btn-secondary')+'" data-tab="' + t.id + '" onclick="window._rankingTab=this.dataset.tab;render();" style="flex:1;">'+t.label+'</button>'; }).join('')) + '\n                </div>\n                ' + (rankings.map(function(r, i) { return '\n                    <div class="card" style="display: flex; align-items: center;">\n                        <div style="font-size: 24px; font-weight: 700; color: ' + (i < 3 ? 'var(--color-primary)' : 'var(--color-text-light)') + '; width: 40px;">' + (i + 1) + '</div>\n                        <div class="avatar-sm" style="margin: 0 12px;">' + (r.name.charAt(0)) + '</div>\n                        <div style="flex: 1;">\n                            <div style="font-weight: 600;">' + (r.name) + '</div>\n                            <div style="font-size: 12px; color: var(--color-text-light);">' + (typeof r.val === 'number' && r.val > 10000 ? r.val.toLocaleString() : r.val) + ' ' + (r.unit) + '</div>\n                        </div>\n                    </div>\n                '}).join('')) + '\n            </div>\n        </div>\n    ';
}

function render行程表Page(container) {
    if (!gameState.scheduleItems || gameState.scheduleItems.length === 0) {
        initScheduleItems();
    }
    
    var itemsHtml = '';
    var items = gameState.scheduleItems;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.status === 'done' && item._completed) continue;
        var statusHtml = '';
        if (item.status === 'done') {
            statusHtml = '<span style="font-size:18px;color:var(--color-danger);font-weight:700;">✓</span>';
        } else if (item.status === 'skip') {
            statusHtml = '<span style="font-size:18px;color:#FF4757;font-weight:700;">✗</span>';
        } else {
            statusHtml = '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#CCC;"></span>';
        }
        var actionsHtml = '';
        if (item.status === 'todo') {
            actionsHtml = '<div style="display:flex;gap:6px;align-items:center;">'
                + '<button class="btn btn-sm btn-primary" data-i="' + i + '" onclick="joinSchedule(this.dataset.i)" style="font-size:11px;padding:4px 10px;">参加</button>'
                + '<button class="btn btn-sm btn-secondary" data-i="' + i + '" onclick="skipSchedule(this.dataset.i)" style="font-size:11px;padding:4px 10px;color:var(--color-danger);border-color:var(--color-danger);">不参加</button>'
                + '</div>';
        } else {
            actionsHtml = statusHtml;
        }
        itemsHtml += '<div class="schedule-item">'
            + '<div class="schedule-time">' + item.time + '</div>'
            + '<div class="schedule-info">'
            + '<div class="schedule-name">' + item.name + '</div>'
            + '<span class="schedule-tag ' + item.tagType + '">' + item.tag + '</span>'
            + '</div>'
            + actionsHtml
            + '</div>';
    }
    
    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">行程表</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">今日行程</div>'
        + '<div style="font-size:14px;margin-top:4px;">' + new Date().toLocaleDateString('zh-CN') + '</div>'
        + '</div>'
        + itemsHtml
        + '</div></div>';
}

function initScheduleItems() {
    var tags = [
        { tag: '练习', tagType: 'practice' },
        { tag: '通告', tagType: 'notice' },
        { tag: '演出', tagType: 'show' },
        { tag: '采访', tagType: 'interview' }
    ];
    var items = [
        { time: '09:00', name: '晨间舞蹈练习', tag: '练习', tagType: 'practice', status: 'todo' },
        { time: '11:00', name: '声乐指导课', tag: '练习', tagType: 'practice', status: 'todo' },
        { time: '13:00', name: '品牌代言拍摄', tag: '通告', tagType: 'notice', status: 'todo' },
        { time: '15:30', name: '音乐节目录制', tag: '演出', tagType: 'show', status: 'todo' },
        { time: '17:00', name: '杂志采访', tag: '采访', tagType: 'interview', status: 'todo' },
        { time: '19:00', name: '体能训练', tag: '练习', tagType: 'practice', status: 'todo' },
        { time: '20:30', name: '粉丝签名会', tag: '通告', tagType: 'notice', status: 'todo' }
    ];
    gameState.scheduleItems = items;
}

function joinSchedule(index) {
    var item = gameState.scheduleItems[index];
    if (!item || item.status !== 'todo') return;
    var 体力cost = 15 + Math.floor(Math.random() * 15);
    if (gameState.体力 < 体力cost) {
        showModal('体力不足', '参加此活动需要 ' + 体力cost + ' 体力');
        return;
    }
    gameState.体力 = Math.max(0, gameState.体力 - 体力cost);
    item.status = 'done';
    var gainMsg = '';
    if (item.tagType === 'practice') {
        var keys = Object.keys(gameState.stats);
        var rk = keys[Math.floor(Math.random() * keys.length)];
        var gain = Math.floor(Math.random() * 3) + 2;
        gameState.stats[rk] = Math.min(150, gameState.stats[rk] + gain);
        var names = { dance: '舞蹈', vocal: '声乐', rap: '说唱', acting: '表演', variety: '综艺' };
        gainMsg = '\n+' + gain + ' ' + names[rk];
    } else if (item.tagType === 'notice' || item.tagType === 'show') {
        var moneyGain = Math.floor(Math.random() * 10000) + 5000;
        var fansGain = Math.floor(Math.random() * 50) + 10;
        gameState.money += moneyGain;
        gameState.fans += fansGain;
        gainMsg = '\n+' + moneyGain.toLocaleString() + ' 金币\n+' + fansGain + ' 粉丝';
    } else if (item.tagType === 'interview') {
        var fameGain = Math.floor(Math.random() * 5) + 2;
        var influenceGain = Math.floor(Math.random() * 3) + 1;
        gameState.fame = Math.min(200, (gameState.fame || 30) + fameGain);
        gameState.influence = Math.min(200, (gameState.influence || 50) + influenceGain);
        gainMsg = '\n+' + fameGain + ' 名气\n+' + influenceGain + ' 影响力';
    }
    item._completed = true;
    triggerSilentSave();
    showModal('参加完成', item.name + '\n-' + 体力cost + ' 体力' + gainMsg);
    render();
}

function skipSchedule(index) {
    var item = gameState.scheduleItems[index];
    if (!item || item.status !== 'todo') return;
    item.status = 'skip';
    render();
}

function render会议Page(container) {
    try {
        if (!gameState.meetings || gameState.meetings.length === 0) {
            initMeetings();
        }
        var unread = 0;
        for (var ui = 0; ui < gameState.meetings.length; ui++) {
            if (!gameState.meetings[ui].read) unread++;
        }
        var meetingsHtml = '';
        for (var mi = 0; mi < gameState.meetings.length; mi++) {
            var mt = gameState.meetings[mi];
            meetingsHtml += '<div class="card" data-mi="' + mi + '" onclick="readMeeting(this.dataset.mi)">'
                + '<div style="display:flex;align-items:flex-start;">'
                + '<div class="meeting-dot ' + (mt.read ? 'read' : '') + '" style="margin-top:5px;"></div>'
                + '<div style="flex:1;">'
                + '<div style="font-weight:600;margin-bottom:4px;">' + mt.title + '</div>'
                + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:4px;">' + mt.preview + '</div>'
                + '<div style="font-size:11px;color:var(--color-text-light);">' + mt.time + '</div>'
                + '</div></div></div>';
        }
        container.innerHTML = '<div class="page active">'
            + '<div class="page-header">'
            + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
            + '<div class="page-title">会议 ' + (unread > 0 ? '(' + unread + ')' : '') + '</div>'
            + '<div style="width:32px;"></div>'
            + '</div>'
            + '<div class="page-content">'
            + meetingsHtml
            + '</div></div>';
    } catch(e) {
        console.error('render会议Page error:', e);
        container.innerHTML = '<div class="page active"><div class="page-content" style="text-align:center;padding:60px 20px;"><div style="font-size:16px;color:var(--color-text-light);">会议页面加载出错</div><button class="btn btn-primary" onclick="goToPage(\'home\')" style="margin-top:16px;">返回首页</button></div></div>';
    }
}

function initMeetings() {
    gameState.meetings = [
        { title: '明天9点练习室集合', preview: '经纪人通知：所有练习生明天上午9点准时到达B2练习室，迟到者将扣除信誉分。', content: '经纪人通知：\n\n所有练习生明天上午9点准时到达B2练习室，进行本月综合考核准备训练。\n\n请携带个人训练日志，迟到者将扣除信誉分。\n\n——经纪部', time: '今天 18:30', read: false },
        { title: '本月考核安排', preview: '月末考核将于28日进行，包含舞蹈、声乐和综合表现三个部分。', content: '月末考核通知\n\n考核日期：本月28日\n考核内容：\n1. 舞蹈表现（自选曲目）\n2. 声乐展示（指定曲目）\n3. 综合表现评估\n\n请各位认真准备，考核结果将影响出道排名。\n\n——训练管理部', time: '今天 15:00', read: false },
        { title: '新专辑概念会议', preview: '新专辑概念确定会议将于下周三举行，请相关成员准时参加。', content: '新专辑概念会议通知\n\n时间：下周三 14:00\n地点：公司5楼会议室\n\n议程：\n1. 新专辑概念提案\n2. 收录曲确认\n3. MV拍摄计划\n\n请提前准备创意方案。\n\n——企划部', time: '昨天 10:00', read: false },
        { title: '粉丝见面会安排', preview: '下月粉丝见面会地点已确定，请确认出席。', content: '粉丝见面会安排\n\n时间：下月15日 14:00\n地点：首尔COEX D厅\n\n活动流程：\n1. 开场表演（15分钟）\n2. 互动游戏（30分钟）\n3. 签名合影（45分钟）\n4. 结束致辞（10分钟）\n\n请确认出席。\n\n——运营部', time: '2天前', read: true },
        { title: '健康检查提醒', preview: '年度健康检查将于下周进行，请提前安排时间。', content: '年度健康检查通知\n\n检查时间：下周一至周五\n地点：公司指定医院\n\n请提前预约时间段，检查当天需空腹。\n\n——人事部', time: '3天前', read: true }
    ];
}

function readMeeting(index) {
    try {
        var m = gameState.meetings[index];
        if (!m) { goToPage('meeting'); return; }
        m.read = true;
        var savedIdx = index;
        showModal(m.title || '会议通知', m.content || '暂无内容', [
            { text: '关闭', action: closeModal },
            { text: '参加会议', action: function() { closeModal(); start会议Dialog(savedIdx); } }
        ]);
        render();
    } catch(e) {
        console.error('readMeeting error:', e);
        goToPage('meeting');
    }
}

function renderMailPage(container) {
    var 未读 = gameState.emails.filter(function(e) { return !e.read; }).length;
    
    container.innerHTML = '\n        <div class="page active">\n            <div class="page-header">\n                <div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>\n                <div class="page-title">邮箱 ' + (未读 > 0 ? '(' + 未读 + ')' : '') + '</div>\n                <div style="width: 32px;"></div>\n            </div>\n            <div class="page-content">\n                ' + (gameState.emails.length === 0 ? '\n                    <div style="text-align: center; padding: 40px; color: var(--color-text-light);">\n                        <div style="font-size: 48px; margin-bottom: 12px;">\n                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-light)" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>\n                        </div>\n                        <div>暂无邮件</div>\n                    </div>\n                ' : gameState.emails.map(function(email, i) { return '\n                    <div class="card ' + (email.read ? '' : 'selected') + '" onclick="readEmail(' + (i) + ')">\n                        <div style="font-weight: 600; margin-bottom: 4px;">' + (email.title) + '</div>\n                        <div style="font-size: 12px; color: var(--color-text-light);">' + (email.from) + ' - ' + (email.time) + '</div>\n                    </div>\n                '}).join('')) + '\n            </div>\n        </div>\n    ';
}

function readEmail(index) {
    var email = gameState.emails[index];
    email.read = true;
    showModal(email.title, email.content.replace(/\\n/g, '\n'));
}

function render工作Page(container) {
    if (gameState.player.role !== 'Idol') {
        container.innerHTML = '<div class="page active">'
            + '<div class="page-header">'
            + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
            + '<div class="page-title">通告</div>'
            + '<div style="width:32px;"></div>'
            + '</div>'
            + '<div class="page-content" style="text-align:center;padding:60px 20px;">'
            + '<div style="font-size:48px;margin-bottom:12px;opacity:0.3;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-light)" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></div>'
            + '<div style="font-size:16px;color:var(--color-text-light);">出道后解锁</div>'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-top:6px;">完成出道企划即可接取通告</div>'
            + '</div></div>';
        return;
    }
    _generateNoticeList();
    var items = gameState.noticeList;
    var itemsHtml = '';
    for (var i = 0; i < items.length; i++) {
        var n = items[i];
        var typeBg = '';
        if (n.type === 'musicshow') typeBg = 'background:#FFE4EC;color:#FF8FA3;';
        else if (n.type === 'mcountdown') typeBg = 'background:#E4F5FF;color:#5BB8E8;';
        else if (n.type === 'inkigayo') typeBg = 'background:#FFF4E0;color:#F0A030;';
        else if (n.type === 'musiccore') typeBg = 'background:#E8FFE4;color:#4CAF50;';
        else if (n.type === 'fanmeet') typeBg = 'background:#F0E4FF;color:#A070E0;';
        else if (n.type === 'concert') typeBg = 'background:#FFE4EC;color:#FF6B8A;';
        else typeBg = 'background:#E4F5FF;color:#5BB8E8;';
        itemsHtml += '<div class="notice-card" data-i="' + i + '" onclick="viewNoticeDetail(this.dataset.i)">'
            + '<div class="notice-type" style="' + typeBg + '">' + n.typeName + '</div>'
            + '<div class="notice-title">' + n.name + '</div>'
            + '<div class="notice-sub">体力 -' + n.体力 + '</div>'
            + '<div class="notice-reward">+' + n.reward.toLocaleString() + ' 金币</div>'
            + '</div>';
    }
    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">通告</div>'
        + '<div style="width:32px;cursor:pointer;" onclick="_generateNoticeList();render();">'
        + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>'
        + '</div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">今日通告</div>'
        + '<div style="font-size:14px;margin-top:4px;">' + new Date().toLocaleDateString('zh-CN') + '</div>'
        + '</div>'
        + itemsHtml
        + '</div></div>';
}

function _generateNoticeList() {
    var allNotices = [
        { name: '打歌舞台', type: 'musicshow', typeName: '打歌', 体力: 30, reward: 20000, fame: 15, influence: 10, fans: 500 },
        { name: 'M Countdown', type: 'mcountdown', typeName: '打歌', 体力: 25, reward: 25000, fame: 12, influence: 6, fans: 300 },
        { name: '人气歌谣', type: 'inkigayo', typeName: '打歌', 体力: 25, reward: 22000, fame: 10, influence: 5, fans: 250 },
        { name: '音乐中心', type: 'musiccore', typeName: '打歌', 体力: 25, reward: 23000, fame: 11, influence: 5, fans: 280 },
        { name: '粉丝见面会', type: 'fanmeet', typeName: '活动', 体力: 20, reward: 15000, fame: 8, influence: 3, fans: 300 },
        { name: '演唱会', type: 'concert', typeName: '演出', 体力: 35, reward: 50000, fame: 15, influence: 10, fans: 800 },
        { name: '团综录制', type: 'variety', typeName: '综艺', 体力: 20, reward: 18000, fame: 6, influence: 4, fans: 150 }
    ];
    var shuffled = allNotices.sort(function() { return Math.random() - 0.5; });
    var count = 3 + Math.floor(Math.random() * 3);
    gameState.noticeList = shuffled.slice(0, count);
    gameState.newNotice = true;
}

function viewNoticeDetail(index) {
    var n = gameState.noticeList[index];
    if (!n) return;
    gameState.noticeDetail = n;
    currentPage = 'noticedetail';
    render();
}

function render通告详情Page(container) {
    var n = gameState.noticeDetail;
    if (!n) { goToPage('work'); return; }

    var typeBg = '';
    if (n.type === 'musicshow') typeBg = 'background:#FFE4EC;color:#FF8FA3;';
    else if (n.type === 'mcountdown') typeBg = 'background:#E4F5FF;color:#5BB8E8;';
    else if (n.type === 'inkigayo') typeBg = 'background:#FFF4E0;color:#F0A030;';
    else if (n.type === 'musiccore') typeBg = 'background:#E8FFE4;color:#4CAF50;';
    else if (n.type === 'fanmeet') typeBg = 'background:#F0E4FF;color:#A070E0;';
    else if (n.type === 'concert') typeBg = 'background:#FFE4EC;color:#FF6B8A;';
    else typeBg = 'background:#E4F5FF;color:#5BB8E8;';

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'work\')">‹ 通告</div>'
        + '<div class="page-title">通告详情</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="notice-detail-header">'
        + '<div class="notice-type" style="background:rgba(255,255,255,0.25);color:white;display:inline-block;">' + n.typeName + '</div>'
        + '<div style="font-size:22px;font-weight:700;margin-top:8px;">' + n.name + '</div>'
        + '<div style="font-size:13px;opacity:0.8;margin-top:4px;">体力消耗 -' + n.体力 + '</div>'
        + '</div>'
        + '<div class="card">'
        + '<div style="font-weight:600;margin-bottom:10px;">报酬</div>'
        + '<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:14px;"><span>金币</span><span style="color:#4CD964;font-weight:600;">+' + n.reward.toLocaleString() + '</span></div>'
        + '<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:14px;"><span>名气</span><span style="color:#4CD964;font-weight:600;">+' + n.fame + '</span></div>'
        + '<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:14px;"><span>影响力</span><span style="color:#4CD964;font-weight:600;">+' + n.influence + '</span></div>'
        + '<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:14px;"><span>粉丝</span><span style="color:#4CD964;font-weight:600;">+' + n.fans + '</span></div>'
        + '</div>'
        + '<div style="display:flex;gap:8px;margin-top:12px;">'
        + '<button class="btn btn-secondary btn-lg" onclick="goToPage(\'work\')" style="flex:1;">拒绝</button>'
        + '<button class="btn btn-primary btn-lg" onclick="acceptNotice()" style="flex:1;">接受</button>'
        + '</div>'
        + '</div></div>';
}

function acceptNotice() {
    var n = gameState.noticeDetail;
    if (!n) return;
    if (gameState.体力 < n.体力) {
        showModal('体力不足', '参加此通告需要 ' + n.体力 + ' 体力');
        return;
    }
    gameState.体力 = Math.max(0, gameState.体力 - n.体力);
    var moneyGain = n.reward + Math.floor(Math.random() * 5000);
    gameState.money += moneyGain;
    var fameGain = n.fame + Math.floor(Math.random() * 3);
    gameState.fame = Math.min(200, (gameState.fame || 30) + fameGain);
    var influenceGain = n.influence + Math.floor(Math.random() * 3);
    gameState.influence = Math.min(200, (gameState.influence || 50) + influenceGain);
    var fansGain = n.fans + Math.floor(Math.random() * 100);
    gameState.fans += fansGain;
    var dangerGain = Math.floor(Math.random() * 3);
    if (gameState.danger >= 30 && Math.random() < 0.6) { if(typeof triggerAntiEvent==='function') triggerAntiEvent(); }
    gameState.danger = Math.max(0, gameState.danger + dangerGain);
    if(typeof _updateDangerDisplay==='function') _updateDangerDisplay();
    if (gameState.player.role === 'Idol' && gameState.groupPopularity !== undefined) {
        var gpGain = Math.floor(Math.random() * 3) + 1;
        gameState.groupPopularity += gpGain;
    }

    var storyHtml = '';
    var rankResult = '';
    var eventText = '';

    if (n.type === 'musicshow') {
        var rand = Math.random();
        if (rand < 0.3) {
            rankResult = '一位';
            moneyGain += 10000;
            gameState.money += 10000;
            eventText = '你站在舞台中央，听到主持人宣布你的名字时，整个场馆沸腾了！';
            storyHtml = '<div class="card" style="border-left:4px solid #FFD700;"><div style="font-weight:700;color:#FFD700;font-size:16px;">一位!</div><div style="font-size:13px;color:var(--color-text-light);margin-top:6px;line-height:1.6;">' + eventText + '</div></div>';
            notifyNews('热搜', '你登上了热搜！');
            _triggerHotsearch(gameState.player.name + '打歌一位', (Math.floor(Math.random() * 15) + 15) + '万', gameState.player.name + '在打歌舞台斩获一位！直拍播放量瞬间破百万，粉丝们在各大平台疯狂庆祝。这是实力的证明，也是新征程的起点。', false);
            _triggerHotsearch(gameState.player.group + '直拍破百万', (Math.floor(Math.random() * 10) + 8) + '万', gameState.player.group + '的舞台直拍在公开后一小时内突破百万播放，弹幕和评论瞬间刷屏。业内人士评价"这是今年最精彩的打歌舞台之一"。', false);
            _triggerKakaoCongrats();
        } else if (rand < 0.7) {
            rankResult = '二位';
            eventText = '虽然差一点，但你的表现仍然赢得了观众的掌声。';
            storyHtml = '<div class="card" style="border-left:4px solid #C0C0C0;"><div style="font-weight:700;color:#888;font-size:16px;">二位</div><div style="font-size:13px;color:var(--color-text-light);margin-top:6px;line-height:1.6;">' + eventText + '</div></div>';
            _triggerHotsearch(gameState.player.group + '打歌二位', (Math.floor(Math.random() * 8) + 5) + '万', gameState.player.group + '在今日打歌舞台获得二位，虽然遗憾未能夺冠，但舞台表现依然获得一致好评。粉丝表示"下次一定是一位！"', false);
        } else {
            rankResult = '未入榜';
            eventText = '这次的成绩不够理想，但下次一定会更好。';
            storyHtml = '<div class="card"><div style="font-weight:700;color:var(--color-text-light);font-size:16px;">未入榜</div><div style="font-size:13px;color:var(--color-text-light);margin-top:6px;line-height:1.6;">' + eventText + '</div></div>';
            _triggerHotsearch(gameState.player.name + '打歌未入榜', (Math.floor(Math.random() * 5) + 2) + '万', gameState.player.name + '在打歌舞台未能入榜，引发粉丝热议。部分粉丝表示理解并鼓励，也有声音质疑选曲和舞台编排。', true);
        }
    } else if (n.type === 'mcountdown' || n.type === 'inkigayo' || n.type === 'musiccore') {
        var score = Math.random();
        var grade = '';
        if (score < 0.15) { grade = 'S'; moneyGain += 8000; gameState.money += 8000; }
        else if (score < 0.45) { grade = 'A'; moneyGain += 3000; gameState.money += 3000; }
        else if (score < 0.8) { grade = 'B'; }
        else { grade = 'C'; }
        rankResult = grade + '级';
        var showName = n.name;
        if (grade === 'S') {
            eventText = '你的表演堪称完美！评委一致给出最高评价。';
            storyHtml = '<div class="card" style="border-left:4px solid #FFD700;"><div style="font-weight:700;color:#FFD700;font-size:18px;">S级</div><div style="font-size:13px;color:var(--color-text-light);margin-top:6px;line-height:1.6;">' + eventText + '</div></div>';
            _triggerHotsearch(gameState.player.name + showName + 'S级评价', (Math.floor(Math.random() * 12) + 10) + '万', gameState.player.name + '在' + showName + '获得S级评价！评委盛赞"这是本季最出色的舞台表现之一"。粉丝纷纷表示实至名归，直拍数据飙升。', false);
            _triggerHotsearch(gameState.player.group + '综艺感爆发', (Math.floor(Math.random() * 8) + 6) + '万', gameState.player.group + '成员在' + showName + '展现出超强综艺感和舞台掌控力，相关片段在社交平台广泛传播，话题阅读量持续攀升。', false);
            _triggerKakaoCongrats();
        } else if (grade === 'C') {
            eventText = '评委的表情有些微妙，看来这次发挥不太理想...';
            storyHtml = '<div class="card" style="border-left:4px solid var(--color-danger);"><div style="font-weight:700;color:var(--color-danger);font-size:18px;">C级</div><div style="font-size:13px;color:var(--color-text-light);margin-top:6px;line-height:1.6;">' + eventText + '</div></div>';
            _triggerHotsearch(gameState.player.name + showName + '表现引争议', (Math.floor(Math.random() * 8) + 3) + '万', gameState.player.name + '在' + showName + '的表现获得C级评价，引发网友热议。有人指出状态不佳可能是行程过密导致，也有批评声音认为准备不足。', true);
            _triggerKakaoComfort();
        } else {
            eventText = '你的发挥还不错，继续努力！';
            storyHtml = '<div class="card" style="border-left:4px solid var(--color-primary);"><div style="font-weight:700;color:var(--color-primary);font-size:18px;">' + grade + '级</div><div style="font-size:13px;color:var(--color-text-light);margin-top:6px;line-height:1.6;">' + eventText + '</div></div>';
        }
    } else if (n.type === 'concert') {
        var events = ['安可时全场大合唱，你感动落泪', '应援声如潮水般涌来，舞台灯光璀璨', '粉丝们的灯牌拼出你的名字，你深深鞠躬', '最后一首歌结束，全场起立鼓掌长达三分钟'];
        eventText = events[Math.floor(Math.random() * events.length)];
        storyHtml = '<div class="card" style="border-left:4px solid var(--color-primary);"><div style="font-weight:700;color:var(--color-primary);font-size:16px;">LIVE</div><div style="font-size:13px;color:var(--color-text-light);margin-top:6px;line-height:1.6;">' + eventText + '</div></div>';
        _triggerHotsearch(gameState.player.group + '演唱会名场面', (Math.floor(Math.random() * 15) + 10) + '万', gameState.player.group + '演唱会现场诞生名场面！' + eventText + '。粉丝录制的现场视频在社交平台疯狂转发，话题热度持续攀升。', false);
        _triggerHotsearch(gameState.player.name + '演唱会solo', (Math.floor(Math.random() * 10) + 5) + '万', gameState.player.name + '在演唱会的solo环节成为全场最大亮点，高音和舞蹈实力获全场认可。现场粉丝尖叫不断，线上直播弹幕刷屏。', false);
    } else if (n.type === 'fanmeet') {
        var fEvents = ['读了粉丝的来信，大家都很感动', '和粉丝玩互动游戏，笑声不断', '准备了惊喜环节，粉丝尖叫连连', '合影环节大家比心，氛围超暖'];
        eventText = fEvents[Math.floor(Math.random() * fEvents.length)];
        storyHtml = '<div class="card" style="border-left:4px solid #A070E0;"><div style="font-weight:700;color:#A070E0;font-size:16px;">FAN MEET</div><div style="font-size:13px;color:var(--color-text-light);margin-top:6px;line-height:1.6;">' + eventText + '</div></div>';
        _triggerHotsearch(gameState.player.name + '粉丝见面会暖心瞬间', (Math.floor(Math.random() * 8) + 5) + '万', gameState.player.name + '在粉丝见面会上' + eventText + '。现场粉丝纷纷表示"被暖到了"，相关视频片段在社交平台广泛传播。', false);
    } else {
        eventText = '录制顺利完成，节目组对你的表现很满意。';
        storyHtml = '<div class="card"><div style="font-size:13px;color:var(--color-text-light);line-height:1.6;">' + eventText + '</div></div>';
    }

    var fanComments = ['今天的表现太棒了！', '好期待下次活动！', '永远支持你！', '舞台太震撼了！', '今天状态超好！', '比心！', '太专业了，佩服！', '这就是实力！'];
    var comments = [];
    for (var ci = 0; ci < 3; ci++) { comments.push(fanComments[Math.floor(Math.random() * fanComments.length)]); }

    var summaryHtml = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'work\')">‹ 通告</div><div class="page-title">活动总结</div><div style="width:32px;"></div></div><div class="page-content">'
        + '<div class="card" style="text-align:center;padding:24px;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;"><div style="font-size:20px;font-weight:700;">' + n.name + '</div><div style="font-size:13px;opacity:0.8;margin-top:4px;">' + rankResult + '</div></div>'
        + storyHtml
        + '<div class="card"><div style="font-weight:600;margin-bottom:8px;">粉丝评价</div>'
        + comments.map(function(c) { return '<div style="padding:8px 0;border-bottom:1px solid var(--color-border);font-size:13px;color:var(--color-text-light);">' + c + '</div>'; }).join('')
        + '</div>'
        + '<div class="card"><div style="font-weight:600;margin-bottom:12px;">数值变化</div>'
        + '<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;"><span>金币</span><span style="color:#4CD964;font-weight:600;">+' + moneyGain.toLocaleString() + '</span></div>'
        + '<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;"><span>名气</span><span style="color:#4CD964;font-weight:600;">+' + fameGain + '</span></div>'
        + '<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;"><span>影响力</span><span style="color:#4CD964;font-weight:600;">+' + influenceGain + '</span></div>'
        + '<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;"><span>粉丝</span><span style="color:#4CD964;font-weight:600;">+' + fansGain + '</span></div>'
        + '<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;"><span>体力</span><span style="color:#FF6B8A;font-weight:600;">-' + n.体力 + '</span></div>'
        + (dangerGain > 0 ? '<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;"><span>危险值</span><span style="color:#FF6B8A;font-weight:600;">+' + dangerGain + '</span></div>' : '')
        + '</div>'
        + '<button class="btn btn-primary btn-lg" onclick="goToPage(\'work\')" style="margin-top:8px;">返回通告</button>'
        + '</div></div>';

    var app = document.getElementById('app');
    if (app) app.innerHTML = summaryHtml;
}

function _triggerHotsearch(topic, posts, detail, isNegative) {
    if (!hotsearchList) hotsearchList = [];
    if (hotsearchList.length === 0) generateHotsearchList();
    var isHot = !isNegative;
    hotsearchList.unshift({ rank: 1, topic: '#' + topic, posts: posts, hot: isHot, detail: detail });
    if (hotsearchList.length > 8) hotsearchList.pop();
    for (var ri = 0; ri < hotsearchList.length; ri++) { hotsearchList[ri].rank = ri + 1; }
}

function _triggerKakaoCongrats() {
    if (!gameState.kakaoFriends || gameState.kakaoFriends.length === 0) return;
    var friend = gameState.kakaoFriends[Math.floor(Math.random() * gameState.kakaoFriends.length)];
    if (!gameState.kakaoChats[friend]) gameState.kakaoChats[friend] = [];
    gameState.kakaoChats[friend].push({ from: friend, text: '太厉害了！！恭喜！！', time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) });
}

function _triggerKakaoComfort() {
    if (!gameState.kakaoFriends || gameState.kakaoFriends.length === 0) return;
    var friend = gameState.kakaoFriends[Math.floor(Math.random() * gameState.kakaoFriends.length)];
    if (!gameState.kakaoChats[friend]) gameState.kakaoChats[friend] = [];
    gameState.kakaoChats[friend].push({ from: friend, text: '没关系，下次一定行的！加油！', time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) });
}

function render恋爱Page(container) {
    if (!gameState.npc好感度) gameState.npc好感度 = {};
    var sameCompanyNPCs = getSameCompanyNPCs();
    
    container.innerHTML = '\n        <div class="page active">\n            <div class="page-header">\n                <div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>\n                <div class="page-title">恋爱</div>\n                <div style="width: 32px;"></div>\n            </div>\n            <div class="page-content">\n                ' + (gameState.dating ? '\n                    <div class="card" style="text-align: center; padding: 24px; background: linear-gradient(135deg, #FFF5F7, #FFE4EC);">\n                        <div class="avatar" style="width: 64px; height: 64px; font-size: 24px; margin: 0 auto 12px;">' + (gameState.dating.charAt(0)) + '</div>\n                        <div style="font-weight: 700; font-size: 18px; color: var(--color-primary);">恋爱中</div>\n                        <div style="font-weight: 600; font-size: 16px; margin-top: 4px;">与 ' + (gameState.dating) + '</div>\n                        <div style="font-size: 12px; color: var(--color-text-light); margin-top: 4px;">好感度: ' + ((gameState.npc好感度[gameState.dating] || 0)) + '/100</div>\n                        <button class="btn btn-sm btn-secondary" onclick="breakup()" style="margin-top: 12px;">分手</button>\n                    </div>\n                    <div class="section-title" style="margin-top: 16px;">交流</div>\n                    <div class="card" onclick="loveChat()" style="cursor:pointer;">\n                        <div style="font-weight: 600;">发消息</div>\n                        <div style="font-size: 12px; color: var(--color-text-light);">和 ' + (gameState.dating) + ' 聊天</div>\n                    </div>\n                    <div class="card" onclick="loveDate()" style="cursor:pointer;">\n                        <div style="font-weight: 600;">约会</div>\n                        <div style="font-size: 12px; color: var(--color-text-light);">消耗金币和体力</div>\n                    </div>\n                ' : '\n                    <div class="section-title">同公司成员</div>\n                    ' + (sameCompanyNPCs.map(function(npc) {
                        var 好感 = gameState.npc好感度[npc.name] || 0;
                        var canDate = 好感 >= 60;
                        return '\n                            <div class="card">\n                                <div style="display: flex; align-items: center;">\n                                    <div class="avatar-sm">' + (npc.name.charAt(0)) + '</div>\n                                    <div style="margin-left: 12px; flex: 1;">\n                                        <div style="font-weight: 600;">' + (npc.name) + '</div>\n                                        <div style="font-size: 12px; color: var(--color-text-light);">' + (npc.position) + '</div>\n                                        <div style="margin-top: 4px;">\n                                            <div style="display: flex; align-items: center; gap: 6px;">\n                                                <span style="font-size: 11px; color: var(--color-text-light);">好感</span>\n                                                <div style="flex:1;height:6px;background:var(--color-border);border-radius:3px;overflow:hidden;"><div style="height:100%;width:' + (好感) + '%;background:linear-gradient(90deg,#FF8FA3,#FFB3C1);border-radius:2px;"></div></div>\n                                                <span style="font-size: 11px; font-weight: 600; color: ' + (好感 >= 60 ? 'var(--color-primary)' : 'var(--color-text-light)') + ';">' + (好感) + '</span>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div style="display: flex; flex-direction: column; gap: 4px;">\n                                        <button class="btn btn-sm btn-primary" onclick="npcChat(\'' + (npc.name) + '\')" style="font-size:10px;padding:4px 8px;">聊天</button>\n                                        ' + (canDate ? '<button class="btn btn-sm btn-primary" data-npc_name="' + npc.name + '" onclick="npcDate(this.dataset.npc_name)" style="font-size:10px;padding:4px 8px;">在一起</button>' : '<div style="font-size:10px;color:var(--color-text-light);text-align:center;">好感60解锁</div>') + '\n                                    </div>\n                                </div>\n                            </div>\n                        ';
                    }).join('')) + '\n                ') + '\n            </div>\n        </div>\n    ';
}

function getSameCompanyNPCs() {
    var npcs = [];
    var company = COMPANIES[gameState.player.company];
    if (!company) return npcs;
    var keys = Object.keys(company.groups);
    for (var k = 0; k < keys.length; k++) {
        var group = company.groups[keys[k]];
        for (var m = 0; m < group.members.length; m++) {
            if (group.members[m].name !== gameState.player.name) {
                npcs.push(group.members[m]);
            }
        }
    }
    return npcs;
}

function npcChat(name) {
    if (!gameState.npc好感度) gameState.npc好感度 = {};
    var conversations = [
        { npc: '最近训练辛苦吗？', options: ['还行，加油！', '有点累但值得', '你也是，一起加油'] },
        { npc: '周末有什么安排吗？', options: ['想去看电影', '可能要加班训练', '想和你一起出去玩'] },
        { npc: '你觉得今天的表演怎么样？', options: ['非常棒！', '还有进步空间', '你表现得最好'] }
    ];
    var conv = conversations[Math.floor(Math.random() * conversations.length)];
    var _chatOpts = conv.options.map(function(o, oi) { return '<button class="btn btn-sm btn-secondary" data-name="'+name+'" data-reply="'+o.replace(/"/g, '&quot;')+'" onclick="npcChatReply(this.dataset.name,this.dataset.reply)" style="font-size:12px;">' + o + '</button>'; }).join('');
    showModal(name + ' 发来消息', conv.npc + '<div style="margin-top:12px;display:flex;flex-direction:column;gap:6px;">' + _chatOpts + '</div>');
}

function npcChatReply(name, reply) {
    if (!gameState.npc好感度) gameState.npc好感度 = {};
    if (!gameState.npc好感度[name]) gameState.npc好感度[name] = 0;
    gameState.npc好感度[name] = Math.min(100, gameState.npc好感度[name] + Math.floor(Math.random() * 10) + 3);
    closeModal();
    showModal('已回复', '你: ' + reply + '\n好感度 +' + (Math.floor(Math.random() * 10) + 3));
    render();
}

function npcDate(name) {
    if (!gameState.npc好感度 || (gameState.npc好感度[name] || 0) < 60) {
        showModal('好感度不足', '需要好感度达到60才能在一起');
        return;
    }
    gameState.dating = name;
    showModal('在一起了！', '你和 ' + name + ' 正式在一起了！');
    render();
}

function loveChat() {
    if (!gameState.dating) return;
    if (!gameState.npc好感度) gameState.npc好感度 = {};
    if (!gameState.npc好感度[gameState.dating]) gameState.npc好感度[gameState.dating] = 0;
    var datingName = gameState.dating;
    showModal('和 ' + datingName + ' 聊天', '<input type="text" id="datingMsgInput" placeholder="说点什么..." style="margin-bottom: 0;">', [
        { text: '取消', action: closeModal },
        { text: '发送', action: function() {
            var input = document.getElementById('datingMsgInput');
            var text = input ? input.value.trim() : '';
            if (text) {
                gameState.npc好感度[datingName] = Math.min(100, (gameState.npc好感度[datingName] || 0) + Math.floor(Math.random() * 5) + 2);
                getAIReply('dating', datingName + '恋爱对话', text, function(reply) {
                    closeModal();
                    showModal(datingName, reply);
                    render();
                });
            }
        }}
    ]);
    gameState.datingUnread = 0;
}

function loveDate() {
    if (!gameState.dating) return;
    if (gameState.体力 < 20) { showModal('体力不足', '约会需要20体力'); return; }
    if (gameState.money < 10000) { showModal('金币不足', '约会需要10,000金币'); return; }
    gameState.体力 = Math.max(0, gameState.体力 - 20);
    gameState.money -= 10000;
    if (!gameState.npc好感度) gameState.npc好感度 = {};
    if (!gameState.npc好感度[gameState.dating]) gameState.npc好感度[gameState.dating] = 0;
    gameState.npc好感度[gameState.dating] = Math.min(100, gameState.npc好感度[gameState.dating] + Math.floor(Math.random() * 10) + 5);
    showModal('约会愉快', '和 ' + gameState.dating + ' 度过了美好时光\n-20 体力 -10,000 金币\n好感度 +8');
    render();
}

function showInterest(name) {
    if (!gameState.npc好感度) gameState.npc好感度 = {};
    if (!gameState.npc好感度[name]) gameState.npc好感度[name] = 0;
    if (gameState.npc好感度[name] >= 60) {
        gameState.dating = name;
        showModal('在一起了', '你和 ' + name + ' 正式在一起了！');
    } else {
        showModal('好感度不足', name + ' 的好感度为 ' + gameState.npc好感度[name] + '，需要60才能在一起');
    }
    render();
}

function getAvailableNPCs() {
    var npcs = [];
    var companyKeys = Object.keys(COMPANIES);
    for (var ci = 0; ci < companyKeys.length; ci++) {
        var company = COMPANIES[companyKeys[ci]];
        var groupKeys = Object.keys(company.groups);
        for (var gi = 0; gi < groupKeys.length; gi++) {
            var group = company.groups[groupKeys[gi]];
            for (var mi = 0; mi < group.members.length; mi++) {
                if (group.members[mi].name !== gameState.player.name) {
                    npcs.push(group.members[mi].name);
                }
            }
        }
    }
    var unique = [];
    for (var ui = 0; ui < npcs.length; ui++) {
        if (unique.indexOf(npcs[ui]) === -1) unique.push(npcs[ui]);
    }
    return unique;
}

function breakup() {
    if (gameState.dating && gameState.npc好感度) {
        gameState.npc好感度[gameState.dating] = Math.max(0, (gameState.npc好感度[gameState.dating] || 0) - 20);
    }
    gameState.dating = null;
    showModal('分手', '你们已经分手了。好感度 -20');
    render();
}

// ==================== BUBBLE & WEVERSE ====================
var bubbleChatTarget = '';
var bubbleMultilangMessages = [
    { from: 'fan_lover', orig: '당신의 최신 공연이 정말 멋져요!', zh: '你最新的表演太棒了！', lang: 'ko', time: '刚刚' },
    { from: 'kpop_stan', orig: 'ライブ配信をお願いします！', zh: '请开直播吧！', lang: 'ja', time: '5分钟前' },
    { from: 'daily_fan', orig: 'Good luck today! Fighting!', zh: '今天加油！', lang: 'en', time: '10分钟前' },
    { from: 'honey_dew', orig: '목소리가 너무 위로가 돼요~', zh: '你的声音太治愈了~', lang: 'ko', time: '30分钟前' },
    { from: 'star_dust', orig: '今日の練習お疲れ様でした！', zh: '今天练习辛苦了！', lang: 'ja', time: '1小时前' },
    { from: 'moon_child', orig: 'Your smile makes my day brighter!', zh: '你的笑容照亮了我的一天！', lang: 'en', time: '2小时前' },
    { from: 'sky_walker', orig: '다음 무대도 기대할게요!', zh: '期待你下一个舞台！', lang: 'ko', time: '3小时前' },
    { from: 'sakura_fan', orig: '新しい曲が本当に素敵です！', zh: '新歌真的太棒了！', lang: 'ja', time: '4小时前' },
    { from: 'glow_up', orig: 'You inspire me every single day!', zh: '你每天都激励着我！', lang: 'en', time: '5小时前' }
];

function render泡泡Page(container) {
    if (!gameState.bubbleUnread) gameState.bubbleUnread = 0;
    if (!gameState.bubbleChats) gameState.bubbleChats = {};
    if (!gameState.bubble已发送) gameState.bubble已发送 = [];
    if (!gameState.bubbleStickers) gameState.bubbleStickers = [];
    if (bubbleChatTarget) {
        var chatMsgs = gameState.bubbleChats[bubbleChatTarget] || [];
        var chatHtml = '<div style="flex:1;overflow-y:auto;padding:12px;" id="bubbleChatArea">';
        for (var ci = 0; ci < chatMsgs.length; ci++) {
            var cm = chatMsgs[ci];
            chatHtml += '<div class="kakao-msg-row ' + (cm.fromMe ? 'me' : 'npc') + '"><div class="kakao-msg-bubble ' + (cm.fromMe ? 'me' : 'npc') + '">' + cm.text + '</div></div>';
        }
        chatHtml += '</div>';
        container.innerHTML = '<div class="page active" style="display:flex;flex-direction:column;">'
            + '<div class="page-header">'
            + '<div class="back-btn" onclick="bubbleChatTarget=\'\';render();">\u2039 返回</div>'
            + '<div class="page-title">' + bubbleChatTarget + '</div>'
            + '<div style="width:32px;"></div>'
            + '</div>'
            + chatHtml
            + '<div style="display:flex;gap:8px;padding:8px 12px;background:var(--bg-card);border-top:1px solid var(--color-border);">'
            + '<input type="text" id="bubbleChatInput" placeholder="输入消息..." style="flex:1;margin-bottom:0;font-size:13px;padding:10px 14px;">'
            + '<button class="btn btn-sm btn-primary" onclick="send泡泡Chat()" style="padding:10px 14px;">发送</button>'
            + '</div></div>';
        setTimeout(function(){ var area = document.getElementById('bubbleChatArea'); if(area) area.scrollTop = area.scrollHeight; }, 100);
        return;
    }
    var currentTab = window._bubbleTab || 'inbox';
    var tabBtns = '<div style="display:flex;gap:6px;margin-bottom:12px;">'
        + '<button class="btn btn-sm ' + (currentTab === 'inbox' ? 'btn-primary' : 'btn-secondary') + '" onclick="window._bubbleTab=\'inbox\';render();" style="flex:1;">收件箱</button>'
        + '<button class="btn btn-sm ' + (currentTab === 'sent' ? 'btn-primary' : 'btn-secondary') + '" onclick="window._bubbleTab=\'sent\';render();" style="flex:1;">已发送</button>'
        + '<button class="btn btn-sm ' + (currentTab === 'stickers' ? 'btn-primary' : 'btn-secondary') + '" onclick="window._bubbleTab=\'stickers\';render();" style="flex:1;">表情包商店</button>'
        + '</div>';

    var contentHtml = '';
    if (currentTab === 'inbox') {
        var messages = bubbleMultilangMessages;
        for (var i = 0; i < messages.length; i++) {
            var m = messages[i];
            var langTag = m.lang === 'ko' ? '韩' : m.lang === 'ja' ? '日' : 'EN';
            var langColor = m.lang === 'ko' ? '#FF8FA3' : m.lang === 'ja' ? '#7EC8E3' : '#FFD700';
            contentHtml += '<div class="card">'
                + '<div style="display:flex;justify-content:space-between;margin-bottom:8px;">'
                + '<span style="font-weight:600;color:var(--color-primary);">' + m.from + ' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:' + langColor + ';color:white;font-weight:500;">' + langTag + '</span></span>'
                + '<span style="font-size:11px;color:var(--color-text-light);">' + m.time + '</span>'
                + '</div>'
                + '<p style="font-size:14px;margin-bottom:4px;" id="bubbleMsg' + i + '">' + m.orig + ' <span class="translate-btn" onclick="translateBubbleMsg(' + i + ')">翻译</span></p>'
                + '<div style="display:flex;gap:8px;margin-top:10px;">'
                + '<button class="btn btn-sm btn-secondary" data-from="'+m.from+'" onclick="window._replyTarget=this.dataset.from;replyTo泡泡()">回复</button>'
                + '</div></div>';
        }
        // Bottom input bar for inbox
        contentHtml += '<div style="display:flex;gap:8px;padding:8px 0;margin-top:12px;border-top:1px solid var(--color-border);">'
            + '<input type="text" id="bubbleInboxInput" placeholder="回复粉丝消息..." style="flex:1;font-size:13px;padding:10px 14px;border:1px solid var(--color-border);border-radius:8px;">'
            + '<div class="btn btn-sm" style="padding:10px 12px;background:var(--color-primary);color:white;border-radius:8px;" onclick="showBubblePlusMenu()">+</div>'
            + '</div>';
    } else if (currentTab === 'sent') {
        if (gameState.bubble已发送 && gameState.bubble已发送.length > 0) {
            for (var si = 0; si < gameState.bubble已发送.length; si++) {
                var sm = gameState.bubble已发送[si];
                contentHtml += '<div class="card"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-weight:600;color:var(--color-primary);">回复给 ' + sm.to + '</span><span style="font-size:11px;color:var(--color-text-light);">' + sm.time + '</span></div><p style="font-size:14px;">' + sm.text + '</p></div>';
            }
        }
        if (!contentHtml) contentHtml = '<p style="text-align:center;color:var(--color-text-light);padding:20px;">暂无已发送消息</p>';
    } else if (currentTab === 'stickers') {
        var stickerPacks = [
            { name: '可爱猫咪', price: 3000, count: 8, color: '#FF8FA3' },
            { name: '韩系表情', price: 5000, count: 12, color: '#7C4DFF' },
            { name: '爱豆日常', price: 8000, count: 16, color: '#4CD964' },
            { name: '粉丝应援', price: 6000, count: 10, color: '#FFD700' },
            { name: '泡泡专属', price: 10000, count: 20, color: '#FF69B4' }
        ];
        for (var pi = 0; pi < stickerPacks.length; pi++) {
            var sp = stickerPacks[pi];
            var owned = gameState.bubbleStickers && gameState.bubbleStickers.indexOf(sp.name) >= 0;
            contentHtml += '<div class="card" style="display:flex;align-items:center;gap:12px;">'
                + '<div style="width:48px;height:48px;border-radius:12px;background:' + sp.color + ';color:white;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;">' + sp.name.charAt(0) + '</div>'
                + '<div style="flex:1;">'
                + '<div style="font-weight:600;font-size:14px;">' + sp.name + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">' + sp.count + '个表情</div>'
                + '</div>'
                + (owned ? '<span style="color:var(--color-success);font-weight:600;font-size:12px;">已拥有</span>'
                   : '<button class="btn btn-sm btn-primary" onclick="buyStickerPack(\'' + sp.name + '\',' + sp.price + ')">' + sp.price.toLocaleString() + '金币</button>')
                + '</div>';
        }
    }

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">泡泡</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + tabBtns
        + '<div id="bubbleContent">'
        + contentHtml
        + '</div>'
        + '</div></div>';
}

function buyStickerPack(name, price) {
    if (gameState.money < price) { showToast('金币不足'); return; }
    if (!gameState.bubbleStickers) gameState.bubbleStickers = [];
    if (gameState.bubbleStickers.indexOf(name) >= 0) { showToast('已拥有该表情包'); return; }
    showModal('购买表情包', '确认购买「' + name + '」？\n价格: ' + price.toLocaleString() + ' 金币', [
        { text: '取消', action: closeModal },
        { text: '确认', action: function() {
            gameState.money -= price;
            gameState.bubbleStickers.push(name);
            closeModal();
            showToast('已购买「' + name + '」');
            triggerSilentSave();
            render();
        }}
    ]);
}

function showBubblePlusMenu() {
    var stickerHtml = '';
    if (gameState.bubbleStickers && gameState.bubbleStickers.length > 0) {
        stickerHtml = '<div style="font-weight:600;margin-bottom:8px;">我的表情包</div>';
        for (var si = 0; si < gameState.bubbleStickers.length; si++) {
            var sn = gameState.bubbleStickers[si];
            stickerHtml += '<div class="card" style="padding:10px;cursor:pointer;margin-bottom:6px;" onclick="insertBubbleSticker(\'' + sn + '\')">'
                + '<div style="font-size:13px;">[' + sn + ']</div></div>';
        }
    }
    showModal('添加内容', stickerHtml + '<div style="font-size:12px;color:var(--color-text-light);margin-top:8px;">更多内容开发中...</div>', [
        { text: '关闭', action: closeModal }
    ]);
}

function insertBubbleSticker(name) {
    var input = document.getElementById('bubbleInboxInput');
    if (input) input.value = '[' + name + '] ';
    closeModal();
}

function translateBubbleMsg(idx) {
    var el = document.getElementById('bubbleMsg' + idx);
    if (!el) return;
    var zhText = bubbleMultilangMessages[idx] ? bubbleMultilangMessages[idx].zh : '';
    if (el.getAttribute('data-translated') === '1') {
        el.innerHTML = bubbleMultilangMessages[idx].orig + ' <span class="translate-btn" onclick="translateBubbleMsg(' + idx + ')">翻译</span>';
        el.setAttribute('data-translated', '0');
    } else {
        el.innerHTML = zhText + ' <span class="translate-btn" onclick="translateBubbleMsg(' + idx + ')">原文</span>';
        el.setAttribute('data-translated', '1');
    }
}
function switch泡泡Tab(tab) {
    if (!gameState.bubbleChats) gameState.bubbleChats = {};
    if (!gameState.bubble已发送) gameState.bubble已发送 = [];
    var contentEl = document.getElementById('bubbleContent');
    if (!contentEl) { render(); return; }
    if (tab === 'inbox') {
        var messages = bubbleMultilangMessages;
        var msgsHtml = '';
        for (var i = 0; i < messages.length; i++) {
            var m = messages[i];
            var langTag = m.lang === 'ko' ? '韩' : m.lang === 'ja' ? '日' : 'EN';
            var langColor = m.lang === 'ko' ? '#FF8FA3' : m.lang === 'ja' ? '#7EC8E3' : '#FFD700';
            msgsHtml += '<div class="card">'
                + '<div style="display:flex;justify-content:space-between;margin-bottom:8px;">'
                + '<span style="font-weight:600;color:var(--color-primary);">' + m.from + ' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:' + langColor + ';color:white;font-weight:500;">' + langTag + '</span></span>'
                + '<span style="font-size:11px;color:var(--color-text-light);">' + m.time + '</span>'
                + '</div>'
                + '<p style="font-size:14px;margin-bottom:4px;">' + m.orig + '</p>'
                + '<div style="display:flex;gap:8px;margin-top:10px;">'
                + '<button class="btn btn-sm btn-secondary" data-from="'+m.from+'" onclick="window._replyTarget=this.dataset.from;replyTo泡泡()">回复</button>'
                + '<button class="btn btn-sm btn-primary" data-from="'+m.from+'" onclick="bubbleChatTarget=this.dataset.from;render();">聊天</button>'
                + '</div></div>';
        }
        contentEl.innerHTML = msgsHtml;
    } else if (tab === 'sent') {
        var sentHtml = '';
        if (gameState.bubble已发送 && gameState.bubble已发送.length > 0) {
            for (var si = 0; si < gameState.bubble已发送.length; si++) {
                var sm = gameState.bubble已发送[si];
                sentHtml += '<div class="card"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-weight:600;color:var(--color-primary);">回复给 ' + sm.to + '</span><span style="font-size:11px;color:var(--color-text-light);">' + sm.time + '</span></div><p style="font-size:14px;">' + sm.text + '</p></div>';
            }
        }
        contentEl.innerHTML = sentHtml || '<p style="text-align: center; color: var(--color-text-light);">暂无已发送消息</p>';
    } else if (tab === 'chats') {
        var chatKeys = [];
        for (var ck in gameState.bubbleChats) {
            if (gameState.bubbleChats[ck] && gameState.bubbleChats[ck].length > 0) chatKeys.push(ck);
        }
        var chatHtml = '';
        if (chatKeys.length === 0) {
            chatHtml = '<p style="text-align:center;color:var(--color-text-light);padding:20px;">暂无聊天记录<br>去收件箱找爱豆聊天吧</p>';
        } else {
            for (var ki = 0; ki < chatKeys.length; ki++) {
                var kName = chatKeys[ki];
                var cMsgs = gameState.bubbleChats[kName];
                var lastMsg = cMsgs[cMsgs.length - 1] ? cMsgs[cMsgs.length - 1].text : '';
                chatHtml += '<div class="card" style="cursor:pointer;" onclick="bubbleChatTarget=\''+kName+'\';render();">'
                    + '<div style="display:flex;align-items:center;">'
                    + '<div class="avatar-sm" style="width:36px;height:36px;font-size:14px;background:var(--color-primary);color:white;">' + kName.charAt(0).toUpperCase() + '</div>'
                    + '<div style="margin-left:10px;flex:1;">'
                    + '<div style="font-weight:600;font-size:13px;">' + kName + '</div>'
                    + '<div style="font-size:11px;color:var(--color-text-light);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + lastMsg + '</div>'
                    + '</div></div></div>';
            }
        }
        contentEl.innerHTML = chatHtml;
    }
}

function replyTo泡泡(from) {
    if (!from) from = window._replyTarget || '';
    showModal('\u56de\u590d ' + from, '<input type="text" id="replyText" placeholder="\u8f93\u5165\u56de\u590d..." style="width:100%;padding:10px;border:1px solid var(--color-border);border-radius:8px;box-sizing:border-box;"><div id="replyResult" style="margin-top:8px;font-size:13px;min-height:20px;"></div>', [
        { text: '\u53d6\u6d88', action: function() { closeModal(); } },
        { text: '\u53d1\u9001', action: function() { sendBubbleReply(from); } }
    ]);
}

function sendBubbleReply(from) {
    var input = document.getElementById('replyText');
    if (!input || !input.value.trim()) return;
    var text = input.value.trim();
    if (!gameState.bubble已发送) gameState.bubble已发送 = [];
    gameState.bubble已发送.push({ to: from, text: text, time: new Date().toLocaleTimeString('zh-CN', {hour:'2-digit',minute:'2-digit'}) });
    if (!gameState.bubbleChats) gameState.bubbleChats = {};
    if (!gameState.bubbleChats[from]) gameState.bubbleChats[from] = [];
    gameState.bubbleChats[from].push({ fromMe: true, text: text });
    closeModal();
    showToast('已回复 ' + from);
    render();
}

function send泡泡Chat() {
    var input = document.getElementById('bubbleChatInput');
    if (!input || !input.value.trim() || !bubbleChatTarget) return;
    var msg = input.value.trim();
    input.value = '';
    if (!gameState.bubbleChats) gameState.bubbleChats = {};
    if (!gameState.bubbleChats[bubbleChatTarget]) gameState.bubbleChats[bubbleChatTarget] = [];
    gameState.bubbleChats[bubbleChatTarget].push({ fromMe: true, text: msg });
    gameState.bubbleChats[bubbleChatTarget].push({ fromMe: false, text: '...' });
    render();
    var npcCtx = bubbleChatTarget + '在泡泡和粉丝聊天';
    getAIReply('bubble', npcCtx, msg, function(reply) {
        if (!gameState.bubbleChats || !gameState.bubbleChats[bubbleChatTarget]) return;
        for (var ri = gameState.bubbleChats[bubbleChatTarget].length - 1; ri >= 0; ri--) {
            if (!gameState.bubbleChats[bubbleChatTarget][ri].fromMe && gameState.bubbleChats[bubbleChatTarget][ri].text === '...') {
                gameState.bubbleChats[bubbleChatTarget][ri].text = reply;
                break;
            }
        }
        if (!gameState.bubble已发送) gameState.bubble已发送 = [];
        gameState.bubble已发送.push({ to: bubbleChatTarget, text: msg, time: new Date().toLocaleTimeString('zh-CN', {hour:'2-digit',minute:'2-digit'}) });
        render();
    });
}

var weverseMultilangPosts = [
    { user: 'Aurora_Dawn', avatar: 'A', time: '2小时前', orig: '오늘 연습 정말 열심히 했어요! 모든 응원 감사합니다!', zh: '今天练习很认真！感谢大家的支持！', lang: 'ko', likes: 234, comments: 45 },
    { user: 'NewJeans', avatar: 'N', time: '昨天', orig: '新しいコンセプトフォトをチェックしてね！', zh: '看看我们的新概念照！', lang: 'ja', likes: 567, comments: 89 },
    { user: 'Myth_Official', avatar: 'M', time: '2天前', orig: 'We are preparing something special for our fans! Stay tuned!', zh: '我们正在为粉丝准备特别的内容！敬请期待！', lang: 'en', likes: 892, comments: 156 }
];

function renderWeversePage(container) {
    if (!gameState.bubbleChats) gameState.bubbleChats = {};
    if (!gameState.weverseMyPosts) gameState.weverseMyPosts = []; if (!gameState.weverseUnread) gameState.weverseUnread = 0;
    var postsHtml = '';
    for (var i = 0; i < weverseMultilangPosts.length; i++) {
        var p = weverseMultilangPosts[i];
        var langTag = p.lang === 'ko' ? '韩' : p.lang === 'ja' ? '日' : 'EN';
        var langColor = p.lang === 'ko' ? '#FF8FA3' : p.lang === 'ja' ? '#7EC8E3' : '#FFD700';
        postsHtml += '<div class="card bubble-msg-anim" style="animation-delay:' + (i * 0.1) + 's;">'
            + '<div style="display:flex;align-items:center;margin-bottom:10px;">'
            + '<div class="avatar-sm">' + p.avatar + '</div>'
            + '<div style="margin-left:8px;flex:1;">'
            + '<div style="font-weight:600;">' + p.user + ' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:' + langColor + ';color:white;font-weight:500;">' + langTag + '</span></div>'
            + '<div style="font-size:11px;color:var(--color-text-light);">' + p.time + '</div>'
            + '</div>'
            + '</div>'
            + '<p style="font-size:14px;" id="weverseMsg' + i + '">' + p.orig + ' <span class="translate-btn" onclick="translateWeverseMsg(' + i + ')">翻译</span></p>'
            + '</div>';
    }
    
    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">Weverse</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<button class="btn btn-primary btn-lg" onclick="postToWeverse()" style="margin-bottom:16px;">+ 发布动态</button>'
        + '<div class="section-title">我的发布</div>'
        + (gameState.weverseMyPosts.length === 0 ? '<div class="card" style="text-align:center;"><div style="color:var(--color-text-light);">还没有发过动态</div></div>' : (function(){ var myHtml = ''; for(var wi=0;wi<gameState.weverseMyPosts.length;wi++){ var wp=gameState.weverseMyPosts[wi]; myHtml += '<div class="card"><div style="display:flex;align-items:center;margin-bottom:8px;"><div class="avatar-sm">' + (gameState.player.avatar||'') + '</div><div style="margin-left:8px;"><div style="font-weight:600;">' + (gameState.player.name||'') + '</div><div style="font-size:11px;color:var(--color-text-light);">' + wp.time + '</div></div></div><p style="font-size:14px;">' + wp.text + '</p></div>'; } return myHtml; })())
        + '<div class="section-title" style="margin-top:16px;">爱豆动态</div>'
        + postsHtml
        + '</div></div>';
}

function translateWeverseMsg(idx) {
    var el = document.getElementById('weverseMsg' + idx);
    if (!el) return;
    var zhText = weverseMultilangPosts[idx] ? weverseMultilangPosts[idx].zh : '';
    if (el.getAttribute('data-translated') === '1') {
        el.innerHTML = weverseMultilangPosts[idx].orig + ' <span class="translate-btn" onclick="translateWeverseMsg(' + idx + ')">翻译</span>';
        el.setAttribute('data-translated', '0');
    } else {
        el.innerHTML = zhText + ' <span class="translate-btn" onclick="translateWeverseMsg(' + idx + ')">原文</span>';
        el.setAttribute('data-translated', '1');
    }
}

function postToWeverse() {
    showModal('发布动态', '<textarea id="weverse发布" placeholder="分享你的想法..." style="height: 100px; margin-bottom: 0;"></textarea>', [
        { text: '取消', action: closeModal },
        { text: '发布', action: function() {
            var ta = document.getElementById('weverse发布');
            if (ta && ta.value) {
                if (!gameState.weverseMyPosts) gameState.weverseMyPosts = [];
                gameState.weverseMyPosts.push({ text: ta.value, time: new Date().toLocaleTimeString('zh-CN', {hour:'2-digit',minute:'2-digit'}) });
                gameState.fans += Math.floor(Math.random() * 30) + 10;
                gameState.fame = Math.min(200, (gameState.fame || 30) + Math.floor(Math.random() * 2) + 1);
                gameState.influence = Math.min(200, (gameState.influence || 50) + Math.floor(Math.random() * 2) + 1);
                closeModal();
                showToast('动态已发布');
                render();
            }
        }}
    ]);
}

// ==================== INS & TIKTOK ====================
var isResting = false;
var restTimer = null;
var restCountdown = null;
var insTab = 'home';
var insSelectedImage = '';
var insMsgChatUser = '';
var insFollowedUsers = {};

function getSmartReply(userName, userMsg, platform) {
    if (!gameState.npc好感度) gameState.npc好感度 = {};
    var 好感 = gameState.npc好感度[userName] || 30;
    var dailyReplies = ['今天过得怎么样？', '刚吃完午饭～', '天气真好啊！', '要不要一起练习？', '休息一下吧', '今天好累啊', '刚看完一部剧，超好看！'];
    var trainReplies = ['舞蹈练习好辛苦', '今天声乐课有进步！', '说唱flow还需要练', '编舞好难记...', '体能训练太累了', '今天舞蹈老师夸我了！'];
    var idolReplies = ['下周有音乐节目打歌', '新专辑概念照出炉了', '粉丝见面会好开心', '今天录了综艺，很搞笑', '演唱会准备中', 'MV拍摄终于结束了'];
    var fanReplies = ['今天又涨粉了！', '粉丝送的礼物好感动', '看到粉丝的应援视频了', '签售会太幸福了', '粉丝做的项目好用心'];
    var encourageReplies = ['加油！我们一起努力', '你是最棒的！', '相信自己，没问题', '坚持就是胜利', '明天会更好！', '你一定可以的'];
    var coldReplies = ['嗯', '哦', '好吧', '知道了', '还行吧', '随便'];
    
    var allReplies;
    if (好感 < 30) {
        allReplies = coldReplies.concat(dailyReplies.slice(0, 2));
    } else if (好感 < 60) {
        allReplies = dailyReplies.concat(trainReplies).concat(encourageReplies);
    } else {
        allReplies = dailyReplies.concat(trainReplies).concat(idolReplies).concat(fanReplies).concat(encourageReplies);
    }
    
    var msgLower = (userMsg || '').toLowerCase();
    if (msgLower.indexOf('训练') > -1 || msgLower.indexOf('练习') > -1) {
        allReplies = trainReplies.concat(encourageReplies);
    } else if (msgLower.indexOf('粉丝') > -1 || msgLower.indexOf('应援') > -1) {
        allReplies = fanReplies.concat(encourageReplies);
    } else if (msgLower.indexOf('加油') > -1 || msgLower.indexOf('努力') > -1) {
        allReplies = encourageReplies.concat(idolReplies);
    } else if (msgLower.indexOf('演出') > -1 || msgLower.indexOf('舞台') > -1 || msgLower.indexOf('专辑') > -1) {
        allReplies = idolReplies.concat(encourageReplies);
    }
    
    var reply = allReplies[Math.floor(Math.random() * allReplies.length)];
    if (好感 >= 80 && Math.random() > 0.5) {
        reply = '❤️ ' + reply;
    }
    return reply;
}

var _translateContentCache = null;
function translateContent(text, idx, prefix) {
    var el = document.getElementById(prefix + idx);
    if (!el) return;
    if (!_translateContentCache) _translateContentCache = {};
    var cacheKey = prefix + '_' + idx;
    if (!_translateContentCache[cacheKey]) _translateContentCache[cacheKey] = text;
    if (el.getAttribute('data-translated') === '1') {
        el.innerHTML = text + ' <span class="translate-btn" onclick="translateContent(_translateContentCache[\'' + cacheKey + '\'],' + idx + ',\'' + prefix + '\')">原文</span>';
        el.setAttribute('data-translated', '0');
    } else {
        var translated = _simpleTranslate(text);
        el.innerHTML = translated + ' <span class="translate-btn" onclick="translateContent(_translateContentCache[\'' + cacheKey + '\'],' + idx + ',\'' + prefix + '\')">翻译</span>';
        el.setAttribute('data-translated', '1');
    }
}

function renderInsPage(container) {
    if (!gameState.insPosts) gameState.insPosts = [];
    if (!gameState.insMessages) gameState.insMessages = [];
    
    var tabContent = '';
    if (insTab === 'home') {
        var posts = [
            { user: 'park_jiwoo', avatar: 'P', time: '2小时前', content: 'Practice makes perfect!', img: 'https://picsum.photos/300/300?random=3', likes: 234 },
            { user: 'yeonjun_official', avatar: 'Y', time: '昨天', content: 'Behind the scenes of our new MV shoot!', img: 'https://picsum.photos/300/300?random=4', likes: 456 },
            { user: 'kim_nari_', avatar: 'K', time: '2天前', content: 'Late night practice session. No pain no gain!', img: 'https://picsum.photos/300/300?random=5', likes: 312 },
            { user: 'choi_naeun', avatar: 'C', time: '3天前', content: 'Beautiful sunset after rehearsal today.', img: 'https://picsum.photos/300/300?random=6', likes: 189 }
        ];
        var allPosts = gameState.insPosts.concat(posts);
        tabContent = '<div style="flex:1;overflow-y:auto;"><div style="display:flex;justify-content:flex-end;padding:8px 16px;"><button class="btn btn-sm btn-primary" onclick="postToIns()">+ 发动态</button></div>';
        for (var i = 0; i < allPosts.length; i++) {
            var p = allPosts[i];
            var contentId = 'insPost' + i;
            tabContent += '<div class="card"><div style="display:flex;align-items:center;margin-bottom:10px;"><div class="avatar-sm" style="cursor:pointer;" onclick="gameState.insProfileView=\'\' + p.user + \'\';goToPage(\'insprofile\')">' + p.avatar + '</div><div style="margin-left:8px;flex:1;"><div style="font-weight:600;">' + p.user + '</div><div style="font-size:11px;color:var(--color-text-light);">' + p.time + '</div></div></div><p style="font-size:14px;margin-bottom:10px;" id="' + contentId + '">' + p.content + ' <span class="translate-btn" onclick="translateContent(p.content, i, \'insPost\')">翻译</span></p>' + (p.img ? '<img src="' + p.img + '" style="width:100%;border-radius:8px;">' : '') + '<div style="margin-top:10px;display:flex;gap:16px;color:var(--color-text-light);font-size:13px;"><span>' + p.likes + ' 点赞</span><span>评论</span></div></div>';
        }
        tabContent += '</div>';
    } else if (insTab === 'messages') {
        if (insMsgChatUser) {
            var msgs = gameState.insMessages.filter(function(m) { return m.with === insMsgChatUser; });
            tabContent = '<div style="flex:1;display:flex;flex-direction:column;min-height:0;"><div style="padding:10px 16px;background:var(--bg-card);border-bottom:1px solid var(--color-border);display:flex;align-items:center;"><div class="back-btn" onclick="insMsgChatUser=\'\';render();" style="margin-right:8px;">‹</div><div style="font-weight:600;">' + insMsgChatUser + '</div></div><div style="flex:1;overflow-y:auto;padding:12px;">';
            if (msgs.length === 0) tabContent += '<div style="text-align:center;color:var(--color-text-light);font-size:12px;padding:20px;">暂无消息</div>';
            for (var i = 0; i < msgs.length; i++) {
                var m = msgs[i];
                tabContent += '<div style="margin-bottom:8px;' + (m.fromMe ? 'text-align:right;' : '') + '"><span style="display:inline-block;padding:8px 12px;border-radius:12px;font-size:13px;max-width:80%;' + (m.fromMe ? 'background:var(--color-primary);color:white;' : 'background:var(--color-border);color:var(--color-text);') + '">' + m.text + '</span></div>';
            }
            tabContent += '</div><div style="display:flex;gap:8px;padding:8px 12px;background:var(--bg-card);border-top:1px solid var(--color-border);"><input type="text" id="insChatInput" placeholder="输入消息..." style="flex:1;margin-bottom:0;font-size:13px;padding:10px 14px;"><button class="btn btn-sm btn-primary" onclick="sendInsChat()" style="padding:10px 14px;">发送</button></div></div>';
        } else {
            var notifications = [
                { type: 'like', user: 'park_jiwoo', text: '赞了你的动态', time: '5分钟前' },
                { type: 'follow', user: 'kpop_stan_99', text: '关注了你', time: '20分钟前' },
                { type: 'comment', user: 'kim_nari_', text: '评论了你的照片：太棒了！', time: '1小时前' },
                { type: 'like', user: 'yeonjun_official', text: '赞了你的动态', time: '3小时前' }
            ];
            var chatList = ['park_jiwoo', 'kim_nari_', 'choi_naeun'];
            var insChatUsers = {};
            for (var ic = 0; ic < gameState.insMessages.length; ic++) {
                insChatUsers[gameState.insMessages[ic].with] = true;
            }
            for (var icu in insChatUsers) {
                if (chatList.indexOf(icu) === -1) chatList.push(icu);
            }
            tabContent = '<div style="flex:1;overflow-y:auto;"><div class="section-title" style="padding:12px 16px 4px;">通知</div>';
            for (var i = 0; i < notifications.length; i++) {
                var n = notifications[i];
                tabContent += '<div style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--color-border);"><div class="avatar-sm" style="width:32px;height:32px;font-size:12px;">' + n.user.charAt(0).toUpperCase() + '</div><div style="flex:1;"><div style="font-size:13px;"><span style="font-weight:600;">' + n.user + '</span> <span style="color:var(--color-text-light);">' + n.text + '</span></div><div style="font-size:10px;color:var(--color-text-light);">' + n.time + '</div></div></div>';
            }
            tabContent += '<div class="section-title" style="padding:16px 16px 4px;">聊天</div>';
            for (var i = 0; i < chatList.length; i++) {
                var u = chatList[i];
                var lastMsg = '';
                var uMsgs = gameState.insMessages.filter(function(m2) { return m2.with === u; });
                if (uMsgs.length > 0) lastMsg = uMsgs[uMsgs.length-1].text;
                tabContent += '<div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--color-border);cursor:pointer;" data-user="' + u + '" onclick="insMsgChatUser=this.dataset.user;render();"><div class="avatar-sm" style="width:36px;height:36px;font-size:14px;">' + u.charAt(0).toUpperCase() + '</div><div style="flex:1;"><div style="font-weight:600;font-size:13px;">' + u + '</div><div style="font-size:11px;color:var(--color-text-light);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (lastMsg || '暂无消息') + '</div></div></div>';
            }
            tabContent += '</div>';
        }
    } else if (insTab === 'profile') {
        var totalLikes = gameState.totalLikes || 0;
        tabContent = '<div style="flex:1;overflow-y:auto;"><div style="text-align:center;padding:24px 16px;background:var(--bg-card);border-bottom:1px solid var(--color-border);"><div class="avatar" style="width:64px;height:64px;font-size:24px;margin:0 auto 10px;">' + (gameState.player.avatar || '') + '</div><div style="font-size:18px;font-weight:700;">' + gameState.player.name + '</div><div style="display:flex;justify-content:space-around;margin-top:16px;"><div style="text-align:center;"><div style="font-weight:600;font-size:16px;">' + gameState.insPosts.length + '</div><div style="font-size:10px;color:var(--color-text-light);">动态</div></div><div style="text-align:center;"><div style="font-weight:600;font-size:16px;">' + gameState.fans.toLocaleString() + '</div><div style="font-size:10px;color:var(--color-text-light);">粉丝</div></div><div style="text-align:center;"><div style="font-weight:600;font-size:16px;">' + totalLikes + '</div><div style="font-size:10px;color:var(--color-text-light);">获赞</div></div><div style="text-align:center;"><div style="font-weight:600;font-size:16px;">' + (gameState.fame || 30) + '</div><div style="font-size:10px;color:var(--color-text-light);">人气值</div></div></div></div>';
        if (gameState.insPosts.length === 0) {
            tabContent += '<div style="text-align:center;padding:30px;color:var(--color-text-light);font-size:13px;">还没有发过动态</div>';
        } else {
            tabContent += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;padding:2px;">';
            for (var i = 0; i < gameState.insPosts.length; i++) {
                var ip = gameState.insPosts[i];
                var shortContent = ip.content.length > 20 ? ip.content.substring(0,20) + '...' : ip.content;
                tabContent += '<div style="aspect-ratio:1;background:var(--color-border);border-radius:4px;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--color-text-light);padding:4px;cursor:pointer;" data-shortContent="' + shortContent + '" onclick="showModal(this.dataset.shortContent)">' + shortContent + '</div>';
            }
            tabContent += '</div>';
        }
        tabContent += '</div>';
    }
    
    var tabBar = '<div class="ins-top-tab">'
        + '<div class="ins-top-tab-item ' + (insTab === 'home' ? 'active' : '') + '" onclick="insTab=\'home\';insMsgChatUser=\'\';render();"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg><div style="font-size:10px;margin-top:2px;">首页</div></div>'
        + '<div class="ins-top-tab-item ' + (insTab === 'messages' ? 'active' : '') + '" onclick="insTab=\'messages\';insMsgChatUser=\'\';render();"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><div style="font-size:10px;margin-top:2px;">消息</div></div>'
        + '<div class="ins-top-tab-item ' + (insTab === 'profile' ? 'active' : '') + '" onclick="insTab=\'profile\';render();"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><div style="font-size:10px;margin-top:2px;">我的</div></div>'
        + '</div>';
    
    container.innerHTML = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">INS</div><div style="width:32px;"></div></div>' + tabBar + tabContent + '</div>';
}

function sendInsChat() {
    var input = document.getElementById('insChatInput');
    if (!input || !input.value.trim() || !insMsgChatUser) return;
    var msg = input.value.trim();
    input.value = '';
    if (!gameState.insMessages) gameState.insMessages = [];
    if (!gameState.npc好感度) gameState.npc好感度 = {};
    if (!gameState.npc好感度[insMsgChatUser]) gameState.npc好感度[insMsgChatUser] = 30;
    gameState.insMessages.push({ with: insMsgChatUser, fromMe: true, text: msg });
    render();
    gameState.insMessages.push({ with: insMsgChatUser, fromMe: false, text: '...' });
    render();
    var npcCtx = insMsgChatUser + '在INS上聊天';
    getAIReply('ins', npcCtx, msg, function(reply) {
        gameState.npc好感度[insMsgChatUser] = Math.min(100, (gameState.npc好感度[insMsgChatUser] || 30) + Math.floor(Math.random() * 3) + 1);
        for (var ri = gameState.insMessages.length - 1; ri >= 0; ri--) {
            if (gameState.insMessages[ri].with === insMsgChatUser && !gameState.insMessages[ri].fromMe && gameState.insMessages[ri].text === '...') {
                gameState.insMessages[ri].text = reply;
                break;
            }
        }
        if (currentPage !== 'ins') gameState.insUnread = (gameState.insUnread || 0) + 1;
        render();
    });
}

function postToIns() {
    showModal('发布动态', '<textarea id="ins发布" placeholder="配文..." style="height: 60px; margin-bottom: 8px;"></textarea><div id="insImagePreview" style="padding: 20px; background: var(--color-border); border-radius: 8px; text-align: center; cursor: pointer;" onclick="selectInsImage()">+ 添加图片</div>', [
        { text: '取消', action: closeModal },
        { text: '发布', action: function() {
            var ta = document.getElementById('ins发布');
            if (ta && ta.value) {
                var likes = Math.floor(Math.random() * 200) + 50;
                if (!gameState.insPosts) gameState.insPosts = [];
                gameState.insPosts.unshift({ user: gameState.player.name, avatar: gameState.player.avatar, time: '刚刚', content: ta.value, img: insSelectedImage, likes: likes });
                gameState.fans += Math.floor(Math.random() * 25) + 5;
                gameState.fame = Math.min(200, (gameState.fame || 30) + Math.floor(Math.random() * 3) + 1);
                gameState.totalLikes = (gameState.totalLikes || 0) + likes;
                insSelectedImage = '';
            }
            closeModal();
            render();
        }}
    ]);
}

function selectInsImage() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(ev) {
            insSelectedImage = ev.target.result;
            var preview = document.getElementById('insImagePreview');
            if (preview) {
                preview.innerHTML = '<img src="' + insSelectedImage + '" style="width:100%;max-height:150px;object-fit:cover;border-radius:8px;">';
            }
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

var tiktokTab = 'home';
var tiktokSelectedVideo = '';
var tiktokMsgChatUser = '';

function renderTiktokPage(container) {
    if (!gameState.tiktokPosts) gameState.tiktokPosts = [];
    if (!gameState.tiktokMessages) gameState.tiktokMessages = [];
    
    var tabContent = '';
    if (tiktokTab === 'home') {
        var videos = [
            { user: 'kim_nari_', avatar: 'K', plays: '100万', likes: '23.4万', comments: '5000', desc: 'New choreography practice! #kpop #fyp', color1: '#FFF5F7', color2: '#FFCCD8' },
            { user: 'park_jiwoo', avatar: 'P', plays: '85万', likes: '18.7万', comments: '3200', desc: 'Vocal cover of our new song! #vocal #cover', color1: '#E4F5FF', color2: '#B8E6F0' },
            { user: 'lee_hyunjin', avatar: 'L', plays: '72万', likes: '15.2万', comments: '2800', desc: 'Dance challenge with members! #challenge', color1: '#FFF4E0', color2: '#FFE0A0' },
            { user: 'choi_naeun', avatar: 'C', plays: '60万', likes: '12.1万', comments: '1900', desc: 'Backstage moments before the show #bts', color1: '#F0E4FF', color2: '#DFC4FF' },
            { user: 'aurora_dawn_official', avatar: 'A', plays: '200万', likes: '45.6万', comments: '8900', desc: 'Official MV teaser! #comingsoon', color1: '#E8F5E9', color2: '#C8E6C9' },
            { user: 'yg_newface', avatar: 'Y', plays: '50万', likes: '9.8万', comments: '1500', desc: 'Rap verse practice #hiphop #yg', color1: '#FFF5F7', color2: '#FFB3C1' }
        ];
        tabContent = '<div style="flex:1;overflow-y:auto;"><div style="display:flex;justify-content:flex-end;padding:8px 16px;"><button class="btn btn-sm btn-primary" onclick="postToTiktok()">+ 上传视频</button></div>';
        for (var vi = 0; vi < videos.length; vi++) {
            var v = videos[vi];
            tabContent += '<div class="card" style="margin-bottom:16px;"><div style="display:flex;align-items:center;margin-bottom:10px;"><div class="avatar-sm" style="cursor:pointer;" onclick="gameState.insProfileView=\'\' + v.user + \'\';goToPage(\'insprofile\')">' + v.avatar + '</div><div style="margin-left:8px;flex:1;"><div style="font-weight:600;">' + v.user + '</div><div style="font-size:11px;color:var(--color-text-light);">' + v.plays + ' 播放</div></div></div><div style="background:linear-gradient(135deg,' + v.color1 + ',' + v.color2 + ');height:180px;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:10px;cursor:pointer;position:relative;" data-vi="' + vi + '" onclick="simulateVideoPlay(this, parseInt(this.dataset.vi))"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><div style="position:absolute;bottom:8px;right:8px;display:flex;flex-direction:column;gap:12px;align-items:center;"><div style="text-align:center;cursor:pointer;" onclick="event.stopPropagation();"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8FA3" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg><div style="font-size:10px;color:var(--color-text-light);">' + v.likes + '</div></div><div style="text-align:center;cursor:pointer;" onclick="event.stopPropagation();showTiktokComment()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8FA3" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><div style="font-size:10px;color:var(--color-text-light);">' + v.comments + '</div></div></div></div><p style="font-size:14px;margin-bottom:0;" id="ttDesc' + vi + '">' + v.desc + ' <span class="translate-btn" onclick="translateContent(v.desc, vi, \'ttDesc\')">翻译</span></p></div>';
        }
        for (var upi = 0; upi < gameState.tiktokPosts.length; upi++) {
            var up = gameState.tiktokPosts[upi];
            var upAvatar = (gameState.player && gameState.player.avatar) ? gameState.player.avatar : 'U';
            var upName = (gameState.player && gameState.player.name) ? gameState.player.name : '我';
            tabContent += '<div class="card" style="margin-bottom:16px;">';
            tabContent += '<div style="display:flex;align-items:center;margin-bottom:10px;"><div class="avatar-sm">' + upAvatar + '</div><div style="margin-left:8px;flex:1;"><div style="font-weight:600;">' + upName + '</div><div style="font-size:11px;color:var(--color-text-light);">刚刚发布</div></div></div>';
            if (up.video) {
                tabContent += '<video src="' + up.video + '" controls style="width:100%;border-radius:8px;" preload="metadata"></video>';
            } else {
                tabContent += '<div style="background:linear-gradient(135deg,var(--color-secondary),var(--color-primary));height:120px;border-radius:8px;display:flex;align-items:center;justify-content:center;"><div style="color:white;font-size:14px;font-weight:600;text-align:center;padding:0 16px;">' + (up.desc || '') + '</div></div>';
            }
            if (up.desc && up.video) {
                tabContent += '<p style="font-size:14px;margin-top:10px;margin-bottom:0;">' + up.desc + '</p>';
            }
            tabContent += '<div style="display:flex;align-items:center;gap:6px;margin-top:8px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF8FA3" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg><span style="font-size:12px;color:var(--color-text-light);">' + up.likes + '</span></div>';
            tabContent += '</div>';
        }
        tabContent += '</div>';
    } else if (tiktokTab === 'messages') {
        if (tiktokMsgChatUser) {
            var msgs = gameState.tiktokMessages.filter(function(m) { return m.with === tiktokMsgChatUser; });
            tabContent = '<div style="flex:1;display:flex;flex-direction:column;min-height:0;"><div style="padding:10px 16px;background:var(--bg-card);border-bottom:1px solid var(--color-border);display:flex;align-items:center;"><div class="back-btn" onclick="tiktokMsgChatUser=\'\';render();" style="margin-right:8px;">‹</div><div style="font-weight:600;">' + tiktokMsgChatUser + '</div></div><div style="flex:1;overflow-y:auto;padding:12px;">';
            if (msgs.length === 0) tabContent += '<div style="text-align:center;color:var(--color-text-light);font-size:12px;padding:20px;">暂无消息</div>';
            for (var i = 0; i < msgs.length; i++) {
                var m = msgs[i];
                tabContent += '<div style="margin-bottom:8px;' + (m.fromMe ? 'text-align:right;' : '') + '"><span style="display:inline-block;padding:8px 12px;border-radius:12px;font-size:13px;max-width:80%;' + (m.fromMe ? 'background:var(--color-primary);color:white;' : 'background:var(--color-border);color:var(--color-text);') + '">' + m.text + '</span></div>';
            }
            tabContent += '</div><div style="display:flex;gap:8px;padding:8px 12px;background:var(--bg-card);border-top:1px solid var(--color-border);"><input type="text" id="tiktokChatInput" placeholder="输入消息..." style="flex:1;margin-bottom:0;font-size:13px;padding:10px 14px;"><button class="btn btn-sm btn-primary" onclick="sendTiktokChat()" style="padding:10px 14px;">发送</button></div></div>';
        } else {
            var notifications = [
                { user: 'dance_lover', text: '赞了你的视频', time: '10分钟前' },
                { user: 'kpop_fan_22', text: '关注了你', time: '30分钟前' },
                { user: 'mv_stan', text: '评论：编舞太强了！', time: '2小时前' }
            ];
            var chatList = ['kim_nari_', 'lee_hyunjin'];
            var tiktokChatUsers = {};
            for (var tc = 0; tc < gameState.tiktokMessages.length; tc++) {
                tiktokChatUsers[gameState.tiktokMessages[tc].with] = true;
            }
            for (var tcu in tiktokChatUsers) {
                if (chatList.indexOf(tcu) === -1) chatList.push(tcu);
            }
            tabContent = '<div style="flex:1;overflow-y:auto;"><div class="section-title" style="padding:12px 16px 4px;">通知</div>';
            for (var i = 0; i < notifications.length; i++) {
                var n = notifications[i];
                tabContent += '<div style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--color-border);"><div class="avatar-sm" style="width:32px;height:32px;font-size:12px;">' + n.user.charAt(0).toUpperCase() + '</div><div style="flex:1;"><div style="font-size:13px;"><span style="font-weight:600;">' + n.user + '</span> <span style="color:var(--color-text-light);">' + n.text + '</span></div><div style="font-size:10px;color:var(--color-text-light);">' + n.time + '</div></div></div>';
            }
            tabContent += '<div class="section-title" style="padding:16px 16px 4px;">聊天</div>';
            for (var i = 0; i < chatList.length; i++) {
                var u = chatList[i];
                var lastMsg = '';
                var uMsgs = gameState.tiktokMessages.filter(function(m2) { return m2.with === u; });
                if (uMsgs.length > 0) lastMsg = uMsgs[uMsgs.length-1].text;
                tabContent += '<div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--color-border);cursor:pointer;" data-user="' + u + '" onclick="tiktokMsgChatUser=this.dataset.user;render();"><div class="avatar-sm" style="width:36px;height:36px;font-size:14px;">' + u.charAt(0).toUpperCase() + '</div><div style="flex:1;"><div style="font-weight:600;font-size:13px;">' + u + '</div><div style="font-size:11px;color:var(--color-text-light);">' + (lastMsg || '暂无消息') + '</div></div></div>';
            }
            tabContent += '</div>';
        }
    } else if (tiktokTab === 'profile') {
        var totalLikes = gameState.totalLikes || 0;
        tabContent = '<div style="flex:1;overflow-y:auto;"><div style="text-align:center;padding:24px 16px;background:var(--bg-card);border-bottom:1px solid var(--color-border);"><div class="avatar" style="width:64px;height:64px;font-size:24px;margin:0 auto 10px;">' + (gameState.player.avatar || '') + '</div><div style="font-size:18px;font-weight:700;">' + gameState.player.name + '</div><div style="display:flex;justify-content:space-around;margin-top:16px;"><div style="text-align:center;"><div style="font-weight:600;font-size:16px;">' + gameState.tiktokPosts.length + '</div><div style="font-size:10px;color:var(--color-text-light);">视频</div></div><div style="text-align:center;"><div style="font-weight:600;font-size:16px;">' + gameState.fans.toLocaleString() + '</div><div style="font-size:10px;color:var(--color-text-light);">粉丝</div></div><div style="text-align:center;"><div style="font-weight:600;font-size:16px;">' + totalLikes + '</div><div style="font-size:10px;color:var(--color-text-light);">获赞</div></div><div style="text-align:center;"><div style="font-weight:600;font-size:16px;">' + (gameState.fame || 30) + '</div><div style="font-size:10px;color:var(--color-text-light);">人气值</div></div></div></div>';
        if (gameState.tiktokPosts.length === 0) {
            tabContent += '<div style="text-align:center;padding:30px;color:var(--color-text-light);font-size:13px;">还没有发过视频</div>';
        } else {
            tabContent += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;padding:2px;">';
            for (var i = 0; i < gameState.tiktokPosts.length; i++) {
                var tp = gameState.tiktokPosts[i];
                var shortDesc = tp.desc.length > 20 ? tp.desc.substring(0,20) + '...' : tp.desc;
                tabContent += '<div style="aspect-ratio:1;background:var(--color-border);border-radius:4px;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--color-text-light);padding:4px;cursor:pointer;" data-shortDesc="' + shortDesc + '" onclick="showModal(this.dataset.shortDesc)">' + shortDesc + '</div>';
            }
            tabContent += '</div>';
        }
        tabContent += '</div>';
    }
    
    var tabBar = '<div class="ins-top-tab">'
        + '<div class="ins-top-tab-item ' + (tiktokTab === 'home' ? 'active' : '') + '" onclick="tiktokTab=\'home\';tiktokMsgChatUser=\'\';render();"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg><div style="font-size:10px;margin-top:2px;">首页</div></div>'
        + '<div class="ins-top-tab-item ' + (tiktokTab === 'messages' ? 'active' : '') + '" onclick="tiktokTab=\'messages\';tiktokMsgChatUser=\'\';render();"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><div style="font-size:10px;margin-top:2px;">消息</div></div>'
        + '<div class="ins-top-tab-item ' + (tiktokTab === 'profile' ? 'active' : '') + '" onclick="tiktokTab=\'profile\';render();"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><div style="font-size:10px;margin-top:2px;">我的</div></div>'
        + '</div>';
    
    container.innerHTML = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">TikTok</div><div style="width:32px;"></div></div>' + tabBar + tabContent + '</div>';
}

function sendTiktokChat() {
    var input = document.getElementById('tiktokChatInput');
    if (!input || !input.value.trim() || !tiktokMsgChatUser) return;
    var msg = input.value.trim();
    input.value = '';
    if (!gameState.tiktokMessages) gameState.tiktokMessages = [];
    if (!gameState.npc好感度) gameState.npc好感度 = {};
    if (!gameState.npc好感度[tiktokMsgChatUser]) gameState.npc好感度[tiktokMsgChatUser] = 30;
    gameState.tiktokMessages.push({ with: tiktokMsgChatUser, fromMe: true, text: msg });
    render();
    gameState.tiktokMessages.push({ with: tiktokMsgChatUser, fromMe: false, text: '...' });
    render();
    var npcCtx = tiktokMsgChatUser + '在TikTok上聊天';
    getAIReply('tiktok', npcCtx, msg, function(reply) {
        gameState.npc好感度[tiktokMsgChatUser] = Math.min(100, (gameState.npc好感度[tiktokMsgChatUser] || 30) + Math.floor(Math.random() * 3) + 1);
        for (var ri = gameState.tiktokMessages.length - 1; ri >= 0; ri--) {
            if (gameState.tiktokMessages[ri].with === tiktokMsgChatUser && !gameState.tiktokMessages[ri].fromMe && gameState.tiktokMessages[ri].text === '...') {
                gameState.tiktokMessages[ri].text = reply;
                break;
            }
        }
        if (currentPage !== 'tiktok') gameState.tiktokUnread = (gameState.tiktokUnread || 0) + 1;
        render();
    });
}

function simulateVideoPlay(el, index) {
    if (!el) return;
    var colors = ['#FF8FA3','#7EC8E3','#FFD700','#C9A0FF','#4CD964','#FF6B8A'];
    var step = 0;
    var interval = setInterval(function() {
        step++;
        if (step >= 5) { clearInterval(interval); el.style.background = ''; return; }
        var c = colors[(index + step) % colors.length];
        el.style.background = 'linear-gradient(135deg, ' + c + '22, ' + c + '44)';
    }, 400);
    _addTimer(interval);
}

function showTiktokComment() {
    showModal('评论', '<input type="text" id="tiktokComment" placeholder="写评论..." style="margin-bottom:0;">', [
        { text: '取消', action: closeModal },
        { text: '发送', action: function() { var t = document.getElementById('tiktokComment'); if (t && t.value) { gameState.fans += 2; closeModal(); } } }
    ]);
}

function postToTiktok() {
    showModal('上传视频', '<div id="tiktokVideoPreview" style="padding: 40px; background: var(--color-border); border-radius: 8px; text-align: center; cursor: pointer;" onclick="selectTiktokVideo()">+ 选择视频</div><input type="text" id="tiktokDesc" placeholder="描述..." style="margin-top: 12px;" /><input type="text" id="tiktokTag" placeholder="#话题标签" style="margin-top: 8px;" />', [
        { text: '取消', action: closeModal },
        { text: '上传', action: function() {
            var descEl = document.getElementById('tiktokDesc');
            if (descEl && descEl.value) {
                var likes = Math.floor(Math.random() * 500) + 100;
                if (!gameState.tiktokPosts) gameState.tiktokPosts = [];
                gameState.tiktokPosts.unshift({ desc: descEl.value, video: tiktokSelectedVideo, likes: likes });
                gameState.fans += Math.floor(Math.random() * 40) + 10;
                gameState.fame = Math.min(200, (gameState.fame || 30) + Math.floor(Math.random() * 4) + 2);
                gameState.totalLikes = (gameState.totalLikes || 0) + likes;
                tiktokSelectedVideo = '';
            }
            closeModal();
            render();
        }}
    ]);
}

function selectTiktokVideo() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(ev) {
            tiktokSelectedVideo = ev.target.result;
            var preview = document.getElementById('tiktokVideoPreview');
            if (preview) {
                preview.innerHTML = '<div style="color:var(--color-primary);font-weight:600;">视频已选择</div>';
            }
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

// ==================== MORE PAGE ====================
function render更多服务Page(container) {
    container.innerHTML = '\n        <div class="page active">\n            <div class="page-header">\n                <div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>\n                <div class="page-title">更多</div>\n                <div style="width: 32px;"></div>\n            </div>\n            <div class="page-content">\n                <div class="section-title">服务项目</div>\n                \n                <div class="card" onclick="goToPage(\'food\')" style="cursor: pointer;">\n                    <div style="display: flex; align-items: center;">\n                        <div class="app-icon-wrap" style="width: 44px; height: 44px; border-radius: 12px; margin-right: 12px; flex-shrink: 0;">' + (getIcon('food')) + '</div>\n                        <div>\n                            <div style="font-weight: 600;">外卖订餐</div>\n                            <div style="font-size: 12px; color: var(--color-text-light);">订餐恢复体力</div>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class="card" onclick="goToPage(\'delivery\')" style="cursor: pointer;">\n                    <div style="display: flex; align-items: center;">\n                        <div class="app-icon-wrap" style="width: 44px; height: 44px; border-radius: 12px; margin-right: 12px; flex-shrink: 0;">' + (getIcon('delivery')) + '</div>\n                        <div>\n                            <div style="font-weight: 600;">快递服务</div>\n                            <div style="font-size: 12px; color: var(--color-text-light);">包裹与物品配送</div>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class="card" onclick="goToPage(\'loan\')" style="cursor: pointer;">\n                    <div style="display: flex; align-items: center;">\n                        <div class="app-icon-wrap" style="width: 44px; height: 44px; border-radius: 12px; margin-right: 12px; flex-shrink: 0;">' + (getIcon('loan')) + '</div>\n                        <div>\n                            <div style="font-weight: 600;">贷款服务</div>\n                            <div style="font-size: 12px; color: var(--color-text-light);">申请贷款</div>\n                        </div>\n                    </div>\n                </div>\n                \n                ' + (gameState.fans >= 5000 ? '\n                <div class="card" onclick="goToPage(\'crisis\')" style="cursor: pointer;">\n                    <div style="display: flex; align-items: center;">\n                        <div class="app-icon-wrap" style="width: 44px; height: 44px; border-radius: 12px; margin-right: 12px; flex-shrink: 0;">' + (getIcon('crisis')) + '</div>\n                        <div>\n                            <div style="font-weight: 600;">私生危机</div>\n                            <div style="font-size: 12px; color: var(--color-danger);">危险等级: ' + (gameState.danger) + '</div>\n                        </div>\n                    </div>\n                </div>\n                ' : '') + '\n                \n                <div class="card" onclick="goToPage(\'live\')" style="cursor: pointer;">\n                    <div style="display: flex; align-items: center;">\n                        <div class="app-icon-wrap" style="width: 44px; height: 44px; border-radius: 12px; margin-right: 12px; flex-shrink: 0;">' + (getIcon('live')) + '</div>\n                        <div>\n                            <div style="font-weight: 600;">直播</div>\n                            <div style="font-size: 12px; color: var(--color-text-light);">开始直播</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ';
}

// ==================== FOOD APP ====================
function renderFoodPage(container) {
    var foods = [
        // 快餐
        { name: '炸鸡', price: 8000, 体力: 30, category: '快餐' },
        { name: '披萨', price: 12000, 体力: 45, category: '快餐' },
        { name: '汉堡', price: 7000, 体力: 25, category: '快餐' },
        { name: '紫菜包饭', price: 5000, 体力: 20, category: '快餐' },
        { name: '拉面', price: 4000, 体力: 15, category: '快餐' },
        { name: '炒年糕', price: 6000, 体力: 22, category: '快餐' },
        // 甜点
        { name: '蛋糕', price: 5000, 体力: 15, category: '甜点' },
        { name: '咖啡', price: 4000, 体力: 10, category: '甜点' },
        { name: '奶茶', price: 4500, 体力: 12, category: '甜点' },
        { name: '马卡龙', price: 8000, 体力: 18, category: '甜点' },
        { name: '冰淇淋', price: 3500, 体力: 8, category: '甜点' },
        // 营养餐
        { name: '沙拉', price: 10000, 体力: 35, category: '营养餐' },
        { name: '参鸡汤', price: 15000, 体力: 50, category: '营养餐' },
        { name: '韩式定食', price: 12000, 体力: 40, category: '营养餐' },
        { name: '排毒果汁', price: 8000, 体力: 20, category: '营养餐' },
        // 奢华料理
        { name: '牛排', price: 25000, 体力: 80, category: '奢华料理' },
        { name: '韩牛烤肉', price: 35000, 体力: 100, category: '奢华料理' },
        { name: '米其林套餐', price: 50000, 体力: 120, category: '奢华料理' }
    ];
    
    var cats = ['快餐', '甜点', '营养餐', '奢华料理'];
    var foodCardsHtml = '';
    for (var ci = 0; ci < cats.length; ci++) {
        var cat = cats[ci];
        foodCardsHtml += '<div class="section-title">' + cat + '</div>';
        for (var fi = 0; fi < foods.length; fi++) {
            var f = foods[fi];
            if (f.category !== cat) continue;
            foodCardsHtml += '<div class="card" data-fname="' + f.name + '" data-fprice="' + f.price + '" data-fstamina="' + f.体力 + '" onclick="orderFood(this.dataset.fname,Number(this.dataset.fprice),Number(this.dataset.fstamina))">'
                + '<div style="display:flex;justify-content:space-between;align-items:center;">'
                + '<div>'
                + '<div style="font-weight:600;">' + f.name + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">+' + f.体力 + ' 体力（存入背包）</div>'
                + '</div>'
                + '<div style="text-align:right;">'
                + '<div style="font-weight:600;color:var(--color-primary);">' + (f.price || 0).toLocaleString() + '</div>'
                + '</div>'
                + '</div></div>';
        }
    }
    
    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">外卖订餐</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">余额</div>'
        + '<div style="font-size:22px;font-weight:700;">' + gameState.money.toLocaleString() + '</div>'
        + '</div>'
        + foodCardsHtml
        + '</div></div>';
}

function orderFood(name, price, 体力) {
    if (gameState.money < price) {
        showModal('金币不足', '你的金币不够支付');
        return;
    }
    showModal('确认购买', '商品：' + name + '\n价格：' + (price || 0).toLocaleString() + ' 金币\n效果：+' + 体力 + ' 体力', [
        { text: '取消', action: closeModal },
        { text: '确认购买', action: function() {
            gameState.money -= price;
            gameState.体力 = Math.min(gameState.max体力, gameState.体力 + 体力);
            if (!gameState.inventory) gameState.inventory = [];
            gameState.inventory.push({ name: name, effect: '体力', value: 体力 });
            closeModal();
            showToast('+' + 体力 + ' 体力，已存入背包');
            render();
        }}
    ]);
}

// ==================== DELIVERY APP ====================
function render快递服务Page(container) {
    var deliveryItems = [
        // 护肤类 - 主要加颜值，少量加生命
        { name: '基础护肤套装', price: 15000, lifeVal: 3, looksVal: 8, category: '护肤', effect: '颜值' },
        { name: '精华液', price: 25000, lifeVal: 5, looksVal: 12, category: '护肤', effect: '颜值' },
        { name: '面膜套装', price: 12000, lifeVal: 2, looksVal: 6, category: '护肤', effect: '颜值' },
        { name: '防晒霜', price: 8000, lifeVal: 1, looksVal: 4, category: '护肤', effect: '颜值' },
        // 化妆品 - 加颜值
        { name: '化妆品套装', price: 20000, looksVal: 10, category: '化妆品', effect: '颜值' },
        { name: '口红礼盒', price: 18000, looksVal: 8, category: '化妆品', effect: '颜值' },
        { name: '气垫粉底', price: 16000, looksVal: 7, category: '化妆品', effect: '颜值' },
        // 衣服 - 加颜值
        { name: '练习服', price: 10000, looksVal: 5, category: '衣服', effect: '颜值' },
        { name: '舞台服装', price: 35000, looksVal: 18, category: '衣服', effect: '颜值' },
        { name: '日常穿搭', price: 15000, looksVal: 8, category: '衣服', effect: '颜值' },
        { name: '品牌联名款', price: 50000, looksVal: 25, category: '衣服', effect: '颜值' },
        // 粉丝礼物
        { name: '粉丝信件合集', price: 5000, fameVal: 5, category: '粉丝礼物', effect: '名气' },
        { name: '粉丝应援棒', price: 8000, fameVal: 8, category: '粉丝礼物', effect: '名气' },
        { name: '粉丝手工礼物', price: 12000, fameVal: 12, category: '粉丝礼物', effect: '名气' },
        // 私生防护
        { name: '隐私保护套装', price: 20000, dangerVal: -15, category: '私生防护', effect: '危险' },
        { name: '防跟踪器', price: 30000, dangerVal: -20, category: '私生防护', effect: '危险' },
        { name: '安全警报器', price: 15000, dangerVal: -10, category: '私生防护', effect: '危险' },
        // 医药品
        { name: '感冒药', price: 5000, lifeVal: 15, category: '医药品', effect: '生命' },
        { name: '营养补充剂', price: 10000, lifeVal: 25, category: '医药品', effect: '生命' },
        { name: '止痛贴', price: 8000, lifeVal: 12, category: '医药品', effect: '生命' },
        { name: '急救包', price: 15000, lifeVal: 35, category: '医药品', effect: '生命' },
        { name: '维生素套装', price: 12000, lifeVal: 20, category: '医药品', effect: '生命' }
    ];
    
    var delCats = ['护肤', '化妆品', '衣服', '粉丝礼物', '私生防护', '医药品'];
    var delCardsHtml = '';
    for (var dci = 0; dci < delCats.length; dci++) {
        var delCat = delCats[dci];
        delCardsHtml += '<div class="section-title">' + delCat + '</div>';
        for (var dii = 0; dii < deliveryItems.length; dii++) {
            var item = deliveryItems[dii];
            if (item.category !== delCat) continue;
            var effectText = '';
            if (item.effect === '生命') effectText = '+' + item.lifeVal + ' 生命';
            else if (item.effect === '颜值') effectText = '+' + (item.looksVal || 0) + ' 颜值';
            else if (item.effect === '名气') effectText = '+' + item.fameVal + ' 名气';
            else if (item.effect === '危险') effectText = '-' + Math.abs(item.dangerVal) + ' 危险值';
            var itemVal = item.looksVal || item.lifeVal || item.fameVal || Math.abs(item.dangerVal);
            delCardsHtml += '<div class="card" data-name="'+item.name+'" data-price="'+item.price+'" data-val="'+itemVal+'" data-effect="'+item.effect+'" onclick="order快递服务(this.dataset.name,Number(this.dataset.price),Number(this.dataset.val),this.dataset.effect)">'
                + '<div style="display:flex;justify-content:space-between;align-items:center;">'
                + '<div>'
                + '<div style="font-weight:600;">' + item.name + '</div>'
                + '<div style="font-size:12px;color:var(--color-success);">' + effectText + '</div>'
                + '</div>'
                + '<div style="font-weight:600;color:var(--color-primary);">' + (item.price || 0).toLocaleString() + '</div>'
                + '</div></div>';
        }
    }
    
    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">快递服务</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">余额</div>'
        + '<div style="font-size:22px;font-weight:700;">' + gameState.money.toLocaleString() + '</div>'
        + '</div>'
        + delCardsHtml
        + '</div></div>';
}

function order快递服务(name, price, value, effect) {
    if (gameState.money < price) {
        showModal('金币不足', '你的金币不够支付');
        return;
    }
    var effectDesc = '';
    if (effect === '生命') effectDesc = '+' + value + ' 生命';
    else if (effect === '颜值') effectDesc = '+' + value + ' 颜值';
    else if (effect === '名气') effectDesc = '+' + value + ' 名气';
    else if (effect === '危险') effectDesc = '-' + value + ' 危险值';
    showModal('确认购买', '商品：' + name + '\n价格：' + (price || 0).toLocaleString() + ' 金币\n效果：' + effectDesc, [
        { text: '取消', action: closeModal },
        { text: '确认购买', action: function() {
            gameState.money -= price;
            if (effect === '生命') {
                gameState.life = Math.min(150, (gameState.life || 150) + value);
            } else if (effect === '颜值') {
                if (!gameState.looks) gameState.looks = 50;
                gameState.looks = Math.min(200, gameState.looks + value);
            } else if (effect === '名气') {
                gameState.fame = Math.min(200, (gameState.fame || 30) + value);
            } else if (effect === '危险') {
                gameState.danger = Math.max(0, gameState.danger - value);
    if(typeof _updateDangerDisplay==='function') _updateDangerDisplay();
            }
            if (!gameState.inventory) gameState.inventory = [];
            gameState.inventory.push({ name: name, effect: effect, value: value });
            closeModal();
            showToast(name + ' 已存入背包');
            render();
        }}
    ]);
}

// ==================== LOAN APP ====================
function renderLoanPage(container) {
    var maxLoan = Math.floor(gameState.credit * 1000);
    var totalOwed = gameState.loanAmount + Math.floor(gameState.loanAmount * gameState.loanInterest / 100);
    var canLoanMore = totalOwed < maxLoan;
    
    container.innerHTML = '\n        <div class="page active">\n            <div class="page-header">\n                <div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>\n                <div class="page-title">贷款服务</div>\n                <div style="width: 32px;"></div>\n            </div>\n            <div class="page-content">\n                <div class="card" style="background: linear-gradient(135deg, var(--color-primary), var(--color-accent)); color: white;">\n                    <div style="font-size: 12px; opacity: 0.8;">可贷额度（基于信誉 ' + (gameState.credit) + '）</div>\n                    <div style="font-size: 28px; font-weight: 700;">' + (maxLoan.toLocaleString()) + '</div>\n                </div>\n                \n                <div class="card">\n                    <div style="font-weight: 600; margin-bottom: 12px;">贷款状态</div>\n                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">\n                        <span style="color: var(--color-text-light);">已贷金额</span>\n                        <span style="font-weight: 600;">' + (gameState.loanAmount.toLocaleString()) + '</span>\n                    </div>\n                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">\n                        <span style="color: var(--color-text-light);">利率</span>\n                        <span style="font-weight: 600;">' + (gameState.loanInterest) + '%</span>\n                    </div>\n                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">\n                        <span style="color: var(--color-text-light);">待还总额</span>\n                        <span style="font-weight: 600; color: var(--color-danger);">' + (totalOwed.toLocaleString()) + '</span>\n                    </div>\n                    ' + ((function(){var t=totalOwed;return t>0?'<div style="font-size:12px;color:var(--color-text-light);margin-bottom:8px;">还款后余额: '+(gameState.money-t).toLocaleString()+'</div><button class="btn btn-primary" onclick="repayLoan()" style="width:100%;'+(gameState.money<t?'opacity:0.5;':'')+'">还款 '+t.toLocaleString()+'</button>':'<div style="text-align:center;color:var(--color-success);font-size:13px;">暂无贷款</div>';})()) + '\n                </div>\n                \n                <div class="section-title" style="margin-top: 16px;">申请贷款</div>\n                <div class="card">\n                    <div style="font-weight: 600; margin-bottom: 8px;">助学贷款</div>\n                    <div style="font-size: 13px; color: var(--color-text-light); margin-bottom: 8px;">练习生专属低利率 | 3% 年利率</div>\n                    <div style="display: flex; gap: 8px;">\n                        <button class="btn btn-sm ' + (canLoanMore ? 'btn-primary' : 'btn-secondary') + '" onclick="applyLoan(30000, 3)" ' + (canLoanMore ? '' : 'disabled') + '>贷 30,000</button>\n                        <button class="btn btn-sm ' + (canLoanMore ? 'btn-primary' : 'btn-secondary') + '" onclick="applyLoan(50000, 3)" ' + (canLoanMore ? '' : 'disabled') + '>贷 50,000</button>\n                    </div>\n                </div>\n                \n                <div class="card">\n                    <div style="font-weight: 600; margin-bottom: 8px;">商业贷款</div>\n                    <div style="font-size: 13px; color: var(--color-text-light); margin-bottom: 8px;">出道爱豆专属 | 5% 年利率</div>\n                    <div style="display: flex; gap: 8px;">\n                        <button class="btn btn-sm ' + (canLoanMore ? 'btn-primary' : 'btn-secondary') + '" onclick="applyLoan(80000, 5)" ' + (canLoanMore ? '' : 'disabled') + '>贷 80,000</button>\n                        <button class="btn btn-sm ' + (canLoanMore ? 'btn-primary' : 'btn-secondary') + '" onclick="applyLoan(100000, 5)" ' + (canLoanMore ? '' : 'disabled') + '>贷 100,000</button>\n                    </div>\n                </div>\n                \n                <div style="font-size: 11px; color: var(--color-text-light); margin-top: 12px; line-height: 1.6;">\n                    信誉影响：按时还款提升信誉(+10)，逾期降低信誉(-20)。信誉越高可贷额度越大。\n                </div>\n            </div>\n        </div>\n    ';
}

function applyLoan(amount, interest) {
    var maxLoan = Math.floor(gameState.credit * 1000);
    var totalOwed = gameState.loanAmount + Math.floor(gameState.loanAmount * gameState.loanInterest / 100);
    if (totalOwed + amount > maxLoan) {
        showModal('额度不足', '已超出可贷额度，请先还款提升信誉');
        return;
    }
    gameState.loanAmount += amount;
    gameState.loanInterest = Math.max(gameState.loanInterest, interest);
    gameState.money += amount;
    var warning = '';
    if (interest >= 5) {
        warning = '\n\n注意：商业贷款会影响出道时团体分配的概率';
        gameState.hasBusinessLoan = true;
    }
    showModal('贷款通过', '已到账 ' + amount.toLocaleString() + ' 金币\n利率: ' + interest + '%' + warning + '\n请按时还款，逾期将降低信誉');
    triggerSilentSave();
    render();
}

function repayLoan() {
    var totalOwed = gameState.loanAmount + Math.floor(gameState.loanAmount * gameState.loanInterest / 100);
    if (gameState.money < totalOwed) {
        showModal('金币不足', '金币不够还款，当前余额: ' + gameState.money.toLocaleString());
        return;
    }
    gameState.money -= totalOwed;
    gameState.credit = Math.min(200, gameState.credit + 10);
    gameState.loanAmount = 0;
    gameState.loanInterest = 0;
    showModal('还款成功', '已还清贷款\n+10 信誉\n当前余额: ' + gameState.money.toLocaleString());
    render();
}

// ==================== CRISIS APP ====================
var crisisEvents = [];
var crisisEventPool = [
    { title: '宿舍私生饭', desc: '有私生饭在宿舍楼下徘徊', detail: '今天凌晨，有人在宿舍楼下持续徘徊，保安已注意到异常。你的隐私安全受到威胁。' },
    { title: '行程泄露', desc: '你的私人行程被泄露到网上', detail: '你的私人行程信息出现在社交媒体上，疑似被内部人员泄露。粉丝和非粉丝都在传播这些信息。' },
    { title: '手机号泄露', desc: '你的手机号正在社交媒体上被传播', detail: '你的私人手机号被曝光，大量陌生来电和短信涌入，严重影响你的日常生活。' },
    { title: '跟踪事件', desc: '有人在下班途中跟踪你', detail: '你注意到有人一直尾随你的车辆，从公司到你常去的餐厅，安全团队已介入处理。' },
    { title: '偷拍事件', desc: '你的私人照片被偷拍并流传', detail: '有人在你不注意时偷拍了你的私人照片，这些照片正在粉丝群中传播。' },
    { title: '住址曝光', desc: '你的家庭住址被公开', detail: '你的居住地址在网络上被公开，有粉丝开始出现在你的住所附近，安全隐患极大。' },
    { title: '航班信息泄露', desc: '你的航班信息被泄露', detail: '你的航班号和座位信息被泄露，机场可能已有粉丝等候，需要改变出行计划。' },
    { title: '社交账号被黑', desc: '你的社交账号遭到入侵', detail: '有人试图入侵你的社交媒体账号，密码已被修改。需要紧急处理以防止信息泄露。' }
];

function initCrisisEvents() {
    crisisEvents = [];
    var count = 3 + Math.floor(Math.random() * 3);
    var shuffled = crisisEventPool.slice().sort(function() { return Math.random() - 0.5; });
    for (var i = 0; i < Math.min(count, shuffled.length); i++) {
        crisisEvents.push({ title: shuffled[i].title, desc: shuffled[i].desc, detail: shuffled[i].detail, handled: false });
    }
}

function addNewCrisisEvent() {
    if (crisisEvents.filter(function(e) { return !e.handled; }).length >= 5) return;
    var available = crisisEventPool.filter(function(p) {
        for (var i = 0; i < crisisEvents.length; i++) {
            if (crisisEvents[i].title === p.title && !crisisEvents[i].handled) return false;
        }
        return true;
    });
    if (available.length === 0) return;
    var pick = available[Math.floor(Math.random() * available.length)];
    crisisEvents.push({ title: pick.title, desc: pick.desc, detail: pick.detail, handled: false });
}

function renderCrisisPage(container) {
    if (crisisEvents.length === 0) initCrisisEvents();
    var activeEvents = crisisEvents.filter(function(e) { return !e.handled; });
    
    var eventsHtml = '';
    for (var i = 0; i < crisisEvents.length; i++) {
        var e = crisisEvents[i];
        if (e.handled) continue;
        eventsHtml += '<div class="card">'
            + '<div style="font-weight:600;margin-bottom:4px;">' + e.title + '</div>'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:4px;">' + e.desc + '</div>'
            + '<div style="font-size:11px;color:var(--color-text-light);margin-bottom:8px;line-height:1.4;">' + e.detail + '</div>'
            + '<div style="display:flex;gap:6px;">'
            + '<button class="btn btn-sm btn-primary" data-i="' + i + '" data-a="0" onclick="handleCrisis(parseInt(this.dataset.i),parseInt(this.dataset.a))">妥善处理</button>'
            + '<button class="btn btn-sm btn-secondary" data-i="' + i + '" data-a="1" onclick="handleCrisis(parseInt(this.dataset.i),parseInt(this.dataset.a))">无视</button>'
            + '<button class="btn btn-sm btn-secondary" data-i="' + i + '" data-a="2" onclick="handleCrisis(parseInt(this.dataset.i),parseInt(this.dataset.a))" style="color:var(--color-danger);border-color:var(--color-danger);">处理不当</button>'
            + '</div></div>';
    }
    if (!eventsHtml) eventsHtml = '<div style="text-align:center;color:var(--color-text-light);padding:40px;">暂无活跃危机事件</div>';
    
    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">私生危机</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="background:linear-gradient(135deg,var(--color-danger),#FF8FA3);color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">危险等级</div>'
        + '<div style="font-size:32px;font-weight:700;">' + gameState.danger + '</div>'
        + '<div class="progress-bar" style="margin-top:8px;">'
        + '<div class="progress-fill" style="width:' + Math.min(100, gameState.danger) + '%;background:white;"></div>'
        + '</div>'
        + '<div style="font-size:11px;opacity:0.8;margin-top:4px;">活跃事件: ' + activeEvents.length + '</div>'
        + '</div>'
        + '<div class="section-title" style="margin-top:16px;">活跃事件</div>'
        + eventsHtml
        + '</div></div>';
}

function handleCrisis(eventIdx, actionIdx) {
    var actions = [
        { name: '妥善处理', danger: -20, msg: '你处理得很好，危机已解除', creditBonus: 5 },
        { name: '无视', danger: 10, msg: '情况没有改善', creditBonus: 0 },
        { name: '处理不当', danger: 20, msg: '情况恶化了！', creditBonus: -10 }
    ];
    var a = actions[actionIdx];
    if (!a) return;
    gameState.danger = Math.max(0, gameState.danger + a.danger);
    if(typeof _updateDangerDisplay==='function') _updateDangerDisplay();
    if (a.creditBonus) gameState.credit = Math.max(0, Math.min(200, gameState.credit + a.creditBonus));
    
    if (eventIdx < crisisEvents.length) {
        crisisEvents[eventIdx].handled = true;
    }
    
    addNewCrisisEvent();
    
    showModal(a.name, a.msg + '\n危险值 ' + (a.danger > 0 ? '+' : '') + a.danger + (a.creditBonus ? '\n信誉 ' + (a.creditBonus > 0 ? '+' : '') + a.creditBonus : ''));
    render();
}

// ==================== LIVE APP ====================
function renderLivePage(container) {
    var btnText = isLive ? '结束直播' : '开始直播';
    var btnAction = isLive ? 'stopLive()' : 'chooseLiveMode()';
    var btnClass = isLive ? 'btn btn-secondary' : 'btn btn-primary';
    var liveMode = gameState.liveMode || 'video';
    var speechBtnText = (speechRecognition && isLive) ? '关闭转述' : '实时转述';
    var previewBg = '';
    if (isLive && liveMode === 'audio') {
        previewBg = 'background:linear-gradient(135deg,#1a1a2e,#16213e);';
    } else {
        previewBg = 'background:linear-gradient(135deg,#2D2D2D,#444);';
    }
    var audioOverlay = '';
    if (isLive && liveMode === 'audio') {
        audioOverlay = '<div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;">'
            + '<div class="avatar" style="width:80px;height:80px;font-size:32px;margin-bottom:12px;">' + (gameState.player.avatar || '') + '</div>'
            + '<div style="font-size:14px;font-weight:600;">' + gameState.player.name + '</div>'
            + '<div style="font-size:11px;opacity:0.7;margin-top:4px;">语音直播中</div>'
            + '</div>';
    }
    
    container.innerHTML = '<div class="page active">'
        + '<div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">直播</div><div style="width:32px;"></div></div>'
        + '<div style="flex:1;display:flex;flex-direction:column;min-height:0;">'
        + '<div id="livePreview" style="' + previewBg + 'height:200px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;flex-shrink:0;">'
        + (isLive && liveMode === 'video' ? '' : '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>')
        + audioOverlay
        + '<div id="liveDanmaku" style="position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;overflow:hidden;"></div>'
        + '<div id="liveSpeechText" style="position:absolute;bottom:8px;left:8px;right:8px;background:rgba(0,0,0,0.6);color:white;font-size:12px;padding:6px 10px;border-radius:8px;display:none;"></div>'
        + '<div style="position:absolute;top:8px;right:8px;display:flex;gap:4px;">'
        + '<button class="' + btnClass + '" onclick="' + btnAction + '" style="font-size:11px;padding:4px 12px;">' + btnText + '</button>'
        + (isLive ? '<button class="btn btn-sm btn-secondary" id="speechBtn" onclick="toggleLiveSpeech()" style="font-size:10px;padding:4px 8px;">' + speechBtnText + '</button>' : '')
        + '</div>'
        + '</div>'
        + '<div style="display:flex;justify-content:space-around;padding:10px 16px;background:var(--bg-card);border-bottom:1px solid var(--color-border);flex-shrink:0;">'
        + '<div style="text-align:center;"><div style="font-size:16px;font-weight:700;color:var(--color-primary);" id="viewerCount">0</div><div style="font-size:10px;color:var(--color-text-light);">观看</div></div>'
        + '<div style="text-align:center;"><div style="font-size:16px;font-weight:700;color:var(--color-primary);" id="likeCount">0</div><div style="font-size:10px;color:var(--color-text-light);">点赞</div></div>'
        + '<div style="text-align:center;"><div style="font-size:16px;font-weight:700;color:var(--color-primary);" id="liveRevenue">0</div><div style="font-size:10px;color:var(--color-text-light);">收益</div></div>'
        + '</div>'
        + '<div id="liveChatArea" style="flex:1;overflow-y:auto;padding:8px 12px;background:var(--bg-main);min-height:0;">'
        + '<div style="text-align:center;color:var(--color-text-light);font-size:12px;padding:20px 0;">开始直播后，弹幕和聊天将在这里显示</div>'
        + '</div>'
        + '<div style="display:flex;gap:8px;padding:8px 12px 68px 12px;background:var(--bg-card);border-top:1px solid var(--color-border);flex-shrink:0;">'
        + '<input type="text" id="liveChatInput" placeholder="输入消息回复观众..." style="flex:1;margin-bottom:0;font-size:13px;padding:10px 14px;">'
        + '<button class="btn btn-sm btn-primary" onclick="sendLiveChat()" style="padding:10px 16px;">发送</button>'
        + '</div>'
        + '</div></div>';
}

function chooseLiveMode() {
    showModal('选择直播模式', '<div style="display:flex;gap:8px;">'
        + '<button class="btn btn-primary" onclick="gameState.liveMode=\'video\';closeModal();startLive();" style="flex:1;">视频直播</button>'
        + '<button class="btn btn-secondary" onclick="gameState.liveMode=\'audio\';closeModal();startLive();" style="flex:1;border-color:var(--color-primary);color:var(--color-primary);">语音直播</button>'
        + '</div>');
}

function toggleLiveSpeech() {
    if (speechRecognition) {
        try { speechRecognition.stop(); } catch(e) {}
        speechRecognition = null;
        var btn = document.getElementById('speechBtn');
        if (btn) btn.textContent = '实时转述';
        showModal('已关闭', '语音转述已关闭');
    } else {
        startLiveSpeech();
        var btn = document.getElementById('speechBtn');
        if (btn) btn.textContent = '关闭转述';
        showModal('已开启', '语音转述已开启');
    }
}

var mediaStream = null;
var isLive = false;
var liveDanmakuTimer = null;
var liveViewerTimer = null;
var speechRecognition = null;

var danmakuMessages = [
    '加油！', '好棒！', '爱你！', '太厉害了', '比心', '啊啊啊好帅',
    '今天状态很好', '唱歌好好听', '舞蹈绝了', '加油加油', '永远支持你',
    '好可爱', '笑死我了', '再来一个', '好想见你', '今天穿得好好看'
];

function addDanmaku() {
    var container = document.getElementById('liveDanmaku');
    var chatArea = document.getElementById('liveChatArea');
    var msg = danmakuMessages[Math.floor(Math.random() * danmakuMessages.length)];
    var viewers = ['fan_' + Math.floor(Math.random()*999), 'stan_' + Math.floor(Math.random()*999), 'army_' + Math.floor(Math.random()*999)];
    var from = viewers[Math.floor(Math.random() * viewers.length)];
    if (container) {
        var div = document.createElement('div');
        div.textContent = msg;
        div.style.cssText = 'position:absolute;white-space:nowrap;color:white;font-size:13px;text-shadow:0 0 4px rgba(0,0,0,0.8);top:' + (Math.random() * 80) + '%;right:-100px;transition:right 5s linear;';
        container.appendChild(div);
        requestAnimationFrame(function() { div.style.right = '100%'; });
        setTimeout(function() { if (div.parentNode) div.parentNode.removeChild(div); }, 5500);
    }
    if (chatArea) {
        var chatDiv = document.createElement('div');
        chatDiv.style.cssText = 'padding:4px 0;font-size:12px;';
        chatDiv.innerHTML = '<span style="color:var(--color-primary);font-weight:600;">' + from + '</span> <span style="color:var(--color-text-light);">' + msg + '</span>';
        chatArea.appendChild(chatDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
    }
}

function sendLiveChat() {
    var input = document.getElementById('liveChatInput');
    if (!input || !input.value.trim()) return;
    var chatArea = document.getElementById('liveChatArea');
    var msg = input.value.trim();
    input.value = '';
    if (chatArea) {
        var chatDiv = document.createElement('div');
        chatDiv.style.cssText = 'padding:4px 0;font-size:12px;text-align:right;';
        chatDiv.innerHTML = '<span style="background:var(--color-primary);color:white;padding:4px 10px;border-radius:12px;font-weight:500;">' + msg + '</span>';
        chatArea.appendChild(chatDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
    }
    gameState.fans += 1;
    setTimeout(function() {
        var responses = ['哇！', '好棒！', '加油！', '爱你！', '太厉害了！', '比心！', '好可爱！', '再来一个！'];
        var resp = responses[Math.floor(Math.random() * responses.length)];
        var from = 'fan_' + Math.floor(Math.random()*999);
        var ca = document.getElementById('liveChatArea');
        if (ca) {
            var cd = document.createElement('div');
            cd.style.cssText = 'padding:4px 0;font-size:12px;';
            cd.innerHTML = '<span style="color:var(--color-primary);font-weight:600;">' + from + '</span> <span style="color:var(--color-text-light);">' + resp + '</span>';
            ca.appendChild(cd);
            ca.scrollTop = ca.scrollHeight;
        }
    }, 800 + Math.random() * 1200);
}

function startLive() {
    isLive = true;
    liveDanmakuTimer = setInterval(addDanmaku, 2000);
    _addTimer(liveDanmakuTimer);
    liveViewerTimer = setInterval(function() {
        if (isLive) {
            var vEl = document.getElementById('viewerCount');
            var lEl = document.getElementById('likeCount');
            var rEl = document.getElementById('liveRevenue');
            if (vEl) vEl.textContent = Math.floor(Math.random() * 500) + 100;
            if (lEl) lEl.textContent = Math.floor(Math.random() * 2000) + 500;
            if (rEl) rEl.textContent = Math.floor(Math.random() * 5000) + 1000;
        }
    }, 3000);
    _addTimer(liveViewerTimer);
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && (gameState.liveMode || 'video') === 'video') {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 480 }, height: { ideal: 360 } } }).then(function(stream) {
            mediaStream = stream;
            var video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.playsInline = true;
            video.setAttribute('playsinline', '');
            video.muted = true;
            video.style.cssText = 'width:100%;height:200px;object-fit:cover;position:absolute;top:0;left:0;';
            var preview = document.getElementById('livePreview');
            if (preview) preview.insertBefore(video, preview.firstChild);
        }).catch(function(err) {
            console.log('Camera not available:', err);
        });
    }
    try { startLiveSpeech(); } catch(e) {}
    render();
}

function stopLive() {
    try {
        if (mediaStream) {
            var tracks = mediaStream.getTracks();
            for (var i = 0; i < tracks.length; i++) tracks[i].stop();
            mediaStream = null;
        }
    } catch(e) {}
    if (liveDanmakuTimer) { clearInterval(liveDanmakuTimer); liveDanmakuTimer = null; }
    if (liveViewerTimer) { clearInterval(liveViewerTimer); liveViewerTimer = null; }
    try { if (speechRecognition) { speechRecognition.stop(); speechRecognition = null; } } catch(e) {}
    isLive = false;
    
    var vEl2 = document.getElementById('viewerCount');
    var rEl2 = document.getElementById('liveRevenue');
    var viewers = vEl2 ? parseInt(vEl2.textContent) || 0 : 0;
    var revenue = rEl2 ? parseInt(rEl2.textContent) || 0 : 0;
    var fansGain = Math.floor(viewers / 50) + 5;
    gameState.fans += fansGain;
    gameState.money += revenue;
    gameState.fame = Math.min(200, (gameState.fame || 30) + Math.floor(Math.random() * 5) + 2);
    
    gameState.livePendingReward = true;
    showModal('直播结束', '做得好！\n+' + fansGain + ' 粉丝\n+' + revenue.toLocaleString() + ' 金币\n+' + (Math.floor(Math.random()*5)+2) + ' 名气');
    render();
}

function startLiveSpeech() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (speechRecognition) { try { speechRecognition.stop(); } catch(e) {} }
    speechRecognition = new SR();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'zh-CN';
    speechRecognition.onresult = function(event) {
        try {
            var transcript = '';
            for (var i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            var el = document.getElementById('liveSpeechText');
            if (el) { el.style.display = 'block'; el.textContent = transcript; }
            if (event.results[event.results.length - 1].isFinal) {
                var chatArea = document.getElementById('liveChatArea');
                if (chatArea) {
                    var chatDiv = document.createElement('div');
                    chatDiv.style.cssText = 'padding:4px 0;font-size:12px;text-align:right;';
                    chatDiv.innerHTML = '<span style="background:var(--color-secondary);color:var(--color-text);padding:4px 10px;border-radius:12px;">[语音] ' + transcript + '</span>';
                    chatArea.appendChild(chatDiv);
                    chatArea.scrollTop = chatArea.scrollHeight;
                }
            }
        } catch(e) {}
    };
    speechRecognition.onerror = function() {};
    try { speechRecognition.start(); } catch(e) {}
}

function toggleSpeechRecognition() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showModal('不支持', '当前浏览器不支持语音识别');
        return;
    }
    
    if (speechRecognition) {
        speechRecognition.stop();
        speechRecognition = null;
        var btn = document.getElementById('speechBtn');
        if (btn) btn.textContent = '语音转文字';
        return;
    }
    
    speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'zh-CN';
    
    speechRecognition.onresult = function(event) {
        var transcript = '';
        for (var i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        var el = document.getElementById('liveSpeechText');
        if (el) { el.style.display = 'block'; el.textContent = transcript; }
    };
    
    speechRecognition.onerror = function() {
        var el = document.getElementById('liveSpeechText');
        if (el) { el.textContent = '语音识别出错，请重试'; }
    };
    
    try { speechRecognition.start(); } catch(e) {}
    var btn = document.getElementById('speechBtn');
    if (btn) btn.textContent = '关闭语音';
    showModal('语音已开启', '语音转文字功能已启动');
}

// ==================== UPDATES PAGE ====================
function render成员信息Page(container) {
    if (typeof COMPANIES === 'undefined' || !COMPANIES) { container.innerHTML = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">\u2039 \u9996\u9875</div><div class="page-title">\u6210\u5458\u4fe1\u606f</div><div style="width:32px;"></div></div><div class="page-content" style="text-align:center;padding:40px;"><div style="color:var(--color-text-light);">\u6570\u636e\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5</div></div></div>'; return; }
    var level = gameState.membersViewLevel || 0;
    var comp = gameState.membersViewCompany || '';
    var grp = gameState.membersViewGroup || '';
    var posMap = {'Main Vocal':'主唱','Lead Vocal':'领唱','Main Dance':'主舞','Lead Dance':'领舞','Main Rapper':'主Rapper','Lead Rapper':'领Rapper','Visual':'门面','Center':'中心位','Leader':'队长','Maknae':'忙内'};
    
    if (level === 0) {
        var companyKeys = Object.keys(COMPANIES); var companyEntries = []; for (var _mci = 0; _mci < companyKeys.length; _mci++) { companyEntries.push([companyKeys[_mci], COMPANIES[companyKeys[_mci]]]); }
        var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">成员信息</div><div style="width:32px;"></div></div><div class="page-content"><div class="section-title">经纪公司</div>';
        for (var i = 0; i < companyEntries.length; i++) {
            var key = companyEntries[i][0];
            var c = companyEntries[i][1];
            var groupCount = Object.keys(c.groups).length;
            html += '<div class="card" onclick="gameState.membersViewLevel=1;gameState.membersViewCompany=\'\' + key + \'\';render();" style="cursor:pointer;"><div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-weight:600;">' + c.name + '</div><div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">' + (c.tags ? c.tags.join(' / ') : '') + '</div></div><div style="text-align:right;"><div style="font-size:16px;font-weight:700;color:var(--color-primary);">' + groupCount + '</div><div style="font-size:10px;color:var(--color-text-light);">团体</div></div></div></div>';
        }
        html += '</div></div>';
        container.innerHTML = html;
    } else if (level === 1) {
        var company = COMPANIES[comp];
        if (!company) { gameState.membersViewLevel = 0; render(); return; }
        var groupKeys = Object.keys(company.groups); var groups = []; for (var _mgi = 0; _mgi < groupKeys.length; _mgi++) { groups.push([groupKeys[_mgi], company.groups[groupKeys[_mgi]]]); }
        var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="gameState.membersViewLevel=0;render();">‹ 公司列表</div><div class="page-title">' + company.name + '</div><div style="width:32px;"></div></div><div class="page-content"><div class="section-title">团体列表</div>';
        for (var i = 0; i < groups.length; i++) {
            var gkey = groups[i][0];
            var g = groups[i][1];
            html += '<div class="card" onclick="gameState.membersViewLevel=2;gameState.membersViewGroup=\'\' + gkey + \'\';render();" style="cursor:pointer;"><div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-weight:600;">' + g.name + '</div><div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">' + g.desc + '</div></div><div style="text-align:right;"><div style="font-size:16px;font-weight:700;color:var(--color-primary);">' + g.members.length + '</div><div style="font-size:10px;color:var(--color-text-light);">成员</div></div></div></div>';
        }
        html += '</div></div>';
        container.innerHTML = html;
    } else if (level === 2) {
        var company = COMPANIES[comp];
        if (!company) { gameState.membersViewLevel = 0; render(); return; }
        var group = company.groups[grp];
        if (!group) { gameState.membersViewLevel = 1; render(); return; }
        var groupIntro = '';
        if (GROUP_INTROS[comp] && GROUP_INTROS[comp][grp]) {
            groupIntro = '<div class="card" style="background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;text-align:center;padding:16px;"><div style="font-size:18px;font-weight:700;">' + group.name + '</div><div style="font-size:13px;opacity:0.9;margin-top:6px;">' + GROUP_INTROS[comp][grp] + '</div></div>';
        }
        var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="gameState.membersViewLevel=1;render();">‹ ' + company.name + '</div><div class="page-title">' + group.name + '</div><div style="width:32px;"></div></div><div class="page-content">' + groupIntro + '<div class="section-title">成员</div>';
        for (var i = 0; i < group.members.length; i++) {
            var m = group.members[i];
            var posZh = posMap[m.position] || m.position;
            var persStr = m.personality.join(' / ');
            html += '<div class="card"><div style="display:flex;align-items:center;margin-bottom:8px;"><div class="avatar" style="width:40px;height:40px;font-size:16px;flex-shrink:0;">' + m.name.charAt(0) + '</div><div style="margin-left:12px;flex:1;"><div style="font-weight:600;font-size:15px;">' + m.name + '</div><div style="font-size:12px;color:var(--color-primary);font-weight:500;">' + posZh + '</div></div></div><div style="font-size:12px;color:var(--color-text-light);line-height:1.5;">性格: ' + persStr + '</div></div>';
        }
        html += '</div></div>';
        container.innerHTML = html;
    }
}

function render更新通知Page(container) {
    var versionLogs = [
        { ver: 'V1.6', date: '2026年6月14日 20:00', title: 'My Idol V1.6', content: 'V1.6 大版本更新内容:\n\n【核心系统】\n• 回归打歌系统 - 选择概念/主打歌/MV拍摄/宣传期/3轮打歌/回归评级\n• 合约系统 - 查看经纪合约/续约/离开公司\n• 队友关系网 - 好感度系统/聊天送礼合练\n• 经纪团队 - 经纪人/造型师/司机/培训提升\n• 黑粉反黑 - 5种黑粉事件/声明/法律手段/忽略\n• 粉丝团后援会 - 等级系统/应援项目\n• 成就系统 - 14个成就解锁/进度追踪\n\n【新增APP】\n• 回归打歌 - 完整回归流程\n• 音乐放送 - 6大音乐节目信息\n• MV工作室 - MV收藏与回看\n• 合约 - 经纪合约管理\n• 队友关系 - 队友好感互动\n• 经纪团队 - 团队管理\n• 反黑中心 - 黑粉事件处理\n• 后援会 - 粉丝应援\n• 公关室 - 形象管理\n• Kpop百科 - 韩团知识\n• 成就 - 成就追踪\n\n【系统优化】\n• 手机通知弹窗 - 8种通知类型/顶部滑入动画\n• NPC改名 - 中文名(英文名)格式\n• 存档名闪烁修复\n• 危险值即时更新' },
    { ver: 'V1.5.2', date: '2026年6月13日 18:00', title: 'My Idol V1.5.2', content: 'V1.5 系列更新内容：\n\n【新增功能】\n• 邀请码系统 - 内测期间需输入邀请码进入游戏\n• AI系统全面接入 - KakaoTalk/泡泡/恋爱等7个APP的NPC可真实对话\n• 赚钱中心三标签页 - 通用/个人/团队，粉丝解锁高薪工作\n• 全平台红点未读提示 - 哪个APP有新消息一目了然\n• 直播优化 - 点赞和收益只增不减\n\n【V1.5.1 修复】\n• 修复AI对话实际走模板不调API的问题\n• 修复赚钱中心点击工作崩溃返回首页的问题\n• 修复AI计数器不工作的问题\n• 修复首页娱乐栏被底部导航遮挡的问题\n• 修复首页工作分类显示问题\n\n【V1.5.2 修复】\n• 邀请码错误提示 - 空输入/错误码红字提示+回车提交支持\n• 性格/定位3项硬限制 - 超出自动截断，不可无限勾选\n• 创建返回确认 - 返回时弹窗确认，防止误清空\n• 体力负数修复 - 切换APP时强制修正体力下限\n• 训练防连点 - 时间戳防重复扣费+能力值150封顶\n• 自动存档9处关键节点 - 创建角色/入团/出道/行程完成/工作完成/考核通过/贷款申请等全覆盖\n• 退出保存提醒 - 关闭/刷新页面弹窗提醒+手机Safari后台静默保存\n• 商业贷款降出道概率 - 贷款后40%概率分配不到志愿团+申请弹窗警告+出道企划页警告条\n• 生日下拉适配 - 加大触控区域，解决小屏遮挡\n• 长名溢出修复 - 团名文字截断省略号\n• 提示弹窗时间加长 - 从1.5秒延长至2.5秒' },
        { ver: 'V1.4.3.1', date: '2026年6月13日 14:30', title: 'My Idol V1.4.3.1', content: 'My Idol V1.4.3.1 更新内容：\n\n• 团体人气系统 - 出道爱豆新增团体人气数值，不同公司基数不同\n• INS私信优化 - 私信列表显示所有有对话的联系人\n• TikTok私信优化 - 私信列表显示所有有对话的联系人\n• APP首页分类排版 - 按工作/赚钱/社交/娱乐/其他分类展示\n• 成员信息团队介绍 - 查看团体时显示韩文名和概念描述\n\nBug修复：\n• 修复INS/TikTok对方主动发来的消息不出现在聊天列表的问题' },
        { ver: 'V1.4.3', date: '2026年6月13日 12:00', title: 'My Idol V1.4.3', content: 'My Idol V1.4.3 更新内容：\n\n• 出道企划APP - 练习生查看出道要求，满足条件触发出道流程\n• Direct Selection - 能力均分140+可自选团队踢人出道\n• 赚钱中心APP - 练习生/爱豆专属打工和赚钱工作\n• 通告APP全面升级 - 打歌/演唱会/粉丝见面会等7种通告类型\n• 通告剧情触发 - 打歌一位上热搜、演唱会安可、S级庆祝\n• 考核系统升级 - 舞蹈12圆点5轮、声乐序列6-8、更多题目\n• 综合考试7题制，通过标准5/7\n• 出道流程 - 5步对话式出道，成功转正为出道爱豆\n\nBug修复：\n• 修复性格/定位多选可超限的问题\n• 修复体力归零后回血偶尔失效\n• 修复体力切APP后出现负数\n• 修复训练付费重复扣款\n• 修复外卖快递道具效果不即时生效\n• 修复存档覆盖数据丢失\n• 修复退出保存提醒弹窗重复弹出' },
        { ver: 'V1.4.2', date: '2026年6月13日 11:00', title: 'My Idol V1.4.2', content: 'My Idol V1.4.2 热修复：\n\n• 修复会议系统崩溃问题\n• 修复退出登录无效的问题\n• 修复外卖/快递购买报错的问题\n• 修复KakaoTalk聊天框被底部导航遮挡\n• 所有APP子页面全屏显示，底部导航仅主页面显示\n• 优化系统稳定性' },
        { ver: 'V1.4.1', date: '2026年6月13日 10:00', title: 'My Idol V1.4.1', content: 'My Idol V1.4.1 更新内容：\n\n• 新增KakaoTalk聊天APP，可以和练习生NPC聊天\n• 新增6位AI练习生和经纪人\n• 新增自动存档功能，再也不怕忘记保存\n• 新增账号注册系统，保护你的游戏进度\n• 考核系统上线！5科考试+综合考核\n• 外卖扩充到18种美食\n• 快递升级22种商品6大分类\n• 会议系统修复+新增剧情' },
        { ver: 'V1.4', date: '2026年6月13日 00:05', title: 'My Idol V1.4', content: 'My Idol V1.4 更新内容：\n\n• 考核系统上线 - 5科3级考试+综合考试，通过后预备出道\n• 舞蹈考试 - 节奏点击小游戏\n• 声乐考试 - 音高记忆小游戏\n• 说唱考试 - 词语接龙\n• 表演考试 - 表情选择\n• 综艺考试 - 即兴回应\n• 综合考试 - 混合挑战，5科全三级后解锁\n• 会议系统修复+新增剧情\n• 外卖快递全面升级' },
        { ver: 'V1.3.1', date: '2026年6月12日 22:52', title: 'My Idol V1.3.1', content: 'My Idol V1.3.1 更新内容：\n\n• INS图片上传 - 发动态支持选择图片并预览\n• TikTok视频上传 - 上传视频支持选择文件并预览\n• 外卖快递购买确认 - 购买前增加确认弹窗\n• 训练页体力恢复 - 新增30秒休息恢复体力功能' },
        { ver: 'V1.3', date: '2026年6月12日 22:33', title: 'My Idol V1.3', content: 'My Idol V1.3 更新内容：\n\n• 会议系统修复 - 修复Safari兼容性，稳定运行\n• INS关注+私聊 - 关注互动、智能私信聊天\n• TikTok关注+私信 - 关注互动、智能回复\n• 直播实时转述改为中文\n• INS/TikTok翻译功能恢复\n• 主页数值分组 - 状态(生命/体力/信誉)与声望(危险/影响力/名气)分开展示' },
        { ver: 'V1.2', date: '2026年6月12日 20:35', title: 'My Idol V1.2', content: 'My Idol V1.2 更新内容：\n\n• 删除测试模式 - 粉丝解锁条件已恢复\n• iPad稳定性优化 - 修复Safari兼容性问题\n• 热搜详情+刷新 - 点击热搜查看详情，支持刷新\n• 行程表交互优化 - 参加消耗体力获属性，不参加不可更改\n• 会议沉浸式对话 - 流畅对话体验\n• INS/TikTok消息系统 - Tab移至顶部\n• 直播实时转述+双模式 - 视频/语音直播\n• 成员信息APP - 浏览所有公司和团体成员\n• 影响力/名气系统 - 更多属性影响游戏体验\n• 泡泡/Weverse多语言翻译 - 韩语/日语/英语随机消息\n• 私生危机循环 - 处理后自动生成新事件' },
        { ver: 'V1.0', date: '2026年6月12日 18:00', title: 'My Idol V1.0', content: 'My Idol 韩娱爱豆模拟器内测版本。\n包含练习生/出道爱豆双路线、25个团体、5大经纪公司、INS/TikTok/泡泡/Weverse等社交平台。' }
    ];
    var sysNotices = [];
    
    container.innerHTML = '\n        <div class="page active">\n            <div class="page-header">\n                <div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>\n                <div class="page-title">更新通知</div>\n                <div style="width: 32px;"></div>\n            </div>\n            <div class="page-content">\n                <div class="section-title">版本更新</div>\n                ' + (versionLogs.map(function(v) { return '\n                    <div class="card">\n                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">\n                            <div style="font-weight: 600;">' + (v.title) + '</div>\n                            <span class="badge badge-primary">' + (v.ver) + '</span>\n                        </div>\n                        <div style="font-size: 11px; color: var(--color-text-light); margin-bottom: 8px;">' + (v.date) + '</div>\n                        <div style="font-size: 13px; color: var(--color-text-light); line-height: 1.6; white-space: pre-line;">' + (v.content) + '</div>\n                    </div>\n                '}).join('')) + '\n                \n                <div class="section-title" style="margin-top: 16px;">系统通知</div>\n                ' + (sysNotices.map(function(n) { return '\n                    <div class="card" onclick="showModal(\'' + (n.title) + '\',\'' + (n.content) + '\')">\n                        <div style="font-weight: 600; margin-bottom: 4px;">' + (n.title) + '</div>\n                        <div style="font-size: 12px; color: var(--color-text-light);">' + (n.time) + '</div>\n                    </div>\n                '}).join('')) + '\n            </div>\n        </div>\n    ';
}

// ==================== MEETING DIALOG PAGE ====================
function render会议DialogPage(container) {
    try {
        var ds = gameState.meetingDialogState;
        if (!ds) { goToPage('meeting'); return; }
        
        var optionsHtml = '';
        for (var i = 0; i < ds.options.length; i++) {
            optionsHtml += '<div class="card" data-i="' + i + '" onclick="choose会议Option(this.dataset.i)" style="cursor:pointer;">'
                + '<div style="font-size:14px;">' + ds.options[i].text + '</div>'
                + '</div>';
        }
        
        container.innerHTML = '<div class="page active">'
            + '<div class="page-header">'
            + '<div class="back-btn" onclick="goToPage(\'meeting\')">‹ 会议</div>'
            + '<div class="page-title">' + ds.title + '</div>'
            + '<div style="width:32px;"></div>'
            + '</div>'
            + '<div class="page-content">'
            + '<div class="card" style="background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
            + '<div style="font-size:12px;opacity:0.8;">对话进度</div>'
            + '<div style="font-size:14px;margin-top:4px;">第 ' + ds.round + ' / ' + ds.totalRounds + ' 轮</div>'
            + '</div>'
            + '<div class="card">'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:12px;">' + ds.speaker + '</div>'
            + '<div style="font-size:15px;line-height:1.6;">' + ds.dialog + '</div>'
            + '</div>'
            + '<div class="section-title">你的回应</div>'
            + optionsHtml
            + '</div></div>';
    } catch(e) {
        console.error('render会议DialogPage error:', e);
        gameState.meetingDialogState = null;
        container.innerHTML = '<div class="page active"><div class="page-content" style="text-align:center;padding:60px 20px;">'
            + '<div style="font-size:16px;color:var(--color-danger);">会议页面加载出错</div>'
            + '<div style="font-size:12px;color:var(--color-text-light);margin-top:8px;">' + (e.message || '未知错误') + '</div>'
            + '<button class="btn btn-primary" onclick="goToPage(\'meeting\')" style="margin-top:16px;">返回会议</button>'
            + '</div></div>';
    }
}

function start会议Dialog(meetingIndex) {
    try {
        var m = gameState.meetings[meetingIndex];
        if (!m) return;
    
    var npcs = getSameCompanyNPCs();
    var member1 = npcs.length > 0 ? npcs[0].name : '队友';
    var member2 = npcs.length > 1 ? npcs[1].name : '前辈';
    var dialogs;
    
    if (m.title.indexOf('专辑') > -1 || m.title.indexOf('概念') > -1) {
        dialogs = [
            { round: 1, speaker: '经纪人 李秀珍', dialog: '今天召集大家来，主要是讨论新专辑的方向。' + gameState.player.name + '，你对新概念有什么想法？', options: [
                { text: '我想尝试暗黑概念，展现不同面貌', effect: { credit: 5, fame: 3 } },
                { text: '延续之前的风格，保持稳定', effect: { credit: 3, fame: 1 } },
                { text: '可以融合多种元素，做混搭概念', effect: { credit: 4, influence: 2 } }
            ]},
            { round: 2, speaker: member1, dialog: '我觉得编舞方面可以加入更多自由发挥的部分，让舞台更有张力。你怎么看？', options: [
                { text: '完全同意！我也想挑战更难的编舞', effect: { credit: 4, influence: 3, '体力': -10 } },
                { text: '编舞还是稳定一些好，减少失误风险', effect: { credit: 2 } },
                { text: '可以部分自由发挥，部分走既定编排', effect: { credit: 3, influence: 1 } }
            ]},
            { round: 3, speaker: '经纪人 李秀珍', dialog: '关于MV拍摄计划，需要大家全力配合。公司对你们期望很高。最后你有什么想说的？', options: [
                { text: '我会全力以赴，不辜负公司的期待', effect: { credit: 8, influence: 4, '体力': -15 } },
                { text: '希望拍摄期间能注意大家的身体状况', effect: { credit: 5, fame: 2 } },
                { text: '我会带动团队气氛，让大家保持最佳状态', effect: { credit: 6, fame: 3, influence: 2 } }
            ]}
        ];
    } else if (m.title.indexOf('粉丝') > -1 || m.title.indexOf('见面') > -1) {
        dialogs = [
            { round: 1, speaker: '经纪人 李秀珍', dialog: '粉丝见面会的流程需要最终确认。' + gameState.player.name + '，你对互动环节有什么建议？', options: [
                { text: '增加即兴表演环节，和粉丝近距离互动', effect: { credit: 4, fans: 20, fame: 3 } },
                { text: '保持原流程，安全第一', effect: { credit: 3 } },
                { text: '加一个粉丝点歌环节', effect: { credit: 5, fans: 15 } }
            ]},
            { round: 2, speaker: member1, dialog: '听说这次见面会人数很多，安保方面有点担心...你怎么看？', options: [
                { text: '安全确实重要，提前和安保团队确认方案', effect: { credit: 5, danger: -5 } },
                { text: '粉丝热情是好事，不用太紧张', effect: { credit: 2, fame: 2 } },
                { text: '做好应急预案就行，别因噎废食', effect: { credit: 3, danger: -3 } }
            ]},
            { round: 3, speaker: '运营部负责人', dialog: '最后确认一下，见面会当天的行程很满，你能坚持下来吗？', options: [
                { text: '没问题，为粉丝再累也值得', effect: { credit: 6, fans: 25, '体力': -20, fame: 4 } },
                { text: '会合理安排体力，确保全程状态在线', effect: { credit: 5, fans: 15 } },
                { text: '希望中间能有短暂休息', effect: { credit: 3, '体力': -5 } }
            ]}
        ];
    } else if (m.title.indexOf('练习') > -1 || m.title.indexOf('训练') > -1 || m.title.indexOf('集合') > -1) {
        dialogs = [
            { round: 1, speaker: '经纪人 李秀珍', dialog: '今天的训练安排需要调整一下。' + gameState.player.name + '，你觉得自己哪方面最需要加强？', options: [
                { text: '舞蹈还需要更多练习', effect: { credit: 3, '体力': -5 } },
                { text: '声乐是我最想提升的', effect: { credit: 3, '体力': -5 } },
                { text: '我想全面提升，不偏科', effect: { credit: 5, '体力': -8 } }
            ]},
            { round: 2, speaker: member1, dialog: '最近训练强度确实很大，你还好吗？', options: [
                { text: '还好，我能撑住', effect: { credit: 4, influence: 2 } },
                { text: '有点累，但会坚持', effect: { credit: 3, fame: 1 } },
                { text: '确实需要调整一下节奏', effect: { credit: 2, '体力': 10 } }
            ]},
            { round: 3, speaker: '训练指导老师', dialog: '接下来一周要加练，你能配合吗？', options: [
                { text: '没问题，全力配合', effect: { credit: 7, '体力': -15, influence: 3 } },
                { text: '可以，但希望合理安排休息', effect: { credit: 5, fame: 2 } },
                { text: '我会尽最大努力', effect: { credit: 6, influence: 2, '体力': -10 } }
            ]}
        ];
    } else if (m.title.indexOf('健康') > -1 || m.title.indexOf('检查') > -1) {
        dialogs = [
            { round: 1, speaker: '经纪人 李秀珍', dialog: '健康管理是很重要的事情。' + gameState.player.name + '，你最近身体状态怎么样？', options: [
                { text: '状态很好，精力充沛', effect: { credit: 3, fame: 1 } },
                { text: '有点疲惫，需要休息', effect: { credit: 2, '体力': 15 } },
                { text: '还行，但偶尔会感到压力', effect: { credit: 4, influence: 1 } }
            ]},
            { round: 2, speaker: '队医', dialog: '检查结果显示你需要多注意作息。有什么想问的吗？', options: [
                { text: '有什么建议的恢复方法吗？', effect: { credit: 3, '体力': 20 } },
                { text: '我会在意的，谢谢', effect: { credit: 2 } },
                { text: '会不会影响接下来的行程？', effect: { credit: 4, fame: 1 } }
            ]},
            { round: 3, speaker: '经纪人 李秀珍', dialog: '身体是革命的本钱，一定要重视。', options: [
                { text: '我会好好照顾自己的', effect: { credit: 5, '体力': 10, fame: 2 } },
                { text: '知道了，我会调整作息', effect: { credit: 3, '体力': 15 } },
                { text: '谢谢关心，我没事的', effect: { credit: 2, fame: 1 } }
            ]}
        ];
    } else if (m.title.indexOf('考核') > -1 || m.title.indexOf('评估') > -1) {
        dialogs = [
            { round: 1, speaker: '经纪人 李秀珍', dialog: '考核结果出来了。' + gameState.player.name + '，你对这次考核有信心吗？', options: [
                { text: '有信心，我准备得很充分', effect: { credit: 5, fame: 2 } },
                { text: '有点紧张，但尽力了', effect: { credit: 3 } },
                { text: '不管结果如何，我继续努力', effect: { credit: 4, influence: 2 } }
            ]},
            { round: 2, speaker: member2, dialog: '这次考核标准好像比以前严格了不少...', options: [
                { text: '严格才能出精品，加油', effect: { credit: 5, influence: 2 } },
                { text: '确实，压力好大', effect: { credit: 2, '体力': -5 } },
                { text: '我们一起努力就好', effect: { credit: 4, fame: 1 } }
            ]},
            { round: 3, speaker: '训练指导老师', dialog: '考核只是过程，成长才是目的。继续加油！', options: [
                { text: '我会更加努力的', effect: { credit: 6, influence: 3 } },
                { text: '谢谢老师，我会保持谦虚', effect: { credit: 5, fame: 2 } },
                { text: '下一次考核我一定表现更好', effect: { credit: 7, '体力': -10, fame: 3 } }
            ]}
        ];
    } else {
        dialogs = [
            { round: 1, speaker: '经纪人 李秀珍', dialog: '今天的会议主题是' + m.title + '。' + gameState.player.name + '，你先说说你的想法？', options: [
                { text: '我觉得应该大胆尝试新方向', effect: { credit: 5, influence: 2 } },
                { text: '稳妥起见，按照原计划进行', effect: { credit: 3 } },
                { text: '我需要更多信息才能判断', effect: { credit: 1 } }
            ]},
            { round: 2, speaker: member1, dialog: '关于接下来的安排，你有什么态度？', options: [
                { text: '我愿意全力以赴配合', effect: { credit: 5, '体力': -10, influence: 2 } },
                { text: '希望能有更多准备时间', effect: { credit: 2 } },
                { text: '我有一些不同意见想提出', effect: { credit: -2, fame: 3 } }
            ]},
            { round: 3, speaker: '经纪人 李秀珍', dialog: '最后，你对团队有什么承诺？', options: [
                { text: '我会以团队利益为优先', effect: { credit: 8, fans: 15, influence: 3 } },
                { text: '我会努力做到最好', effect: { credit: 5, fans: 5 } },
                { text: '希望大家互相支持', effect: { credit: 3, fans: 8, fame: 2 } }
            ]}
        ];
    }
    
    var first = dialogs[0];
    gameState.meetingDialogState = {
        title: m.title,
        meetingIndex: meetingIndex,
        round: 1,
        totalRounds: 3,
        dialogIndex: 0,
        speaker: first.speaker,
        dialog: first.dialog,
        options: first.options,
        allDialogs: dialogs
    };
    goToPage('meetingdialog');
    } catch(e) {
        console.error('start会议Dialog error:', e);
        gameState.meetingDialogState = null;
        showModal('会议出错', '进入会议时发生错误：' + (e.message || '未知错误') + '\n请重新尝试');
        goToPage('meeting');
    }
}

function choose会议Option(optionIndex) {
    try {
        var ds = gameState.meetingDialogState;
        if (!ds) return;
        
        var opt = ds.options[optionIndex];
        if (opt.effect) {
            if (opt.effect.credit) gameState.credit = Math.max(0, Math.min(200, gameState.credit + opt.effect.credit));
            if (opt.effect.fans) gameState.fans += opt.effect.fans;
            if (opt.effect['体力']) gameState.体力 = Math.max(0, gameState.体力 + opt.effect['体力']);
            if (opt.effect.influence) gameState.influence = Math.min(200, (gameState.influence || 50) + opt.effect.influence);
            if (opt.effect.fame) gameState.fame = Math.min(200, (gameState.fame || 30) + opt.effect.fame);
            if (opt.effect.danger) gameState.danger = Math.max(0, gameState.danger + opt.effect.danger);
    if(typeof _updateDangerDisplay==='function') _updateDangerDisplay();
        }
        
        if (ds.round >= ds.totalRounds) {
            var summary = '会议圆满结束！\n';
            if (opt.effect) {
                if (opt.effect.credit) summary += '信誉 +' + opt.effect.credit + '\n';
                if (opt.effect.fans) summary += '粉丝 +' + opt.effect.fans + '\n';
                if (opt.effect.influence) summary += '影响力 +' + opt.effect.influence + '\n';
                if (opt.effect.fame) summary += '名气 +' + opt.effect.fame + '\n';
                if (opt.effect['体力']) summary += '体力 ' + opt.effect['体力'] + '\n';
                if (opt.effect.danger) summary += '危险值 ' + (opt.effect.danger > 0 ? '+' : '') + opt.effect.danger;
            }
            gameState.meetingDialogState = null;
            showModal('会议结束', summary.trim());
            goToPage('meeting');
            return;
        }
        
        var nextDialog = ds.allDialogs[ds.round];
        ds.round++;
        ds.speaker = nextDialog.speaker;
        ds.dialog = nextDialog.dialog;
        ds.options = nextDialog.options;
        render();
    } catch(e) {
        console.error('choose会议Option error:', e);
        gameState.meetingDialogState = null;
        showModal('选择出错', '做出选择时发生错误：' + (e.message || '未知错误') + '\n已返回会议列表');
        goToPage('meeting');
    }
}

// ==================== INS PROFILE PAGE ====================
function renderInsProfilePage(container) {
    var profileUser = gameState.insProfileView || gameState.player.name;
    var posts = [
        { img: 'https://picsum.photos/300/300?random=10', likes: 234, caption: 'Great day!' },
        { img: 'https://picsum.photos/300/300?random=11', likes: 456, caption: 'Backstage' },
        { img: 'https://picsum.photos/300/300?random=12', likes: 189, caption: 'Practice' }
    ];
    var isSelf = profileUser === gameState.player.name;
    var isFollowed = insFollowedUsers && insFollowedUsers[profileUser];
    var followBtnText = isSelf ? '编辑资料' : (isFollowed ? '已关注' : '关注');
    var followBtnClass = isSelf || isFollowed ? 'btn btn-sm btn-secondary' : 'btn btn-sm btn-primary';
    var fansCount = Math.floor(Math.random() * 5000) + 1000;
    if (isFollowed) fansCount += 1;
    
    var postsGridHtml = '';
    for (var pi = 0; pi < posts.length; pi++) {
        var pp = posts[pi];
        postsGridHtml += '<div style="aspect-ratio:1;background:var(--color-border);border-radius:4px;overflow:hidden;cursor:pointer;" onclick="showModal(\'动态\',\'\' + pp.caption + \' - \' + pp.likes + \' 点赞\')"><img src="' + pp.img + '" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display=\'none\'"></div>';
    }
    
    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'ins\')">‹ INS</div>'
        + '<div class="page-title">' + profileUser + '</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;padding:24px;">'
        + '<div class="avatar" style="width:72px;height:72px;font-size:28px;margin:0 auto 12px;">' + profileUser.charAt(0).toUpperCase() + '</div>'
        + '<div style="font-size:18px;font-weight:700;">' + profileUser + '</div>'
        + '<div style="display:flex;justify-content:space-around;margin-top:16px;">'
        + '<div><div style="font-weight:600;">' + posts.length + '</div><div style="font-size:11px;color:var(--color-text-light);">动态</div></div>'
        + '<div><div style="font-weight:600;">' + fansCount.toLocaleString() + '</div><div style="font-size:11px;color:var(--color-text-light);">粉丝</div></div>'
        + '<div><div style="font-weight:600;">' + (Math.floor(Math.random() * 200) + 50) + '</div><div style="font-size:11px;color:var(--color-text-light);">关注</div></div>'
        + '</div>'
        + '<div style="display:flex;gap:8px;margin-top:16px;justify-content:center;">'
        + '<button class="' + followBtnClass + '" onclick="toggleInsFollow()">' + followBtnText + '</button>'
        + '<button class="btn btn-sm btn-secondary" onclick="startInsDMChat(profileUser)">私信</button>'
        + '</div>'
        + '</div>'
        + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;">'
        + postsGridHtml
        + '</div>'
        + '</div></div>';
}

function toggleInsFollow() {
    var profileUser = gameState.insProfileView || gameState.player.name;
    if (profileUser === gameState.player.name) {
        showModal('操作成功', '资料已更新');
        return;
    }
    if (!insFollowedUsers) insFollowedUsers = {};
    if (insFollowedUsers[profileUser]) {
        insFollowedUsers[profileUser] = false;
        gameState.fans = Math.max(0, gameState.fans - 5);
        showModal('取消关注', '已取消关注 ' + profileUser);
    } else {
        insFollowedUsers[profileUser] = true;
        gameState.fans += 10;
        if (!gameState.npc好感度) gameState.npc好感度 = {};
        if (!gameState.npc好感度[profileUser]) gameState.npc好感度[profileUser] = 30;
        gameState.npc好感度[profileUser] = Math.min(100, (gameState.npc好感度[profileUser] || 30) + 10);
        showModal('关注成功', '已关注 ' + profileUser + '\n+10 粉丝\n好感度 +10');
    }
    render();
}

function startInsDMChat(user) {
    insTab = 'messages';
    insMsgChatUser = user;
    if (!gameState.insMessages) gameState.insMessages = [];
    render();
}

function showInsDM(user) {
    startInsDMChat(user);
}

// ==================== SETTINGS PAGE ====================

var _resetCooldown = false;
function _resetSave() {
    if (_resetCooldown) return;
    _resetCooldown = true;
    setTimeout(function() { _resetCooldown = false; }, 3000);
    showModal('重新开始', '确定要删除当前存档重新开始吗？此操作不可恢复！', [
        { text: '取消', action: closeModal },
        { text: '重新开始', action: function() {
            closeModal();
            var key = _getSaveKey(current存档);
            localStorage.removeItem(key);
            if (autoSaveTimer) { clearInterval(autoSaveTimer); autoSaveTimer = null; }
            Object.assign(gameState, JSON.parse(JSON.stringify(_defaultGameState)));
            gameState.player = {
                name: '', gender: '', birthDate: '', age: 0,
                personality: [], company: '', group: '', groups: [],
                positions: [], role: '', avatar: ''
            };
            currentPage = 'create';
            creationStep = 1;
            document.getElementById('statusBar').style.display = 'none';
            document.getElementById('restButtons').style.display = 'none';
            document.getElementById('bottomNav').style.display = 'none';
            document.getElementById('homeIndicator').style.display = 'none';
            render();
        }}
    ]);
}

function _switchSaveSlot() {
    var saves = _loadAllSavesForUser();
    var html = '<div style="padding:8px 0;">';
    for (var i = 0; i < 3; i++) {
        var save = saves[i];
        var isCurrent = (i === current存档);
        if (isCurrent) {
            html += '<div class="save-slot occupied" style="opacity:0.5;cursor:default;border-color:var(--color-primary);">'
                + '<div style="font-weight:600;color:var(--color-primary);">存档 ' + (i+1) + ' (当前)</div>'
                + '</div>';
        } else if (save && save.player && save.player.name) {
            var roleText = save.player.role === 'Trainee' ? '练习生' : '出道爱豆';
            html += '<div class="save-slot occupied" data-i="' + i + '" onclick="_doSwitchSlot(this.dataset.i)">'
                + '<div style="font-weight:600;color:var(--color-text);">存档 ' + (i+1) + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">' + save.player.name + ' | ' + roleText + '</div>'
                + '</div>';
        } else {
            html += '<div class="save-slot empty" data-i="' + i + '" onclick="_doSwitchSlot(this.dataset.i)">'
                + '<div>空存档 ' + (i+1) + '</div>'
                + '</div>';
        }
    }
    html += '</div>';
    showModal('切换存档', html, [
        { text: '取消', action: closeModal }
    ]);
}

function _doSwitchSlot(slot) {
    closeModal();
    saveGame(current存档);
    current存档 = slot;
    var key = _getSaveKey(slot);
    var data = localStorage.getItem(key);
    if (data) {
        try {
            Object.assign(gameState, JSON.parse(data));
            _ensureV16Fields();
            _checkAdmin(localStorage.getItem('myIdolCurrentUser'));
            currentPage = 'home';
            render();
            renderBottomNav();
            showToast('已切换到存档 ' + (slot + 1));
        } catch(e) {
            showToast('存档读取失败');
        }
    } else {
        Object.assign(gameState, JSON.parse(JSON.stringify(_defaultGameState)));
        _ensureV16Fields();
        gameState.player = {
            name: '', gender: '', birthDate: '', age: 0,
            personality: [], company: '', group: '', groups: [],
            positions: [], role: '', avatar: ''
        };
        creationStep = 1;
        currentPage = 'create';
        document.getElementById('statusBar').style.display = 'none';
        document.getElementById('restButtons').style.display = 'none';
        document.getElementById('bottomNav').style.display = 'none';
        document.getElementById('homeIndicator').style.display = 'none';
        render();
        showToast('开始新存档 ' + (slot + 1));
    }
}


function render设置Page(container) {
    container.innerHTML = '\n        <div class="page active">\n            <div class="page-header">\n                <div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>\n                <div class="page-title">设置</div>\n                <div style="width: 32px;"></div>\n            </div>\n            <div class="page-content">\n                <div class="card" onclick="saveGame(current存档)" style="cursor: pointer;">\n                    <div style="font-weight: 600;">保存游戏</div>\n                    <div style="font-size: 12px; color: var(--color-text-light);">保存到存档 ' + (current存档 + 1) + '</div>\n                </div>\n                <div class="card" onclick="_switchSaveSlot()" style="cursor: pointer;">\n                    <div style="font-weight: 600;">切换存档</div>\n                    <div style="font-size: 12px; color: var(--color-text-light);">切换到存档2或3，当前进度不会丢失</div>\n                </div>\n                \n\n                <div class="card" onclick="_resetSave()">\n                    <div style="font-weight: 600; color: var(--color-danger);">重新开始</div>\n                    <div style="font-size: 12px; color: var(--color-text-light);">删除当前存档，重新创建角色</div>\n                </div>\n                <div class="card" onclick="_doLogout()">\n                    <div style="font-weight: 600; color: var(--color-danger);">退出登录</div>\n                    <div style="font-size: 12px; color: var(--color-text-light);">切换账号或注册新账号</div>\n                </div>\n                <div class="card" onclick="confirmExit()">\n                    <div style="font-weight: 600;">退出游戏</div>\n                    <div style="font-size: 12px; color: var(--color-text-light);">返回标题画面</div>\n                \n            </div>\n        </div>\n    ';
}

var _exitCooldown = false;
function confirmExit() {
    if (_exitCooldown) return;
    _exitCooldown = true;
    setTimeout(function() { _exitCooldown = false; }, 3000);
    showModal('退出游戏', '确定要退出吗？游戏会自动保存', [
        { text: '取消', action: closeModal },
        { text: '退出', action: function() {
            try {
                var saveData = {};
                var keys = Object.keys(gameState);
                for (var si = 0; si < keys.length; si++) {
                    if (keys[si] !== 'restTimeout') saveData[keys[si]] = gameState[keys[si]];
                }
                localStorage.setItem(_getSaveKey(current存档), JSON.stringify(saveData));
            } catch(e) {}
            if (autoSaveTimer) { clearInterval(autoSaveTimer); autoSaveTimer = null; }
            currentPage = 'welcome';
            document.getElementById('statusBar').style.display = 'none';
            document.getElementById('restButtons').style.display = 'none';
            document.getElementById('bottomNav').style.display = 'none';
            document.getElementById('homeIndicator').style.display = 'none';
            render();
        }}
    ]);
}

// ==================== GAME ACTIONS ====================
function do训练() {
    if (gameState.体力 < 20) {
        showModal('体力不足', '请先休息恢复体力');
        return;
    }
    
    gameState.体力 = Math.max(0, gameState.体力 - 20);
    gameState.money -= 1000;
    
    var keys = Object.keys(gameState.stats);
    var randomKey = keys[Math.floor(Math.random() * keys.length)];
    gameState.stats[randomKey] = Math.min(150, gameState.stats[randomKey] + 1);
    
    var names = { dance: '舞蹈', vocal: '声乐', rap: '说唱', acting: '表演', variety: '综艺' };
    showModal('训练完成', '-20 体力\n-1,000 金币\n+1 ' + (names[randomKey]));
    render();
}

function showMail() {
    currentPage = 'mail';
    render();
    renderBottomNav();
}

// ==================== REST FUNCTIONS ====================
var _isResting = false;
function rest30sec() {
    if (_isResting) return;
    if (gameState.体力 >= gameState.max体力) { showToast('体力已满，无需休息'); return; }
    _isResting = true;
    if (gameState.restTimeout) {
        clearTimeout(gameState.restTimeout);
    }
    
    var recovered = 0;
    var interval = setInterval(function() {
        if (gameState['体力'] >= gameState['max体力'] || recovered >= 60) {
            clearInterval(interval);
            return;
        }
        gameState['体力'] = Math.min(gameState['max体力'], gameState['体力'] + 2);
        recovered += 2;
        update体力Display();
        triggerSilentSave();
    }, 100);
    _addTimer(interval);
    
    showModal('休息中', '正在恢复体力，请等待30秒...');
    var timeout = setTimeout(function() {
        clearInterval(interval);
        _isResting = false;
        showModal('休息完成', '+60 体力已恢复！');
        render();
    }, 30000);
    _addTimer(timeout);
}

function rest50percent() {
    if (_isResting) return;
    if (gameState.体力 >= gameState.max体力) { showToast('体力已满，无需休息'); return; }
    _isResting = true;
    var restore = Math.floor(gameState.max体力 * 0.5);
    gameState.体力 = Math.min(gameState.max体力, gameState.体力 + restore);
    showModal('休息完成', '+' + restore + ' 体力已恢复！');
    _isResting = false;
    render();
}

// 体力归零自动恢复
var _autoRestTimer = null;
function _checkAutoRest() {
    if (gameState.体力 <= 0 && !_autoRestTimer && currentPage !== 'welcome' && currentPage !== 'create') {
        _autoRestTimer = setTimeout(function() {
            if (gameState.体力 <= 0) {
                gameState.体力 = Math.min(gameState.max体力, 30);
                showToast('体力已恢复至30');
                render();
            }
            _autoRestTimer = null;
        }, 30000);
    }
}

function update体力Display() {
    var 体力Bar = document.querySelector('.stat-fill.体力');
    var 体力Value = document.querySelector('.stat-value');
    if (体力Bar) {
        体力Bar.style.width = (gameState.体力 / gameState.max体力 * 100) + '%';
    }
    if (体力Value) {
        体力Value.textContent = gameState.体力;
    }
}

// ==================== ADMIN ====================
var _isAdmin = false;
function _checkAdmin(nickname) {
    if (nickname === 'Linyuji' || nickname === 'xixi') {
        _isAdmin = true;
        _applyAdminMode();
    } else {
        _isAdmin = false;
    }
}
function _applyAdminMode() {
    gameState.money = 99999999;
    gameState.fans = 9999999;
    gameState.fame = 200;
    gameState.influence = 200;
    gameState.credit = 999;
    gameState.life = 9999;
    gameState.danger = 100;
    if(typeof _updateDangerDisplay==='function') _updateDangerDisplay();
    gameState.max体力 = 9999;
    gameState.体力 = 9999;
    gameState.stats.dance = 150;
    gameState.stats.vocal = 150;
    gameState.stats.rap = 150;
    gameState.stats.acting = 150;
    gameState.stats.variety = 150;
    gameState.certificates = {
        dance: [true, true, true],
        vocal: [true, true, true],
        rap: [true, true, true],
        acting: [true, true, true],
        variety: [true, true, true]
    };
    gameState.examResult = { comprehensive: [true, true] };
    gameState.preDebut = true;
}

// ==================== MODAL ====================
var _modalActions = [];
function showModal(title, message, buttons) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').innerHTML = message;
    
    _modalActions = [];
    if (!buttons) {
        buttons = [{ text: '确定', action: closeModal }];
    }
    
    var btnHtml = '';
    for (var bi = 0; bi < buttons.length; bi++) {
        _modalActions.push(buttons[bi].action);
        btnHtml += '<button class="btn ' + (buttons[bi].text === '取消' ? 'btn-secondary' : 'btn-primary') + '" onclick="_modalActions[' + bi + ']()" style="margin: 0 4px;">' + buttons[bi].text + '</button>';
    }
    document.getElementById('modalButtons').innerHTML = btnHtml;
    
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// ==================== SAVE/LOAD ====================
var current存档 = 0;

function saveGame(slot) {
    var saveData = {};
    var keys = Object.keys(gameState);
    for (var si = 0; si < keys.length; si++) {
        if (keys[si] !== 'restTimeout') saveData[keys[si]] = gameState[keys[si]];
    }
    
    try {
        var jsonStr = JSON.stringify(saveData);
        if (!jsonStr || jsonStr.length < 10) {
            showModal('保存失败', '存档数据异常，无法保存');
            return;
        }
        var key = _getSaveKey(slot);
        localStorage.setItem(key, jsonStr);
        showToast('已保存 - 存档 ' + (slot + 1));
    } catch (e) {
        showModal('保存失败', '无法保存游戏。');
    }
}


// Immediate danger display update (fixes delay)
function _updateDangerDisplay() {
    var fills = document.querySelectorAll('.stat-fill.danger');
    var vals = document.querySelectorAll('.stat-value');
    for (var i = 0; i < fills.length; i++) {
        fills[i].style.width = Math.min(100, gameState.danger) + '%';
    }
    // Update danger stat-value specifically
    var allSpans = document.querySelectorAll('span.stat-value');
    for (var j = 0; j < allSpans.length; j++) {
        if (allSpans[j].parentElement && allSpans[j].previousElementSibling && allSpans[j].previousElementSibling.className && allSpans[j].previousElementSibling.className.indexOf('danger') > -1) {
            allSpans[j].textContent = gameState.danger;
            allSpans[j].style.color = gameState.danger > 50 ? 'var(--color-danger)' : 'var(--color-text)';
        }
    }
}

function loadGame(slot) {
    try {
        var key = _getSaveKey(slot);
        var data = localStorage.getItem(key);
        if (data) {
            var saveData = JSON.parse(data);
            Object.assign(gameState, saveData);
            _ensureV16Fields();
            current存档 = slot;
            _checkAdmin(localStorage.getItem('myIdolCurrentUser'));
            currentPage = 'home';
            document.getElementById('statusBar').style.display = 'flex';
            document.getElementById('restButtons').style.display = 'flex';
            document.getElementById('bottomNav').style.display = 'flex';
            document.getElementById('homeIndicator').style.display = 'block';
            render();
            renderBottomNav();
            startAutoSave();
        }
    } catch (e) {
        showModal('加载失败', '无法加载游戏。');
    }
}

function loadAllSaves() {
    var saves = [null, null, null];
    for (var i = 0; i < 3; i++) {
        try {
            var data = localStorage.getItem('myidol_save_' + i);
            if (data) {
                saves[i] = JSON.parse(data);
            }
        } catch (e) {}
    }
    return saves;
}

// ==================== TIME ====================
function updateTime() {
    var now = new Date();
    var hours = ('0' + now.getHours()).slice(-2);
    var minutes = ('0' + now.getMinutes()).slice(-2);
    var timeEl = document.getElementById('statusTime');
    if (timeEl) {
        timeEl.textContent = hours + ':' + minutes;
    }
}

setInterval(updateTime, 1000);
updateTime();

// ==================== TOAST ====================
function showToast(message, duration) {
    if (!duration) duration = 2500;
    var toast = document.createElement('div');
    toast.className = 'myidol-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function() {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, duration);
}

// ==================== PHONE NOTIFICATION SYSTEM ====================
var _phoneNotifQueue = [];
var _phoneNotifShowing = false;

function showPhoneNotification(appName, title, text, iconBg, duration) {
    if (!duration) duration = 2500;
    _phoneNotifQueue.push({ appName: appName, title: title, text: text, iconBg: iconBg || '#FF8FA3', duration: duration });
    if (!_phoneNotifShowing) _processPhoneNotif();
}

function _processPhoneNotif() {
    if (_phoneNotifQueue.length === 0) { _phoneNotifShowing = false; return; }
    _phoneNotifShowing = true;
    var notif = _phoneNotifQueue.shift();
    
    var el = document.createElement('div');
    el.className = 'phone-notification';
    var iconLetter = notif.appName ? notif.appName.charAt(0) : 'M';
    el.innerHTML = '<div class="notif-icon" style="background:' + notif.iconBg + ';">' + iconLetter + '</div>'
        + '<div class="notif-body">'
        + '<div class="notif-app">' + notif.appName + '</div>'
        + '<div class="notif-title">' + notif.title + '</div>'
        + '<div class="notif-text">' + notif.text + '</div>'
        + '</div>'
        + '<div class="notif-time">now</div>';
    document.body.appendChild(el);
    
    // Tap to dismiss
    el.onclick = function() {
        el.classList.remove('show');
        setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); _processPhoneNotif(); }, 300);
    };
    
    setTimeout(function() { el.classList.add('show'); }, 50);
    setTimeout(function() {
        el.classList.remove('show');
        setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); _processPhoneNotif(); }, 400);
    }, notif.duration);
}

// Notification trigger functions - call these from game events
function notifyIns(title, text) { showPhoneNotification('INS', title, text, '#E1306C'); }
function notifyTiktok(title, text) { showPhoneNotification('TikTok', title, text, '#000000'); }
function notifyKakao(title, text) { showPhoneNotification('KakaoTalk', title, text, '#FEE500'); }
function notifyBubble(title, text) { showPhoneNotification('Bubble', title, text, '#7C4DFF'); }
function notifyWeverse(title, text) { showPhoneNotification('Weverse', title, text, '#00C853'); }
function notifySystem(title, text) { showPhoneNotification('System', title, text, '#FF8FA3'); }
function notifySchedule(title, text) { showPhoneNotification('Schedule', title, text, '#4A90D9'); }
function notifyNews(title, text) { showPhoneNotification('News', title, text, '#FF6B6B'); }
function notifyMusic(title, text) { showPhoneNotification('Music', title, text, '#5BB8E8'); }
function notifyMV(title, text) { showPhoneNotification('MV Studio', title, text, '#7C4DFF'); }
function notifyContract(title, text) { showPhoneNotification('Contract', title, text, '#2C2C2C'); }
function notifyManagement(title, text) { showPhoneNotification('Management', title, text, '#FF9500'); }
function notifyPR(title, text) { showPhoneNotification('PR', title, text, '#636366'); }
function notifyGacha(title, text) { showPhoneNotification('Gacha', title, text, '#FFD700'); }
function notifyAchievement(title, text) { showPhoneNotification('Achievement', title, text, '#4CD964'); }


// ==================== ACHIEVEMENT SYSTEM ====================
var ACHIEVEMENTS = [
    // Training achievements
    { id: 'first_train', name: '初入练习室', desc: '完成第一次训练', icon: 'T', check: function() { return gameState.舞蹈 + gameState.声乐 + gameState.说唱 + gameState.表演 > 10; } },
    { id: 'train_100', name: '百练成钢', desc: '累计训练100次', icon: 'T', check: function() { return (gameState.trainCount || 0) >= 100; } },
    { id: 'stat_max', name: '全能艺人', desc: '所有能力值达到150', icon: 'S', check: function() { return gameState.舞蹈 >= 150 && gameState.声乐 >= 150 && gameState.说唱 >= 150 && gameState.表演 >= 150; } },
    // Debut achievements
    { id: 'debut', name: '闪耀出道', desc: '成功出道', icon: 'D', check: function() { return gameState.player.role === 'Idol'; } },
    { id: 'debut_first', name: '一位获得者', desc: '打歌获得一位', icon: '1', check: function() { return gameState.firstPlaceCount > 0; } },
    // Social achievements
    { id: 'fan_1w', name: '万人迷', desc: '粉丝数达到10,000', icon: 'F', check: function() { return gameState.fans >= 10000; } },
    { id: 'fan_10w', name: '超级偶像', desc: '粉丝数达到100,000', icon: 'F', check: function() { return gameState.fans >= 100000; } },
    { id: 'fan_100w', name: '国民爱豆', desc: '粉丝数达到1,000,000', icon: 'F', check: function() { return gameState.fans >= 1000000; } },
    // Wealth achievements
    { id: 'rich_10w', name: '小有积蓄', desc: '金币达到100,000', icon: 'G', check: function() { return gameState.money >= 100000; } },
    { id: 'rich_100w', name: '财源广进', desc: '金币达到1,000,000', icon: 'G', check: function() { return gameState.money >= 1000000; } },
    // Love achievements
    { id: 'first_love', name: '心动时刻', desc: '第一次恋爱', icon: 'L', check: function() { return gameState.dating !== ''; } },
    // Danger achievements
    { id: 'danger_high', name: '风口浪尖', desc: '危险值达到80以上', icon: '!', check: function() { return gameState.danger >= 80; } },
    // Schedule achievements
    { id: 'schedule_10', name: '行程达人', desc: '完成10个行程', icon: 'C', check: function() { return (gameState.scheduleCount || 0) >= 10; } },
    { id: 'schedule_50', name: '劳模爱豆', desc: '完成50个行程', icon: 'C', check: function() { return (gameState.scheduleCount || 0) >= 50; } },
];

function checkAchievements() {
    if (!gameState.achievements) gameState.achievements = [];
    for (var i = 0; i < ACHIEVEMENTS.length; i++) {
        var a = ACHIEVEMENTS[i];
        if (gameState.achievements.indexOf(a.id) === -1 && a.check()) {
            gameState.achievements.push(a.id);
            notifySystem('成就解锁', a.name + ' - ' + a.desc);
            showToast('成就解锁: ' + a.name);
        }
    }
}

function renderAchievementsPage(container) {
    if (!gameState.achievements) gameState.achievements = [];
    var html = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">成就</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">';
    
    var unlocked = gameState.achievements.length;
    var total = ACHIEVEMENTS.length;
    html += '<div style="text-align:center;margin-bottom:20px;">'
        + '<div style="font-size:36px;font-weight:700;color:var(--color-primary);">' + unlocked + '/' + total + '</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);">已解锁成就</div>'
        + '<div style="width:80%;height:6px;background:var(--color-border);border-radius:3px;margin:12px auto 0;overflow:hidden;">'
        + '<div style="width:' + (total > 0 ? Math.round(unlocked/total*100) : 0) + '%;height:100%;background:linear-gradient(90deg,#FF8FA3,#FF6B8A);border-radius:3px;"></div>'
        + '</div></div>';
    
    for (var i = 0; i < ACHIEVEMENTS.length; i++) {
        var a = ACHIEVEMENTS[i];
        var done = gameState.achievements.indexOf(a.id) !== -1;
        html += '<div class="card" style="display:flex;align-items:center;gap:12px;margin-bottom:10px;' + (done ? '' : 'opacity:0.5;') + '">'
            + '<div style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:white;background:' + (done ? 'linear-gradient(135deg,#FF8FA3,#FF6B8A)' : '#ddd') + ';">' + a.icon + '</div>'
            + '<div style="flex:1;"><div style="font-weight:600;font-size:14px;">' + a.name + '</div>'
            + '<div style="font-size:12px;color:var(--color-text-light);">' + a.desc + '</div></div>'
            + (done ? '<div style="color:var(--color-success);font-weight:700;">✓</div>' : '')
            + '</div>';
    }
    
    html += '</div></div>';
    container.innerHTML = html;
}

// ==================== COMEBACK SYSTEM (新专辑回归) ====================
var COMEBACK_CONCEPTS = [
    { name: 'Girl Crush', style: '酷飒', stat: 'dance', mvQuality: 1.2, desc: '强势霸气的概念，展现女性力量' },
    { name: 'Innocent', style: '清纯', stat: 'vocal', mvQuality: 1.0, desc: '清新甜美的概念，充满青春气息' },
    { name: 'Sexy', style: '性感', stat: 'dance', mvQuality: 1.1, desc: '成熟魅惑的概念，展现魅力' },
    { name: 'Hip-hop', style: '嘻哈', stat: 'rap', mvQuality: 1.15, desc: '街头嘻哈概念，展现个性态度' },
    { name: 'Retro', style: '复古', stat: 'vocal', mvQuality: 1.05, desc: '复古怀旧概念，致敬经典' },
    { name: 'Fantasy', style: '奇幻', stat: 'acting', mvQuality: 1.3, desc: '奇幻冒险概念，充满想象力' },
    { name: 'Elegant', style: '优雅', stat: 'vocal', mvQuality: 1.1, desc: '优雅高贵概念，展现气质' },
    { name: 'Fierce', style: '凶猛', stat: 'dance', mvQuality: 1.2, desc: '激烈强势概念，舞台炸裂' }
];

var TITLE_TRACK_TYPES = [
    { name: 'Dance Pop', genre: '舞曲', bestStat: 'dance' },
    { name: 'Ballad', genre: '抒情', bestStat: 'vocal' },
    { name: 'R&B', genre: '节奏布鲁斯', bestStat: 'vocal' },
    { name: 'Hip-hop', genre: '嘻哈', bestStat: 'rap' },
    { name: 'EDM', genre: '电子', bestStat: 'dance' },
    { name: 'Rock', genre: '摇滚', bestStat: 'dance' }
];

function startComeback() {
    if (gameState.player.role !== 'Idol') { showToast('只有出道爱豆才能回归'); return; }
    if (gameState.comeback && gameState.comeback.phase !== 'done') { showToast('回归进行中'); return; }
    if (gameState.体力 < 50) { showModal('体力不足', '回归准备需要至少50体力'); return; }
    if (gameState.money < 50000) { showModal('资金不足', '回归准备需要50,000金币'); return; }
    gameState.comeback = { phase: 'concept', concept: null, titleTrack: null, promotion: 0, musicShowResults: [], daysLeft: 14 };
    // 体力金币由歌曲制作和MV拍摄各自扣费
    // Auto post INS and trigger hotsearch when comeback starts
    if (!gameState.insPosts) gameState.insPosts = [];
    gameState.insPosts.unshift({
        text: gameState.player.name + '\u7684\u65b0\u56de\u5f52\u5373\u5c06\u5f00\u59cb\uff01\u656c\u8bf7\u671f\u5f85~ \u2728',
        likes: Math.floor(Math.random() * 500) + 200,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    });
    if (gameState.player.role === 'Idol') gameState.insUnread = (gameState.insUnread || 0) + 1;
    _triggerHotsearch(gameState.player.group + '\u65b0\u56de\u5f52\u786e\u5b9a', (Math.floor(Math.random() * 10) + 8) + '\u4e07', gameState.player.group + '\u5ba3\u5e03\u65b0\u56de\u5f52\uff01\u7c89\u4e1d\u4eec\u7eb7\u7eb7\u8868\u793a\u671f\u5f85\uff0c\u8bdd\u9898\u8ba8\u8bba\u5ea6\u7a81\u7834\u767e\u4e07\u3002', false);
    currentPage = 'comeback';
    render();
}

function selectComebackConcept(idx) {
    gameState.comeback.concept = COMEBACK_CONCEPTS[idx];
    gameState.comeback.phase = 'titletrack';
    render();
}

function selectTitleTrack(idx) {
    gameState.comeback.titleTrack = TITLE_TRACK_TYPES[idx];
    gameState.comeback.phase = 'songprod';
    render();
}

function shootMV() {
    if (gameState.体力 < 30) { showModal('体力不足', 'MV拍摄需要30体力'); return; }
    if (gameState.money < 30000) { showModal('资金不足', 'MV拍摄需要30,000金币'); return; }
    gameState.体力 -= 30;
    gameState.money -= 30000;
    var concept = gameState.comeback.concept;
    var title = gameState.comeback.titleTrack;
    var statVal = gameState.stats[title.bestStat] || 50;
    var quality = Math.floor((statVal / 150) * 70 + Math.random() * 30 * concept.mvQuality);
    quality = Math.min(100, Math.max(20, quality));
    gameState.comeback.mvQuality = quality;
    gameState.comeback.mvViews = Math.floor(quality * 10000 + gameState.fans * 5);
    gameState.comeback.phase = 'promote';
    if (!gameState.mvCollection) gameState.mvCollection = [];
    gameState.mvCollection.push({ title: gameState.comeback.titleTrack.name, concept: gameState.comeback.concept.name, quality: quality, views: gameState.comeback.mvViews });
    gameState.comeback.promotion = 0;
    notifySystem('MV拍摄完成', 'MV品质: ' + quality + '分');
    render();
}

function promoteComeback(type) {
    if (!gameState.comeback || gameState.comeback.phase !== 'promote') return;
    var cost = { ins: 10, tiktok: 10, weverse: 15, fansign: 25 }[type];
    var moneyCost = { ins: 5000, tiktok: 5000, weverse: 8000, fansign: 20000 }[type];
    var gain = { ins: 8, tiktok: 10, weverse: 12, fansign: 20 }[type];
    if (gameState.体力 < cost) { showToast('体力不足'); return; }
    if (gameState.money < moneyCost) { showToast('金币不足'); return; }
    gameState.体力 -= cost;
    gameState.money -= moneyCost;
    gameState.comeback.promotion += gain + Math.floor(Math.random() * 5);
    gameState.fans += Math.floor(Math.random() * 200 + 50);
    if (type === 'fansign') { gameState.fans += 500; }
    gameState.comeback.daysLeft--;
    if (gameState.comeback.daysLeft <= 0) { gameState.comeback.phase = 'musicshow'; }
    triggerSilentSave();
    render();
}

function performMusicShow() {
    if (!gameState.comeback || gameState.comeback.phase !== 'musicshow') return;
    if (gameState.体力 < 25) { showToast('体力不足，打歌需要25体力'); return; }
    gameState.体力 -= 25;
    var concept = gameState.comeback.concept;
    var mvQ = gameState.comeback.mvQuality || 50;
    var promo = gameState.comeback.promotion || 0;
    var statVal = gameState.stats[concept.stat] || 50;
    var score = Math.floor(statVal * 0.3 + mvQ * 0.3 + promo * 0.2 + Math.random() * 20);
    var result = {};
    if (score >= 80) {
        result.rank = 1; result.label = '一位';
        gameState.firstPlaceCount = (gameState.firstPlaceCount || 0) + 1;
        gameState.money += 30000; gameState.fans += 2000;
        notifyNews('一位!', '恭喜在音乐节目获得一位!');
        _triggerHotsearch(gameState.player.name + '回归一位', (Math.floor(Math.random() * 15) + 15) + '万', gameState.player.name + '回归舞台斩获一位！' + concept.name + '概念大获成功！', false);
        _triggerKakaoCongrats();
    } else if (score >= 60) {
        result.rank = 2; result.label = '二位'; gameState.money += 15000; gameState.fans += 800;
    } else if (score >= 40) {
        result.rank = 3; result.label = '三位'; gameState.money += 8000; gameState.fans += 300;
    } else {
        result.rank = 0; result.label = '未入榜'; gameState.fans += 50;
    }
    result.score = score;
    gameState.comeback.musicShowResults.push(result);
    if (gameState.comeback.musicShowResults.length >= 3) {
        gameState.comeback.phase = 'done';
        var totalFirsts = 0;
        for (var i = 0; i < gameState.comeback.musicShowResults.length; i++) {
            if (gameState.comeback.musicShowResults[i].rank === 1) totalFirsts++;
        }
        gameState.comeback.totalFirsts = totalFirsts;
        if (totalFirsts >= 2) {
            notifyNews('回归大成功', '获得' + totalFirsts + '个一位!');
        }
    }
    if (typeof checkAchievements === 'function') checkAchievements();
    triggerSilentSave();
    render();
}

function renderComebackPage(container) {
    var cb = gameState.comeback;
    if (!cb) {
        container.innerHTML = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">回归计划</div><div style="width:32px;"></div></div><div class="page-content" style="text-align:center;padding-top:60px;">'
            + '<div style="font-size:48px;margin-bottom:16px;">M</div>'
            + '<div style="font-size:18px;font-weight:700;margin-bottom:8px;">准备新回归</div>'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:24px;">需要: 50体力 + 50,000金币</div>'
            + '<button class="btn btn-primary btn-lg" onclick="startComeback()">开始回归</button>'
            + '</div></div>';
        return;
    }
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">回归计划</div><div style="width:32px;"></div></div><div class="page-content">';
    
    if (cb.phase === 'concept') {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#FF8FA3,#FF6B8A);color:white;"><div style="font-size:16px;font-weight:700;">选择回归概念</div><div style="font-size:12px;opacity:0.8;margin-top:4px;">概念决定打歌加成方向</div></div>';
        for (var i = 0; i < COMEBACK_CONCEPTS.length; i++) {
            var c = COMEBACK_CONCEPTS[i];
            html += '<div class="card" data-i="' + i + '" onclick="selectComebackConcept(this.dataset.i)" style="cursor:pointer;">'
                + '<div style="display:flex;justify-content:space-between;align-items:center;">'
                + '<div><div style="font-weight:600;">' + c.name + ' (' + c.style + ')</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">' + c.desc + '</div></div>'
                + '<div style="font-size:11px;color:var(--color-primary);">MV x' + c.mvQuality + '</div>'
                + '</div></div>';
        }
    } else if (cb.phase === 'titletrack') {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#7C4DFF,#536DFE);color:white;"><div style="font-size:16px;font-weight:700;">选择主打歌</div><div style="font-size:12px;opacity:0.8;margin-top:4px;">概念: ' + cb.concept.name + '</div></div>';
        for (var i = 0; i < TITLE_TRACK_TYPES.length; i++) {
            var t = TITLE_TRACK_TYPES[i];
            var statNames = { dance: '舞蹈', vocal: '声乐', rap: '说唱', acting: '表演' };
            html += '<div class="card" data-i="' + i + '" onclick="selectTitleTrack(this.dataset.i)" style="cursor:pointer;">'
                + '<div style="font-weight:600;">' + t.name + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">' + t.genre + ' / 加成: ' + statNames[t.bestStat] + '</div></div>';
        }
    } else if (cb.phase === 'songprod') {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#FF6B8A,#FF8FA3);color:white;"><div style="font-size:16px;font-weight:700;">歌曲制作</div></div>'
            + '<div class="card"><div style="font-weight:600;margin-bottom:8px;">当前方案</div>'
            + '<div style="font-size:13px;">概念: ' + cb.concept.name + '</div>'
            + '<div style="font-size:13px;">主打歌: ' + cb.titleTrack.name + '</div></div>'
            + '<div class="card" style="text-align:center;">'
            + '<button class="btn btn-primary btn-lg" onclick="goToSongProdFromComeback()">进行歌曲制作</button></div>';
    } else if (cb.phase === 'mvselect') {
        html += '<div class="card" style="background:linear-gradient(135deg,#FF6B8A,#FF8FA3);color:white;"><div style="font-size:16px;font-weight:700;">选择歌曲拍MV</div><div style="font-size:12px;opacity:0.8;margin-top:4px;">歌曲制作完成！选择一首歌拍摄MV</div></div>';
        if (gameState.songs && gameState.songs.length > 0) {
            for (var msi = 0; msi < gameState.songs.length; msi++) {
                var ms = gameState.songs[msi];
                html += '<div class="card" style="cursor:pointer;" data-msi="' + msi + '" onclick="startMVShootFromComeback(this.dataset.msi)"><div style="font-weight:600;">' + ms.name + '</div><div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">' + ms.genre + ' | 品质: ' + ms.quality + '分</div><div style="font-size:11px;color:var(--color-primary);margin-top:4px;">点击选择拍MV</div></div>';
            }
        } else {
            html += '<div class="card" style="text-align:center;"><div style="color:var(--color-text-light);">还没有制作歌曲，请先进行歌曲制作</div><button class="btn btn-primary" style="margin-top:8px;" onclick="goToSongProdFromComeback()">去制作歌曲</button></div>';
        }
    } else if (cb.phase === 'mv') {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#FF6B8A,#FF8FA3);color:white;"><div style="font-size:16px;font-weight:700;">MV拍摄</div></div>'
            + '<div class="card" style="text-align:center;">'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:12px;">暂未拍摄MV，请进行MV拍摄</div>'
            + '<button class="btn btn-primary btn-lg" onclick="goToSongProdFromComeback()">去制作歌曲</button></div>';
    } else if (cb.phase === 'promote') {
        var daysLeft = cb.daysLeft || 14;
        var hasMV = cb.mvQuality > 0;
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#4CD964,#34C759);color:white;">'
            + '<div style="font-size:16px;font-weight:700;">宣传期</div>'
            + '<div style="font-size:12px;opacity:0.8;margin-top:4px;">剩余' + daysLeft + '天' + (hasMV ? ' | MV品质' + cb.mvQuality + '分' : ' | 暂未拍摄MV') + ' | 宣传度' + (cb.promotion || 0) + '</div></div>';
        if (!hasMV) {
            html += '<div class="card" style="text-align:center;background:#FFF3E0;">'
                + '<div style="font-size:13px;color:#FF6B00;margin-bottom:8px;">暂未拍摄MV，请进行MV拍摄</div>'
                + '<button class="btn btn-primary" onclick="goToMVSelectFromPromote()">选择歌曲拍MV</button></div>';
        }
        html += '<div class="card"><div style="font-weight:600;margin-bottom:12px;">宣传方式</div>'
            + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
            + '<div class="card" onclick="promoteComeback(\'ins\')" style="cursor:pointer;text-align:center;padding:16px;"><div style="font-weight:600;">INS宣传</div><div style="font-size:11px;color:var(--color-text-light);">10体力/5千金币</div></div>'
            + '<div class="card" onclick="promoteComeback(\'tiktok\')" style="cursor:pointer;text-align:center;padding:16px;"><div style="font-weight:600;">TikTok挑战</div><div style="font-size:11px;color:var(--color-text-light);">10体力/5千金币</div></div>'
            + '<div class="card" onclick="promoteComeback(\'weverse\')" style="cursor:pointer;text-align:center;padding:16px;"><div style="font-weight:600;">Weverse互动</div><div style="font-size:11px;color:var(--color-text-light);">15体力/8千金币</div></div>'
            + '<div class="card" onclick="promoteComeback(\'fansign\')" style="cursor:pointer;text-align:center;padding:16px;"><div style="font-weight:600;">粉丝签售会</div><div style="font-size:11px;color:var(--color-text-light);">25体力/2万金币</div></div>'
            + '</div></div>';
        if (daysLeft <= 0) {
            html += '<button class="btn btn-primary btn-lg" style="width:100%;" onclick="gameState.comeback.phase=\'musicshow\';render();">进入打歌期</button>';
        }
    } else if (cb.phase === 'musicshow') {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#FF8FA3,#FF6B8A);color:white;">'
            + '<div style="font-size:16px;font-weight:700;">打歌期</div>'
            + '<div style="font-size:12px;opacity:0.8;margin-top:4px;">进行3轮打歌 | MV品质' + (cb.mvQuality || 0) + '分</div></div>';
        var done = (cb.musicShowResults || []).length;
        for (var i = 0; i < cb.musicShowResults.length; i++) {
            var r = cb.musicShowResults[i];
            html += '<div class="card"><div style="display:flex;justify-content:space-between;">'
                + '<span style="font-weight:600;">第' + (i+1) + '轮</span>'
                + '<span style="color:' + (r.rank === 1 ? '#FFD700' : r.rank === 2 ? '#C0C0C0' : r.rank === 3 ? '#CD7F32' : 'var(--color-text-light)') + ';font-weight:700;">' + r.label + '</span></div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">得分: ' + r.score + '</div></div>';
        }
        if (done < 3) {
            html += '<button class="btn btn-primary btn-lg" style="width:100%;" onclick="performMusicShow()">第' + (done+1) + '轮打歌 (25体力)</button>';
        }
    } else if (cb.phase === 'done') {
        var totalFirsts = cb.totalFirsts || 0;
        var grade = totalFirsts >= 3 ? 'S' : totalFirsts >= 2 ? 'A' : totalFirsts >= 1 ? 'B' : 'C';
        var gradeColors = { S: '#FFD700', A: '#4CD964', B: '#5BB8E8', C: '#999' };
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,' + gradeColors[grade] + ',var(--color-primary));color:white;padding:32px;">'
            + '<div style="font-size:48px;font-weight:700;">' + grade + '</div>'
            + '<div style="font-size:14px;opacity:0.9;margin-top:4px;">回归评级</div></div>'
            + '<div class="card"><div style="font-weight:600;margin-bottom:8px;">回归总结</div>'
            + '<div style="font-size:13px;">概念: ' + cb.concept.name + '</div>'
            + '<div style="font-size:13px;">主打歌: ' + cb.titleTrack.name + '</div>'
            + '<div style="font-size:13px;">MV品质: ' + cb.mvQuality + '分</div>'
            + '<div style="font-size:13px;">一位数: ' + totalFirsts + '/3</div></div>'
            + '<button class="btn btn-primary btn-lg" style="width:100%;" onclick="gameState.comeback=null;render();">完成回归</button>';
    }
    html += '</div></div>';
    container.innerHTML = html;
}



function goToMVSelectFromPromote() {
    if (gameState.comeback) {
        gameState.comeback.phase = 'mvselect';
    }
    render();
}

// ==================== SONG PRODUCTION APP (歌曲制作) ====================

var SONG_GENRES = [
    { name: 'Pop', genre: '流行', bestStat: 'vocal', cost: 15000, energy: 10 },
    { name: 'Ballad', genre: '抒情', bestStat: 'vocal', cost: 12000, energy: 8 },
    { name: 'R&B', genre: '节奏布鲁斯', bestStat: 'vocal', cost: 18000, energy: 12 },
    { name: 'Hip-hop', genre: '嘻哈', bestStat: 'rap', cost: 15000, energy: 10 },
    { name: 'EDM', genre: '电子', bestStat: 'dance', cost: 20000, energy: 12 },
    { name: 'Rock', genre: '摇滚', bestStat: 'dance', cost: 18000, energy: 12 }
];

var SONG_CONCEPTS = [
    { name: '梦幻', style: 'dreamy', qualityBonus: 1.0 },
    { name: '暗黑', style: 'dark', qualityBonus: 1.1 },
    { name: '复古', style: 'retro', qualityBonus: 1.05 },
    { name: '赛博朋克', style: 'cyber', qualityBonus: 1.15 },
    { name: '自然', style: 'natural', qualityBonus: 0.95 },
    { name: '街舞', style: 'street', qualityBonus: 1.1 },
    { name: '抒情', style: 'lyrical', qualityBonus: 1.0 },
    { name: '可爱', style: 'cute', qualityBonus: 0.9 }
];

var SONG_NAME_PARTS_A = ['Star', 'Moon', 'Dream', 'Night', 'Heart', 'Fire', 'Ice', 'Light', 'Rain', 'Rose', 'Blue', 'Silver', 'Golden', 'Crystal', 'Velvet'];
var SONG_NAME_PARTS_B = ['light', 'shine', 'fall', 'rise', 'wave', 'dust', 'glow', 'storm', 'dance', 'song', 'sigh', 'kiss', 'call', 'dream', 'flight'];

function renderSongProdPage(container) {
    var sp = gameState.songProd;
    if (!sp) {
        container.innerHTML = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">&#8249; 首页</div><div class="page-title">歌曲制作</div><div style="width:32px;"></div></div><div class="page-content" style="text-align:center;padding-top:40px;">'
            + '<div style="font-size:16px;font-weight:700;margin-bottom:8px;">歌曲制作工作室</div>'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:24px;">创作属于你的音乐作品</div>'
            + '<button class="btn btn-primary btn-lg" onclick="startSongProduction()">开始制作</button>'
            + '</div></div>';
        return;
    }
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">&#8249; 首页</div><div class="page-title">歌曲制作</div><div style="width:32px;"></div></div><div class="page-content">';

    if (sp.step === 0) {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#7C4DFF,#536DFE);color:white;"><div style="font-size:16px;font-weight:700;">选择曲风</div><div style="font-size:12px;opacity:0.8;margin-top:4px;">不同曲风影响歌曲品质和最佳属性</div></div>';
        for (var gi = 0; gi < SONG_GENRES.length; gi++) {
            var g = SONG_GENRES[gi];
            var statNames = { dance: '舞蹈', vocal: '声乐', rap: '说唱', acting: '表演' };
            html += '<div class="card" data-gi="' + gi + '" onclick="selectSongGenre(this.dataset.gi)" style="cursor:pointer;">'
                + '<div style="display:flex;justify-content:space-between;align-items:center;">'
                + '<div><div style="font-weight:600;">' + g.name + ' (' + g.genre + ')</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">加成: ' + statNames[g.bestStat] + ' | ' + g.energy + '体力 + ' + g.cost + '金币</div></div>'
                + '</div></div>';
        }
    } else if (sp.step === 1) {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#FF6B8A,#FF8FA3);color:white;"><div style="font-size:16px;font-weight:700;">选择歌曲概念</div><div style="font-size:12px;opacity:0.8;margin-top:4px;">曲风: ' + sp.selectedGenre.name + '</div></div>';
        for (var ci = 0; ci < SONG_CONCEPTS.length; ci++) {
            var co = SONG_CONCEPTS[ci];
            html += '<div class="card" data-ci="' + ci + '" onclick="selectSongConcept(this.dataset.ci)" style="cursor:pointer;">'
                + '<div style="font-weight:600;">' + co.name + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">品质倍率: x' + co.qualityBonus + '</div></div>';
        }
    } else if (sp.step === 2) {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#4CD964,#34C759);color:white;"><div style="font-size:16px;font-weight:700;">作曲写词</div><div style="font-size:12px;opacity:0.8;margin-top:4px;">曲风: ' + sp.selectedGenre.name + ' | 概念: ' + sp.selectedConcept.name + '</div></div>';
        html += '<div class="card" style="text-align:center;">'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:12px;">需要' + sp.selectedGenre.energy + '体力 + ' + sp.selectedGenre.cost + '金币</div>'
            + '<button class="btn btn-primary btn-lg" onclick="composeSong()">开始作曲写词</button></div>';
    } else if (sp.step === 3) {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#FF9500,#FF6B00);color:white;"><div style="font-size:16px;font-weight:700;">录音</div><div style="font-size:12px;opacity:0.8;margin-top:4px;">歌名: ' + sp.songName + '</div></div>';
        html += '<div class="card" style="text-align:center;">'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:12px;">需要15体力 + 20,000金币</div>'
            + '<button class="btn btn-primary btn-lg" onclick="recordSong()">开始录音</button></div>';
    } else if (sp.step === 4) {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#5856D6,#3634A3);color:white;"><div style="font-size:16px;font-weight:700;">混音制作</div><div style="font-size:12px;opacity:0.8;margin-top:4px;">歌名: ' + sp.songName + '</div></div>';
        html += '<div class="card" style="text-align:center;">'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:12px;">需要10体力 + 15,000金币</div>'
            + '<button class="btn btn-primary btn-lg" onclick="mixSong()">开始混音</button></div>';
    } else if (sp.step === 5) {
        var song = sp.result;
        var qualityColor = song.quality >= 80 ? '#4CD964' : song.quality >= 60 ? '#FF9500' : '#FF3B30';
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,' + qualityColor + ',' + qualityColor + ');color:white;padding:24px;">'
            + '<div style="font-size:32px;font-weight:700;">' + song.quality + '</div>'
            + '<div style="font-size:14px;opacity:0.9;">歌曲品质</div></div>';
        html += '<div class="card"><div style="font-weight:600;margin-bottom:8px;">歌曲信息</div>'
            + '<div style="font-size:13px;">歌名: ' + song.name + '</div>'
            + '<div style="font-size:13px;">曲风: ' + song.genre + '</div>'
            + '<div style="font-size:13px;">概念: ' + song.concept + '</div>'
            + '<div style="font-size:13px;">品质: ' + song.quality + '分</div></div>';
        if (sp.comebackMode) {
            html += '<button class="btn btn-primary btn-lg" style="width:100%;" onclick="finishSongProdComeback()">返回回归计划</button>';
        } else {
            html += '<button class="btn btn-primary btn-lg" style="width:100%;" onclick="gameState.songProd=null;render();">完成</button>';
        }
    }

    html += '</div></div>';
    container.innerHTML = html;
}

function startSongProduction() {
    if (gameState.player.role !== 'Idol') { showToast('只有出道爱豆才能制作歌曲'); return; }
    gameState.songProd = { step: 0, comebackMode: false };
    render();
}

function selectSongGenre(idx) {
    var i = parseInt(idx);
    gameState.songProd.selectedGenre = SONG_GENRES[i];
    gameState.songProd.step = 1;
    render();
}

function selectSongConcept(idx) {
    var i = parseInt(idx);
    gameState.songProd.selectedConcept = SONG_CONCEPTS[i];
    gameState.songProd.step = 2;
    render();
}

function composeSong() {
    var sp = gameState.songProd;
    var g = sp.selectedGenre;
    if (gameState.体力 < g.energy) { showModal('体力不足', '作曲写词需要' + g.energy + '体力'); return; }
    if (gameState.money < g.cost) { showModal('资金不足', '作曲写词需要' + g.cost + '金币'); return; }
    gameState.体力 -= g.energy;
    gameState.money -= g.cost;
    var a = SONG_NAME_PARTS_A[Math.floor(Math.random() * SONG_NAME_PARTS_A.length)];
    var b = SONG_NAME_PARTS_B[Math.floor(Math.random() * SONG_NAME_PARTS_B.length)];
    sp.songName = a + b;
    sp.step = 3;
    notifySystem('作曲完成', '歌名: ' + sp.songName);
    render();
}

function recordSong() {
    if (gameState.体力 < 15) { showModal('体力不足', '录音需要15体力'); return; }
    if (gameState.money < 20000) { showModal('资金不足', '录音需要20,000金币'); return; }
    gameState.体力 -= 15;
    gameState.money -= 20000;
    gameState.songProd.step = 4;
    notifySystem('录音完成', '进入混音阶段');
    render();
}

function mixSong() {
    if (gameState.体力 < 10) { showModal('体力不足', '混音需要10体力'); return; }
    if (gameState.money < 15000) { showModal('资金不足', '混音需要15,000金币'); return; }
    gameState.体力 -= 10;
    gameState.money -= 15000;
    var sp = gameState.songProd;
    var statVal = gameState.stats[sp.selectedGenre.bestStat] || 50;
    var quality = Math.floor((statVal / 150) * 60 + Math.random() * 30 * sp.selectedConcept.qualityBonus + 10);
    quality = Math.min(100, Math.max(20, quality));
    var song = {
        name: sp.songName,
        genre: sp.selectedGenre.genre,
        concept: sp.selectedConcept.name,
        bestStat: sp.selectedGenre.bestStat,
        quality: quality
    };
    if (!gameState.songs) gameState.songs = [];
    gameState.songs.push(song);
    sp.result = song;
    sp.step = 5;
    notifySystem('歌曲制作完成', song.name + ' 品质: ' + quality + '分');
    if (typeof triggerSilentSave === 'function') triggerSilentSave();
    render();
}

function finishSongProdComeback() {
    if (gameState.comeback) {
        gameState.comeback.phase = 'mvselect';
    }
    gameState.songProd = null;
    currentPage = 'comeback';
    render();
}

// ==================== MV SHOOT PAGE (MV拍摄) ====================

var MV_SHOOT_CONCEPTS = [
    { name: '梦幻', style: 'dreamy', mvBonus: 1.0 },
    { name: '暗黑', style: 'dark', mvBonus: 1.1 },
    { name: '复古', style: 'retro', mvBonus: 1.05 },
    { name: '赛博朋克', style: 'cyber', mvBonus: 1.15 },
    { name: '自然', style: 'natural', mvBonus: 0.95 },
    { name: '街舞', style: 'street', mvBonus: 1.1 },
    { name: '剧情', style: 'story', mvBonus: 1.2 },
    { name: '可爱', style: 'cute', mvBonus: 0.9 }
];

function renderMVShootPage(container) {
    var ms = gameState.mvShoot;
    if (!ms) {
        container.innerHTML = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">&#8249; 首页</div><div class="page-title">MV拍摄</div><div style="width:32px;"></div></div><div class="page-content" style="text-align:center;padding-top:40px;">'
            + '<div style="color:var(--color-text-light);">请从歌曲列表选择拍摄MV</div></div></div>';
        return;
    }
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">&#8249; 首页</div><div class="page-title">MV拍摄</div><div style="width:32px;"></div></div><div class="page-content">';

    if (ms.step === 0) {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#FF6B8A,#FF8FA3);color:white;"><div style="font-size:16px;font-weight:700;">选择MV概念</div><div style="font-size:12px;opacity:0.8;margin-top:4px;">歌曲: ' + ms.song.name + '</div></div>';
        for (var mci = 0; mci < MV_SHOOT_CONCEPTS.length; mci++) {
            var mc = MV_SHOOT_CONCEPTS[mci];
            html += '<div class="card" data-mci="' + mci + '" onclick="selectMVConcept(this.dataset.mci)" style="cursor:pointer;">'
                + '<div style="font-weight:600;">' + mc.name + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">MV品质倍率: x' + mc.mvBonus + '</div></div>';
        }
    } else if (ms.step === 1) {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#FF9500,#FF6B00);color:white;"><div style="font-size:16px;font-weight:700;">拍摄MV</div><div style="font-size:12px;opacity:0.8;margin-top:4px;">歌曲: ' + ms.song.name + ' | 概念: ' + ms.selectedConcept.name + '</div></div>';
        html += '<div class="card" style="text-align:center;">'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:12px;">需要30体力 + 30,000金币</div>'
            + '<button class="btn btn-primary btn-lg" onclick="executeMVShoot()">开始拍摄</button></div>';
    } else if (ms.step === 2) {
        var result = ms.result;
        var qualityColor = result.quality >= 80 ? '#4CD964' : result.quality >= 60 ? '#FF9500' : '#FF3B30';
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,' + qualityColor + ',' + qualityColor + ');color:white;padding:24px;">'
            + '<div style="font-size:32px;font-weight:700;">' + result.quality + '</div>'
            + '<div style="font-size:14px;opacity:0.9;">MV品质</div></div>';
        html += '<div class="card"><div style="font-weight:600;margin-bottom:8px;">MV信息</div>'
            + '<div style="font-size:13px;">歌曲: ' + result.title + '</div>'
            + '<div style="font-size:13px;">概念: ' + result.concept + '</div>'
            + '<div style="font-size:13px;">品质: ' + result.quality + '分</div>'
            + '<div style="font-size:13px;">播放量: ' + result.views.toLocaleString() + '</div></div>';
        if (ms.comebackMode) {
            html += '<button class="btn btn-primary btn-lg" style="width:100%;" onclick="finishMVShootComeback()">返回回归计划</button>';
        } else {
            html += '<button class="btn btn-primary btn-lg" style="width:100%;" onclick="gameState.mvShoot=null;render();">完成</button>';
        }
    }

    html += '</div></div>';
    container.innerHTML = html;
}

function startMVShoot(song) {
    if (gameState.player.role !== 'Idol') { showToast('只有出道爱豆才能拍摄MV'); return; }
    var isComeback = !!(gameState.comeback && gameState.comeback.phase === 'mvselect');
    gameState.mvShoot = { step: 0, song: song, comebackMode: isComeback };
    currentPage = 'mvshoot';
    render();
}

function selectMVConcept(idx) {
    var i = parseInt(idx);
    gameState.mvShoot.selectedConcept = MV_SHOOT_CONCEPTS[i];
    gameState.mvShoot.step = 1;
    render();
}

function executeMVShoot() {
    if (gameState.体力 < 30) { showModal('体力不足', 'MV拍摄需要30体力'); return; }
    if (gameState.money < 30000) { showModal('资金不足', 'MV拍摄需要30,000金币'); return; }
    gameState.体力 -= 30;
    gameState.money -= 30000;
    var ms = gameState.mvShoot;
    var song = ms.song;
    var concept = ms.selectedConcept;
    var statVal = gameState.stats[song.bestStat] || 50;
    var quality = Math.floor((statVal / 150) * 50 + (song.quality / 100) * 30 + Math.random() * 20 * concept.mvBonus);
    quality = Math.min(100, Math.max(20, quality));
    var views = Math.floor(quality * 10000 + (gameState.fans || 0) * 5);
    var result = {
        title: song.name,
        concept: concept.name,
        quality: quality,
        views: views
    };
    if (!gameState.mvCollection) gameState.mvCollection = [];
    gameState.mvCollection.push(result);
    ms.result = result;
    ms.step = 2;
    if (ms.comebackMode && gameState.comeback) {
        gameState.comeback.mvQuality = quality;
        gameState.comeback.mvViews = views;
        gameState.comeback.mvTitle = song.name;
    }
    notifySystem('MV拍摄完成', 'MV品质: ' + quality + '分 | 播放量: ' + views.toLocaleString());
    if (typeof triggerSilentSave === 'function') triggerSilentSave();
    render();
}

function finishMVShootComeback() {
    if (gameState.comeback) {
        gameState.comeback.phase = 'promote';
        gameState.comeback.promotion = 0;
    }
    gameState.mvShoot = null;
    currentPage = 'comeback';
    render();
}

function goToSongProdFromComeback() {
    gameState.songProd = { step: 0, comebackMode: true };
    currentPage = 'songprod';
    render();
}

function startMVShootFromComeback(idx) {
    var i = parseInt(idx);
    var song = gameState.songs[i];
    if (!song) return;
    startMVShoot(song);
}

// ==================== CONTRACT SYSTEM (合约系统) ====================
function renderContractPage(container) {
    if (!gameState.contract) {
        gameState.contract = {
            company: gameState.player.company || 'SEONGWOO ENT',
            years: 7,
            signed: gameState.player.debutYear || 2026,
            revenue: { company: 70, artist: 30 },
            clauses: ['独家经纪合约', '公司负责所有行程安排', '合约期内不可转签', '违约金: 剩余年限 x 1亿韩元']
        };
    }
    var c = gameState.contract;
    var yearsLeft = Math.max(0, c.years - (new Date().getFullYear() - c.signed));
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">合约</div><div style="width:32px;"></div></div><div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,#2C2C2C,#444);color:white;">'
        + '<div style="font-size:14px;opacity:0.7;">独家经纪合约</div>'
        + '<div style="font-size:22px;font-weight:700;margin-top:8px;">' + c.company + '</div></div>'
        + '<div class="card"><div style="font-weight:600;margin-bottom:12px;">合约条款</div>'
        + '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--color-border);font-size:14px;"><span>合约年限</span><span style="font-weight:600;">' + c.years + '年</span></div>'
        + '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--color-border);font-size:14px;"><span>剩余年限</span><span style="font-weight:600;color:' + (yearsLeft <= 2 ? 'var(--color-danger)' : 'var(--color-success)') + ';">' + yearsLeft + '年</span></div>'
        + '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--color-border);font-size:14px;"><span>收益分配(公司)</span><span style="font-weight:600;">' + c.revenue.company + '%</span></div>'
        + '<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:14px;"><span>收益分配(艺人)</span><span style="font-weight:600;color:var(--color-success);">' + c.revenue.artist + '%</span></div></div>'
        + '<div class="card"><div style="font-weight:600;margin-bottom:8px;">合约条款</div>';
    for (var i = 0; i < c.clauses.length; i++) {
        html += '<div style="padding:6px 0;font-size:13px;color:var(--color-text-light);border-bottom:1px solid var(--color-border);">- ' + c.clauses[i] + '</div>';
    }
    html += '</div>';
    if (yearsLeft <= 1) {
        html += '<div class="card" style="border-left:4px solid var(--color-danger);"><div style="font-weight:600;color:var(--color-danger);">合约即将到期</div><div style="font-size:13px;color:var(--color-text-light);margin-top:4px;">可以选择续约或离开公司</div></div>'
            + '<div style="display:flex;gap:8px;margin-top:8px;">'
            + '<button class="btn btn-primary btn-lg" style="flex:1;" onclick="renewContract()">续约</button>'
            + '<button class="btn btn-secondary btn-lg" style="flex:1;" onclick="leaveCompany()">离开</button></div>';
    }
    html += '</div></div>';
    container.innerHTML = html;
}

function renewContract() {
    gameState.contract.signed = new Date().getFullYear();
    gameState.contract.revenue.artist = Math.min(50, gameState.contract.revenue.artist + 5);
    gameState.contract.revenue.company = 100 - gameState.contract.revenue.artist;
    gameState.contract.clauses.push('续约附加: 艺人分成提升至' + gameState.contract.revenue.artist + '%');
    notifySystem('合约', '续约成功'); showToast('续约成功! 分成提升至' + gameState.contract.revenue.artist + '%');
    render();
}

function leaveCompany() {
    showModal('确认离开', '离开公司将失去所有公司资源，确定吗？', function() {
        gameState.danger = Math.min(100, gameState.danger + 20);
        showToast('已离开公司，成为自由艺人');
        gameState.contract = null;
        render();
    });
}

// ==================== TEAMMATE RELATIONSHIP NETWORK (队友关系网) ====================
function renderRelationPage(container) {
    if (!gameState.teammates || gameState.teammates.length === 0) {
        if (!gameState.player.group || gameState.player.group === '') {
            container.innerHTML = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">队友关系</div><div style="width:32px;"></div></div><div class="page-content" style="text-align:center;padding-top:60px;"><div style="font-size:14px;color:var(--color-text-light);">还没有队友，出道后解锁</div></div></div>';
            return;
        }
        initTeammates();
        if (!gameState.teammates || gameState.teammates.length === 0) {
            container.innerHTML = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">队友关系</div><div style="width:32px;"></div></div><div class="page-content" style="text-align:center;padding-top:60px;"><div style="font-size:14px;color:var(--color-text-light);">队友数据加载失败，请尝试重新进入</div></div></div>';
            return;
        }
    }
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">队友关系</div><div style="width:32px;"></div></div><div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:14px;opacity:0.8;">' + gameState.player.group + '</div>'
        + '<div style="font-size:18px;font-weight:700;margin-top:4px;">队友关系网</div></div>';
    for (var i = 0; i < gameState.teammates.length; i++) {
        var t = gameState.teammates[i];
        var relColor = t.relationship >= 80 ? '#4CD964' : t.relationship >= 50 ? '#FFD700' : t.relationship >= 30 ? '#FF9500' : '#FF3B30';
        var relLabel = t.relationship >= 80 ? '亲密' : t.relationship >= 50 ? '友好' : t.relationship >= 30 ? '普通' : '冷淡';
        html += '<div class="card">'
            + '<div style="display:flex;align-items:center;gap:12px;">'
            + '<div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,' + relColor + ',' + t.color + ');display:flex;align-items:center;justify-content:center;color:white;font-weight:700;">' + t.name.charAt(0) + '</div>'
            + '<div style="flex:1;">'
            + '<div style="font-weight:600;">' + t.name + '</div>'
            + '<div style="font-size:12px;color:var(--color-text-light);">' + t.position + '</div>'
            + '<div style="width:100%;height:4px;background:var(--color-border);border-radius:2px;margin-top:6px;overflow:hidden;">'
            + '<div style="width:' + t.relationship + '%;height:100%;background:' + relColor + ';border-radius:2px;"></div></div></div>'
            + '<div style="font-size:12px;color:' + relColor + ';font-weight:600;">' + relLabel + '</div></div>'
            + '<div style="display:flex;gap:6px;margin-top:10px;">'
            + '<button class="btn btn-sm" style="flex:1;font-size:11px;padding:6px;" onclick="interactTeammate(' + i + ',\'chat\')">聊天</button>'
            + '<button class="btn btn-sm" style="flex:1;font-size:11px;padding:6px;" onclick="interactTeammate(' + i + ',\'gift\')">送礼</button>'
            + '<button class="btn btn-sm" style="flex:1;font-size:11px;padding:6px;" onclick="interactTeammate(' + i + ',\'practice\')">合练</button></div></div>';
    }
    html += '</div></div>';
    container.innerHTML = html;
}

function initTeammates() {
    if (!gameState.player.group) return;
    var group = null;
    var groupKey = null;
    var compKeys = Object.keys(COMPANIES);
    for (var ci = 0; ci < compKeys.length; ci++) {
        var comp = COMPANIES[compKeys[ci]];
        var gKeys = Object.keys(comp.groups);
        for (var gi = 0; gi < gKeys.length; gi++) {
            if (comp.groups[gKeys[gi]].name === gameState.player.group) {
                group = comp.groups[gKeys[gi]]; groupKey = gKeys[gi]; break;
            }
        }
        if (group) break;
    }
    if (!group && gameState.player.groups && gameState.player.groups.length > 0) {
        for (var ci2 = 0; ci2 < compKeys.length; ci2++) {
            var comp2 = COMPANIES[compKeys[ci2]];
            var gKeys2 = Object.keys(comp2.groups);
            for (var gi2 = 0; gi2 < gKeys2.length; gi2++) {
                for (var pi = 0; pi < gameState.player.groups.length; pi++) {
                    if (gKeys2[gi2] === gameState.player.groups[pi]) {
                        group = comp2.groups[gKeys2[gi2]]; groupKey = gKeys2[gi2]; break;
                    }
                }
                if (group) break;
            }
            if (group) break;
        }
        if (group && group.name) gameState.player.group = group.name;
    }
    if (!group) return;
    var positions = ['主唱', '主舞', 'Rapper', '门面', '领唱', '领舞'];
    var colors = ['#FF8FA3', '#7C4DFF', '#4CD964', '#FF9500', '#5BB8E8', '#FF6B8A'];
    gameState.teammates = [];
    var members = group.members || [];
    for (var i = 0; i < members.length; i++) {
        var memberName = (typeof members[i] === 'object') ? members[i].name : members[i];
        var memberPos = (typeof members[i] === 'object' && members[i].position) ? members[i].position : positions[i % positions.length];
        if (memberName === gameState.player.name) continue;
        gameState.teammates.push({
            name: memberName,
            position: memberPos,
            relationship: 40 + Math.floor(Math.random() * 30),
            color: colors[i % colors.length]
        });
    }
}

function interactTeammate(idx, type) {
    var t = gameState.teammates[idx];
    if (!t) return;
    var cost = { chat: 5, gift: 10000, practice: 15 }[type];
    var gain = { chat: 5, gift: 15, practice: 8 }[type];
    if (type === 'gift' && gameState.money < cost) { showToast('金币不足'); return; }
    if (type !== 'gift' && gameState.体力 < cost) { showToast('体力不足'); return; }
    if (type === 'gift') { gameState.money -= cost; } else { gameState.体力 -= cost; }
    t.relationship = Math.min(100, t.relationship + gain + Math.floor(Math.random() * 5));
    if (type === 'practice') {
        var keys = ['dance', 'vocal', 'rap'];
        var k = keys[Math.floor(Math.random() * keys.length)];
        gameState.stats[k] = Math.min(150, gameState.stats[k] + 2);
    }
    var labels = { chat: '聊天', gift: '送礼', practice: '合练' };
    showToast(labels[type] + '成功! 好感度+' + gain);
    triggerSilentSave();
    render();
}

// ==================== MANAGEMENT TEAM (经纪团队) ====================
function renderManagementPage(container) {
    if (!gameState.management) {
        gameState.management = {
            manager: { name: '朴正勋(Park Junghoon)', loyalty: 70, skill: 60 },
            stylist: { name: '金美妍(Kim Miyeon)', loyalty: 50, skill: 40 },
            driver: { name: '李大浩(Lee Daeho)', loyalty: 80, skill: 30 }
        };
    }
    var m = gameState.management;
    var roles = { manager: '经纪人', stylist: '造型师', driver: '司机' };
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">经纪团队</div><div style="width:32px;"></div></div><div class="page-content">';
    var keys = Object.keys(m);
    for (var i = 0; i < keys.length; i++) {
        var role = keys[i];
        var person = m[role];
        var loyaltyColor = person.loyalty >= 70 ? '#4CD964' : person.loyalty >= 40 ? '#FFD700' : '#FF3B30';
        html += '<div class="card">'
            + '<div style="font-size:12px;color:var(--color-primary);font-weight:600;">' + roles[role] + '</div>'
            + '<div style="font-weight:600;margin-top:4px;">' + person.name + '</div>'
            + '<div style="display:flex;gap:16px;margin-top:8px;">'
            + '<div style="flex:1;"><div style="font-size:11px;color:var(--color-text-light);">技能</div>'
            + '<div style="width:100%;height:4px;background:var(--color-border);border-radius:2px;margin-top:4px;overflow:hidden;"><div style="width:' + person.skill + '%;height:100%;background:#5BB8E8;border-radius:2px;"></div></div></div>'
            + '<div style="flex:1;"><div style="font-size:11px;color:var(--color-text-light);">忠诚</div>'
            + '<div style="width:100%;height:4px;background:var(--color-border);border-radius:2px;margin-top:4px;overflow:hidden;"><div style="width:' + person.loyalty + '%;height:100%;background:' + loyaltyColor + ';border-radius:2px;"></div></div></div></div>'
            + '<button class="btn btn-sm" style="margin-top:8px;font-size:11px;" data-role="' + role + '" onclick="upgradeStaff(this.dataset.role)">培训提升 (5千金币)</button></div>';
    }
    html += '</div></div>';
    container.innerHTML = html;
}

function upgradeStaff(role) {
    if (gameState.money < 5000) { showToast('金币不足'); return; }
    gameState.money -= 5000;
    var person = gameState.management[role];
    person.skill = Math.min(100, person.skill + 5 + Math.floor(Math.random() * 5));
    person.loyalty = Math.min(100, person.loyalty + 3);
    showToast(person.name + '能力提升!');
    triggerSilentSave();
    render();
}

// ==================== ANTI-BLACK SYSTEM (黑粉反黑) ====================
var ANTI_EVENTS = [
    { title: '恶意谣言', desc: '有人在论坛散布关于你的不实谣言', dangerAdd: 10, fanLoss: 200 },
    { title: '私生跟踪', desc: '疑似私生饭在宿舍附近徘徊', dangerAdd: 15, fanLoss: 100 },
    { title: '恶意对比', desc: '网络出现与同行恶意的对比帖', dangerAdd: 5, fanLoss: 150 },
    { title: '旧照泄露', desc: '有人翻出你多年前的照片断章取义', dangerAdd: 8, fanLoss: 300 },
    { title: '恶意剪辑', desc: '你的综艺片段被恶意剪辑传播', dangerAdd: 12, fanLoss: 250 }
];

function renderAntiBlackPage(container) {
    if (!gameState.antiEvents) gameState.antiEvents = [];
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">反黑中心</div><div style="width:32px;"></div></div><div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,#333,#555);color:white;">'
        + '<div style="font-size:11px;opacity:0.7;margin-bottom:4px;">危险值达到30时触发黑粉事件</div>'
        + '<div style="font-size:14px;opacity:0.8;">当前危险值</div>'
        + '<div style="font-size:32px;font-weight:700;">' + gameState.danger + '/100</div></div>';
    if (gameState.antiEvents.length === 0 && gameState.danger < 30) {
        html += '<div class="card" style="text-align:center;"><div style="color:var(--color-text-light);">暂无黑粉事件</div><div style="font-size:11px;color:var(--color-text-light);margin-top:4px;">危险值达到30时自动触发</div></div>';
    } else if (gameState.antiEvents.length === 0 && gameState.danger >= 30) {
        if(typeof triggerAntiEvent==='function') triggerAntiEvent();
    }
    for (var i = 0; i < gameState.antiEvents.length; i++) {
        var e = gameState.antiEvents[i];
        html += '<div class="card" style="border-left:4px solid var(--color-danger);">'
            + '<div style="font-weight:600;">' + e.title + '</div>'
            + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">' + e.desc + '</div>'
            + '<div style="display:flex;gap:8px;margin-top:10px;">'
            + '<button class=\"btn btn-sm btn-primary\" style=\"flex:1;font-size:11px;\" data-i=\"' + i + '\" data-action=\"statement\" onclick=\"handleAnti(parseInt(this.dataset.i),this.dataset.action)\">发声明</button>'
            + '<button class=\"btn btn-sm\" style=\"flex:1;font-size:11px;\" data-i=\"' + i + '\" data-action=\"legal\" onclick=\"handleAnti(parseInt(this.dataset.i),this.dataset.action)\">法律手段</button>'
            + '<button class=\"btn btn-sm\" style=\"flex:1;font-size:11px;\" data-i=\"' + i + '\" data-action=\"ignore\" onclick=\"handleAnti(parseInt(this.dataset.i),this.dataset.action)\">忽略</button></div></div>';
    }
    html += '</div></div>';
    container.innerHTML = html;
}

function triggerAntiEvent() {
    if (gameState.danger < 30) return;
    var event = ANTI_EVENTS[Math.floor(Math.random() * ANTI_EVENTS.length)];
    if (!gameState.antiEvents) gameState.antiEvents = [];
    gameState.antiEvents.push(event);
    gameState.danger = Math.min(100, gameState.danger + event.dangerAdd);
    gameState.fans = Math.max(0, gameState.fans - event.fanLoss);
    notifySystem('反黑警告', event.title);
    triggerSilentSave();
}

function handleAnti(idx, action) {
    var e = gameState.antiEvents[idx];
    if (!e) return;
    if (action === 'statement') {
        if (gameState.money < 10000) { showToast('发声明需要1万金币'); return; }
        gameState.money -= 10000;
        gameState.danger = Math.max(0, gameState.danger - 15);
        gameState.fans += 100;
        showToast('声明已发布，舆论好转');
    } else if (action === 'legal') {
        if (gameState.money < 50000) { showToast('法律手段需要5万金币'); return; }
        gameState.money -= 50000;
        gameState.danger = Math.max(0, gameState.danger - 25);
        showToast('已启动法律程序');
    } else {
        gameState.danger = Math.min(100, gameState.danger + 5);
        showToast('选择了忽略');
    }
    gameState.antiEvents.splice(idx, 1);
    triggerSilentSave();
    render();
}

// ==================== FAN CLUB SYSTEM (粉丝团后援会) ====================
function renderFanClubPage(container) {
    if (!gameState.fanClub) {
        gameState.fanClub = {
            name: gameState.player.group ? gameState.player.group + '后援会' : '个人后援会',
            level: 1,
            members: Math.floor(gameState.fans * 0.1),
            funds: 0,
            projects: [],
            color: '#FF8FA3'
        };
    }
    var fc = gameState.fanClub;
    if (!fc.name) fc.name = gameState.player.group ? gameState.player.group + '后援会' : '个人后援会';
    if (!fc.color) fc.color = '#FF8FA3';
    fc.members = Math.floor(gameState.fans * 0.1);
    var levelNames = ['', '初创', '成长', '活跃', '壮大', '明星', '传奇'];
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">后援会</div><div style="width:32px;"></div></div><div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,' + fc.color + ',#FF6B8A);color:white;padding:24px;">'
        + '<div style="font-size:18px;font-weight:700;">' + fc.name + '</div>'
        + '<div style="font-size:13px;opacity:0.8;margin-top:4px;">Lv.' + fc.level + ' ' + (levelNames[fc.level] || '') + '</div>'
        + '<div style="display:flex;justify-content:center;gap:20px;margin-top:10px;">'
        + '<div><div style="font-size:16px;font-weight:700;">' + (gameState.fans || 0).toLocaleString() + '</div><div style="font-size:10px;opacity:0.7;">粉丝数</div></div>'
        + '<div><div style="font-size:16px;font-weight:700;">' + fc.members.toLocaleString() + '</div><div style="font-size:10px;opacity:0.7;">会员数</div></div>'
        + '<div><div style="font-size:16px;font-weight:700;">' + fc.funds.toLocaleString() + '</div><div style="font-size:10px;opacity:0.7;">资金</div></div>'
        + '</div></div>'
        + '<div class="card"><div style="font-weight:600;margin-bottom:12px;">后援会等级</div>'
        + '<div style="width:100%;height:8px;background:var(--color-border);border-radius:4px;overflow:hidden;">'
        + '<div style="width:' + (fc.level * 20) + '%;height:100%;background:linear-gradient(90deg,' + fc.color + ',#FF6B8A);border-radius:4px;"></div></div>'
        + '<div style="font-size:11px;color:var(--color-text-light);margin-top:4px;">下一级需要' + (fc.level * 10000) + '粉丝</div></div>'
        + '<div class="card"><div style="font-weight:600;margin-bottom:12px;">应援项目</div>';
    var projects = [
        { name: '生日应援', cost: 20000, fansGain: 500, desc: '为成员生日策划应援' },
        { name: '回归应援', cost: 50000, fansGain: 1000, desc: '为回归打歌加油助威' },
        { name: '公益项目', cost: 30000, fansGain: 800, desc: '以偶像名义做公益' }
    ];
    for (var i = 0; i < projects.length; i++) {
        var p = projects[i];
        html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--color-border);">'
            + '<div><div style="font-weight:600;font-size:14px;">' + p.name + '</div>'
            + '<div style="font-size:11px;color:var(--color-text-light);">' + p.desc + '</div></div>'
            + '<button class="btn btn-sm" style="font-size:11px;" data-i="' + i + '" onclick="launchFanProject(this.dataset.i)">启动 (' + (p.cost / 10000) + '万)</button></div>';
    }
    html += '</div></div></div>';
    container.innerHTML = html;
}

function launchFanProject(idx) {
    var projects = [
        { name: '生日应援', cost: 20000, fansGain: 500 },
        { name: '回归应援', cost: 50000, fansGain: 1000 },
        { name: '公益项目', cost: 30000, fansGain: 800 }
    ];
    var p = projects[idx];
    if (gameState.money < p.cost) { showToast('金币不足'); return; }
    gameState.money -= p.cost;
    gameState.fans += p.fansGain;
    gameState.fame = Math.min(200, (gameState.fame || 30) + 5);
    gameState.fanClub.funds += Math.floor(p.cost * 0.3);
    if (gameState.fans >= gameState.fanClub.level * 10000) {
        gameState.fanClub.level = Math.min(6, gameState.fanClub.level + 1);
        showToast('后援会升级! Lv.' + gameState.fanClub.level);
    } else {
        showToast(p.name + '启动成功! +' + p.fansGain + '粉丝');
    }
    notifySystem('后援会', p.name + '已启动!');
    triggerSilentSave();
    render();
}

// ==================== MUSIC BROADCAST APP (音乐放送) ====================
function renderMusicPage(container) {
    var shows = [
        { name: 'M Countdown', channel: 'Mnet', day: '周四', time: '18:00' },
        { name: 'Music Bank', channel: 'KBS', day: '周五', time: '17:00' },
        { name: '音乐中心', channel: 'MBC', day: '周六', time: '15:30' },
        { name: '人气歌谣', channel: 'SBS', day: '周日', time: '15:40' },
        { name: 'THE SHOW', channel: 'SBS MTV', day: '周二', time: '18:00' },
        { name: 'Show Champion', channel: 'MBC Music', day: '周三', time: '18:00' }
    ];
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">音乐放送</div><div style="width:32px;"></div></div><div class="page-content">';
    if (gameState.player.role !== 'Idol') {
        html += '<div class="card" style="text-align:center;"><div style="color:var(--color-text-light);">出道后解锁音乐放送</div></div>';
    } else {
        for (var i = 0; i < shows.length; i++) {
            var s = shows[i];
            html += '<div class="card">'
                + '<div style="display:flex;justify-content:space-between;align-items:center;">'
                + '<div><div style="font-weight:600;">' + s.name + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">' + s.channel + ' | ' + s.day + ' ' + s.time + '</div></div>'
                + '<button class="btn btn-sm btn-primary" style="font-size:11px;padding:4px 12px;" data-si="' + i + '" onclick="performOnMusicShow(this.dataset.si)">出演</button></div></div>';
        }
    }
    html += '</div></div>';
    container.innerHTML = html;
}

function performOnMusicShow(idx) {
    var shows = [
        { name: 'M Countdown', channel: 'Mnet', day: '周四', time: '18:00' },
        { name: 'Music Bank', channel: 'KBS', day: '周五', time: '17:00' },
        { name: '音乐中心', channel: 'MBC', day: '周六', time: '15:30' },
        { name: '人气歌谣', channel: 'SBS', day: '周日', time: '15:40' },
        { name: 'THE SHOW', channel: 'SBS MTV', day: '周二', time: '18:00' },
        { name: 'Show Champion', channel: 'MBC Music', day: '周三', time: '18:00' }
    ];
    var show = shows[parseInt(idx)];
    if (!show) return;
    if (gameState.体力 < 20) { showToast('体力不足，需要20体力'); return; }
    // Allow Idol to perform on music shows with or without active comeback
    if (!gameState.comeback) {
        gameState.comeback = { phase: 'musicshow', musicShowResults: [], concept: null, titleTrack: null, mvQuality: 0, promotion: 0, daysLeft: 0, totalFirsts: 0 };
    }
    if (!gameState.comeback.phase) gameState.comeback.phase = 'musicshow';
    if (!gameState.comeback.musicShowResults) gameState.comeback.musicShowResults = [];
    var isMusicShowPhase = gameState.comeback.phase === 'musicshow' || gameState.comeback.phase === 'musicShow';
    gameState.体力 = Math.max(0, gameState.体力 - 20);
    var baseScore = isMusicShowPhase ? 50 : 25; var score = Math.floor(Math.random() * 30) + baseScore + Math.floor((gameState.fame || 30) / 5);
    var rank = score >= 90 ? 1 : score >= 75 ? 2 : score >= 60 ? 3 : Math.floor(Math.random() * 3) + 4;
    var result = { show: show.name, score: score, rank: rank, label: (rank === 1 ? '1位' : rank + '位') };
    gameState.comeback.musicShowResults.push(result);
    var rankText = rank === 1 ? '1位! 恭喜一位!' : rank + '位';
    showModal(show.name + ' 出演结果', '得分: ' + score + '分\n排名: ' + rankText);
    if (typeof triggerSilentSave === 'function') triggerSilentSave();
    render();
}

// ==================== MV STUDIO APP (MV工作室) ====================
function renderMVStudioPage(container) {
    if (!gameState.mvCollection) gameState.mvCollection = [];
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">MV工作室</div><div style="width:32px;"></div></div><div class="page-content">';
    if (gameState.player.role !== 'Idol') {
        html += '<div class="card" style="text-align:center;"><div style="color:var(--color-text-light);">出道后解锁MV工作室</div></div>';
    } else {
        html += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#7C4DFF,#536DFE);color:white;">'
            + '<div style="font-size:16px;font-weight:700;">MV工作室</div>'
            + '<div style="font-size:12px;opacity:0.8;margin-top:4px;">创作和拍摄你的MV</div></div>';
        html += '<div class="card" style="text-align:center;">'
            + '<button class="btn btn-primary" style="margin-bottom:12px;" onclick="createMV()">创作MV</button>'
            + '<div style="font-size:12px;color:var(--color-text-light);">创作MV需要30体力 + 3万金币</div></div>';
        if (gameState.mvCollection.length === 0) {
            html += '<div class="card" style="text-align:center;"><div style="color:var(--color-text-light);">还没有拍摄过MV</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">点击上方按钮创作你的第一支MV</div></div>';
        }
        for (var i = 0; i < gameState.mvCollection.length; i++) {
            var mv = gameState.mvCollection[i];
            html += '<div class="card">'
                + '<div style="font-weight:600;">' + mv.title + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">' + mv.concept + ' | 品质: ' + mv.quality + '分</div>'
                + '<div style="font-size:12px;color:var(--color-primary);margin-top:2px;">' + mv.views.toLocaleString() + ' 次播放</div></div>';
        }
    }
    html += '</div></div>';
    container.innerHTML = html;
}

function createMV() {
    if (gameState.体力 < 30) { showToast('体力不足，需要30体力'); return; }
    if (gameState.money < 30000) { showToast('金币不足，需要3万金币'); return; }
    var concepts = ['梦幻', '暗黑', '复古', '赛博朋克', '自然', '街舞', '抒情', '可爱'];
    var concept = concepts[Math.floor(Math.random() * concepts.length)];
    var titles = ['Starlight', 'Midnight', 'Dreamer', 'Gravity', 'Eclipse', 'Phoenix', 'Aurora', 'Velvet'];
    var title = titles[Math.floor(Math.random() * titles.length)] + ' MV';
    var quality = Math.floor(Math.random() * 40) + 40 + Math.floor((gameState.fame || 30) / 10);
    quality = Math.min(100, quality);
    gameState.体力 = Math.max(0, gameState.体力 - 30);
    gameState.money -= 30000;
    if (!gameState.mvCollection) gameState.mvCollection = [];
    gameState.mvCollection.push({
        title: title,
        concept: concept,
        quality: quality,
        views: Math.floor(Math.random() * 500000) + 100000,
        date: new Date().toLocaleDateString()
    });
    gameState.fame = Math.min(200, (gameState.fame || 30) + 5);
    showToast('MV创作完成! 品质: ' + quality + '分');
    if (typeof triggerSilentSave === 'function') triggerSilentSave();
    render();
}

// ==================== PR OFFICE APP (公关室) ====================
function renderPROfficePage(container) {
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">公关室</div><div style="width:32px;"></div></div><div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,#2C2C2C,#444);color:white;">'
        + '<div style="font-size:16px;font-weight:700;">公关管理</div>'
        + '<div style="font-size:12px;opacity:0.8;margin-top:4px;">形象管理与危机公关</div></div>'
        + '<div class="card"><div style="font-weight:600;margin-bottom:12px;">当前形象</div>'
        + '<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;"><span>危险值</span><span style="color:' + (gameState.danger > 60 ? 'var(--color-danger)' : 'var(--color-success)') + ';font-weight:600;">' + gameState.danger + '/100</span></div>'
        + '<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;"><span>名声</span><span style="color:var(--color-success);font-weight:600;">' + (gameState.fame || 30) + '</span></div></div>'
        + '<div class="card"><div style="font-weight:600;margin-bottom:12px;">公关手段</div>'
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
        + '<div class="card" onclick="prAction(\'charity\')" style="cursor:pointer;text-align:center;padding:12px;"><div style="font-weight:600;font-size:13px;">慈善活动</div><div style="font-size:11px;color:var(--color-text-light);">-10危险/3万金币</div></div>'
        + '<div class="card" onclick="prAction(\'interview\')" style="cursor:pointer;text-align:center;padding:12px;"><div style="font-weight:600;font-size:13px;">专访</div><div style="font-size:11px;color:var(--color-text-light);">+5名声/1万金币</div></div>'
        + '<div class="card" onclick="prAction(\'apology\')" style="cursor:pointer;text-align:center;padding:12px;"><div style="font-weight:600;font-size:13px;">道歉声明</div><div style="font-size:11px;color:var(--color-text-light);">-20危险/免费</div></div>'
        + '<div class="card" onclick="prAction(\'solo\')" style="cursor:pointer;text-align:center;padding:12px;"><div style="font-weight:600;font-size:13px;">Solo企划</div><div style="font-size:11px;color:var(--color-text-light);">+10名声/5万金币</div></div>'
        + '</div></div></div></div>';
    container.innerHTML = html;
}

var _prActionCooldown = false;
function prAction(type) {
    if (_prActionCooldown) return;
    _prActionCooldown = true;
    setTimeout(function() { _prActionCooldown = false; }, 1000);
    if (type === 'charity') {
        if (gameState.money < 30000) { showToast('金币不足'); return; }
        gameState.money -= 30000; gameState.danger = Math.max(0, gameState.danger - 10);
        showToast('慈善活动完成，危险值-10');
    } else if (type === 'interview') {
        if (gameState.money < 10000) { showToast('金币不足'); return; }
        gameState.money -= 10000; gameState.fame = Math.min(200, (gameState.fame || 30) + 5);
        showToast('专访完成，名声+5');
    } else if (type === 'apology') {
        gameState.danger = Math.max(0, gameState.danger - 20); gameState.fans = Math.max(0, gameState.fans - 100);
        showToast('已发布道歉声明');
    } else if (type === 'solo') {
        if (gameState.money < 50000) { showToast('金币不足'); return; }
        gameState.money -= 50000; gameState.fame = Math.min(200, (gameState.fame || 30) + 10); gameState.fans += 500;
        showToast('Solo企划启动，名声+10');
    }
    triggerSilentSave();
    render();
}

// ==================== KPOP WIKI APP (Kpop百科) ====================

// ==================== REAL KPOP GROUPS DATA (真实韩团数据) ====================
var REAL_KPOP_GROUPS = [
    {
        name: 'BTS',
        company: 'HYBE (Big Hit)',
        debutYear: 2013,
        members: ['RM', 'Jin', 'SUGA', 'j-hope', 'Jimin', 'V', 'Jung Kook'],
        songs: ['Dynamite', 'Butter', 'Spring Day', 'Boy With Luv', 'DNA'],
        desc: '\u9632\u5f39\u5c11\u5e74\u56e2\uff0c\u5168\u7403\u6700\u5177\u5f71\u54cd\u529b\u7684Kpop\u56e2\u4f53\u4e4b\u4e00'
    },
    {
        name: 'BLACKPINK',
        company: 'YG Entertainment',
        debutYear: 2016,
        members: ['Jisoo', 'Jennie', 'Ros\u00e9', 'Lisa'],
        songs: ['DDU-DU DDU-DU', 'Kill This Love', 'How You Like That', 'Pink Venom', 'Shut Down'],
        desc: '\u4eba\u6c14\u5973\u56e2\uff0cGirl Crush\u98ce\u683c\u4ee3\u8868\uff0c\u5168\u7403\u7c89\u4e1d\u6570\u4ee5\u4ebf\u8ba1'
    },
    {
        name: 'TWICE',
        company: 'JYP Entertainment',
        debutYear: 2015,
        members: ['Nayeon', 'Jeongyeon', 'Momo', 'Sana', 'Jihyo', 'Mina', 'Dahyun', 'Chaeyoung', 'Tzuyu'],
        songs: ['TT', 'Cheer Up', 'Fancy', 'Feel Special', 'The Feels'],
        desc: '\u56fd\u6c11\u5973\u56e2\uff0c\u6d3b\u6cfc\u53ef\u7231\u98ce\u683c\u4ee3\u8868\uff0c\u65e5\u97e9\u53cc\u6599\u738b\u56e2'
    },
    {
        name: 'EXO',
        company: 'SM Entertainment',
        debutYear: 2012,
        members: ['Xiumin', 'Suho', 'Lay', 'Baekhyun', 'Chen', 'Chanyeol', 'D.O.', 'Kai', 'Sehun'],
        songs: ['Growl', 'Monster', 'Call Me Baby', 'Love Shot', 'Overdose'],
        desc: '\u6781\u5149\u7537\u56e2\uff0cSM\u65d7\u4e0b\u9876\u7ea7\u7537\u56e2\uff0c\u5f00\u521b\u5206\u961f\u4f53\u7cfb\u5148\u6cb3'
    },
    {
        name: 'SEVENTEEN',
        company: 'HYBE (Pledis)',
        debutYear: 2015,
        members: ['S.Coups', 'Jeonghan', 'Joshua', 'Jun', 'Hoshi', 'Wonwoo', 'Woozi', 'DK', 'Mingyu', 'The8', 'Seungkwan', 'Vernon', 'Dino'],
        songs: ['Don\'t Wanna Cry', 'Very Nice', 'Super', 'God of Music', 'HOT'],
        desc: '\u81ea\u4f5c\u7231\u8c46\u56e2\uff0c13\u4eba\u5927\u56e2\u4f53\uff0c\u4e09\u4e2a\u5c0f\u5206\u961f\u5404\u5177\u7279\u8272'
    },
    {
        name: 'Stray Kids',
        company: 'HYBE (JYP)',
        debutYear: 2018,
        members: ['Bang Chan', 'Lee Know', 'Changbin', 'Hyunjin', 'Han', 'Felix', 'Seungmin', 'I.N'],
        songs: ['God\'s Menu', 'Back Door', 'MANIAC', 'CASE 143', 'LALALALA'],
        desc: '\u81ea\u4f5c\u5b9e\u529b\u6d3e\u7537\u56e2\uff0c\u97f3\u4e50\u98ce\u683c\u72ec\u7279\u524d\u536b'
    },
    {
        name: 'aespa',
        company: 'SM Entertainment',
        debutYear: 2020,
        members: ['Karina', 'Giselle', 'Winter', 'Ningning'],
        songs: ['Next Level', 'Savage', 'Girls', 'Supernova', 'Whip lash'],
        desc: '\u5143\u5b87\u5b99\u6982\u5ff5\u5973\u56e2\uff0cSM\u65b0\u4e00\u4ee3\u9876\u7ea7\u5973\u56e2'
    },
    {
        name: '(G)I-DLE',
        company: 'Cube Entertainment',
        debutYear: 2018,
        members: ['Miyeon', 'Minnie', 'Soyeon', 'Yuqi', 'Shuhua'],
        songs: ['TOMBOY', 'Nxde', 'Queencard', 'Super Lady', 'Fate'],
        desc: '\u81ea\u4f5c\u5973\u56e2\uff0c\u8bd7\u7433\u9886\u8854\u5236\u4f5c\uff0c\u6982\u5ff5\u5148\u950b\u98ce\u683c\u72ec\u7279'
    },
    {
        name: 'IVE',
        company: 'Starship Entertainment',
        debutYear: 2021,
        members: ['Yujin', 'Gaeul', 'Rei', 'Wonyoung', 'Liz', 'Leeseo'],
        songs: ['ELEVEN', 'LOVE DIVE', 'After LIKE', 'Kitsch', 'Either Way'],
        desc: '\u65b0\u4e16\u4ee3\u4eba\u6c14\u5973\u56e2\uff0c\u51fa\u9053\u5373\u5dc5\u5cf0\u7684\u5947\u8ff9\u56e2\u4f53'
    },
    {
        name: 'NewJeans',
        company: 'HYBE (ADOR)',
        debutYear: 2022,
        members: ['Minji', 'Hanni', 'Danielle', 'Haerin', 'Hyein'],
        songs: ['Attention', 'Hype Boy', 'Ditto', 'Super Shy', 'OMG'],
        desc: '\u5168\u7403\u73b0\u8c61\u7ea7\u65b0\u4eba\u5973\u56e2\uff0cY2K\u590d\u53e4\u98ce\u683c\u4ee3\u8868'
    }
];

function renderKpopWikiPage(container) {
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">Kpop百科</div><div style="width:32px;"></div></div><div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,#5BB8E8,#4A90D9);color:white;">'
        + '<div style="font-size:16px;font-weight:700;">Kpop百科</div>'
        + '<div style="font-size:12px;opacity:0.8;margin-top:4px;">韩国偶像知识大全</div></div>';
    var compKeys = Object.keys(COMPANIES);
    for (var ci = 0; ci < compKeys.length; ci++) {
        var company = COMPANIES[compKeys[ci]];
        var gKeys = Object.keys(company.groups);
        var totalMembers = 0;
        for (var ti = 0; ti < gKeys.length; ti++) { totalMembers += company.groups[gKeys[ti]].members.length; }
        html += '<div class="card" style="cursor:pointer;" onclick="toggleWikiCompany(this)">'
            + '<div style="display:flex;justify-content:space-between;align-items:center;">'
            + '<div style="flex:1;min-width:0;"><div style="font-weight:700;font-size:15px;color:var(--color-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + company.name + '</div>'
            + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">' + gKeys.length + '个团体 / ' + totalMembers + '名成员</div></div>'
            + '<div style="font-size:18px;color:var(--color-text-light);transition:transform 0.3s;flex-shrink:0;margin-left:8px;">+</div></div>'
            + '<div class="wiki-groups" style="display:none;margin-top:12px;overflow:hidden;">';
        for (var gi = 0; gi < gKeys.length; gi++) {
            var g = company.groups[gKeys[gi]];
            html += '<div style="padding:10px 0;border-bottom:1px solid var(--color-border);line-height:1.6;">'
                + '<div style="font-weight:600;font-size:13px;word-break:break-all;max-width:100%;box-sizing:border-box;padding-right:8px;line-height:1.4;">' + g.name + '</div>'
                + '<div style="font-size:11px;color:var(--color-text-light);line-height:1.4;margin-top:2px;word-break:break-all;">' + g.desc + '</div>'
                + '<div style="font-size:11px;color:var(--color-text-light);margin-top:2px;line-height:1.4;">成员: ' + g.members.length + '人</div></div>';
        }
        html += '</div></div>';
    }
        html += '<div class="section-title" style="margin-top:20px;">\u771f\u5b9e\u97e9\u56e2\u767e\u79d1</div>';
    for (var ri = 0; ri < REAL_KPOP_GROUPS.length; ri++) {
        var rg = REAL_KPOP_GROUPS[ri];
        html += '<div class="card" style="cursor:pointer;margin-bottom:8px;" onclick="toggleWikiRealGroup(this)">'
            + '<div style="display:flex;justify-content:space-between;align-items:center;">'
            + '<div style="flex:1;min-width:0;">'
            + '<div style="font-weight:700;font-size:15px;color:var(--color-primary);">' + rg.name + '</div>'
            + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">' + rg.company + ' | ' + rg.debutYear + '\u5e74\u51fa\u9053</div>'
            + '</div>'
            + '<div style="font-size:18px;color:var(--color-text-light);transition:transform 0.3s;flex-shrink:0;margin-left:8px;">+</div></div>'
            + '<div class="wiki-groups" style="display:none;margin-top:12px;">'
            + '<div style="font-size:12px;color:var(--color-text-light);margin-bottom:6px;">' + rg.desc + '</div>'
            + '<div style="font-size:12px;margin-bottom:6px;"><span style="color:var(--color-text-light);">\u6210\u5458:</span> ' + rg.members.join(', ') + '</div>'
            + '<div style="font-size:12px;"><span style="color:var(--color-text-light);">\u4ee3\u8868\u66f2:</span> ' + rg.songs.join(', ') + '</div>'
            + '</div></div>';
    }
html += '</div></div>';
    container.innerHTML = html;
}
function toggleWikiCompany(el) {
    var groupsDiv = el.querySelector('.wiki-groups');
    var arrow = el.querySelector('div:last-child > div:last-child');
    if (groupsDiv.style.display === 'none') {
        groupsDiv.style.display = 'block';
        if (arrow) arrow.style.transform = 'rotate(45deg)';
    } else {
        groupsDiv.style.display = 'none';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
}

function toggleWikiRealGroup(el) {
    var groupsDiv = el.querySelector('.wiki-groups');
    var arrow = el.querySelector('div:last-child > div:last-child');
    if (groupsDiv.style.display === 'none') {
        groupsDiv.style.display = 'block';
        if (arrow) arrow.style.transform = 'rotate(45deg)';
    } else {
        groupsDiv.style.display = 'none';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
}



// ==================== COMPANY DETAIL PAGE (公司详情) ====================
function renderCompanyDetailPage(container) {
    var companyKey = gameState.player.company;
    if (!companyKey) {
        container.innerHTML = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">我的公司</div><div style="width:32px;"></div></div><div class="page-content" style="text-align:center;padding-top:60px;"><div style="color:var(--color-text-light);">尚未加入公司</div></div></div>';
        return;
    }
    var company = COMPANIES[companyKey];
    if (!company) { container.innerHTML = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">我的公司</div><div style="width:32px;"></div></div><div class="page-content"><div class="card">公司数据加载中</div></div></div>'; return; }
    
    var companyColors = {
        'SM Entertainment': '#FF6B6B',
        'YG Entertainment': '#333333',
        'JYP Entertainment': '#4A90D9',
        'HYBE': '#7C4DFF',
        'SEONGWOO ENT': '#FF8FA3'
    };
    var color = companyColors[companyKey] || '#FF8FA3';
    
    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">我的公司</div><div style="width:32px;"></div></div><div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,' + color + ',' + color + 'aa);color:white;padding:24px;">'
        + '<div style="font-size:20px;font-weight:700;">' + company.name + '</div>'
        + '<div style="font-size:12px;opacity:0.8;margin-top:8px;line-height:1.5;">' + company.desc + '</div>'
        + '<div style="display:flex;justify-content:center;gap:8px;margin-top:12px;">';
    for (var ti = 0; ti < (company.tags || []).length; ti++) {
        html += '<span style="background:rgba(255,255,255,0.2);padding:3px 10px;border-radius:12px;font-size:11px;">' + company.tags[ti] + '</span>';
    }
    html += '</div></div>'
        + '<div class="card"><div style="font-weight:600;margin-bottom:12px;">旗下团体</div>';
    
    var groupKeys = Object.keys(company.groups);
    for (var gi = 0; gi < groupKeys.length; gi++) {
        var g = company.groups[groupKeys[gi]];
        var isMyGroup = (gameState.player.group === g.name);
        html += '<div style="padding:10px 0;border-bottom:1px solid var(--color-border);cursor:pointer;' + (isMyGroup ? 'background:rgba(255,143,163,0.08);margin:0 -16px;padding:10px 16px;' : '') + '" onclick="showGroupDetail(\'' + groupKeys[gi] + '\',\'' + companyKey + '\')">'
            + '<div style="display:flex;justify-content:space-between;align-items:center;">'
            + '<div><div style="font-weight:600;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px;">' + g.name + (isMyGroup ? ' <span style="font-size:11px;color:var(--color-primary);">我的团</span>' : '') + '</div>'
            + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">' + g.desc + '</div></div>'
            + '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:12px;color:var(--color-text-light);">' + g.members.length + '人</span><span style="font-size:14px;color:var(--color-text-light);">›</span></div></div></div>';
    }
    html += '</div>'
        + '<div class="card"><div style="font-weight:600;margin-bottom:12px;">公司资源</div>'
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
        + '<div style="text-align:center;padding:12px;border-radius:12px;background:rgba(255,143,163,0.08);"><div style="font-size:18px;font-weight:700;color:var(--color-primary);">' + groupKeys.length + '</div><div style="font-size:11px;color:var(--color-text-light);">团体数</div></div>'
        + '<div style="text-align:center;padding:12px;border-radius:12px;background:rgba(92,216,100,0.08);"><div style="font-size:18px;font-weight:700;color:#4CD964;">' + (gameState.fame || 30) + '</div><div style="font-size:11px;color:var(--color-text-light);">公司声望</div></div></div></div>';
    
    html += '</div></div>';
    container.innerHTML = html;
}

function showGroupDetail(groupKey, companyKey) {
    var company = COMPANIES[companyKey];
    if (!company || !company.groups[groupKey]) { showToast('团体信息不存在'); return; }
    var g = company.groups[groupKey];
    var isMyGroup = (gameState.player.group === g.name);
    var html = '<div class="page active"><div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'company\')">‹ 返回</div>'
        + '<div class="page-title">团体详情</div>'
        + '<div style="width:32px;"></div></div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,#FF8FA3,#FF6B8A);color:white;padding:24px;">'
        + '<div style="font-size:18px;font-weight:700;">' + g.name + '</div>'
        + '<div style="font-size:12px;opacity:0.8;margin-top:6px;">' + g.desc + '</div>'
        + '<div style="display:inline-block;margin-top:8px;background:rgba(255,255,255,0.2);padding:3px 10px;border-radius:12px;font-size:11px;">等级: ' + (g.tier || 'B') + '</div>'
        + (isMyGroup ? '<div style="margin-top:8px;font-size:12px;background:rgba(255,255,255,0.3);display:inline-block;padding:3px 10px;border-radius:12px;">我的团</div>' : '')
        + '</div>'
        + '<div class="card"><div style="font-weight:600;margin-bottom:12px;">成员列表 (' + g.members.length + '人)</div>';
    for (var mi = 0; mi < g.members.length; mi++) {
        var member = g.members[mi];
        var memberName = (typeof member === 'object') ? member.name : member;
        var memberPosition = (typeof member === 'object' && member.position) ? member.position : '';
        var isMe = (memberName === gameState.player.name);
        html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--color-border);">'
            + '<div style="display:flex;align-items:center;gap:10px;">'
            + '<div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#FF8FA3,#FF6B8A);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:12px;">' + memberName.charAt(0) + '</div>'
            + '<div><div style="font-weight:600;font-size:13px;">' + memberName + (isMe ? ' <span style="font-size:10px;color:var(--color-primary);">我</span>' : '') + '</div>'
            + '<div style="font-size:11px;color:var(--color-text-light);">' + memberPosition + '</div></div></div></div>';
    }
    html += '</div></div></div>';
    var app = document.getElementById('app');
    if (app) app.innerHTML = html;
}


// ==================== WEEKLY/MONTHLY EXAM SYSTEM (周考月考系统) ====================
function _ensureWeeklyMonthlyExam() {
    if (!gameState.weeklyExam) {
        gameState.weeklyExam = { lastWeek: '', attended: false, score: 0 };
    }
    if (!gameState.monthlyExam) {
        gameState.monthlyExam = { lastMonth: '', attended: false, score: 0 };
    }
}

function _getWeekId() {
    var d = new Date();
    var onejan = new Date(d.getFullYear(), 0, 1);
    var week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return d.getFullYear() + 'W' + week;
}

function _getMonthId() {
    var d = new Date();
    return d.getFullYear() + 'M' + (d.getMonth() + 1);
}

function _isWeeklyExamTime() {
    var d = new Date();
    var day = d.getDay();
    var hour = d.getHours();
    return day === 3 && hour >= 12 && hour < 20;
}

function _isMonthlyExamTime() {
    var d = new Date();
    var date = d.getDate();
    var hour = d.getHours();
    return date === 15 && hour >= 12 && hour < 20;
}

function _checkWeeklyMonthlyExamPenalty() {
    _ensureWeeklyMonthlyExam();
    var currentWeek = _getWeekId();
    var currentMonth = _getMonthId();
    var changed = false;
    if (gameState.weeklyExam.lastWeek !== '' && gameState.weeklyExam.lastWeek !== currentWeek && !gameState.weeklyExam.attended) {
        var statKeys = Object.keys(gameState.stats);
        var rndStat = statKeys[Math.floor(Math.random() * statKeys.length)];
        gameState.stats[rndStat] = Math.max(0, gameState.stats[rndStat] - 5);
        gameState.credit = Math.max(0, (gameState.credit || 50) - 10);
        showToast('\u5468\u8003\u7f3a\u5e2d\uff01' + rndStat + '-5 \u4fe1\u8a89-10');
        changed = true;
    }
    if (gameState.monthlyExam.lastMonth !== '' && gameState.monthlyExam.lastMonth !== currentMonth && !gameState.monthlyExam.attended) {
        var statKeys2 = Object.keys(gameState.stats);
        for (var i = 0; i < statKeys2.length; i++) {
            gameState.stats[statKeys2[i]] = Math.max(0, gameState.stats[statKeys2[i]] - 3);
        }
        gameState.credit = Math.max(0, (gameState.credit || 50) - 15);
        showToast('\u6708\u8003\u7f3a\u5e2d\uff01\u5168\u90e8\u80fd\u529b-3 \u4fe1\u8a89-15');
        changed = true;
    }
    if (changed) triggerSilentSave();
    if (gameState.weeklyExam.lastWeek !== currentWeek) {
        gameState.weeklyExam.lastWeek = currentWeek;
        gameState.weeklyExam.attended = false;
        gameState.weeklyExam.score = 0;
    }
    if (gameState.monthlyExam.lastMonth !== currentMonth) {
        gameState.monthlyExam.lastMonth = currentMonth;
        gameState.monthlyExam.attended = false;
        gameState.monthlyExam.score = 0;
    }
}

function takeWeeklyExam() {
    _ensureWeeklyMonthlyExam();
    if (gameState.weeklyExam.attended) { showToast('\u672c\u5468\u5df2\u53c2\u52a0\u8fc7\u5468\u8003'); return; }
    if (!_isWeeklyExamTime()) { showToast('\u5468\u8003\u4ec5\u5728\u5468\u4e0912:00-20:00\u5f00\u653e'); return; }
    if (gameState.体力 < 20) { showToast('\u4f53\u529b\u4e0d\u8db3\uff0c\u9700\u898120\u4f53\u529b'); return; }
    gameState.体力 -= 20;
    var statKeys = Object.keys(gameState.stats);
    var testedStat = statKeys[Math.floor(Math.random() * statKeys.length)];
    var statVal = gameState.stats[testedStat];
    var score = Math.floor(statVal * 0.5 + Math.random() * 30 + 20);
    score = Math.min(100, Math.max(0, score));
    gameState.weeklyExam.attended = true;
    gameState.weeklyExam.score = score;
    var grade = score >= 90 ? 'S' : score >= 75 ? 'A' : score >= 60 ? 'B' : 'C';
    var moneyReward = grade === 'S' ? 3000 : grade === 'A' ? 2000 : grade === 'B' ? 1000 : 500;
    var creditBonus = grade === 'S' ? 8 : grade === 'A' ? 5 : grade === 'B' ? 3 : 0;
    gameState.money += moneyReward;
    gameState.credit = Math.min(150, (gameState.credit || 50) + creditBonus);
    var statNames = { dance: '\u821e\u8e48', vocal: '\u58f0\u4e50', rap: '\u8bf4\u5531', acting: '\u8868\u6f14', variety: '\u7efc\u827a' };
    var resultHtml = '<div style="text-align:center;">'
        + '<div style="font-size:36px;font-weight:800;color:' + (grade === 'S' ? '#FFD700' : grade === 'A' ? '#4CD964' : grade === 'B' ? '#5BB8E8' : '#999') + ';">' + grade + '</div>'
        + '<div style="font-size:14px;color:var(--color-text-light);margin-top:8px;">\u5468\u8003\u6210\u7ee9</div>'
        + '<div style="font-size:24px;font-weight:700;margin-top:8px;">' + score + '\u5206</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">\u8003\u6838\u79d1\u76ee: ' + (statNames[testedStat] || testedStat) + '</div>'
        + '<div style="margin-top:12px;font-size:13px;">\u5956\u52b1: +' + moneyReward + '\u91d1\u5e01' + (creditBonus > 0 ? ' \u4fe1\u8a89+' + creditBonus : '') + '</div>'
        + '</div>';
    showModal('\u5468\u8003\u7ed3\u679c', resultHtml);
    triggerSilentSave();
}

function takeMonthlyExam() {
    _ensureWeeklyMonthlyExam();
    if (gameState.monthlyExam.attended) { showToast('\u672c\u6708\u5df2\u53c2\u52a0\u8fc7\u6708\u8003'); return; }
    if (!_isMonthlyExamTime()) { showToast('\u6708\u8003\u4ec5\u5728\u6bcf\u670815\u53f712:00-20:00\u5f00\u653e'); return; }
    if (gameState.体力 < 30) { showToast('\u4f53\u529b\u4e0d\u8db3\uff0c\u9700\u898130\u4f53\u529b'); return; }
    gameState.体力 -= 30;
    var statKeys = Object.keys(gameState.stats);
    var totalScore = 0;
    for (var i = 0; i < statKeys.length; i++) {
        totalScore += Math.floor(gameState.stats[statKeys[i]] * 0.4 + Math.random() * 20 + 10);
    }
    var avgScore = Math.floor(totalScore / statKeys.length);
    avgScore = Math.min(100, Math.max(0, avgScore));
    gameState.monthlyExam.attended = true;
    gameState.monthlyExam.score = avgScore;
    var grade = avgScore >= 90 ? 'S' : avgScore >= 75 ? 'A' : avgScore >= 60 ? 'B' : 'C';
    var moneyReward = grade === 'S' ? 8000 : grade === 'A' ? 5000 : grade === 'B' ? 3000 : 1000;
    var creditBonus = grade === 'S' ? 15 : grade === 'A' ? 10 : grade === 'B' ? 5 : 0;
    gameState.money += moneyReward;
    gameState.credit = Math.min(150, (gameState.credit || 50) + creditBonus);
    var resultHtml = '<div style="text-align:center;">'
        + '<div style="font-size:36px;font-weight:800;color:' + (grade === 'S' ? '#FFD700' : grade === 'A' ? '#4CD964' : grade === 'B' ? '#5BB8E8' : '#999') + ';">' + grade + '</div>'
        + '<div style="font-size:14px;color:var(--color-text-light);margin-top:8px;">\u6708\u8003\u6210\u7ee9</div>'
        + '<div style="font-size:24px;font-weight:700;margin-top:8px;">' + avgScore + '\u5206</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">\u4e94\u79d1\u7efc\u5408\u8003\u6838</div>'
        + '<div style="margin-top:12px;font-size:13px;">\u5956\u52b1: +' + moneyReward + '\u91d1\u5e01' + (creditBonus > 0 ? ' \u4fe1\u8a89+' + creditBonus : '') + '</div>'
        + '</div>';
    showModal('\u6708\u8003\u7ed3\u679c', resultHtml);
    triggerSilentSave();
}

function renderWeeklyMonthlyExamSection() {
    _ensureWeeklyMonthlyExam();
    _checkWeeklyMonthlyExamPenalty();
    var html = '';
    var isWeeklyTime = _isWeeklyExamTime();
    var isMonthlyTime = _isMonthlyExamTime();
    var weeklyDone = gameState.weeklyExam.attended;
    var monthlyDone = gameState.monthlyExam.attended;
    html += '<div class="section-title" style="margin-top:16px;">\u5468\u8003/\u6708\u8003</div>';
    html += '<div class="card" style="border-left:4px solid ' + (weeklyDone ? 'var(--color-success)' : isWeeklyTime ? '#FFD700' : 'var(--color-border)') + ';">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;">'
        + '<div>'
        + '<div style="font-weight:600;">\u5468\u8003</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">\u5468\u4e09 12:00-20:00 | 20\u4f53\u529b</div>'
        + '</div>'
        + '<div>'
        + (weeklyDone ? '<span style="color:var(--color-success);font-weight:600;font-size:13px;">\u2605 ' + gameState.weeklyExam.score + '\u5206</span>'
           : isWeeklyTime ? '<button class="btn btn-sm btn-primary" onclick="takeWeeklyExam()">\u53c2\u52a0\u5468\u8003</button>'
           : '<span style="font-size:12px;color:var(--color-text-light);">\u672a\u5f00\u653e</span>')
        + '</div></div></div>';
    html += '<div class="card" style="margin-top:8px;border-left:4px solid ' + (monthlyDone ? 'var(--color-success)' : isMonthlyTime ? '#FFD700' : 'var(--color-border)') + ';">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;">'
        + '<div>'
        + '<div style="font-weight:600;">\u6708\u8003</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">\u6bcf\u670815\u53f7 12:00-20:00 | 30\u4f53\u529b</div>'
        + '</div>'
        + '<div>'
        + (monthlyDone ? '<span style="color:var(--color-success);font-weight:600;font-size:13px;">\u2605 ' + gameState.monthlyExam.score + '\u5206</span>'
           : isMonthlyTime ? '<button class="btn btn-sm btn-primary" onclick="takeMonthlyExam()">\u53c2\u52a0\u6708\u8003</button>'
           : '<span style="font-size:12px;color:var(--color-text-light);">\u672a\u5f00\u653e</span>')
        + '</div></div></div>';
    html += '<div style="font-size:11px;color:var(--color-text-light);margin-top:8px;line-height:1.5;">\u8d85\u65f6\u672a\u53c2\u52a0\u5c06\u6263\u9664\u80fd\u529b\u548c\u4fe1\u8a89\uff0c\u8bf7\u53ca\u65f6\u53c2\u52a0\uff01</div>';
    // Random inspection section
    if (!gameState.randomInspection) gameState.randomInspection = { lastDay: '', done: false, passed: false };
    var todayStr = new Date().toDateString();
    if (gameState.randomInspection.lastDay !== todayStr) {
        gameState.randomInspection.done = false;
        gameState.randomInspection.passed = false;
        gameState.randomInspection.lastDay = todayStr;
    }
    html += '<div class="card" style="margin-top:8px;border-left:4px solid #FF69B4;">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;">'
        + '<div>'
        + '<div style="font-weight:600;color:#FF69B4;">随机检测</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">每日不定时检查，通过全能力+15</div>'
        + '</div>'
        + '<div>'
        + (gameState.randomInspection.done ? (gameState.randomInspection.passed ? '<span style="color:var(--color-success);font-weight:600;font-size:13px;">已通过</span>' : '<span style="color:var(--color-danger);font-weight:600;font-size:13px;">未通过</span>')
           : '<button class="btn btn-sm btn-primary" style="background:#FF69B4;border-color:#FF69B4;" onclick="takeRandomInspection()">接受检测</button>')
        + '</div></div></div>';
    return html;
}

function takeRandomInspection() {
    if (!gameState.randomInspection) gameState.randomInspection = { lastDay: '', done: false, passed: false };
    var todayStr = new Date().toDateString();
    if (gameState.randomInspection.lastDay === todayStr && gameState.randomInspection.done) {
        showToast('今日已参加过随机检测');
        return;
    }
    var statKeys = Object.keys(gameState.stats);
    var allPass = true;
    var details = '';
    for (var i = 0; i < statKeys.length; i++) {
        var val = gameState.stats[statKeys[i]];
        var threshold = 30 + Math.floor(Math.random() * 30);
        var passed = val >= threshold;
        var statNames = { dance: '舞蹈', vocal: '声乐', rap: '说唱', acting: '表演', variety: '综艺' };
        details += statNames[statKeys[i]] + ': ' + val + ' (门槛' + threshold + ') ' + (passed ? '通过' : '未通过') + '\n';
        if (!passed) allPass = false;
    }
    if (allPass) {
        for (var j = 0; j < statKeys.length; j++) {
            gameState.stats[statKeys[j]] = Math.min(200, gameState.stats[statKeys[j]] + 15);
        }
        details += '\n恭喜！全部通过，所有能力+15！';
    } else {
        details += '\n未全部通过，下次继续加油！';
    }
    gameState.randomInspection = { lastDay: todayStr, done: true, passed: allPass };
    showModal('随机检测结果', details);
    triggerSilentSave();
    render();
}

// ==================== GACHA SYSTEM (抽卡系统) ====================
var GACHA_POOL = {
    kpop: {
        name: '韩国爱豆小卡',
        desc: '常驻卡池 - 收集真实韩团爱豆小卡',
        pity: 50,
        rates: { S: 2, A: 8, B: 30, C: 60 }
    },
    topIdol: {
        name: 'TOP IDOL限定池',
        desc: '限时卡池 - S/A级团体TOP成员限定小卡',
        singleCost: 2000,
        tenCost: 18000,
        pity: 50,
        rates: { S: 5, A: 15, B: 35, C: 45 }
    }
};

function initGachaPool() {
    var d = new Date();
    var todayStr = d.getFullYear() + '' + ('0' + (d.getMonth() + 1)).slice(-2) + '' + ('0' + d.getDate()).slice(-2);
    if (!gameState.gacha) {
        gameState.gacha = {
            kpop: { pulls: 0, pity: 0, dailyFree: 1, collection: {}, lastResetDate: todayStr },
            topIdol: { pulls: 0, pity: 0, dailyFree: 0, collection: {}, lastResetDate: todayStr }
        };
    }
    if (!gameState.gacha.kpop) {
        gameState.gacha.kpop = { pulls: 0, pity: 0, dailyFree: 1, collection: {}, lastResetDate: todayStr };
    }
    if (!gameState.gacha.topIdol) {
        gameState.gacha.topIdol = { pulls: 0, pity: 0, dailyFree: 0, collection: {}, lastResetDate: todayStr };
    }
    if (!gameState.gacha.kpop.collection) gameState.gacha.kpop.collection = {};
    if (!gameState.gacha.topIdol.collection) gameState.gacha.topIdol.collection = {};
    // Preserve hidden cards and fragment data - do not reset existing entries
    if (gameState.gacha._savedCollection) {
        var _savedK = gameState.gacha._savedCollection.kpop || {};
        var _savedT = gameState.gacha._savedCollection.topIdol || {};
        for (var _sk in _savedK) { if (_savedK[_sk].isHidden || _savedK[_sk].fragments > 0) gameState.gacha.kpop.collection[_sk] = _savedK[_sk]; }
        for (var _st in _savedT) { if (_savedT[_st].isHidden || _savedT[_st].fragments > 0) gameState.gacha.topIdol.collection[_st] = _savedT[_st]; }
        delete gameState.gacha._savedCollection;
    }
    if (gameState.gacha.kpop.pity === undefined) gameState.gacha.kpop.pity = 0;
    if (gameState.gacha.topIdol.pity === undefined) gameState.gacha.topIdol.pity = 0;
    if (gameState.gacha.kpop.pulls === undefined) gameState.gacha.kpop.pulls = 0;
    if (gameState.gacha.topIdol.pulls === undefined) gameState.gacha.topIdol.pulls = 0;
    // Daily reset for kpop free pull
    if (gameState.gacha.kpop.lastResetDate !== todayStr) {
        gameState.gacha.kpop.dailyFree = 1;
        gameState.gacha.kpop.lastResetDate = todayStr;
    }
}


function checkGroupHiddenCard(pool, groupName) {
    var poolData = gameState.gacha[pool];
    if (!poolData) return;
    var collection = poolData.collection;
    var groupCards = [];
    var cardKeys = Object.keys(collection);
    for (var ci = 0; ci < cardKeys.length; ci++) {
        if (collection[cardKeys[ci]].group === groupName) {
            groupCards.push(collection[cardKeys[ci]]);
        }
    }
    var uniqueNames = [];
    for (var gi = 0; gi < groupCards.length; gi++) {
        if (uniqueNames.indexOf(groupCards[gi].name) === -1) {
            uniqueNames.push(groupCards[gi].name);
        }
    }
    if (uniqueNames.length >= 5) {
        var compKeys = Object.keys(COMPANIES);
        for (var cki = 0; cki < compKeys.length; cki++) {
            var company = COMPANIES[compKeys[cki]];
            var gkeys = Object.keys(company.groups);
            for (var gki = 0; gki < gkeys.length; gki++) {
                var grp = company.groups[gkeys[gki]];
                if (grp.name === groupName && grp.members && grp.members.length > 0) {
                    var leader = grp.members[0];
                    var hiddenId = leader.name + '_' + groupName + '_hidden';
                    if (!collection[hiddenId]) {
                        collection[hiddenId] = {
                            name: leader.name, group: groupName, company: company.name,
                            position: leader.position || 'Leader', cardTier: 'S', stars: 3,
                            fragments: 0, isHidden: true
                        };
                        showToast('隐藏卡面解锁！' + leader.name + ' - ' + groupName);
                    }
                    return;
                }
            }
        }
    }
}

function getGachaCard(pool) {
    var rates = GACHA_POOL[pool].rates;
    var rand = Math.random() * 100;
    var tier;
    if (rand < rates.S) tier = 'S';
    else if (rand < rates.S + rates.A) tier = 'A';
    else if (rand < rates.S + rates.A + rates.B) tier = 'B';
    else tier = 'C';

    var allCards = [];
    var compKeys = Object.keys(COMPANIES);
    for (var ci = 0; ci < compKeys.length; ci++) {
        var company = COMPANIES[compKeys[ci]];
        var gkeys = Object.keys(company.groups);
        for (var gi = 0; gi < gkeys.length; gi++) {
            var group = company.groups[gkeys[gi]];
            for (var mi = 0; mi < group.members.length; mi++) {
                var m = group.members[mi];
                var gTier = group.tier || 'C';
                var cardTier = gTier === 'S' ? (mi === 0 ? 'S' : mi < 2 ? 'A' : 'B') : gTier === 'A' ? (mi === 0 ? 'A' : mi < 3 ? 'B' : 'C') : gTier === 'B' ? (mi === 0 ? 'B' : 'C') : 'C';
                if (pool === 'topIdol' && gTier !== 'S' && gTier !== 'A') continue;
                allCards.push({
                    name: m.name, group: group.name, company: company.name,
                    position: m.position, tier: cardTier
                });
            }
        }
    }
    var filtered = [];
    for (var i = 0; i < allCards.length; i++) {
        if (allCards[i].tier === tier) filtered.push(allCards[i]);
    }
    if (filtered.length === 0) filtered = allCards;
    var card = filtered[Math.floor(Math.random() * filtered.length)];
    card.cardTier = tier;
    card.id = card.name + '_' + card.group;
    card.stars = 1;
    card.fragments = 0;
    return card;
}

function pullGacha(pool, count) {
    initGachaPool();
    var poolData = gameState.gacha[pool];
    var config = GACHA_POOL[pool];

    if (count === 1) {
        if (pool === 'kpop' && poolData.dailyFree > 0) {
            poolData.dailyFree--;
        } else if (config.singleCost) {
            if (gameState.money < config.singleCost) { showToast('金币不足(需要' + config.singleCost.toLocaleString() + ')'); return null; }
            gameState.money -= config.singleCost;
        } else {
            if (poolData.dailyFree <= 0) { showToast('今日免费次数已用完'); return null; }
        }
    } else {
        var cost = config.tenCost;
        if (gameState.money < cost) { showToast('金币不足(需要' + cost.toLocaleString() + ')'); return null; }
        gameState.money -= cost;
    }

    var results = [];
    for (var i = 0; i < count; i++) {
        poolData.pity++;
        var card;
        if (poolData.pity >= config.pity) {
            card = getGachaCard(pool);
            card.cardTier = 'S';
            poolData.pity = 0;
        } else {
            card = getGachaCard(pool);
        }
        if (poolData.collection[card.id]) {
            poolData.collection[card.id].fragments += 1;
            card.isDuplicate = true;
        } else {
            poolData.collection[card.id] = { name: card.name, group: card.group, company: card.company, position: card.position, cardTier: card.cardTier, stars: 1, fragments: 0 };
            card.isDuplicate = false;
            checkGroupHiddenCard(pool, card.group);
        }
        poolData.pulls++;
        results.push(card);
    }
    gameState.gacha[pool] = poolData;
    triggerSilentSave();
    return results;
}

function renderVipPage(container) {
    var currentTier = getVipTier();
    var tierLabel = currentTier ? VIP_TIERS[currentTier].name : '免费用户';
    var tierColor = currentTier === 'premium' ? 'linear-gradient(135deg,#FFD700,#FFA500)' : currentTier === 'advanced' ? 'linear-gradient(135deg,#C0C0C0,#A0A0A0)' : currentTier === 'basic' ? 'linear-gradient(135deg,#CD7F32,#B87333)' : 'linear-gradient(135deg,#8E8E93,#636366)';

    var html = '<div class="page active">'
        + '<div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">&#8249; 首页</div><div class="page-title">会员中心</div><div style="width:32px;"></div></div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:' + tierColor + ';color:white;padding:24px;">'
        + '<div style="font-size:22px;font-weight:700;">' + tierLabel + '</div>'
        + '<div style="font-size:12px;opacity:0.8;margin-top:4px;">' + (currentTier ? 'AI对话 ' + VIP_TIERS[currentTier].dailyLimit + '条/天' : 'AI对话需开通会员') + '</div>'
        + '</div>';

    // VIP Tier Cards
    if (!currentTier) {
        html += '<div class="section-title" style="margin-top:16px;">开通会员</div>';
        var tierKeys = ['premium', 'advanced', 'basic'];
        for (var ti = 0; ti < tierKeys.length; ti++) {
            var tk = tierKeys[ti];
            var t = VIP_TIERS[tk];
            html += '<div class="card" style="margin-bottom:8px;">'
                + '<div style="display:flex;justify-content:space-between;align-items:center;">'
                + '<div><div style="font-weight:600;">' + t.name + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">' + t.features.join(' / ') + '</div></div>'
                + '<div style="font-weight:700;font-size:18px;color:var(--color-primary);">' + t.price + '元/月</div>'
                + '</div></div>';
        }
        html += '<button class="btn btn-primary btn-lg" style="margin-top:12px;width:100%;" onclick="window.open(\'https://afdian.com/a/myidol\',\'_blank\')">前往爱发电开通</button>'
            + '<button class="btn btn-secondary btn-lg" style="margin-top:8px;width:100%;" onclick="showVerifyOrder()">已付费？验证订单</button>';
    } else {
        html += '<div class="card" style="margin-top:12px;text-align:center;">'
            + '<div style="font-size:13px;color:var(--color-text-light);">当前已开通 ' + VIP_TIERS[currentTier].name + '</div>'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-top:4px;">AI对话 ' + VIP_TIERS[currentTier].dailyLimit + '条/天</div>'
            + '</div>';
    }

    // Value-Add Items (轻量增值项)
    html += '<div class="section-title" style="margin-top:20px;">增值服务</div>';

    // AI加油包
    html += '<div class="card" style="margin-bottom:8px;">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;">'
        + '<div><div style="font-weight:600;">AI加油包(小)</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);">额外5条AI对话</div></div>'
        + '<button class="btn btn-sm" style="background:var(--color-primary);color:white;font-size:12px;" onclick="buyAiPack(\'small\')">1元</button>'
        + '</div></div>';
    html += '<div class="card" style="margin-bottom:8px;">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;">'
        + '<div><div style="font-weight:600;">AI加油包(大)</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);">额外20条AI对话</div></div>'
        + '<button class="btn btn-sm" style="background:var(--color-primary);color:white;font-size:12px;" onclick="buyAiPack(\'large\')">3元</button>'
        + '</div></div>';

    // 存档槽
    var slotCount = gameState.saveSlots ? gameState.saveSlots.length : 3;
    html += '<div class="card" style="margin-bottom:8px;">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;">'
        + '<div><div style="font-weight:600;">额外存档槽</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);">当前' + slotCount + '个 / 最多6个</div></div>'
        + '<button class="btn btn-sm" style="background:var(--color-primary);color:white;font-size:12px;" onclick="buySaveSlot()">3元</button>'
        + '</div></div>';

    // 加速跳过
    html += '<div class="card" style="margin-bottom:8px;">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;">'
        + '<div><div style="font-weight:600;">加速跳过</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);">跳过训练/工作等待</div></div>'
        + '<button class="btn btn-sm" style="background:var(--color-primary);color:white;font-size:12px;" onclick="buySpeedSkip()">1元</button>'
        + '</div></div>';

    html += '</div></div>';
    container.innerHTML = html;
}

function buyAiPack(size) {
    var packs = { small: { name: 'AI加油包(小)', count: 5, price: 1 }, large: { name: 'AI加油包(大)', count: 20, price: 3 } };
    var pack = packs[size];
    if (!pack) return;
    showModal('购买' + pack.name, '需支付' + pack.price + '元，购买后获得' + pack.count + '条额外AI对话次数。\n\n请前往爱发电购买后输入订单号验证。', [
        { text: '取消', action: function() { closeModal(); } },
        { text: '前往购买', action: function() { closeModal(); window.open('https://afdian.com/a/myidol', '_blank'); } }
    ]);
}

function buySaveSlot() {
    var current = gameState.saveSlots ? gameState.saveSlots.length : 3;
    if (current >= 6) { showToast('已达到最大存档槽数量'); return; }
    showModal('购买存档槽', '需支付3元，增加1个存档槽位。\n\n请前往爱发电购买后输入订单号验证。', [
        { text: '取消', action: function() { closeModal(); } },
        { text: '前往购买', action: function() { closeModal(); window.open('https://afdian.com/a/myidol', '_blank'); } }
    ]);
}

function buySpeedSkip() {
    if (!gameState.speedSkips) gameState.speedSkips = 0;
    showModal('购买加速跳过', '需支付1元，获得3次加速跳过机会。\n\n请前往爱发电购买后输入订单号验证。', [
        { text: '取消', action: function() { closeModal(); } },
        { text: '前往购买', action: function() { closeModal(); window.open('https://afdian.com/a/myidol', '_blank'); } }
    ]);
}

function _countTotalGachaCards() {
    var total = 0;
    var compKeys = Object.keys(COMPANIES);
    for (var ci = 0; ci < compKeys.length; ci++) {
        var company = COMPANIES[compKeys[ci]];
        var gkeys = Object.keys(company.groups);
        for (var gi = 0; gi < gkeys.length; gi++) {
            total += company.groups[gkeys[gi]].members.length;
        }
    }
    return total;
}

function renderGachaPage(container) {
    initGachaPool();
    var kpop = gameState.gacha.kpop;
    var topIdol = gameState.gacha.topIdol;
    var totalCards = Object.keys(kpop.collection).length + Object.keys(topIdol.collection).length;
    var hiddenCount = 0;
    var kCollKeys = Object.keys(kpop.collection);
    for (var hki = 0; hki < kCollKeys.length; hki++) { if (kpop.collection[kCollKeys[hki]].isHidden) hiddenCount++; }
    var tCollKeys = Object.keys(topIdol.collection);
    for (var hti = 0; hti < tCollKeys.length; hti++) { if (topIdol.collection[tCollKeys[hti]].isHidden) hiddenCount++; }

    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div><div class="page-title">抽卡</div><div style="width:32px;"></div></div><div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,#FFD700,#FFA500);color:white;padding:20px;">'
        + '<div style="font-size:20px;font-weight:700;">小卡收藏</div>'
        + '<div style="font-size:13px;opacity:0.8;margin-top:4px;">已收集 ' + totalCards + ' 张' + (hiddenCount > 0 ? ' | 隐藏卡 ' + hiddenCount + ' 张' : '') + '</div></div>';

    // Kpop Pool
    html += '<div class="card" style="margin-top:12px;border-left:4px solid #5BB8E8;">'
        + '<div style="font-weight:700;font-size:15px;">韩国爱豆小卡池</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);margin:4px 0 12px;">常驻 | 今日免费' + kpop.dailyFree + '次 | 保底' + (50 - kpop.pity) + '次</div>'
        + '<button class="btn btn-primary btn-lg" style="width:100%;" onclick="doGachaPull(\'kpop\',1)">单抽' + (kpop.dailyFree > 0 ? ' (免费)' : '') + '</button></div>';

    // TOP IDOL Pool
    html += '<div class="card" style="margin-top:8px;border-left:4px solid #FFD700;">'
        + '<div style="font-weight:700;font-size:15px;">TOP IDOL限定池</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);margin:4px 0 12px;">限时 | 单抽2千/10连1.8万 | 保底' + (50 - topIdol.pity) + '次</div>'
        + '<div style="display:flex;gap:8px;">'
        + '<button class="btn btn-primary btn-lg" style="flex:1;" onclick="doGachaPull(\'topIdol\',1)">单抽</button>'
        + '<button class="btn btn-primary btn-lg" style="flex:1;background:linear-gradient(135deg,#FFD700,#FFA500);" onclick="doGachaPull(\'topIdol\',10)">10连</button></div></div>';

    // Collection
    var allCards = [];
    var kc = kpop.collection; var tc = topIdol.collection;
    for (var k in kc) allCards.push(kc[k]);
    for (var k in tc) allCards.push(tc[k]);

    if (allCards.length > 0) {
        var tierColors = { S: '#FFD700', A: '#4CD964', B: '#5BB8E8', C: '#999' };
        html += '<div class="card" style="margin-top:12px;"><div style="font-weight:600;margin-bottom:10px;">我的收藏 (' + allCards.length + '/' + _countTotalGachaCards() + ')';
        for (var i = 0; i < Math.min(allCards.length, 30); i++) {
            var c = allCards[i];
            var t = c.cardTier || 'C';
            var isHid = c.isHidden ? true : false;
            var hidBorder = isHid ? 'border:2px solid #FFD700;box-shadow:0 0 8px rgba(255,215,0,0.5);' : '';
            var _pool = kc[c.name + '_' + c.group] ? 'kpop' : 'topIdol';
            var _cid = c.name + '_' + c.group;
            var _starStr = '';
            for (var _si = 0; _si < (c.stars || 1); _si++) _starStr += '\u2605';
            html += '<div style="width:50px;height:65px;border-radius:8px;background:linear-gradient(135deg,' + tierColors[t] + ',' + tierColors[t] + '88);display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;position:relative;cursor:pointer;' + hidBorder + '" onclick="showCardDetail(\'' + _pool + '\',\'' + _cid + '\')">'
                + '<div style="font-weight:700;font-size:14px;">' + c.name.charAt(0) + '</div>'
                + '<div style="font-size:8px;opacity:0.8;">' + t + '</div>'
                + (isHid ? '<div style="position:absolute;top:1px;right:2px;font-size:7px;color:#FFD700;">*</div>' : '')
                + (c.fragments > 0 ? '<div style="position:absolute;bottom:2px;font-size:7px;opacity:0.7;">x' + (c.fragments + 1) + '</div>' : '')
                + '<div style="position:absolute;top:1px;left:2px;font-size:6px;color:#FFD700;">' + _starStr + '</div>'
                + '</div>';
        }
        if (allCards.length > 30) html += '<div style="display:flex;align-items:center;font-size:12px;color:var(--color-text-light);padding:8px;">+' + (allCards.length - 30) + '</div>';
        html += '</div></div>';
    }

    html += '</div></div>';
    container.innerHTML = html;
}

var GACHA_MAX_STARS = 3;


function showCardDetail(pool, cardId) {
    initGachaPool();
    var poolData = gameState.gacha[pool];
    if (!poolData) return;
    var card = poolData.collection[cardId];
    if (!card) return;
    var tierColors = { S: '#FFD700', A: '#4CD964', B: '#5BB8E8', C: '#999' };
    var tierNames = { S: 'S\u7ea7-\u4f20\u8bf4', A: 'A\u7ea7-\u7a00\u6709', B: 'B\u7ea7-\u4f18\u826f', C: 'C\u7ea7-\u666e\u901a' };
    var t = card.cardTier || 'C';
    var color = tierColors[t];
    var _starStr = '';
    for (var _si = 0; _si < (card.stars || 1); _si++) _starStr += '\u2605';
    var needFragments = (card.stars || 1) < 3 ? (card.stars || 1) + 1 : 0;
    var canUpgrade = needFragments > 0 && (card.fragments || 0) >= needFragments;
    var html = '<div style="text-align:center;">'
        + '<div style="width:120px;height:160px;border-radius:16px;background:linear-gradient(135deg,' + color + ',' + color + '66);display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;margin:0 auto 16px;position:relative;' + (card.isHidden ? 'border:2px solid #FFD700;box-shadow:0 0 12px rgba(255,215,0,0.5);' : '') + '">'
        + '<div style="font-size:36px;font-weight:700;">' + card.name.charAt(0) + '</div>'
        + '<div style="font-size:16px;font-weight:600;margin-top:4px;">' + t + '\u7ea7</div>'
        + '<div style="font-size:11px;opacity:0.8;margin-top:2px;">' + (tierNames[t] || '') + '</div>'
        + (card.isHidden ? '<div style="position:absolute;top:4px;right:6px;font-size:9px;color:#FFD700;">HIDDEN</div>' : '')
        + '<div style="position:absolute;bottom:6px;font-size:12px;color:#FFD700;">' + _starStr + '</div>'
        + '</div>'
        + '<div style="font-size:18px;font-weight:700;">' + card.name + '</div>'
        + '<div style="font-size:13px;color:var(--color-text-light);margin-top:4px;">' + card.company + ' / ' + card.group + '</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">' + (card.position || '') + '</div>'
        + '<div style="margin-top:12px;display:flex;justify-content:center;gap:12px;">'
        + '<div style="text-align:center;"><div style="font-size:16px;font-weight:700;color:var(--color-primary);">' + (card.stars || 1) + '/3</div><div style="font-size:10px;color:var(--color-text-light);">\u661f\u7ea7</div></div>'
        + '<div style="text-align:center;"><div style="font-size:16px;font-weight:700;color:var(--color-primary);">' + (card.fragments || 0) + '</div><div style="font-size:10px;color:var(--color-text-light);">\u788e\u7247</div></div>'
        + '</div>'
        + (canUpgrade ? '<div style="margin-top:12px;font-size:12px;color:var(--color-success);">\u788e\u7247\u5145\u8db3\uff0c\u53ef\u4ee5\u5347\u661f!</div>' : (needFragments > 0 ? '<div style="margin-top:12px;font-size:12px;color:var(--color-text-light);">\u5347\u661f\u9700\u8981' + needFragments + '\u4e2a\u788e\u7247\uff0c\u5f53\u524d' + (card.fragments || 0) + '\u4e2a</div>' : ''))
        + '</div>';
    var actions = [{ text: '\u5347\u661f', action: function() { closeModal(); upgradeCardStar(pool, cardId); } }, { text: '\u5173\u95ed', action: closeModal }];
    showModal('\u5361\u7247\u8be6\u60c5 - ' + card.name, html, actions);
}

function upgradeCardStar(pool, cardId) {
    initGachaPool();
    var poolData = gameState.gacha[pool];
    if (!poolData) return;
    var card = poolData.collection[cardId];
    if (!card) return;
    if (card.stars >= GACHA_MAX_STARS) {
        showModal('\u5347\u661f\u63d0\u793a', '\u5df2\u6ee1\u661f\uff0c\u65e0\u6cd5\u7ee7\u7eed\u5347\u661f');
        return;
    }
    var needFragments = card.stars + 1;
    if (card.fragments < needFragments) {
        showModal('\u5347\u661f\u63d0\u793a', '\u788e\u7247\u4e0d\u8db3\uff0c\u9700\u8981' + needFragments + '\u4e2a\u788e\u7247\uff0c\u5f53\u524d\u62e5\u6709' + card.fragments + '\u4e2a');
        return;
    }
    card.fragments -= needFragments;
    card.stars += 1;
    showToast(card.name + '\u5347\u661f\u6210\u529f! \u2605' + card.stars);
    triggerSilentSave();
    goToPage('gacha');
}

var _gachaAnimating = false;
function doGachaPull(pool, count) {
    if (_gachaAnimating) return;
    _gachaAnimating = true;
    var results = pullGacha(pool, count);
    if (!results) { _gachaAnimating = false; return; }
    showGachaResult(results, pool);
    setTimeout(function() { _gachaAnimating = false; }, 800);
}

var _gachaCSSInjected = false;
function _injectGachaCSS() {
    if (_gachaCSSInjected) return;
    _gachaCSSInjected = true;
    var style = document.createElement('style');
    style.textContent = ''
        + '@keyframes gachaGoldBurst{0%{transform:scale(0);opacity:1}50%{transform:scale(3);opacity:0.8}100%{transform:scale(5);opacity:0}}'
        + '@keyframes gachaCardSIntro{0%{transform:scale(0) rotateY(180deg);opacity:0}60%{transform:scale(1.15) rotateY(0);opacity:1}80%{transform:scale(0.95)}100%{transform:scale(1)}}'
        + '@keyframes gachaCardAIntro{0%{transform:scale(0.5) rotateY(90deg);opacity:0}70%{transform:scale(1.05) rotateY(0);opacity:1}100%{transform:scale(1)}}'
        + '@keyframes gachaCardBCIntro{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}}'
        + '@keyframes gachaShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}'
        + '@keyframes gachaFloatUp{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(-80px) scale(0.5);opacity:0}}'
        + '@keyframes gachaPulse{0%,100%{box-shadow:0 0 15px rgba(255,215,0,0.6),0 0 30px rgba(255,215,0,0.3)}50%{box-shadow:0 0 25px rgba(255,215,0,0.9),0 0 50px rgba(255,215,0,0.5)}}'
        + '@keyframes gachaTenReveal{0%{transform:scale(0) rotate(15deg);opacity:0}60%{transform:scale(1.1) rotate(-3deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}'
        + '@keyframes gachaScreenFlash{0%{opacity:0}15%{opacity:1}100%{opacity:0}}'
        + '@keyframes gachaParticleFly{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--px),var(--py)) scale(0);opacity:0}}'
        + '.gacha-overlay{position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column}'
        + '.gacha-burst-ring{position:absolute;width:60px;height:60px;border-radius:50%;background:radial-gradient(circle,rgba(255,215,0,0.9),rgba(255,165,0,0.5),transparent);animation:gachaGoldBurst 0.8s ease-out forwards}'
        + '.gacha-screen-flash{position:fixed;top:0;left:0;width:100%;height:100%;background:white;animation:gachaScreenFlash 0.5s ease-out forwards;z-index:9998}'
        + '.gacha-particle{position:absolute;width:6px;height:6px;border-radius:50%;animation:gachaParticleFly 1s ease-out forwards}';
    document.head.appendChild(style);
}

function _showGachaParticleBurst(container, color, count) {
    for (var i = 0; i < count; i++) {
        var p = document.createElement('div');
        p.className = 'gacha-particle';
        var angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
        var dist = 60 + Math.random() * 80;
        p.style.cssText = 'background:' + color + ';left:50%;top:50%;--px:' + Math.cos(angle) * dist + 'px;--py:' + Math.sin(angle) * dist + 'px;animation-delay:' + (Math.random() * 0.3) + 's;';
        container.appendChild(p);
        (function(el) { setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 1500); })(p);
    }
}

function showGachaResult(results, pool) {
    _injectGachaCSS();
    var tierColors = { S: '#FFD700', A: '#C77DFF', B: '#5BB8E8', C: '#888' };
    var tierBg = {
        S: 'linear-gradient(135deg,#FFD700,#FF8C00,#FFD700)',
        A: 'linear-gradient(135deg,#C77DFF,#9B5DE5,#C77DFF)',
        B: 'linear-gradient(135deg,#5BB8E8,#4A90D9,#5BB8E8)',
        C: 'linear-gradient(135deg,#888,#666,#888)'
    };
    var tierBorder = { S: '3px solid #FFD700', A: '2px solid #C77DFF', B: '1px solid #5BB8E8', C: '1px solid #555' };
    var highestTier = 'C';
    for (var hi = 0; hi < results.length; hi++) {
        var ht = results[hi].cardTier || results[hi].tier;
        if (ht === 'S') { highestTier = 'S'; break; }
        if (ht === 'A' && highestTier !== 'S') highestTier = 'A';
        if (ht === 'B' && highestTier === 'C') highestTier = 'B';
    }

    var isSingle = (results.length === 1);
    var app = document.getElementById('app');
    if (!app) return;

    if (highestTier === 'S') {
        var overlay = document.createElement('div');
        overlay.className = 'gacha-overlay';
        overlay.style.background = 'rgba(0,0,0,0.95)';
        overlay.innerHTML = '<div id="gacha-burst" style="position:relative;"></div><div id="gacha-s-card" style="display:none;margin-top:20px;"></div>';
        app.innerHTML = '';
        app.appendChild(overlay);

        var flash = document.createElement('div');
        flash.className = 'gacha-screen-flash';
        app.appendChild(flash);
        setTimeout(function() { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 600);

        setTimeout(function() {
            var burst = document.getElementById('gacha-burst');
            if (burst) {
                var ring = document.createElement('div');
                ring.className = 'gacha-burst-ring';
                burst.appendChild(ring);
                _showGachaParticleBurst(burst, '#FFD700', 20);
                _showGachaParticleBurst(burst, '#FF8C00', 12);
            }
        }, 200);

        setTimeout(function() {
            var cardArea = document.getElementById('gacha-s-card');
            if (!cardArea) return;
            cardArea.style.display = 'flex';
            cardArea.style.flexDirection = 'column';
            cardArea.style.alignItems = 'center';
            if (isSingle) {
                var c = results[0];
                var t = c.cardTier || c.tier;
                cardArea.innerHTML = _buildSingleCardHTML(c, t, tierColors, tierBg, tierBorder, true);
            } else {
                var html = '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;max-width:320px;">';
                for (var i = 0; i < results.length; i++) {
                    var c = results[i];
                    var t = c.cardTier || c.tier;
                    html += _buildMiniCardHTML(c, t, tierColors, tierBg, tierBorder, i);
                }
                html += '</div>';
                cardArea.innerHTML = html;
            }
            var cardEl = cardArea.querySelector('.gacha-card-el');
            if (cardEl) {
                cardEl.style.animation = 'gachaCardSIntro 0.7s ease-out forwards';
            }
            var miniCards = cardArea.querySelectorAll('.gacha-mini-el');
            for (var mi = 0; mi < miniCards.length; mi++) {
                miniCards[mi].style.animation = 'gachaTenReveal 0.4s ease-out ' + (mi * 0.08) + 's forwards';
                miniCards[mi].style.opacity = '0';
            }
        }, 800);

        setTimeout(function() {
            var btnArea = document.createElement('div');
            btnArea.style.cssText = 'position:fixed;bottom:60px;left:0;width:100%;text-align:center;z-index:10000;';
            btnArea.innerHTML = '<button class="btn btn-primary btn-lg" style="width:80%;max-width:280px;" onclick="goToPage(\'gacha\')">继续抽卡</button>';
            app.appendChild(btnArea);
        }, 1200);
        return;
    }

    if (highestTier === 'A') {
        var overlay = document.createElement('div');
        overlay.className = 'gacha-overlay';
        overlay.style.background = 'rgba(20,10,40,0.92)';
        var cardArea = document.createElement('div');
        cardArea.id = 'gacha-a-card';
        cardArea.style.cssText = 'display:flex;flex-direction:column;align-items:center;';
        overlay.appendChild(cardArea);
        app.innerHTML = '';
        app.appendChild(overlay);
        _showGachaParticleBurst(overlay, '#C77DFF', 10);

        if (isSingle) {
            var c = results[0];
            var t = c.cardTier || c.tier;
            cardArea.innerHTML = _buildSingleCardHTML(c, t, tierColors, tierBg, tierBorder, true);
        } else {
            var html = '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;max-width:320px;">';
            for (var i = 0; i < results.length; i++) {
                var c = results[i];
                var t = c.cardTier || c.tier;
                html += _buildMiniCardHTML(c, t, tierColors, tierBg, tierBorder, i);
            }
            html += '</div>';
            cardArea.innerHTML = html;
        }
        var cardEl = cardArea.querySelector('.gacha-card-el');
        if (cardEl) cardEl.style.animation = 'gachaCardAIntro 0.6s ease-out forwards';
        var miniCards = cardArea.querySelectorAll('.gacha-mini-el');
        for (var mi = 0; mi < miniCards.length; mi++) {
            miniCards[mi].style.animation = 'gachaTenReveal 0.35s ease-out ' + (mi * 0.07) + 's forwards';
            miniCards[mi].style.opacity = '0';
        }
        setTimeout(function() {
            var btnArea = document.createElement('div');
            btnArea.style.cssText = 'position:fixed;bottom:60px;left:0;width:100%;text-align:center;z-index:10000;';
            btnArea.innerHTML = '<button class="btn btn-primary btn-lg" style="width:80%;max-width:280px;" onclick="goToPage(\'gacha\')">继续抽卡</button>';
            app.appendChild(btnArea);
        }, 600);
        return;
    }

    var html = '<div class="page active"><div class="page-header"><div class="back-btn" onclick="goToPage(\'gacha\')">‹ 返回</div><div class="page-title">抽卡结果</div><div style="width:32px;"></div></div><div class="page-content" style="text-align:center;padding-top:20px;">';
    if (isSingle) {
        var c = results[0];
        var t = c.cardTier || c.tier;
        html += _buildSingleCardHTML(c, t, tierColors, tierBg, tierBorder, false);
    } else {
        html += '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;padding:16px 0;">';
        for (var i = 0; i < results.length; i++) {
            var c = results[i];
            var t = c.cardTier || c.tier;
            html += _buildMiniCardHTML(c, t, tierColors, tierBg, tierBorder, i);
        }
        html += '</div>';
    }
    html += '<button class="btn btn-primary btn-lg" style="margin-top:24px;width:80%;" onclick="goToPage(\'gacha\')">继续抽卡</button></div></div>';
    app.innerHTML = html;
    var miniCards = app.querySelectorAll('.gacha-mini-el');
    for (var mi = 0; mi < miniCards.length; mi++) {
        miniCards[mi].style.animation = 'gachaCardBCIntro 0.3s ease-out ' + (mi * 0.06) + 's forwards';
        miniCards[mi].style.opacity = '0';
    }
}

function _buildSingleCardHTML(c, t, tierColors, tierBg, tierBorder, isDramatic) {
    var tierLabel = { S: 'S  LEGENDARY', A: 'A  EPIC', B: 'B  RARE', C: 'C  NORMAL' };
    var animClass = isDramatic ? 'gacha-card-el' : 'gacha-card-el';
    var glowShadow = t === 'S' ? 'animation:gachaPulse 2s infinite;' : t === 'A' ? 'box-shadow:0 0 20px rgba(199,125,255,0.5);' : '';
    var shimmerBg = (t === 'S' || t === 'A') ? 'background:linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent);background-size:200% 100%;animation:gachaShimmer 2s infinite;' : '';
    return '<div class="' + animClass + '" style="width:170px;height:230px;border-radius:16px;background:' + tierBg[t] + ';border:' + tierBorder[t] + ';display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;position:relative;overflow:hidden;' + glowShadow + '">'
        + '<div style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:16px;' + shimmerBg + '"></div>'
        + '<div style="position:absolute;top:8px;right:8px;font-size:10px;font-weight:700;background:rgba(0,0,0,0.4);padding:2px 6px;border-radius:4px;">' + (tierLabel[t] || t) + '</div>'
        + '<div style="font-size:44px;font-weight:700;z-index:1;text-shadow:0 2px 8px rgba(0,0,0,0.3);">' + c.name.charAt(0) + '</div>'
        + '<div style="font-size:14px;font-weight:600;margin-top:6px;z-index:1;">' + c.name + '</div>'
        + '<div style="font-size:11px;opacity:0.8;margin-top:2px;z-index:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:130px;">' + c.group + '</div>'
        + (c.isDuplicate ? '<div style="font-size:11px;margin-top:8px;opacity:0.9;z-index:1;background:rgba(0,0,0,0.3);padding:2px 8px;border-radius:8px;">碎片+1</div>' : '<div style="font-size:11px;margin-top:8px;opacity:0.9;z-index:1;background:rgba(255,255,255,0.2);padding:2px 8px;border-radius:8px;">NEW!</div>')
        + '</div>'
        + '<div style="font-weight:700;font-size:16px;margin-top:12px;color:white;">' + c.name + '</div>'
        + '<div style="font-size:13px;opacity:0.7;color:white;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + c.company + ' / ' + c.group + '</div>';
}

function _buildMiniCardHTML(c, t, tierColors, tierBg, tierBorder, index) {
    var glowShadow = t === 'S' ? 'animation:gachaPulse 2s infinite;' : t === 'A' ? 'box-shadow:0 0 12px rgba(199,125,255,0.5);' : '';
    var shimmerBg = (t === 'S' || t === 'A') ? 'background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);background-size:200% 100%;animation:gachaShimmer 2s infinite;' : '';
    return '<div class="gacha-mini-el" style="width:62px;height:82px;border-radius:10px;background:' + tierBg[t] + ';border:' + tierBorder[t] + ';display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;position:relative;overflow:hidden;' + glowShadow + 'opacity:0;">'
        + '<div style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:10px;' + shimmerBg + '"></div>'
        + '<div style="font-size:16px;font-weight:700;z-index:1;">' + c.name.charAt(0) + '</div>'
        + '<div style="font-size:9px;z-index:1;">' + t + '</div>'
        + (c.isDuplicate ? '<div style="position:absolute;top:2px;right:4px;font-size:7px;opacity:0.8;z-index:1;">+1</div>' : '<div style="position:absolute;top:2px;left:4px;font-size:7px;opacity:0.8;z-index:1;">NEW</div>')
        + '</div>';
}

// ==================== SIMPLE NPC REPLY ====================
function getSimpleReply(personality, npcName) {
    var templates = {
        'protective': ['注意休息哦','今天辛苦了','我会一直支持你的','别太勉强自己','有什么需要帮忙的吗','你今天状态怎么样','我给你带了点心','累了就说一声'],
        'helpful': ['加油！','我教你一个小技巧','一起练习吧','今天的日程安排好了','你可以的','我帮你看看','试试这个方法','我们互相学习'],
        'hostile': ['哼','别来烦我','你又来了','走开','真烦','别挡路','少在我面前晃','无所谓'],
        'backstabber': ['你真棒呢~','加油哦（笑）','放心吧我才不会...','哦是吗','那可真是太好了','你说的都对呢','好的好的~','呵'],
        'prankster': ['哈哈哈','逗你的啦','来玩个游戏吧','猜猜我在干嘛','惊不惊喜','嘿嘿嘿','你上当了','开玩笑的啦']
    };
    var list = templates[personality] || templates['helpful'];
    var idx = Math.floor(Math.random() * list.length);
    return list[idx];
}

// ==================== KAKAO TALK ====================
function _ensureKakaoState() {
    if (!gameState.kakaoChats) gameState.kakaoChats = {};
    if (!gameState.kakaoFriends) {
        gameState.kakaoFriends = [
            { name: '代表经纪人(Manager)', nameEn: 'Manager Kim', personality: 'helpful', specialty: '经纪人', avatarColor: '#4A90D9', online: true, isManager: true }
        ];
    }
    if (!gameState.kakaoCurrentChat) gameState.kakaoCurrentChat = '';
    if (!gameState.kakaoTab) gameState.kakaoTab = 'chats';
    // Add teammates and company colleagues for debuted Idols
    if (gameState.player.role === 'Idol' && gameState.player.group) {
        var _comp = COMPANIES[gameState.player.company];
        if (_comp) {
            var _gkeys = Object.keys(_comp.groups);
            for (var _gki = 0; _gki < _gkeys.length; _gki++) {
                var _grp = _comp.groups[_gkeys[_gki]];
                for (var _mi = 0; _mi < _grp.members.length; _mi++) {
                    var _m = _grp.members[_mi];
                    var _mName = (typeof _m === 'object') ? _m.name : _m;
                    if (_mName === gameState.player.name) continue;
                    var _exists = false;
                    for (var _fi = 0; _fi < gameState.kakaoFriends.length; _fi++) {
                        if (gameState.kakaoFriends[_fi].name === _mName) { _exists = true; break; }
                    }
                    if (!_exists) {
                        var _mPers = 'helpful';
                        if (_m.personality && _m.personality.indexOf('hostile') > -1) _mPers = 'hostile';
                        else if (_m.personality && _m.personality.indexOf('backstabber') > -1) _mPers = 'backstabber';
                        else if (_m.personality && _m.personality.indexOf('protective') > -1) _mPers = 'protective';
                        else if (_m.personality && _m.personality.indexOf('prankster') > -1) _mPers = 'prankster';
                        var _colors = ['#FF8FA3','#7EC8E3','#C8A2C8','#98D8AA','#FFD700','#FF6B6B','#4ECDC4','#45B7D1'];
                        var _mColor = _colors[Math.floor(Math.random() * _colors.length)];
                        var _isTeammate = (_grp.name === gameState.player.group);
                        gameState.kakaoFriends.push({
                            name: _mName, nameEn: _mName, personality: _mPers,
                            specialty: _m.position || '\u7efc\u5408', avatarColor: _mColor, online: true,
                            isTeammate: _isTeammate
                        });
                    }
                }
            }
        }
    }
    // Add trainee colleagues for Trainees
    if (gameState.player.role === 'Trainee') {
        var _traineeNames = ['练习生小美', '练习生俊宇', '练习生秀贤', '练习生恩菲'];
        var _traineePers = ['helpful', 'prankster', 'protective', 'helpful'];
        var _traineeSpec = ['声乐', '舞蹈', '说唱', '表演'];
        var _traineeColors = ['#FF8FA3', '#7EC8E3', '#C8A2C8', '#98D8AA'];
        for (var ti = 0; ti < _traineeNames.length; ti++) {
            var _texists = false;
            for (var tfi = 0; tfi < gameState.kakaoFriends.length; tfi++) {
                if (gameState.kakaoFriends[tfi].name === _traineeNames[ti]) { _texists = true; break; }
            }
            if (!_texists) {
                gameState.kakaoFriends.push({
                    name: _traineeNames[ti], nameEn: _traineeNames[ti], personality: _traineePers[ti],
                    specialty: _traineeSpec[ti], avatarColor: _traineeColors[ti], online: true,
                    isTeammate: false
                });
            }
        }
    }
    // Remove friends from other companies (only keep same company + manager)
    try {
        var _playerComp = gameState.player.company;
        if (_playerComp && COMPANIES[_playerComp]) {
            var _validNames = ['代表经纪人(Manager)'];
            var _comp2 = COMPANIES[_playerComp];
            var _gk2 = Object.keys(_comp2.groups);
            for (var _gk2i = 0; _gk2i < _gk2.length; _gk2i++) {
                var _gm2 = _comp2.groups[_gk2[_gk2i]].members;
                for (var gm2i = 0; gm2i < _gm2.length; gm2i++) {
                    var _gm2n = (typeof _gm2[_gm2i] === 'object') ? _gm2[_gm2i].name : _gm2[_gm2i];
                    _validNames.push(_gm2n);
                }
            }
            if (gameState.player.role === 'Trainee') {
                _validNames.push('练习生小美', '练习生俊宇', '练习生秀贤', '练习生恩菲');
            }
            var _filtered = [];
            for (var fi = 0; fi < gameState.kakaoFriends.length; fi++) {
                if (_validNames.indexOf(gameState.kakaoFriends[fi].name) >= 0) {
                    _filtered.push(gameState.kakaoFriends[fi]);
                }
            }
            gameState.kakaoFriends = _filtered;
        }
    } catch(e) { /* ignore filter errors on load */ }
}

function _ensureV16Fields() {
    _ensureKakaoState();
    _checkWeeklyMonthlyExamPenalty();
    if (!gameState.insUnread) gameState.insUnread = 0;
    if (!gameState.tiktokUnread) gameState.tiktokUnread = 0;
    if (!gameState.bubbleUnread) gameState.bubbleUnread = 0;
    if (!gameState.weverseUnread) gameState.weverseUnread = 0;
    if (!gameState.datingUnread) gameState.datingUnread = 0;
    if (!gameState.livePendingReward) gameState.livePendingReward = false;
    if (!gameState.newNotice) gameState.newNotice = false;
    if (!gameState.lastReadVersion) gameState.lastReadVersion = '';
    if (!gameState.aiUsage) gameState.aiUsage = {};
    if (!gameState.certificates) {
        gameState.certificates = {
            dance: [false, false, false],
            vocal: [false, false, false],
            rap: [false, false, false],
            acting: [false, false, false],
            variety: [false, false, false]
        };
    }
    if (!gameState.examResult) gameState.examResult = { comprehensive: [false, false] };
    if (gameState.preDebut === undefined) gameState.preDebut = false;
    if (!gameState.looks) gameState.looks = 50;
    if (!gameState.teammates) gameState.teammates = [];
    if (!gameState.antiEvents) gameState.antiEvents = [];
    if (!gameState.achievements) gameState.achievements = [];
    if (!gameState.mvCollection) gameState.mvCollection = [];
    if (!gameState.fanClub) {
        gameState.fanClub = {
            name: gameState.player.group ? gameState.player.group + '后援会' : '个人后援会',
            level: 1, members: 0, funds: 0, color: '#FF8FA3',
            projects: [
                { name: '应援棒', cost: 10000, done: false },
                { name: '生日应援', cost: 50000, done: false },
                { name: '广告应援', cost: 100000, done: false }
            ]
        };
    }
    if (!gameState.fanClub.name) gameState.fanClub.name = gameState.player.group ? gameState.player.group + '后援会' : '个人后援会';
    if (!gameState.fanClub.color) gameState.fanClub.color = '#FF8FA3';
    if (!gameState.vipTier) gameState.vipTier = null;
    if (!gameState.aiBoostPacks) gameState.aiBoostPacks = [];
    // Preserve gacha collection before initGachaPool potentially resets it
    if (gameState.gacha && gameState.gacha.kpop && gameState.gacha.kpop.collection) {
        if (!gameState.gacha._savedCollection) gameState.gacha._savedCollection = {};
        gameState.gacha._savedCollection.kpop = JSON.parse(JSON.stringify(gameState.gacha.kpop.collection));
    }
    if (gameState.gacha && gameState.gacha.topIdol && gameState.gacha.topIdol.collection) {
        if (!gameState.gacha._savedCollection) gameState.gacha._savedCollection = {};
        gameState.gacha._savedCollection.topIdol = JSON.parse(JSON.stringify(gameState.gacha.topIdol.collection));
    }
    if (typeof initGachaPool === 'function') initGachaPool();
}

var _kakaoAddPersonality = '';

function renderKakaoTalkPage(container) {
    _ensureKakaoState();
    var tab = gameState.kakaoTab || 'chats';
    var tabHtml = '<div class="kakao-tab-bar">'
        + '<div class="kakao-tab-btn' + (tab === 'chats' ? ' active' : '') + '" onclick="gameState.kakaoTab=\'chats\';render();">聊天</div>'
        + '<div class="kakao-tab-btn' + (tab === 'friends' ? ' active' : '') + '" onclick="gameState.kakaoTab=\'friends\';render();">好友</div>'
        + '<div class="kakao-tab-btn' + (tab === 'settings' ? ' active' : '') + '" onclick="gameState.kakaoTab=\'settings\';render();">我的</div>'
        + '</div>';

    var contentHtml = '';
    if (tab === 'chats') {
        contentHtml = _renderKakaoChatList();
    } else if (tab === 'friends') {
        contentHtml = _renderKakaoFriendList();
    } else {
        contentHtml = _renderKakaoSettings();
    }

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">KakaoTalk</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + tabHtml
        + '<div class="page-content" style="padding:0;">'
        + contentHtml
        + '</div></div>';
}

function _renderKakaoChatList() {
    var html = '';
    var friends = gameState.kakaoFriends;
    // Sort: manager first, then teammates, then others
    friends.sort(function(a, b) {
        if (a.isManager && !b.isManager) return -1;
        if (!a.isManager && b.isManager) return 1;
        if (a.isTeammate && !b.isTeammate) return -1;
        if (!a.isTeammate && b.isTeammate) return 1;
        return 0;
    });
    var hasChats = false;
    for (var i = 0; i < friends.length; i++) {
        var f = friends[i];
        var chats = gameState.kakaoChats[f.name];
        var lastMsg = '';
        var lastTime = '';
        if (chats && chats.length > 0) {
            hasChats = true;
            lastMsg = chats[chats.length - 1].text;
            lastTime = chats[chats.length - 1].time;
        }
        html += '<div class="kakao-friend-item" data-fname="' + f.name + '" onclick="gameState.kakaoCurrentChat=this.dataset.fname;goToPage(\'kakaochat\');">'
            + '<div class="kakao-avatar" style="background:' + f.avatarColor + ';">' + f.name.charAt(0)
            + (f.online ? '<div class="kakao-online-dot"></div>' : '')
            + '</div>'
            + '<div class="kakao-friend-info">'
            + '<div class="kakao-friend-name">' + f.name + (f.isManager ? '<span class="kakao-manager-pill">经纪人</span>' : '') + '</div>'
            + '<div class="kakao-friend-preview">' + (lastMsg || '开始聊天吧') + '</div>'
            + '</div>'
            + '<div class="kakao-friend-time">' + (lastTime || '') + '</div>'
            + '</div>';
    }
    if (!hasChats && friends.length === 0) {
        html = '<div style="text-align:center;padding:60px 20px;color:var(--color-text-light);font-size:14px;">暂无聊天记录</div>';
    }
    return html;
}

function _renderKakaoFriendList() {
    var html = '';
    var friends = gameState.kakaoFriends;
    // Sort: manager first, then teammates, then others
    friends.sort(function(a, b) {
        if (a.isManager && !b.isManager) return -1;
        if (!a.isManager && b.isManager) return 1;
        if (a.isTeammate && !b.isTeammate) return -1;
        if (!a.isTeammate && b.isTeammate) return 1;
        return 0;
    });
    for (var i = 0; i < friends.length; i++) {
        var f = friends[i];
        html += '<div class="kakao-friend-item" data-fname="' + f.name + '" onclick="gameState.kakaoCurrentChat=this.dataset.fname;goToPage(\'kakaochat\');">'
            + '<div class="kakao-avatar" style="background:' + f.avatarColor + ';">' + f.name.charAt(0)
            + (f.online ? '<div class="kakao-online-dot"></div>' : '')
            + '</div>'
            + '<div class="kakao-friend-info">'
            + '<div class="kakao-friend-name">' + f.name + (f.isManager ? '<span class="kakao-manager-pill">经纪人</span>' : f.isTeammate ? '<span class="kakao-manager-pill" style="background:#FFD700;color:#333;">队友</span>' : '<span class="kakao-personality-pill">' + f.specialty + '</span>') + '</div>'
            + '<div style="font-size:11px;color:var(--color-text-light);margin-top:2px;">' + f.nameEn + '</div>'
            + '</div>'
            + '</div>';
    }
    return html;
}

function _renderKakaoSettings() {
    var myName = gameState.player.name || '练习生';
    var html = '<div style="padding:20px;">'
        + '<div class="card" style="text-align:center;padding:24px;">'
        + '<div class="kakao-avatar" style="width:56px;height:56px;font-size:22px;margin:0 auto 12px;background:var(--color-primary);">' + myName.charAt(0) + '</div>'
        + '<div style="font-size:16px;font-weight:700;color:var(--color-text);">' + myName + '</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">KakaoTalk</div>'
        + '</div>'
        + '<div class="card" onclick="_showAddFriendOverlay()" style="cursor:pointer;margin-top:12px;">'
        + '<div style="font-weight:600;">添加好友</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);">添加新的AI好友</div>'
        + '</div>'
        + '</div>';
    return html;
}

function _showAddFriendOverlay() {
    _kakaoAddPersonality = '';
    var overlay = document.createElement('div');
    overlay.className = 'account-overlay';
    overlay.id = 'kakaoAddOverlay';
    overlay.innerHTML = '<div class="account-form-card">'
        + '<h3>添加好友</h3>'
        + '<input class="account-input" id="kakaoAddName" placeholder="输入好友名字" />'
        + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:8px;">选择性格</div>'
        + '<div class="kakao-personality-choices" id="kakaoAddPersonalityChoices">'
        + '<div class="kakao-personality-choice" onclick="_selectAddPersonality(this,\'protective\')">保护型</div>'
        + '<div class="kakao-personality-choice" onclick="_selectAddPersonality(this,\'helpful\')">帮助型</div>'
        + '<div class="kakao-personality-choice" onclick="_selectAddPersonality(this,\'hostile\')">讨厌型</div>'
        + '<div class="kakao-personality-choice" onclick="_selectAddPersonality(this,\'backstabber\')">背刺型</div>'
        + '<div class="kakao-personality-choice" onclick="_selectAddPersonality(this,\'prankster\')">整蛊型</div>'
        + '</div>'
        + '<button class="btn btn-primary" onclick="_doAddFriend()">添加</button>'
        + '<button class="btn btn-secondary" onclick="_closeAddFriendOverlay()" style="margin-top:8px;">取消</button>'
        + '</div>';
    var phoneFrame = document.querySelector('.phone-frame');
    if (phoneFrame) phoneFrame.appendChild(overlay);
}

function _selectAddPersonality(el, p) {
    _kakaoAddPersonality = p;
    var choices = document.getElementById('kakaoAddPersonalityChoices');
    if (choices) {
        var items = choices.querySelectorAll('.kakao-personality-choice');
        for (var i = 0; i < items.length; i++) { items[i].className = 'kakao-personality-choice'; }
    }
    el.className = 'kakao-personality-choice selected';
}

function _closeAddFriendOverlay() {
    var overlay = document.getElementById('kakaoAddOverlay');
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
}

function _doAddFriend() {
    var nameInput = document.getElementById('kakaoAddName');
    var name = nameInput ? nameInput.value.trim() : '';
    if (!name) { showToast('请输入好友名字'); return; }
    if (!_kakaoAddPersonality) { showToast('请选择性格'); return; }
    var colors = ['#FF8FA3','#7EC8E3','#C8A2C8','#98D8AA','#FFD700','#FF6B6B','#4ECDC4','#45B7D1','#F7DC6F','#BB8FCE'];
    var color = colors[Math.floor(Math.random() * colors.length)];
    var personalityMap = { 'protective': '保护型', 'helpful': '帮助型', 'hostile': '讨厌型', 'backstabber': '背刺型', 'prankster': '整蛊型' };
    gameState.kakaoFriends.push({
        name: name,
        nameEn: name,
        personality: _kakaoAddPersonality,
        specialty: personalityMap[_kakaoAddPersonality] || '综合',
        avatarColor: color,
        online: Math.random() > 0.3
    });
    _closeAddFriendOverlay();
    showToast('已添加好友 ' + name);
    render();
}

function renderKakaoChatPage(container) {
    _ensureKakaoState();
    document.getElementById('bottomNav').style.display = 'none';
    document.getElementById('restButtons').style.display = 'none';
    var npcName = gameState.kakaoCurrentChat;
    var npc = null;
    for (var i = 0; i < gameState.kakaoFriends.length; i++) {
        if (gameState.kakaoFriends[i].name === npcName) { npc = gameState.kakaoFriends[i]; break; }
    }
    if (!npc) { goToPage('kakaotalk'); return; }

    var chats = gameState.kakaoChats[npcName] || [];
    var chatHtml = '';
    for (var j = 0; j < chats.length; j++) {
        var msg = chats[j];
        var isMe = msg.from === 'me';
        chatHtml += '<div class="kakao-msg-row ' + (isMe ? 'me' : 'npc') + '">'
            + '<div>'
            + '<div class="kakao-msg-bubble ' + (isMe ? 'me' : 'npc') + '">' + msg.text + '</div>'
            + '<div class="kakao-msg-time">' + msg.time + '</div>'
            + '</div></div>';
    }
    if (chats.length === 0) {
        chatHtml = '<div style="text-align:center;padding:40px 20px;color:var(--color-text-light);font-size:13px;">开始和 ' + npc.name + ' 聊天吧</div>';
    }

    container.innerHTML = '<div class="page active" style="display:flex;flex-direction:column;">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'kakaotalk\')">‹</div>'
        + '<div class="page-title" style="display:flex;align-items:center;">'
        + npc.name + (npc.online ? ' <div class="kakao-online-dot" style="position:static;margin-left:8px;"></div>' : '') + '<span style="font-size:10px;color:var(--color-text-light);margin-left:8px;">AI ' + getAITotalUsageToday() + '/' + getAIMaxTotalToday() + '</span>'
        + '</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="kakao-chat-area" id="kakaoChatArea">' + chatHtml + '</div>'
        + '<div class="kakao-input-bar">'
        + '<input class="kakao-input" id="kakaoMsgInput" placeholder="输入消息..." />'
        + '<button class="kakao-send-btn" onclick="sendKakaoMessage()">'
        + '<svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>'
        + '</button>'
        + '</div></div>';

    setTimeout(function() {
        var area = document.getElementById('kakaoChatArea');
        if (area) area.scrollTop = area.scrollHeight;
    }, 50);
}

function sendKakaoMessage() {
    var input = document.getElementById('kakaoMsgInput');
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;

    var npcName = gameState.kakaoCurrentChat;
    if (!gameState.kakaoChats[npcName]) gameState.kakaoChats[npcName] = [];
    var now = new Date();
    var timeStr = (now.getHours() < 10 ? '0' : '') + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    gameState.kakaoChats[npcName].push({ from: 'me', text: text, time: timeStr });

    input.value = '';

    var npc = null;
    for (var i = 0; i < gameState.kakaoFriends.length; i++) {
        if (gameState.kakaoFriends[i].name === npcName) { npc = gameState.kakaoFriends[i]; break; }
    }

    // Show typing indicator
    var area = document.getElementById('kakaoChatArea');
    if (area) {
        var typingEl = document.createElement('div');
        typingEl.className = 'kakao-msg-row npc';
        typingEl.id = 'kakaoTypingIndicator';
        typingEl.innerHTML = '<div><div class="kakao-msg-bubble npc" style="color:var(--color-text-light);font-style:italic;">对方正在输入...</div></div>';
        area.appendChild(typingEl);
        area.scrollTop = area.scrollHeight;
    }

    var replyDelay = 1000 + Math.floor(Math.random() * 1500);
    setTimeout(function() {
        // Remove typing indicator
        var typing = document.getElementById('kakaoTypingIndicator');
        if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
        
        if (npc) {
            var npcContext = npc.name + '(' + npc.personality + ')';
            getAIReply('kakaotalk', npcContext, text, function(reply) {
                gameState.kakaoChats[npcName].push({ from: 'npc', text: reply, time: timeStr });
                        notifyKakao(npcName, reply.substring(0,30));
                renderKakaoChatPage(document.getElementById('app'));
            });
        }
    }, replyDelay);

    if (area) area.scrollTop = area.scrollHeight;
}

// ==================== ACCOUNT SYSTEM ====================
function _getSaveKey(slot) {
    var user = localStorage.getItem('myIdolCurrentUser');
    var s = (typeof slot === 'number') ? slot : parseInt(slot, 10);
    if (isNaN(s)) s = current存档;
    if (user) return 'myIdolSave_' + user + '_' + s;
    return 'myIdolSave_guest_' + s;
}

function _loadAllSavesForUser() {
    var user = localStorage.getItem('myIdolCurrentUser');
    // 迁移旧格式存档: myIdolSave_用户名 → myIdolSave_用户名_0
    if (user) {
        var oldKey = 'myIdolSave_' + user;
        var oldData = localStorage.getItem(oldKey);
        if (oldData) {
            var newKey = oldKey + '_0';
            var existingNew = localStorage.getItem(newKey);
            var shouldMigrate = true;
            if (existingNew) {
                try {
                    var parsed = JSON.parse(existingNew);
                    if (parsed && parsed.player && parsed.player.name) shouldMigrate = false;
                } catch(e) {}
            }
            if (shouldMigrate) {
                localStorage.setItem(newKey, oldData);
            }
            localStorage.removeItem(oldKey);
        }
    }
    var saves = [null, null, null];
    for (var i = 0; i < 3; i++) {
        var key = user ? ('myIdolSave_' + user + '_' + i) : ('myIdolSave_guest_' + i);
        try {
            var data = localStorage.getItem(key);
            if (data) saves[i] = JSON.parse(data);
        } catch(e) {}
    }
    return saves;
}

function renderSaveSlotPage(container) {
    var saves = _loadAllSavesForUser();
    var currentUser = localStorage.getItem('myIdolCurrentUser');
    var html = '<div class="welcome-container">'
        + '<div class="welcome-logo">My Idol</div>'
        + '<div class="welcome-subtitle">' + currentUser + '</div>'
        + '<div style="width:100%;max-width:280px;margin-top:32px;">'
        + '<div class="section-title" style="text-align:center;margin-bottom:16px;">选择存档</div>';
    for (var i = 0; i < 3; i++) {
        var save = saves[i];
        if (save && save.player && save.player.name) {
            var roleText = save.player.role === 'Trainee' ? '练习生' : '出道爱豆';
            html += '<div class="save-slot occupied" data-i="' + i + '" onclick="_loadSlot(this.dataset.i)">'
                + '<div style="font-weight:600;color:var(--color-text);">存档 ' + (i+1) + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">' + save.player.name + ' | ' + roleText + '</div>'
                + '<div style="font-size:11px;color:var(--color-text-light);">粉丝: ' + (save.fans || 0).toLocaleString() + '</div>'
                + '</div>';
        } else {
            html += '<div class="save-slot empty" data-i="' + i + '" onclick="_startNewSlot(this.dataset.i)">'
                + '<div>空存档 ' + (i+1) + '</div>'
                + '</div>';
        }
    }
    html += '</div>'
        + '<button class="btn btn-outline" style="margin-top:24px;font-size:13px;" onclick="currentPage=\'welcome\';render();">返回</button>'
        + '</div>';
    container.innerHTML = html;
}

function _showRegisterOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'account-overlay';
    overlay.id = 'accountOverlay';
    overlay.innerHTML = '<div class="account-form-card">'
        + '<h3>注册账号</h3>'
        + '<input class="account-input" id="regNickname" placeholder="昵称" maxlength="12" />'
        + '<input class="account-input" id="regPassword" type="password" placeholder="密码(至少4位)" maxlength="20" />'
        + '<input class="account-input" id="regPassword2" type="password" placeholder="确认密码" maxlength="20" />'
        + '<button class="btn btn-primary" onclick="_doRegister()">注册</button>'
        + '<button class="btn btn-secondary" onclick="_closeAccountOverlay()" style="margin-top:8px;">取消</button>'
        + '</div>';
    var phoneFrame = document.querySelector('.phone-frame');
    if (phoneFrame) phoneFrame.appendChild(overlay);
}

function _showLoginOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'account-overlay';
    overlay.id = 'accountOverlay';
    overlay.innerHTML = '<div class="account-form-card">'
        + '<h3>登录账号</h3>'
        + '<input class="account-input" id="loginNickname" placeholder="昵称" maxlength="12" />'
        + '<input class="account-input" id="loginPassword" type="password" placeholder="密码" maxlength="20" />'
        + '<button class="btn btn-primary" onclick="_doLogin()">登录</button>'
        + '<button class="btn btn-secondary" onclick="_closeAccountOverlay()" style="margin-top:8px;">取消</button>'
        + '</div>';
    var phoneFrame = document.querySelector('.phone-frame');
    if (phoneFrame) phoneFrame.appendChild(overlay);
}

function _closeAccountOverlay() {
    var overlay = document.getElementById('accountOverlay');
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
}

function _doRegister() {
    var nick = document.getElementById('regNickname');
    var pwd = document.getElementById('regPassword');
    var pwd2 = document.getElementById('regPassword2');
    var nickname = nick ? nick.value.trim() : '';
    var password = pwd ? pwd.value : '';
    var password2 = pwd2 ? pwd2.value : '';
    if (!nickname) { showToast('请输入昵称'); return; }
    if (password.length < 4) { showToast('密码至少4位'); return; }
    if (password !== password2) { showToast('两次密码不一致'); return; }
    var existing = localStorage.getItem('myIdolAccount_' + nickname);
    if (existing) { showToast('该昵称已注册'); return; }
    localStorage.setItem('myIdolAccount_' + nickname, JSON.stringify({ nickname: nickname, password: password, created: new Date().toISOString() }));
    localStorage.setItem('myIdolCurrentUser', nickname);
    localStorage.setItem('myIdolLastUser', nickname);
    _closeAccountOverlay();
    showToast('注册成功');
    currentPage = 'welcome';
    render();
    _checkAdmin(nickname);
}

function _doLogin() {
    var nick = document.getElementById('loginNickname');
    var pwd = document.getElementById('loginPassword');
    var nickname = nick ? nick.value.trim() : '';
    var password = pwd ? pwd.value : '';
    if (!nickname || !password) { showToast('请输入昵称和密码'); return; }
    var data = localStorage.getItem('myIdolAccount_' + nickname);
    if (!data) { showToast('账号不存在'); return; }
    var account = JSON.parse(data);
    if (account.password !== password) { showToast('密码错误'); return; }
    localStorage.setItem('myIdolCurrentUser', nickname);
    localStorage.setItem('myIdolLastUser', nickname);
    _closeAccountOverlay();
    showToast('登录成功');
    currentPage = 'welcome';
    render();
}

function _doLogout() {
    showModal('退出登录', '确定要退出当前账号吗？存档会自动保存。', [
        { text: '取消', action: closeModal },
        { text: '退出', action: function() {
            closeModal();
            saveGame(current存档);
            if (autoSaveTimer) { clearInterval(autoSaveTimer); autoSaveTimer = null; }
            localStorage.removeItem('myIdolCurrentUser');
            Object.assign(gameState, JSON.parse(JSON.stringify(_defaultGameState)));
            gameState.player = {
                name: '', gender: '', birthDate: '', age: 0,
                personality: [], company: '', group: '', groups: [],
                positions: [], role: '', avatar: ''
            };
            currentPage = 'welcome';
            document.getElementById('statusBar').style.display = 'none';
            document.getElementById('restButtons').style.display = 'none';
            document.getElementById('bottomNav').style.display = 'none';
            document.getElementById('homeIndicator').style.display = 'none';
            render();
        }}
    ]);
}


function renderLoggedInPage(container) {
    var currentUser = localStorage.getItem('myIdolCurrentUser');
    var saves = _loadAllSavesForUser();
    var hasAnySave = false;
    for (var i = 0; i < 3; i++) {
        if (saves[i] && saves[i].player && saves[i].player.name) { hasAnySave = true; break; }
    }
    var html = '<div class="welcome-container">'
        + '<div class="welcome-logo">My Idol</div>'
        + '<div class="welcome-subtitle">' + currentUser + '</div>'
        + '<div style="width:100%;max-width:280px;margin-top:32px;">';
    if (hasAnySave) {
        html += '<button class="btn btn-primary btn-lg" style="width:100%;margin-bottom:12px;" onclick="renderSaveSlotPage(document.getElementById(\'app\'))">继续游戏</button>';
    }
    html += '<button class="btn btn-outline btn-lg" style="width:100%;margin-bottom:24px;" onclick="_createNewCharacter()">创建角色</button>';
    if (hasAnySave) {
        html += '<div class="section-title" style="text-align:center;margin-bottom:12px;">存档</div>';
        for (var i = 0; i < 3; i++) {
            var save = saves[i];
            if (save && save.player && save.player.name) {
                var roleText = save.player.role === 'Trainee' ? '练习生' : '出道爱豆';
                html += '<div class="save-slot occupied" data-i="' + i + '" onclick="_loadSlot(this.dataset.i)">'
                    + '<div style="font-weight:600;color:var(--color-text);">存档 ' + (i+1) + '</div>'
                    + '<div style="font-size:12px;color:var(--color-text-light);">' + save.player.name + ' | ' + roleText + '</div>'
                    + '<div style="font-size:11px;color:var(--color-text-light);">粉丝: ' + (save.fans || 0).toLocaleString() + '</div>'
                    + '</div>';
            } else {
                html += '<div class="save-slot empty" data-i="' + i + '" onclick="_startNewSlot(this.dataset.i)">'
                    + '<div>空存档 ' + (i+1) + '</div>'
                    + '</div>';
            }
        }
    }
    html += '</div>'
        + '<button class="btn btn-outline" style="margin-top:24px;font-size:13px;" onclick="_doLogout()">退出登录</button>'
        + '</div>';
    container.innerHTML = html;
}

function _createNewCharacter() {
    var saves = _loadAllSavesForUser();
    var emptySlot = -1;
    for (var i = 0; i < 3; i++) {
        if (!saves[i] || !saves[i].player || !saves[i].player.name) { emptySlot = i; break; }
    }
    if (emptySlot === -1) {
        showModal('存档已满', '3个存档槽位都已使用，请先删除一个存档', [
            { text: '知道了', action: closeModal }
        ]);
        return;
    }
    _startNewSlot(emptySlot);
}

function _loadSlot(slot) {
    slot = parseInt(slot, 10);
    var key = _getSaveKey(slot);
    var data = localStorage.getItem(key);
    if (data) {
        try {
            Object.assign(gameState, JSON.parse(data));
            _ensureV16Fields();
            _checkAdmin(localStorage.getItem('myIdolCurrentUser'));
            current存档 = slot;
            currentPage = 'home';
            document.getElementById('statusBar').style.display = 'flex';
            document.getElementById('restButtons').style.display = 'flex';
            document.getElementById('bottomNav').style.display = 'flex';
            document.getElementById('homeIndicator').style.display = 'block';
            render();
            renderBottomNav();
            startAutoSave();
        } catch(e) {
            showToast('存档读取失败');
        }
    }
}

function _startNewSlot(slot) {
    slot = parseInt(slot, 10);
    current存档 = slot;
    creationStep = 1;
    Object.assign(gameState, JSON.parse(JSON.stringify(_defaultGameState)));
    _ensureV16Fields();
    gameState.player = {
        name: '',
        gender: '',
        birthDate: '',
        age: 0,
        personality: [],
        company: '',
        group: '',
        groups: [],
        positions: [],
        role: '',
        avatar: ''
    };
    currentPage = 'create';
    document.getElementById('statusBar').style.display = 'none';
    document.getElementById('restButtons').style.display = 'none';
    document.getElementById('bottomNav').style.display = 'none';
    document.getElementById('homeIndicator').style.display = 'none';
    render();
}

function renderWelcomeAccountPage(container) {
    var lastUser = localStorage.getItem('myIdolLastUser');
    var hasLastSave = false;
    if (lastUser) {
        var saveKey = 'myIdolSave_' + lastUser;
        if (localStorage.getItem(saveKey)) hasLastSave = true;
    }
    var html = '<div class="welcome-account">'
        + '<div class="welcome-account-title">My Idol</div>'
        + '<div class="welcome-account-sub">韩娱爱豆模拟器</div>';
    if (hasLastSave) {
        html += '<div class="card" style="margin:16px 0;padding:16px;text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;cursor:pointer;" onclick="_quickLogin()">'
            + '<div style="font-size:12px;opacity:0.8;">上次登录</div>'
            + '<div style="font-size:18px;font-weight:700;margin:4px 0;">' + lastUser + '</div>'
            + '<div style="font-size:12px;opacity:0.7;">点击继续游戏</div>'
            + '</div>';
    }
    html += '<div class="account-btn-group">'
        + '<button class="btn btn-primary btn-lg" onclick="_showRegisterOverlay()">注册新账号</button>'
        + '<button class="btn btn-outline btn-lg" onclick="_showLoginOverlay()">登录已有账号</button>'
        + '</div>'
        + '<div class="account-footer">每个账号3个存档，注册新号即可开新局</div>'
        + '</div>';
    container.innerHTML = html;
}

function _quickLogin() {
    var lastUser = localStorage.getItem('myIdolLastUser');
    if (!lastUser) return;
    localStorage.setItem('myIdolCurrentUser', lastUser);
    currentPage = 'welcome';
    render();
}

// ==================== AUTO SAVE ====================
var autoSaveTimer = null;

function _doAutoSave(silent) {
    if (gameState.player.name && currentPage !== 'welcome') {
        try {
            var saveData = {};
            var keys = Object.keys(gameState);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] !== 'restTimeout') saveData[keys[i]] = gameState[keys[i]];
            }
            localStorage.setItem(_getSaveKey(current存档), JSON.stringify(saveData));
            if (!silent) showToast('已自动存档');
        } catch(e) {}
    }
}

function triggerAutoSave() { _doAutoSave(false); }
function triggerSilentSave() { _doAutoSave(true); }

function startAutoSave() {
    if (autoSaveTimer) clearInterval(autoSaveTimer);
    autoSaveTimer = setInterval(function() { _doAutoSave(false); }, 120000);
}

window.addEventListener('beforeunload', function(e) {
    if (gameState.player.name && currentPage !== 'welcome' && currentPage !== 'create') {
        triggerSilentSave();
        e.preventDefault();
        e.returnValue = '游戏进度已自动保存，确定离开吗？';
    }
});
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden' && gameState.player.name && currentPage !== 'welcome') {
        triggerSilentSave();
    }
    if (document.visibilityState === 'visible' && gameState.player.name && currentPage !== 'welcome' && currentPage !== 'create') {
        render();
    }
});

// ==================== INIT ====================
// ==================== GLOBAL ERROR HANDLER ====================
window.onerror = function(msg, url, line) {
    console.error('Global error:', msg, line);
    try {
        var app = document.getElementById('app');
        if (app) app.innerHTML = '<div style="padding:40px;text-align:center;"><div style="font-size:18px;color:#FF6B8A;margin-bottom:12px;">出了点问题</div><div style="font-size:12px;color:#8E8E93;margin-bottom:16px;">' + (msg || '') + '</div><button onclick="goToPage(\'home\')" style="padding:12px 24px;background:#FF8FA3;color:white;border:none;border-radius:50px;font-size:14px;cursor:pointer;">返回首页</button></div>';
    } catch(e2) {}
    return true;
};

// ==================== DEBUT PLAN APP ====================
function render出道企划Page(container) {
    if (gameState.player.role === 'Idol') {
        container.innerHTML = '<div class="page active">'
            + '<div class="page-header">'
            + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
            + '<div class="page-title">出道企划</div>'
            + '<div style="width:32px;"></div>'
            + '</div>'
            + '<div class="page-content" style="text-align:center;padding:60px 20px;">'
            + '<div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">'
            + '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon></svg>'
            + '</div>'
            + '<div style="font-size:20px;font-weight:700;color:var(--color-primary);">已出道</div>'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-top:8px;">' + gameState.player.group + ' / ' + gameState.player.positions.join(' / ') + '</div>'
            + '</div></div>';
        return;
    }

    var stats = gameState.stats;
    var avg = Math.round((stats.dance + stats.vocal + stats.rap + stats.acting + stats.variety) / 5);
    var canKick = avg >= 140;
    var requirements = [
        { label: '舞蹈', value: stats.dance, need: 120 },
        { label: '声乐', value: stats.vocal, need: 120 },
        { label: '说唱', value: stats.rap, need: 120 },
        { label: '表演', value: stats.acting, need: 120 },
        { label: '综艺', value: stats.variety, need: 120 },
        { label: '粉丝', value: gameState.fans, need: 5000 },
        { label: '名气', value: (gameState.fame || 30), need: 100 },
        { label: '影响力', value: (gameState.influence || 50), need: 100 },
        { label: '综合考核', value: (gameState.preDebut ? 1 : 0), need: 1 }
    ];

    var loanWarning = (gameState.loanAmount > 0 && gameState.loanInterest >= 5) ? '<div style="background:#FFF3E0;border-radius:12px;padding:12px;margin-bottom:12px;font-size:12px;color:#E65100;line-height:1.5;"><strong>商业贷款提醒：</strong>当前存在商业贷款未还清，可能影响出道时的团体分配结果。</div>' : '';
    var allMet = true;
    var reqHtml = loanWarning;
    for (var ri = 0; ri < requirements.length; ri++) {
        var r = requirements[ri];
        var met = r.value >= r.need;
        if (!met) allMet = false;
        var valText = r.label === '综合考核' ? (met ? '已通过' : '未通过') : r.value;
        reqHtml += '<div class="debut-req-item">'
            + '<div class="debut-req-check ' + (met ? 'pass' : 'fail') + '">' + (met ? '✓' : '!') + '</div>'
            + '<div class="debut-req-label">' + r.label + '</div>'
            + '<div class="debut-req-val ' + (met ? 'pass' : 'fail') + '">' + valText + ' / ' + r.need + '</div>'
            + '</div>';
    }

    var actionHtml = '';
    if (allMet && gameState.player.role === 'Trainee') {
        actionHtml = '<div class="card" style="text-align:center;padding:20px;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;cursor:pointer;" onclick="startDebutFlow()">'
            + '<div style="font-size:18px;font-weight:700;">申请出道</div>'
            + '<div style="font-size:12px;opacity:0.8;margin-top:4px;">所有条件已满足</div>'
            + '</div>';
        if (canKick) {
            actionHtml += '<div class="card" style="text-align:center;padding:20px;background:linear-gradient(135deg,#2D2D2D,#555);color:white;cursor:pointer;margin-top:8px;" onclick="startKickFlow()">'
                + '<div style="font-size:18px;font-weight:700;">Direct Selection</div>'
                + '<div style="font-size:12px;opacity:0.8;margin-top:4px;">能力均分' + avg + ' · 自选团队 · 替换成员</div>'
                + '<div style="font-size:10px;opacity:0.6;margin-top:4px;">POWER MODE</div>'
                + '</div>';
        }
    } else if (!allMet) {
        actionHtml = '<div style="text-align:center;padding:16px;color:var(--color-text-light);font-size:13px;">尚有条件未满足，继续加油</div>';
    }

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">出道企划</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;padding:20px;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">出道要求</div>'
        + '<div style="font-size:16px;font-weight:700;margin-top:4px;">Debut Project</div>'
        + '</div>'
        + '<div class="card">' + reqHtml + '</div>'
        + actionHtml
        + '</div></div>';
}

function startDebutFlow() {
    gameState.debutStep = 1;
    gameState.debutResult = null;
    currentPage = 'debutdialog';
    render();
}

function startKickFlow() {
    gameState.debutStep = 100;
    gameState.debutResult = null;
    currentPage = 'debutdialog';
    render();
}

function render出道DialogPage(container) {
    var step = gameState.debutStep;
    var result = gameState.debutResult;
    var playerName = gameState.player.name;
    var company = COMPANIES[gameState.player.company];

    if (step >= 100) {
        _renderKickFlow(container, step, company);
        return;
    }

    var dialogs = [];
    var btnsHtml = '';

    if (step === 1) {
        dialogs = [
            { speaker: '经纪人 李秀珍', text: playerName + '，听说你准备申请出道了？', isManager: true },
            { speaker: '经纪人 李秀珍', text: '出道不是一件简单的事，你确定准备好了吗？', isManager: true }
        ];
        btnsHtml = '<button class="btn btn-primary btn-lg" onclick="advanceDebutStep(2)" style="width:100%;">我准备好了</button>';
    } else if (step === 2) {
        var stats = gameState.stats;
        var reportHtml = '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">'
            + '<div style="padding:6px 12px;background:#FFE4EC;border-radius:50px;font-size:12px;font-weight:600;color:#FF8FA3;">舞蹈 ' + stats.dance + '</div>'
            + '<div style="padding:6px 12px;background:#E4F5FF;border-radius:50px;font-size:12px;font-weight:600;color:#5BB8E8;">声乐 ' + stats.vocal + '</div>'
            + '<div style="padding:6px 12px;background:#FFF4E0;border-radius:50px;font-size:12px;font-weight:600;color:#F0A030;">说唱 ' + stats.rap + '</div>'
            + '<div style="padding:6px 12px;background:#F0E4FF;border-radius:50px;font-size:12px;font-weight:600;color:#A070E0;">表演 ' + stats.acting + '</div>'
            + '<div style="padding:6px 12px;background:#E8FFE4;border-radius:50px;font-size:12px;font-weight:600;color:#4CAF50;">综艺 ' + stats.variety + '</div>'
            + '</div>'
            + '<div style="margin-top:10px;font-size:12px;color:var(--color-text-light);">粉丝 ' + gameState.fans + ' · 名气 ' + (gameState.fame || 30) + ' · 影响力 ' + (gameState.influence || 50) + '</div>';
        dialogs = [
            { speaker: '经纪人 李秀珍', text: '让我看看你的成绩单...', isManager: true },
            { speaker: '成绩单', text: reportHtml, isManager: false },
            { speaker: '经纪人 李秀珍', text: '嗯...成绩还不错。我现在就替你提交出道申请。', isManager: true }
        ];
        btnsHtml = '<button class="btn btn-primary btn-lg" onclick="advanceDebutStep(3)" style="width:100%;">提交出道申请</button>';
    } else if (step === 3) {
        if (result === null) {
            var passChance = Math.random();
            if (passChance < 0.2) {
                gameState.debutResult = 'fail';
            } else {
                gameState.debutResult = 'pass';
            }
            result = gameState.debutResult;
        }
        if (result === 'fail') {
            var failReasons = ['公司高层认为你的综合实力还需要继续打磨', '本次出道名额已满，需要等待下一次机会', '评审团对你的舞台表现力评分未达标', '出道计划暂时调整，申请被搁置'];
            var reason = failReasons[Math.floor(Math.random() * failReasons.length)];
            dialogs = [
                { speaker: '经纪人 李秀珍', text: playerName + '，出道申请的结果出来了...', isManager: true },
                { speaker: '经纪人 李秀珍', text: '很遗憾，这次没有通过。', isManager: true },
                { speaker: '经纪人 李秀珍', text: reason + '。别灰心，继续努力，下次一定能行。', isManager: true }
            ];
            btnsHtml = '<button class="btn btn-primary btn-lg" onclick="goToPage(\'debut\')" style="width:100%;">我知道了</button>';
        } else {
            dialogs = [
                { speaker: '经纪人 李秀珍', text: playerName + '！！', isManager: true },
                { speaker: '经纪人 李秀珍', text: '恭喜你！出道申请通过了！', isManager: true },
                { speaker: '经纪人 李秀珍', text: '现在需要你签字确认，正式出道！', isManager: true }
            ];
            btnsHtml = '<button class="btn btn-primary btn-lg" onclick="advanceDebutStep(4)" style="width:100%;">签字确认</button>';
        }
    } else if (step === 4) {
        _completeDebut();
        var group = gameState.player.group;
        var positions = gameState.player.positions.join(' / ');
        dialogs = [
            { speaker: '出道通知书', text: '<div style="text-align:center;padding:12px;">'
                + '<div style="font-size:20px;font-weight:700;color:var(--color-primary);margin-bottom:8px;">DEBUT NOTICE</div>'
                + '<div style="font-size:14px;margin-bottom:4px;">' + playerName + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">正式作为</div>'
                + '<div style="font-size:16px;font-weight:700;color:var(--color-text);margin:6px 0;">' + group + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">成员出道</div>'
                + '<div style="font-size:14px;font-weight:600;color:var(--color-primary);margin-top:8px;">' + positions + '</div>'
                + '</div>', isManager: false }
        ];
        btnsHtml = '<button class="btn btn-primary btn-lg" onclick="goToPage(\'home\')" style="width:100%;">太好了！</button>';
    }

    var dialogsHtml = '';
    for (var di = 0; di < dialogs.length; di++) {
        dialogsHtml += '<div class="debut-dialog-bubble ' + (dialogs[di].isManager ? 'manager' : '') + '">'
            + '<div class="debut-dialog-speaker">' + dialogs[di].speaker + '</div>'
            + '<div class="debut-dialog-text">' + dialogs[di].text + '</div>'
            + '</div>';
    }

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'debut\')">‹ 出道企划</div>'
        + '<div class="page-title">出道流程</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">Step ' + Math.min(step, 4) + ' / 4</div>'
        + '</div>'
        + dialogsHtml
        + '<div style="margin-top:16px;">' + btnsHtml + '</div>'
        + '</div></div>';
}

function advanceDebutStep(nextStep) {
    gameState.debutStep = nextStep;
    render();
}

function _completeDebut() {
    if (gameState.player.role === 'Idol') return;
    gameState.player.role = 'Idol';
        if(typeof checkAchievements==='function') checkAchievements();
    var company = COMPANIES[gameState.player.company];
    var hasBusinessLoan = (gameState.loanAmount > 0 && gameState.loanInterest >= 5);
    if (!gameState.player.group) {
        var _company = COMPANIES[gameState.player.company]; var _selGroupKey = null; if (gameState.player.groups && gameState.player.groups.length > 0) { if (gameState.player.groups.length === 1) { _selGroupKey = gameState.player.groups[0]; } else { var _randIdx = Math.floor(Math.random() * gameState.player.groups.length); _selGroupKey = gameState.player.groups[_randIdx]; } } gameState.player.group = _selGroupKey && _company && _company.groups[_selGroupKey] ? _company.groups[_selGroupKey].name : gameState.player.name + '\u7684\u56e2\u4f53';
    }
    gameState.player.originalGroup = true;
    if (!gameState.player.group) gameState.player.group = gameState.player.name + '的团体';
    gameState.player.originalGroup = true;

    var gpBase = { 'SM Entertainment': 80, 'YG Entertainment': 70, 'JYP Entertainment': 60, 'HYBE': 90, 'SEONGWOO ENT': 40 };
    gameState.groupPopularity = gpBase[gameState.player.company] || 50;

    gameState.emails.unshift({
        title: '正式出道通知书',
        from: (company && company.name || gameState.player.company) + ' 经纪部',
        content: '正式通知\n\n' + gameState.player.name + '：\n\n恭喜你正式出道！\n\n团名：' + gameState.player.group + '\n定位：' + gameState.player.positions.join(' / ') + '\n\n请于本周内完成出道舞台准备工作。\n\n——经纪部',
        time: new Date().toLocaleDateString('zh-CN'),
        read: false
    });

    _modalActions = [];
    showModal('出道成功', '恭喜 ' + gameState.player.name + '！\n\n你已正式作为 ' + gameState.player.group + ' 成员出道！\n\n如需再次查看，请到邮箱查看正式出道通知书。');
}

// ==================== KICK FLOW (POWER MODE) ====================
function _renderKickFlow(container, step, company) {
    if (!company) { goToPage('debut'); return; }
    var groupKeys = Object.keys(company.groups);
    var validGroups = [];
    if (gameState.player.groups && gameState.player.groups.length > 0) {
        for (var vgi = 0; vgi < gameState.player.groups.length; vgi++) {
            if (company.groups[gameState.player.groups[vgi]]) validGroups.push(gameState.player.groups[vgi]);
        }
    }
    if (validGroups.length === 0) validGroups = groupKeys;

    if (step === 100) {
        var groupsHtml = '';
        for (var gki = 0; gki < validGroups.length; gki++) {
            var gk = validGroups[gki];
            var g = company.groups[gk];
            groupsHtml += '<div class="card" data-gk="' + gk + '" onclick="selectKickGroup(this.dataset.gk)" style="cursor:pointer;">'
                + '<div style="font-weight:600;font-size:15px;color:var(--color-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + g.name + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);margin-top:4px;">' + g.desc + '</div>'
                + '<div style="font-size:11px;color:var(--color-text-light);margin-top:4px;">' + g.members.length + '名成员</div>'
                + '</div>';
        }
        container.innerHTML = '<div class="page active">'
            + '<div class="page-header">'
            + '<div class="back-btn" onclick="goToPage(\'debut\')">‹ 出道企划</div>'
            + '<div class="page-title" style="color:#2D2D2D;">Direct Selection</div>'
            + '<div style="width:32px;"></div>'
            + '</div>'
            + '<div class="page-content">'
            + '<div class="card" style="text-align:center;padding:20px;background:linear-gradient(135deg,#2D2D2D,#555);color:white;">'
            + '<div style="font-size:12px;opacity:0.6;">POWER MODE</div>'
            + '<div style="font-size:18px;font-weight:700;margin-top:4px;">选择目标团队</div>'
            + '<div style="font-size:12px;opacity:0.7;margin-top:4px;">你将以绝对实力加入所选团队</div>'
            + '</div>'
            + groupsHtml
            + '</div></div>';
    } else if (step === 101) {
        var targetGroup = gameState.debutResult;
        var group = company.groups[targetGroup];
        if (!group) { goToPage('debut'); return; }
        var membersHtml = '';
        for (var mi = 0; mi < group.members.length; mi++) {
            var m = group.members[mi];
            _modalActions = [];
            membersHtml += '<div class="card" data-mi="' + mi + '" onclick="_selectKickMember(this.dataset.mi)" style="cursor:pointer;">'
                + '<div style="display:flex;align-items:center;">'
                + '<div class="avatar" style="width:36px;height:36px;font-size:14px;margin-right:10px;">' + m.name.charAt(0) + '</div>'
                + '<div style="flex:1;">'
                + '<div style="font-weight:600;font-size:14px;">' + m.name + '</div>'
                + '<div style="font-size:12px;color:var(--color-text-light);">' + m.position + '</div>'
                + '</div>'
                + '<div style="color:var(--color-danger);font-size:12px;font-weight:600;">REMOVE</div>'
                + '</div></div>';
        }
        container.innerHTML = '<div class="page active">'
            + '<div class="page-header">'
            + '<div class="back-btn" onclick="advanceDebutStep(100)">‹ 选团</div>'
            + '<div class="page-title" style="color:#2D2D2D;">Direct Selection</div>'
            + '<div style="width:32px;"></div>'
            + '</div>'
            + '<div class="page-content">'
            + '<div class="card" style="text-align:center;padding:16px;background:linear-gradient(135deg,#2D2D2D,#555);color:white;">'
            + '<div style="font-size:12px;opacity:0.6;">POWER MODE</div>'
            + '<div style="font-size:16px;font-weight:700;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + group.name + '</div>'
            + '<div style="font-size:12px;opacity:0.7;margin-top:4px;">选择要替换的成员</div>'
            + '</div>'
            + membersHtml
            + '</div></div>';
    } else if (step === 102) {
        var targetGroup2 = gameState.debutResult;
        var group2 = company.groups[targetGroup2];
        if (!group2) { goToPage('debut'); return; }
        var kickIdx = gameState.kickMemberIndex || 0;
        var kickedMember = group2.members[kickIdx];

        container.innerHTML = '<div class="page active">'
            + '<div class="page-header">'
            + '<div class="back-btn" onclick="advanceDebutStep(101)">‹ 选成员</div>'
            + '<div class="page-title" style="color:#2D2D2D;">Direct Selection</div>'
            + '<div style="width:32px;"></div>'
            + '</div>'
            + '<div class="page-content" style="text-align:center;">'
            + '<div class="card" style="padding:24px;background:linear-gradient(135deg,#2D2D2D,#555);color:white;">'
            + '<div style="font-size:12px;opacity:0.6;">POWER MODE</div>'
            + '<div style="font-size:18px;font-weight:700;margin-top:8px;">确认替换</div>'
            + '</div>'
            + '<div class="card" style="margin-top:12px;">'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:12px;">将以下成员移出 ' + group2.name + '</div>'
            + '<div style="display:flex;align-items:center;justify-content:center;margin-bottom:16px;">'
            + '<div class="avatar" style="width:48px;height:48px;font-size:18px;background:var(--color-danger);">' + kickedMember.name.charAt(0) + '</div>'
            + '<div style="margin-left:12px;text-align:left;">'
            + '<div style="font-weight:600;">' + kickedMember.name + '</div>'
            + '<div style="font-size:12px;color:var(--color-text-light);">' + kickedMember.position + '</div>'
            + '</div></div>'
            + '<div style="font-size:13px;color:var(--color-text-light);margin-bottom:12px;">你将以 ' + gameState.player.positions[0] + ' 身份加入</div>'
            + '</div>'
            + '<div style="display:flex;gap:8px;margin-top:16px;">'
            + '<button class="btn btn-secondary btn-lg" onclick="advanceDebutStep(101)" style="flex:1;">取消</button>'
            + '<button class="btn btn-primary btn-lg" onclick="confirmKick()" style="flex:1;background:linear-gradient(135deg,#2D2D2D,#555);">确认替换</button>'
            + '</div>'
            + '</div></div>';
    }
}

function selectKickGroup(groupKey) {
    gameState.debutResult = groupKey;
    gameState.debutStep = 101;
    render();
}

function _selectKickMember(index) {
    gameState.kickMemberIndex = index;
    gameState.debutStep = 102;
    render();
}

function confirmKick() {
    var company = COMPANIES[gameState.player.company];
    if (!company) return;
    var targetGroup = gameState.debutResult;
    var group = company.groups[targetGroup];
    if (!group) return;
    var kickIdx = gameState.kickMemberIndex || 0;
    var kickedMember = group.members[kickIdx];

    if (gameState.kakaoChats && kickedMember) {
        if (!gameState.kakaoChats[kickedMember.name]) gameState.kakaoChats[kickedMember.name] = [];
        gameState.kakaoChats[kickedMember.name].push({
            from: kickedMember.name,
            text: '...你居然这样对我。我不会忘记的。',
            time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        });
    }

    gameState.player.role = 'Idol';
    gameState.player.group = targetGroup;
    var newMembers = [];
    for (var mii = 0; mii < group.members.length; mii++) {
        if (mii !== kickIdx) newMembers.push(group.members[mii].name);
    }
    newMembers.push(gameState.player.name);
    gameState.teamMembers = newMembers;
    gameState.debutStep = 4;
    var gpBase2 = { 'SM Entertainment': 80, 'YG Entertainment': 70, 'JYP Entertainment': 60, 'HYBE': 90, 'SEONGWOO ENT': 40 };
    gameState.groupPopularity = gpBase2[gameState.player.company] || 50;

    gameState.emails.unshift({
        title: '出道通知书 - Direct Selection',
        from: (company.name || gameState.player.company) + ' 经纪部',
        content: '正式通知\n\n' + gameState.player.name + '：\n\n你已通过Direct Selection正式出道！\n\n团名：' + targetGroup + '\n定位：' + gameState.player.positions.join(' / ') + '\n\n注：原成员 ' + kickedMember.name + ' 已调离该团队。\n\n——经纪部',
        time: new Date().toLocaleDateString('zh-CN'),
        read: false
    });

    _modalActions = [];
    showModal('出道成功', gameState.player.name + '，你以绝对实力加入了 ' + targetGroup + '！\n\n替换了 ' + kickedMember.name + ' 的位置。\n\n如需再次查看，请到邮箱查看正式出道通知书。');
    currentPage = 'home';
    render();
}

// ==================== EARN CENTER APP ====================
function render赚钱中心Page(container) {
    if (!gameState.earnCooldowns) gameState.earnCooldowns = {};
    var isIdol = gameState.player.role === 'Idol';
    var isGroup = isIdol && gameState.player.group && gameState.player.group !== '';

    var traineeJobs = [
        { id: 'magazine', name: '拍杂志', 体力: 15, money: 2000, fame: 3, influence: 0, fans: 5, cooldown: 30 },
        { id: 'busking', name: '路演', 体力: 20, money: 1500, fame: 5, influence: 0, fans: 15, cooldown: 45 },
        { id: 'backup', name: '伴舞', 体力: 25, money: 3000, fame: 0, influence: 2, fans: 8, cooldown: 60 },
        { id: 'convenience', name: '便利店打工', 体力: 10, money: 800, fame: 0, influence: 0, fans: 1, cooldown: 30 },
        { id: 'cafe', name: '咖啡店兼职', 体力: 10, money: 900, fame: 0, influence: 0, fans: 1, cooldown: 30 },
        { id: 'street', name: '街头表演', 体力: 15, money: 1200, fame: 5, influence: 0, fans: 10, cooldown: 45 }
    ];
    var soloJobs = [
        { id: 'solo_cf', name: '品牌代言', 体力: 20, money: 50000, fame: 10, influence: 5, fans: 50, cooldown: 90, fansRequired: 50000 },
        { id: 'solo_variety', name: '个人综艺', 体力: 25, money: 30000, fame: 8, influence: 3, fans: 30, cooldown: 90, fansRequired: 10000 },
        { id: 'solo_live', name: '个人直播', 体力: 10, money: 15000, fame: 5, influence: 0, fans: 20, cooldown: 45 },
        { id: 'solo_single', name: 'Solo单曲', 体力: 30, money: 40000, fame: 10, influence: 8, fans: 80, cooldown: 120 },
        { id: 'solo_pictorial', name: '个人写真', 体力: 15, money: 20000, fame: 5, influence: 0, fans: 15, cooldown: 60 },
        { id: 'brand_ambassador', name: '品牌大使', 体力: 20, money: 80000, fame: 15, influence: 10, fans: 100, cooldown: 120, fansRequired: 100000 }
    ];
    var groupJobs = [
        { id: 'group_cf', name: '团体代言', 体力: 20, money: 40000, fame: 8, influence: 5, fans: 40, cooldown: 90 },
        { id: 'group_variety', name: '团综录制', 体力: 25, money: 25000, fame: 6, influence: 4, fans: 25, cooldown: 90 },
        { id: 'group_pictorial', name: '团体写真', 体力: 15, money: 15000, fame: 5, influence: 0, fans: 12, cooldown: 60 },
        { id: 'group_album', name: '团体专辑', 体力: 30, money: 60000, fame: 12, influence: 10, fans: 60, cooldown: 120 },
        { id: 'group_live', name: '团体直播', 体力: 10, money: 10000, fame: 4, influence: 0, fans: 18, cooldown: 45 }
    ];

    function buildJobsHtml(jobs) {
        var html = '';
        var currentFans = gameState.fans || 0;
        for (var ji = 0; ji < jobs.length; ji++) {
            var j = jobs[ji];
            var cd = gameState.earnCooldowns[j.id] || 0;
            var now = Date.now();
            var isOnCd = cd > now;
            var noStamina = gameState.体力 < j.体力;
            var fansLocked = j.fansRequired && currentFans < j.fansRequired;
            var isDisabled = isOnCd || noStamina || fansLocked;
            var rewardText = '+' + j.money.toLocaleString() + ' 金币';
            if (j.fame > 0) rewardText += '  +' + j.fame + ' 名气';
            if (j.influence > 0) rewardText += '  +' + j.influence + ' 影响力';
            if (j.fans > 0) rewardText += '  +' + j.fans + ' 粉丝';
            var lockText = '';
            if (fansLocked) {
                lockText = '<div class="earn-job-cooldown" style="color:var(--color-danger);">' + (j.fansRequired >= 10000 ? (j.fansRequired / 10000) + '万' : j.fansRequired) + '粉丝解锁</div>';
            } else if (isOnCd) {
                var remain = Math.ceil((cd - now) / 1000);
                lockText = '<div class="earn-job-cooldown">冷却中 ' + remain + 's</div>';
            }
            html += '<div class="earn-job-card ' + (isDisabled ? 'disabled' : '') + '" ' + (isDisabled ? '' : 'onclick="doEarnJob(\'' + j.id + '\')"') + '>'
                + '<div class="earn-job-name">' + j.name + '</div>'
                + '<div class="earn-job-cost">体力 -' + j.体力 + '</div>'
                + '<div class="earn-job-reward">' + rewardText + '</div>'
                + lockText
                + '</div>';
        }
        return html;
    }

    var currentTab = gameState.earnTab || 'common';
    var canSolo = isIdol;
    var canGroup = isIdol && isGroup;

    var tabs = [
        { id: 'common', name: '通用', locked: false },
        { id: 'solo', name: '个人', locked: !canSolo },
        { id: 'group', name: '团队', locked: !canGroup }
    ];

    if (currentTab === 'solo' && !canSolo) currentTab = 'common';
    if (currentTab === 'group' && !canGroup) currentTab = 'common';
    gameState.earnTab = currentTab;

    var tabsHtml = '<div class="earn-tab-bar">';
    for (var ti = 0; ti < tabs.length; ti++) {
        var t = tabs[ti];
        var cls = 'earn-tab';
        if (t.id === currentTab) cls += ' active';
        if (t.locked) cls += ' locked';
        var onclick = t.locked ? '' : ' onclick="gameState.earnTab=\'' + t.id + '\';goToPage(\'earn\')"';
        tabsHtml += '<div class="' + cls + '"' + onclick + '>' + t.name + '</div>';
    }
    tabsHtml += '</div>';

    var contentHtml = '';
    var lockTip = '';
    if (currentTab === 'common') {
        contentHtml = buildJobsHtml(traineeJobs);
    } else if (currentTab === 'solo') {
        if (canSolo) {
            contentHtml = buildJobsHtml(soloJobs);
        } else {
            lockTip = '<div style="text-align:center;padding:40px 0;color:var(--color-text-light);font-size:13px;">出道后解锁个人工作</div>';
        }
    } else if (currentTab === 'group') {
        if (canGroup) {
            contentHtml = buildJobsHtml(groupJobs);
        } else {
            lockTip = '<div style="text-align:center;padding:40px 0;color:var(--color-text-light);font-size:13px;">加入团体后解锁团队工作</div>';
        }
    }

    container.innerHTML = '<div class="page active">'
        + '<div class="page-header">'
        + '<div class="back-btn" onclick="goToPage(\'home\')">‹ 首页</div>'
        + '<div class="page-title">赚钱中心</div>'
        + '<div style="width:32px;"></div>'
        + '</div>'
        + '<div class="page-content">'
        + '<div class="card" style="text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));color:white;">'
        + '<div style="font-size:12px;opacity:0.8;">当前体力</div>'
        + '<div style="font-size:24px;font-weight:700;">' + gameState.体力 + ' / ' + gameState.max体力 + '</div>'
        + '</div>'
        + tabsHtml
        + contentHtml
        + lockTip
        + '</div></div>';
}

function doEarnJob(jobId) {
    if (!gameState.earnCooldowns) gameState.earnCooldowns = {};
    var cd = gameState.earnCooldowns[jobId] || 0;
    if (cd > Date.now()) return;

    var allJobs = [
        { id: 'magazine', name: '拍杂志', 体力: 15, money: 2000, fame: 3, influence: 0, fans: 5, cooldown: 30000 },
        { id: 'busking', name: '路演', 体力: 20, money: 1500, fame: 5, influence: 0, fans: 15, cooldown: 45000 },
        { id: 'backup', name: '伴舞', 体力: 25, money: 3000, fame: 0, influence: 2, fans: 8, cooldown: 60000 },
        { id: 'convenience', name: '便利店打工', 体力: 10, money: 800, fame: 0, influence: 0, fans: 1, cooldown: 30000 },
        { id: 'cafe', name: '咖啡店兼职', 体力: 10, money: 900, fame: 0, influence: 0, fans: 1, cooldown: 30000 },
        { id: 'street', name: '街头表演', 体力: 15, money: 1200, fame: 5, influence: 0, fans: 10, cooldown: 45000 },
        { id: 'solo_cf', name: '品牌代言', 体力: 20, money: 50000, fame: 10, influence: 5, fans: 50, cooldown: 90000, fansRequired: 50000 },
        { id: 'solo_variety', name: '个人综艺', 体力: 25, money: 30000, fame: 8, influence: 3, fans: 30, cooldown: 90000, fansRequired: 10000 },
        { id: 'solo_live', name: '个人直播', 体力: 10, money: 15000, fame: 5, influence: 0, fans: 20, cooldown: 45000 },
        { id: 'solo_single', name: 'Solo单曲', 体力: 30, money: 40000, fame: 10, influence: 8, fans: 80, cooldown: 120000 },
        { id: 'solo_pictorial', name: '个人写真', 体力: 15, money: 20000, fame: 5, influence: 0, fans: 15, cooldown: 60000 },
        { id: 'brand_ambassador', name: '品牌大使', 体力: 20, money: 80000, fame: 15, influence: 10, fans: 100, cooldown: 120000, fansRequired: 100000 },
        { id: 'group_cf', name: '团体代言', 体力: 20, money: 40000, fame: 8, influence: 5, fans: 40, cooldown: 90000 },
        { id: 'group_variety', name: '团综录制', 体力: 25, money: 25000, fame: 6, influence: 4, fans: 25, cooldown: 90000 },
        { id: 'group_pictorial', name: '团体写真', 体力: 15, money: 15000, fame: 5, influence: 0, fans: 12, cooldown: 60000 },
        { id: 'group_album', name: '团体专辑', 体力: 30, money: 60000, fame: 12, influence: 10, fans: 60, cooldown: 120000 },
        { id: 'group_live', name: '团体直播', 体力: 10, money: 10000, fame: 4, influence: 0, fans: 18, cooldown: 45000 }
    ];

    var job = null;
    for (var ji = 0; ji < allJobs.length; ji++) {
        if (allJobs[ji].id === jobId) { job = allJobs[ji]; break; }
    }
    if (!job) return;
    if (job.fansRequired && (gameState.fans || 0) < job.fansRequired) {
        showModal('粉丝不足', '需要 ' + (job.fansRequired >= 10000 ? (job.fansRequired / 10000) + '万' : job.fansRequired) + ' 粉丝才能解锁');
        return;
    }
    if (gameState.体力 < job.体力) {
        showModal('体力不足', '需要 ' + job.体力 + ' 体力');
        return;
    }

    gameState.体力 = Math.max(0, gameState.体力 - job.体力);
    gameState.money += job.money;
    if (job.fame > 0) gameState.fame = Math.min(200, (gameState.fame || 30) + job.fame);
    if (job.influence > 0) gameState.influence = Math.min(200, (gameState.influence || 50) + job.influence);
    if (job.fans > 0) gameState.fans += job.fans;
    if (gameState.player && gameState.player.role === 'Idol' && gameState.groupPopularity !== undefined) {
        var gpGain2 = Math.floor(Math.random() * 2) + 1;
        gameState.groupPopularity += gpGain2;
    }
    gameState.earnCooldowns[jobId] = Date.now() + job.cooldown;

    showToast('工作中...');
    notifySchedule('行程', '工作开始了');
    setTimeout(function() {
        showToast('完成！+' + job.money.toLocaleString() + ' 金币');
    if(typeof checkAchievements==='function') checkAchievements();
        triggerSilentSave();
        render();
    }, 1500);
}

// ==================== TIMER CLEANUP ====================
var _pageTimers = [];
function _addTimer(id) { _pageTimers.push(id); }
function _clearPageTimers() {
    for (var i = 0; i < _pageTimers.length; i++) {
        try { clearInterval(_pageTimers[i]); } catch(e) {}
        try { clearTimeout(_pageTimers[i]); } catch(e) {}
    }
    _pageTimers = [];
    if (liveDanmakuTimer) { clearInterval(liveDanmakuTimer); liveDanmakuTimer = null; }
    if (liveViewerTimer) { clearInterval(liveViewerTimer); liveViewerTimer = null; }
    if (restCountdown) { clearInterval(restCountdown); restCountdown = null; }
    isResting = false;
    isExamInProgress = false;
    if (speechRecognition) { try { speechRecognition.stop(); } catch(e) {} speechRecognition = null; }
    if (isLive) stopLive();
}

// Override goToPage to clear timers
var _origGoToPage = goToPage;
goToPage = function(page) {
    _clearPageTimers();
    try { _origGoToPage(page); } catch(e) {
        console.error('goToPage error:', e);
        currentPage = 'home';
        try { render(); renderBottomNav(); } catch(e2) {}
    }
};

window.onerror = function(msg, url, line) {
    document.body.innerHTML = '<div style="padding:40px;text-align:center;font-family:sans-serif;">' +
        '<h2 style="color:#FF6B8A;">加载出错</h2>' +
        '<p style="color:#666;margin:20px 0;">' + msg + ' (行 ' + line + ')</p>' +
        '<button onclick="try{if(typeof gameState!==\'undefined\'&&gameState.player&&gameState.player.name){currentPage=\'home\';document.body.innerHTML=\'\';var _app=document.createElement(\'div\');_app.id=\'app\';document.body.appendChild(_app);render();renderBottomNav();}else{var _saved=localStorage.getItem(\'myIdolSaveData\');if(_saved){try{gameState=JSON.parse(_saved);window._inviteVerified=true;currentPage=\'home\';document.body.innerHTML=\'\';var _app2=document.createElement(\'div\');_app2.id=\'app\';document.body.appendChild(_app2);render();renderBottomNav();}catch(e){location.reload();}}else{location.reload();}}}catch(e){location.reload();}" style="padding:12px 24px;background:#FF8FA3;color:white;border:none;border-radius:25px;font-size:16px;">重试</button>' +
        '<br><br><a href="https://linyangjie1015.github.io/my-idol/v1.6.html?v=' + Date.now() + '" style="color:#FF8FA3;">强制刷新(清缓存)</a></div>';
    return true;
};

render();
