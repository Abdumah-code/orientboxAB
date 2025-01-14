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
    tips: "تأكد من كراملة البصل جيدًا للحصول على نكهة غنية، واحتفظ بالأرز منفوشًا بعد الطهي.",
  },
  hummus: {
    ingredients: [
      { ingredient: "حمص مسلوق", amount: 200, unit: "غرام" },
      { ingredient: "طحينة", amount: 50, unit: "غرام" },
      { ingredient: "عصير ليمون", amount: 30, unit: "مل" },
      { ingredient: "ثوم", amount: 5, unit: "غرام" },
      { ingredient: "زيت زيتون", amount: 20, unit: "مل" },
    ],
    tips: "اخلط الحمص جيدًا للحصول على قوام ناعم، وأضف عصير الليمون تدريجيًا حسب الرغبة.",
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
    tips: "تأكد من تصفية البرغل جيدًا قبل الخلط لتجنب الملمس الرطب.",
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

// Slider for serving adjustments
const slider = document.getElementById("serving-slider");
const sliderValue = document.getElementById("slider-value");
slider.addEventListener("input", () => {
  sliderValue.textContent = slider.value;
});

// Recipe conversion and ingredient scaling
document.getElementById("conversion-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const dish = document.getElementById("dish-select").value;
  const desiredServings = parseInt(slider.value); // Using slider for servings
  const scaleFactor = desiredServings;

  if (!dish || !desiredServings) {
    alert("يرجى اختيار الوصفة وإدخال عدد الأشخاص.");
    return;
  }

  const originalRecipe = recipes[dish].ingredients;
  const convertedRecipe = originalRecipe.map((item) => {
    const scaledAmount = item.amount * scaleFactor;
    const formatted = formatAmount(scaledAmount, item.unit);
    return { ingredient: item.ingredient, amount: formatted.amount, unit: formatted.unit };
  });

  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = "";
  convertedRecipe.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.ingredient}: ${item.amount} ${item.unit}`;
    recipeList.appendChild(li);
  });

  // Display cooking tips
  document.getElementById("tips").textContent = recipes[dish].tips;

  // Step-by-step instructions
  const instructionsList = document.getElementById("instructions-list");
  const instructions = {
    mujadara: [
      "اغسل العدس والأرز جيدًا.",
      "قم بطهي العدس في ماء مغلي لمدة 20 دقيقة.",
      "اقلي البصل حتى يصبح لونه ذهبياً.",
      "أضف الأرز والتوابل واطبخه مع العدس.",
    ],
    hummus: [
      "ضع الحمص المسلوق في الخلاط.",
      "أضف الطحينة وعصير الليمون والثوم.",
      "اخلط المكونات حتى تصبح ناعمة.",
      "قدم الحمص وزينه بزيت الزيتون.",
    ],
    tabbouleh: [
      "اغسل البرغل وانقعه لمدة 15 دقيقة.",
      "قم بتصفية البرغل جيداً.",
      "اخلط البرغل مع البقدونس والطماطم والبصل الأخضر.",
      "أضف عصير الليمون وزيت الزيتون وقدم.",
    ],
  };

  instructionsList.innerHTML = "";
  instructions[dish].forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    instructionsList.appendChild(li);
  });
});

// Search bar functionality
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();
  const recipeCards = document.querySelectorAll(".recipe-card");
  recipeCards.forEach((card) => {
    const recipeName = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = recipeName.includes(searchTerm) ? "block" : "none";
  });
});

// Recipe filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    const recipeCards = document.querySelectorAll(".recipe-card");
    recipeCards.forEach((card) => {
      card.style.display = card.dataset.category === category ? "block" : "none";
    });
  });
});
