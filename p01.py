#변수와 출력
name = "파이썬"  # 문자열(String)
age = 20        # 정수(Integer)

print(name)     # 출력: 파이썬
print(age + 5)  # 출력: 25


print( )


#리스트
fruits = ["사과", "바나나", "딸기"]

print(fruits[0]) # 첫 번째 항목 출력: 사과
fruits.append("포도") # 항목 추가


print( )


#조건문 if
score = 85

if score >= 80:
    print("합격입니다!")
else:
    print("불합격입니다.")

print( )
#반복문 for/while
# 0부터 4까지 5번 반복
for i in range(5):
    print(i) # 0, 1, 2, 3, 4 출력


print( )


#함수
def add(a, b):
    return a + b

result = add(3, 5)
print(result) # 출력: 8