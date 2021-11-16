export type MealAPIObject = {
	idMeal: string
	strMeal: string
	strDrinkAlternate: any
	strCategory: string
	strArea: string
	strInstructions: string
	strMealThumb: string
	strTags: any
	strYoutube: string
	strIngredient1: string | null
	strIngredient2: string | null
	strIngredient3: string | null
	strIngredient4: string | null
	strIngredient5: string | null
	strIngredient6: string | null
	strIngredient7: string | null
	strIngredient8: string | null
	strIngredient9: string | null
	strIngredient10: string | null
	strIngredient11: string | null
	strIngredient12: string | null
	strIngredient13: string | null
	strIngredient14: string | null
	strIngredient15: string | null
	strIngredient16: string | null
	strIngredient17: string | null
	strIngredient18: string | null
	strIngredient19: string | null
	strIngredient20: string | null
	strMeasure1: string
	strMeasure2: string
	strMeasure3: string
	strMeasure4: string
	strMeasure5: string
	strMeasure6: string
	strMeasure7: string
	strMeasure8: string
	strMeasure9: string
	strMeasure10: string
	strMeasure11: string
	strMeasure12: string
	strMeasure13: string
	strMeasure14: string
	strMeasure15: string
	strMeasure16: string
	strMeasure17: string
	strMeasure18: string
	strMeasure19: string
	strMeasure20: string
	strSource: string
	strImageSource: any
	strCreativeCommonsConfirmed: any
	dateModified: any
}

export type RandomMealResponse = {
	meals: [MealAPIObject]
}

export type SearchMealsResponse = {
	meals: MealAPIObject[]
}
