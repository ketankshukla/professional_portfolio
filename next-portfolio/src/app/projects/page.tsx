import ProjectCard from '@/components/projects/ProjectCard';
import { Project } from '@/types/project';

const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Code Assistant',
    description: 'A VS Code extension that helps developers write better code faster using OpenAI\'s GPT-4 model.',
    image: '/images/projects/code-assistant.jpg',
    tags: ['TypeScript', 'React', 'OpenAI', 'VS Code API'],
    githubUrl: 'https://github.com/ketankshukla/ai-code-assistant',
    liveUrl: 'https://marketplace.visualstudio.com/items?itemName=your-extension',
    featured: true,
  },
  {
    id: '2',
    title: 'Machine Learning Pipeline',
    description: 'End-to-end ML pipeline for processing and analyzing large-scale data using modern ML frameworks.',
    image: '/images/projects/ml-pipeline.jpg',
    tags: ['Python', 'TensorFlow', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/ketankshukla/ml-pipeline',
    liveUrl: 'https://ml-pipeline-demo.ketanshukla.com',
    featured: true,
  },
  // Add more projects as needed
];

export default function ProjectsPage() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-16">
        {/* Featured Projects */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Other Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
