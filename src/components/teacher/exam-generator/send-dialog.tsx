import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Send, Edit, CheckCircle } from 'lucide-react';

interface AssessmentCompleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentContent: string; // The formatted document view content
  documentContent: any[]; // The structured document content
  parsedJson?: any; // The original JSON data
  onSend: (data: any) => void;
}

/**
 * Modal that appears when assessment generation is complete
 * Allows the user to review and edit the assessment before sending to students
 */
export function AssessmentCompleteModal({
  isOpen,
  onOpenChange,
  assessmentContent,
  documentContent,
  parsedJson,
  onSend,
}: AssessmentCompleteModalProps) {
  const [editableContent, setEditableContent] = useState('');
  const [editedDocumentContent, setEditedDocumentContent] = useState<any[]>([]);

  // Update editable content when the assessment content changes
  useEffect(() => {
    if (assessmentContent) {
      setEditableContent(assessmentContent);
    }
  }, [assessmentContent]);

  // Initialize edited document content
  useEffect(() => {
    if (documentContent && documentContent.length > 0) {
      setEditedDocumentContent([...documentContent]);
    }
  }, [documentContent]);

  // Handle sending the assessment
  const handleSend = () => {
    // Send both the edited content, document content, and JSON data
    onSend({
      displayContent: editableContent, // The formatted text for display
      jsonData: parsedJson, // The original JSON data
      documentContent: editedDocumentContent, // The possibly edited document items
    });
    onOpenChange(false);
  };

  // Update an item in the document content
  const updateDocumentItem = (index: number, updatedItem: any) => {
    const updatedContent = [...editedDocumentContent];
    updatedContent[index] = { ...updatedContent[index], ...updatedItem };
    setEditedDocumentContent(updatedContent);

    // Update the editable content to reflect changes
    const formattedText = convertDocumentToText(updatedContent);
    setEditableContent(formattedText);
  };

  // Function to convert document content to text
  const convertDocumentToText = (content: any[]) => {
    let formattedText = '';

    // Add title if exists
    const titleItem = content.find((item) => item.type === 'title');
    if (titleItem && titleItem.content) {
      formattedText += `${titleItem.content}\n\n`;
    }

    // Process each question and related items
    let currentQuestionId = 0;
    let questionText = '';
    let instructionText = '';
    let optionsText = '';

    content.forEach((item) => {
      if (item.type === 'question') {
        // If we had a previous question, add it to the formatted text
        if (questionText) {
          formattedText += questionText;
          if (instructionText) {
            formattedText += `${instructionText}\n`;
          }
          if (optionsText) {
            formattedText += optionsText;
          }
          formattedText += '\n';
        }

        // Start a new question
        currentQuestionId = item.number || 0;
        const questionType = item.questionType
          ? `[${getQuestionTypeLabel(item.questionType)}]`
          : '';
        const points = item.points ? `(${item.points} points)` : '';

        questionText = `${currentQuestionId}. ${questionType} ${item.content} ${points}\n`;
        instructionText = '';
        optionsText = '';
      } else if (
        item.type === 'instructions' &&
        item.questionId === currentQuestionId
      ) {
        instructionText = `   Instructions: ${item.content}\n`;
      } else if (
        item.type === 'options' &&
        item.questionId === currentQuestionId
      ) {
        optionsText = '\n';
        item.options?.forEach((option: string, idx: number) => {
          optionsText += `   ${String.fromCharCode(65 + idx)}. ${option}\n`;
        });
      }
    });

    // Add the last question if exists
    if (questionText) {
      formattedText += questionText;
      if (instructionText) {
        formattedText += `${instructionText}\n`;
      }
      if (optionsText) {
        formattedText += optionsText;
      }
    }

    return formattedText;
  };

  // Helper function to get question type label
  const getQuestionTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      multiple_choice: 'Multiple Choice',
      fill_blank: 'Fill in the Blank',
      rewriting: 'Rewriting',
      matching: 'Matching',
      reordering: 'Reordering',
      listening: 'Listening',
      reading: 'Reading',
      writing: 'Writing',
      speaking: 'Speaking',
    };

    return typeMap[type] || type;
  };

  // Render the document content in an editable format
  const renderEditableDocumentContent = () => {
    // If no document content, just return the textarea with the raw content
    if (!editedDocumentContent || editedDocumentContent.length === 0) {
      return (
        <Textarea
          value={editableContent}
          onChange={(e) => setEditableContent(e.target.value)}
          className="min-h-[400px] font-mono text-sm"
        />
      );
    }

    // Otherwise, render a more structured editing experience
    return (
      <div className="space-y-6">
        {editedDocumentContent.map((item, index) => {
          if (item.type === 'title') {
            return (
              <div key={`title-${index}`} className="mb-6">
                <Label
                  htmlFor={`title-${index}`}
                  className="mb-2 block text-sm font-medium"
                >
                  Title
                </Label>
                <Input
                  id={`title-${index}`}
                  value={item.content || ''}
                  onChange={(e) =>
                    updateDocumentItem(index, { content: e.target.value })
                  }
                  className="text-lg font-semibold"
                />
              </div>
            );
          }

          if (item.type === 'question') {
            return (
              <div
                key={`question-${item.number}-${index}`}
                className="mb-4 rounded-md border p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-[80px] font-bold text-[#8b5cf6]">
                    Question {item.number}
                  </Label>
                  <div className="rounded-full bg-gradient-to-r from-[#63B3ED]/20 to-[#d32f2f]/20 px-2 py-0.5 text-xs text-[#63B3ED]">
                    {getQuestionTypeLabel(item.questionType || '')}
                  </div>
                  <div className="ml-auto text-xs text-[#63B3ED]/70">
                    ({item.points || 0} points)
                  </div>
                </div>
                <Textarea
                  value={item.content || ''}
                  onChange={(e) =>
                    updateDocumentItem(index, { content: e.target.value })
                  }
                  className="mb-2 w-full border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30"
                  rows={2}
                />
              </div>
            );
          }

          if (item.type === 'instructions') {
            return (
              <div
                key={`instructions-${item.questionId}-${index}`}
                className="mb-3 ml-6"
              >
                <Label
                  htmlFor={`instructions-${index}`}
                  className="mb-2 block text-xs text-[#8b5cf6] font-medium"
                >
                  Instructions
                </Label>
                <Textarea
                  id={`instructions-${index}`}
                  value={item.content || ''}
                  onChange={(e) =>
                    updateDocumentItem(index, { content: e.target.value })
                  }
                  className="w-full text-sm border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30"
                  rows={2}
                />
              </div>
            );
          }

          if (item.type === 'options') {
            return (
              <div
                key={`options-${item.questionId}-${index}`}
                className="mb-4 ml-6"
              >
                <Label className="mb-2 block text-xs text-[#8b5cf6] font-medium">
                  Options
                </Label>
                <div className="space-y-2">
                  {item.options?.map((option: string, optIndex: number) => (
                    <div
                      key={`option-${item.questionId}-${optIndex}`}
                      className="flex items-center"
                    >
                      <span className="mr-2 min-w-[20px] font-medium text-[#63B3ED]">
                        {String.fromCharCode(65 + optIndex)}.
                      </span>
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(item.options || [])];
                          newOptions[optIndex] = e.target.value;
                          updateDocumentItem(index, { options: newOptions });
                        }}
                        className="flex-1 border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl bg-background/80 backdrop-blur-sm border border-[#63B3ED]/10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
              Do you want to send this assessment to your students?
            </DialogTitle>
            <DialogDescription className="text-[#63B3ED]/70">
              You can edit the content before sending it.
            </DialogDescription>
          </DialogHeader>

          <motion.div variants={itemVariants}>
            <ScrollArea className="my-4 flex-1 rounded-md border border-[#63B3ED]/20 p-4 bg-background/60 max-h-[50vh]">
              {renderEditableDocumentContent()}
            </ScrollArea>
          </motion.div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-[#63B3ED]/30 hover:bg-[#63B3ED]/10 text-[#63B3ED]"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSend}
              className="bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] text-white hover:from-[#63B3ED]/90 hover:to-[#d32f2f]/90"
            >
              <Send className="mr-2 h-4 w-4" />
              Send to Students
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
