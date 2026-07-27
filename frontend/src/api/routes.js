// Credit to project Trek-It for the resolveRoute code and everything that it depends on
// Trek-It repo link: 

export const toQueryString = (query = {}) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(val => params.append(key, val));
        }
        else if (value !== undefined && value !== null && value !== "") {
            params.append(key, value)
        }
    })

    return params.toString();
}

export const urlBuilder = (base, query = {}) => {
    const queryString = toQueryString(query);
    if (!queryString) return base;
    return `${base}?${queryString}`;
};

const resolveRoute = (base, id, query) => {
    const url = id ? `${base}/${id}` : base;
    return urlBuilder(url, query);
};


const ROUTES = {
	POST:{
		GET_ALL: (query) => resolveRoute("/api/post", null, query) ,
		GET_BY_ID: (id) => resolveRoute("/api/post", id),

		CREATE: () => "/api/post",

		UPDATE: (id) => resolveRoute("/api/post", id),
		DELETE: (id) => resolveRoute("/api/post", id)
	},
	PROJECT:{
		GET_ALL: (query) => resolveRoute("/api/project", null, query),
		GET_BY_ID: (id) => resolveRoute("/api/project", id),

		CREATE: () => "/api/project",

		UPDATE: (id) => resolveRoute("/api/project", id),
		DELETE: (id) => resolveRoute("/api/project", id)
	},
	PROXY:{
		README: () => "/api/proxy/readMe",
		REPOS: () => "api/proxy/repos"
	}

}

export default ROUTES;