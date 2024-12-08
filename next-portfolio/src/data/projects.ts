export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'django-blog-platform',
    title: 'Django Blog Platform',
    description: 'A full-stack blogging platform built with Django, featuring user authentication, rich text editing, comment system, and admin dashboard. Implements PostgreSQL for data persistence and Redis for caching.',
    image: '/images/blog/markdown_to_blog_post.png',
    tags: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Bootstrap', 'JavaScript'],
    githubUrl: 'https://github.com/yourusername/django-blog-platform',
    liveUrl: 'https://django-blog-platform.herokuapp.com',
    featured: true
  },
  {
    id: 'fastapi-task-manager',
    title: 'FastAPI Task Manager',
    description: 'RESTful API service built with FastAPI for task management. Features async operations, JWT authentication, and MongoDB integration. Includes Swagger UI documentation and automated testing.',
    image: '/images/blog/trees.jpg',
    tags: ['Python', 'FastAPI', 'MongoDB', 'Docker', 'JWT', 'AsyncIO'],
    githubUrl: 'https://github.com/yourusername/fastapi-task-manager',
    liveUrl: 'https://fastapi-task-manager.herokuapp.com/docs',
    featured: true
  },
  {
    id: 'flask-inventory-system',
    title: 'Flask Inventory System',
    description: 'Inventory management system built with Flask. Includes barcode scanning, real-time stock updates, and reporting features. Uses SQLAlchemy ORM and implements REST APIs.',
    image: '/images/blog/linked_lists.png',
    tags: ['Python', 'Flask', 'SQLAlchemy', 'REST API', 'jQuery', 'Chart.js'],
    githubUrl: 'https://github.com/yourusername/flask-inventory',
    liveUrl: 'https://flask-inventory-system.herokuapp.com',
    featured: true
  },
  {
    id: 'python-cli-automation',
    title: 'DevOps CLI Tool',
    description: 'Command-line tool for automating development workflows. Features Git operations, Docker container management, and deployment automation. Built with Click and Rich for beautiful terminal UI.',
    image: '/images/blog/o_notation.jpg',
    tags: ['Python', 'Click', 'Rich', 'Docker', 'Git', 'DevOps'],
    githubUrl: 'https://github.com/yourusername/devops-cli',
    liveUrl: '',
    featured: true
  }
];
