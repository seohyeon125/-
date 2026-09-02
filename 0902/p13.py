word = input('단어를 입력하세요 : ')
result = list(filter(lambda x:x.lower() in 'aeiou',word))
print(result)