// Dishes with their original ingredient quantities and cooking tips
const recipes = {
    mujadara: {
      ingredients: [
        { ingredient: "عدس بني", amount: 250, unit: "غرام" },
        { ingredient: "أرز", amount: 250, unit: "غرام" },
        { ingredient: "بصل أصفر", amount: 750, unit: "غرام" },
        { ingredient: "زيت زيتون", amount: 75, unit: "مل" },
        { ingredient: "ماء", amount: 1250, unit: "مل" },
        { ingredient: "كمون مطحون", amount: 6, unit: "غرام" },
      ],
      tips: "تأكد من كراملة البصل جيدًا للحصول على نكهة غنية، واحتفظ بالأرز منفوشًا بعد الطهي."
    },
    hummus: {
      ingredients: [
        { ingredient: "حمص مسلوق", amount: 200, unit: "غرام" },
        { ingredient: "طحينة", amount: 50, unit: "غرام" },
        { ingredient: "عصير ليمون", amount: 30, unit: "مل" },
        { ingredient: "ثوم", amount: 5, unit: "غرام" },
        { ingredient: "زيت زيتون", amount: 20, unit: "مل" },
      ],
      tips: "اخلط الحمص جيدًا للحصول على قوام ناعم، وأضف عصير الليمون تدريجيًا حسب الرغبة."
    },
    tabbouleh: {
      ingredients: [
        { ingredient: "برغل ناعم", amount: 100, unit: "غرام" },
        { ingredient: "بقدونس مفروم", amount: 150, unit: "غرام" },
        { ingredient: "طماطم مفرومة", amount: 200, unit: "غرام" },
        { ingredient: "بصل أخضر مفروم", amount: 50, unit: "غرام" },
        { ingredient: "عصير ليمون", amount: 50, unit: "مل" },
        { ingredient: "زيت زيتون", amount: 50, unit: "مل" },
      ],
      tips: "تأكد من تصفية البرغل جيدًا قبل الخلط لتجنب الملمس الرطب."
    },
  };
  
  // Helper function to format amounts
  function formatAmount(amount, unit) {
    if (unit === "غرام" && amount >= 1000) {
      return { amount: (amount / 1000).toFixed(2).replace(/\.00$/, ""), unit: "كغ" };
    }
    if (unit === "مل" && amount >= 1000) {
      return { amount: (amount / 1000).toFixed(2).replace(/\.00$/, ""), unit: "لتر" };
    }
    return { amount: amount.toFixed(2).replace(/\.00$/, ""), unit: unit };
  }
  
  // Handle form submission
  document.getElementById('conversion-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const dish = document.getElementById('dish-select').value;
    const desiredServings = parseInt(document.getElementById('desired-servings').value);
    const scaleFactor = desiredServings;
  
    if (!dish || !desiredServings) {
      alert("يرجى اختيار الوصفة وإدخال عدد الأشخاص.");
      return;
    }
  
    const originalRecipe = recipes[dish].ingredients;
    const convertedRecipe = originalRecipe.map(item => {
      const scaledAmount = item.amount * scaleFactor;
      const formatted = formatAmount(scaledAmount, item.unit);
      return { ingredient: item.ingredient, amount: formatted.amount, unit: formatted.unit };
    });
  
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    convertedRecipe.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.ingredient}: ${item.amount} ${item.unit}`;
      recipeList.appendChild(li);
    });
  
    document.getElementById('tips').textContent = recipes[dish].tips;
  });
  