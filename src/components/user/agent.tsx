import React, { useEffect, useState } from 'react';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProjectModal } from '@/components/agents/ProjectModal';
import { AgentCard } from '@/components/agents/AgentCard';
import { ResultsDashboard } from '@/components/agents/ResultsDashboard';
import { ResultsProvider } from '@/contexts/ResultsContext';
import { agents } from '@/lib/data/agents';
import { getProject } from '@/core/agent';
import { useAuth } from '@/core/auth/AuthProvider';
import Request from '@/lib/request';

const AgentPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [{ profile }] = useAuth();

  const handleCreateProject = async (name: string, description: string) => {
    const newProject = {
      id: Date.now().toString(),
      name,
      description,
    };

    setProjects([...projects, newProject]);
    setSelectedProject(newProject.id);
    setIsProjectModalOpen(false);

    const project = await Request.Post('/api/projects', {
      profile_id: profile.id,
      createdId: newProject.id,
      name: newProject.name,
      description: newProject.description,
    });
    console.log('project', project);
  };

  const handleDeleteProject = () => {
    if (projects.length > 1) {
      const updatedProjects = projects.filter((p) => p.id !== selectedProject);
      setProjects(updatedProjects);
      setSelectedProject(updatedProjects[0].id);
    }
    setShowDeleteConfirm(false);
  };

  const selectedProjectData = projects.find((p) => p.id === selectedProject);

  useEffect(() => {
    const getProjects = async () => {
      const projects = await getProject(profile.id);
      if (projects.length > 0) {
        const tempProjects : Object [] =  []
        projects.map((pro) => {
          tempProjects.push({
            id: pro.createId, name: pro.name, description: pro.description
          })
        })
        setProjects(tempProjects)
        setSelectedProject(tempProjects[0].id)
      } else {
        const startProject = {
            id: Date.now().toString(),
            name: 'Tech Startup Campaign',
            description: 'AI-driven marketing for tech products',
          }
        setProjects([startProject]);
        setSelectedProject(startProject.id)
      }
    };
    getProjects();
  }, []);

  return (
    <ResultsProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-slate-800">
              AI Agents
            </h1>
            <p className="text-lg text-slate-600">
              Transform your content marketing with intelligent AI agents
            </p>
          </div>

          {/* Project Management Panel */}
          <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Active Project
                </label>
                <Select
                  value={selectedProject}
                  onValueChange={setSelectedProject}
                >
                  <SelectTrigger className="w-full md:w-80">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{project.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsProjectModalOpen(true)}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create
                </Button>

                {projects.length > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                )}
              </div>
            </div>

            {selectedProjectData && (
              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-800">
                  {selectedProjectData.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedProjectData.description}
                </p>
              </div>
            )}
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
              <div className="w-full max-w-md rounded-lg bg-white p-6">
                <h3 className="mb-2 text-lg font-semibold text-slate-800">
                  Delete Project
                </h3>
                <p className="mb-4 text-slate-600">
                  Are you sure you want to delete "{selectedProjectData?.name}"?
                  This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteProject}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* AI Agents Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent: any) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                projectId={selectedProject}
              />
            ))}
          </div>

          <ResultsDashboard />
        </div>

        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onSubmit={handleCreateProject}
        />
      </div>
    </ResultsProvider>
  );
};

export default AgentPage;
