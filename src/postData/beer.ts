// crawling beers

import express, { Request, Response, NextFunction, Router, response } from "express";
import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";

const beerCrawlingRouter = express.Router();

beerCrawlingRouter.post("/", async(req, res) => {
    const beerCategories = ["Lager", "Pilsner", "Pale Ale", "IPA", "Weizen", "Dunkel", "Stout", "Bock"]
    let beerCategoryArray: Array <any> = [];

    for (let i = 0; i < beerCategories.length; i ++) {
        let beerCategory = await BeerCategories.findOne({ name: beerCategories[i] });

        beerCategoryArray.push([ beerCategory._id, beerCategory.features ]);
    }

    const beers = [
        {
            name_korean: "버드와이저",
            name_english: "Budweiser",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B2%84%EB%93%9C%EC%99%80%EC%9D%B4%EC%A0%80.png",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "미국",
                "5.0",
                "감귤향",
                "Lager",
                "황금색",
                "안호이저부시",
                "라이트바디"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "밀러 라이트",
            name_english: "Miller Lite",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B0%80%EB%9F%AC%EB%9D%BC%EC%9D%B4%ED%8A%B8.png",
            degree: 4.2,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "미국",
                "4.2",
                "맥아향",
                "Lager",
                "밀러쿠어스",
                "옥수수"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "칭다오",
            name_english: "Tsingtao",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%B9%AD%EB%8B%A4%EC%98%A4.png",
            degree: 4.7,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "중국",
                "4.7",
                "맥아향",
                "Lager",
                "양꼬치",
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "아사히",
            name_english: "Asahi",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%95%84%EC%82%AC%ED%9E%88.png",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "일본",
                "5.0",
                "아로마향",
                "Lager",
                "롯데",
                "슈퍼드라이"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "빅토리안 비터",
            name_english: "Victorian Bitter",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B9%85%ED%86%A0%EB%A6%AC%EC%95%84%EB%B9%84%ED%84%B0.png",
            degree: 4.6,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "호주",
                "4.6",
                "아로마향",
                "Lager",
                "VB",
                "포스터스"
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
                "4.4",
                "풀향",
                "Pilsner",
                "황금색",
                "아사히그룹"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "더블 오트",
            name_english: "Double Aught",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%8D%94%EB%B8%94%EC%98%A4%ED%8A%B8.png",
            degree: 5.0,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "미국",
                "5.0",
                "맥아향",
                "Pilsner",
                "보리몰트",
                "상쾌함"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "더 젠틀맨 라거",
            name_english: "The Gentleman Lager",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%8D%94%EC%A0%A0%ED%8B%80%EB%A7%A8%EB%9D%BC%EA%B1%B0.png",
            degree: 7.6,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "한국",
                "7.6",
                "밀향",
                "Pilsner",
                "높은도수",
                "강렬한맛"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "베를리너 킨들 필스너",
            name_english: "Berliner Kindl Pilsener",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B2%A0%EB%A5%BC%EB%A6%AC%EB%84%88%ED%82%A8%EB%93%A4.png",
            degree: 5.1,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "독일",
                "5.1",
                "감귤향",
                "Pilsner",
                "황금색",
                "쌉쌀한맛"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "산토리 프리미엄 몰트",
            name_english: "The Premium Malt's",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%82%B0%ED%86%A0%EB%A6%AC%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84.png",
            degree: 5.5,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "일본",
                "5.5",
                "맥아향",
                "Pilsner",
                "다이아몬드"
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
                "한국",
                "5.0",
                "과일향",
                "황금색",
                "Pale Ale",
                "가벼운쓴맛",
                "꽃향기"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "구아야베라",
            name_english: "Guayabera",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B5%AC%EC%95%BC%EC%9D%B4%EB%B2%A0%EB%9D%BC.png",
            degree: 5.5,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "미국",
                "5.5",
                "과일향",
                "Pale Ale",
                "황금색",
                "산뜻한맛"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "그루니언",
            name_english: "Grunion",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B7%B8%EB%A3%A8%EB%8B%88%EC%96%B8.png",
            degree: 5.5,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "미국",
                "5.5",
                "허브향",
                "Pale Ale",
                "멜론향",
                "정어리"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "오번",
            name_english: "Auburn",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%98%A4%EB%B2%88.png",
            degree: 4.5,
            categoryId: beerCategoryArray[2][0],
            hashtag:[
                "미국",
                "4.5",
                "감귤향",
                "Pale Ale",
                "KneeDeep",
                "산뜻한맛",
                "황금색"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "아크 페일 에일",
            name_english: "Ark Pale Ale",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%95%84%ED%81%AC+%ED%8E%98%EC%9D%BC%EC%97%90%EC%9D%BC+%EB%B8%8C%EB%9D%BC%EC%9A%B4.png",
            degree: 5.0,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "한국",
                "5.0",
                "시트러스향",
                "Pale Ale",
                "산뜻한맛",
                "ark"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "인디카",
            name_english: "Indica",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%9D%B8%EB%94%94%EC%B9%B4.png",
            degree: 6.5,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "미국",
                "6.5",
                "과일향",
                "IPA",
                "서부해안",
                "가벼운쓴맛"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "구스 아일랜드",
            name_english: "Goose Island",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B5%AC%EC%8A%A4%EC%95%84%EC%9D%BC%EB%9E%9C%EB%93%9C.png",
            degree: 5.9,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "미국",
                "5.9",
                "과일향",
                "IPA",
                "덕덕구스",
                "황금색"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "볼파스 엔젤맨",
            name_english: "Vlofas Engelman",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B3%BC%ED%8C%8C%EC%8A%A4%EC%97%94%EC%A0%A4%EB%A7%A8.png",
            degree: 6.0,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "리투아니아",
                "6.0",
                "과일향",
                "IPA",
                "씁쓸한맛",
                "옅은단맛",
                "무거운무게감"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "노스 코스트 스텔라",
            name_english: "North Coast Steller",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%8A%A4%ED%85%94%EB%9D%BC.png",
            degree: 6.7,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "미국",
                "6.7",
                "과일향",
                "IPA",
                "씁쓸한맛",
                "부드러운첫맛",
                "은은한끝맛"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "그린 킹",
            name_english: "Greene King",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B7%B8%EB%A6%B0%ED%82%B9.png",
            degree: 3.6,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "영국",
                "3.6",
                "견과류향",
                "IPA",
                "가벼운바디감",
                "낮은도수"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "바이엔슈테판",
            name_english: "Weihenstephan",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B0%94%EC%9D%B4%EC%97%94%EC%8A%88%ED%85%8C%ED%8C%90.png",
            degree: 7.7,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "독일",
                "7.7",
                "바나나향",
                "Weizen",
                "진한밀몰트",
                "크리미한거품",
                "부드러움"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "파울라너 헤페",
            name_english: "Paulaner Hefe Weizenbier Dunkel",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%8C%8C%EC%9A%B8%EB%9D%BC%EB%84%88%ED%97%A4%ED%8E%98.png",
            degree: 5.5,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "독일",
                "5.5",
                "과일향",
                "Weizen",
                "황금색",
                "씁쓸한맛"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "리허 바이젠",
            name_english: "Licher Weizen",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%A6%AC%ED%97%88+%EB%B0%94%EC%9D%B4%EC%A0%A0.png",
            degree: 5.4,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "독일",
                "5.4",
                "과일향",
                "Weizen",
                "가벼운바디감",
                "깔끔한끝맛"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "엘 바이젠",
            name_english: "L Weizen",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%97%98%EB%B0%94%EC%9D%B4%EC%A0%A0.png",
            degree: 4.9,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "독일",
                "4.9",
                "과일향",
                "Weizen",
                "가벼운바디감",
                "저렴"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "블루 문",
            name_english: "Blue Moon",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B8%94%EB%A3%A8%EB%AC%B8.png",
            degree: 5.4,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "미국",
                "5.4",
                "오렌지향",
                "Weizen",
                "오렌지맛",
                "톡쏘는탄산"
            ],
            features: beerCategoryArray[4][1]
        },





        {
            name_korean: "에딩거 둔켈",
            name_english: "Erdinger Dunkel",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%97%90%EB%94%A9%EA%B1%B0%EB%91%94%EC%BC%88.png",
            degree: 5.3,
            categoryId: beerCategoryArray[5][0],
            hashtag: [
                "독일",
                "5.3",
                "커피향",
                "Dunkel",
                "흑맥주",
                "깔끔함"
                
            ],
            features: beerCategoryArray[5][1]
        },
        {
            name_korean: "파울라너 바이스비어 둔켈",
            name_english: "PAULANER Weissbier Dunkel",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%8C%8C%EC%9A%B8%EB%9D%BC%EB%84%88+%EB%B0%94%EC%9D%B4%EC%8A%A4+%EB%B9%84%EC%96%B4%EB%91%94%EC%BC%88.png",
            degree: 5.3,
            categoryId: beerCategoryArray[5][0],
            hashtag: [
                "독일",
                "5.3",
                "초콜릿향",
                "Dunkel",
                "흑맥주",
                "깔끔함"
            ],
            features: beerCategoryArray[5][1]
        },
        {
            name_korean: "벨텐부르거 바로크 둔켈",
            name_english: "Klosterbrauerei Weltenburg GMBH",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B2%A8%ED%85%90%EB%B6%80%EB%A5%B4%EA%B1%B0%EB%B0%94%EB%A1%9C%ED%81%AC%EB%91%94%EC%BC%88.png",
            degree: 4.7,
            categoryId: beerCategoryArray[5][0],
            hashtag: [
                "독일",
                "4.7",
                "넛향",
                "Dunkel",
                "다크라거",
                "부드러움",
                "흑맥주",
                
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
                "4.5",
                "로스팅향",
                "Dunkel",
                "다크라거",
                "흑맥주"
            ],
            features: beerCategoryArray[5][1]
        },
        {
            name_korean: "코젤 다크",
            name_english: "Kozel Dark",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%BD%94%EC%A0%A4%EB%8B%A4%ED%81%AC.png",
            degree: 3.8,
            categoryId: beerCategoryArray[5][0],
            hashtag: [
                "체코",
                "3.8",
                "커피향",
                "Dunkel",
                "흑맥주",
                "초콜릿향"
            ],
            features: beerCategoryArray[5][1]
        },
        // Stout Id : beerCategoryArray[6][0]
        // Stout features: beerCategoryArray[6][1]
        {
            name_korean: "기네스 오리지날",
            name_english: "Guinness Original",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B8%B0%EB%84%A4%EC%8A%A4%EC%98%A4%EB%A6%AC%EC%A7%80%EB%84%90.png",
            degree: 4.2,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "아일랜드",
                "4.2",
                "커피향",
                "초콜릿향",
                "Stout",
                "흑맥주",
                "청량감",
                "쌉쌀한"   
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "기네스 드래프트",
            name_english: "Guinness Draught",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B8%B0%EB%84%A4%EC%8A%A4%EB%93%9C%EB%9E%98%ED%94%84%ED%8A%B8.png",
            degree: 4.2,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "아일랜드",
                "4.2",
                "커피향",
                "Stout",
                "흑맥주",
                "부드러움",
                "초콜릿향"
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "스팀 브루 임페리얼 스타우트",
            name_english: "Steam Brew Imperial Stout",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%8A%A4%ED%8C%80%EB%B8%8C%EB%A3%A8%EC%9E%84%ED%8E%98%EB%A6%AC%EC%96%BC%EC%8A%A4%ED%83%80%EC%9A%B0%ED%8A%B8.png",
            degree: 7.5,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "독일",
                "7.5",
                "초콜릿향",
                "Stout",
                "흑맥주",
                "부드러움"
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "위치 초콜렛 스타우트",
            name_english: "The Witch Chocholate Stou",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%9C%84%EC%B9%98+%EC%B4%88%EC%BD%9C%EB%A6%BF+%EC%8A%A4%ED%83%80%EC%9A%B0%ED%8A%B8.png",
            degree: 5.7,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "한국",
                "5.7",
                "초콜릿향",
                "Stout",
                "무거운바디감",
                "흑맥주" 
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "팍세 스타우트",
            name_english: "Faxe Stout",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%8C%8D%EC%84%B8+%EC%8A%A4%ED%83%80%EC%9A%B0%ED%8A%B8.png",
            degree: 7.7,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "덴마크",
                "7.7",
                "초콜릿향",
                "로스팅",
                "흑맥주"
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "시에라 네바다 스타우트",
            name_english: "Sierra Nevada Stout",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%8B%9C%EC%97%90%EB%9D%BC%EB%84%A4%EB%B0%94%EB%8B%A4%EC%8A%A4%ED%83%80%EC%9A%B0%ED%8A%B8.png",
            degree: 5.8,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "미국",
                "5.8",
                "커피향",
                "Stout",
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
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%8C%8C%EC%9A%B8%EB%9D%BC%EB%84%88+%EC%82%B4%EB%B0%94%ED%86%A0%EB%A5%B4.png",
            degree: 7.9,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "독일",
                "과일향",
                "7.9",
                "Stout",
                "흑맥주",
                "높은도수",
                "부드러움",
                
            ],
            features: beerCategoryArray[7][1]
        },
        {
            name_korean: "슈퍼 보크",
            name_english: "Super Bock",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%8A%88%ED%8D%BC%EB%B3%B4%ED%81%AC.png",
            degree: 5.2,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "포르투칼",
                "5.2",
                "보리향",
                "Bock",
                "흑맥주",
                "달콤함" 
            ],
            features: beerCategoryArray[7][1]
        },
        {
            name_korean: "아잉거 셀러브레이터 도펠 보크",
            name_english: "Ayinger Celebrator Doppelbock",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%95%84%EC%9E%89%EA%B1%B0+%EC%85%80%EB%9F%AC%EB%B8%8C%EB%A0%88%EC%9D%B4%ED%84%B0+%EB%8F%84%ED%8E%A0+%EB%B3%B4%ED%81%AC.png",
            degree: 6.7,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "독일",
                "6.7",
                "커피향", 
                "Bock",
                "흑맥주",
                "부드러움"
            ],
            features: beerCategoryArray[7][1]
        },
        {
            name_korean: "바이엔슈테판 코르비니안",
            name_english: "Weihenstephaner Korbinian",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B0%94%EC%9D%B4%EC%97%94%EC%8A%88%ED%85%8C%ED%8C%90+%EC%BD%94%EB%A5%B4%EB%B9%84%EB%8B%88%EC%95%88.png",
            degree: 7.4,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "독일",
                "7.4",
                "꽃향",
                "Bock",
                "흑맥주",
                "무거운바디감",
                "달콤함"
            ],
            features: beerCategoryArray[7][1]
        },
        {
            name_korean: "아벤티누스 아이스복",
            name_english: "Schneider Aventinus Eisbock",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%95%84%EB%B2%A4%ED%8B%B0%EB%88%84%EC%8A%A4%EC%95%84%EC%9D%B4%EC%8A%A4%EB%B6%81.png",
            degree: 12.0,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "독일",
                "12.0",
                "과일향",
                "Bock",
                "높은도수",
                "흑맥주",
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