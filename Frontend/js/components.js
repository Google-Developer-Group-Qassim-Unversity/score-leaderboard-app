export class ComponentRenderer {
    renderDashboard(data) {
        return `
            <div class="space-y-8">
                <!-- Header -->
                <div class="text-center">
                    <div class="flex justify-center items-center flex-col space-x-2 mb-4">
                    <div class="text-4xl">🏆</div>
                    <h1 class="text-4xl font-bold text-gray-900">Leaderboard Dashboard</h1>
                    </div>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Track performance across members, departments, and managers with comprehensive points tracking
                    </p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">Total Members</p>
                                <p class="text-2xl font-bold text-gray-900">${data.stats.totalMembers}</p>
                                <p class="text-sm text-gray-500">Active participants</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span class="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">Departments</p>
                                <p class="text-2xl font-bold text-gray-900">${data.stats.totalDepartments}</p>
                                <p class="text-sm text-gray-500">Competing teams</p>
                            </div>
                            <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <span class="text-2xl">🏢</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">Managers</p>
                                <p class="text-2xl font-bold text-gray-900">${data.stats.totalManagers}</p>
                                <p class="text-sm text-gray-500">Leadership team</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span class="text-2xl">👔</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Leaderboards -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Top Members -->
                    <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center space-x-2">
                                <span class="text-xl">🏆</span>
                                <h3 class="text-lg font-semibold text-gray-900">Top Members</h3>
                            </div>
                            <button data-view-all="members" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                View All
                            </button>
                        </div>
                        <p class="text-sm text-gray-600 mb-4">Leading individual performers</p>
                        <div class="space-y-3">
                            ${data.members.map((member, index) => `
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            ${index + 1}
                                        </div>
                                        <div>
                                            <p class="font-medium text-gray-900">${member.name}</p>
                                            <p class="text-sm text-gray-600">Member</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="font-bold text-blue-600">${member.points}</p>
                                        <p class="text-xs text-gray-500">points</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Top Departments -->
                    <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center space-x-2">
                                <span class="text-xl">🏢</span>
                                <h3 class="text-lg font-semibold text-gray-900">Top Departments</h3>
                            </div>
                            <button data-view-all="departments" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                View All
                            </button>
                        </div>
                        <p class="text-sm text-gray-600 mb-4">Leading team performance</p>
                        <div class="space-y-3">
                            ${data.departments.map((dept, index) => `
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            ${index + 1}
                                        </div>
                                        <div>
                                            <p class="font-medium text-gray-900">${dept.name}</p>
                                            <p class="text-sm text-gray-600">Department</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="font-bold text-emerald-600">${dept.points}</p>
                                        <p class="text-xs text-gray-500">points</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Top Managers -->
                    <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center space-x-2">
                                <span class="text-xl">👔</span>
                                <h3 class="text-lg font-semibold text-gray-900">Top Managers</h3>
                            </div>
                            <button data-view-all="managers" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                View All
                            </button>
                        </div>
                        <p class="text-sm text-gray-600 mb-4">Leadership excellence</p>
                        <div class="space-y-3">
                            ${data.managers.map((manager, index) => `
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            ${index + 1}
                                        </div>
                                        <div>
                                            <p class="font-medium text-gray-900">${manager.name}</p>
                                            <p class="text-sm text-gray-600">Manager</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="font-bold text-purple-600">${manager.points}</p>
                                        <p class="text-xs text-gray-500">points</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderDepartmentsPage(departments) {
        return `
            <div class="space-y-6">
                <!-- Header -->
                <div class="bg-primary-50 rounded-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <button data-back="dashboard" class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
                                <span>←</span>
                                <span>Back to Dashboard</span>
                            </button>
                            <div class="flex items-center space-x-3">
                                <span class="text-3xl">🏢</span>
                                <div>
                                    <h1 class="text-3xl font-bold text-gray-900">Departments Leaderboard</h1>
                                    <p class="text-gray-600">${departments.length} departments ranked by total points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Search -->
                <div class="bg-white rounded-lg shadow-md p-4">
                    <div class="relative">
                        <input 
                            type="text" 
                            data-search
                            placeholder="Search departments by name..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="text-gray-400">🔍</span>
                        </div>
                    </div>
                </div>

                <!-- Department Rankings -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center space-x-2 mb-6">
                        <span class="text-xl">🏆</span>
                        <h2 class="text-xl font-semibold text-gray-900">Department Rankings</h2>
                    </div>
                    <p class="text-gray-600 mb-6">Team performance rankings across all departments</p>
                    
                    <div class="space-y-4">
                        ${departments.map((dept, index) => `
                            <div data-searchable class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div class="flex items-center space-x-4">
                                    <div class="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                                        ${index + 1}
                                    </div>
                                    <div class="flex items-center space-x-3">
                                        <span class="text-2xl">${this.getDepartmentIcon(dept.name)}</span>
                                        <div>
                                            <h3 class="font-semibold text-gray-900">${dept.name}</h3>
                                            <p class="text-sm text-gray-600">👥 15 members</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <div class="text-right">
                                        <p class="text-2xl font-bold text-primary-600">${dept.points}</p>
                                        <p class="text-sm text-gray-500">points</p>
                                    </div>
                                    <button data-department-detail="${dept.id}" class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        👁️ View Details
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderDepartmentDetail(data) {
        return `
            <div class="space-y-6">
                <!-- Header -->
                <div class="bg-primary-50 rounded-lg p-6">
                    <button data-back="departments" class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
                        <span>←</span>
                        <span>Back to Departments</span>
                    </button>
                    <div class="flex items-center space-x-3">
                        <span class="text-3xl">${this.getDepartmentIcon(data.name)}</span>
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">${data.name}</h1>
                            <p class="text-gray-600">Department Details & Points History</p>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Department Profile -->
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-center space-x-2 mb-6">
                            <span class="text-lg">🏢</span>
                            <h2 class="text-lg font-semibold text-gray-900">Department Profile</h2>
                        </div>

                        <div class="text-center mb-6">
                            <div class="w-20 h-20 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span class="text-3xl">${this.getDepartmentIcon(data.name)}</span>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900">${data.name}</h3>
                            <p class="text-gray-600">Department</p>
                        </div>

                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Rank</span>
                                <span class="px-3 py-1 bg-gray-900 text-white rounded-full text-sm font-bold">#${data.rank}</span>
                            </div>
                            
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Total Points</span>
                                <span class="text-2xl font-bold text-primary-600">${data.total_points}</span>
                            </div>
                            
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Team Size</span>
                                <div class="flex items-center space-x-1">
                                    <span>👥</span>
                                    <span class="font-semibold">15</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Points History -->
                    <div class="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-center space-x-2 mb-6">
                            <span class="text-lg">📊</span>
                            <h2 class="text-lg font-semibold text-gray-900">Points History</h2>
                        </div>
                        <p class="text-gray-600 mb-6">Detailed log of all points earned by the department</p>
                        
                        <div class="space-y-3">
                            ${data.history.map(item => `
                                <div class="history-item flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <span>📅</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">${item.event_title}</h4>
                                            <div class="flex items-center space-x-2 mt-1">
                                                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">${item.action_name}</span>
                                                <span class="text-sm text-gray-500">${item.event_date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-lg font-bold text-primary-600">+${item.points}</span>
                                        <p class="text-xs text-gray-500">points</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMembersPage(members) {
        return `
            <div class="space-y-6">
                <!-- Header -->
                <div class="bg-blue-50 rounded-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <button data-back="dashboard" class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
                                <span>←</span>
                                <span>Back to Dashboard</span>
                            </button>
                            <div class="flex items-center space-x-3">
                                <span class="text-3xl">👥</span>
                                <div>
                                    <h1 class="text-3xl font-bold text-gray-900">Members Leaderboard</h1>
                                    <p class="text-gray-600">${members.length} members ranked by total points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Search -->
                <div class="bg-white rounded-lg shadow-md p-4">
                    <div class="relative">
                        <input 
                            type="text" 
                            data-search
                            placeholder="Search members by name..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="text-gray-400">🔍</span>
                        </div>
                    </div>
                </div>

                <!-- Members List -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center space-x-2 mb-6">
                        <span class="text-xl">🏆</span>
                        <h2 class="text-xl font-semibold text-gray-900">Member Rankings</h2>
                    </div>
                    
                    <div class="space-y-4">
                        ${members.map((member, index) => `
                            <div data-searchable class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div class="flex items-center space-x-4">
                                    <div class="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                                        ${index + 1}
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-gray-900">${member.name}</h3>
                                        <p class="text-sm text-gray-600">Member</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-2xl font-bold text-blue-600">${member.points}</p>
                                    <p class="text-sm text-gray-500">points</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderManagersPage(managers) {
        return `
            <div class="space-y-6">
                <!-- Header -->
                <div class="bg-purple-50 rounded-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <button data-back="dashboard" class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
                                <span>←</span>
                                <span>Back to Dashboard</span>
                            </button>
                            <div class="flex items-center space-x-3">
                                <span class="text-3xl">👔</span>
                                <div>
                                    <h1 class="text-3xl font-bold text-gray-900">Managers Leaderboard</h1>
                                    <p class="text-gray-600">${managers.length} managers ranked by total points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Search -->
                <div class="bg-white rounded-lg shadow-md p-4">
                    <div class="relative">
                        <input 
                            type="text" 
                            data-search
                            placeholder="Search managers by name..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="text-gray-400">🔍</span>
                        </div>
                    </div>
                </div>

                <!-- Managers List -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center space-x-2 mb-6">
                        <span class="text-xl">🏆</span>
                        <h2 class="text-xl font-semibold text-gray-900">Manager Rankings</h2>
                    </div>
                    
                    <div class="space-y-4">
                        ${managers.map((manager, index) => `
                            <div data-searchable class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div class="flex items-center space-x-4">
                                    <div class="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                                        ${index + 1}
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-gray-900">${manager.name}</h3>
                                        <p class="text-sm text-gray-600">Manager</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-2xl font-bold text-purple-600">${manager.points}</p>
                                    <p class="text-sm text-gray-500">points</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getDepartmentIcon(name) {
        const icons = {
            'Engineering': '⚙️',
            'Marketing': '📢',
            'Sales': '💼',
            'HR': '👥',
            'Finance': '💰',
            'Operations': '🔧',
            'Design': '🎨',
            'Support': '🎧'
        };
        return icons[name] || '🏢';
    }
}