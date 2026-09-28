import type { TraineeSkill } from '@/types';

export interface SkillCategory {
  name: string;
  skills: string[];
  sector: string;
}

export const skillCategories: SkillCategory[] = [
  { name: 'Programming', skills: ['JavaScript', 'Python', 'Java', 'React.js', 'Node.js', 'SQL', 'HTML/CSS'], sector: 'IT/ITES' },
  { name: 'Manufacturing', skills: ['CNC Programming', 'CAD/CAM', 'Quality Control', 'Lean Manufacturing', '5S'], sector: 'Manufacturing' },
  { name: 'Welding', skills: ['SMAW Welding', 'GMAW Welding', 'TIG Welding', 'Pipe Welding'], sector: 'Construction' },
  { name: 'Electrical', skills: ['Electrical Wiring', 'PLC Programming', 'Motor Winding', 'Transformer Maintenance'], sector: 'Manufacturing' },
  { name: 'Healthcare', skills: ['Patient Care', 'Vital Signs Monitoring', 'First Aid', 'Infection Control', 'Medical Documentation'], sector: 'Healthcare' },
  { name: 'Renewable Energy', skills: ['Solar Panel Installation', 'Solar System Design', 'Battery Storage', 'Inverter Maintenance'], sector: 'Renewable Energy' },
  { name: 'Automotive', skills: ['EV Battery Systems', 'Electric Motor Repair', 'Diagnostic Tools', 'Engine Repair'], sector: 'Automotive' },
  { name: 'Digital Skills', skills: ['Data Entry', 'MS Office', 'Tally ERP', 'Digital Marketing', 'SEO', 'Google Analytics'], sector: 'IT/ITES' },
  { name: 'Construction', skills: ['Plumbing & Pipe Fitting', 'Blueprint Reading', 'Masonry', 'Scaffolding'], sector: 'Construction' },
  { name: 'Textile', skills: ['Textile Machine Operation', 'Quality Testing', 'Fabric Analysis', 'Pattern Making'], sector: 'Textile' },
  { name: 'Food Processing', skills: ['Food Processing', 'Hygiene Standards', 'Packaging Technology', 'Cold Chain Management'], sector: 'Agriculture' },
];

export const allSkills: TraineeSkill[] = [
  { id: 'as1', name: 'JavaScript', level: 'advanced', category: 'Programming' },
  { id: 'as2', name: 'React.js', level: 'intermediate', category: 'Programming' },
  { id: 'as3', name: 'Node.js', level: 'intermediate', category: 'Programming' },
  { id: 'as4', name: 'SQL', level: 'intermediate', category: 'Database' },
  { id: 'as5', name: 'CNC Programming', level: 'advanced', category: 'Manufacturing' },
  { id: 'as6', name: 'CAD/CAM', level: 'intermediate', category: 'Design' },
  { id: 'as7', name: 'SMAW Welding', level: 'advanced', category: 'Welding' },
  { id: 'as8', name: 'GMAW Welding', level: 'intermediate', category: 'Welding' },
  { id: 'as9', name: 'Patient Care', level: 'intermediate', category: 'Healthcare' },
  { id: 'as10', name: 'Solar Panel Installation', level: 'beginner', category: 'Renewable Energy' },
  { id: 'as11', name: 'Data Entry', level: 'expert', category: 'IT' },
  { id: 'as12', name: 'Digital Marketing', level: 'intermediate', category: 'IT' },
  { id: 'as13', name: 'Electrical Wiring', level: 'advanced', category: 'Electrical' },
  { id: 'as14', name: 'Plumbing & Pipe Fitting', level: 'intermediate', category: 'Construction' },
  { id: 'as15', name: 'Food Processing', level: 'beginner', category: 'Food Processing' },
];
