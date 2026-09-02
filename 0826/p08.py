# world = 'HELLO World!!'
# for i in world:
#     if i.lower() in 'iaeou':
#         print(i,end=' ')

def func(x):
    return x.lower() in 'aeiou'


world = input('영어단어 입력 : ')
result =list(filter(func,world))

print(result)