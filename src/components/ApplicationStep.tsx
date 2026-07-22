import type { PropsWithChildren } from 'react';

type ApplicationStepProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export function ApplicationStep({ title, description, children }: ApplicationStepProps) {
  return (
    <div className="application-step">
      <div className="application-step-heading">
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
