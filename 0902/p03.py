def cheak_score(score):
    if score >= 60:
        return '합격'
    else:
        return '불합격'

print(cheak_score(80))
print(cheak_score(50))