scores = [('김철수',80,90), ('이영희',90,95), ('박민수',60,75)]
result=sorted(scores,key=lambda x:x[1]+x[2],reverse=True)
print(result)