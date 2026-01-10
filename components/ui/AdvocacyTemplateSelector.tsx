'use client';

import { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  Briefcase, 
  Heart, 
  Building, 
  GraduationCap, 
  Scale, 
  Users,
  ChevronRight,
  X,
  Sparkles
} from 'lucide-react';

interface AdvocacyTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  variables: string[];
  tips: string[];
}

interface AdvocacyTemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: AdvocacyTemplate, values: Record<string, string>) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  financial: <DollarSign className="w-5 h-5" />,
  career: <Briefcase className="w-5 h-5" />,
  healthcare: <Heart className="w-5 h-5" />,
  services: <Building className="w-5 h-5" />,
  customer_service: <FileText className="w-5 h-5" />,
  education: <GraduationCap className="w-5 h-5" />,
  legal: <Scale className="w-5 h-5" />,
  social: <Users className="w-5 h-5" />,
};

const TEMPLATES: AdvocacyTemplate[] = [
  {
    id: 'fee_extension',
    title: 'Fee Extension Request',
    category: 'financial',
    description: 'Request for deadline extension on payments',
    variables: ['recipient', 'payment_type', 'due_date', 'reason', 'organization', 'requested_date', 'sender_name'],
    tips: ['Mention your positive history', 'Be specific about the new date', 'Express commitment to resolve']
  },
  {
    id: 'salary_negotiation',
    title: 'Salary Negotiation',
    category: 'career',
    description: 'Professional salary negotiation message',
    variables: ['manager_name', 'time_period', 'achievements', 'position', 'location', 'requested_salary', 'sender_name'],
    tips: ['Lead with your value', 'Research market rates', 'Show flexibility']
  },
  {
    id: 'medical_appointment',
    title: 'Medical Appointment',
    category: 'healthcare',
    description: 'Request for medical appointment with specific needs',
    variables: ['doctor_specialty', 'health_concern', 'urgency_statement', 'availability', 'special_considerations', 'sender_name', 'contact_info'],
    tips: ['Be clear about urgency', 'Mention accessibility needs', 'Provide flexible availability']
  },
  {
    id: 'complaint_resolution',
    title: 'Complaint Resolution',
    category: 'customer_service',
    description: 'Professional complaint with resolution request',
    variables: ['issue_description', 'date', 'details', 'duration', 'resolution_request', 'sender_name', 'reference_number'],
    tips: ['State facts clearly', 'Be specific about resolution', 'Keep records']
  },
  {
    id: 'accommodation_request',
    title: 'Accessibility Accommodation',
    category: 'services',
    description: 'Request for disability or accessibility accommodations',
    variables: ['recipient', 'event_or_service', 'date', 'general_reason', 'accommodation_list', 'sender_name', 'contact_info'],
    tips: ['You don\'t need to disclose conditions', 'Be clear about needs', 'Follow up if needed']
  },
  {
    id: 'landlord_issue',
    title: 'Landlord/Property Issue',
    category: 'legal',
    description: 'Communicate with landlord about property issues',
    variables: ['landlord_name', 'issue_description', 'property_address', 'date_noticed', 'impact_description', 'requested_deadline', 'sender_name', 'unit_number'],
    tips: ['Document everything', 'Keep copies', 'Set firm deadlines']
  },
  {
    id: 'school_communication',
    title: 'School/Teacher Communication',
    category: 'education',
    description: 'Communicate with teachers or school administration',
    variables: ['teacher_name', 'sender_name', 'relationship', 'student_name', 'class_name', 'topic', 'details', 'requested_action', 'contact_info'],
    tips: ['Approach as a partner', 'Be specific', 'Acknowledge efforts']
  },
  {
    id: 'social_boundary',
    title: 'Setting Social Boundaries',
    category: 'social',
    description: 'Politely decline or set boundaries in social situations',
    variables: ['recipient_name', 'invitation_or_request', 'acknowledgment', 'reason_or_boundary', 'alternative_if_any', 'closing', 'sender_name'],
    tips: ['You don\'t owe explanations', 'Be kind but firm', 'It\'s okay to say no']
  }
];

export default function AdvocacyTemplateSelector({
  isOpen,
  onClose,
  onSelectTemplate
}: AdvocacyTemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<AdvocacyTemplate | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'select' | 'fill'>('select');

  if (!isOpen) return null;

  const handleTemplateSelect = (template: AdvocacyTemplate) => {
    setSelectedTemplate(template);
    setFormValues({});
    setStep('fill');
  };

  const handleSubmit = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate, formValues);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedTemplate(null);
    setFormValues({});
    setStep('select');
    onClose();
  };

  const formatVariableName = (name: string) => {
    return name.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {step === 'select' ? 'Advocacy Templates' : selectedTemplate?.title}
              </h2>
              <p className="text-xs text-slate-400">
                {step === 'select' 
                  ? 'Choose a template for your situation' 
                  : 'Fill in the details for your message'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'select' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 rounded-2xl text-left transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-slate-700 group-hover:bg-indigo-500/20 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                      {CATEGORY_ICONS[template.category] || <FileText className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white group-hover:text-indigo-300 transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {template.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          ) : selectedTemplate && (
            <div className="space-y-6">
              {/* Tips */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                <h4 className="text-sm font-medium text-indigo-300 mb-2">Tips for this template:</h4>
                <ul className="space-y-1">
                  {selectedTemplate.tips.map((tip, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {selectedTemplate.variables.map((variable) => (
                  <div key={variable} className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      {formatVariableName(variable)}
                    </label>
                    <input
                      type="text"
                      value={formValues[variable] || ''}
                      onChange={(e) => setFormValues({
                        ...formValues,
                        [variable]: e.target.value
                      })}
                      placeholder={`Enter ${formatVariableName(variable).toLowerCase()}`}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-xl text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'fill' && (
          <div className="p-6 border-t border-slate-700 flex gap-3">
            <button
              onClick={() => setStep('select')}
              className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-medium hover:bg-slate-700 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition-colors"
            >
              Generate Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
