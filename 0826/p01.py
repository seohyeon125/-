# 1. Dictionary : 상품 ID를 key로, 상품 정보를 value로 저장
# (가격을 변경할 수 있도록 내부 값은 Mutable하게 관리)
products = {
    "p001" : {"name" : "노트북", "price" : 1200000, "location": (3,12) } ,
    "p002" : {"name" : "마우스", "price" : 35000, "location": (3,12) } ,
    "p003" : {"name" : "키보드", "price" : 89000, "location": (3,12) }
}
#상품번호 상춤명 가격 좌표
print('상품번호 상품명 가격 위치')
for k,v in products.items():
    print(k,v['name'],v['price'],v['location'])