'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Loader2, X } from 'lucide-react';
import { getRequiredFieldsOrganization } from '@/lib/agent';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Request from '@/lib/request';
import { useAuth } from '@/core/auth/AuthProvider';

type Functionality =
  | 'daily-checklist'
  | 'weekly-planner'
  | 'task-delegation'
  | 'support-workflow'
  | 'sop-template'
  | '';

type AgentProps = {
  isGenerating: boolean;
  setResult: Function;
  setIsGenerating: Function;
};

const initialInput = {
  role: '',
  workingHours: { start: '', end: '' },
  responsibilities: '',
  teamMembers: [] as string[],
  tasks: [] as string[],
  weeklyGoals: '',
  recurringTasks: [] as string[],
  customerChannels: [] as string[],
  commonIssues: '',
};

export const OrganizationAgent = ({
  isGenerating,
  setResult,
  setIsGenerating,
}: AgentProps) => {
  const [selectedFunctionality, setSelectedFunctionality] =
    useState<Functionality>('daily-checklist');
  const [deadline, setDeadline] = useState<Date>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState(initialInput);
  const [{ profile }] = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = getRequiredFieldsOrganization(selectedFunctionality);

    requiredFields.forEach((field) => {
      if (field === 'workingHours') {
        if (!formData.workingHours.start) {
          newErrors.workingHoursStart = 'Start time is required';
        }
        if (!formData.workingHours.end) {
          newErrors.workingHoursEnd = 'End time is required';
        }
      } else if (
        field === 'teamMembers' ||
        field === 'tasks' ||
        field === 'recurringTasks' ||
        field === 'customerChannels'
      ) {
        if (formData[field].length === 0) {
          newErrors[field] = `${field} is required`;
        }
      } else if (field === 'deadline') {
        if (!deadline) {
          newErrors.deadline = 'Deadline is required';
        }
      } else if (
        !formData[field as keyof typeof formData] ||
        String(formData[field as keyof typeof formData]).trim() === ''
      ) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const inputData = {
      agent: 'organization',
      function: selectedFunctionality,
      inputs: { ...formData, deadline: deadline },
    };

    let resultData = {
      user_id: profile.id,
      agent_type: 'organization',
      task_type: selectedFunctionality,
      credits_spent: 1,
      output_type: '',
    };

    await Request.Post('/api/agents', inputData)
      .then((res) => {
        if (res.type === 'text') {
          setResult({ script: res.script, url: '' });
        } else {
          setResult({ script: res.script, url: res.imageUrl });
          resultData.credits_spent = 2
        }
        setIsGenerating(false);
        resultData.output_type = res.type;
        toast.success('Organization plan generated successfully');
      })
      .catch((err) => {
        console.log('error', err);
        setIsGenerating(false);
        resultData.output_type = '';
        toast.error('Organization plan generated Error!');
      });

    await Request.Post('/api/stripe/discount', resultData)
      .then((res) => console.log('loged result successfully!'))
      .catch((err) => console.log('error to log result!'));

    setFormData(initialInput);
  };

  const addTeamMember = (member: string) => {
    if (member.trim() && !formData.teamMembers.includes(member.trim())) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, member.trim()],
      }));
      if (errors.teamMembers) {
        setErrors((prev) => ({ ...prev, teamMembers: '' }));
      }
    }
  };

  const removeTeamMember = (member: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m !== member),
    }));
  };

  const addTask = (task: string) => {
    if (task.trim() && !formData.tasks.includes(task.trim())) {
      setFormData((prev) => ({
        ...prev,
        tasks: [...prev.tasks, task.trim()],
      }));
      if (errors.tasks) {
        setErrors((prev) => ({ ...prev, tasks: '' }));
      }
    }
  };

  const removeTask = (task: string) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t !== task),
    }));
  };

  const toggleRecurringTask = (task: string) => {
    setFormData((prev) => ({
      ...prev,
      recurringTasks: prev.recurringTasks.includes(task)
        ? prev.recurringTasks.filter((t) => t !== task)
        : [...prev.recurringTasks, task],
    }));
    if (errors.recurringTasks) {
      setErrors((prev) => ({ ...prev, recurringTasks: '' }));
    }
  };

  const toggleChannel = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      customerChannels: prev.customerChannels.includes(channel)
        ? prev.customerChannels.filter((c) => c !== channel)
        : [...prev.customerChannels, channel],
    }));
    if (errors.customerChannels) {
      setErrors((prev) => ({ ...prev, customerChannels: '' }));
    }
  };

  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };

  const renderFields = () => {
    const fields = [];

    // Role (all functionalities)
    fields.push(
      <div key="role" className="space-y-2">
        <Label htmlFor="role">Role/Department *</Label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, role: e.target.value }));
            clearFieldError('role');
          }}
          placeholder="e.g., Project Manager, Sales Team"
          className={`h-11 ${errors.role ? 'border-red-500' : ''}`}
        />
        {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
      </div>
    );

    // Working Hours (for daily-checklist, weekly-planner)
    if (['daily-checklist', 'weekly-planner'].includes(selectedFunctionality)) {
      fields.push(
        <div
          key="workingHours"
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="space-y-2">
            <Label htmlFor="startTime">Working Hours - Start *</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.workingHours.start}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  workingHours: { ...prev.workingHours, start: e.target.value },
                }));
                clearFieldError('workingHoursStart');
              }}
              className={`h-11 ${errors.workingHoursStart ? 'border-red-500' : ''}`}
            />
            {errors.workingHoursStart && (
              <p className="text-sm text-red-500">{errors.workingHoursStart}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">Working Hours - End *</Label>
            <Input
              id="endTime"
              type="time"
              value={formData.workingHours.end}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  workingHours: { ...prev.workingHours, end: e.target.value },
                }));
                clearFieldError('workingHoursEnd');
              }}
              className={`h-11 ${errors.workingHoursEnd ? 'border-red-500' : ''}`}
            />
            {errors.workingHoursEnd && (
              <p className="text-sm text-red-500">{errors.workingHoursEnd}</p>
            )}
          </div>
        </div>
      );
    }

    // Responsibilities (for daily-checklist, weekly-planner, task-delegation, sop-template)
    if (
      [
        'daily-checklist',
        'weekly-planner',
        'task-delegation',
        'sop-template',
      ].includes(selectedFunctionality)
    ) {
      fields.push(
        <div key="responsibilities" className="space-y-2">
          <Label htmlFor="responsibilities">Responsibilities *</Label>
          <Textarea
            id="responsibilities"
            value={formData.responsibilities}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                responsibilities: e.target.value,
              }));
              clearFieldError('responsibilities');
            }}
            placeholder="Describe key responsibilities and duties..."
            className={`min-h-[100px] ${errors.responsibilities ? 'border-red-500' : ''}`}
          />
          {errors.responsibilities && (
            <p className="text-sm text-red-500">{errors.responsibilities}</p>
          )}
        </div>
      );
    }

    // Team Members (all functionalities)
    fields.push(
      <div key="teamMembers" className="space-y-3">
        <Label>Team Members *</Label>
        <div className="mb-2 flex flex-wrap gap-2">
          {formData.teamMembers.map((member) => (
            <Badge
              key={member}
              variant="warning"
              className="cursor-pointer"
              onClick={() => removeTeamMember(member)}
            >
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
          className={`h-11 ${errors.teamMembers ? 'border-red-500' : ''}`}
        />
        {errors.teamMembers && (
          <p className="text-sm text-red-500">{errors.teamMembers}</p>
        )}
      </div>
    );

    // Tasks (for daily-checklist, task-delegation)
    if (
      ['daily-checklist', 'task-delegation'].includes(selectedFunctionality)
    ) {
      fields.push(
        <div key="tasks" className="space-y-3">
          <Label>Tasks *</Label>
          <div className="space-y-2">
            {formData.tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded bg-gray-50 p-2"
              >
                <span className="flex-1">{task}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTask(task)}
                >
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
            className={`h-11 ${errors.tasks ? 'border-red-500' : ''}`}
          />
          {errors.tasks && (
            <p className="text-sm text-red-500">{errors.tasks}</p>
          )}
        </div>
      );
    }

    // Weekly Goals (for weekly-planner)
    if (selectedFunctionality === 'weekly-planner') {
      fields.push(
        <div key="weeklyGoals" className="space-y-2">
          <Label htmlFor="weeklyGoals">Weekly Goals *</Label>
          <Textarea
            id="weeklyGoals"
            value={formData.weeklyGoals}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, weeklyGoals: e.target.value }));
              clearFieldError('weeklyGoals');
            }}
            placeholder="Define key objectives for the week..."
            className={`min-h-[80px] ${errors.weeklyGoals ? 'border-red-500' : ''}`}
          />
          {errors.weeklyGoals && (
            <p className="text-sm text-red-500">{errors.weeklyGoals}</p>
          )}
        </div>
      );
    }

    // Deadline (for task-delegation)
    if (selectedFunctionality === 'task-delegation') {
      fields.push(
        <div key="deadline" className="space-y-2">
          <Label>Deadline *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'h-11 w-full justify-start text-left font-normal',
                  !deadline && 'text-muted-foreground',
                  errors.deadline && 'border-red-500'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {deadline ? (
                  format(deadline, 'PPP')
                ) : (
                  <span>Pick a deadline</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={deadline}
                onSelect={(date) => {
                  setDeadline(date);
                  clearFieldError('deadline');
                }}
                initialFocus
                className="pointer-events-auto p-3"
              />
            </PopoverContent>
          </Popover>
          {errors.deadline && (
            <p className="text-sm text-red-500">{errors.deadline}</p>
          )}
        </div>
      );
    }

    // Recurring Tasks (for daily-checklist, weekly-planner, sop-template)
    if (
      ['daily-checklist', 'weekly-planner', 'sop-template'].includes(
        selectedFunctionality
      )
    ) {
      fields.push(
        <div key="recurringTasks" className="space-y-3">
          <Label>Recurring Tasks *</Label>
          <div className="flex flex-wrap gap-2">
            {[
              'Daily standup',
              'Email check',
              'Progress update',
              'Planning session',
              'Team sync',
              'Report review',
            ].map((task) => (
              <Badge
                key={task}
                variant={
                  formData.recurringTasks.includes(task) ? 'success' : 'default'
                }
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => toggleRecurringTask(task)}
              >
                {task}
              </Badge>
            ))}
          </div>
          {errors.recurringTasks && (
            <p className="text-sm text-red-500">{errors.recurringTasks}</p>
          )}
        </div>
      );
    }

    // Customer Channels (for support-workflow, sop-template)
    if (['support-workflow', 'sop-template'].includes(selectedFunctionality)) {
      fields.push(
        <div key="customerChannels" className="space-y-3">
          <Label>Customer Channels *</Label>
          <div className="flex flex-wrap gap-2">
            {[
              'Email',
              'Live Chat',
              'Phone',
              'Social Media',
              'Ticket System',
              'Community Forum',
            ].map((channel) => (
              <Badge
                key={channel}
                variant={
                  formData.customerChannels.includes(channel)
                    ? 'success'
                    : 'default'
                }
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => toggleChannel(channel)}
              >
                {channel}
              </Badge>
            ))}
          </div>
          {errors.customerChannels && (
            <p className="text-sm text-red-500">{errors.customerChannels}</p>
          )}
        </div>
      );
    }

    // Common Issues (for support-workflow)
    if (selectedFunctionality === 'support-workflow') {
      fields.push(
        <div key="commonIssues" className="space-y-2">
          <Label htmlFor="commonIssues">Common Issues *</Label>
          <Textarea
            id="commonIssues"
            value={formData.commonIssues}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                commonIssues: e.target.value,
              }));
              clearFieldError('commonIssues');
            }}
            placeholder="List frequent customer issues and their solutions..."
            className={`min-h-[100px] ${errors.commonIssues ? 'border-red-500' : ''}`}
          />
          {errors.commonIssues && (
            <p className="text-sm text-red-500">{errors.commonIssues}</p>
          )}
        </div>
      );
    }

    return fields;
  };

  return (
    <div className="space-y-6">
      {/* Functionality Selection */}
      <div className="space-y-2">
        <Label htmlFor="functionality" className="text-lg font-semibold">
          Select Functionality
        </Label>
        <Select
          value={selectedFunctionality}
          onValueChange={(value: Functionality) =>
            setSelectedFunctionality(value)
          }
        >
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Choose an organization function..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily-checklist">📋 Daily Checklist</SelectItem>
            <SelectItem value="weekly-planner">📅 Weekly Planner</SelectItem>
            <SelectItem value="task-delegation">👥 Task Delegation</SelectItem>
            <SelectItem value="support-workflow">
              🛠️ Support Workflow
            </SelectItem>
            <SelectItem value="sop-template">📋 SOP Template</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Form Fields */}
      <div className="animate-fade-in space-y-6">
        <div className="grid grid-cols-1 gap-4">{renderFields()}</div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          className="h-12 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-lg font-semibold transition-all duration-200 hover:from-purple-600 hover:to-indigo-600"
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
      </div>
    </div>
  );
};
