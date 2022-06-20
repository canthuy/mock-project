export interface UserJob {
  Id: string;
  Title: string;
  FullDescription: string;
  LocationRaw: string;
  LocationNormalized: string;
  ContractTime: string;
  Company: string;
  Category: string;
  SalaryRaw: string;
  SalaryNormalized: string;
  SourceName: string;
  ContractType?: string;
}
