export class ApiService {

    async getMembers() {
        // const response = await fetch('./data/members.json'); // USE THIS TO TEST
        const response = await fetch('http://localhost:8000/members');
        if (!response.ok) {
            throw new Error('Failed to fetch members');
        }
        return response.json();
    }

    async getDepartments() {
        // const response = await fetch('./data/departments.json');
        const response = await fetch('http://localhost:8000/departments');
        
        if (!response.ok) {
            throw new Error('Failed to fetch departments');
        }
        return response.json();
    }

    async getMemberHistory(id) {
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