// crawling beers

import express, { Request, Response, NextFunction, Router, response } from "express";
import mongoose, { ObjectId } from "mongoose";
import moment from "moment";

import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";
import { IBeer } from "../interfaces/beer";
import { IBeerCategory } from "../interfaces/beerCategory";

const beerCrawlingRouter = express.Router();

beerCrawlingRouter.post("/", async(req, res) => {
    const beerCategories: Array<String> = ["Lager", "Pilsner", "Ale", "IPA", "Weizen", "Dunkel", "Stout", "Bock", "Etc"];
    const beerCategoryIds: Array<ObjectId> = [];
    const beerCategoryFeatures: Array <Array<String>> = [];

    for (let i = 0; i < beerCategories.length; i ++) {
        let beerCategory = await BeerCategories.findOne({ name: beerCategories[i] });

        beerCategoryIds.push(beerCategory._id);
        beerCategoryFeatures.push(beerCategory.features);
    }

    const date = moment().format("YYYY-MM-DD hh:mm A")

    const beers: Array<IBeer> = [
        {
            name_korean: "버드와이저",
            name_english: "Budweiser",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B2%84%EB%93%9C%EC%99%80%EC%9D%B4%EC%A0%80.png",
            degree: 5.0,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "미국",
                "5.0",
                "감귤향",
                "Lager",
                "황금색",
                "안호이저부시",
                "라이트바디"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "밀러 라이트",
            name_english: "Miller Lite",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B0%80%EB%9F%AC%EB%9D%BC%EC%9D%B4%ED%8A%B8.png",
            degree: 4.2,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "미국",
                "4.2",
                "맥아향",
                "Lager",
                "밀러쿠어스",
                "옥수수"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "칭다오",
            name_english: "Tsingtao",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%B9%AD%EB%8B%A4%EC%98%A4.png",
            degree: 4.7,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "중국",
                "4.7",
                "맥아향",
                "Lager",
                "양꼬치",
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "아사히",
            name_english: "Asahi",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%95%84%EC%82%AC%ED%9E%88.png",
            degree: 5.0,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "일본",
                "5.0",
                "아로마향",
                "Lager",
                "롯데",
                "슈퍼드라이"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "빅토리안 비터",
            name_english: "Victorian Bitter",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B9%85%ED%86%A0%EB%A6%AC%EC%95%84%EB%B9%84%ED%84%B0.png",
            degree: 4.6,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "호주",
                "4.6",
                "아로마향",
                "Lager",
                "VB",
                "포스터스"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "카스 프레시",
            name_english: "Cass Fresh",
            image: "http://cdn.news2day.co.kr/data2/content/image/2020/06/22/20200622346560.png",
            degree: 4.5,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "4.5",
                "맥아향",
                "Lager",
                "쌉쌀한맛",
                "강한탄산",
                "OB"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "카스 라이트",
            name_english: "Cass Light",
            image: "http://www.taxtimes.co.kr/data/photos/mig_photos/2016/223635/223635_2.jpg",
            degree: 4,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "4.0",
                "맥아향",
                "Lager",
                "강한탄산",
                "저칼로리",
                "OB"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "하이트",
            name_english: "Hite",
            image: "https://post-phinf.pstatic.net/MjAxODA3MDlfMTI1/MDAxNTMxMTIyMDM4NDMz.Ky0_19mPiPFuSTP-MYP_APBeauG7CtzCJIvGP-Tm1i8g.JT61MYs2U4k_xRs-LNB9yQIZ5TbuQHwUp9VvmQ-Xw7Mg.JPEG/20180301000022.jpg?type=w1200",
            degree: 4.3,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "4.3",
                "맥아향",
                "Lager",
                "강한탄산",
                "청량감"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "맥스",
            name_english: "Max",
            image: "http://file.hitejinro.com/hitejinro2016/upFiles/notice/20150715_68143394.jpg",
            degree: 4.5,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "4.5",
                "맥아향",
                "Lager",
                "연은단맛",
                "강한탄산"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "테라",
            name_english: "Terra",
            image: "https://file.mk.co.kr/meet/neds/2019/03/image_readtop_2019_149823_15524352613667037.jpg",
            degree: 4.6,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "4.6",
                "맥아향",
                "Lager",
                "토네이도패턴",
                "강한탄산"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "필라이트 프레시",
            name_english: "Filite Fresh",
            image: "https://pds.joins.com//news/component/htmlphoto_mmdata/201805/28/a9b96db8-2ce2-4b28-9b6d-cd28c8e98e6f.jpg",
            degree: 4.5,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "4.5",
                "맥아향",
                "Lager",
                "가벼운맛",
                "저렴"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "클라우드",
            name_english: "Kloud",
            image: "https://dimg.donga.com/wps/NEWS/IMAGE/2021/04/20/106480478.5.jpg",
            degree: 5,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "5.0",
                "맥아향",
                "Lager",
                "롯데",
                "강한탄산"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "클라우드 드래프트",
            name_english: "Kloud Draft",
            image: "https://lh3.googleusercontent.com/proxy/B3okE0NmXzbR-NsjFmBRbHlZpDhows2SguhMKE-LDKMU-6uKRlsPs4vS1Mesb7WRDmGebauC42o-Mv3Ai41wsM7j2s030ZA4MOUnRP61nkdt2KWAEm3j-A2MgXCQLxPC3TBPkxJpt5MArXE",
            degree: 4.5,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "4.5",
                "맥아향",
                "Lager",
                "강한탄산",
                "신선한맛",
                "롯데"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "오비라거",
            name_english: "OB Lager",
            image: "http://www.cnbnews.com/data/photos/cdn/20200207/art_1581295251.jpg",
            degree: 5.2,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "5.2",
                "맥아향",
                "Lager",
                "황금색",
                "쌉쌀한맛",
                "고소한맛"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "백양 비엔나 라거",
            name_english: "Backyang BYC Vienna Lager",
            image: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAL4xdO.img?h=580&w=255&m=6&q=60&o=f&l=f",
            degree: 5.2,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "5.2",
                "맥아향",
                "Lager",
                "CU",
                "붉은호박색"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "칭다오",
            name_english: "Tsingdao",
            image: "",
            degree: 4.7,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "중국",
                "4.7",
                "맥아향",
                "Lager",
                "청량감",
                "쌉쌀한맛"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "산 미구엘",
            name_english: "San Miguel",
            image: "http://assabeer.com/web/product/small/b_146.jpg",
            degree: 5.0,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "필리핀",
                "5.0",
                "은은한향",
                "Lager",
                "씁쓸함",
                "청량감"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "코로나",
            name_english: "Corona Extra",
            image: "http://img.lb.inews24.com/image_gisa/202004/1585908004981_1_190046.jpg",
            degree: 4.6,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "멕시코",
                "4.6",
                "라임향",
                "Lager",
                "산미",
                "고소한맛"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "삿포로",
            name_english: "Tsingdao",
            image: "http://res.heraldm.com/content/image/2015/03/20/20150320000436_0.jpg",
            degree: 5.0,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "일본",
                "5.0",
                "맥아향",
                "Lager",
                "드라이맥주",
                "부드러움"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "크로넨버그 1664",
            name_english: "Kronenberg 1664",
            image: "https://img.insight.co.kr/static/2018/11/20/700/12oa11542p3166nvve96.jpg",
            degree: 5.0,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "프랑스",
                "5.0",
                "과일향",
                "Lager",
                "호불호",
                "꽃향기"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "타이거",
            name_english: "Tiger",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "싱가포르",
                "5.0",
                "맥아향",
                "Lager",
                "황금색",
                "깔끔함",
                "청량감"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "코나 롱보드 아일랜드 라거",
            name_english: "Kona Longboard Island Lager",
            image: "",
            degree: 4.6,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "미국",
                "4.6",
                "과일향",
                "Lager",
                "달콤함",
                "가벼운바디감"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "크로코 후레시",
            name_english: "Croco Fresh",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "네덜란드",
                "4.5",
                "맥아향",
                "Lager",
                "황금색",
                "강한탄산",
                "쌉쌀한맛"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "하이네켄",
            name_english: "Heineken",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "네덜란드",
                "5.0",
                "맥아향",
                "Lager",
                "황금색",
                "청량감",
                "깔끔함"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "싱하",
            name_english: "Singha",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "태국",
                "5.0",
                "맥아향",
                "Lager",
                "부드러움",
                "청량감",
                "깔끔함"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "한맥",
            name_english: "Hanmac",
            image: "",
            degree: 4.6,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "4.6",
                "맥아향",
                "Lager",
                "부드러움",
                "청량감",
                "깔끔함"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "아사히 드라이 블랙",
            name_english: "Asahi Dry Black",
            image: "",
            degree: 5.5,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "일본",
                "5.5",
                "맥아향",
                "Lager",
                "깔끔함",
                "흑맥주",
                "부드러움"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "맥스",
            name_english: "Max",
            image: "",
            degree: 5.5,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "5.5",
                "맥아향",
                "Lager",
                "부드러움",
                "황금색",
                "깔끔함"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "카프리",
            name_english: "Cafri",
            image: "",
            degree: 4.2,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "한국",
                "4.2",
                "아로마향",
                "Lager",
                "청량감",
                "가벼운바디감"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },
        {
            name_korean: "에베레스트",
            name_english: "Everest",
            image: "",
            degree: 5.5,
            categoryId: beerCategoryIds[0],
            hashtag: [
                "네팔",
                "5.5",
                "맥아향",
                "Lager",
                "황금색",
                "청량감"
            ],
            features: beerCategoryFeatures[0],
            createDate: date
        },





        {
            name_korean: "필스너우르켈",
            name_english: "Pilsner Urquell",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%95%84%EC%8A%A4%EB%84%88.png",
            degree: 4.4,
            categoryId: beerCategoryIds[1],
            hashtag: [
                "체코",
                "4.4",
                "풀향",
                "Pilsner",
                "황금색",
                "아사히그룹"
            ],
            features: beerCategoryFeatures[1],
            createDate: date
        },
        {
            name_korean: "더블 오트",
            name_english: "Double Aught",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%8D%94%EB%B8%94%EC%98%A4%ED%8A%B8.png",
            degree: 5.0,
            categoryId: beerCategoryIds[1],
            hashtag: [
                "미국",
                "5.0",
                "맥아향",
                "Pilsner",
                "보리몰트",
                "상쾌함"
            ],
            features: beerCategoryFeatures[1],
            createDate: date
        },
        {
            name_korean: "더 젠틀맨 라거",
            name_english: "The Gentleman Lager",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%8D%94%EC%A0%A0%ED%8B%80%EB%A7%A8%EB%9D%BC%EA%B1%B0.png",
            degree: 7.6,
            categoryId: beerCategoryIds[1],
            hashtag: [
                "한국",
                "7.6",
                "밀향",
                "Pilsner",
                "높은도수",
                "강렬한맛"
            ],
            features: beerCategoryFeatures[1],
            createDate: date
        },
        {
            name_korean: "베를리너 킨들 필스너",
            name_english: "Berliner Kindl Pilsener",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B2%A0%EB%A5%BC%EB%A6%AC%EB%84%88%ED%82%A8%EB%93%A4.png",
            degree: 5.1,
            categoryId: beerCategoryIds[1],
            hashtag: [
                "독일",
                "5.1",
                "감귤향",
                "Pilsner",
                "황금색",
                "쌉쌀한맛"
            ],
            features: beerCategoryFeatures[1],
            createDate: date
        },
        {
            name_korean: "산토리 프리미엄 몰트",
            name_english: "The Premium Malt's",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%82%B0%ED%86%A0%EB%A6%AC%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84.png",
            degree: 5.5,
            categoryId: beerCategoryIds[1],
            hashtag: [
                "일본",
                "5.5",
                "맥아향",
                "Pilsner",
                "다이아몬드"
            ],
            features: beerCategoryFeatures[1],
            createDate: date
        },
        {
            name_korean: "플래티넘",
            name_english: "Platinum",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%94%8C%EB%9E%98%ED%8B%B0%EB%84%98.png",
            degree: 5.0,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "한국",
                "5.0",
                "과일향",
                "황금색",
                "Pale Ale",
                "가벼운쓴맛",
                "꽃향기"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "차저 스코티쉬 라거",
            name_english: "Charger Scottish Lager Beer",
            image: "",
            degree: 7.5,
            categoryId: beerCategoryIds[1],
            hashtag: [
                "스코틀랜드",
                "7.5",
                "위스키향",
                "라거",
                "소맥맛",
                "높은도수"
            ],
            features: beerCategoryFeatures[1],
            createDate: date
        },
        {
            name_korean: "구아야베라",
            name_english: "Guayabera",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B5%AC%EC%95%BC%EC%9D%B4%EB%B2%A0%EB%9D%BC.png",
            degree: 5.5,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "미국",
                "5.5",
                "과일향",
                "Pale Ale",
                "황금색",
                "산뜻한맛"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "그루니언",
            name_english: "Grunion",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B7%B8%EB%A3%A8%EB%8B%88%EC%96%B8.png",
            degree: 5.5,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "미국",
                "5.5",
                "허브향",
                "Pale Ale",
                "멜론향",
                "정어리"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "오번",
            name_english: "Auburn",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%98%A4%EB%B2%88.png",
            degree: 4.5,
            categoryId: beerCategoryIds[2],
            hashtag:[
                "미국",
                "4.5",
                "감귤향",
                "Pale Ale",
                "KneeDeep",
                "산뜻한맛",
                "황금색"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "아크 페일 에일",
            name_english: "Ark Pale Ale",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%95%84%ED%81%AC+%ED%8E%98%EC%9D%BC%EC%97%90%EC%9D%BC+%EB%B8%8C%EB%9D%BC%EC%9A%B4.png",
            degree: 5.0,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "한국",
                "5.0",
                "시트러스향",
                "Pale Ale",
                "산뜻한맛",
                "ark"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },

        {
            name_korean: "곰표 밀맥주",
            name_english: "Gompyo",
            image: "https://file.mk.co.kr/meet/neds/2020/05/image_readtop_2020_536855_15904607324214665.jpg",
            degree: 4.5,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "한국",
                "4.5",
                "과일향",
                "Pale Ale",
                "세븐브로이",
                "cu",
                "레트로"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "호가든",
            name_english: "Hoegaarden",
            image: "http://image.newdaily.co.kr/site/data/img/2020/07/07/2020070700095_0.jpg",
            degree: 4.9,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "벨기에",
                "4.9",
                "감귤향",
                "Pale Ale",
                "부드러움"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "크로넨버그 1664 블랑",
            name_english: "Kronenberg 1665 Blanc",
            image: "https://lh3.googleusercontent.com/proxy/StDr9vakR1fx_H35J8hHvURrP5juHR0fNaXf3C5W3zVoA7QcUmMEeOExipfsa1pqg8rw-gf9N5isVHnLwgCv9xAcrp9lVSWUP2s8_WYR5ygHmb_l90f_wpqP",
            degree: 5.0,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "프랑스",
                "5.0",
                "과일향",
                "Pale Ale",
                "호불호",
                "오렌지향"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "빅웨이브 골든 에일",
            name_english: "Big Wave Golden Ale",
            image: "https://mblogthumb-phinf.pstatic.net/MjAyMDEwMjRfMjMx/MDAxNjAzNTIxOTY3NDgx.kDl0T49Y2ObgnUAkEDqlo9k6mMtJ5MoGVXG9Eox0Iu4g.ITbCdmO-uam3hbOMAhJ9dasYPV7h_hnqRJqDj5H6WXMg.JPEG.bookie815/1603521967892.jpg?type=w800",
            degree: 4.4,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "미국",
                "4.4",
                "과일향",
                "Pale Ale",
                "적은거품",
                "가벼운맛"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "코나 파이어락 페일에일",
            name_english: "Kona Fire Rock Pale Ale",
            image: "https://mblogthumb-phinf.pstatic.net/MjAxODA4MzFfMjY1/MDAxNTM1Njc5MDEwMDQ4.IlMWmGGwdHBcz4jMzq6Cr6qbpn0V_WFSu4ocnzebh_Qg.wK2AJkiqt_knND0OB_Z0ycoBzQn2OUDUB1KwXtuVwusg.JPEG.decadentliz/코나_파이어_락_페일_에일_Kona_Fire_Rock_Pale_Ale_(1).jpg?type=w800",
            degree: 5.8,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "미국",
                "5.8",
                "시트러스",
                "Pale Ale",
                "고소한맛",
                "하와이안"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "강서",
            name_english: "Gangseo",
            image: "https://post-phinf.pstatic.net/MjAxNzA4MjNfMTE4/MDAxNTAzNDkwNDIxMzQ4.Nv9RTkmRqdQrXCJilNlbbyodukYlhPJ0UHZnPrDo6gQg.aLMbeRA_FHGyOIMzY7eRD-0UMjjB1S5d0PrrRjPNuS8g.PNG/8_simg.png?type=w1200",
            degree: 4.6,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "한국",
                "4.6",
                "과일향",
                "Pale Ale",
                "세븐브로이",
                "씁슬함"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "제주 위트에일",
            name_english: "Jeju Wit Ale",
            image: "https://image.edaily.co.kr/images/photo/files/NP/S/2017/09/PS17090100307.jpg",
            degree: 5.3,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "한국",
                "5.3",
                "감귤향",
                "Pale Ale",
                "제주도",
                "부드러움"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "제주 펠롱에일",
            name_english: "Jeju Pellong Ale",
            image: "https://img.hankyung.com/photo/201808/AB.17466432.1.jpg",
            degree: 5.3,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "한국",
                "5.3",
                "시트러스",
                "Pale Ale",
                "제주도",
                "씁슬함"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "전라 에일",
            name_english: "Jeolla Ale",
            image: "https://newsimg.sedaily.com/2017/08/08/1OJO6KMZ91_1.jpg",
            degree: 4.5,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "한국",
                "4.5",
                "과일향",
                "Pale Ale",
                "세븐브로이",
                "황금색",
                "꽃향기"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "대강 페일에일",
            name_english: "Taegang Pale Ale",
            image: "http://thebooth.co.kr/wp-content/uploads/2018/12/taegaing_lineup.jpg",
            degree: 4.6,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "한국",
                "4.6",
                "과일향",
                "Pale Ale",
                "감귤향",
                "부드러움"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "블루문",
            name_english: "Bluemoon",
            image: "https://2.bp.blogspot.com/-n4Pfp5rQ_dU/WTAgr1bixEI/AAAAAAAAEtc/yaDT5v5QEd0hKcMzGrfhoCI99GqngEEAwCLcB/s1600/cerveja-blue-moon-importada-caixa-12-garrafas-355ml-D_NQ_NP_372101-MLB20282515537_042015-F.jpg",
            degree: 5.4,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "미국",
                "5.4",
                "과일향",
                "White Ale",
                "꽃향기",
                "부드러움"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "레페 브라운",
            name_english: "Leffe Brown",
            image: "https://assets.business.veluga.kr/media/public/레페_브라운_병_1.png",
            degree: 6.5,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "벨기에",
                "6.5",
                "달콤함",
                "Dark Ale",
                "높은 도수",
                "부드러움"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "레페 블론드",
            name_english: "Leffe Blond",
            image: "http://www.beerforum.co.kr/files/attach/images/1434/371/008/0b26d24fb8075beb7f2c3f0271e3165c.jpg",
            degree: 6.6,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "벨기에",
                "6.6",
                "바닐라향",
                "Pale Ale",
                "부드러움",
                "옅은단맛",
                "황금색"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "듀벨",
            name_english: "Devel",
            image: "https://p-ac.namu.la/20210208/72c238ddd5e21d7a9ef514c2daaa3bb92ff073895acaed68736c231dfbc519f4.jpeg",
            degree: 8.5,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "벨기에",
                "8.5",
                "과일향",
                "Golden Ale",
                "높은도수",
                "달콤함"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "파도",
            name_english: "Pado",
            image: "https://lh3.googleusercontent.com/proxy/hVhqbSgAaYg1hZ5NdA22Bn-Wxn35hHMDyByCcx8Y585E77czdi_V6spbdy03I0ttmhO1JC9b3jXhz2JcU9L0DJqnZxfuOoZ8NtUTsykRlzEAPmgDWp2G1W4",
            degree: 4.5,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "한국",
                "4.5",
                "감귤향",
                "Pale Ale",
                "청량감",
                "부드러움"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "에델바이스",
            name_english: "Edelweiss",
            image: "https://blog.kakaocdn.net/dn/cn89NO/btq57p1yAfq/9rFNHQHi9bbn1Yk7TZpnd1/img.png",
            degree: 5.0,
            categoryId: beerCategoryIds[2],
            hashtag: [
                "오스트리아",
                "5.0",
                "허브향",
                "Pale Ale",
                "풍성한 거품",
                "황금색"
            ],
            features: beerCategoryFeatures[2],
            createDate: date
        },
        {
            name_korean: "인디카",
            name_english: "Indica",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%9D%B8%EB%94%94%EC%B9%B4.png",
            degree: 6.5,
            categoryId: beerCategoryIds[3],
            hashtag: [
                "미국",
                "6.5",
                "과일향",
                "IPA",
                "서부해안",
                "가벼운쓴맛"
            ],
            features: beerCategoryFeatures[3],
            createDate: date
        },
        {
            name_korean: "구스 아일랜드",
            name_english: "Goose Island",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B5%AC%EC%8A%A4%EC%95%84%EC%9D%BC%EB%9E%9C%EB%93%9C.png",
            degree: 5.9,
            categoryId: beerCategoryIds[3],
            hashtag: [
                "미국",
                "5.9",
                "과일향",
                "IPA",
                "덕덕구스",
                "황금색"
            ],
            features: beerCategoryFeatures[3],
            createDate: date
        },
        {
            name_korean: "볼파스 엔젤맨",
            name_english: "Vlofas Engelman",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B3%BC%ED%8C%8C%EC%8A%A4%EC%97%94%EC%A0%A4%EB%A7%A8.png",
            degree: 6.0,
            categoryId: beerCategoryIds[3],
            hashtag: [
                "리투아니아",
                "6.0",
                "과일향",
                "IPA",
                "씁쓸한맛",
                "옅은단맛",
                "무거운무게감"
            ],
            features: beerCategoryFeatures[3],
            createDate: date
        },
        {
            name_korean: "노스 코스트 스텔라",
            name_english: "North Coast Steller",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%8A%A4%ED%85%94%EB%9D%BC.png",
            degree: 6.7,
            categoryId: beerCategoryIds[3],
            hashtag: [
                "미국",
                "6.7",
                "과일향",
                "IPA",
                "씁쓸한맛",
                "부드러운첫맛",
                "은은한끝맛"
            ],
            features: beerCategoryFeatures[3],
            createDate: date
        },
        {
            name_korean: "그린 킹",
            name_english: "Greene King",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B7%B8%EB%A6%B0%ED%82%B9.png",
            degree: 3.6,
            categoryId: beerCategoryIds[3],
            hashtag: [
                "영국",
                "3.6",
                "견과류향",
                "IPA",
                "가벼운바디감",
                "낮은도수"
            ],
            features: beerCategoryFeatures[3],
            createDate: date
        },
        {
            name_korean: "호랑이형님 순한 IPA",
            name_english: "Tiger Bro Mild IPA",
            image: "",
            degree: 4.7,
            categoryId: beerCategoryIds[3],
            hashtag: [
                "한국",
                "4.7",
                "과일향",
                "IPA",
                "청량감",
                "황금색"
            ],
            features: beerCategoryFeatures[3],
            createDate: date
        },
        {
            name_korean: "국민 IPA",
            name_english: "Kukmin IPA",
            image: "",
            degree: 6.5,
            categoryId: beerCategoryIds[3],
            hashtag: [
                "한국",
                "6.5",
                "과일향",
                "IPA",
                "청량감",
                "무거운바디감"
            ],
            features: beerCategoryFeatures[3],
            createDate: date
        },
        {
            name_korean: "퇴근길 IPA",
            name_english: "Platinum craft sunset",
            image: "",
            degree: 4.7,
            categoryId: beerCategoryIds[3],
            hashtag: [
                "한국",
                "4.7",
                "과일향",
                "IPA",
                "아로마향",
                "쌉쌀한맛"
            ],
            features: beerCategoryFeatures[3],
            createDate: date
        },
        {
            name_korean: "라구니타스 데이타임 IPA",
            name_english: "Lagunitas Daytime IPA",
            image: "",
            degree: 4.0,
            categoryId: beerCategoryIds[3],
            hashtag: [
                "미국",
                "4.0",
                "과일향",
                "IPA",
                "아로마향",
                "황금색"
            ],
            features: beerCategoryFeatures[3],
            createDate: date
        },
        {
            name_korean: "바이엔슈테판",
            name_english: "Weihenstephan",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B0%94%EC%9D%B4%EC%97%94%EC%8A%88%ED%85%8C%ED%8C%90.png",
            degree: 7.7,
            categoryId: beerCategoryIds[4],
            hashtag:[
                "독일",
                "7.7",
                "바나나향",
                "Weizen",
                "진한밀몰트",
                "크리미한거품",
                "부드러움"
            ],
            features: beerCategoryFeatures[4],
            createDate: date
        },
        {
            name_korean: "파울라너 헤페",
            name_english: "Paulaner Hefe Weizenbier Dunkel",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%8C%8C%EC%9A%B8%EB%9D%BC%EB%84%88%ED%97%A4%ED%8E%98.png",
            degree: 5.5,
            categoryId: beerCategoryIds[4],
            hashtag:[
                "독일",
                "5.5",
                "과일향",
                "Weizen",
                "황금색",
                "씁쓸한맛"
            ],
            features: beerCategoryFeatures[4],
            createDate: date
        },
        {
            name_korean: "리허 바이젠",
            name_english: "Licher Weizen",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%A6%AC%ED%97%88+%EB%B0%94%EC%9D%B4%EC%A0%A0.png",
            degree: 5.4,
            categoryId: beerCategoryIds[4],
            hashtag:[
                "독일",
                "5.4",
                "과일향",
                "Weizen",
                "가벼운바디감",
                "깔끔한끝맛"
            ],
            features: beerCategoryFeatures[4],
            createDate: date
        },
        {
            name_korean: "엘 바이젠",
            name_english: "L Weizen",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%97%98%EB%B0%94%EC%9D%B4%EC%A0%A0.png",
            degree: 4.9,
            categoryId: beerCategoryIds[4],
            hashtag:[
                "독일",
                "4.9",
                "과일향",
                "Weizen",
                "가벼운바디감",
                "저렴"
            ],
            features: beerCategoryFeatures[4],
            createDate: date
        },
        {
            name_korean: "블루 문",
            name_english: "Blue Moon",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B8%94%EB%A3%A8%EB%AC%B8.png",
            degree: 5.4,
            categoryId: beerCategoryIds[4],
            hashtag:[
                "미국",
                "5.4",
                "오렌지향",
                "Weizen",
                "오렌지맛",
                "톡쏘는탄산"
            ],
            features: beerCategoryFeatures[4],
            createDate: date
        },
        {
            name_korean: "필라이트 바이젠",
            name_english: "Filte Weizen",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryIds[4],
            hashtag:[
                "한국",
                "4.5",
                "오렌지향",
                "Weizen",
                "발포주",
                "가벼운맛"
            ],
            features: beerCategoryFeatures[4],
            createDate: date
        },




        {
            name_korean: "에딩거 둔켈",
            name_english: "Erdinger Dunkel",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%97%90%EB%94%A9%EA%B1%B0%EB%91%94%EC%BC%88.png",
            degree: 5.3,
            categoryId: beerCategoryIds[5],
            hashtag: [
                "독일",
                "5.3",
                "커피향",
                "Dunkel",
                "흑맥주",
                "깔끔함"
                
            ],
            features: beerCategoryFeatures[5],
            createDate: date
        },
        {
            name_korean: "파울라너 바이스비어 둔켈",
            name_english: "PAULANER Weissbier Dunkel",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%8C%8C%EC%9A%B8%EB%9D%BC%EB%84%88+%EB%B0%94%EC%9D%B4%EC%8A%A4+%EB%B9%84%EC%96%B4%EB%91%94%EC%BC%88.png",
            degree: 5.3,
            categoryId: beerCategoryIds[5],
            hashtag: [
                "독일",
                "5.3",
                "초콜릿향",
                "Dunkel",
                "흑맥주",
                "깔끔함"
            ],
            features: beerCategoryFeatures[5],
            createDate: date
        },
        {
            name_korean: "벨텐부르거 바로크 둔켈",
            name_english: "Klosterbrauerei Weltenburg GMBH",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B2%A8%ED%85%90%EB%B6%80%EB%A5%B4%EA%B1%B0%EB%B0%94%EB%A1%9C%ED%81%AC%EB%91%94%EC%BC%88.png",
            degree: 4.7,
            categoryId: beerCategoryIds[5],
            hashtag: [
                "독일",
                "4.7",
                "넛향",
                "Dunkel",
                "다크라거",
                "부드러움",
                "흑맥주",
                
            ],
            features: beerCategoryFeatures[5],
            createDate: date
        },
        {
            name_korean: "산청맥주 둔켈",
            name_english: "Sancheong Brewery Dunkel",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%82%B0%EC%B2%AD%EB%A7%A5%EC%A3%BC%EB%91%94%EC%BC%88.png",
            degree: 4.5,
            categoryId: beerCategoryIds[5],
            hashtag: [
                "한국",
                "4.5",
                "로스팅향",
                "Dunkel",
                "다크라거",
                "흑맥주"
            ],
            features: beerCategoryFeatures[5],
            createDate: date
        },
        {
            name_korean: "코젤 다크",
            name_english: "Kozel Dark",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%BD%94%EC%A0%A4%EB%8B%A4%ED%81%AC.png",
            degree: 3.8,
            categoryId: beerCategoryIds[5],
            hashtag: [
                "체코",
                "3.8",
                "커피향",
                "Dunkel",
                "흑맥주",
                "초콜릿향"
            ],
            features: beerCategoryFeatures[5],
            createDate: date
        },
        // Stout Id : beerCategoryArray[6][0]
        // Stout features: beerCategoryFeatures[6],
        {
            name_korean: "기네스 오리지날",
            name_english: "Guinness Original",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B8%B0%EB%84%A4%EC%8A%A4%EC%98%A4%EB%A6%AC%EC%A7%80%EB%84%90.png",
            degree: 4.2,
            categoryId: beerCategoryIds[6],
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
            features: beerCategoryFeatures[6],
            createDate: date
        },
        {
            name_korean: "기네스 드래프트",
            name_english: "Guinness Draught",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EA%B8%B0%EB%84%A4%EC%8A%A4%EB%93%9C%EB%9E%98%ED%94%84%ED%8A%B8.png",
            degree: 4.2,
            categoryId: beerCategoryIds[6],
            hashtag: [
                "아일랜드",
                "4.2",
                "커피향",
                "Stout",
                "흑맥주",
                "부드러움",
                "초콜릿향"
            ],
            features: beerCategoryFeatures[6],
            createDate: date
        },
        {
            name_korean: "스팀 브루 임페리얼 스타우트",
            name_english: "Steam Brew Imperial Stout",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%8A%A4%ED%8C%80%EB%B8%8C%EB%A3%A8%EC%9E%84%ED%8E%98%EB%A6%AC%EC%96%BC%EC%8A%A4%ED%83%80%EC%9A%B0%ED%8A%B8.png",
            degree: 7.5,
            categoryId: beerCategoryIds[6],
            hashtag: [
                "독일",
                "7.5",
                "초콜릿향",
                "Stout",
                "흑맥주",
                "부드러움"
            ],
            features: beerCategoryFeatures[6],
            createDate: date
        },
        {
            name_korean: "위치 초콜렛 스타우트",
            name_english: "The Witch Chocholate Stou",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%9C%84%EC%B9%98+%EC%B4%88%EC%BD%9C%EB%A6%BF+%EC%8A%A4%ED%83%80%EC%9A%B0%ED%8A%B8.png",
            degree: 5.7,
            categoryId: beerCategoryIds[6],
            hashtag: [
                "한국",
                "5.7",
                "초콜릿향",
                "Stout",
                "무거운바디감",
                "흑맥주" 
            ],
            features: beerCategoryFeatures[6],
            createDate: date
        },
        {
            name_korean: "팍세 스타우트",
            name_english: "Faxe Stout",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%8C%8D%EC%84%B8+%EC%8A%A4%ED%83%80%EC%9A%B0%ED%8A%B8.png",
            degree: 7.7,
            categoryId: beerCategoryIds[6],
            hashtag: [
                "덴마크",
                "7.7",
                "초콜릿향",
                "로스팅",
                "흑맥주"
            ],
            features: beerCategoryFeatures[6],
            createDate: date
        },
        {
            name_korean: "시에라 네바다 스타우트",
            name_english: "Sierra Nevada Stout",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%8B%9C%EC%97%90%EB%9D%BC%EB%84%A4%EB%B0%94%EB%8B%A4%EC%8A%A4%ED%83%80%EC%9A%B0%ED%8A%B8.png",
            degree: 5.8,
            categoryId: beerCategoryIds[6],
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
            features: beerCategoryFeatures[6],
            createDate: date
        },
        {
            name_korean: "파울라너 살바토르",
            name_english: "Paulaner Salvator",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%ED%8C%8C%EC%9A%B8%EB%9D%BC%EB%84%88+%EC%82%B4%EB%B0%94%ED%86%A0%EB%A5%B4.png",
            degree: 7.9,
            categoryId: beerCategoryIds[7],
            hashtag: [
                "독일",
                "과일향",
                "7.9",
                "Stout",
                "흑맥주",
                "높은도수",
                "부드러움",
                
            ],
            features: beerCategoryFeatures[7],
            createDate: date
        },
        {
            name_korean: "슈퍼 보크",
            name_english: "Super Bock",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%8A%88%ED%8D%BC%EB%B3%B4%ED%81%AC.png",
            degree: 5.2,
            categoryId: beerCategoryIds[7],
            hashtag: [
                "포르투칼",
                "5.2",
                "보리향",
                "Bock",
                "흑맥주",
                "달콤함" 
            ],
            features: beerCategoryFeatures[7],
            createDate: date
        },
        {
            name_korean: "아잉거 셀러브레이터 도펠 보크",
            name_english: "Ayinger Celebrator Doppelbock",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%95%84%EC%9E%89%EA%B1%B0+%EC%85%80%EB%9F%AC%EB%B8%8C%EB%A0%88%EC%9D%B4%ED%84%B0+%EB%8F%84%ED%8E%A0+%EB%B3%B4%ED%81%AC.png",
            degree: 6.7,
            categoryId: beerCategoryIds[7],
            hashtag: [
                "독일",
                "6.7",
                "커피향", 
                "Bock",
                "흑맥주",
                "부드러움"
            ],
            features: beerCategoryFeatures[7],
            createDate: date
        },
        {
            name_korean: "바이엔슈테판 코르비니안",
            name_english: "Weihenstephaner Korbinian",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EB%B0%94%EC%9D%B4%EC%97%94%EC%8A%88%ED%85%8C%ED%8C%90+%EC%BD%94%EB%A5%B4%EB%B9%84%EB%8B%88%EC%95%88.png",
            degree: 7.4,
            categoryId: beerCategoryIds[7],
            hashtag: [
                "독일",
                "7.4",
                "꽃향",
                "Bock",
                "흑맥주",
                "무거운바디감",
                "달콤함"
            ],
            features: beerCategoryFeatures[7],
            createDate: date
        },
        {
            name_korean: "아벤티누스 아이스복",
            name_english: "Schneider Aventinus Eisbock",
            image: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerImage/%EC%95%84%EB%B2%A4%ED%8B%B0%EB%88%84%EC%8A%A4%EC%95%84%EC%9D%B4%EC%8A%A4%EB%B6%81.png",
            degree: 12.0,
            categoryId: beerCategoryIds[7],
            hashtag: [
                "독일",
                "12.0",
                "과일향",
                "Bock",
                "높은도수",
                "흑맥주",
            ],
            features: beerCategoryFeatures[7],
            createDate: date
        },
        {
            name_korean: "카스 0.0",
            name_english: "Cass 0.0",
            image: "",
            degree: 0,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "한국",
                "0",
                "맥아향",
                "논알코올",
                "오비"
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "데스페라도스",
            name_english: "Desperados",
            image: "",
            degree: 5.9,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "네덜란드",
                "5.9",
                "과일향",
                "데킬라맥주",
                "가벼운바디감",
                "달콤함",
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "호가든 로제",
            name_english: "Hogaarden Rose",
            image: "",
            degree: 3.0,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "벨기에",
                "3.0",
                "과일향",
                "과일주",
                "가벼운맛",
                "달콤함",
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "타이거 라들러 자몽",
            name_english: "Tiger Radler Grapefruit",
            image: "",
            degree: 2.0,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "싱가포르",
                "2.0",
                "과일향",
                "과일주",
                "가벼운맛",
                "달콤함",
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "타이거 라들러 레몬",
            name_english: "Tiger Radler Lemon",
            image: "",
            degree: 2.0,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "싱가포르",
                "2.0",
                "과일향",
                "과일주",
                "가벼운맛",
                "달콤함",
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "피즈 딸기",
            name_english: "Fizz Strawberry",
            image: "",
            degree: 4.0,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "스웨덴",
                "4.0",
                "과일향",
                "Cider",
                "달콤함",
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "애플 폭스",
            name_english: "Apple Fox",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "싱가포르",
                "4.5",
                "과일향",
                "Cider",
                "청량감",
                "강한 탄산"
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "써머스비 애플",
            name_english: "Somersby Apple",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "덴마크",
                "4.5",
                "과일향",
                "Cider",
                "사과맛",
                "달콤함"
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "매그너스 쥬시애플",
            name_english: "Magners Juicy Apple",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "아일랜드",
                "4.5",
                "과일향",
                "Cider",
                "청량감",
                "달콤함"
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "필굿",
            name_english: "Fil Good",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "한국",
                "4.5",
                "아로마향",
                "Etc",
                "오비",
                "저렴"
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "필굿 세븐",
            name_english: "Fil Good 7",
            image: "",
            degree: 7,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "한국",
                "7",
                "강한 홉향",
                "Etc",
                "높은도수",
                "청량감",
                "저렴"
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "말표 흑맥주",
            name_english: "Malpyo",
            image: "",
            degree: 4.5,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "한국",
                "4.5",
                "커피향",
                "Etc",
                "아로마향",
                "초콜링향",
                "스퀴즈브루어리"
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "하이네켄 무알콜",
            name_english: "Heineken Non Alcohol",
            image: "",
            degree: 0,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "네덜란드",
                "0",
                "맥아향",
                "논알코올",
                "깔끔함",
                "청량감"
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "칼스버그 0.0",
            name_english: "Carlsberg 0.0",
            image: "",
            degree: 0,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "덴마크",
                "0",
                "과일향",
                "논알코올",
                "청량감",
                "깔끔함"
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },
        {
            name_korean: "아사히 드라이 제로",
            name_english: "Asahi Dry Zero",
            image: "",
            degree: 0,
            categoryId: beerCategoryIds[8],
            hashtag: [
                "일본",
                "0",
                "맥아향",
                "논알코올",
                "청량감",
                "깔끔함"
            ],
            features: beerCategoryFeatures[8],
            createDate: date
        },


    ]

    try {
        Beers.collection.drop();

        for (let i = 0; i < beers.length; i ++) {
            const date = moment().format("YYYY-MM-DD hh:mm A"); // 이거 내일 하기!! 맥주 추가 날짜!!

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