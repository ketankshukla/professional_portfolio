// Projects Manager
const ProjectsManager = {
    projects: [],
    currentSort: 'newest',
    itemsPerPage: 6,
    currentPage: 1,

    init: async function() {
        try {
            const response = await fetch('/assets/featured_projects/data/projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.projects = data.projects;
            this.setupEventListeners();
            this.updateProjects();
        } catch (error) {
            console.error('Error loading projects:', error);
            // Show error in the projects grid
            const projectGrid = document.getElementById('project-grid');
            if (projectGrid) {
                projectGrid.innerHTML = '<p class="error-message">Error loading projects. Please try again later.</p>';
            }
        }
    },

    setupEventListeners: function() {
        const sortSelect = document.getElementById('sort-projects');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.currentPage = 1;
                this.updateProjects();
            });
        }

        const loadMoreBtn = document.getElementById('load-more-projects');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.updateProjects();
            });
        }
    },

    sortProjects: function(projects) {
        return [...projects].sort((a, b) => {
            switch (this.currentSort) {
                case 'newest':
                    return -1; // Assuming newest first is the default order in JSON
                case 'oldest':
                    return 1;
                case 'name':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });
    },

    createProjectCard: function(project) {
        return `
            <a href="${project.github_url}" 
               target="_blank"
               rel="noopener noreferrer"
               class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </a>
        `;
    },

    updateProjects: function() {
        const projectGrid = document.getElementById('project-grid');
        if (!projectGrid) return;

        const sortedProjects = this.sortProjects(this.projects);
        const totalProjects = sortedProjects.length;
        const startIndex = 0;
        const endIndex = this.currentPage * this.itemsPerPage;
        const projectsToShow = sortedProjects.slice(startIndex, endIndex);

        // Clear existing content if it's page 1
        if (this.currentPage === 1) {
            projectGrid.innerHTML = '';
        }

        // Add new projects
        projectsToShow.forEach(project => {
            projectGrid.innerHTML += this.createProjectCard(project);
        });

        // Update counters and load more button
        const showingCount = document.getElementById('showing-projects-count');
        const totalCount = document.getElementById('total-projects-count');
        if (showingCount) showingCount.textContent = Math.min(endIndex, totalProjects);
        if (totalCount) totalCount.textContent = totalProjects;
        
        const loadMoreBtn = document.getElementById('load-more-projects');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex >= totalProjects ? 'none' : 'block';
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    ProjectsManager.init();
});
