import React, { useEffect, useState } from 'react';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectModal } from '@/components/agents/ProjectModal';
import { AgentCard } from '@/components/agents/AgentCard';
import { ResultsDashboard } from '@/components/agents/ResultsDashboard';
import { ResultsProvider } from '@/contexts/ResultsContext';
import { agents } from '@/lib/data/agents';
import { getProject } from '@/core/agent';
import { useAuth } from '@/core/auth/AuthProvider';

const AgentPage = () => {
  const [projects, setProjects] = useState([
    { id: Date.now().toString(), name: 'Tech Startup Campaign', description: 'AI-driven marketing for tech products' },
  ]);
  const [selectedProject, setSelectedProject] = useState(Date.now().toString());
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [{ profile }] = useAuth(); 

  const handleCreateProject = (name: string, description: string) => {
    const newProject = {
      id: Date.now().toString(),
      name,
      description
    };
    setProjects([...projects, newProject]);
    setSelectedProject(newProject.id);
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = () => {
    if (projects.length > 1) {
      const updatedProjects = projects.filter(p => p.id !== selectedProject);
      setProjects(updatedProjects);
      setSelectedProject(updatedProjects[0].id);
    }
    setShowDeleteConfirm(false);
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  useEffect(()=> {
    const setProjects = async () => {
      const projects = await getProject(profile.id)
      console.log('project', projects)
    }
    setProjects();
  },[profile.id]);

  return (
    <ResultsProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">AI Agents</h1>
            <p className="text-slate-600 text-lg">Transform your content marketing with intelligent AI agents</p>
          </div>

          {/* Project Management Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">Active Project</label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
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
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create
                </Button>
                
                {projects.length > 1 && (
                  <Button 
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                )}
              </div>
            </div>

            {selectedProjectData && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <h3 className="font-semibold text-slate-800">{selectedProjectData.name}</h3>
                <p className="text-slate-600 text-sm mt-1">{selectedProjectData.description}</p>
              </div>
            )}
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Delete Project</h3>
                <p className="text-slate-600 mb-4">
                  Are you sure you want to delete "{selectedProjectData?.name}"? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleDeleteProject}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* AI Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {agents.map((agent : any) => (
              <AgentCard key={agent.id} agent={agent} projectId={selectedProject}/>
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