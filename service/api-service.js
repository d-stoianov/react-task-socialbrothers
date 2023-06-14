export class ApiService {
	constructor() {
		this.apiRoot = "https://frontend-case-api.sbdev.nl/api"
		this.imageRoot = "https://frontend-case-api.sbdev.nl/storage"
	}

	async getPosts(pageNumber, pageSize) {
		const url = `${this.apiRoot}/posts?page=${pageNumber}&perPage=${pageSize}&sortBy=created_at&sortDirection=desc&`

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					token: "pj11daaQRz7zUIH56B9Z",
				}
			})

			const json = await response.json()

			const posts = await json.data.map(dto => {
				return {
					title: dto.title,
					date: dto.created_at,
					category: dto.category.name,
					imageUrl: `${this.imageRoot}/${dto.img_url}`,
					description: dto.content,
				}
			})
			const total = await json.total
			return {
				posts: posts,
				total: total,
				success: true,
			}
		} catch (error) {
			return {
				success: false,
				errorMessage: error.message,
			}
		}
	}

	async getCategories() {
		const url = `${this.apiRoot}/categories`

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					token: "pj11daaQRz7zUIH56B9Z"
				}
			})

			const json = await response.json()
			const categories = json.map(dto => {
				return {
					id: dto.id,
					name: dto.name
				}
			})
			return {
				categories: categories,
				success: true,
			}
		} catch (error) {
			return {
				success: false,
				errorMessage: error.message,
			}
		}
	}

	async createPost(title, categoryId, description, image, imageName) {
		const url = `${this.apiRoot}/posts`

		try {
			const formData = new FormData()
			formData.append("title", title)
			formData.append("content", description)
			formData.append("category_id", categoryId)
			formData.append("image", image, imageName)

			const response = await fetch(url, {
				method: "POST",
				body: formData,
				headers: {
					token: "pj11daaQRz7zUIH56B9Z",
				}
			})
			return {
				response: response,
				success: true,
			}
		} catch (error) {
			return {
				success: false,
				errorMessage: error.message,
			}
		}
	}
}