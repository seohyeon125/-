def a (x) :
    return str(x*10)+'원' # = return f'{x*10}원'

numbers = [1,2,3,4,5,6,7]
result = list(map(a,numbers))

print(result)