export default function ProjectsSection() {
  const projects = [
    {
      title: "CodeWraith AI",
      description:
        "An AI-powered code review assistant that analyzes pull requests, suggests improvements, and learns from your codebase patterns.",
      tags: ["Next.js", "AI/ML", "TypeScript"],
      link: "#",
      status: "Active",
    },
    {
      title: "AutoDeploy Flow",
      description:
        "Intelligent CI/CD pipeline optimizer that predicts build failures, optimizes caching strategies, and automates deployment rollbacks.",
      tags: ["DevOps", "Automation", "Docker"],
      link: "#",
      status: "In Development",
    },
    {
      title: "OctoCLI",
      description:
        "A command-line interface tool for developers that provides AI-assisted debugging, code generation, and refactoring suggestions.",
      tags: ["CLI", "Node.js", "AI"],
      link: "#",
      status: "Beta",
    },
    {
      title: "DeepSea Analytics",
      description:
        "Real-time monitoring dashboard with anomaly detection for cloud infrastructure, powered by machine learning algorithms.",
      tags: ["React", "Python", "Data Viz"],
      link: "#",
      status: "Planning",
    },
  ];

  return (
    <section id="projects" className="section bg-brand-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-h2 mb-4">Projects & Experiments</h2>
          <p className="text-body text-brand-white/70 max-w-2xl mx-auto">
            A showcase of my current ventures into AI, automation, and developer
            tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <article
              key={index}
              className="card group relative overflow-hidden"
            >
              {/* Status badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    project.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : project.status === "Beta"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="text-h2 mb-3 pr-24 group-hover:text-brand-orange transition-colors">
                {project.title}
              </h3>

              <p className="text-body text-brand-white/70 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-brand-white/10 text-brand-white/80 text-sm rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                className="inline-flex items-center text-brand-orange hover:text-orange-400 transition-colors font-medium"
              >
                View Project
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
