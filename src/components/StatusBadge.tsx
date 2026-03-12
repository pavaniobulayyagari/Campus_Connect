import { cn } from '@/lib/utils';

const statusStyles = {
  PENDING: 'bg-warning/15 text-warning-foreground border-warning/30',
  APPROVED: 'bg-success/15 text-success border-success/30',
  REJECTED: 'bg-destructive/15 text-destructive border-destructive/30',
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
      statusStyles[status as keyof typeof statusStyles] || 'bg-muted text-muted-foreground'
    )}>
      {status}
    </span>
  );
}
