import type { BreadcrumbItem } from '@/types';

export const generateBreadcrumbs = (pathname: string, role: string): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [];
  
  // Add role as first breadcrumb
  const roleLabels: Record<string, string> = {
    government: 'Government',
    trainee: 'Trainee',
    employer: 'Employer',
  };
  
  items.push({
    label: roleLabels[role] || role,
    href: `/${role}`,
  });

  // Parse the path
  const segments = pathname.split('/').filter(Boolean);
  
  // Skip the role segment (first one)
  const pathSegments = segments.slice(1);
  
  let currentPath = `/${role}`;
  
  // Generate breadcrumbs for remaining segments
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Convert segment to readable label
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Last item doesn't have href
    if (index === pathSegments.length - 1) {
      items.push({ label });
    } else {
      items.push({ label, href: currentPath });
    }
  });

  return items;
};

export const getBreadcrumbsForPath = (pathname: string): BreadcrumbItem[] => {
  // Determine role from path
  const segments = pathname.split('/').filter(Boolean);
  const role = segments[0] || 'government';
  
  return generateBreadcrumbs(pathname, role);
};
