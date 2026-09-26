export type EvidenceKind = 'VERIFIED PUBLIC FACT' | 'DISCOVERY-CALL FACT' | 'ILLUSTRATIVE CALCULATION' | 'PROPOSED CONCEPT' | 'INDICATIVE ESTIMATE';
export function EvidenceTag({ kind, detail }: { kind: EvidenceKind; detail?: string }) {
  return <div className="evidence-tag"><span>{kind}</span>{detail && <span className="evidence-detail">{detail}</span>}</div>;
}
