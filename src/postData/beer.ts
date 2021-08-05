// crawling beers

import express, { Request, Response, NextFunction, Router, response } from "express";
import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";

const beerCrawlingRouter = express.Router();

beerCrawlingRouter.post("/", async(req, res) => {
    const beerCategories = ["American Lager", "Pilsner", "Pale Ale", "IPA", "Weizen", "Dunkel", "Stout", "Bock"]
    let beerCategoryArray: Array <any> = [];

    for (let i = 0; i < beerCategories.length; i ++) {
        let beerCategory = await BeerCategories.findOne({ name: beerCategories[i] });

        beerCategoryArray.push([ beerCategory._id, beerCategory.features ]);
    }

    const beers = [
        {
            name_korean: "버드와이저",
            name_english: "Budweiser",
            image: "https://drive.google.com/uc?export=view&id=1VnjD_a1f1-F5sSxLndE0AfgwjMMbaEtR ",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "황금색",
                "안호이저부시",
                "라이트바디"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "밀러 라이트",
            name_english: "Miller Lite",
            image: "https://drive.google.com/uc?export=view&id=1kDcLMswLd1BIHKOfpDAUtcbOEjua4Hau ",
            degree: 4.2,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "미국",
                "밀러쿠어스",
                "옥수수"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "칭다오",
            name_english: "Tsingtao",
            image: "https://drive.google.com/uc?export=view&id=11sHv4oq4L2vwgygOTq7wwdwr2tzfxTf7 ",
            degree: 4.7,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "양꼬치",
                "중국"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "아사히",
            name_english: "Asahi",
            image: "https://drive.google.com/uc?export=view&id=1saRgrv4DHbJ8u2EQSAQPo3pcnfdfKTJ- ",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "일본",
                "롯데",
                "슈퍼드라이"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "빅토리안 비터",
            name_english: "Victorian Bitter",
            image: "https://drive.google.com/uc?export=view&id=1ieFMMDhVhrRfD4lME8gfYHu8I5KzMjgm ",
            degree: 4.6,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "VB",
                "포스터스",
                "호주"
            ],
            features: beerCategoryArray[0][1]
        },

        {
            name_korean: "필스너우르켈",
            name_english: "Pilsner Urquell",
            image: "https://drive.google.com/uc?export=view&id=13itou590w8VDxloEBu1Lgoyq4yZ62Lhv ",
            degree: 4.4,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "체코",
                "황금색",
                "아사히그룹"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "더블 오트",
            name_english: "Double Aught",
            image: "https://drive.google.com/uc?export=view&id=1WpG6q-ghz-7amyvdusa0dBolVFVWrxOx ",
            degree: 5.0,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "미국",
                "보리몰트",
                "상쾌함"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "더 젠틀맨 라거",
            name_english: "The Gentleman Lager",
            image: "https://drive.google.com/uc?export=view&id=1kTlJxygEsJ_G6lunKWnLwTWOQMe_1GCj ",
            degree: 7.6,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "한국",
                "높은도수",
                "강렬한맛"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "베를리너 킨들 필스너",
            name_english: "Berliner Kindl Pilsener",
            image: "https://drive.google.com/uc?export=view&id=1fEXzBmwLasiAZtzqe6jRvMeO6gx0raf9 ",
            degree: 5.1,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "독일",
                "황금색",
                "감귤향"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "산토리 프리미엄 몰트",
            name_english: "The Premium Malt's",
            image: "https://drive.google.com/uc?export=view&id=1LkXwPE1Kn7sNr0IJdUsfEYHYsp3aJFBf ",
            degree: 5.5,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "일본",
                "다이아몬드",
                "맥아"
            ],
            features: beerCategoryArray[1][1]
        },





        {
            name_korean: "플래티넘",
            name_english: "Platinum",
            image: "https://drive.google.com/uc?export=view&id=1-boa2uXilB2_aJ_cdBeswjv9mS2uCQaL ",
            degree: 5.0,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "황금색",
                "가벼운쓴맛",
                "과일향",
                "꽃향기"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "구아야베라",
            name_english: "Guayabera",
            image: "https://drive.google.com/uc?export=view&id=1KHhoeBNGUKrmT8VIuLJ8G7v3rYnkQ4ZN ",
            degree: 5.5,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "황금색",
                "과일향",
                "산뜻한맛"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "그루니언",
            name_english: "Grunion",
            image: "https://drive.google.com/uc?export=view&id=13-tu-OpDme_rTyRF9yGNnE-OH6M1SDZU ",
            degree: 5.5,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "멜론향",
                "허브향",
                "미국"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "오번",
            name_english: "Auburn",
            image: "https://drive.google.com/uc?export=view&id=1qdQskFExPdtdxPQpbk4wxdUdyBmzT7hq ",
            degree: 4.5,
            categoryId: beerCategoryArray[2][0],
            hashtag:[
                "KneeDeep",
                "감귤향",
                "산뜻한맛",
                "황금색"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "아크 페일 에일",
            name_english: "Ark Pale Ale",
            image: "https://drive.google.com/uc?export=view&id=1aHlSGzdk1iFuZxgtozFFiDJnLd0_tsw4 ",
            degree: 5.0,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "산뜻한맛",
                "시트러스향",
                "한국"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "인디카",
            name_english: "Indica",
            image: "https://drive.google.com/uc?export=view&id=1xihpxZB0NOQA9POs2jdJhkW7Z3QhuQLk ",
            degree: 6.5,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "미국",
                "서부해안",
                "과일향",
                "가벼운쓴맛"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "구스 아일랜드",
            name_english: "Goose Island",
            image: "https://drive.google.com/uc?export=view&id=1VGsvBS27jQcj3RsYAJcsVFne1W4WHYjZ ",
            degree: 5.9,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "덕덕구스",
                "황금색",
                "과일향"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "볼파스 엔젤맨",
            name_english: "Vlofas Engelman",
            image: "https://drive.google.com/uc?export=view&id=1roKdaIxc_CKfEqjejm7czzpt6EltslOn ",
            degree: 6.0,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "과일향",
                "씁쓸한맛",
                "옅은단맛",
                "무거운무게감"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "노스 코스트 스텔라",
            name_english: "North Coast Steller",
            image: "https://drive.google.com/uc?export=view&id=1BgQvFOmrV_1HmY8dwANNB_1MDO_UPMGy ",
            degree: 6.7,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "과일향",
                "씁쓸한맛",
                "부드러운첫맛",
                "은은한끝맛"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "그린 킹",
            name_english: "Greene King",
            image: "https://drive.google.com/uc?export=view&id=152gZtk9C-m4JNxCmrJpP_NYPfrRUirk0 ",
            degree: 3.6,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "견과류향",
                "가벼운바디감",
                "낮은도수"
            ],
            features: beerCategoryArray[3][1]
        },







        {
            name_korean: "바이엔슈테판",
            name_english: "Weihenstephan",
            image: "https://drive.google.com/uc?export=view&id=12Vmvw3qhrFiwYuk-OPW9IeYDstTI5UEm ",
            degree: 7.7,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "진한밀몰트",
                "크리미한거품",
                "부드러움"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "파울라너 바이스 비어 둔켈",
            name_english: "Paulaner Hefe Weizenbier Dunkel",
            image: "https://drive.google.com/uc?export=view&id=1sxc_10zGMxWtsZa5p5zyYBHbuWNqMrJU ",
            degree: 5.5,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "황금색",
                "과일향",
                "씁쓸한맛"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "리허 바이젠",
            name_english: "Licher Weizen",
            image: "https://drive.google.com/uc?export=view&id=1SBY0utghxkjpOG-B6nakUQRGQLU49BU7 ",
            degree: 5.4,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "과일향",
                "가벼운바디감",
                "깔끔한끝맛"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "엘 바이젠",
            name_english: "L Weizen",
            image: "https://drive.google.com/uc?export=view&id=1hpr3wj6pBb8HXcnhDMj4Me06v2o_XECj ",
            degree: 4.9,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "과일향",
                "가벼운바디감",
                "저렴"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "블루 문",
            name_english: "Blue Moon",
            image: "https://drive.google.com/uc?export=view&id=1e5QK8f-l9IgA1plbHZ8ngkKSijU6qXIU ",
            degree: 5.4,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "오렌지향",
                "오렌지맛",
                "톡쏘는탄산"
            ],
            features: beerCategoryArray[4][1]
        },





        {
            name_korean: "에딩거 둔켈",
            name_english: "Erdinger Dunkel",
            image: "https://drive.google.com/uc?export=view&id=1L3hrhZ90dAsuoLudPHFHdYP7Gp-GWmXp",
            degree: 5.3,
            categoryId: beerCategoryArray[5][0],
            hashtag: [
                "흑맥주",
                "깔끔함",
                "독일"
            ],
            features: beerCategoryArray[5][1]
        },
        {
            name_korean: "파울라너 바이스비어 둔켈",
            name_english: "PAULANER Weissbier Dunkel",
            image: "https://drive.google.com/uc?export=view&id=1sxc_10zGMxWtsZa5p5zyYBHbuWNqMrJU",
            degree: 5.3,
            categoryId: beerCategoryArray[5][0],
            hashtag: [
                "독일",
                "흑맥주",
                "초콜릿향",
                "깔끔함"
            ],
            features: beerCategoryArray[5][1]
        },
        {
            name_korean: "벨텐부르거 바로크 둔켈",
            name_english: "Klosterbrauerei Weltenburg GMBH",
            image: "https://drive.google.com/uc?export=view&id=1b_3T8HHS4wxdZpSwcm9zNYjYA8qOQePK",
            degree: 4.7,
            categoryId: beerCategoryArray[5][0],
            hashtag: [
                "다크라거",
                "부드러움",
                "흑맥주",
                "독일"
            ],
            features: beerCategoryArray[5][1]
        },
        {
            name_korean: "산청맥주 둔켈",
            name_english: "Sancheong Brewery Dunkel",
            image: "https://drive.google.com/uc?export=view&id=15l-S0nyd2kz6inw4qC3t5OcoCDBHi7U-",
            degree: 4.5,
            categoryId: beerCategoryArray[5][0],
            hashtag: [
                "한국",
                "다크라거",
                "흑맥주",
                "로스팅향"
            ],
            features: beerCategoryArray[5][1]
        },
        {
            name_korean: "코젤 다크",
            name_english: "Kozel Dark",
            image: "https://drive.google.com/uc?export=view&id=10Wc-fK_P9T13qKJWPoziQcDhOSUmvryr",
            degree: 3.8,
            categoryId: beerCategoryArray[5][0],
            hashtag: [
                "흑맥주",
                "초콜릿향",
                "커피향"
            ],
            features: beerCategoryArray[5][1]
        },
        // Stout Id : beerCategoryArray[6][0]
        // Stout features: beerCategoryArray[6][1]
        {
            name_korean: "기네스 오리지날",
            name_english: "Guinness Original",
            image: "https://drive.google.com/uc?export=view&id=1UF25u6QIdMiNDfoI4HBQfdwPk8IYoEzF ",
            degree: 4.2,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "흑맥주",
                "청량감",
                "쌉쌀한"   
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "기네스 드래프트",
            name_english: "Guinness Draught",
            image: "https://drive.google.com/uc?export=view&id=1zDn71iJjec7QtwDBcZXb4OAK6SR49Doe ",
            degree: 4.2,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "흑맥주",
                "부드러움",
                "기네스"   
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "스팀 브루 임페리얼 스타우트",
            name_english: "Steam Brew Imperial Stout",
            image: "https://drive.google.com/uc?export=view&id=1C2mMPKUh9f3_80UZEJ1WXHfBgXVtXD3e ",
            degree: 7.5,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "흑맥주",
                "독일",
                "부드러움",
                "초콜릿향"     
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "위치 초콜렛 스타우트",
            name_english: "The Witch Chocholate Stou",
            image: "https://drive.google.com/uc?export=view&id=1UQeoEQDhGmpYlqKASKQzSHPDviOLwkrr ",
            degree: 5.7,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "한국",
                "무거운바디감",
                "초콜릿향",
                "흑맥주" 
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "팍세 스타우트",
            name_english: "Faxe Stout",
            image: "https://drive.google.com/uc?export=view&id=1zz2muSiJeA34pWQIP6f2g2vEaDfltFUZ ",
            degree: 7.7,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "로스팅",
                "흑맥주",
                "초콜릿향"  
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "시에라 네바다 스타우트",
            name_english: "Sierra Nevada Stout",
            image: "https://drive.google.com/uc?export=view&id=1t_xTfJVQHheVlQrD0i9ifEaE3nOGJql4 ",
            degree: 5.8,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "커피향",
                "흑맥주",
                "초콜릿향",
                "무거운바디감",
                "부드러움"
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "파울라너 살바토르",
            name_english: "Paulaner Salvator",
            image: "https://drive.google.com/uc?export=view&id=16ATFqABDAWAs-14pTvIaJTbyVc6m5unQ ",
            degree: 7.9,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "흑맥주",
                "높은도수",
                "부드러움",
                "과일향" 
            ],
            features: beerCategoryArray[7][1]
        },
        {
            name_korean: "슈퍼 보크",
            name_english: "Super Bock",
            image: "https://drive.google.com/uc?export=view&id=1r1kelVfjIX5Pspc5V9YoQeDhfIStjNyp ",
            degree: 5.2,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "흑맥주",
                "포르투칼",
                "달콤함" 
            ],
            features: beerCategoryArray[7][1]
        },
        {
            name_korean: "아잉거 셀러브레이터 도펠 보크",
            name_english: "Ayinger Celebrator Doppelbock",
            image: "https://drive.google.com/uc?export=view&id=131Y3L2Vhu53Ex3MJMY3zhbN6nvm5e0Jn ",
            degree: 6.7,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "흑맥주",
                "부드러움",
                "커피향", 
                "독일" 
            ],
            features: beerCategoryArray[7][1]
        },
        {
            name_korean: "바이엔슈테판 코르비니안",
            name_english: "Weihenstephaner Korbinian",
            image: "https://drive.google.com/uc?export=view&id=1qpp_P20whV_rZ2Z9bJvLUfonMZ7Ua_5y ",
            degree: 7.4,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "흑맥주",
                "무거운바디감",
                "달콤함",
                "독일" 
            ],
            features: beerCategoryArray[7][1]
        },
        {
            name_korean: "아벤티누스 아이스복",
            name_english: "Schneider Aventinus Eisbock",
            image: "https://drive.google.com/uc?export=view&id=1AkpVsmwB6zMIQYcb95buWzCxhn3mumwP ",
            degree: 12,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "흑맥주",
                "과일향",
                "높은도수",
                "독일" 
            ],
            features: beerCategoryArray[7][1]
        },


    
    ]

    try {
        Beers.collection.drop();

        for (let i = 0; i < beers.length; i ++) {
            await Beers.create(beers[i]);
        }
    } catch (err) {
        res.json({ message: "fail", err });

        return;
    }

    res.json({ message: "success" });
});

beerCrawlingRouter.get("/hashtags", async(req, res) => {
    try {
        const beers = await Beers.find({});
        const hashtags: Array<String> = [];

        for (let i = 0; i < beers.length; i ++) {
            const hashtag = beers[i].hashtag;

            for (let j = 0; j < hashtag.length; j ++) {
                if (!hashtags.includes(hashtag[j])) {
                    hashtags.push(hashtag[j]);
                }
            }
        }
    
        res.json({ message: "success", hashtags });
    } catch (err) {
        res.json({ message: "fail", err });
    }
    
})

export { beerCrawlingRouter };