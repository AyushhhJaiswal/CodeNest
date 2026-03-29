fetch("https://ce.judge0.com/languages").then(r => r.json()).then(data => {
  const langs = ["python", "javascript", "typescript", "java ", "go ", "rust ", "c++ ", "c# ", "ruby ", "swift "];
  data.forEach(l => {
    if (langs.some(x => l.name.toLowerCase().includes(x))) {
      console.log(l.id + ": " + l.name);
    }
  });
});
