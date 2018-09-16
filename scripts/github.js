class GitHub {
    constructor() {
        this.client_id = '89a70c57d6d06081e864';
        this.client_secret = '6996b49c457d72cc0fbb4e1acbcd0c24e0a26351';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();
        const repos = await reposResponse.json();
        return {
            profile, repos
        }
    }
}
