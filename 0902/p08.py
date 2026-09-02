# def check(number):
#     if number % 2 == 0:
#         return '짝수'
#     else:
#         return '홀수'

check = lambda x : '짝수' if x % 2 == 0 else '홀수'

print(check(6))
print(check(7))