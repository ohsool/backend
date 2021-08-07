// crawling beer categories

import express, { Request, Response, NextFunction, Router, response } from "express";
import BeerCategories from "../schemas/beerCategory";

const beerCategoryCrawlingRouter = express.Router();

beerCategoryCrawlingRouter.post("/", async(req, res) => {
    const beerCategory = [
        {
            name: "Lager",
            image: "https://drive.google.com/uc?export=view&id=1rGWJaU06CmWlyi7ZKHmk7ZwhLYlf6blX ",
            title: "맥주하면 제일 먼저 떠오르는 아메리칸 라거!",
            description: "4.2~5.3%의 알코올 도수를 가진 아메리칸 라거는 보리와 홉의 사용량을 줄이고 옥수수나 쌀 등의 녹말을 섞어 투명하고 밝은 노란색에 풍부한 탄산과 청량감이 특징인 맥주예요!",
            features: {
                "bitter": 3,
                "crispy": 5,
                "flavor": 2,
                "sweet": 1,
                "nutty": 3
            }
        },
        {
            name: "Pilsner",
            image: "https://drive.google.com/uc?export=view&id=1j39Se8Ke79HgFHbu21Lz3gTXIm5QwKxB ",
            title: "라거계의 꽃 필스너!",
            description: "3~4%의 낮은 알코올 함량을 가진 필스너는 체코의 필젠 지역에서 처음 생산되어 부드러운 거품, 밝고 투명한 황금빛에 일반 라거에 비해 홉의 쌉싸름한 맛과 풍미가 더해져 깊은 곡물 맛이 특징인 맥주예요!",
            features: {
                "bitter": 2,
                "crispy": 4,
                "flavor": 3,
                "sweet": 2,
                "nutty": 2
            }
        },
        {
            name: "Pale Ale",
            image: "https://drive.google.com/uc?export=view&id=1SsjQnOOz1LSGILxFV4cXkDJ7W5Gao4Fg ",
            title: "에일을 대표하는 페일 에일!",
            description: "4.4~5.4%의 가벼운 알코올 함량을 가진 페일 에일은 보리에 싹을 틔워 건조시킨 뒤 발효한 맥아를 사용해 주조해 쌉쌀한 맛을 중심으로 허브, 풀내음, 맥아의 달큰함이 조화를 이루는 맥주예요!",
            features: {
                "bitter": 4,
                "crispy": 1,
                "flavor": 2,
                "sweet": 2,
                "nutty": 1
            }
        },
        {
            name: "IPA",
            image: "https://drive.google.com/uc?export=view&id=167ljYZXZliJWjjEXjh826ZB99EfbVYKq ",
            title: "더운 여름날엔 열대향 가득 IPA!",
            description: "평균도수가 5~6%인 IPA는 맥주의 맛과 향을 담당하는 홉이 많이 첨가되어 있으며, 홉향은 꽃의 특성과 과일류 등이 있고 탄산이 비교적 약한 향기롭고 쓴맛이 강한 맥주예요!",
            features: {
                "bitter": 4,
                "crispy": 3,
                "flavor": 5,
                "sweet": 4,
                "nutty": 2
            }
        },
        {
            name: "Weizen",
            image: "https://drive.google.com/uc?export=view&id=1DTgOTUUnPwn6Q1HTcbzF3FW4UG37OnUF ",
            title: "맛있는데 전용잔도 이쁜 바이젠!",
            description: "7~9%의 센 도수를 자랑하는 바이젠은 꽃병 모양의 전용잔에 마시는 특징이 있어요. 밀과 보리를 함께 섞어 양조할 때, 특별한 종자의 이스트가 사용되어 바나나와 정향 비슷한 진한 향이 나는 맥주예요!",
            features: {
                "bitter": 1,
                "crispy": 2,
                "flavor": 4,
                "sweet": 2,
                "nutty": 1
            }
        },
        {
            name: "Dunkel",
            image: "https://drive.google.com/uc?export=view&id=1e8mL4UmSu5cTg7As7k_rBn50okTLv7bB ",
            title: "어둡다고 다 똑같은 흑맥주가 아니예요 둔켈!",
            description: "독일어로 어둡다 라는 뜻을 가지고 있는 둔켈은 옅은 고동색의 색과 함께 부드러운 바디감과 상쾌한 맛을 가지고 있어요. 진하지 않은 쓴맛과 커피향으로 3.5~5%의 낮은 도수와 함께 가볍게 즐길 수 있는 맥주예요!",
            features: {
                "bitter": 3,
                "crispy": 3,
                "flavor": 3,
                "sweet": 2,
                "nutty": 5
            }
        },
        {
            name: "Stout",
            image: "https://drive.google.com/uc?export=view&id=113ZPI5FgB7_NPD_3nQpfymHmFJsvKGk5 ",
            title: "흑맥주 하면 뭐? 스타우트!",
            description: "이름부터가 강하다는 의미를 가진 스타우트는 7~8%의 비교적 높은 도수를 가지고있어요. 고온에서 발효시킨 상면발효 맥주이며 맥아 또는 보리를 볶아 태워서 제조해 나는 탄 맛과 강한 향이 특징인 맥주예요!",
            features: {
                "bitter": 5,
                "crispy": 2,
                "flavor": 3,
                "sweet": 2,
                "nutty": 3
            }
        },
        {
            name: "Bock",
            image: "https://drive.google.com/uc?export=view&id=1eOBGsAmXTuTxnuVfJoupKrB-Q-K9vv6o ",
            title: "묵직한 맛을 원한다면 보크!",
            description: "평균 7%의 도수를 가지고 있는 보크는 색이 짙고 다크 초콜릿 향이 나는 특징이 있어요. 거기에다 자두와 무화과향, 짙고 달콤한 향을 가지고 있는 맥주타입이예요!",
            features: {
                "bitter": 2,
                "crispy": 3,
                "flavor": 3,
                "sweet": 5,
                "nutty": 2
            }
        },
    ]

    try {
        BeerCategories.collection.drop();

        for (let i = 0; i < beerCategory.length; i ++) {
            await BeerCategories.create(beerCategory[i]);
        }
    } catch (err) {
        res.json({ message: "fail", err });

        return;
    }

    res.json({ message: "success" });
});

export { beerCategoryCrawlingRouter };