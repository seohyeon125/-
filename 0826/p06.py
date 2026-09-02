# filter = 조건에 맞는걸 가져옴
# list(filter(함수 이름,집함체)

def abc(x):
    return x%2 !=0

li = [1,2,3,4,5,6,7]
result = list(filter(abc,li))

print(result)