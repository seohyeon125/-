
def func(x):
    return 'a' not in x.lower()

li = ['Apple','mango','orange','banana','lemon','grape']
result =list(filter(func,li))
print(result)