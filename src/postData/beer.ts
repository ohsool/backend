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

    // American Lager Id : beerCategoryArray[0][0]
    // American Lager features: beerCategoryArray[0][1]

    // Pilsner Lager Id : beerCategoryArray[1][0]
    // Pilsner Lager features: beerCategoryArray[1][1]

    const beers = [
        {
            name_korean: "버드와이저",
            name_english: "Budweiser",
            image: "https://w.namu.la/s/f175e20dd8249487f7c90f64e67c5eeaebcd20f735d4d520108525e07c9345627d74b5afadabcc1d25601ef7ee336df7ec5baa2a6150c678f84d9c42b132c14f66a81c61cf081af5c8be31473f6af3ab02a21646f9fef91e7745b537a20e025464a0411a3e132c5a8cb7d48c0d8e5a20",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "황금색",
                "안호이저 부시",
                "라이트바디"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "밀러",
            name_english: "Miller",
            image: "https://w.namu.la/s/f1cd2f61b857b89475f363cd3b5f0e25704a992777e65920787f058e198a3a5ca4514f214b29b611142fab83a83ec98d22d1a2752e8b86e463295997ab9dd3adb1dcca3860d65728635461da6a83ef34607b1e05dd36d23d1a137f17b19a0ee9",
            degree: 4.2,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "미국",
                "밀러쿠어스",
                "MillerCoors",
                "옥수수"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "칭다오",
            name_english: "Tsingtao",
            image: "https://w.namu.la/s/7b94f3f2759abf0fa4395a98ab8ca70a0ccf0dd8906b9cf2b41cfa0b326b5cc430fddb35362dbafc0f713f2822a1cbe2bb5a60c15c0904c930505cc3b056ae577f0764db576df67b348372872147e9a095da5b57b2102ccf3010581c903269a3",
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
            image: "https://w.namu.la/s/c226d5ff92742ad3c83b53b55442129f7bc59b9952a25544b509ac1a8cffc4e18aed03c94256612d14f3ebd0af768c5e91f63ca7ffc1060cec65f5378944e101261487301112f8f7dea576c17a5ba7d535c756456954066a261119ee9c05049b9df71aa3435e3b51b9c235e961e85f1d",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "일본"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "빅토리안 비터",
            name_english: "Victorian Bitter",
            image: "https://dbscthumb-phinf.pstatic.net/1005_000_1/20120321172630427_QZKW19S1L.jpg/fe23_0089_i1.jpg?type=m250&wm=N",
            degree: 4.6,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "VB",
                "비터에일",
                "칼톤_앤_유나이티드_베버리지즈",
                "포스터스"
            ],
            features: beerCategoryArray[0][1]
        },

        {
            name_korean: "필스너우르켈",
            name_english: "Pilsner Urquell",
            image: "https://dbscthumb-phinf.pstatic.net/1005_000_1/20120321172525286_ZTWFMHPVI.jpg/fe23_0051_i1.jpg?type=m250&wm=N",
            degree: 4.4,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "체코",
                "플젠스키_프라즈로이_양조장",
                "황금색"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "더블 오트",
            name_english: "Double Aught",
            image: "https://beerconnoisseur.com/sites/default/files/styles/beer_page_245w/public/beer/double-aught-pils.jpg?itok=A765wZPW",
            degree: 5.0,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "미국",
                "베어리퍼블릭_브루잉_컴퍼니",
                "100%_보리_몰트"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "더 젠틀맨",
            name_english: "The Gentleman",
            image: "https://beerlikeit.com/upimg/brd/hE89tKGRZpYr8bB5jTO8L1nNsQhjplT0.png",
            degree: 7.6,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "플레이그라운드_브루어리",
                "한국"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "베를린 킨들 필스너",
            name_english: "Berliner Kindl Pilsener",
            image: "https://www.deutschesbier.com/wp-content/uploads/2016/01/Berliner-Kindl-Group-Packshot.jpg",
            degree: 5.1,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "독일",
                "베를린_킨들_브라우어하이",
                "황금색",
                "감귤"
            ],
            features: beerCategoryArray[1][1]
        },
        {
            name_korean: "산토리 프리미엄 몰트",
            name_english: "The Premium Malt's",
            image: "https://www.suntory.cn/en/what_we_make/malts_200401.jpg",
            degree: 5.5,
            categoryId: beerCategoryArray[1][0],
            hashtag: [
                "일본",
                "다이아몬드_몰트"
            ],
            features: beerCategoryArray[1][1]
        },





        {
            name_korean: "플래티넘",
            name_english: "Platinum",
            image: "https://mblogthumb-phinf.pstatic.net/MjAxODAxMDJfNDAg/MDAxNTE0ODk3MzA2MDEz.LzQc3SoBCaB74xaAWA6wRYehas79seuuU1B_je1dUR8g.qto-yOORsm7KLE9E7tYWbG0DHpMiAabCcMNj8NeO4rkg.JPEG.gf20003/IMG_20180102_204035673.jpg?type=w2",
            degree: 5.0,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "오렌지색",
                "과일향",
                "미국식_페일_에일"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "구아야베라",
            name_english: "Guayabera",
            image: "https://blog.kakaocdn.net/dn/cxPgcq/btqDurnf7LM/ClxhuI7sTvrtZuvblGhzq0/img.jpg",
            degree: 5.5,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "황금색",
                "과일향",
                "가볍고산뜻한맛"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "그루니언",
            name_english: "Grunion",
            image: "https://mblogthumb-phinf.pstatic.net/20150706_197/decadentliz_1436154944009KC4QI_JPEG/IMG_0244.JPG?type=w2",
            degree: 5.5,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "멜론향",
                "허브향",
                "캐러멜몰트맥주",
                "가볍고산뜻한맛"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "오번",
            name_english: "Auburn",
            image: "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F240DE84B596054AC27",
            degree: 4.5,
            categoryId: beerCategoryArray[2][0],
            hashtag:[
                "감귤향",
                "가볍고산뜻한맛",
                "황금색"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "아크 페일 에일",
            name_english: "Ark Pale Ale",
            image: "http://www.koreacraftbrewery.com/wp-content/uploads/2019/09/%E1%84%8B%E1%85%A1%E1%84%8F%E1%85%B3-%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%8B%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF-%E1%84%82%E1%85%AE%E1%84%81%E1%85%B5.png",
            degree: 5.0,
            categoryId: beerCategoryArray[2][0],
            hashtag: [
                "맥아향",
                "상쾌한시트러스향",
                "한국식"
            ],
            features: beerCategoryArray[2][1]
        },
        {
            name_korean: "인디카",
            name_english: "Indica",
            image: "https://static.openfoodfacts.org/images/products/075/124/912/9129/front_fr.5.full.jpg",
            degree: 6.5,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "미국서부해안",
                "과일향",
                "꽃향",
                "상쾌한맛",
                "쌉사름한맛"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "구스 아일랜드",
            name_english: "Goose Island",
            image: "https://world-ar.openfoodfacts.org/images/products/073/692/011/4403/front_fr.21.400.jpg",
            degree: 5.9,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "과일향",
                "진한홉향"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "볼파스 엔젤맨",
            name_english: "Vlofas Engelman",
            image: "https://newmarket.brews.co.nz/wp-content/uploads/sites/10/2020/08/volfas-ipa.jpg",
            degree: 6.0,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "과일향",
                "씁쓸한맛",
                "옅은단맛",
                "무거운무게감",
                "보통의탄산"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "노스 코스트 스텔라",
            name_english: "North Coast Steller",
            image: "https://northcoastbrewing.com/wp-content/uploads/2019/01/Steller-IPA-bottle-and-pour.png",
            degree: 6.7,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "과일향",
                "쌉사름한맛",
                "올드스쿨",
                "부드러운첫맛",
                "은은한끝맛"
            ],
            features: beerCategoryArray[3][1]
        },
        {
            name_korean: "그린 킹",
            name_english: "Greene King",
            image: "https://digitalcontent.api.tesco.com/v2/media/ghs/1665603d-bcb2-49ed-9961-ddc3e6108ee6/snapshotimagehandler_374015900.jpeg?h=540&w=540",
            degree: 3.6,
            categoryId: beerCategoryArray[3][0],
            hashtag: [
                "견과류향",
                "가벼운무게감",
                "낮은도수"
            ],
            features: beerCategoryArray[3][1]
        },







        {
            name_korean: "바이엔슈테판",
            name_english: "Weihenstephan",
            image: "https://www.weihenstephaner.de/fileadmin/_processed_/f/0/csm_HWB_4b5ee6204e.png",
            degree: 7.7,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "진한밀몰트",
                "크리미한거품",
                "부드러운목넘김",
                "고정팬"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "파울라너",
            name_english: "Paulaner",
            image: "https://w.namu.la/s/da1487d18c7596030c3df20df176208d053f77b20b77e3043e153bfcf6d686822ce39686542cd34ace4e7cae454bf98232e8b50982e68624a8d398b4b73b4034fd9ade77127b7a52e0cfd0c1cc280ebe7ad932937a57547b6abd7b4ed899e7ab",
            degree: 5.5,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "황금색",
                "과일향",
                "쓴맛"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "리허 바이젠",
            name_english: "Licher Weizen",
            image: "https://beerconnoisseur.com/sites/default/files/styles/beer_page_245w/public/beer/licher-weizen-licher-privatbrauerei.jpg?itok=3HHbf9cx",
            degree: 5.4,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "과일향",
                "바이젠효모",
                "에스테르",
                "라이트바디감",
                "깔끔한피니쉬"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "엘 바이젠",
            name_english: "L Weizen",
            image: "https://modernseoul.files.wordpress.com/2013/09/l-weizen-german-beer-can.jpg",
            degree: 4.9,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "과일향",
                "가벼운무게감",
                "저렴함"
            ],
            features: beerCategoryArray[4][1]
        },
        {
            name_korean: "블루 문",
            name_english: "Blue Moon",
            image: "https://lh3.googleusercontent.com/proxy/Cl6yWSCcCI0eVkcmumR7WSCkHGLIZ_BcQmrYNP3TrE1M8B2ohyq9tAB-BUpTqMJSMmMShZmWBonr4JHTWPjWNphBIFiT8A8nfSeuH-eRIhuCeqgGc0zNA3qsn_sHRJMf5lg8okv6",
            degree: 5.4,
            categoryId: beerCategoryArray[4][0],
            hashtag:[
                "오렌지향",
                "오렌지맛",
                "탁한금색",
                "톡쏘는탄산"
            ],
            features: beerCategoryArray[4][1]
        },





        {
            name_korean: "에딩거 둔켈",
            name_english: "Erdinger Dunkel",
            image: "http://assabeer.com/web/product/small/b_200.jpg",
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
            image: "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MzBfMjY1/MDAxNTkzNTE2MTIwNzQ5.mom0GAqk9YWDZ_2x4bg3CJaMDst-OpsbbPNeLCpjTWYg.Wz4fR4n8xkFl6tKLol1_1YOQJZb_3cLJkbYkuFXLp40g.JPEG.bookie815/output_2820154251.jpg?type=w800",
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
            image: "https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5011_000_2%2F20210721111024484_G7ROEWLIZ.jpg%2FW0500302.jpg%3Ftype%3Dw690_fst%26wm%3DN%22&twidth=353&theight=530&opts=17",
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
            image: "https://blog.kakaocdn.net/dn/BQECw/btq0AG14Iz7/niBN7yIIbf4SASOvrOM631/img.jpg",
            degree: 4.5,
            categoryId: beerCategoryArray[5][0],
            hashtag: [
                "한국",
                "다크라거스타일",
                "흑맥주",
                "로스팅향"
            ],
            features: beerCategoryArray[5][1]
        },
        {
            name_korean: "코젤 다크",
            name_english: "Kozel Dark",
            image: "https://t1.daumcdn.net/cfile/tistory/99916F3359FBC76D19",
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
            image: "https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5011_000_2%2F20210721112152759_8F3SKEXGO.jpg%2FW0500466.jpg%3Ftype%3Dw690_fst%26wm%3DN%22&twidth=353&theight=530&opts=17",
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
            image: "https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5011_000_2%2F20210721112141072_PNPNN2AEH.jpg%2FW0500463.jpg%3Ftype%3Dw690_fst%26wm%3DN%22&twidth=353&theight=530&opts=17",
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
            name_korean: "스팀 브루, 임페리얼 스타우트",
            name_english: "Steam Brew, Imperial Stout",
            image: "https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5011_000_2%2F20210721110109899_P665R683Q.png%2FW0501603.png%3Ftype%3Dw690_fst%26wm%3DN%22&twidth=353&theight=530&opts=17",
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
            image: "https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5011_000_2%2F20210721110110514_GA7LD0ATA.png%2FW0501385.png%3Ftype%3Dw690_fst%26wm%3DN%22&twidth=353&theight=530&opts=17",
            degree: 5.7,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "대한민국",
                "오트밀향",
                "바디감",
                "초콜릿향",
                "흑맥주" 
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "팍세 스타우트",
            name_english: "Faxe Stout",
            image: "https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5011_000_2%2F20210721110833914_T4JYKKRIT.jpg%2FW0501040.jpg%3Ftype%3Dw690_fst%26wm%3DN%22&twidth=353&theight=530&opts=17",
            degree: 7.7,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "로스팅향",
                "흑맥주",
                "초콜릿향"  
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "시에라 네바다 스타우트",
            name_english: "Sierra Nevada Stout",
            image: "https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5011_000_2%2F20210721111504718_19K2V34A9.jpg%2FW0501140.jpg%3Ftype%3Dw690_fst%26wm%3DN%22&twidth=353&theight=530&opts=17",
            degree: 5.8,
            categoryId: beerCategoryArray[6][0],
            hashtag: [
                "커피향",
                "흑맥주",
                "초콜릿향",
                "바디감",
                "부드러움",
                "과일향" 
            ],
            features: beerCategoryArray[6][1]
        },
        {
            name_korean: "파울라너 살바토르",
            name_english: "Paulaner Salvator",
            image: "https://dbscthumb-phinf.pstatic.net/1005_000_1/20120321172443452_T1HHZNXCQ.jpg/fe23_0027_i1.jpg?type=m250&wm=N",
            degree: 7.9,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "흑맥주",
                "높은도수",
                "부드러움",
                "치즈",
                "과일향" 
            ],
            features: beerCategoryArray[7][1]
        },
        {
            name_korean: "슈퍼 보크",
            name_english: "Super Bock",
            image: "https://postfiles.pstatic.net/MjAyMTAxMjRfMTcz/MDAxNjExNDcwOTgxMjM4.y3btYRi8JQBlHdK9pRyhElZOG0thQPjDHx0U7mOlNoMg.7kO6aV0UguJIQWZlKoYp1Sgd0g42JEkfIJT2Xwu95N8g.JPEG.choonbeer/SE-02055167-c560-4a47-bc9b-237e3bf18af1.jpg?type=w773",
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
            image: "https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5011_000_2%2F20210721111407979_P6TB9TKBM.jpg%2FW0501127.jpg%3Ftype%3Dw690_fst%26wm%3DN%22&twidth=353&theight=530&opts=17",
            degree: 6.7,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "흑맥주",
                "마일드함",
                "부드러움",
                "커피향", 
                "독일" 
            ],
            features: beerCategoryArray[7][1]
        },
        {
            name_korean: "바이엔슈테판 코르비니안",
            name_english: "Weihenstephaner Korbinian",
            image: "https://beerlikeit.com/upimg/brd/BRD0001799.png",
            degree: 7.4,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "흑맥주",
                "무거운바디감",
                "달콤함",
                "새콤함", 
                "독일" 
            ],
            features: beerCategoryArray[7][1]
        },
        {
            name_korean: "아벤티누스 아이스복",
            name_english: "Schneider Aventinus Eisbock",
            image: "https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5011_000_2%2F20210721111004052_S1DES1LC4.jpg%2FW0501064.jpg%3Ftype%3Dw690_fst%26wm%3DN%22&twidth=353&theight=530&opts=17",
            degree: 12,
            categoryId: beerCategoryArray[7][0],
            hashtag: [
                "흑맥주",
                "과일향",
                "아로마향",
                "부드러운바디감",
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