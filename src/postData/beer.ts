// crawling beers

import express, { Request, Response, NextFunction, Router, response } from "express";
import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";

const beerCrawlingRouter = express.Router();

beerCrawlingRouter.post("/", async(req, res) => {
    const beerCategories = ["Lager", "Pilsner", "Ale", "IPA", "Weizen", "Dunkel", "Stout", "Bock", "Etc"];
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
            name_korean: "카스 프레시",
            name_english: "Cass Fresh",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "4.5",
                "맥아향",
                "Lager",
                "쌉쌀한맛",
                "강한탄산",
                "OB"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "카스 라이트",
            name_english: "Cass Light",
            image: "",
            degree: 4,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "4.0",
                "맥아향",
                "Lager",
                "강한탄산",
                "저칼로리",
                "OB"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "하이트",
            name_english: "Hite",
            image: "",
            degree: 4.3,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "4.3",
                "맥아향",
                "Lager",
                "강한탄산",
                "청량감"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "맥스",
            name_english: "Max",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "4.5",
                "맥아향",
                "Lager",
                "연은단맛",
                "강한탄산"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "테라",
            name_english: "Terra",
            image: "",
            degree: 4.6,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "4.6",
                "맥아향",
                "Lager",
                "토네이도패턴",
                "강한탄산"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "필라이트 프레시",
            name_english: "Filite Fresh",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "4.5",
                "맥아향",
                "Lager",
                "가벼운맛",
                "저렴"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "클라우드",
            name_english: "Kloud",
            image: "",
            degree: 5,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "5.0",
                "맥아향",
                "Lager",
                "롯데",
                "강한탄산"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "클라우드 드래프트",
            name_english: "Kloud Draft",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "4.5",
                "맥아향",
                "Lager",
                "강한탄산",
                "신선한맛",
                "롯데"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "오비라거",
            name_english: "OB Lager",
            image: "",
            degree: 5.2,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "5.2",
                "맥아향",
                "Lager",
                "황금색",
                "쌉쌀한맛",
                "고소한맛"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "백양 비엔나 라거",
            name_english: "Backyang BYC Vienna Lager",
            image: "",
            degree: 5.2,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "5.2",
                "맥아향",
                "Lager",
                "CU",
                "붉은호박색"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "칭다오",
            name_english: "Tsingdao",
            image: "",
            degree: 4.7,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "호주",
                "4.7",
                "아로마향",
                "Lager",
                "VB",
                "포스터스"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "칭다오",
            name_english: "Tsingdao",
            image: "",
            degree: 4.7,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "중국",
                "4.7",
                "맥아향",
                "Lager",
                "청량감",
                "쌉쌀한맛"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "산 미구엘",
            name_english: "San Miguel",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "필리핀",
                "5.0",
                "은은한향",
                "Lager",
                "씁쓸함",
                "청량감"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "코로나",
            name_english: "Corona Extra",
            image: "",
            degree: 4.6,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "멕시코",
                "4.6",
                "라임향",
                "Lager",
                "산미",
                "고소한맛"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "삿포로",
            name_english: "Tsingdao",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "일본",
                "5.0",
                "맥아향",
                "Lager",
                "드라이맥주",
                "부드러움"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "크로넨버그 1664",
            name_english: "Kronenberg 1664",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "프랑스",
                "5.0",
                "과일향",
                "Lager",
                "호불호",
                "꽃향기"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "타이거",
            name_english: "Tiger",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "싱가포르",
                "5.0",
                "맥아향",
                "Lager",
                "황금색",
                "깔끔함",
                "청량감"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "코나 롱보드 아일랜드 라거",
            name_english: "Kona Longboard Island Lager",
            image: "",
            degree: 4.6,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "미국",
                "4.6",
                "과일향",
                "Lager",
                "달콤함",
                "가벼운바디감"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "크로코 후레시",
            name_english: "Croco Fresh",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "네덜란드",
                "4.5",
                "맥아향",
                "Lager",
                "황금색",
                "강한탄산",
                "쌉쌀한맛"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "하이네켄",
            name_english: "Heineken",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "네덜란드",
                "5.0",
                "맥아향",
                "Lager",
                "황금색",
                "청량감",
                "깔끔함"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "싱하",
            name_english: "Singha",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "태국",
                "5.0",
                "맥아향",
                "Lager",
                "부드러움",
                "청량감",
                "깔끔함"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "한맥",
            name_english: "Hanmac",
            image: "",
            degree: 4.6,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "4.6",
                "맥아향",
                "Lager",
                "부드러움",
                "청량감",
                "깔끔함"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "아사히 드라이 블랙",
            name_english: "Asahi Dry Black",
            image: "",
            degree: 5.5,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "일본",
                "5.5",
                "맥아향",
                "Lager",
                "깔끔함",
                "흑맥주",
                "부드러움"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "맥스",
            name_english: "Max",
            image: "",
            degree: 5.5,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "5.5",
                "맥아향",
                "Lager",
                "부드러움",
                "황금색",
                "깔끔함"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "카프리",
            name_english: "Cafri",
            image: "",
            degree: 4.2,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "한국",
                "4.2",
                "아로마향",
                "Lager",
                "청량감",
                "가벼운바디감"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "에베레스트",
            name_english: "Everest",
            image: "",
            degree: 5.5,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "네팔",
                "5.5",
                "맥아향",
                "Lager",
                "황금색",
                "청량감"
            ],
            features: beerCategoryArray[0][1]
        },





        {
            name_korean: "필스너우르켈",
            name_english: "Pilsner Urquell",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%95%84%EC%8A%A4%EB%84%88.png",
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
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%94%8C%EB%9E%98%ED%8B%B0%EB%84%98.png",
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
            name_korean: "차저 스코티쉬 라거",
            name_english: "Charger Scottish Lager Beer",
            image: "",
            degree: 7.5,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "스코틀랜드",
                "7.5",
                "위스키향",
                "라거",
                "소맥맛",
                "높은도수"
            ],
            features: beerCategoryArray[1][1]
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
            name_korean: "곰표 밀맥주",
            name_english: "Gompyo",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "한국",
                "4.5",
                "과일향",
                "Pale Ale",
                "세븐브로이",
                "cu",
                "레트로"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "호가든",
            name_english: "Hoegaarden",
            image: "",
            degree: 4.9,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "벨기에",
                "4.9",
                "감귤향",
                "Pale Ale",
                "부드러움"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "크로넨버그 1664 블랑",
            name_english: "Kronenberg 1665 Blanc",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "프랑스",
                "5.0",
                "과일향",
                "Pale Ale",
                "호불호",
                "오렌지향"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "빅웨이브 골든 에일",
            name_english: "Big Wave Golden Ale",
            image: "",
            degree: 4.4,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "미국",
                "4.4",
                "과일향",
                "Pale Ale",
                "적은거품",
                "가벼운맛"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "코나 파이어락 페일에일",
            name_english: "Kona Fire Rock Pale Ale",
            image: "",
            degree: 5.8,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "미국",
                "5.8",
                "시트러스",
                "Pale Ale",
                "고소한맛",
                "하와이안"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "강서",
            name_english: "Gangseo",
            image: "",
            degree: 4.6,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "한국",
                "4.6",
                "과일향",
                "Pale Ale",
                "세븐브로이",
                "씁슬함"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "제주 위트에일",
            name_english: "Jeju Wit Ale",
            image: "",
            degree: 5.3,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "한국",
                "5.3",
                "감귤향",
                "Pale Ale",
                "제주도",
                "부드러움"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "제주 펠롱에일",
            name_english: "Jeju Pellong Ale",
            image: "",
            degree: 5.3,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "한국",
                "5.3",
                "시트러스",
                "Pale Ale",
                "제주도",
                "씁슬함"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "전라 에일",
            name_english: "Jeolla Ale",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "한국",
                "4.5",
                "과일향",
                "Pale Ale",
                "세븐브로이",
                "황금색",
                "꽃향기"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "대강 페일에일",
            name_english: "Taegang Pale Ale",
            image: "",
            degree: 4.6,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "한국",
                "4.6",
                "과일향",
                "Pale Ale",
                "감귤향",
                "부드러움"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "블루문",
            name_english: "Bluemoon",
            image: "",
            degree: 5.4,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "미국",
                "5.4",
                "과일향",
                "White Ale",
                "꽃향기",
                "부드러움"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "레페 브라운",
            name_english: "Leffe Brown",
            image: "",
            degree: 6.5,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "벨기에",
                "6.5",
                "달콤함",
                "Dark Ale",
                "높은 도수",
                "부드러움"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "레페 블론드",
            name_english: "Leffe Blond",
            image: "",
            degree: 6.6,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "벨기에",
                "6.6",
                "바닐라향",
                "Pale Ale",
                "부드러움",
                "옅은단맛",
                "황금색"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "듀벨",
            name_english: "Devel",
            image: "",
            degree: 8.5,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "벨기에",
                "8.5",
                "과일향",
                "Golden Ale",
                "높은도수",
                "달콤함"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "파도",
            name_english: "Pado",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "한국",
                "4.5",
                "감귤향",
                "Pale Ale",
                "청량감",
                "부드러움"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "에델바이스",
            name_english: "Edelweiss",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "오스트리아",
                "5.0",
                "허브향",
                "Pale Ale",
                "풍성한 거품",
                "황금색"
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
            name_korean: "호랑이형님 순한 IPA",
            name_english: "Tiger Bro Mild IPA",
            image: "",
            degree: 4.7,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "한국",
                "4.7",
                "과일향",
                "IPA",
                "청량감",
                "황금색"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "국민 IPA",
            name_english: "Kukmin IPA",
            image: "",
            degree: 6.5,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "한국",
                "6.5",
                "과일향",
                "IPA",
                "청량감",
                "무거운바디감"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "퇴근길 IPA",
            name_english: "Platinum craft sunset",
            image: "",
            degree: 4.7,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "한국",
                "4.7",
                "과일향",
                "IPA",
                "아로마향",
                "쌉쌀한맛"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "라구니타스 데이타임 IPA",
            name_english: "Lagunitas Daytime IPA",
            image: "",
            degree: 4.0,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "미국",
                "4.0",
                "과일향",
                "IPA",
                "아로마향",
                "황금색"
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
            name_korean: "필라이트 바이젠",
            name_english: "Filte Weizen",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "한국",
                "4.5",
                "오렌지향",
                "Weizen",
                "발포주",
                "가벼운맛"
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
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%82%B0%EC%B2%AD%EB%A7%A5%EC%A3%BC%EB%91%94%EC%BC%88.png",
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
        {
            name_korean: "카스 0.0",
            name_english: "Cass 0.0",
            image: "",
            degree: 0,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "한국",
                "0",
                "맥아향",
                "논알코올",
                "오비"
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "데스페라도스",
            name_english: "Desperados",
            image: "",
            degree: 5.9,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "네덜란드",
                "5.9",
                "과일향",
                "데킬라맥주",
                "가벼운바디감",
                "달콤함",
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "호가든 로제",
            name_english: "Hogaarden Rose",
            image: "",
            degree: 3.0,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "벨기에",
                "3.0",
                "과일향",
                "과일주",
                "가벼운맛",
                "달콤함",
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "타이거 라들러 자몽",
            name_english: "Tiger Radler Grapefruit",
            image: "",
            degree: 2.0,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "싱가포르",
                "2.0",
                "과일향",
                "과일주",
                "가벼운맛",
                "달콤함",
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "타이거 라들러 레몬",
            name_english: "Tiger Radler Lemon",
            image: "",
            degree: 2.0,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "싱가포르",
                "2.0",
                "과일향",
                "과일주",
                "가벼운맛",
                "달콤함",
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "피즈 딸기",
            name_english: "Fizz Strawberry",
            image: "",
            degree: 4.0,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "스웨덴",
                "4.0",
                "과일향",
                "Cider",
                "달콤함",
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "애플 폭스",
            name_english: "Apple Fox",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "싱가포르",
                "4.5",
                "과일향",
                "Cider",
                "청량감",
                "강한 탄산"
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "써머스비 애플",
            name_english: "Somersby Apple",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "덴마크",
                "4.5",
                "과일향",
                "Cider",
                "사과맛",
                "달콤함"
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "매그너스 쥬시애플",
            name_english: "Magners Juicy Apple",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "아일랜드",
                "4.5",
                "과일향",
                "Cider",
                "청량감",
                "달콤함"
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "필굿",
            name_english: "Fil Good",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "한국",
                "4.5",
                "아로마향",
                "Etc",
                "오비",
                "저렴"
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "필굿 세븐",
            name_english: "Fil Good 7",
            image: "",
            degree: 7,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "한국",
                "7",
                "강한 홉향",
                "Etc",
                "높은도수",
                "청량감",
                "저렴"
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "말표 흑맥주",
            name_english: "Malpyo",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "한국",
                "4.5",
                "커피향",
                "Etc",
                "아로마향",
                "초콜링향",
                "스퀴즈브루어리"
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "하이네켄 무알콜",
            name_english: "Heineken Non Alcohol",
            image: "",
            degree: 0,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "네덜란드",
                "0",
                "맥아향",
                "논알코올",
                "깔끔함",
                "청량감"
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "칼스버그 0.0",
            name_english: "Carlsberg 0.0",
            image: "",
            degree: 0,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "덴마크",
                "0",
                "과일향",
                "논알코올",
                "청량감",
                "깔끔함"
            ],
            features: beerCategoryArray[8][1]
        },
        {
            name_korean: "아사히 드라이 제로",
            name_english: "Asahi Dry Zero",
            image: "",
            degree: 0,
            categoryId: beerCategoryArray[8][0],
            hashtag: [
                "일본",
                "0",
                "맥아향",
                "논알코올",
                "청량감",
                "깔끔함"
            ],
            features: beerCategoryArray[8][1]
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