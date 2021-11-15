export type Ingredient = {
	ingredient: string
	measure: string
}

export type Ingredients = Ingredient[]

export type RecipeType = {
	id: string
	title: string
	image: string
	instructions: string
	ingredients: Ingredients
}
