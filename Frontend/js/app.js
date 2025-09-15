import { ApiService } from './api.js';
import { Router } from './router.js';
import { ComponentRenderer } from './components.js';
class App {
    constructor() {
        this.apiService = new ApiService();
        this.router = new Router();
        this.renderer = new ComponentRenderer();
        this.currentPage = 'dashboard';
        
        this.init();
    }
    init() {
        this.loadPage('dashboard');
        this.router.init();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Navigation event listeners
        document.getElementById('nav-dashboard').addEventListener('click', () => {
            this.loadPage('dashboard');
        });
        document.getElementById('mini-nav-dashboard').addEventListener('click', () => {
            this.loadPage('dashboard');
        });

        document.getElementById('nav-members').addEventListener('click', () => {
            this.loadPage('members');
        });
        document.getElementById('mini-nav-members').addEventListener('click', () => {
            this.loadPage('members');
        });

        document.getElementById('nav-departments').addEventListener('click', () => {
            this.loadPage('departments');
        });
        document.getElementById('mini-nav-departments').addEventListener('click', () => {
            this.loadPage('departments');
        });

    }

    updateNavigation(activePage) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.classList.add('text-gray-900', 'hover:text-gray-600');
            btn.classList.remove('text-white', 'bg-gray-900');
        });

        const activeBtn = document.getElementById(`nav-${activePage}`);
        if (activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.classList.remove('text-gray-600', 'hover:text-gray-900');
            activeBtn.classList.add('text-white', 'bg-gray-900');
        }
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('main-content').style.opacity = '0.5';
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('main-content').style.opacity = '1';
    }

    async loadPage(pageName, params = {}) {
        this.showLoading();
        this.currentPage = pageName;
        this.updateNavigation(pageName);

        try {
            let content = '';
            
            switch (pageName) {
                case 'dashboard':
                    content = await this.loadDashboard();
                    break;
                case 'members':
                    content = await this.loadMembersPage();
                    break;
                case 'departments':
                    content = await this.loadDepartmentsPage();
                    break;
                case 'department-detail':
                    content = await this.loadDepartmentDetail(params.id);
                    break;
                case 'member-detail':
                    content = await this.loadMemberDetail(params.id);
                    break;
                default:
                    content = '<div class="text-center py-12"><h2 class="text-2xl font-bold text-gray-900">Page not found</h2></div>';
            }

            document.getElementById('main-content').innerHTML = content;
            this.setupPageEventListeners();
            
        } catch (error) {
            console.error('Error loading page:', error);
            document.getElementById('main-content').innerHTML = 
                '<div class="text-center py-12"><h2 class="text-2xl font-bold text-red-600">Error loading page</h2></div>';
        } finally {
            this.hideLoading();
        }
    }

    async loadDashboard() {
        const [members, departments] = await Promise.all([
            this.apiService.getMembers(),
            this.apiService.getDepartments(),
        ]);

        return this.renderer.renderDashboard({
            members: members,
            departments: departments,
            stats: {
                totalMembers: 120,
                totalDepartments: 8,
            }
        });
    }

    async loadMembersPage() {
        const members = await this.apiService.getMembers();
        return this.renderer.renderMembersPage(members);
    }

    async loadDepartmentsPage() {
        const departments = await this.apiService.getDepartments();
        return this.renderer.renderDepartmentsPage(departments);
    }


    async loadDepartmentDetail(id) {
        const history = await this.apiService.getMemberHistory(id);
        return this.renderer.renderDepartmentDetail(history);
    }

    async loadMemberDetail(id) {
        const history = await this.apiService.getMemberHistory(id);
        return this.renderer.renderMemberDetail(history);
    }

    setupPageEventListeners() {
        // View All buttons
        document.querySelectorAll('[data-view-all]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.target.dataset.viewAll;
                this.loadPage(page);
            });
        });

        // Department detail buttons
        document.querySelectorAll('[data-department-detail]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.departmentDetail;
                this.loadPage('department-detail', { id });
            });
        });

        // Back buttons
        document.querySelectorAll('[data-back]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.target.dataset.back;
                this.loadPage(page);
            });
        });

        // Search functionality
        const searchInput = document.querySelector('[data-search]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterResults(e.target.value);
            });
        }
    }

    filterResults(query) {
        const items = document.querySelectorAll('[data-searchable]');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});