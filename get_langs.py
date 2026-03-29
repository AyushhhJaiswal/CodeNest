import urllib.request, json
data = json.loads(urllib.request.urlopen("https://ce.judge0.com/languages").read())
langs = ["python", "javascript", "typescript", "java ", "go ", "rust ", "c++ ", "c# ", "ruby ", "swift "]
print("\n".join([f'{l["id"]}: {l["name"]}' for l in data for x in langs if x in l["name"].lower()]))
