import { GITHUB_TOKEN } from "../config/env.config.js"

export const getReadMe = async(req,res, next) => {
	try{
		const response = await fetch("https://api.github.com/repos/prashantStha308/prashantStha308/readme",
			{
				headers: {
					Accept: "application/vnd.github.raw",
					Authorization: `Bearer ${GITHUB_TOKEN}`
				},
			}
		);
		const data = await response.text();
		res.json(data);

	}catch(err){
		next(err);
	}
}

const languageColors = {
	JavaScript: "#f1e05a",
	PHP: "#4F5D95",
	TypeScript: "#3178c6",
	Python: "#3572A5",
	HTML: "#e34c26",
	CSS: "#563d7c",
	C: "#555555",
	"C++": "#f34b7d",
	"C#": "#178600",
	Java: "#b07219",
	Rust: "#dea584",
	Go: "#00ADD8",
	Kotlin: "#A97BFF",
	Swift: "#F05138",
	Ruby: "#701516",
	Dart: "#00B4AB",
	Shell: "#89e051",
	Vue: "#41b883",
};

export const getRepos = async (req, res, next) => {
    try {
        const response = await fetch(
            "https://api.github.com/user/repos?sort=pushed&direction=desc&visibility=public",
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                },
            }
        );

        if (!response.ok) {
            const err = new Error(`GitHub API error: ${response.status}`);
            err.statusCode = response.status;
            throw err;
        }

        const resData = await response.json();
        const includeRepos = resData.filter((repo) => repo.description?.startsWith("[Include]"));

        const finalPass = includeRepos.map((repo) => ({...repo, description: repo.description.replace("[Include]", "")}));

        const data = finalPass.map((repo) => ({
            author: repo.owner.login,
            authorUrl: repo.owner.html_url,
            language: repo.language,
            name: repo.name,
            description: repo.description,
            languageColor: languageColors[repo.language],
            homepage: repo.homepage,
            htmlUrl: repo.html_url,
        }));

        res.json(data);
    } catch (err) {
        next(err);
    }
};