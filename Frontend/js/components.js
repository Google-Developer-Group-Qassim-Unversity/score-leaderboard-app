export class ComponentRenderer {
    renderDashboard(data) {
        return `
            <div class="space-y-8">
                <!-- Header -->
                <div class="text-center">
                    <div class="flex justify-center items-center flex-col space-x-2 mb-4 sm:flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy h-10 w-10 text-amber-500"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                    <h1 class="text-4xl font-bold text-gray-900">Leaderboard Dashboard</h1>
                    </div>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Track performance across members, departments, and managers with comprehensive points tracking
                    </p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div data-slot="card" class="text-card-foreground flex flex-col gap-6 rounded-xl py-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg"><div data-slot="card-header" class="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 flex flex-row items-center justify-between space-y-0 pb-2"><div data-slot="card-title" class="text-sm font-medium text-gray-600">Total Members</div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users h-4 w-4 text-blue-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div><div data-slot="card-content" class="px-6"><div class="text-2xl font-bold text-gray-900">120</div><p class="text-xs text-gray-500 mt-1">Active participants</p></div></div> 
                    <div data-slot="card" class="text-card-foreground flex flex-col gap-6 rounded-xl py-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg"><div data-slot="card-header" class="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 flex flex-row items-center justify-between space-y-0 pb-2"><div data-slot="card-title" class="text-sm font-medium text-gray-600">Departments</div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2 h-4 w-4 text-green-600"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg></div><div data-slot="card-content" class="px-6"><div class="text-2xl font-bold text-gray-900">8</div><p class="text-xs text-gray-500 mt-1">Competing teams</p></div></div>
                </div>

                <!-- Leaderboards -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Top Members -->
                    <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy h-5 w-5 text-amber-500"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2 h-5 w-5 text-green-500"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>
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