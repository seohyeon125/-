
def func(x):
    return len(x) == 2

li = ['사과', '배', '포도', '바나나', '귤', '딸기']
result =list(filter(func,li))

print(result)