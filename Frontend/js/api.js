export class ApiService {
    constructor() {
        this.baseDelay = 500; // Simulate network delay
    }

    async delay(ms = this.baseDelay) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getMembers() {
        await this.delay();
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error('Failed to fetch members');
        }
        return response.json();
    }

    async getDepartments() {
        await this.delay();
        const response = await fetch('./data/departments.json');
        if (!response.ok) {
            throw new Error('Failed to fetch departments');
        }
        return response.json();
    }

    async getManagers() {
        await this.delay();
        const response = await fetch('./data/managers.json');
        if (!response.ok) {
            throw new Error('Failed to fetch managers');
        }
        return response.json();
    }

    async getMemberHistory(id) {
        await this.delay();
        const response = await fetch(`./data/member-history-${id}.json`);
        if (!response.ok) {
            // Fallback to default history if specific member history doesn't exist
            const fallbackResponse = await fetch('./data/member-history-1.json');
            if (!fallbackResponse.ok) {
                throw new Error('Failed to fetch member history');
            }
            return fallbackResponse.json();
        }
        return response.json();
    }
}