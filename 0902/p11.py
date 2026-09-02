numbers = [11,22,33,44,55,66,77]

result =list(map(lambda x: '짝수' if x%2 == 0 else '홀수',numbers))
print(result)