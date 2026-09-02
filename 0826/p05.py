def a (x):
    if x % 2 == 0 :
        return "짝수"
    else :
        return "홀수"

numbers = [11,22,33,44,55,66,77]
result = list(map(a,numbers))

print(result)