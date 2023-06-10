export class ApiService {
    constructor() {
        this.apiRoot = "https://frontend-case-api.sbdev.nl/api"
        this.imageRoot = "https://frontend-case-api.sbdev.nl/storage"
    }

    async getPosts(pageNumber, pageSize) {
        const url = `${this.apiRoot}/posts?page=${pageNumber}&perPage=${pageSize}&sortBy=created_at&sortDirection=desc&`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                token: "pj11daaQRz7zUIH56B9Z",
            }
        })

        const json = await response.json()

        return json.data.map(dto => {
            return {
                title: dto.title,
                date: dto.created_at,
                category: dto.category.name,
                imageUrl: `${this.imageRoot}/${dto.img_url}`,
                description: dto.content,
            }
        })
    }
}