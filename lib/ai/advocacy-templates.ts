// Advocacy Templates and Scenario Handlers
// Pre-built templates for common advocacy scenarios

export interface AdvocacyTemplate {
  id: string;
  title: string;
  category: AdvocacyCategory;
  description: string;
  templateContent: string;
  variables: string[];
  culturalContext: string;
  formalityLevel: 'casual' | 'professional' | 'formal' | 'diplomatic';
  tips: string[];
}

export type AdvocacyCategory = 
  | 'financial'
  | 'career'
  | 'services'
  | 'customer_service'
  | 'healthcare'
  | 'education'
  | 'legal'
  | 'social';

export const ADVOCACY_SCENARIOS: Record<string, AdvocacyTemplate> = {
  fee_extension: {
    id: 'fee_extension',
    title: 'Fee Extension Request',
    category: 'financial',
    description: 'Request for deadline extension on payments',
    templateContent: `Dear {{recipient}},

I hope this message finds you well. I am writing to respectfully request an extension for {{payment_type}} that is currently due on {{due_date}}.

{{reason}}

I have maintained a consistent track record with {{organization}} and am committed to fulfilling my obligations. I would be grateful if you could consider extending the deadline to {{requested_date}}.

Thank you for your understanding and consideration.

Best regards,
{{sender_name}}`,
    variables: ['recipient', 'payment_type', 'due_date', 'reason', 'organization', 'requested_date', 'sender_name'],
    culturalContext: 'formal_western',
    formalityLevel: 'formal',
    tips: [
      'Mention your positive history with the organization',
      'Be specific about the new date you are requesting',
      'Briefly explain the reason without over-sharing',
      'Express gratitude and commitment to resolve'
    ]
  },
  
  salary_negotiation: {
    id: 'salary_negotiation',
    title: 'Salary Negotiation',
    category: 'career',
    description: 'Professional salary negotiation message',
    templateContent: `Dear {{manager_name}},

Thank you for the opportunity to discuss my compensation. Based on my contributions over the past {{time_period}}, including {{achievements}}, I would like to discuss a salary adjustment.

After researching market rates for {{position}} in {{location}}, I believe a salary of {{requested_salary}} would be appropriate given my experience and the value I bring to the team.

I am open to discussing this further at your convenience.

Best regards,
{{sender_name}}`,
    variables: ['manager_name', 'time_period', 'achievements', 'position', 'location', 'requested_salary', 'sender_name'],
    culturalContext: 'professional_western',
    formalityLevel: 'professional',
    tips: [
      'Lead with your value and contributions',
      'Research market rates before the conversation',
      'Be specific about achievements with metrics if possible',
      'Show flexibility and willingness to discuss'
    ]
  },

  medical_appointment: {
    id: 'medical_appointment',
    title: 'Medical Appointment Request',
    category: 'healthcare',
    description: 'Request for medical appointment with specific needs',
    templateContent: `Hello,

I would like to schedule an appointment with {{doctor_specialty}} regarding {{health_concern}}.

{{urgency_statement}}

My availability is {{availability}}. I have the following considerations that may be helpful to know:
{{special_considerations}}

Please let me know the earliest available appointment.

Thank you,
{{sender_name}}
Contact: {{contact_info}}`,
    variables: ['doctor_specialty', 'health_concern', 'urgency_statement', 'availability', 'special_considerations', 'sender_name', 'contact_info'],
    culturalContext: 'neutral',
    formalityLevel: 'professional',
    tips: [
      'Be clear about urgency level',
      'Mention any accessibility needs',
      'Provide flexible availability options',
      'Include relevant medical history if appropriate'
    ]
  },

  complaint_resolution: {
    id: 'complaint_resolution',
    title: 'Complaint Resolution',
    category: 'customer_service',
    description: 'Professional complaint with resolution request',
    templateContent: `Dear Customer Service Team,

I am writing regarding {{issue_description}} that occurred on {{date}}.

{{details}}

I have been a loyal customer for {{duration}} and this experience has been disappointing. I would appreciate {{resolution_request}}.

Please respond at your earliest convenience.

Regards,
{{sender_name}}
Account/Order: {{reference_number}}`,
    variables: ['issue_description', 'date', 'details', 'duration', 'resolution_request', 'sender_name', 'reference_number'],
    culturalContext: 'assertive_professional',
    formalityLevel: 'professional',
    tips: [
      'State facts clearly without emotional language',
      'Be specific about what resolution you want',
      'Mention your customer history',
      'Keep a record of all communications'
    ]
  },

  accommodation_request: {
    id: 'accommodation_request',
    title: 'Accessibility Accommodation Request',
    category: 'services',
    description: 'Request for disability or accessibility accommodations',
    templateContent: `Dear {{recipient}},

I am writing to request accommodations for {{event_or_service}} scheduled for {{date}}.

I require the following accommodations due to {{general_reason}}:
{{accommodation_list}}

I am happy to discuss these needs further and provide any documentation if required.

Thank you for your commitment to accessibility.

Best regards,
{{sender_name}}
{{contact_info}}`,
    variables: ['recipient', 'event_or_service', 'date', 'general_reason', 'accommodation_list', 'sender_name', 'contact_info'],
    culturalContext: 'neutral',
    formalityLevel: 'professional',
    tips: [
      'You are not required to disclose specific medical conditions',
      'Be clear about what accommodations you need',
      'Reference relevant accessibility laws if needed',
      'Follow up if you do not receive a response'
    ]
  },

  landlord_issue: {
    id: 'landlord_issue',
    title: 'Landlord/Property Issue',
    category: 'legal',
    description: 'Communicate with landlord about property issues',
    templateContent: `Dear {{landlord_name}},

I am writing to formally notify you of {{issue_description}} at {{property_address}}.

This issue was first noticed on {{date_noticed}} and has {{impact_description}}.

Under our lease agreement and applicable housing regulations, I kindly request that this be addressed by {{requested_deadline}}.

Please confirm receipt of this notice and provide an expected timeline for resolution.

Thank you,
{{sender_name}}
Unit: {{unit_number}}`,
    variables: ['landlord_name', 'issue_description', 'property_address', 'date_noticed', 'impact_description', 'requested_deadline', 'sender_name', 'unit_number'],
    culturalContext: 'formal_legal',
    formalityLevel: 'formal',
    tips: [
      'Document everything with photos and dates',
      'Keep copies of all communications',
      'Reference lease terms when applicable',
      'Set reasonable but firm deadlines'
    ]
  },

  school_communication: {
    id: 'school_communication',
    title: 'School/Teacher Communication',
    category: 'education',
    description: 'Communicate with teachers or school administration',
    templateContent: `Dear {{teacher_name}},

I am {{sender_name}}, {{relationship}} of {{student_name}} in your {{class_name}} class.

I am reaching out regarding {{topic}}.

{{details}}

I would appreciate the opportunity to {{requested_action}}.

Thank you for your dedication to our children's education.

Best regards,
{{sender_name}}
{{contact_info}}`,
    variables: ['teacher_name', 'sender_name', 'relationship', 'student_name', 'class_name', 'topic', 'details', 'requested_action', 'contact_info'],
    culturalContext: 'respectful_collaborative',
    formalityLevel: 'professional',
    tips: [
      'Approach as a partner in the child\'s education',
      'Be specific about concerns or requests',
      'Acknowledge the teacher\'s efforts',
      'Suggest a meeting if the issue is complex'
    ]
  },

  social_boundary: {
    id: 'social_boundary',
    title: 'Setting Social Boundaries',
    category: 'social',
    description: 'Politely decline or set boundaries in social situations',
    templateContent: `Hi {{recipient_name}},

Thank you for {{invitation_or_request}}.

{{acknowledgment}}

However, {{reason_or_boundary}}.

{{alternative_if_any}}

I hope you understand, and I appreciate your consideration.

{{closing}},
{{sender_name}}`,
    variables: ['recipient_name', 'invitation_or_request', 'acknowledgment', 'reason_or_boundary', 'alternative_if_any', 'closing', 'sender_name'],
    culturalContext: 'warm_assertive',
    formalityLevel: 'casual',
    tips: [
      'You do not owe anyone a detailed explanation',
      'Be kind but firm',
      'Offer alternatives only if you genuinely want to',
      'It\'s okay to say no'
    ]
  }
};

// Generate a filled template
export function fillTemplate(template: AdvocacyTemplate, values: Record<string, string>): string {
  let result = template.templateContent;
  
  for (const variable of template.variables) {
    const placeholder = `{{${variable}}}`;
    const value = values[variable] || `[${variable}]`;
    result = result.replace(new RegExp(placeholder, 'g'), value);
  }
  
  return result;
}

// Get templates by category
export function getTemplatesByCategory(category: AdvocacyCategory): AdvocacyTemplate[] {
  return Object.values(ADVOCACY_SCENARIOS).filter(t => t.category === category);
}

// Suggest templates based on user input
export function suggestTemplates(userInput: string): AdvocacyTemplate[] {
  const input = userInput.toLowerCase();
  const suggestions: AdvocacyTemplate[] = [];
  
  const keywords: Record<string, string[]> = {
    fee_extension: ['fee', 'payment', 'extension', 'deadline', 'due', 'late', 'delay'],
    salary_negotiation: ['salary', 'raise', 'pay', 'compensation', 'negotiate', 'promotion'],
    medical_appointment: ['doctor', 'medical', 'appointment', 'health', 'clinic', 'hospital'],
    complaint_resolution: ['complaint', 'issue', 'problem', 'refund', 'return', 'disappointed'],
    accommodation_request: ['accommodation', 'disability', 'accessibility', 'wheelchair', 'hearing', 'visual'],
    landlord_issue: ['landlord', 'rent', 'apartment', 'repair', 'maintenance', 'lease'],
    school_communication: ['teacher', 'school', 'student', 'class', 'grade', 'homework'],
    social_boundary: ['decline', 'no', 'boundary', 'invitation', 'uncomfortable', 'cancel']
  };
  
  for (const [templateId, templateKeywords] of Object.entries(keywords)) {
    if (templateKeywords.some(kw => input.includes(kw))) {
      const template = ADVOCACY_SCENARIOS[templateId];
      if (template) {
        suggestions.push(template);
      }
    }
  }
  
  return suggestions;
}
