import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const JsonLd = () => {
    try {
      const { buildBreadcrumbListSchema } = require('@/lib/schema/breadcrumb');
      const json = buildBreadcrumbListSchema(items.map(i => ({ label: i.label, href: i.href })));
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
        />
      );
    } catch {
      return null;
    }
  };
  return (
    <nav className={`py-4 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg 
                className="flex-shrink-0 h-4 w-4 text-white/40 mr-2" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
            {index === items.length - 1 ? (
              <span className="text-white/80 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-white/60 hover:text-white/80 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <JsonLd />
    </nav>
  );
}
