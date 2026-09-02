fruit = {'사과':4000,'포도':18000,'딸기':1100,'참외':3000,'배':7000}
# result=max(fruit,key=lambda x:fruit[x])
# print(result)
result=sorted(fruit,key=lambda x:fruit[x],reverse=True)
print(result)