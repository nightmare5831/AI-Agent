'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { useClasses } from '@/components/providers/classes-context';
import { getStudens } from '@/core/auth/server';
import { Student } from '@/types';

interface EditStudentDialogProps {
  studentData: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (student: Student) => void;
}

// Interface for classroom data
interface Classroom {
  id: string;
  class_name: string;
}

interface StudentProfile {
  id: string;
  full_name: string;
}

type LearningConsiderations = {
  adhd: boolean;
  dyslexia: boolean;
  visualImpairment: boolean;
  hearingImpairment: boolean;
  autism: boolean;
  downSyndrome: boolean;
};

type LearningConsiderationItem = {
  id: keyof LearningConsiderations;
  label: string;
};

interface FormData {
  id: string;
  studentProfile: StudentProfile;
  classroom: Classroom;
  level: string;
  learningconsiderations: LearningConsiderations;
  skills: Record<string, number>;
}

const initialFormData: FormData = {
  id: '',
  studentProfile: {
    id: '',
    full_name: '',
  },
  classroom: {
    id: '',
    class_name: '',
  },
  level: '',
  learningconsiderations: {
    adhd: false,
    dyslexia: false,
    visualImpairment: false,
    hearingImpairment: false,
    autism: false,
    downSyndrome: false,
  },
  skills: {
    grammar: 0,
    vocabulary: 0,
    phonetics: 0,
    listening: 0,
    speaking: 0,
    reading: 0,
    writing: 0,
    interacting: 0,
  },
};

const learningconsiderationsList: LearningConsiderationItem[] = [
  { id: 'adhd', label: 'ADHD (Attention Deficit Hyperactivity Disorder)' },
  { id: 'dyslexia', label: 'Dyslexia' },
  { id: 'visualImpairment', label: 'Person with a visual impairment' },
  { id: 'hearingImpairment', label: 'Person with a hearing impairment' },
  { id: 'autism', label: 'Person with autism' },
  { id: 'downSyndrome', label: 'Person with Down syndrome' },
];

const skills = [
  { id: 'grammar', label: 'Grammar' },
  { id: 'vocabulary', label: 'Vocabulary' },
  { id: 'phonetics', label: 'Phonetics' },
  { id: 'listening', label: 'Listening' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'reading', label: 'Reading' },
  { id: 'writing', label: 'Writing' },
  { id: 'interacting', label: 'Interacting' },
];

export function EditStudentDialog({
  open,
  onOpenChange,
  studentData,
  onSave,
}: EditStudentDialogProps) {
  const { classes, fetchClasses } = useClasses();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<StudentProfile[]>([]);

  useEffect(() => {
    if (studentData) {
      setFormData({
        id: studentData.id,
        studentProfile: {
          id: studentData.id,
          full_name:
            studentData.full_name || studentData.student_info?.full_name || '',
        },
        classroom: {
          id: studentData.classroom_id,
          class_name: studentData.classroom?.class_name || '',
        },
        level: studentData.level || '',
        learningconsiderations: studentData.learningconsiderations || {
          adhd: false,
          dyslexia: false,
          visualImpairment: false,
          hearingImpairment: false,
          autism: false,
          downSyndrome: false,
        },
        skills: {
          grammar: studentData.grammar || 0,
          vocabulary: studentData.vocabulary || 0,
          phonetics: studentData.phonetics || 0,
          listening: studentData.listening || 0,
          speaking: studentData.speaking || 0,
          reading: studentData.reading || 0,
          writing: studentData.writing || 0,
          interacting: studentData.interacting || 0,
        },
      });
    }

    const fetchClassrooms = async () => {
      const students_list = await getStudens();
      setStudents(students_list);
      if (open) {
        setLoading(true);
        try {
          await fetchClasses();
        } catch (error) {
          console.error('Error fetching classrooms:', error);
          toast.error('Failed to load classrooms. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchClassrooms();
  }, [open, studentData, fetchClasses]);

  // Validation functions
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentProfile.id) {
      newErrors.student = 'Student is required';
    }

    if (!formData.classroom.id) {
      newErrors.classroom = 'Classroom is required';
    }

    if (!formData.level) {
      newErrors.level = 'Level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    const hasRatedSkills = Object.values(formData.skills).some(
      (value) => value > 0
    );
    if (!hasRatedSkills) {
      newErrors.skills = 'Please rate at least one skill';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
    setErrors({});
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    // Transform form data to match Student interface
    const updatedStudent: Student = {
      id: formData.id,
      full_name: formData.studentProfile.full_name,
      classroom_id: formData.classroom.id,
      level: formData.level,
      learningconsiderations: formData.learningconsiderations,
      grammar: formData.skills.grammar,
      vocabulary: formData.skills.vocabulary,
      phonetics: formData.skills.phonetics,
      listening: formData.skills.listening,
      speaking: formData.skills.speaking,
      reading: formData.skills.reading,
      writing: formData.skills.writing,
      interacting: formData.skills.interacting,
      // Include for UI display
      classroom: {
        class_name: formData.classroom.class_name,
      },
      student_info: {
        full_name: formData.studentProfile.full_name,
      },
    };

    onSave(updatedStudent);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Student Name</Label>
              <Select
                value={formData.studentProfile.id}
                onValueChange={(selectedId) => {
                  const selectedStudent = students.find(
                    (c) => c.id === selectedId
                  );
                  if (selectedStudent) {
                    setFormData((prev) => ({
                      ...prev,
                      studentProfile: {
                        id: selectedStudent.id,
                        full_name: selectedStudent.full_name,
                      },
                    }));
                    if (errors.student) {
                      setErrors((prev) => ({ ...prev, student: undefined }));
                    }
                  }
                }}
              >
                <SelectTrigger
                  className={errors.student ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.student && (
                <p className="text-sm text-red-500">{errors.student}</p>
              )}
            </div>

            {/* Classroom Select */}
            <div className="space-y-2">
              <Label htmlFor="classroom">Classroom</Label>
              <Select
                value={formData.classroom.id}
                onValueChange={(selectedId) => {
                  const selectedClassroom = classes.find(
                    (c) => c.id === selectedId
                  );
                  if (selectedClassroom) {
                    setFormData((prev) => ({
                      ...prev,
                      classroom: {
                        id: selectedClassroom.id,
                        class_name: selectedClassroom.class_name,
                      },
                    }));
                    if (errors.classroom) {
                      setErrors((prev) => ({ ...prev, classroom: undefined }));
                    }
                  }
                }}
              >
                <SelectTrigger
                  className={errors.classroom ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder="Select classroom" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((classroom) => (
                    <SelectItem key={classroom.id} value={classroom.id}>
                      {classroom.class_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.classroom && (
                <p className="text-sm text-red-500">{errors.classroom}</p>
              )}
            </div>

            {/* Level Select */}
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, level: value }));
                  if (errors.level) {
                    setErrors((prev) => ({ ...prev, level: undefined }));
                  }
                }}
              >
                <SelectTrigger className={errors.level ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Very Good">Very Good</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Average">Average</SelectItem>
                  <SelectItem value="Bad">Bad</SelectItem>
                </SelectContent>
              </Select>
              {errors.level && (
                <p className="text-sm text-red-500">{errors.level}</p>
              )}
            </div>

            {/* Learning Considerations */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">
                Learning Considerations
              </Label>
              <div className="grid gap-4">
                {learningconsiderationsList.map((consideration) => (
                  <div
                    key={consideration.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={consideration.id}
                      checked={
                        formData.learningconsiderations[consideration.id]
                      }
                      onCheckedChange={(checked) => {
                        setFormData((prev) => ({
                          ...prev,
                          learningconsiderations: {
                            ...prev.learningconsiderations,
                            [consideration.id]: checked as boolean,
                          },
                        }));
                      }}
                    />
                    <Label
                      htmlFor={consideration.id}
                      className="text-sm font-normal"
                    >
                      {consideration.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleNext} className="w-full">
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold">Skills Assessment</Label>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills}</p>
              )}
              <div className="mt-4 grid gap-6">
                {skills.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={skill.id}>{skill.label}</Label>
                      <span className="text-sm text-muted-foreground">
                        {formData.skills[skill.id]}/10
                      </span>
                    </div>
                    <Slider
                      id={skill.id}
                      min={0}
                      max={10}
                      step={1}
                      value={[formData.skills[skill.id]]}
                      onValueChange={([value]) => {
                        setFormData((prev) => ({
                          ...prev,
                          skills: {
                            ...prev.skills,
                            [skill.id]: value,
                          },
                        }));
                        if (errors.skills) {
                          setErrors((prev) => ({ ...prev, skills: undefined }));
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleSubmit}>
                Update Student
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
