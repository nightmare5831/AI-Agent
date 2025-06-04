'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2, Plus, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Functionality = 'daily-checklist' | 'weekly-planner' | 'task-delegation' | 'support-workflow' | 'sop-template' | '';

export const OrganizationAgent = () => {
  const [selectedFunctionality, setSelectedFunctionality] = useState<Functionality>('daily-checklist');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [deadline, setDeadline] = useState<Date>();
  const [formData, setFormData] = useState({
    role: '',
    workingHours: { start: '', end: '' },
    responsibilities: '',
    teamMembers: [] as string[],
    tasks: [] as string[],
    weeklyGoals: '',
    recurringTasks: [] as string[],
    customerChannels: [] as string[],
    commonIssues: ''
  });

  const handleGenerate = async () => {
    setIsGenerating(true);

    const mockResults : any = {}
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    mockResults[selectedFunctionality] = {
      'daily-checklist': `📋 Daily Checklist for ${formData.role}:\n\n🌅 Morning (${formData.workingHours.start}):\n• Check emails and prioritize urgent items\n• Review today's scheduled tasks\n• Team standup meeting\n• Update project status\n\n☀️ Midday:\n• ${formData.tasks.slice(0, 2).join('\n• ')}\n• Client check-ins\n• Progress review\n\n🌆 End of Day:\n• Complete pending tasks\n• Plan tomorrow's priorities\n• Update team on progress\n• Log work hours\n\nRecurring: ${formData.recurringTasks.join(', ')}`,
      
      'weekly-planner': `📅 Weekly Planner:\n\nMONDAY - Planning Day\n• Week kickoff meeting\n• Priority setting\n• Resource allocation\n\nTUESDAY-THURSDAY - Execution Days\n• Core project work\n• ${formData.tasks.slice(0, 3).join('\n• ')}\n• Client communications\n\nFRIDAY - Review & Planning\n• Week wrap-up\n• Next week preparation\n• Team feedback session\n\nWeekly Goals: ${formData.weeklyGoals}\nTeam: ${formData.teamMembers.join(', ')}`,
      
      'task-delegation': `👥 Task Delegation Plan:\n\n${formData.teamMembers.map((member, index) => `${member}:\n• ${formData.tasks[index] || 'Strategic planning'}\n• Progress reviews\n• Quality assurance`).join('\n\n')}\n\nDelegation Principles:\n✅ Clear expectations\n✅ Defined deadlines\n✅ Regular check-ins\n✅ Resource allocation\n\nTrack progress via weekly 1:1s and project updates.`,
      
      'support-workflow': `🛠️ Support Workflow:\n\nChannels: ${formData.customerChannels.join(', ')}\n\nTier 1 - Initial Response (30 min)\n• Acknowledge issue\n• Gather basic information\n• Apply known solutions\n\nTier 2 - Investigation (2 hours)\n• Deep dive analysis\n• Escalate if needed\n• Provide updates\n\nTier 3 - Resolution (24 hours)\n• Implement solution\n• Test and verify\n• Follow up with customer\n\nCommon Issues:\n${formData.commonIssues}`,
      
      'sop-template': `📋 Standard Operating Procedure\n\nRole: ${formData.role}\nDepartment: Operations\n\n1. PURPOSE\nTo standardize ${formData.responsibilities}\n\n2. SCOPE\nApplies to all ${formData.teamMembers.join(', ')}\n\n3. PROCEDURE\nStep 1: ${formData.tasks[0] || 'Initial assessment'}\nStep 2: ${formData.tasks[1] || 'Execute main process'}\nStep 3: ${formData.tasks[2] || 'Quality check'}\nStep 4: Documentation and handoff\n\n4. RESPONSIBILITIES\n${formData.responsibilities}\n\n5. QUALITY STANDARDS\n• Accuracy: 99.5%\n• Response time: < 24 hours\n• Customer satisfaction: > 4.5/5`
    };

    setResult(mockResults[selectedFunctionality] || 'Generated plan will appear here...');
    setIsGenerating(false);
  };

  const addTeamMember = (member: string) => {
    if (member.trim() && !formData.teamMembers.includes(member.trim())) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, member.trim()]
      }));
    }
  };

  const removeTeamMember = (member: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(m => m !== member)
    }));
  };

  const addTask = (task: string) => {
    if (task.trim() && !formData.tasks.includes(task.trim())) {
      setFormData(prev => ({
        ...prev,
        tasks: [...prev.tasks, task.trim()]
      }));
    }
  };

  const removeTask = (task: string) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t !== task)
    }));
  };

  const toggleRecurringTask = (task: string) => {
    setFormData(prev => ({
      ...prev,
      recurringTasks: prev.recurringTasks.includes(task)
        ? prev.recurringTasks.filter(t => t !== task)
        : [...prev.recurringTasks, task]
    }));
  };

  const toggleChannel = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      customerChannels: prev.customerChannels.includes(channel)
        ? prev.customerChannels.filter(c => c !== channel)
        : [...prev.customerChannels, channel]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Functionality Selection */}
      <div className="space-y-2">
        <Label htmlFor="functionality" className="text-lg font-semibold">Select Functionality</Label>
        <Select value={selectedFunctionality} onValueChange={(value: Functionality) => setSelectedFunctionality(value)}>
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Choose an organization function..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily-checklist">📋 Daily Checklist</SelectItem>
            <SelectItem value="weekly-planner">📅 Weekly Planner</SelectItem>
            <SelectItem value="task-delegation">👥 Task Delegation</SelectItem>
            <SelectItem value="support-workflow">🛠️ Support Workflow</SelectItem>
            <SelectItem value="sop-template">📋 SOP Template</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Form Fields */}
      <div className="space-y-6 animate-fade-in">
        {/* Common Fields */}
        <div className="space-y-2">
          <Label htmlFor="role">Role/Department</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            placeholder="e.g., Project Manager, Sales Team"
            className="h-11"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Working Hours - Start</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.workingHours.start}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                workingHours: { ...prev.workingHours, start: e.target.value }
              }))}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">Working Hours - End</Label>
            <Input
              id="endTime"
              type="time"
              value={formData.workingHours.end}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                workingHours: { ...prev.workingHours, end: e.target.value }
              }))}
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="responsibilities">Responsibilities</Label>
          <Textarea
            id="responsibilities"
            value={formData.responsibilities}
            onChange={(e) => setFormData(prev => ({ ...prev, responsibilities: e.target.value }))}
            placeholder="Describe key responsibilities and duties..."
            className="min-h-[100px]"
          />
        </div>

        {/* Team Members */}
        <div className="space-y-3">
          <Label>Team Members</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.teamMembers.map(member => (
              <Badge key={member} variant="success" className="cursor-pointer" onClick={() => removeTeamMember(member)}>
                {member} <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Add team member and press Enter"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTeamMember(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            className="h-11"
          />
        </div>

        {/* Tasks */}
        <div className="space-y-3">
          <Label>Tasks</Label>
          <div className="space-y-2">
            {formData.tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <span className="flex-1">{task}</span>
                <Button variant="ghost" size="sm" onClick={() => removeTask(task)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Input
            placeholder="Add task and press Enter"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTask(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            className="h-11"
          />
        </div>

        {/* Functionality-specific fields */}
        {(selectedFunctionality === 'task-delegation' || selectedFunctionality === 'weekly-planner') && (
          <>
            {selectedFunctionality === 'weekly-planner' && (
              <div className="space-y-2">
                <Label htmlFor="weeklyGoals">Weekly Goals</Label>
                <Textarea
                  id="weeklyGoals"
                  value={formData.weeklyGoals}
                  onChange={(e) => setFormData(prev => ({ ...prev, weeklyGoals: e.target.value }))}
                  placeholder="Define key objectives for the week..."
                  className="min-h-[80px]"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-11",
                      !deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : <span>Pick a deadline</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </>
        )}

        {(selectedFunctionality === 'daily-checklist' || selectedFunctionality === 'weekly-planner') && (
          <div className="space-y-3">
            <Label>Recurring Tasks</Label>
            <div className="flex flex-wrap gap-2">
              {['Daily standup', 'Email check', 'Progress update', 'Planning session', 'Team sync', 'Report review'].map(task => (
                <Badge
                  key={task}
                  variant={formData.recurringTasks.includes(task) ? "default" : "warning"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleRecurringTask(task)}
                >
                  {task}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {selectedFunctionality === 'support-workflow' && (
          <>
            <div className="space-y-3">
              <Label>Customer Channels</Label>
              <div className="flex flex-wrap gap-2">
                {['Email', 'Live Chat', 'Phone', 'Social Media', 'Ticket System', 'Community Forum'].map(channel => (
                  <Badge
                    key={channel}
                    variant={formData.customerChannels.includes(channel) ? "default" : "success"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleChannel(channel)}
                  >
                    {channel}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commonIssues">Common Issues</Label>
              <Textarea
                id="commonIssues"
                value={formData.commonIssues}
                onChange={(e) => setFormData(prev => ({ ...prev, commonIssues: e.target.value }))}
                placeholder="List frequent customer issues and their solutions..."
                className="min-h-[100px]"
              />
            </div>
          </>
        )}

        {/* Generate Button */}
        <Button 
          onClick={handleGenerate} 
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Organizing...
            </>
          ) : (
            'Generate Organization Plan'
          )}
        </Button>

        {/* Result Box */}
        {result && (
          <Card className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 animate-fade-in">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">AI Generated Plan</h3>
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {result}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
